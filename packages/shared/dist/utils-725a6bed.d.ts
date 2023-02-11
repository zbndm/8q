declare function info<T>(data: T): T;
declare function log(...args: any[]): void;
declare function warn(...args: any[]): void;
declare function error(...args: any[]): void;
declare function formatTime(d?: Date): string;
declare const createCallbackStack: <A0 = void, A1 = void, A2 = void, A3 = void>() => {
    push: (...callbacks: ((arg0: A0, arg1: A1, arg2: A2, arg3: A3) => void)[]) => void;
    execute: (arg0: A0, arg1: A1, arg2: A2, arg3: A3) => void;
    clear: VoidFunction;
};
declare function callArrayProp<K extends PropertyKey, T extends (...args: Args) => void, Args extends unknown[]>(object: {
    [_ in K]?: T[];
}, key: K, ...args: Args): void;
declare function pushToArrayProp<K extends PropertyKey, T>(object: {
    [_ in K]?: T[];
}, key: K, value: T): T[];
declare function mutateFilter<T, S extends T>(array: T[], predicate: (value: T, index: number, array: T[]) => value is S): void;
declare function mutateFilter<T>(array: T[], predicate: (value: T, index: number, array: T[]) => unknown): void;
declare function mutateRemove<T>(array: T[], item: T): void;
declare const dedupeArray: <T>(array: readonly T[]) => T[];
/** Checks if both arrays contain the same values. Order doesn't matter. */
declare const arrayRefEquals: <T>(a: readonly T[], b: readonly T[]) => boolean;
/** function that trims too long string */
declare function trimString(str: string, maxLength: number): string;
declare function findIndexById<T extends {
    id: string;
}>(array: T[], id: string): number;
declare function findItemById<T extends {
    id: string;
}>(array: T[], id: string): T | undefined;

declare const utils_info: typeof info;
declare const utils_log: typeof log;
declare const utils_warn: typeof warn;
declare const utils_error: typeof error;
declare const utils_formatTime: typeof formatTime;
declare const utils_createCallbackStack: typeof createCallbackStack;
declare const utils_callArrayProp: typeof callArrayProp;
declare const utils_pushToArrayProp: typeof pushToArrayProp;
declare const utils_mutateFilter: typeof mutateFilter;
declare const utils_mutateRemove: typeof mutateRemove;
declare const utils_dedupeArray: typeof dedupeArray;
declare const utils_arrayRefEquals: typeof arrayRefEquals;
declare const utils_trimString: typeof trimString;
declare const utils_findIndexById: typeof findIndexById;
declare const utils_findItemById: typeof findItemById;
declare namespace utils {
  export {
    utils_info as info,
    utils_log as log,
    utils_warn as warn,
    utils_error as error,
    utils_formatTime as formatTime,
    utils_createCallbackStack as createCallbackStack,
    utils_callArrayProp as callArrayProp,
    utils_pushToArrayProp as pushToArrayProp,
    utils_mutateFilter as mutateFilter,
    utils_mutateRemove as mutateRemove,
    utils_dedupeArray as dedupeArray,
    utils_arrayRefEquals as arrayRefEquals,
    utils_trimString as trimString,
    utils_findIndexById as findIndexById,
    utils_findItemById as findItemById,
  };
}

export { callArrayProp as a, mutateRemove as b, createCallbackStack as c, dedupeArray as d, error as e, formatTime as f, arrayRefEquals as g, findIndexById as h, info as i, findItemById as j, log as l, mutateFilter as m, pushToArrayProp as p, trimString as t, utils as u, warn as w };
