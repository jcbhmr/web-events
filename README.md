![🚧 Under construction 👷‍♂️](https://i.imgur.com/LEP2R3N.png)

# Web events polyfill

⏰ Make the global an `EventTarget` and dispatch `process` events globally

<div align="center">

![](https://picsum.photos/600/400)

</div>

🚀 Makes `globalThis` into an `EventTarget` \
💥 Adds `error`-related events in Node.js \
⏲ Adds `beforeunload` and `unload` events in Node.js \
🌍 Also works in other environments \
🙌 Use the `defineEventHandlerIDLAttribute()` to define `onevent` attributes!

## Installation

![npm](https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=)
![Yarn](https://img.shields.io/static/v1?style=for-the-badge&message=Yarn&color=2C8EBB&logo=Yarn&logoColor=FFFFFF&label=)
![pnpm](https://img.shields.io/static/v1?style=for-the-badge&message=pnpm&color=222222&logo=pnpm&logoColor=F69220&label=)
![jsDelivr](https://img.shields.io/static/v1?style=for-the-badge&message=jsDelivr&color=E84D3D&logo=jsDelivr&logoColor=FFFFFF&label=)

This package is primarily intended for use with Node.js, but you _can_ use it in
other environments (like [Bun]) too! To get started, you can install it locally
using npm.

```sh
npm install @jcbhmr/web-events
```

You can also import this package directly from an npm CDN like [ESM>CDN] or
[jsDelivr] to use it in a [worklet] or another environment that doesn't set the
global to an `EventTarget`. Note that non-`node` import-condition environments
will recieve a polyfill that **only sets the global to an `EventTarget`**
without adding any `process.on()` listeners.

```js
import "https://esm.sh/@jcbhmr/web-events";
```

## Usage

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![Deno](https://img.shields.io/static/v1?style=for-the-badge&message=Deno&color=000000&logo=Deno&logoColor=FFFFFF&label=)
![Bun](https://img.shields.io/static/v1?style=for-the-badge&message=Bun&color=000000&logo=Bun&logoColor=FFFFFF&label=)

You just need to import the package to get started! This will automatically make
the `globalThis` an `EventTarget`. If you're on Node.js, it will also attach the
various listeners to `process.on()` to re-`.dispatchEvent()` them globally.

```js
import "@jcbhmr/web-events";
import { createServer } from "node:http";

const server = createServer((req, res) => {
  const event = new CustomEvent("my-app:request", { detail: { req, res } });
  if (globalThis.dispatchEvent(event)) {
    res.statusCode = 404;
    res.end("Not Found");
  }
});
server.listen(3000);

globalThis.addEventListener("my-app:request", (event) => {
  const { req, res } = event.detail;

  if (req.url === "/") {
    event.preventDefault();
    res.statusCode = 200;
    res.end("Hello world!");
  }
});
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/jcbhmr/web-events/tree/main/docs/example)

### Emitted events

- **`error`:** Alias of [`process.on("uncaughtExceptionMonitor")`]. This doesn't
  tap into the `uncaughtException` event, so you can't use `.preventDefault()`
  or anything like that. This should be used for error monitoring & reporting,
  not error suppression or handling.

- **`rejectionhandled`:** Alias of [`process.on("rejectionHandled")`].

- **`unhandledrejection`:** Alias of [`process.on("unhandledRejection")`].

- **`beforeunload`:** Alias of [`process.on("beforeExit")`]. Make sure you don't
  just `.preventDefault()` here! You need to actually schedule something to keep
  the event loop alive like `setTimeout(() => {}, 100000000)`.

- **`unload`:** Alias of [`process.on("exit")`].

This is deliberately very minimal. If you're looking for the global `message`
event that you might expect in a web `Worker`, check out
[jimmywarting/whatwg-worker].

### Use as a ponyfill

This package is most useful for composing into other polyfills! If you're
looking for the `ErrorEvent` that's used by a polyfill you're making, don't
write your own, just import this one! 😉

```js
import ErrorEvent from "@jcbhmr/web-events/ErrorEvent.js";
import defineEventHandlerIDLAttribute from "@jcbhmr/web-events/defineEventHandlerIDLAttribute.js";

class Worker {
  static {
    defineEventHandlerIDLAttribute(Worker, "onmessage");
    defineEventHandlerIDLAttribute(Worker, "onmessageerror");
    defineEventHandlerIDLAttribute(Worker, "onerror");
  }

  constructor() {
    nodeWorker.on("error", (error) => {
      const event = new ErrorEvent("error", { error });
      this.dispatchEvent(event);
    });
  }
}
```

You can access all of the classes, interfaces, and algorithms that we declare
via the `/thing.js` export path. Be aware that importing these will **not**
apply them to the global scope! You'll need to either manually do that, or
import one of the `-polyfill.js` suffixed files. Check out the [dev wiki] or the
[source code] if you're interested in learning how it works.

❓ Have a question on how it all works? I'd be happy to answer it! Just [open an
Issue]!

## Development

![TypeScript](https://img.shields.io/static/v1?style=for-the-badge&message=TypeScript&color=3178C6&logo=TypeScript&logoColor=FFFFFF&label=)
![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![Prettier](https://img.shields.io/static/v1?style=for-the-badge&message=Prettier&color=222222&logo=Prettier&logoColor=F7B93E&label=)

This project is written in TypeScript and uses Node.js for testing. You can get
started by cloning the repo and opening it in your favorite editor. If you don't
want to leave your browser, [GitHub Codespaces] is a great option! Then, you can
start the test watcher with:

```sh
npm start
```

This will run the tests in watch mode, so you can just leave it running while
you work. Make sure you run `npm test` once before committing though! That will
run the `tsc` type checker and the `prettier` formatter to make sure everything
is in order.

Here's some issues to keep an eye on if you're interested:

- **[nodejs/node#45981]:** The companion issue to [nodejs/node#45993]. This is
  the place to voice your support if you too want the global object in Node.js
  to be an `EventTarget`! 🙌
- **[nodejs/node#45993]:** An complete PR to fix [nodejs/node#45981] which would
  make the Node.js global scope an `EventTarget`. This would make part of this
  package unnecessary, which is great! 😊 More native stuff is better. But it's
  been open for a while and it's not clear if it will ever land.

<!-- prettier-ignore-start -->
[`process.on("beforeExit")`]: https://nodejs.org/api/process.html#process_event_beforeexit
[`process.on("exit")`]: https://nodejs.org/api/process.html#process_event_exit
[nodejs/node#45981]: https://github.com/nodejs/node/issues/45981
[nodejs/node#45993]: https://github.com/nodejs/node/pull/45993
[ESM>CDN]: https://esm.sh/
[jsDelivr]: https://www.jsdelivr.com/esm
[Bun]: https://bun.js.org/
[worklet]: https://developer.mozilla.org/en-US/docs/Web/API/Worklet
[`process.on("uncaughtExceptionMonitor")`]: https://nodejs.org/api/process.html#process_event_uncaughtexceptionmonitor
[`process.on("rejectionHandled")`]: https://nodejs.org/api/process.html#process_event_rejectionhandled
[`process.on("unhandledRejection")`]: https://nodejs.org/api/process.html#process_event_unhandledrejection
[jimmywarting/whatwg-worker]: https://github.com/jimmywarting/whatwg-worker#readme
[dev wiki]: https://github.com/jcbhmr/web-events/wiki
[source code]: https://github.com/jcbhmr/web-events/tree/main/src
[GitHub Codespaces]: https://github.com/features/codespaces
[open an Issue]: https://github.com/jcbhmr/web-events/issues/new
<!-- prettier-ignore-end -->
