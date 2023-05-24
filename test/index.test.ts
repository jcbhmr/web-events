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

test("listening and dispatching custom events", () => {
  let i = 0;
  const listener = () => i++;
  globalThis.addEventListener("test", listener);
  globalThis.dispatchEvent(new Event("test"));
  globalThis.removeEventListener("test", listener);
  assert.equal(i, 1);

  globalThis.dispatchEvent(new Event("test"));
  assert.equal(i, 1);
});

test("using onevent properties", () => {
  let i = 0;
  globalThis.onerror = () => i++;
  globalThis.dispatchEvent(new Event("error"));
  globalThis.onerror = null;
  assert.equal(i, 1);
});
