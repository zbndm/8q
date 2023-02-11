import { b, c as c$1, a } from './chunk-7NOROMYZ.js';
import { createInternalRoot, useDebugger, enableRootsAutoattach } from '@solid-devtools/debugger';
export { Debugger, attachDebugger, makeSolidUpdateListener, useDebugger, useLocator } from '@solid-devtools/debugger';
import { createSignal, createEffect, onCleanup } from 'solid-js';
import { defer } from '@solid-devtools/shared/primitives';

b();var r=c$1(),o=a();o("ResetPanel");o("ClientConnected","0.23.1");var c=!1;createInternalRoot(()=>{let t=useDebugger(),[s,a]=createSignal(!1);t.setUserEnabledSignal(s),r("DevtoolsOpened",()=>a(!0)),r("DevtoolsClosed",()=>a(!1)),createEffect(()=>{s()&&(c?t.forceTriggerUpdate():c=!0,onCleanup(r("ForceUpdate",()=>t.forceTriggerUpdate())),onCleanup(r("InspectValue",t.inspector.toggleValueNode)),onCleanup(r("InspectNode",t.inspector.setInspectedNode)),t.listenTo("StructureUpdates",e=>o("StructureUpdate",e)),t.listenTo("ComputationUpdates",e=>{o("ComputationUpdates",e);}),t.listenTo("InspectorUpdate",e=>o("InspectorUpdate",e)),t.listenTo("InspectedNodeDetails",e=>o("InspectedDetails",e)),onCleanup(r("LocatorMode",t.locator.toggleEnabled)),createEffect(defer(t.locator.enabledByDebugger,e=>o("LocatorMode",e))),t.locator.addClickInterceptor((e,g)=>(e.preventDefault(),e.stopPropagation(),o("ClientInspectedNode",g.id),!1)),t.locator.onHoveredComponent(e=>o("HoverComponent",e)),onCleanup(r("HighlightElement",e=>t.locator.setHighlightTarget(e))),onCleanup(r("OpenLocation",t.openInspectedNodeLocation)));});});enableRootsAutoattach();