import initEventTarget from "./internal/initEventTarget";

declare global {
  // @ts-ignore
  var addEventListener: EventTarget["addEventListener"];
  // @ts-ignore
  var removeEventListener: EventTarget["removeEventListener"];
  // @ts-ignore
  var dispatchEvent: EventTarget["dispatchEvent"];
}

Object.setPrototypeOf(globalThis, EventTarget.prototype);
initEventTarget(globalThis);
