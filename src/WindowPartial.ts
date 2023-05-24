interface WindowPartial extends Window {
  readonly event: Event | undefined;
}
/**
 * You'll need to manually apply this partial. We don't know when or if you
 * want/need it. You decide if your environment is "Window-y" enough to need
 * this legacy property.
 *
 * @example
 *   import WindowPartial from "@jcbhmr/web-events/WindowPartial.js";
 *   const p = Object.getOwnPropertyDescriptor(
 *     WindowPartial.prototype,
 *     "event"
 *   );
 *   Object.defineProperty(Window.prototype, "event", p);
 */
const WindowPartial = {
  prototype: {
    get event(): Event | undefined {
      return undefined;
    },
  },
};

export default WindowPartial;
