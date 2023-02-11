import { KbdKey } from '@solid-primitives/keyboard';
import { LocationAttr } from '@solid-devtools/transform/types';
import * as solid_js_store_types_store from 'solid-js/store/types/store';
import * as solid_js_store from 'solid-js/store';
import * as solid_js_types_reactive_signal from 'solid-js/types/reactive/signal';
import { Many } from '@solid-primitives/utils';
import { createRoot } from 'solid-js';

declare const INFINITY = "__$sdt-Infinity__";
declare const NEGATIVE_INFINITY = "__$sdt-NegativeInfinity__";
declare const NAN = "__$sdt-NaN__";
declare enum NodeType {
    Root = 0,
    Component = 1,
    Effect = 2,
    Render = 3,
    Memo = 4,
    Computation = 5,
    Refresh = 6,
    Context = 7,
    Signal = 8,
    Store = 9
}
declare enum ValueType {
    Number = 0,
    Boolean = 1,
    String = 2,
    Null = 3,
    Undefined = 4,
    Symbol = 5,
    Array = 6,
    Object = 7,
    Function = 8,
    Getter = 9,
    Element = 10,
    Instance = 11,
    Store = 12
}

declare const getOwner: () => Solid.Owner | null;
declare const isSolidComputation: (o: Readonly<Solid.Owner>) => o is Solid.Computation;
declare const isSolidMemo: (o: Readonly<Solid.Owner>) => o is Solid.Memo;
declare const isSolidOwner: (o: Readonly<Solid.Owner | Solid.Store | Solid.Signal>) => o is Solid.Owner;
declare const isSolidRoot: (o: Readonly<Solid.Owner>) => o is Solid.Root;
declare const isSolidStore: (o: Readonly<Solid.Signal | Solid.Store>) => o is Solid.Store;
declare function getNodeName(o: Readonly<Solid.Signal | Solid.Owner | Solid.Store>): string;
declare function getNodeType(o: Readonly<Solid.Signal | Solid.Owner | Solid.Store>): NodeType;
declare const getOwnerType: (o: Readonly<Solid.Owner>) => NodeType;
declare function lookupOwner(owner: Solid.Owner, predicate: (owner: Solid.Owner) => boolean): Solid.Owner | null;
/**
 * Attach onCleanup callback to a reactive owner
 * @param prepend add the callback to the front of the stack, instead of pushing, fot it to be called before other cleanup callbacks.
 * @returns a function to remove the cleanup callback
 */
declare function onOwnerCleanup(owner: Solid.Owner, fn: VoidFunction, prepend?: boolean): VoidFunction;
/**
 * Attach onCleanup callback to the parent of a reactive owner if it has one.
 * @param prepend add the callback to the front of the stack, instead of pushing, fot it to be called before other cleanup callbacks.
 * @returns a function to remove the cleanup callback
 */
declare function onParentCleanup(owner: Solid.Owner, fn: VoidFunction, prepend?: boolean): VoidFunction;
declare function createUnownedRoot<T>(fn: (dispose: VoidFunction) => T): T;
declare function getFunctionSources(fn: () => unknown): Solid.Signal[];
declare const INTERNAL: unique symbol;
/**
 * Sold's `createRoot` primitive that won't be tracked by the debugger.
 */
declare const createInternalRoot: typeof createRoot;

