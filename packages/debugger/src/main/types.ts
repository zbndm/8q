import { LocationAttr } from '@solid-devtools/transform/types'
import type { Many } from '@solid-primitives/utils'
import { INFINITY, NAN, NEGATIVE_INFINITY, NodeType, ValueType } from './constants'
import type { INTERNAL } from './utils'

export type { LocationAttr } from '@solid-devtools/transform/types'

export type NodeID = string & {}

export type ValueItemID = `signal:${NodeID}` | `prop:${string}` | `value`
export type ValueItemType = 'signal' | 'prop' | 'value'

export const getValueItemId = <T extends ValueItemType>(
  type: T,
  id: T extends 'value' ? undefined : NodeID | string,
): ValueItemID => {
  if (type === 'value') return 'value'
  return `${type}:${id}` as ValueItemID
}

export type EncodedPreviewPayloadMap = {
  [ValueType.Array]: number
  [ValueType.Object]: number
  [ValueType.Number]: number | typeof INFINITY | typeof NEGATIVE_INFINITY | typeof NAN
  [ValueType.Boolean]: boolean
  [ValueType.String]: string
  [ValueType.Symbol]: string
  [ValueType.Function]: string
  [ValueType.Getter]: string
  [ValueType.Element]: { name: string; id: NodeID }
  [ValueType.Instance]: string
  [ValueType.Store]: { value: EncodedValue<boolean>; id: NodeID }
}

export type EncodedPreviewChildrenMap = {
  [ValueType.Array]: EncodedValue<true>[]
  [ValueType.Object]: Record<string | number, EncodedValue<true>>
}

export type EncodedValueOf<K extends ValueType, Deep extends boolean = boolean> = {
  type: K
} & (K extends keyof EncodedPreviewPayloadMap
  ? { value: EncodedPreviewPayloadMap[K] }
  : { value?: undefined }) &
  (Deep extends true
    ? K extends keyof EncodedPreviewChildrenMap
      ? { children: EncodedPreviewChildrenMap[K] }
      : { children?: undefined }
    : { children?: undefined })

export type EncodedValue<Deep extends boolean = boolean> = {
  [K in ValueType]: EncodedValueOf<K, Deep>
}[ValueType]

export type ValueUpdateListener = (newValue: unknown, oldValue: unknown) => void

export type DebuggerContext =
  | {
      rootId: NodeID
      triggerRootUpdate: VoidFunction
      forceRootUpdate: VoidFunction
    }
  | typeof INTERNAL

export namespace Core {
  export type Owner = import('solid-js/types/reactive/signal').Owner
  export type SignalState = import('solid-js/types/reactive/signal').SignalState<unknown>
  export type Computation = import('solid-js/types/reactive/signal').Computation<unknown>
  export type RootFunction<T> = import('solid-js/types/reactive/signal').RootFunction<T>
  export type EffectFunction = import('solid-js/types/reactive/signal').EffectFunction<unknown>
  export namespace Store {
    export type StoreNode = import('solid-js/store').StoreNode
    export type NotWrappable = import('solid-js/store/types/store').NotWrappable
    export type OnStoreNodeUpdate = import('solid-js/store/types/store').OnStoreNodeUpdate
  }
}

declare module 'solid-js/types/reactive/signal' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface SignalState<T> {
    sdtId?: NodeID
    sdtName?: string
  }
  interface Owner {
    sdtId?: NodeID
    sdtName?: string
    sdtType?: NodeType
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Computation<Init, Next> {
    sdtId?: NodeID
    sdtType?: NodeType
    onValueUpdate?: Record<symbol, ValueUpdateListener>
    onComputationUpdate?: VoidFunction
  }
}

//
// "Signal___" — owner/signals/etc. objects in the Solid's internal owner graph
//

export namespace Solid {
  export interface SignalState {
    value: unknown
    observers?: Computation[] | null
    onValueUpdate?: Record<symbol, ValueUpdateListener>
  }

  export interface Signal extends Core.SignalState, SignalState {
    value: unknown
    observers: Computation[] | null
  }

  export type OnStoreNodeUpdate = Core.Store.OnStoreNodeUpdate & {
    storePath: readonly (string | number)[]
    storeSymbol: symbol
  }

  export interface Store {
    value: Core.Store.StoreNode
    sdtId?: NodeID
  }

  export interface Root extends Core.Owner {
    owned: Computation[] | null
    owner: Owner | null
    sourceMap?: Record<string, Signal | Store>
    // Used by the debugger
    isDisposed?: boolean
    sdtAttached?: Owner | null
    sdtContext?: DebuggerContext
    // Computation compatibility
    value?: undefined
    sources?: undefined
    fn?: undefined
    state?: undefined
    sourceSlots?: undefined
    updatedAt?: undefined
    pure?: undefined
  }

  export interface Computation extends Core.Computation {
    name: string
    value: unknown
    observers?: Computation[] | null
    owned: Computation[] | null
    owner: Owner | null
    sourceMap?: Record<string, Signal>
    sources: Signal[] | null
    // devtools:
    sdtContext?: undefined
  }

  export interface Memo extends Signal, Computation {
    name: string
    value: unknown
    observers: Computation[] | null
  }

  export interface Component extends Memo {
    props: Record<string, unknown>
    componentName: string
    location?: LocationAttr
  }

  export type Owner = Computation | Root
}

//
// "Mapped___" should be JSON serialisable — to be able to send them with chrome.runtime.sendMessage
//

export namespace Mapped {
  export interface Root {
    id: NodeID
    name?: undefined
    type: NodeType.Root
    children?: Owner[]
    // sub-roots will have an owner
    attached?: NodeID
  }

  export interface Owner {
    id: NodeID
    type: Exclude<NodeType, NodeType.Root | NodeType.Refresh>
    // combines?: NodeID[]
    children?: Owner[]
    name?: string
    // component wrapped with a hmr memo?
    hmr?: boolean
    // computation without sources
    frozen?: true
  }

  export interface Signal {
    type: NodeType.Signal | NodeType.Memo | NodeType.Store
    name: string
    id: NodeID
    value: EncodedValue<false>
  }

  export type ResolvedComponent = {
    id: NodeID
    name: string
    /**
     * ! HTMLElements aren't JSON serialisable
     */
    element: Many<HTMLElement>
  }

  export type Props = {
    proxy: boolean
    record: Record<string, EncodedValue<boolean>>
  }

  export interface OwnerDetails {
    id: NodeID
    name: string
    type: NodeType
    props?: Props
    signals: Signal[]
    /** for computations */
    value?: EncodedValue
    // component with a location
    location?: LocationAttr
  }
}

export type ComputationUpdate = { rootId: NodeID; id: NodeID }

export type RootsUpdates = {
  removed: NodeID[]
  updated: Record<NodeID, Mapped.Root>
}
