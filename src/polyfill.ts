import defineEventHandlerIDLAttribute from "./defineEventHandlerIDLAttribute";
import BeforeUnloadEvent_ from "./BeforeUnloadEvent";

declare global {
  // @ts-ignore
  type BeforeUnloadEvent = BeforeUnloadEvent_;
  // @ts-ignore
  var BeforeUnloadEvent: typeof BeforeUnloadEvent_;

  interface WindowEventMap {
    beforeunload: BeforeUnloadEvent;
    unload: Event;
    message: MessageEvent;
    rejectionhandled: PromiseRejectionEvent;
    error: ErrorEvent;
    unhandledrejection: PromiseRejectionEvent;
  }

  // @ts-ignore
  var onbeforeunload: ((this: Window, e: BeforeUnloadEvent) => any) | null;
  var onunload: ((this: Window, e: Event) => any) | null;
  var onmessage: ((this: Window, e: MessageEvent) => any) | null;
  var onrejectionhandled:
    | ((this: Window, e: PromiseRejectionEvent) => any)
    | null;
  // @ts-ignore
  var onerror:
    | ((
        event?: string,
        source?: string,
        lineno?: number,
        colno?: number,
        error?: Error
      ) => any)
    | null;
  var onunhandledrejection:
    | ((this: Window, e: PromiseRejectionEvent) => any)
    | null;
}

// @ts-ignore
globalThis.BeforeUnloadEvent = BeforeUnloadEvent_;

process.on("beforeExit", () =>
  globalThis.dispatchEvent(new Event("beforeunload"))
);
defineEventHandlerIDLAttribute(globalThis, "onbeforeunload");

process.on("exit", () => globalThis.dispatchEvent(new Event("unload")));
defineEventHandlerIDLAttribute(globalThis, "onunload");

process.on("uncaughtExceptionMonitor", (error, origin) =>
  globalThis.dispatchEvent(
    new ErrorEvent("error", { error, message: error.message, filename: origin })
  )
);
defineEventHandlerIDLAttribute(globalThis, "onerror");

process.on("unhandledRejection", (reason, promise) =>
  globalThis.dispatchEvent(
    new PromiseRejectionEvent("unhandledrejection", { reason, promise })
  )
);
defineEventHandlerIDLAttribute(globalThis, "onunhandledrejection");

process.on("rejectionHandled", (promise) =>
  globalThis.dispatchEvent(
    new PromiseRejectionEvent("rejectionhandled", { promise })
  )
);
defineEventHandlerIDLAttribute(globalThis, "onrejectionhandled");

process.on("message", (message) =>
  globalThis.dispatchEvent(new MessageEvent("message", { data: message }))
);
defineEventHandlerIDLAttribute(globalThis, "onmessage");
