import BeforeUnloadEvent_ from "./BeforeUnloadEvent.js";

declare global {
  // @ts-ignore
  type BeforeUnloadEvent = BeforeUnloadEvent_;
  // @ts-ignore
  var BeforeUnloadEvent: typeof BeforeUnloadEvent_;
}

// @ts-ignore
globalThis.BeforeUnloadEvent = BeforeUnloadEvent_;
