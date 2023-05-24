/**
 * @see https://html.spec.whatwg.org/multipage/webappapis.html#the-promiserejectionevent-interface
 * @see https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
 */
interface PromiseRejectionEventInit extends EventInit {
  promise: Promise<any>;
  reason?: any;
}
const PromiseRejectionEventInit = {
  from(o: unknown): {
    promise: Promise<any>;
    reason?: any;
  } {
    // TODO: Coerce to Web IDL dictionary
    return o as { promise: Promise<any>; reason?: any };
  },
};

export default PromiseRejectionEventInit;
