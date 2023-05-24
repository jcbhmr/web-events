import defineEventHandlerIDLAttribute from "./defineEventHandlerIDLAttribute";

if (typeof PromiseRejectionEvent === "undefined") {
  await import("./PromiseRejectionEvent-polyfill");
}

declare global {
  var onunhandledrejection:
    | ((this: Window, e: PromiseRejectionEvent) => any)
    | null;
  interface WindowEventMap {
    unhandledrejection: PromiseRejectionEvent;
  }
}

defineEventHandlerIDLAttribute(globalThis, "onunhandledrejection");
process.on("unhandledRejection", (reason, promise) => {
  globalThis.dispatchEvent(
    new PromiseRejectionEvent("unhandledrejection", {
      promise,
      reason,
    })
  );
});
