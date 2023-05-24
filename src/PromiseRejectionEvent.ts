import PromiseRejectionEventInit from "./PromiseRejectionEventInit.js";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
 * @see https://html.spec.whatwg.org/multipage/webappapis.html#promiserejectionevent
 */
export default class PromiseRejectionEvent extends Event {
  #promise: Promise<any>;
  #reason?: any;
  constructor(type: string, eventInitDict: PromiseRejectionEventInit) {
    type = `${type}`;
    eventInitDict = PromiseRejectionEventInit.from(eventInitDict);

    super(type, eventInitDict);

    this.#promise = eventInitDict.promise;
    this.#reason = eventInitDict.reason;
  }

  get promise(): Promise<any> {
    // The promise attribute must return the value it was initialized to. It
    // represents the promise which this notification is about.

    return this.#promise;
  }

  get reason(): any {
    // The reason attribute must return the value it was initialized to. It
    // represents the rejection reason for the promise.

    return this.#reason;
  }
}