type NodeID = string & {};
type ValueItemID = `signal:${NodeID}` | `prop:${string}` | `value`;
type ValueItemType = 'signal' | 'prop' | 'value';
declare const getValueItemId: <T extends ValueItemType>(type: T, id: T extends "value" ? undefined : string | NodeID) => ValueItemID;
type EncodedPreviewPayloadMap = {
    [ValueType.Array]: number;
    [ValueType.Object]: number;
    [ValueType.Number]: number | typeof INFINITY | typeof NEGATIVE_INFINITY | typeof NAN;
    [ValueType.Boolean]: boolean;
    [ValueType.String]: string;
    [ValueType.Symbol]: string;
    [ValueType.Function]: string;
    [ValueType.Getter]: string;
    [ValueType.Element]: {
        name: string;
        id: NodeID;
    };
    [ValueType.Instance]: string;
    [ValueType.Store]: {
        value: EncodedValue<boolean>;
        id: NodeID;
    };
};
type EncodedPreviewChildrenMap = {
    [ValueType.Array]: EncodedValue<true>[];
    [ValueType.Object]: Record<string | number, EncodedValue<true>>;
};
type EncodedValueOf<K extends ValueType, Deep extends boolean = boolean> = {
    type: K;
} & (K extends keyof EncodedPreviewPayloadMap ? {
    value: EncodedPreviewPayloadMap[K];
} : {
    value?: undefined;
}) & (Deep extends true ? K extends keyof EncodedPreviewChildrenMap ? {
    children: EncodedPreviewChildrenMap[K];
} : {
    children?: undefined;
} : {
    children?: undefined;
});
type EncodedValue<Deep extends boolean = boolean> = {
    [K in ValueType]: EncodedValueOf<K, Deep>;
}[ValueType];
type ValueUpdateListener = (newValue: unknown, oldValue: unknown) => void;
type DebuggerContext = {
    rootId: NodeID;
    triggerRootUpdate: VoidFunction;
    forceRootUpdate: VoidFunction;
} | typeof INTERNAL;
declare namespace Core {
    type Owner = solid_js_types_reactive_signal.Owner;
    type SignalState = solid_js_types_reactive_signal.SignalState<unknown>;
    type Computation = solid_js_types_reactive_signal.Computation<unknown>;
    type RootFunction<T> = solid_js_types_reactive_signal.RootFunction<T>;
    type EffectFunction = solid_js_types_reactive_signal.EffectFunction<unknown>;
    namespace Store {
        type StoreNode = solid_js_store.StoreNode;
        type NotWrappable = solid_js_store_types_store.NotWrappable;
        type OnStoreNodeUpdate = solid_js_store_types_store.OnStoreNodeUpdate;
    }
}
declare module 'solid-js/types/reactive/signal' {
    interface SignalState<T> {
        sdtId?: NodeID;
        sdtName?: string;
    }
    interface Owner {
        sdtId?: NodeID;
        sdtName?: string;
        sdtType?: NodeType;
    }
    interface Computation<Init, Next> {
        sdtId?: NodeID;
        sdtType?: NodeType;
        onValueUpdate?: Record<symbol, ValueUpdateListener>;
        onComputationUpdate?: VoidFunction;
    }
}
declare namespace Solid {
    interface SignalState {
        value: unknown;
        observers?: Computation[] | null;
        onValueUpdate?: Record<symbol, ValueUpdateListener>;
    }
    interface Signal extends Core.SignalState, SignalState {
        value: unknown;
        observers: Computation[] | null;
    }
    type OnStoreNodeUpdate = Core.Store.OnStoreNodeUpdate & {
        storePath: readonly (string | number)[];
        storeSymbol: symbol;
    };
    interface Store {
        value: Core.Store.StoreNode;
        sdtId?: NodeID;
    }
    interface Root extends Core.Owner {
        owned: Computation[] | null;
        owner: Owner | null;
        sourceMap?: Record<string, Signal | Store>;
        isDisposed?: boolean;
        sdtAttached?: Owner | null;
        sdtContext?: DebuggerContext;
        value?: undefined;
        sources?: undefined;
        fn?: undefined;
        state?: undefined;
        sourceSlots?: undefined;
        updatedAt?: undefined;
        pure?: undefined;
    }
    interface Computation extends Core.Computation {
        name: string;
        value: unknown;
        observers?: Computation[] | null;
        owned: Computation[] | null;
        owner: Owner | null;
        sourceMap?: Record<string, Signal>;
        sources: Signal[] | null;
        sdtContext?: undefined;
    }
    interface Memo extends Signal, Computation {
        name: string;
        value: unknown;
        observers: Computation[] | null;
    }
    interface Component extends Memo {
        props: Record<string, unknown>;
        componentName: string;
        location?: LocationAttr;
    }
    type Owner = Computation | Root;
}
declare namespace Mapped {
    interface Root {
        id: NodeID;
        name?: undefined;
        type: NodeType.Root;
        children?: Owner[];
        attached?: NodeID;
    }
    interface Owner {
        id: NodeID;
        type: Exclude<NodeType, NodeType.Root | NodeType.Refresh>;
        children?: Owner[];
        name?: string;
        hmr?: boolean;
        frozen?: true;
    }
    interface Signal {
        type: NodeType.Signal | NodeType.Memo | NodeType.Store;
        name: string;
        id: NodeID;
        value: EncodedValue<false>;
    }
    type ResolvedComponent = {
        id: NodeID;
        name: string;
        /**
         * ! HTMLElements aren't JSON serialisable
         */
        element: Many<HTMLElement>;
    };
    type Props = {
        proxy: boolean;
        record: Record<string, EncodedValue<boolean>>;
    };
    interface OwnerDetails {
        id: NodeID;
        name: string;
        type: NodeType;
        props?: Props;
        signals: Signal[];
        /** for computations */
        value?: EncodedValue;
        location?: LocationAttr;
    }
}
type ComputationUpdate = {
    rootId: NodeID;
    id: NodeID;
};
type RootsUpdates = {
    removed: NodeID[];
    updated: Record<NodeID, Mapped.Root>;
};

