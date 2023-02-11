import { RootsUpdates, ComputationUpdate, InspectorUpdate, NodeID, Mapped, ToggleInspectedValueData, SetInspectedNodeData, HighlightElementPayload } from '@solid-devtools/debugger/types';

type Versions = {
    client: string;
    expectedClient: string;
    extension: string;
};
declare namespace Messages {
    interface General {
        SolidOnPage: {};
        ClientConnected: string;
        Versions: Versions;
        /** devtools -> client: the chrome devtools got opened or entirely closed */
        DevtoolsOpened: {};
        DevtoolsClosed: {};
        ResetPanel: {};
    }
    interface Client {
        StructureUpdate: RootsUpdates;
        ComputationUpdates: ComputationUpdate[];
        InspectorUpdate: InspectorUpdate[];
        /** send component clicked with the locator to the extension */
        ClientInspectedNode: NodeID;
        /** send updates to the owner details */
        InspectedDetails: Mapped.OwnerDetails;
        /** send hovered (by the locator) owner to the extension */
        HoverComponent: {
            nodeId: NodeID;
            state: boolean;
        };
        LocatorMode: boolean;
    }
    interface Extension {
        /** force the debugger to walk the whole tree and send it */
        ForceUpdate: {};
        /** request for node/signal/prop details — subscribe or unsubscribe */
        InspectValue: ToggleInspectedValueData;
        InspectNode: SetInspectedNodeData;
        HighlightElement: HighlightElementPayload;
        /** user is selecting component from the page */
        LocatorMode: boolean;
        /** open the location of the inspected component in the code editor */
        OpenLocation: {};
    }
}
type PostMessageFn<M extends {
    [K in string]: any;
} = {}> = <K extends keyof (Messages.General & M)>(type: K, ..._: {} extends (Messages.General & M)[K] ? [] : [payload: (Messages.General & M)[K]]) => void;
type OnMessageFn<M extends {
    [K in string]: any;
} = {}> = <K extends keyof (Messages.General & M)>(id: K, handler: (payload: (Messages.General & M)[K]) => void) => VoidFunction;
declare const makePostMessage: <M extends {
    [K in string]: any;
}>() => PostMessageFn<M>;
/**
 * Important ot call this if you want to use {@link fromContent}
 */
declare function startListeningWindowMessages(): void;
declare const makeMessageListener: <M extends {
    [K in string]: any;
}>() => OnMessageFn<M>;
type ForwardPayload = {
    forwarding: true;
    id: string;
    payload: any;
};
declare const onAllClientMessages: (fn: (data: {
    id: string;
    payload: any;
}) => void) => void;
declare const isForwardMessage: (data: any) => data is ForwardPayload;
declare const forwardMessageToWindow: (message: ForwardPayload) => void;
declare function once<M extends {
    [K in string]: any;
}, K extends keyof (Messages.General & M)>(method: OnMessageFn<M>, id: K, handler: (payload: (Messages.General & M)[K]) => void): VoidFunction;

export { ForwardPayload, Messages, OnMessageFn, PostMessageFn, Versions, forwardMessageToWindow, isForwardMessage, makeMessageListener, makePostMessage, onAllClientMessages, once, startListeningWindowMessages };
