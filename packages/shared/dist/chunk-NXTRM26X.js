import {
  __export
} from "./chunk-UICA3PK6.js";

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

export {
  info,
  log,
  warn,
  error,
  formatTime,
  createCallbackStack,
  callArrayProp,
  pushToArrayProp,
  mutateFilter,
  mutateRemove,
  dedupeArray,
  arrayRefEquals,
  trimString,
  findIndexById,
  findItemById,
  utils_exports
};