type LocatorComponent = {
    id: NodeID;
    rootId: NodeID;
    name: string;
    element: HTMLElement;
    location?: LocationAttr | undefined;
};
type TargetIDE = 'vscode' | 'webstorm' | 'atom' | 'vscode-insiders';
type SourceLocation = {
    filePath: string;
    line: number;
    column: number;
};
type SourceCodeData = SourceLocation & {
    projectPath: string;
    element: HTMLElement | string;
};
type TargetURLFunction = (data: SourceCodeData) => string | void;

type LocatorOptions = {
    /** Choose in which IDE the component source code should be revealed. */
    targetIDE?: false | TargetIDE | TargetURLFunction;
    /** Holding which key should enable the locator overlay? */
    key?: KbdKey;
};
type HighlightElementPayload = {
    rootId: NodeID;
    nodeId: NodeID;
} | {
    elementId: string;
} | null;
type ClickMiddleware = (event: MouseEvent | CustomEvent, component: LocatorComponent, data: SourceCodeData | undefined) => void;

type ValueNodeUpdate = {
    id: ValueItemID;
    value: EncodedValue<boolean>;
};
type StoreNodeUpdate = {
    valueNodeId: ValueItemID;
    storeId: NodeID;
    path: readonly (string | number)[];
    property: string | number;
    /**
     * `undefined` - property deleted;
     * `EncodedValue<true>` - property updated;
     * `number` - array length updated;
     */
    value: EncodedValue<true> | undefined | number;
};
/** List of new keys — all of the values are getters, so they won't change */
type ProxyPropsUpdate = {
    added: string[];
    removed: string[];
};
type InspectorUpdate = [type: 'value', update: ValueNodeUpdate] | [type: 'store', update: StoreNodeUpdate] | [type: 'props', update: ProxyPropsUpdate];
type SetInspectedNodeData = null | {
    rootId: NodeID;
    nodeId: NodeID;
};
type ToggleInspectedValueData = {
    id: ValueItemID;
    selected: boolean;
};

export { EncodedValueOf as A, EncodedValue as B, ComputationUpdate as C, DebuggerContext as D, EncodedPreviewPayloadMap as E, INFINITY as F, NEGATIVE_INFINITY as G, HighlightElementPayload as H, InspectorUpdate as I, NAN as J, NodeType as K, LocatorOptions as L, Mapped as M, NodeID as N, ValueType as O, ProxyPropsUpdate as P, RootsUpdates as R, Solid as S, ToggleInspectedValueData as T, ValueUpdateListener as V, Core as a, ClickMiddleware as b, getOwnerType as c, getNodeType as d, getNodeName as e, isSolidMemo as f, getOwner as g, isSolidOwner as h, isSolidComputation as i, isSolidRoot as j, isSolidStore as k, lookupOwner as l, onParentCleanup as m, getFunctionSources as n, onOwnerCleanup as o, createUnownedRoot as p, createInternalRoot as q, TargetIDE as r, TargetURLFunction as s, SetInspectedNodeData as t, StoreNodeUpdate as u, ValueNodeUpdate as v, ValueItemID as w, ValueItemType as x, getValueItemId as y, EncodedPreviewChildrenMap as z };
