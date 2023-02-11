import {
  getComponentRefreshNode,
  isSolidMemo,
  markNodeID,
  markOwnerName,
  markOwnerType,
  resolveElements,
} from './utils'
import { observeComputationUpdate } from './update'
import { Mapped, NodeID, Solid } from './types'
import { NodeType } from './constants'

export type ComputationUpdateHandler = (rootId: NodeID, nodeId: NodeID) => void

// Globals set before each walker cycle
let $inspectedId: NodeID | null
let $rootId: NodeID
let $onComputationUpdate: ComputationUpdateHandler
let $components: Mapped.ResolvedComponent[] = []
let $inspectedOwner: Solid.Owner | null

function mapChildren<T extends Mapped.Owner | Mapped.Root>(owner: Solid.Owner, mapped: T): T {
  const { owned } = owner
  if (!owned || !owned.length) return mapped
  const children: Mapped.Owner[] = Array(owned.length)
  for (let i = 0; i < children.length; i++) children[i] = mapOwner(owned[i])
  mapped.children = children
  return mapped
}

function mapComputation(owner: Solid.Computation, idToUpdate: NodeID, mapped: Mapped.Owner): void {
  observeComputationUpdate(
    owner as Solid.Computation,
    $onComputationUpdate.bind(void 0, $rootId, idToUpdate),
  )
  if (!owner.sources || owner.sources.length === 0) mapped.frozen = true
}

function mapOwner(owner: Solid.Owner): Mapped.Owner {
  const type = markOwnerType(owner) as Exclude<NodeType, NodeType.Refresh | NodeType.Root>
  const id = markNodeID(owner)
  const name =
    type === NodeType.Component ||
    type === NodeType.Memo ||
    type === NodeType.Effect ||
    type === NodeType.Computation
      ? markOwnerName(owner)
      : undefined

  const mapped = { id, type } as Mapped.Owner
  if (name) mapped.name = name

  if (id === $inspectedId) $inspectedOwner = owner

  // Component
  if (type === NodeType.Component) {
    // Context
    // combine context provide component with it' render-effect
    let contextNode: Solid.Computation | undefined
    if (
      name === 'provider' &&
      owner.owned &&
      owner.owned.length === 1 &&
      markOwnerType((contextNode = owner.owned[0])) === NodeType.Context
    ) {
      // custom mapping for context nodes
      const id = markNodeID(contextNode)
      if (id === $inspectedId) $inspectedOwner = contextNode
      return mapChildren(contextNode.owned![0], { id, type: NodeType.Context } as Mapped.Owner)
    }

    const element = resolveElements(owner.value)
    if (element) $components.push({ id, name: name!, element })

    // <Show> component
    let showMemoCondition: Solid.Memo
    let showMemoNode: Solid.Memo
    if (
      name === 'Show' &&
      owner.owned?.length === 2 &&
      isSolidMemo((showMemoCondition = owner.owned[0] as Solid.Memo)) &&
      isSolidMemo((showMemoNode = owner.owned[1] as Solid.Memo))
    ) {
      showMemoCondition.name = 'condition'
      showMemoNode.name = 'value'
      // if (!showMemoCondition.owned) {
      //   mapped.name = 'Show_'
      //   // mapped.combines = [markNodeID(showMemoCondition), markNodeID(showMemoNode)]
      //   // showMemoNode.att
      //   mapComputation(showMemoCondition, id, mapped)
      //   return mapChildren(showMemoNode, mapped)
      // }
    }

    // <For> component
    let forMemo: Solid.Memo
    if (
      name === 'For' &&
      owner.owned?.length === 1 &&
      isSolidMemo((forMemo = owner.owned[0] as Solid.Memo))
    ) {
      forMemo.name = 'value'
      // mapped.combines = [markNodeID(forMemo)]
      // mapComputation(forMemo, id, mapped)
      // return mapChildren(forMemo, mapped)
      // const mappedMemo = mapOwner(forMemo)
      // mappedMemo.type = NodeType.Component
      // mappedMemo.name = name
      // return mappedMemo
    }

    // Refresh
    // omitting refresh memo — map it's children instead
    let hmr = false
    let refresh = getComponentRefreshNode(owner as Solid.Component)
    if (refresh) {
      hmr = true
      owner = refresh
    }
    mapped.hmr = hmr
  }
  // Computation
  else if (type !== NodeType.Context) mapComputation(owner as Solid.Computation, id, mapped)

  return mapChildren(owner, mapped)
}

function mapRoot(
  root: Solid.Root,
  id: NodeID,
  attached: Solid.Owner | null | undefined,
): Mapped.Root {
  if (id === $inspectedId) $inspectedOwner = root

  const mapped: Mapped.Root = { id, type: NodeType.Root }

  mapChildren(root, mapped)

  if (attached) mapped.attached = markNodeID(attached)

  return mapped
}

export type WalkerResult = {
  root: Mapped.Root
  inspectedOwner: Solid.Owner | null
  components: Mapped.ResolvedComponent[]
}

export function walkSolidTree(
  owner: Solid.Root,
  config: {
    rootId: NodeID
    onComputationUpdate: ComputationUpdateHandler
    gatherComponents?: boolean
    inspectedId: NodeID | null
  },
): WalkerResult {
  // set the globals to be available for this walk cycle
  $inspectedId = config.inspectedId
  $rootId = config.rootId
  $onComputationUpdate = config.onComputationUpdate
  $inspectedOwner = null
  // components is an array instead of an object to preserve the order (nesting) of the components,
  // this helps the locator find the most nested component first
  $components = []

  const root = mapRoot(owner, $rootId, owner.sdtAttached)

  return { root, inspectedOwner: $inspectedOwner, components: $components }
}
