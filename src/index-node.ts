if (!(globalThis instanceof EventTarget)) {
  await import("./global-is-EventTarget-polyfill-node.js");
}

if (!("onerror" in globalThis)) {
  if (typeof ErrorEvent === "undefined") {
    await import("./ErrorEvent-polyfill.js");
  }
  await import("./error-event-polyfill-node.js");
}

if (!("onrejectionhandled" in globalThis)) {
  if (typeof PromiseRejectionEvent === "undefined") {
    await import("./PromiseRejectionEvent-polyfill.js");
  }
  await import("./rejectionhandled-event-polyfill-node.js");
}

if (!("onunhandledrejection" in globalThis)) {
  if (typeof PromiseRejectionEvent === "undefined") {
    await import("./PromiseRejectionEvent-polyfill.js");
  }
  await import("./unhandledrejection-event-polyfill-node.js");
}

if (!("onbeforeunload" in globalThis)) {
  await import("./beforeunload-event-polyfill-node.js");
}

if (!("onunload" in globalThis)) {
  await import("./unload-event-polyfill-node.js");
}

export {};
