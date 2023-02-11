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
module.exports = __toCommonJS(utils_exports);
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
  arrayRefEquals,
  callArrayProp,
  createCallbackStack,
  dedupeArray,
  error,
  findIndexById,
  findItemById,
  formatTime,
  info,
  log,
  mutateFilter,
  mutateRemove,
  pushToArrayProp,
  trimString,
  warn
});
