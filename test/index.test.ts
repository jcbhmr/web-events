import { test, expect, assert } from "vitest";
import "../src/index";

test("exposes globals", () => {
  expect(globalThis).toBeInstanceOf(EventTarget);
  expect(CustomEvent).toBeDefined();
  expect(BeforeUnloadEvent).toBeDefined();
  expect(PromiseRejectionEvent).toBeDefined();

  expect("onbeforeunload" in globalThis).toBe(true);
  expect("onunload" in globalThis).toBe(true);
  expect("onerror" in globalThis).toBe(true);
  expect("onunhandledrejection" in globalThis).toBe(true);
  expect("onrejectionhandled" in globalThis).toBe(true);
  expect("onmessage" in globalThis).toBe(true);
});

test("listening and dispatching custom events", () => {
  let i = 0;
  const listener = () => i++;
  globalThis.addEventListener("test", listener);
  globalThis.dispatchEvent(new CustomEvent("test"));
  globalThis.removeEventListener("test", listener);
  expect(i).toBe(1);

  globalThis.dispatchEvent(new CustomEvent("test"));
  expect(i).toBe(1);
});

test("using onevent properties", () => {
  let i = 0;
  globalThis.onmessage = () => i++;
  globalThis.dispatchEvent(new MessageEvent("message"));
  globalThis.onmessage = null;
  expect(i).toBe(1);
});

test("promise rejection handling events are dispatched", async () => {
  let i = 0;
  globalThis.onunhandledrejection = () => i++;
  Promise.reject().catch(() => {});
  await new Promise((r) => setTimeout(r, 10));
  globalThis.onunhandledrejection = null;
  expect(i).toBe(1);
});
