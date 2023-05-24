[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/jcbhmr/html-events/tree/main/docs/example)

Run `node --import @jcbhmr/web-events` to get started! This will launch an
interactive REPL that has the polyfill preloaded ready for experimentation.

```sh
node --import @jcbhmr/web-events
```

Try to see if you can add an `onrejectionhandled` handler and then trigger a
`Promise.reject()` to see if it works!

```js
onrejectionhandled = console.log;
Promise.reject("Hello, world!");
```

If you want to run a demo app, run `node server.js` to see a demo of how you
might use this polyfill in a Node.js app.

```sh
node server.js
```

💡 If you're interested in more polyfills that are based on this one, check out
[jcbhmr/service-workers-fetch-event] which emulates a service worker's `fetch`
event with a Node.js HTTP server.

<!-- prettier-ignore-start -->
[jcbhmr/service-workers-fetch-event]: https://github.com/jcbhmr/service-workers-fetch-event#readme
<!-- prettier-ignore-end -->
