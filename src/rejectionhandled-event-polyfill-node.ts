import defineEventHandlerIDLAttribute from "./defineEventHandlerIDLAttribute";

if (typeof PromiseRejectionEvent === "undefined") {
  await import("./PromiseRejectionEvent-polyfill");
}

declare global {
  var onrejectionhandled:
    | ((this: Window, e: PromiseRejectionEvent) => any)
    | null;
  interface WindowEventMap {
    rejectionhandled: PromiseRejectionEvent;
  }
}

defineEventHandlerIDLAttribute(globalThis, "onrejectionhandled");
process.on("rejectionhandled", (reason, promise) => {
  globalThis.dispatchEvent(
    new PromiseRejectionEvent("rejectionhandled", {
      promise,
      reason,
    })
  );
});
