import { C as ComputationUpdate, a as Core, S as Solid, V as ValueUpdateListener, R as RootsUpdates, I as InspectorUpdate, M as Mapped, N as NodeID, T as ToggleInspectedValueData, b as ClickMiddleware, H as HighlightElementPayload, L as LocatorOptions } from './index-55f1a111.js';
export { C as ComputationUpdate, a as Core, D as DebuggerContext, z as EncodedPreviewChildrenMap, E as EncodedPreviewPayloadMap, B as EncodedValue, A as EncodedValueOf, H as HighlightElementPayload, F as INFINITY, I as InspectorUpdate, L as LocatorOptions, M as Mapped, J as NAN, G as NEGATIVE_INFINITY, N as NodeID, K as NodeType, P as ProxyPropsUpdate, R as RootsUpdates, t as SetInspectedNodeData, S as Solid, u as StoreNodeUpdate, r as TargetIDE, s as TargetURLFunction, T as ToggleInspectedValueData, w as ValueItemID, x as ValueItemType, v as ValueNodeUpdate, O as ValueType, V as ValueUpdateListener, q as createInternalRoot, p as createUnownedRoot, n as getFunctionSources, e as getNodeName, d as getNodeType, g as getOwner, c as getOwnerType, y as getValueItemId, i as isSolidComputation, f as isSolidMemo, h as isSolidOwner, j as isSolidRoot, k as isSolidStore, l as lookupOwner, o as onOwnerCleanup, m as onParentCleanup } from './index-55f1a111.js';
import * as solid_js from 'solid-js';
import { ParentComponent } from 'solid-js';
import * as _solid_primitives_event_bus from '@solid-primitives/event-bus';
import { LocationAttr } from '@solid-devtools/transform/types';
export { LocationAttr } from '@solid-devtools/transform/types';
import '@solid-primitives/keyboard';
import 'solid-js/store/types/store';
import 'solid-js/store';
import 'solid-js/types/reactive/signal';
import '@solid-primitives/utils';

declare function markComponentLoc(location: LocationAttr): void;

type BatchComputationUpdatesHandler = (payload: ComputationUpdate[]) => void;

/**
 * Helps the debugger find and reattach an reactive owner created by `createRoot` to it's detached parent.
 *
 * Call this synchronously inside `createRoot` callback body, whenever you are using `createRoot` yourself to dispose of computations early, or inside `<For>`/`<Index>` components to reattach their children to reactive graph visible by the devtools debugger.
 * @example
 * createRoot(dispose => {
 * 	// This reactive Owner disapears form the owner tree
 *
 * 	// Reattach the Owner to the tree:
 * 	reattachOwner();
 * });
 */
declare function attachDebugger(_owner?: Core.Owner): void;
/**
 * Unobserves currently observed root owners.
 * This is not reversable, and should be used only when you are sure that they won't be used anymore.
 */
declare function unobserveAllRoots(): void;
/**
 * Listens to `createRoot` calls and attaches debugger to them.
 */
declare function enableRootsAutoattach(): void;

/**
 * Runs the callback on every Solid Graph Update – whenever computations update because of a signal change.
 * The listener is automatically cleaned-up on root dispose.
 *
 * This will listen to all updates of the reactive graph — including ones outside of the <Debugger> component, and debugger internal computations.
 */
declare function makeSolidUpdateListener(onUpdate: VoidFunction): VoidFunction;
type AfterCrateRoot = (root: Solid.Root) => void;
/**
 * Runs the callback every time a new Solid Root is created.
 * The listener is automatically cleaned-up on root dispose.
 */
declare function makeCreateRootListener(onUpdate: AfterCrateRoot): VoidFunction;
/**
 * Wraps the fn prop of owner object to trigger handler whenever the computation is executed.
 */
declare function observeComputationUpdate(owner: Solid.Computation, onRun: VoidFunction): void;
/**
 * Patches the "fn" prop of SolidComputation. Will execute the {@link onRun} callback whenever the computation is executed.
 * @param owner computation to patch
 * @param onRun execution handler
 *
 * {@link onRun} is provided with `execute()` function, and a `prev` value. `execute` is the computation handler function, it needs to be called inside {@link onRun} to calculate the next value or run side-effects.
 *
 * @example
 * ```ts
 * interceptComputationRerun(owner, (fn, prev) => {
 * 	// do something before execution
 * 	fn()
 * 	// do something after execution
 * })
 * ```
 */
declare function interceptComputationRerun(owner: Solid.Computation, onRun: <T>(execute: () => T, prev: T) => void): void;
/**
 * Patches the owner/signal value, firing the callback on each update immediately as it happened.
 */
declare function observeValueUpdate(node: Solid.SignalState, onUpdate: ValueUpdateListener, symbol: symbol): void;
declare function removeValueUpdateObserver(node: Solid.SignalState, symbol: symbol): void;
declare function makeValueUpdateListener(node: Solid.SignalState, onUpdate: ValueUpdateListener, symbol: symbol): void;

declare const Debugger: ParentComponent;
declare const useDebugger: () => {
    listenTo: _solid_primitives_event_bus.EventHubOn<{
        ComputationUpdates: _solid_primitives_event_bus.EventBus<ComputationUpdate[], ComputationUpdate[] | undefined>;
        StructureUpdates: _solid_primitives_event_bus.EventBus<RootsUpdates, RootsUpdates | undefined>;
        InspectorUpdate: _solid_primitives_event_bus.EventBus<InspectorUpdate[], InspectorUpdate[] | undefined>;
        InspectedNodeDetails: _solid_primitives_event_bus.EventBus<Mapped.OwnerDetails, Mapped.OwnerDetails | undefined>;
    }>;
    setUserEnabledSignal: (signal: solid_js.Accessor<boolean>) => void;
    triggerUpdate: _solid_primitives_event_bus.GenericEmit<[void, void, void]>;
    forceTriggerUpdate: _solid_primitives_event_bus.GenericEmit<[void, void, void]>;
    openInspectedNodeLocation: () => void;
    inspector: {
        setInspectedNode: (data: {
            rootId: NodeID;
            nodeId: NodeID;
        } | null) => void;
        toggleValueNode: ({ id, selected }: ToggleInspectedValueData) => void;
    };
    locator: {
        toggleEnabled: (state?: boolean | undefined) => void;
        enabledByDebugger: solid_js.Accessor<boolean>;
        addClickInterceptor: (interceptor: ClickMiddleware) => void;
        setHighlightTarget: (data: HighlightElementPayload) => void | null;
        onHoveredComponent: _solid_primitives_event_bus.GenericListen<[{
            nodeId: NodeID;
            state: boolean;
        }, void, void]>;
    };
};
declare const useLocator: (options: LocatorOptions) => void;

export { AfterCrateRoot, BatchComputationUpdatesHandler, Debugger, attachDebugger, enableRootsAutoattach, interceptComputationRerun, makeCreateRootListener, makeSolidUpdateListener, makeValueUpdateListener, markComponentLoc, observeComputationUpdate, observeValueUpdate, removeValueUpdateObserver, unobserveAllRoots, useDebugger, useLocator };
