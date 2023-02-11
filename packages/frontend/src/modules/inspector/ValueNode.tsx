import {
  Component,
  createContext,
  createMemo,
  createSignal,
  JSX,
  Match,
  Show,
  Switch,
  untrack,
  useContext,
} from 'solid-js'
import { Entries } from '@solid-primitives/keyed'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import {
  NodeID,
  EncodedValue,
  EncodedValueOf,
  INFINITY,
  NAN,
  NEGATIVE_INFINITY,
  ValueType,
} from '@solid-devtools/debugger/types'
import { createHover, createPingedSignal } from '@solid-devtools/shared/primitives'
import { CollapseToggle, Highlight } from '@/ui'
import * as styles from './ValueNode.css'

type ToggleElementHover = (elementId: NodeID, hovered?: boolean) => void

const ValueContext = createContext<{ onElementHover?: ToggleElementHover; underStore: boolean }>()

function createNestedHover() {
  const [isHovered, setIsHovered] = createSignal(false)
  return {
    isHovered,
    hoverProps: {
      'on:pointerover': (e: PointerEvent) => {
        e.stopPropagation()
        setIsHovered(true)
      },
      'on:pointerout': (e: PointerEvent) => {
        e.stopPropagation()
        setIsHovered(false)
      },
    },
  }
}

const getIsCollapsable = (value: EncodedValue): boolean =>
  value.type === ValueType.Object ||
  value.type === ValueType.Array ||
  value.type === ValueType.Store

export const ValueNode: Component<{
  value: EncodedValue
  name: JSX.Element
  extended?: boolean
  /** top-level, or inside a store (the value can change) */
  isSignal?: boolean
  onClick?: VoidFunction
  onElementHover?: ToggleElementHover
}> = props => {
  const ctx = useContext(ValueContext)
  const isStore = () => props.value.type === ValueType.Store
  const isCollapsable = () => getIsCollapsable(props.value)

  const isUpdated =
    props.isSignal || ctx?.underStore ? createPingedSignal(() => props.value) : undefined

  const ValueContent = () => <ValuePreview value={props.value} extended={props.extended} />

  const handleSelect = () => {
    if (props.onClick && isCollapsable()) props.onClick()
  }

  const content = createMemo(() => (
    <>
      <div class={styles.name.container} onClick={handleSelect}>
        <div class={styles.name.name} data-signal={props.isSignal || ctx?.underStore}>
          <Highlight highlight={isUpdated && isUpdated()} isSignal class={styles.name.highlight}>
            {props.name}
          </Highlight>
        </div>
      </div>
      {
        // provide context if one isn't already provided or if the value is a store
        // (so that the ctx.underStore could be overwritten)
        ctx && !isStore() ? (
          <ValueContent />
        ) : (
          <ValueContext.Provider
            value={{
              onElementHover: props.onElementHover || ctx?.onElementHover,
              get underStore() {
                return isStore()
              },
            }}
          >
            <ValueContent />
          </ValueContext.Provider>
        )
      }
    </>
  ))

  return (
    <Show when={isCollapsable()} fallback={<li class={styles.row.container.base}>{content()}</li>}>
      {untrack(() => {
        const { isHovered, hoverProps } = createNestedHover()
        return (
          <li
            class={styles.row.container.collapsable}
            data-hovered={isHovered()}
            style={assignInlineVars({
              [styles.row.collapseOpacity]: isHovered() || props.extended ? '1' : '0',
            })}
            {...hoverProps}
          >
            <div class={styles.row.highlight} />
            <div class={styles.row.toggle.container}>
              <CollapseToggle
                onToggle={handleSelect}
                class={styles.row.toggle.button}
                isCollapsed={!props.extended}
                defaultCollapsed
              />
            </div>
            {content()}
          </li>
        )
      })}
    </Show>
  )
}

const ValuePreview: Component<{ value: EncodedValue<boolean>; extended?: boolean }> = props => {
  return createMemo(() => {
    const value = props.value
    switch (value.type) {
      case ValueType.String:
        return <StringValuePreview value={value} />
      case ValueType.Number:
        return <NumberValuePreview value={value} />
      case ValueType.Boolean:
        return <BooleanValuePreview value={value} />
      case ValueType.Object:
      case ValueType.Array:
        return <ObjectValuePreview value={value} extended={props.extended} />
      case ValueType.Function:
        return <FunctionValuePreview value={value} />
      case ValueType.Getter:
        return <GetterValuePreview value={value} />
      case ValueType.Null:
      case ValueType.Undefined:
        return <NullableValuePreview value={value} />
      case ValueType.Symbol:
        return <SymbolValuePreview value={value} />
      case ValueType.Instance:
        return <InstanceValuePreview value={value} />
      case ValueType.Element:
        return <ElementValuePreview value={value} />
      case ValueType.Store:
        return <ValuePreview value={value.value.value} extended={props.extended} />
      // default:
      //   return <span>{ValueType[props.value.type]}</span>
    }
  })
}

