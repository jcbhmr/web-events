import defineEventHandlerIDLAttribute from "./defineEventHandlerIDLAttribute.js";

if (typeof BeforeUnloadEvent === "undefined") {
  await import("./BeforeUnloadEvent-polyfill.js");
}

declare global {
  // @ts-ignore
  var onbeforeunload: ((this: Window, e: BeforeUnloadEvent) => any) | null;
  // @ts-ignore
  interface WindowEventMap {
    // @ts-ignore
    beforeunload: BeforeUnloadEvent;
  }
}

defineEventHandlerIDLAttribute(globalThis, "onbeforeunload");
process.on("beforeExit", () => {
  let event: BeforeUnloadEvent;
  try {
    // @ts-ignore
    event = new BeforeUnloadEvent("beforeunload");
  } catch {
    event = new Event("beforeunload");
  }
  globalThis.dispatchEvent(event);
});
