import defineEventHandlerIDLAttribute from "./defineEventHandlerIDLAttribute.js";

if (typeof ErrorEvent === "undefined") {
  await import("./ErrorEvent-polyfill.js");
}

declare global {
  // @ts-ignore
  var onerror:
    | ((
        event?: Event | string,
        source?: string,
        lineno?: number,
        colno?: number,
        error?: Error
      ) => any)
    | null;
  interface WindowEventMap {
    error: ErrorEvent;
  }
}

defineEventHandlerIDLAttribute(globalThis, "onerror");
process.on("uncaughtExceptionMonitor", (error, origin) =>
  globalThis.dispatchEvent(
    new ErrorEvent("error", { error, message: error.message, filename: origin })
  )
);