const CollapsableObjectPreview: Component<{
  value: EncodedValueOf<ValueType.Object | ValueType.Array, true>['children']
}> = props => (
  <ul class={styles.collapsable.list}>
    <Entries of={props.value}>
      {(key, value) => (
        <Show
          when={getIsCollapsable(value())}
          children={untrack(() => {
            const [extended, setExtended] = createSignal(false)
            return (
              <ValueNode
                name={key}
                value={value()}
                onClick={() => setExtended(p => !p)}
                extended={extended()}
              />
            )
          })}
          fallback={<ValueNode name={key} value={value()} />}
        />
      )}
    </Entries>
  </ul>
)

const getObjectLength = (
  obj: EncodedValueOf<ValueType.Array | ValueType.Object, boolean>,
): number =>
  obj.children
    ? Array.isArray(obj.children)
      ? obj.children.length
      : Object.keys(obj.children).length
    : obj.value

const ObjectValuePreview: ValueComponent<ValueType.Array | ValueType.Object> = props => {
  const length = createMemo(() => getObjectLength(props.value))
  return (
    <Switch fallback={<CollapsableObjectPreview value={props.value.children!} />}>
      <Match when={length() === 0}>
        <span class={styles.Nullable}>
          Empty {props.value.type === ValueType.Array ? 'Array' : 'Object'}
        </span>
      </Match>
      <Match when={!props.value.children || !props.extended}>
        <span class={styles.baseValue}>
          {props.value.type === ValueType.Array ? 'Array' : 'Object'} [{length()}]
        </span>
      </Match>
    </Switch>
  )
}

type ValueComponent<K extends ValueType> = Component<{
  value: EncodedValueOf<K, boolean>
  extended?: boolean
}>

const StringValuePreview: ValueComponent<ValueType.String> = props => (
  <span class={styles.ValueString}>"{props.value.value}"</span>
)

const NumberValuePreview: ValueComponent<ValueType.Number> = props => {
  const value = () => {
    switch (props.value.value) {
      case NAN:
        return 'NaN'
      case INFINITY:
        return 'Infinity'
      case NEGATIVE_INFINITY:
        return '-Infinity'
      default:
        return props.value.value
    }
  }
  return <span class={styles.ValueNumber}>{value()}</span>
}

const BooleanValuePreview: ValueComponent<ValueType.Boolean> = props => (
  <input
    type="checkbox"
    class={styles.ValueBoolean}
    onClick={e => e.preventDefault()}
    checked={props.value.value}
  ></input>
)

const FunctionValuePreview: ValueComponent<ValueType.Function> = props => (
  <span class={styles.ValueFunction}>
    {props.value.value ? `f ${props.value.value}()` : 'function()'}
  </span>
)
const GetterValuePreview: ValueComponent<ValueType.Getter> = props => (
  <span class={styles.ValueFunction}>get {props.value.value}()</span>
)

const NullableValuePreview: ValueComponent<ValueType.Null | ValueType.Undefined> = props => (
  <span class={styles.Nullable}>{props.value.type === ValueType.Null ? 'null' : 'undefined'}</span>
)

const SymbolValuePreview: ValueComponent<ValueType.Symbol> = props => (
  <span class={styles.baseValue}>Symbol({props.value.value})</span>
)

const InstanceValuePreview: ValueComponent<ValueType.Instance> = props => (
  <span class={styles.baseValue}>{props.value.value}</span>
)

const ElementValuePreview: ValueComponent<ValueType.Element> = props => {
  const { onElementHover: onHover } = useContext(ValueContext) ?? {}

  const handleHover =
    onHover &&
    ((hovered: boolean) => {
      if (props.value.value.id === undefined) return
      onHover(props.value.value.id, hovered)
    })

  const hoverProps = handleHover && createHover(handleHover)

  return (
    <span class={styles.ValueElement.container} {...hoverProps}>
      <div class={styles.ValueElement.highlight} />
      {props.value.value.name}
    </span>
  )
}
