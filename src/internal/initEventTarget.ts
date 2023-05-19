export default function initEventTarget(target: EventTarget): void {
  const realEventTarget = new EventTarget();
  const privateSymbols = Object.getOwnPropertySymbols(realEventTarget).filter(
    (s) => !s.description?.startsWith("Symbol.")
  );
  for (const privateSymbol of privateSymbols) {
    const d = Object.getOwnPropertyDescriptor(realEventTarget, privateSymbol)!;
    Object.defineProperty(target, privateSymbol, d);
  }
}
