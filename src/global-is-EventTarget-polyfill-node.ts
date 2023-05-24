function initEventTarget(target: EventTarget): void {
  const realEventTarget = new EventTarget();
  const privateSymbols = Object.getOwnPropertySymbols(realEventTarget).filter(
    (s) => !s.description?.startsWith("Symbol.")
  );
  for (const privateSymbol of privateSymbols) {
    const d = Object.getOwnPropertyDescriptor(realEventTarget, privateSymbol)!;
    Object.defineProperty(target, privateSymbol, d);
  }
}

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

export {};
