import defineEventHandlerIDLAttribute from "./defineEventHandlerIDLAttribute.js";

declare global {
  var onunload: ((this: Window, e: Event) => any) | null;
  interface WindowEventMap {
    unload: Event;
  }
}

defineEventHandlerIDLAttribute(globalThis, "onunload");
process.on("exit", () => {
  globalThis.dispatchEvent(new Event("unload"));
});
