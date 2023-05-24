/**
 * Default no-other-option polyfill that doesn't need to copy internal state.
 *
 * @file
 */

declare global {
  // @ts-ignore
  var addEventListener: EventTarget["addEventListener"];
  // @ts-ignore
  var removeEventListener: EventTarget["removeEventListener"];
  // @ts-ignore
  var dispatchEvent: EventTarget["dispatchEvent"];
}

Object.setPrototypeOf(globalThis, new EventTarget());

export {};
