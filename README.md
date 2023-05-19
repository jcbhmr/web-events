![🚧 Under construction 👷‍♂️](https://i.imgur.com/LEP2R3N.png)

# Web events for Node.js

⏰ Makes `globalThis` an `EventTarget` and emits [various web events]

<div align="center">

</div>

🚀 Makes `globalThis` into an `EventTarget` \
💥 Adds `onerror`, `onrejectionhandled`, and `onunhandledrejection` events \
❤️ Will be (mostly) obsolete if [nodejs/node#45993] is merged

## Installation

```sh
npm install @jcbhmr/web-events
```

⚠️ This package is intended for Node.js **only**. We use Node.js internal
private symbols to make `globalThis` an `EventTarget`.

## Usage

### Emitted events

- **`error`:** Alias of [`process.on("uncaughtExceptionMonitor")`]. This doesn't
  tap into the `uncaughtException` event, so you can't use `.preventDefault()`
  or anything like that. This should be used for error monitoring & reporting,
  not error suppression or handling.

- **`rejectionhandled`:** Alias of [`process.on("rejectionHandled")`].

- **`unhandledrejection`:** Alias of [`process.on("unhandledRejection")`].

This is deliberately very minimal. For events like `unload` and `message`, you
can use other polyfills that deal with those events and their related APIs.

## Development

This project is called "web-events" because it combines various bits from the
HTML specification and the

- [7.2.2 The Window object | HTML Standard](https://html.spec.whatwg.org/multipage/nav-history-apis.html#the-window-object)

<!-- prettier-ignore-start -->
[various web events]: #emitted-events
[`process.on("beforeExit")`]: https://nodejs.org/api/process.html#process_event_beforeexit
[`process.on("exit")`]: https://nodejs.org/api/process.html#process_event_exit
[`src/polyfill.ts`]: src/polyfill.ts
[nodejs/node#45993]: https://github.com/nodejs/node/pull/45993
<!-- prettier-ignore-end -->
