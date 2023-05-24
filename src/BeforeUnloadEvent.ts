export default class BeforeUnloadEvent extends Event {
  #returnValue: string;
  private constructor(type: string, eventInitDict: EventInit = {}) {
    super(type, eventInitDict);

    this.#returnValue = "";
  }

  // @ts-ignore
  get returnValue(): string {
    // The returnValue attribute controls the process of checking if unloading
    // is user-canceled. When the event is created, the attribute must be set to
    // the empty string. On getting, it must return the last value it was set
    // to. On setting, the attribute must be set to the new value.

    return this.#returnValue;
  }
  // @ts-ignore
  set returnValue(returnValue: string) {
    this.#returnValue = `${returnValue}`;
  }
}
