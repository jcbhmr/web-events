import PromiseRejectionEvent_ from "./PromiseRejectionEvent";
import PromiseRejectionEventInit_ from "./PromiseRejectionEventInit";

declare global {
  // @ts-ignore
  type PromiseRejectionEvent = PromiseRejectionEvent_;
  // @ts-ignore
  var PromiseRejectionEvent: typeof PromiseRejectionEvent_;
  // @ts-ignore
  type PromiseRejectionEventInit = PromiseRejectionEventInit_;
}

globalThis.PromiseRejectionEvent = PromiseRejectionEvent_;
