## How it works

We have a lot of independent polyfills, so we split them up into lots of small
files. Here's how it works:

```js
// MyEventClass.js
export default ...
```

```js
// MyEventClass-polyfill.js
import MyEventClass_ from "./MyEventClass.js";
globalThis.MyEventClass = MyEventClass_;
```

```js
// index.js
if (typeof MyEventClass === "undefined") {
  await import("./MyEventClass-polyfill.js");
}

// More...
```

That pattern is repeated for each of the polyfilled classes and interfaces,
along with some fancy TypeScript magic to `declare global` everything.

The most interesting of these polyfills is the one for making the global an
instance of `EventTarget`. Since `new EventTarget()` has internal state that is
**not** usually inspectable and copyable, we have to compromise a bit.

```js
Object.setPrototypeOf(globalThis, new EventTarget());
```

**But**, in Node.js world we can abuse the fact that Node.js internals use
`symbol` keys on objects to maintain state instead of something like `WeakMap`!
So we can just copy all the symbols that were attached and tada! 🎉

```js
// This is the gist of it. See the actual code for the full implementation.
Object.setPrototypeOf(globalThis, EventTarget.prototype);
const target = new EventTarget();
for (const s of Object.getOwnPropertySymbols(target)) {
  globalThis[s] = target[s];
}

// Works! 🎉
globalThis.dispatchEvent(new Event("hello"));
```

## What's in the name?

This is an oddball package that includes many different parts of the [HTML
Standard] and even some parts from the [DOM Standard]. For instance, there's
partial of the `Window` interface here from the DOM Standard, and then there's a
smattering of stuff from the [8.1.8.1 Event handlers] part of the HTML Standard.
All of this to say that this is called "web-events" because there was no clear
"html-event-handlers" part of a single spec that this polyfill could be named
after.

Each of those individual parts ("dom-window-extensions", "html-event-handlers",
etc.) could be their own package, but they're all so small that it makes more
sense to bundle them together.

As for why it's scoped to [@jcbhmr], that's because it's just me maintaining it,
so that `@jcbhmr/` prefix is just a way to clearly indicate ownership. If in the
future this package moves, then the name will change to reflect that.

## How does that mess of `exports: { ... }` work in `package.json`?

The `exports` field in `package.json` is a new feature of Node.js that allows
package authors to reroute imports like `import "@jcbhmr/web-events"` to custom
files. Sort of like package-specific [import maps]. In this case, we use it to
specify that _only Node.js_ can use a particular export. Particularily for the
`*-event-polyfill.js` exports, they are only applicable to environments that
have a `process` global.

```jsonc
{
  "exports": {
    "./error-event-polyfill.js": {
      "node": "./error-event-polyfill.js"
    }
  }
}
```

💡 Note that you can still use the
`@jcbhmr/web-events/error-event-polyfill-node.js` export to explicitly opt-in to
use a Node.js-specific implementation. We deliberately don't obstruct that.

For the `global-is-EventTarget.js` export, things get a bit trickier. Some other
JS environments (like Deno and Bun) will try to resolve `node` export
conditions. That's great! ...when they work. But in this case, we are using
Node.js internal symbol properties to copy the internal state of an
`EventTarget` (that we just initialized) to the global scope. This is something
that they don't support. So, we have to _override_ the normal `node` export
condition to make Deno and Bun choose the regular plain compromise polyfill
instead.

```jsonc
{
  "exports": {
    "./global-is-EventTarget-polyfill.js": {
      "deno": "./dist/global-is-EventTarget-polyfill.js",
      "bun": "./dist/global-is-EventTarget-polyfill.js",
      "node": "./dist/global-is-EventTarget-polyfill-node.js",
      "default": "./dist/global-is-EventTarget-polyfill.js"
    }
  }
}
```

<!-- prettier-ignore-start -->
[HTML Standard]: https://html.spec.whatwg.org/multipage/
[DOM Standard]: https://dom.spec.whatwg.org/
[8.1.8.1 Event handlers]: https://html.spec.whatwg.org/multipage/webappapis.html#event-handler-attributes
[@jcbhmr]: https://github.com/jcbhmr
[import maps]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap
<!-- prettier-ignore-end -->
