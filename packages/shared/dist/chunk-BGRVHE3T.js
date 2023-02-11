import {
  __export
} from "./chunk-UICA3PK6.js";

// src/primitives.ts
var primitives_exports = {};
__export(primitives_exports, {
  atom: () => atom,
  createConsumers: () => createConsumers,
  createDerivedSignal: () => createDerivedSignal,
  createHover: () => createHover,
  createPingedSignal: () => createPingedSignal,
  defer: () => defer,
  makeHoverElementListener: () => makeHoverElementListener,
  trackFromListen: () => trackFromListen,
  untrackedCallback: () => untrackedCallback,
  useIsMobile: () => useIsMobile,
  useIsTouch: () => useIsTouch
});
import {
  createMemo,
  createSignal,
  getOwner,
  onCleanup,
  untrack,
  createComputed
} from "solid-js";
import { onRootCleanup } from "@solid-primitives/utils";
import { makeEventListener } from "@solid-primitives/event-listener";
import { createSharedRoot } from "@solid-primitives/rootless";
import { createMediaQuery } from "@solid-primitives/media";
var untrackedCallback = (fn) => (...a) => untrack(fn.bind(void 0, ...a));
var useIsTouch = createSharedRoot(() => createMediaQuery("(hover: none)"));
var useIsMobile = createSharedRoot(() => createMediaQuery("(max-width: 640px)"));
function createHover(handle) {
  let state = false;
  let mounted = true;
  const mql = window.matchMedia("(hover: none)");
  let isTouch = mql.matches;
  makeEventListener(mql, "change", ({ matches }) => {
    if (isTouch = matches)
      handle(state = false);
  });
  onCleanup(() => {
    mounted = false;
    if (state)
      handle(state = false);
  });
  const onChange = (newState) => {
    if (isTouch || !mounted)
      return;
    state !== newState && handle(state = newState);
  };
  return {
    onMouseEnter: () => onChange(true),
    onMouseLeave: () => setTimeout(() => onChange(false))
  };
}
function createConsumers(initial = []) {
  const [consumers, setConsumers] = createSignal([...initial], { name: "consumers" });
  const enabled = createMemo(() => consumers().some((consumer) => consumer()));
  return [
    enabled,
    (consumer) => {
      setConsumers((p) => [...p, consumer]);
      onRootCleanup(() => setConsumers((p) => p.filter((p2) => p2 !== consumer)));
    }
  ];
}
function createDerivedSignal(fallback, options) {
  const [source, setSource] = createSignal();
  return [
    createMemo(
      () => {
        const sourceRef = source();
        return sourceRef ? sourceRef() : fallback;
      },
      void 0,
      options
    ),
    (newSource) => {
      if (newSource && getOwner())
        onCleanup(() => setSource((p) => p === newSource ? void 0 : p));
      return setSource(() => newSource);
    }
  ];
}
function makeHoverElementListener(onHover) {
  let last = null;
  const handleHover = (e) => {
    const { target } = e;
    if (target === last || !(target instanceof HTMLElement) && target !== null)
      return;
    onHover(last = target);
  };
  makeEventListener(window, "mouseover", handleHover);
  makeEventListener(document, "mouseleave", handleHover.bind(void 0, { target: null }));
}
function defer(deps, fn, initialValue) {
  const isArray = Array.isArray(deps);
  let prevInput;
  let defer2 = true;
  return (prevValue) => {
    let input;
    if (isArray) {
      input = Array(deps.length);
      for (let i = 0; i < deps.length; i++)
        input[i] = deps[i]();
    } else
      input = deps();
    if (defer2) {
      defer2 = false;
      return initialValue;
    }
    const result = untrack(() => fn(input, prevInput, prevValue));
    prevInput = input;
    return result;
  };
}
function atom(value, options) {
  const [state, setState] = createSignal(value, { internal: true, ...options });
  return (...args) => args.length === 1 ? setState(args[0]) : state();
}
function trackFromListen(listen) {
  const [track, trigger] = createSignal(void 0, { equals: false });
  listen(trigger);
  return track;
}
function createPingedSignal(track, timeout = 400) {
  const [isUpdated, setIsUpdated] = createSignal(false);
  let timeoutId;
  createComputed(
    defer(track, () => {
      setIsUpdated(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsUpdated(false), timeout);
    })
  );
  onCleanup(() => clearTimeout(timeoutId));
  return isUpdated;
}

export {
  untrackedCallback,
  useIsTouch,
  useIsMobile,
  createHover,
  createConsumers,
  createDerivedSignal,
  makeHoverElementListener,
  defer,
  atom,
  trackFromListen,
  createPingedSignal,
  primitives_exports
};
