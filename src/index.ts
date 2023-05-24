if (!(globalThis instanceof EventTarget)) {
  await import("./global-is-EventTarget-polyfill.js");
}

export {};
