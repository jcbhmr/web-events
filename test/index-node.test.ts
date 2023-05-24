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
});

test("using onevent properties", () => {
  let i = 0;
  globalThis.onerror = () => i++;
  globalThis.dispatchEvent(new Event("error"));
  globalThis.onerror = null;
  assert.equal(i, 1);
});

// I don't know how to test these yet.
// TODO: Test onerror
// TODO: Test onunhandledrejection
// TODO: Test onrejectionhandled
// TODO: Test onbeforeunload
// TODO: Test onunload
