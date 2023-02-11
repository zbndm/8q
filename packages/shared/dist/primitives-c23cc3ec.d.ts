import { Accessor } from 'solid-js';
import { MemoOptions, AccessorArray, OnEffectFunction, NoInfer, EffectFunction, SignalOptions } from 'solid-js/types/reactive/signal';
import { AnyFunction } from '@solid-primitives/utils';
import { Primitive } from 'type-fest';
import { Listen } from '@solid-primitives/event-bus';

type WritableDeep<T> = 0 extends 1 & T ? T : T extends Primitive ? T : {
    -readonly [K in keyof T]: WritableDeep<T[K]>;
};
declare const untrackedCallback: <Fn extends AnyFunction>(fn: Fn) => Fn;
declare const useIsTouch: () => () => boolean;
declare const useIsMobile: () => () => boolean;
declare function createHover(handle: (hovering: boolean) => void): {
    onMouseEnter: VoidFunction;
    onMouseLeave: VoidFunction;
};
/**
 * Reactive array reducer — if at least one consumer (boolean signal) is enabled — the returned result will the `true`.
 *
 * For **IOC**
 */
declare function createConsumers(initial?: readonly Accessor<boolean>[]): [needed: Accessor<boolean>, addConsumer: (consumer: Accessor<boolean>) => void];
type DerivedSignal<T> = [
    value: Accessor<T>,
    setSource: (source?: Accessor<T>) => Accessor<T> | undefined
];
/**
 * For **IOC**
 */
declare function createDerivedSignal<T>(): DerivedSignal<T>;
declare function createDerivedSignal<T>(fallback: T, options?: MemoOptions<T>): DerivedSignal<T>;
declare function makeHoverElementListener(onHover: (el: HTMLElement | null) => void): void;
/**
 * Solid's `on` helper, but always defers and returns a provided initial value when if does instead of `undefined`.
 *
 * @param deps
 * @param fn
 * @param initialValue
 */
declare function defer<S, Next extends Prev, Prev = Next>(deps: AccessorArray<S> | Accessor<S>, fn: OnEffectFunction<S, undefined | NoInfer<Prev>, Next>, initialValue: Next): EffectFunction<undefined | NoInfer<Next>, NoInfer<Next>>;
declare function defer<S, Next extends Prev, Prev = Next>(deps: AccessorArray<S> | Accessor<S>, fn: OnEffectFunction<S, undefined | NoInfer<Prev>, Next>, initialValue?: undefined): EffectFunction<undefined | NoInfer<Next>>;
type Atom<T> = (<U extends T>(value: (prev: T) => U) => U) & (<U extends T>(value: Exclude<U, Function>) => U) & (<U extends T>(value: Exclude<U, Function> | ((prev: T) => U)) => U) & Accessor<T>;
declare function atom<T>(value: T, options?: SignalOptions<T>): Atom<T>;
declare function atom<T>(value?: undefined, options?: SignalOptions<T | undefined>): Atom<T | undefined>;
declare function trackFromListen(listen: Listen): VoidFunction;
/**
 * Creates a signal that will be activated for a given amount of time on every "ping" — a call to the listener function.
 */
declare function createPingedSignal(track: VoidFunction, timeout?: number): Accessor<boolean>;

type primitives_WritableDeep<T> = WritableDeep<T>;
declare const primitives_untrackedCallback: typeof untrackedCallback;
declare const primitives_useIsTouch: typeof useIsTouch;
declare const primitives_useIsMobile: typeof useIsMobile;
declare const primitives_createHover: typeof createHover;
declare const primitives_createConsumers: typeof createConsumers;
type primitives_DerivedSignal<T> = DerivedSignal<T>;
declare const primitives_createDerivedSignal: typeof createDerivedSignal;
declare const primitives_makeHoverElementListener: typeof makeHoverElementListener;
declare const primitives_defer: typeof defer;
type primitives_Atom<T> = Atom<T>;
declare const primitives_atom: typeof atom;
declare const primitives_trackFromListen: typeof trackFromListen;
declare const primitives_createPingedSignal: typeof createPingedSignal;
declare namespace primitives {
  export {
    primitives_WritableDeep as WritableDeep,
    primitives_untrackedCallback as untrackedCallback,
    primitives_useIsTouch as useIsTouch,
    primitives_useIsMobile as useIsMobile,
    primitives_createHover as createHover,
    primitives_createConsumers as createConsumers,
    primitives_DerivedSignal as DerivedSignal,
    primitives_createDerivedSignal as createDerivedSignal,
    primitives_makeHoverElementListener as makeHoverElementListener,
    primitives_defer as defer,
    primitives_Atom as Atom,
    primitives_atom as atom,
    primitives_trackFromListen as trackFromListen,
    primitives_createPingedSignal as createPingedSignal,
  };
}

export { Atom as A, DerivedSignal as D, WritableDeep as W, useIsTouch as a, useIsMobile as b, createHover as c, createConsumers as d, createDerivedSignal as e, defer as f, atom as g, createPingedSignal as h, makeHoverElementListener as m, primitives as p, trackFromListen as t, untrackedCallback as u };
