## How it works

As a refresher, this polyfill consists of a few different related parts from
different web specifications that a re all related enough to be this polyfill.

- Make the `globalThis` an `EventTarget` from [`Window` | HTML Standard] and [`WorkerGlobalScope` | HTML Standard]. Needs to be polyfilled on Node.js and in `WorkletGlobalScope` contexts. Deno and 
-

[`Window` | HTML Standard]: https://html.spec.whatwg.org/multipage/window-object.html#window
[`WorkerGlobalScope` | HTML Standard]: https://html.spec.whatwg.org/multipage/workers.html#workerglobalscope
