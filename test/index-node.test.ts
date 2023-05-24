import test from "node:test";
import assert from "node:assert";
import "../src/index-node";

test("exposes globals", () => {
  assert(globalThis instanceof EventTarget);
  assert(CustomEvent !== undefined);
  assert(BeforeUnloadEvent !== undefined);
  assert(ErrorEvent !== undefined);
  assert(PromiseRejectionEvent !== undefined);

  assert("onbeforeunload" in globalThis);
  assert("onunload" in globalThis);
  assert("onerror" in globalThis);
  assert("onunhandledrejection" in globalThis);
  assert("onrejectionhandled" in globalThis);
  assert("onmessage" in globalThis);
});

test("onrejectionhandled handler", () => {
  let i = 0;
  onrejectionhandled = () => i++;
  Promise.reject().catch(() => {});
  assert.equal(i, 1);
});

// I don't know how to test onerror, onunhandledrejection, onbeforeunload, and
// onunload handlers. I think you'd need some kind of complicated subprocess
// setup to test them.

// TODO: Test onerror
// TODO: Test onunhandledrejection
// TODO: Test onbeforeunload
// TODO: Test onunload
