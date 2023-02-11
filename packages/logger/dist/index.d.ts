import { Accessor } from 'solid-js';
import { Many } from '@solid-primitives/utils';
import { Core } from '@solid-devtools/debugger';

declare module 'solid-js/types/reactive/signal' {
    interface Owner {
        $debug?: boolean;
        $debugSignals?: boolean;
        $debugOwned?: boolean;
    }
    interface SignalState<T> {
        $debugSignal?: boolean;
    }
}
interface DebugComputationOptions {
    /** hook called during initial computation run? *(Defaults to `true`)* */
    initialRun?: boolean;
}
/**
 * Debug the current computation owner by logging it's lifecycle state to the browser console.
 * @param owner The owner to debug. If not provided, the current owner will be used.
 * @param options Options for the debug. _(optional)_
 *
 * Following information will be tracked and displayed in the console:
 * - The computation's initial state. (value, name, dependencies, execution time, etc.)
 * - The computation's state after each rerun. (value, previous value, dependencies, sources that have caused the rerun, execution time, etc.)
 * - The computation disposal.
 *
 * @example
 * ```ts
 * createEffect(() => {
 * 	debugComputation()
 * 	// ...
 * })
 * ```
 */
declare function debugComputation(owner?: Core.Owner, options?: DebugComputationOptions): void;
/**
 * Debug the computations owned by the provided {@link owner} by logging their lifecycle state to the browser console.
 * @param owner The owner to debug. If not provided, the current owner will be used.
 * @param options Options for the debug. _(optional)_
 *
 * Following information will be tracked and displayed in the console:
 * - The computations initial state. (value, name, dependencies, execution time, etc.)
 * - The computations state after each rerun. (value, previous value, dependencies, sources that have caused the rerun, execution time, etc.)
 * - The computations disposal.
 *
 * @example
 * ```tsx
 * const Button = props => {
 * 	debugOwnerComputations()
 * 	createEffect(() => {...})
 * 	return <button {...props} />
 * }
 * ```
 */
declare function debugOwnerComputations(owner?: Core.Owner): void;
interface DebugSignalOptions {
    trackObservers?: boolean;
    logInitialValue?: boolean;
}
/**
 * Debug the provided {@link source} by logging its lifecycle state to the browser console.
 * @param source The signal to debug. *(a function that will be executed to get the signal node)*
 * @param options Options for the debug. _(optional)_
 *
 * Following information will be tracked and displayed in the console:
 * - The signal's initial state. (value, name, observers, etc.)
 * - The signal's state after each value update. (value, previous value, observers, caused reruns, etc.)
 *
 * @example
 * ```ts
 * const [count, setCount] = createSignal(0)
 * debugSignal(count)
 * ```
 */
declare function debugSignal(source: Accessor<unknown> | Core.SignalState, options?: DebugSignalOptions): void;
/**
 * Debug the provided {@link source} signals by logging their lifecycle state to the browser console.
 * @param source The signals to debug. *(a function that will be executed to get the graph nodes — or an array thereof)*
 * @param options Options for the debug. _(optional)_
 *
 * Following information will be tracked and displayed in the console:
 * - The signals initial state. (value, name, observers, etc.)
 * - The signals state after each value update. (value, previous value, observers, caused reruns, etc.)
 *
 * @example
 * ```ts
 * const [count, setCount] = createSignal(0)
 * const double = createMemo(() => count * 2)
 * debugSignals([count, double])
 * ```
 */
declare function debugSignals(source: Many<Accessor<unknown>> | Core.SignalState[], options?: DebugSignalOptions): void;
/**
 * Debug the {@link owner} signals by logging their lifecycle state to the browser console.
 * @param owner owner to get the signals from.
 * @param options Options for the debug. _(optional)_
 *
 * Following information will be tracked and displayed in the console:
 * - The signals initial state. (value, name, observers, etc.)
 * - The signals state after each value update. (value, previous value, observers, caused reruns, etc.)
 *
 * @example
 * ```tsx
 * const Button = props => {
 * 	const [count, setCount] = createSignal(0)
 * 	const double = createMemo(() => count * 2)
 * 	debugOwnerSignals()
 * 	return <button onClick={() => setCount(count + 1)}>{count}</button>
 * }
 * ```
 */
declare function debugOwnerSignals(owner?: Core.Owner, options?: DebugSignalOptions): void;
/**
 * Debug the provided {@link props} object by logging their state to the console.
 * @param props component's props object.
 * @example
 * ```tsx
 * const Button = props => {
 * 	debugProps(props)
 * 	return <div>Hello</div>
 * }
 * ```
 */
declare function debugProps(props: Record<string, unknown>): void;

export { DebugSignalOptions, debugComputation, debugOwnerComputations, debugOwnerSignals, debugProps, debugSignal, debugSignals };
