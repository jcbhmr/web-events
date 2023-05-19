// https://github.com/nodejs/node/pull/45993
if (!(globalThis instanceof EventTarget)) {
  await import("./globalThis-EventTarget-polyfill");
}

await import("./polyfill");

export {};
