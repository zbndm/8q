'use strict';

var _debugger = require('@solid-devtools/debugger');
var solidJs = require('solid-js');
var primitives = require('@solid-devtools/shared/primitives');

var p=()=>(e,o)=>postMessage({id:e,payload:o},"*"),i,d={};function l(){typeof window>"u"||addEventListener("message",e=>{let o=e.data?.id;if(typeof o!="string")return;let n=d[o];n?n.forEach(t=>t(e.data.payload)):i;});}var g=()=>(e,o)=>{let n=d[e];return n||(n=d[e]=[]),n.push(o),()=>d[e]=n.filter(t=>t!==o)};l();var a=g(),s=p();s("ResetPanel");s("ClientConnected","0.23.1");var u=!1;_debugger.createInternalRoot(()=>{let e=_debugger.useDebugger(),[o,n]=solidJs.createSignal(!1);e.setUserEnabledSignal(o),a("DevtoolsOpened",()=>n(!0)),a("DevtoolsClosed",()=>n(!1)),solidJs.createEffect(()=>{o()&&(u?e.forceTriggerUpdate():u=!0,solidJs.onCleanup(a("ForceUpdate",()=>e.forceTriggerUpdate())),solidJs.onCleanup(a("InspectValue",e.inspector.toggleValueNode)),solidJs.onCleanup(a("InspectNode",e.inspector.setInspectedNode)),e.listenTo("StructureUpdates",t=>s("StructureUpdate",t)),e.listenTo("ComputationUpdates",t=>{s("ComputationUpdates",t);}),e.listenTo("InspectorUpdate",t=>s("InspectorUpdate",t)),e.listenTo("InspectedNodeDetails",t=>s("InspectedDetails",t)),solidJs.onCleanup(a("LocatorMode",e.locator.toggleEnabled)),solidJs.createEffect(primitives.defer(e.locator.enabledByDebugger,t=>s("LocatorMode",t))),e.locator.addClickInterceptor((t,M)=>(t.preventDefault(),t.stopPropagation(),s("ClientInspectedNode",M.id),!1)),e.locator.onHoveredComponent(t=>s("HoverComponent",t)),solidJs.onCleanup(a("HighlightElement",t=>e.locator.setHighlightTarget(t))),solidJs.onCleanup(a("OpenLocation",e.openInspectedNodeLocation)));});});_debugger.enableRootsAutoattach();

Object.defineProperty(exports, 'Debugger', {
	enumerable: true,
	get: function () { return _debugger.Debugger; }
});
Object.defineProperty(exports, 'attachDebugger', {
	enumerable: true,
	get: function () { return _debugger.attachDebugger; }
});
Object.defineProperty(exports, 'makeSolidUpdateListener', {
	enumerable: true,
	get: function () { return _debugger.makeSolidUpdateListener; }
});
Object.defineProperty(exports, 'useDebugger', {
	enumerable: true,
	get: function () { return _debugger.useDebugger; }
});
Object.defineProperty(exports, 'useLocator', {
	enumerable: true,
	get: function () { return _debugger.useLocator; }
});
