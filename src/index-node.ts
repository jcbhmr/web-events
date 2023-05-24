if (!(globalThis instanceof EventTarget)) {
  await import("./global-is-EventTarget-polyfill-node");
}

if (!("onerror" in globalThis)) {
  if (typeof ErrorEvent === "undefined") {
    await import("./ErrorEvent-polyfill");
  }
  await import("./error-event-polyfill-node");
}

if (!("onrejectionhandled" in globalThis)) {
  if (typeof PromiseRejectionEvent === "undefined") {
    await import("./PromiseRejectionEvent-polyfill");
  }
  await import("./rejectionhandled-event-polyfill-node");
}

if (!("onunhandledrejection" in globalThis)) {
  if (typeof PromiseRejectionEvent === "undefined") {
    await import("./PromiseRejectionEvent-polyfill");
  }
  await import("./unhandledrejection-event-polyfill-node");
}

if (!("onbeforeunload" in globalThis)) {
  await import("./beforeunload-event-polyfill-node");
}

if (!("onunload" in globalThis)) {
  await import("./unload-event-polyfill-node");
}

export {};
