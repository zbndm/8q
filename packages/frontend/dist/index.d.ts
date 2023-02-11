import { Component, JSX } from 'solid-js';
import { RootsUpdates, HighlightElementPayload, Mapped, ComputationUpdate, NodeID } from '@solid-devtools/debugger/types';
import { SetInspectedNodeData, ToggleInspectedValueData, InspectorUpdate } from '@solid-devtools/debugger';

type ListenersFromPayloads<T extends Record<string, any>> = {
    [K in keyof Pick<T, keyof T extends infer R ? (R extends keyof T ? (R extends string ? R : never) : never) : never> as `on${K}`]: T[K] extends [void] ? () => void : (payload: T[K]) => void;
};
interface ClientListenerPayloads {
    InspectNode: SetInspectedNodeData;
    InspectValue: ToggleInspectedValueData;
    DevtoolsLocatorStateChange: boolean;
    HighlightElementChange: HighlightElementPayload;
    OpenLocation: void;
}
type ClientListeners = ListenersFromPayloads<ClientListenerPayloads>;
interface DevtoolsListenerPayloads {
    ResetPanel: void;
    SetInspectedDetails: Mapped.OwnerDetails;
    StructureUpdate: RootsUpdates | null;
    ComputationUpdates: ComputationUpdate[];
    InspectorUpdate: InspectorUpdate[];
    ClientLocatorModeChange: boolean;
    ClientHoveredComponent: {
        nodeId: NodeID;
        state: boolean;
    };
    ClientInspectedNode: NodeID;
}
type DevtoolsListeners = ListenersFromPayloads<DevtoolsListenerPayloads>;
declare class Controller {
    clientListeners: ClientListeners;
    private listeners;
    constructor(clientListeners: ClientListeners);
    connectDevtools(devtoolsListeners: DevtoolsListeners): void;
    updateStructure(update: RootsUpdates | null): void;
    updateComputation(computationUpdate: DevtoolsListenerPayloads['ComputationUpdates']): void;
    updateInspector(inspectorUpdate: DevtoolsListenerPayloads['InspectorUpdate']): void;
    setInspectedDetails(ownerDetails: DevtoolsListenerPayloads['SetInspectedDetails']): void;
    resetPanel(): void;
    setLocatorState(active: boolean): void;
    setHoveredNode(node: DevtoolsListenerPayloads['ClientHoveredComponent']): void;
    setInspectedNode(node: DevtoolsListenerPayloads['ClientInspectedNode']): void;
}

/**
 * Icons taken from https://phosphoricons.com
 */

type ProxyIconComponent<ID extends keyof typeof iconComponents> = Component<{
    id: ID;
}>;
type IconComponent = Component<{
    class?: string;
}>;
declare const iconComponents: {
    readonly ArrowLeft: ProxyIconComponent<"ArrowLeft">;
    readonly ArrowRight: ProxyIconComponent<"ArrowRight">;
    readonly CarretRight: ProxyIconComponent<"CarretRight">;
    readonly Eye: ProxyIconComponent<"Eye">;
    readonly EyeSlash: ProxyIconComponent<"EyeSlash">;
    readonly Refresh: ProxyIconComponent<"Refresh">;
    readonly Select: ProxyIconComponent<"Select">;
    readonly Options: ProxyIconComponent<"Options">;
    readonly Close: ProxyIconComponent<"Close">;
    readonly Triangle: ProxyIconComponent<"Triangle">;
    readonly Root: ProxyIconComponent<"Root">;
    readonly Memo: ProxyIconComponent<"Memo">;
    readonly Effect: ProxyIconComponent<"Effect">;
    readonly RenderEffect: ProxyIconComponent<"RenderEffect">;
    readonly Computation: ProxyIconComponent<"Computation">;
    readonly Context: ProxyIconComponent<"Context">;
    readonly Code: ProxyIconComponent<"Code">;
    readonly Search: ProxyIconComponent<"Search">;
};
declare let Icon: {
    [key in keyof typeof iconComponents]: IconComponent;
};

declare const MountIcons: Component;

declare const Devtools: Component<{
    controller: Controller;
    errorOverlayFooter?: JSX.Element;
    headerSubtitle?: JSX.Element;
    useShortcuts?: boolean;
    catchWindowErrors?: boolean;
}>;

export { ClientListeners, Controller, Devtools, Icon, IconComponent, MountIcons };
