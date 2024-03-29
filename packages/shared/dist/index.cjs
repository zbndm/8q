"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  primitives: () => primitives_exports,
  utils: () => utils_exports
});
module.exports = __toCommonJS(src_exports);

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
var import_solid_js = require("solid-js");
var import_utils = require("@solid-primitives/utils");
var import_event_listener = require("@solid-primitives/event-listener");
var import_rootless = require("@solid-primitives/rootless");
var import_media = require("@solid-primitives/media");
var untrackedCallback = (fn) => (...a) => (0, import_solid_js.untrack)(fn.bind(void 0, ...a));
var useIsTouch = (0, import_rootless.createSharedRoot)(() => (0, import_media.createMediaQuery)("(hover: none)"));
var useIsMobile = (0, import_rootless.createSharedRoot)(() => (0, import_media.createMediaQuery)("(max-width: 640px)"));
function createHover(handle) {
  let state = false;
  let mounted = true;
  const mql = window.matchMedia("(hover: none)");
  let isTouch = mql.matches;
  (0, import_event_listener.makeEventListener)(mql, "change", ({ matches }) => {
    if (isTouch = matches)
      handle(state = false);
  });
  (0, import_solid_js.onCleanup)(() => {
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
  const [consumers, setConsumers] = (0, import_solid_js.createSignal)([...initial], { name: "consumers" });
  const enabled = (0, import_solid_js.createMemo)(() => consumers().some((consumer) => consumer()));
  return [
    enabled,
    (consumer) => {
      setConsumers((p) => [...p, consumer]);
      (0, import_utils.onRootCleanup)(() => setConsumers((p) => p.filter((p2) => p2 !== consumer)));
    }
  ];
}
function createDerivedSignal(fallback, options) {
  const [source, setSource] = (0, import_solid_js.createSignal)();
  return [
    (0, import_solid_js.createMemo)(
      () => {
        const sourceRef = source();
        return sourceRef ? sourceRef() : fallback;
      },
      void 0,
      options
    ),
    (newSource) => {
      if (newSource && (0, import_solid_js.getOwner)())
        (0, import_solid_js.onCleanup)(() => setSource((p) => p === newSource ? void 0 : p));
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
  (0, import_event_listener.makeEventListener)(window, "mouseover", handleHover);
  (0, import_event_listener.makeEventListener)(document, "mouseleave", handleHover.bind(void 0, { target: null }));
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
    const result = (0, import_solid_js.untrack)(() => fn(input, prevInput, prevValue));
    prevInput = input;
    return result;
  };
}
function atom(value, options) {
  const [state, setState] = (0, import_solid_js.createSignal)(value, { internal: true, ...options });
  return (...args) => args.length === 1 ? setState(args[0]) : state();
}
function trackFromListen(listen) {
  const [track, trigger] = (0, import_solid_js.createSignal)(void 0, { equals: false });
  listen(trigger);
  return track;
}
function createPingedSignal(track, timeout = 400) {
  const [isUpdated, setIsUpdated] = (0, import_solid_js.createSignal)(false);
  let timeoutId;
  (0, import_solid_js.createComputed)(
    defer(track, () => {
      setIsUpdated(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsUpdated(false), timeout);
    })
  );
  (0, import_solid_js.onCleanup)(() => clearTimeout(timeoutId));
  return isUpdated;
}

// src/utils.ts
var utils_exports = {};
__export(utils_exports, {
  arrayRefEquals: () => arrayRefEquals,
  callArrayProp: () => callArrayProp,
  createCallbackStack: () => createCallbackStack,
  dedupeArray: () => dedupeArray,
  error: () => error,
  findIndexById: () => findIndexById,
  findItemById: () => findItemById,
  formatTime: () => formatTime,
  info: () => info,
  log: () => log,
  mutateFilter: () => mutateFilter,
  mutateRemove: () => mutateRemove,
  pushToArrayProp: () => pushToArrayProp,
  trimString: () => trimString,
  warn: () => warn
});
var getLogLabel = () => [
  `%csolid-devtools`,
  "color: #fff; background: #2c4f7c; padding: 1px 4px;"
];
function info(data) {
  console.info(...getLogLabel(), data);
  return data;
}
function log(...args) {
  console.log(...getLogLabel(), ...args);
}
function warn(...args) {
  console.warn(...getLogLabel(), ...args);
}
function error(...args) {
  console.error(...getLogLabel(), ...args);
}
function formatTime(d = /* @__PURE__ */ new Date()) {
  return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
}
var createCallbackStack = () => {
  let stack = [];
  const clear = () => stack = [];
  return {
    push: (...callbacks) => stack.push(...callbacks),
    execute(arg0, arg1, arg2, arg3) {
      stack.forEach((cb) => cb(arg0, arg1, arg2, arg3));
      clear();
    },
    clear
  };
};
function callArrayProp(object, key, ...args) {
  const arr = object[key];
  if (arr)
    for (const cb of arr)
      cb(...args);
}
function pushToArrayProp(object, key, value) {
  let arr = object[key];
  if (arr)
    arr.push(value);
  else
    arr = object[key] = [value];
  return arr;
}
function mutateFilter(array, predicate) {
  const temp = array.filter(predicate);
  array.length = 0;
  array.push.apply(array, temp);
}
function mutateRemove(array, item) {
  array.splice(array.indexOf(item), 1);
}
var dedupeArray = (array) => Array.from(new Set(array));
var arrayRefEquals = (a, b) => a === b || a.length === b.length && a.every((e) => b.includes(e));
function trimString(str, maxLength) {
  if (str.length <= maxLength)
    return str;
  return str.slice(0, maxLength) + "\u2026";
}
function findIndexById(array, id) {
  for (let i = 0; i < array.length; i++)
    if (array[i].id === id)
      return i;
  return -1;
}
function findItemById(array, id) {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (item.id === id)
      return item;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  primitives,
  utils
});
