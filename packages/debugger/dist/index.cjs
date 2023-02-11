'use strict';

var solidJs = require('solid-js');
var scheduled = require('@solid-primitives/scheduled');
var primitives = require('@solid-devtools/shared/primitives');
var utils = require('@solid-devtools/shared/utils');
var store = require('solid-js/store');
var eventBus = require('@solid-primitives/event-bus');
var eventListener = require('@solid-primitives/event-listener');
var keyboard = require('@solid-primitives/keyboard');
var utils$1 = require('@solid-primitives/utils');
var types = require('@solid-devtools/transform/types');
var platform = require('@solid-primitives/platform');
var web = require('solid-js/web');
var cursor = require('@solid-primitives/cursor');
var bounds = require('@solid-primitives/bounds');

var $e="__$sdt-Infinity__",He="__$sdt-NegativeInfinity__",Fe="__$sdt-NaN__",Nt=(d=>(d[d.Root=0]="Root",d[d.Component=1]="Component",d[d.Effect=2]="Effect",d[d.Render=3]="Render",d[d.Memo=4]="Memo",d[d.Computation=5]="Computation",d[d.Refresh=6]="Refresh",d[d.Context=7]="Context",d[d.Signal=8]="Signal",d[d.Store=9]="Store",d))(Nt||{}),je=(i=>(i[i.Number=0]="Number",i[i.Boolean=1]="Boolean",i[i.String=2]="String",i[i.Null=3]="Null",i[i.Undefined=4]="Undefined",i[i.Symbol=5]="Symbol",i[i.Array=6]="Array",i[i.Object=7]="Object",i[i.Function=8]="Function",i[i.Getter=9]="Getter",i[i.Element=10]="Element",i[i.Instance=11]="Instance",i[i.Store=12]="Store",i))(je||{});var Se=store.DEV,U=solidJs.getOwner,L=e=>"fn"in e,k=e=>"sdtType"in e?e.sdtType===4:L(e)&&Ke(e),ye=e=>"owned"in e,Z=e=>e.sdtType===0||!L(e),Q=e=>"props"in e,We=e=>Se.$NAME in e,F=e=>!("observers"in e)&&Se.$NAME in e.value,Ke=e=>"value"in e&&"comparator"in e&&e.pure===!0;function Et(e){let{name:t,componentName:o}=e;return o&&typeof o=="string"?o.startsWith("_Hot$$")?o.slice(6):o:t||"(unnamed)"}function Ot(e){return e.name||"(unnamed)"}var Ie=e=>e[Se.$NAME]||"(unnamed)";function ee(e){let t=ye(e)?Et(e):F(e)?Ie(e):Ot(e);return be(t)}function be(e){return utils.trimString(e,16)}function Ne(e){return ye(e)?j(e):F(e)?9:8}var j=e=>{if(typeof e.sdtType<"u")return e.sdtType;if(!L(e))return 0;if(Q(e))return 1;if(Ke(e)){let t,o;return (t=e.owner)&&Q(t)&&(o=t.componentName)&&o.startsWith("_Hot$$")?6:4}return e.pure===!1?e.user===!0?2:e.context!==null?7:3:5},Rt=0,Tt=()=>(Rt++).toString(36);function te(e){return e.sdtName!==void 0?e.sdtName:e.sdtName=ee(e)}function M(e,t){return e.sdtType!==void 0?e.sdtType:e.sdtType=t??j(e)}function T(e){return e.sdtId!==void 0?e.sdtId:e.sdtId=Tt()}function oe(e){let{owned:t}=e,o;return t&&t.length===1&&M(o=t[0])===6?o:null}function Ge(e){let t=fe(e);return Array.isArray(t)&&!t.length&&(t=null),t}function fe(e){if(typeof e=="function"&&!e.length&&e.name==="bound readSignal")return fe(e());if(Array.isArray(e)){let t=[];for(let o of e){let n=fe(o);n&&(Array.isArray(n)?t.push.apply(t,n):t.push(n));}return t}return e instanceof HTMLElement?e:null}function Ut(e,t){do{if(t(e))return e;e=e.owner;}while(e.owner);return null}function Ce(e,t){e.sdtContext=t;}function Ye(e){for(;!e.sdtContext&&e.owner;)e=e.owner;return e.sdtContext}function ze(e){delete e.sdtContext;}var ne=e=>U()?solidJs.onCleanup(e):e;function V(e,t,o=!1){return e.cleanups===null?e.cleanups=[t]:o?e.cleanups.splice(0,0,t):e.cleanups.push(t),()=>e.cleanups?.splice(e.cleanups.indexOf(t),1)}function Mt(e,t,o=!1){return e.owner?V(e.owner,t,o):()=>{}}function Lt(e){return solidJs.runWithOwner(null,()=>solidJs.createRoot(e))}function kt(e){let t,o=!0;return solidJs.runWithOwner(null,()=>solidJs.createRoot(n=>solidJs.createComputed(()=>{if(!o)return;o=!1,e();let r=U().sources;r&&(t=[...r]),n();}))),t??[]}var H=null,B=Symbol("internal"),A=(e,t)=>{H=e;let o=solidJs.createRoot(n=>{let r=U();return Ce(r,B),e(n)},t);return H===e&&(H=null),o},Xe=()=>{let e=!!H;return e&&(H=null),e};function Vt(e){let t=new Set,o=[];for(let n=e.length-1;n>=0;n--){let r=e[n];t.has(r.id)||(t.add(r.id),o.push(r));}return o}function qe(e){let t=[],o=scheduled.throttle(()=>{let n=Vt(t);t.length=0,e(n);});return n=>{t.push(n),o();}}var re=new Set;{let e=()=>re.forEach(t=>t());typeof window._$afterUpdate=="function"&&re.add(window._$afterUpdate),window._$afterUpdate=e;}function he(e){return re.add(e),ne(()=>{re.delete(e);})}var ie=new Set;{let e=t=>{Xe()||ie.forEach(o=>o(t));};typeof window._$afterCreateRoot=="function"&&ie.add(window._$afterCreateRoot),window._$afterCreateRoot=e;}function ve(e){return ie.add(e),ne(()=>ie.delete(e))}function xe(e,t){if(e.onComputationUpdate)return void(e.onComputationUpdate=t);e.onComputationUpdate=t,Je(e,o=>{solidJs.untrack(e.onComputationUpdate),o();});}function Je(e,t){let o=e.fn,n,r,l=()=>n=o(r);e.fn=e.fn.length?s=>(t(l,r=s),n):()=>(t(l,void 0),n);}function W(e,t,o){if(e.onValueUpdate){e.onValueUpdate[o]=t;return}let n=e.onValueUpdate={[o]:t},r=e.value;Object.defineProperty(e,"value",{get:()=>r,set:l=>{for(let s of Object.getOwnPropertySymbols(n))n[s](l,r);r=l;}});}function P(e,t){e.onValueUpdate&&delete e.onValueUpdate[t];}function Pt(e,t,o){W(e,t,o),ne(()=>P(e,o));}var ae,De,Qe,we=[],K;function Ee(e,t){let{owned:o}=e;if(!o||!o.length)return t;let n=Array(o.length);for(let r=0;r<n.length;r++)n[r]=$t(o[r]);return t.children=n,t}function _t(e,t,o){xe(e,Qe.bind(void 0,De,t)),(!e.sources||e.sources.length===0)&&(o.frozen=!0);}function $t(e){let t=M(e),o=T(e),n=t===1||t===4||t===2||t===5?te(e):void 0,r={id:o,type:t};if(n&&(r.name=n),o===ae&&(K=e),t===1){let l;if(n==="provider"&&e.owned&&e.owned.length===1&&M(l=e.owned[0])===7){let m=T(l);return m===ae&&(K=l),Ee(l.owned[0],{id:m,type:7})}let s=Ge(e.value);s&&we.push({id:o,name:n,element:s});let a,u;n==="Show"&&e.owned?.length===2&&k(a=e.owned[0])&&k(u=e.owned[1])&&(a.name="condition",u.name="value");let c;n==="For"&&e.owned?.length===1&&k(c=e.owned[0])&&(c.name="value");let d=!1,S=oe(e);S&&(d=!0,e=S),r.hmr=d;}else t!==7&&_t(e,o,r);return Ee(e,r)}function Ht(e,t,o){t===ae&&(K=e);let n={id:t,type:0};return Ee(e,n),o&&(n.attached=T(o)),n}function Ze(e,t){return ae=t.inspectedId,De=t.rootId,Qe=t.onComputationUpdate,K=null,we=[],{root:Ht(e,De,e.sdtAttached),inspectedOwner:K,components:we}}var Wt=/^((?:\\?[^\s][^/\\:\"\?\*<>\|]+)+):([0-9]+):([0-9]+)$/,Kt=/^((?:(?:\.\/|\.\.\/|\/)?(?:\.?\w+\/)*)(?:\.?\w+\.?\w+)):([0-9]+):([0-9]+)$/,tt=platform.isWindows?Wt:Kt;function Oe(e){let t=e.getAttribute(types.LOCATION_ATTRIBUTE_NAME);if(!(!t||!tt.test(t)))return t}var Gt={vscode:({projectPath:e,filePath:t,line:o,column:n})=>`vscode://file/${e}/${t}:${o}:${n}`,"vscode-insiders":({projectPath:e,filePath:t,line:o,column:n})=>`vscode-insiders://file/${e}/${t}:${o}:${n}`,atom:({projectPath:e,filePath:t,line:o,column:n})=>`atom://core/open/file?filename=${e}/${t}&line=${o}&column=${n}`,webstorm:({projectPath:e,filePath:t,line:o,column:n})=>`webstorm://open?file=${e}/${t}&line=${o}&column=${n}`};function Yt(e,t){return typeof e=="function"?e(t):Gt[e](t)}function Re(e,t){let o=window[types.WINDOW_PROJECTPATH_PROPERTY];if(!o)return;let n=e.match(tt);if(!n)return;let[,r,l,s]=n;return {filePath:r,line:+l,column:+s,projectPath:o,element:t}}function Te(e,t){let o=Yt(e,t);typeof o=="string"&&window.open(o,"_blank");}var de=new Map,et={};function Ue(e,t){et!==e&&(de.clear(),et=e);let o=[],n=[t],r,l;for(let s of n){if(!r){let u=Oe(s);u&&(r=u,l=s);}let a=de.get(s);if(a!==void 0)return o.forEach(u=>de.set(u,a)),a?{...a,location:r??a.location,element:l??a.element}:null;o.push(s);for(let[u,c]of Object.entries(e))for(let d=c.length-1;d>=0;d--){let S=c[d],{element:m}=S;if(Array.isArray(m)&&m.some(i=>i===s)||s===m){let i={...S,element:l??s,location:r,rootId:u};return o.forEach(g=>de.set(g,i)),i}}s.parentElement&&n.push(s.parentElement);}return null}var qt=web.template(`<style>
.element-overlay {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  pointer-events: none;
  transition-duration: 100ms;
  transition-property: transform, width, height;
  --color: 14 116 144;
}
.border {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px solid rgb(var(--color) / 0.8);
  background-color: rgb(var(--color) / 0.3);
  border-radius: 0.25rem;
}
.name-container {
  position: absolute;
  z-index: 10000;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  color: white;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1rem;
}
.name-container.bottom {
  top: 100%;
}
.name-container.top {
  bottom: 100%;
}
.name-animated-container {
  position: relative;
  margin: 0.5rem auto;
  padding: 0.25rem 0.5rem;
}
.name-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(var(--color) / 0.8);
  border-radius: 0.25rem;
}
.name-text {
  position: absolute;
}
.name-text span {
  color: #a5f3fc;
}
.name-invisible {
  visibility: hidden;
}
</style>`,2),Jt=web.template('<div><div class="name-animated-container"><div class="name-background"></div><div class="name-text">: <span></span></div><div class="name-invisible">: </div></div></div>',12),Qt=web.template('<div class="element-overlay"><div class="border"></div></div>',4);function nt(e){return web.createComponent(web.Portal,{useShadow:!0,get children(){return web.createComponent(solidJs.Index,{get each(){return e()},children:t=>{cursor.createElementCursor(()=>t().element,"pointer");let o=bounds.createElementBounds(()=>t().element);return web.createComponent(ro,web.mergeProps(o,{get tag(){return t().element.tagName.toLocaleLowerCase()},get name(){return t().name}}))}})}})}var ro=e=>{let t=solidJs.createMemo(a=>e.left===null?a:e.left,0),o=solidJs.createMemo(a=>e.top===null?a:e.top,0),n=solidJs.createMemo(a=>e.width===null?a:e.width,0),r=solidJs.createMemo(a=>e.height===null?a:e.height,0),l=solidJs.createMemo(()=>`translate(${Math.round(t())}px, ${Math.round(o())}px)`),s=solidJs.createMemo(()=>o()>window.innerHeight/2);return [qt.cloneNode(!0),(()=>{let a=Qt.cloneNode(!0);a.firstChild;return web.insert(a,web.createComponent(solidJs.Show,{get when(){return !!e.name},get children(){let c=Jt.cloneNode(!0),d=c.firstChild,S=d.firstChild,m=S.nextSibling,i=m.firstChild,g=i.nextSibling,b=m.nextSibling,I=b.firstChild;return web.insert(m,()=>e.name,i),web.insert(g,()=>e.tag),web.insert(b,()=>e.name,I),web.insert(b,()=>e.tag,null),web.effect(()=>web.className(c,`name-container ${s()?"top":"bottom"}`)),c}}),null),web.effect(c=>{let d=l(),S=n()+"px",m=r()+"px";return d!==c._v$&&a.style.setProperty("transform",c._v$=d),S!==c._v$2&&a.style.setProperty("width",c._v$2=S),m!==c._v$3&&a.style.setProperty("height",c._v$3=m),c},{_v$:void 0,_v$2:void 0,_v$3:void 0}),a})()]};var In=(e,t)=>e==="value"?"value":`${e}:${t}`;function Le(e){let t=U();if(!t)return;let o=j(t);o===1?t.location=e:o===6&&(t.owner.location=e);}globalThis[types.MARK_COMPONENT_FN_NAME]=Le;function it({components:e,debuggerEnabled:t,findComponent:o,getElementById:n,setLocatorEnabledSignal:r}){let l=primitives.atom(!1),s=primitives.atom(),a=solidJs.createMemo(()=>!!s()?.());r(a);let u=solidJs.createMemo(()=>t()&&(a()||l()));function c(f){l(y=>f??!y);}let d=primitives.atom(null),S=primitives.atom(null),m=solidJs.createMemo(primitives.defer([e,()=>d()??S()],([f,y])=>{if(!y)return [];if(y instanceof HTMLElement){let h=Ue(f,y);return h?[h]:[]}return utils$1.asArray(y.element).map(h=>({location:Oe(h),element:h,id:y.id,rootId:y.rootId,name:y.name}))},[]));setTimeout(()=>{A(()=>nt(m));},1e3);let[i,g]=eventBus.createSimpleEmitter();solidJs.createEffect(f=>{let y=d();if(!y)return;let h=Ue(e(),y);return f&&g({nodeId:f,state:!1}),h&&g({nodeId:h.id,state:!0}),h?.id});function b(f){if(!f)return S(null);if("nodeId"in f){let{rootId:y,nodeId:h}=f,w=o(y,h);w&&S({...w,rootId:y});}else {let y=n(f.elementId);if(!y)return utils.warn("No element found",f);S(y);}}let I=new Set;function v(...[f,y,h]){for(let w of I)if(w(f,y,h),f.defaultPrevented)return !0}function x(f){I.add(f),utils$1.onRootCleanup(()=>I.delete(f));}let C;solidJs.createEffect(()=>{u()&&(primitives.makeHoverElementListener(f=>d(f)),solidJs.onCleanup(()=>d(null)),eventListener.makeEventListener(window,"click",f=>{let{target:y}=f;if(!(y instanceof HTMLElement))return;let h=m(),w=h.find(({element:bt})=>y.contains(bt))??h[0];if(!w)return;let me=w.location&&Re(w.location,w.element);!v(f,w,me)&&C&&me&&(f.preventDefault(),f.stopPropagation(),Te(C,me));},!0));});let p=!1,N=solidJs.getOwner();function D(f){solidJs.runWithOwner(N,()=>{if(Ae(),p)return utils.warn("useLocator can be called only once.");p=!0,f.targetIDE&&(C=f.targetIDE);let y=keyboard.createKeyHold(f.key??"Alt",{preventDefault:!0});s(()=>y);});}function E(f,y){if(!C)return utils.warn("Please set `targetIDE` it in useLocator options.");let h=Re(f,y);h&&Te(C,h);}return {useLocator:D,togglePluginLocatorMode:c,enabledByDebugger:a,addClickInterceptor:x,setPluginHighlightTarget:b,onDebuggerHoveredComponentChange:i,openElementSourceCode:E}}function R(e,t,o,n,r=!1){if(typeof e=="number")return e===1/0?{type:0,value:$e}:e===-1/0?{type:0,value:He}:Number.isNaN(e)?{type:0,value:Fe}:{type:0,value:e};if(typeof e=="boolean")return {type:1,value:e};if(typeof e=="string")return {type:2,value:e};if(e===null)return {type:3};if(e===void 0)return {type:4};if(typeof e=="symbol")return {type:5,value:e.description??""};if(typeof e=="function")return {type:8,value:e.name};if(e instanceof HTMLElement)return {type:10,value:{name:e.tagName,id:o.set(e)}};if(!r&&We(e)){let a=store.unwrap(e),u=o.set(a);return n&&n(u,a),{type:12,value:{value:R(a,t,o,void 0,!0),id:u}}}if(Array.isArray(e)){let a={type:6,value:e.length};return t&&(a.children=e.map(u=>R(u,!0,o,n,r))),a}let s=Object.prototype.toString.call(e).slice(8,-1);if(s==="Object"){let a=e,u={type:7,value:Object.keys(a).length};if(t){let c=u.children={};for(let[d,S]of Object.entries(Object.getOwnPropertyDescriptors(e)))c[d]=S.get?{type:9,value:d}:R(S.value,!0,o,n,r);}return u}return {type:11,value:s}}var Io=0,$=class{obj={};map=new WeakMap;get(t){return this.obj[t]}getId(t){return this.map.get(t)}set(t){let o=this.map.get(t);return o!==void 0||(o=(Io++).toString(36),this.obj[o]=t,this.map.set(t,o)),o}};var pe=store.DEV,Y=new WeakMap;globalThis._$onStoreNodeUpdate=(e,t,o,n)=>{let r=Y.get(e);if(r)for(let l of r)l(e,t,o,n);};function dt(e,t){if(Array.isArray(e))for(let o=0;o<e.length;o++){let n=e[o];pe.isWrappable(n)&&t(o.toString(),n);}else for(let o in e){let{value:n,get:r}=Object.getOwnPropertyDescriptor(e,o);!r&&pe.isWrappable(n)&&t(o,n);}}function lt({storePath:e,storeSymbol:t},o,n){if(t!==o||e.length!==n.length)return !1;if(e==n)return !0;for(let r=0;r<e.length;r++)if(e[r]!=n[r])return !1;return !0}function st(e,t){e=store.unwrap(e);let o=Symbol("inspect-store");return solidJs.untrack(()=>(n(e,[]),()=>r(e,[])));function n(l,s){let a=Y.get(l);if(a&&a.some(c=>lt(c,o,s)))return;let u=(c,d,S,m)=>{if(typeof d=="symbol")return;let i=[...s,d];solidJs.untrack(()=>{d==="length"&&typeof S=="number"&&Array.isArray(l)?t({path:s,property:d,length:S}):(pe.isWrappable(m)&&r(m,i),pe.isWrappable(S)&&n(S,i),t({path:s,property:d,value:S}));});};u.storePath=s,u.storeSymbol=o,a?a.push(u):Y.set(l,[u]),dt(l,(c,d)=>n(d,[...s,c]));}function r(l,s){let a=Y.get(l);if(!a)return;let u=a.splice(a.findIndex(c=>lt(c,o,s)),1);a.length===0&&Y.delete(l),u.length&&dt(l,(c,d)=>r(d,[...s,c]));}}var Pe=class{constructor(t){this.getValue=t;}trackedStores=[];selected=!1;addStoreObserver(t){this.trackedStores.push(t);}unsubscribe(){for(let t of this.trackedStores)t();this.trackedStores=[];}reset(){this.unsubscribe(),this.selected=!1;}isSelected(){return this.selected}setSelected(t){this.selected=t,t||this.unsubscribe();}},J=class{record={};get(t){return this.record[t]}add(t,o){this.record[t]=new Pe(o);}reset(){for(let t of Object.values(this.record))t.reset();}},z,X,q=Symbol("inspector");function pt(e,t){let{value:o}=e,n=T(e),r;return X.add(`signal:${n}`,()=>e.value),F(e)?r=be(Ie(o)):(r=ee(e),W(e,l=>t(n,l),q)),{type:Ne(e),name:r,id:n,value:R(o,!1,z)}}function ut(e){if(L(e)&&P(e,q),e.sourceMap)for(let t of Object.values(e.sourceMap))P(t,q);if(e.owned)for(let t of e.owned)P(t,q);}function ct(e,t){let{onSignalUpdate:o,onValueUpdate:n}=t;z=new $,X=new J;let r=T(e),l=M(e),s=te(e),{sourceMap:a,owned:u}=e,c=()=>e.value,d={id:r,name:s,type:l};if(l===7){a=void 0,u=null;let m=Object.getOwnPropertySymbols(e.context);if(m.length!==1)throw new Error("Context field has more than one symbol. This is not expected.");{let i=e.context[m[0]];c=()=>i;}}let S;if(L(e)){if(Q(e)){let m=oe(e);m&&(a=m.sourceMap,u=m.owned,c=()=>m.value);let i=!!e.props[solidJs.$PROXY],g={};for(let[b,I]of Object.entries(Object.getOwnPropertyDescriptors(e.props)))I.get?g[b]={type:9,value:b}:(g[b]=R(I.value,!1,z),I.value instanceof Object&&X.add(`prop:${b}`,()=>I.value));if(d.props={proxy:i,record:g},e.location&&(d.location=e.location),i){let b=Object.keys(g);S=()=>{let I=Object.keys(e.props),v=new Set(I),x=[],C=!1;for(let p of b)v.has(p)?v.delete(p):(C=!0,x.push(p));if(!(!C&&!v.size))return b=I,{added:Array.from(v),removed:x}};}}else W(e,n,q);d.value=R(c(),!1,z);}if(a){let m=Object.values(a);d.signals=Array(m.length);for(let i=0;i<m.length;i++)d.signals[i]=pt(m[i],o);}else d.signals=[];if(u)for(let m of u)k(m)&&d.signals.push(pt(m,o));return X.add("value",c),{details:d,valueMap:X,nodeIdMap:z,checkProxyProps:S}}function mt(e,{eventHub:t}){let o,n,r=new $,l=new J,s,{pushStoreUpdate:a,pushValueUpdate:u,triggerPropsCheck:c,clearUpdates:d}=(()=>{let i=new Set,g=[],b=!1,I=scheduled.scheduleIdle(()=>{let x=[];for(let C of i){let p=l.get(C);if(!p||!p.getValue)continue;let N=p.isSelected(),D=R(p.getValue(),N,r,N&&S.bind(null,C,p));x.push(["value",{id:C,value:D}]);}i.clear();for(let[C,p,N]of g)x.push(["store",{valueNodeId:C,storeId:p,value:"length"in N?N.length:N.value===void 0?void 0:R(N.value,!0,r,void 0,!0),path:N.path,property:N.property}]);if(g=[],b&&s){let C=s();C&&x.push(["props",{added:C.added,removed:C.removed}]),b=!1;}x.length&&t.emit("InspectorUpdate",x);}),v=scheduled.throttle(I,200);return {pushValueUpdate(x){i.add(x),I();},pushStoreUpdate(x,C,p){g.push([x,C,p]),I();},triggerPropsCheck(){b=!0,v();},clearUpdates(){i.clear(),g=[],b=!1,I.clear(),v.clear();}}})();function S(i,g,b,I){g.addStoreObserver(st(I,v=>a(i,b,v)));}function m(i){n&&ut(n),n=i,s=void 0,o=void 0,l.reset(),d(),i&&solidJs.untrack(()=>{let g=ct(i,{onSignalUpdate:b=>u(`signal:${b}`),onValueUpdate:()=>u("value")});t.emit("InspectedNodeDetails",g.details),l=g.valueMap,r=g.nodeIdMap,o=g.details,s=g.checkProxyProps;});}return solidJs.createEffect(()=>{e()&&(solidJs.onCleanup(()=>m(void 0)),he(()=>{s&&c();}));}),{getLastDetails:()=>o,setInspectedNode(i){if(!i)return m(void 0);let{rootId:g,nodeId:b}=i,I=ft(g,b);if(!I||!I.inspectedOwner)return m(void 0);m(I.inspectedOwner);},toggleValueNode({id:i,selected:g}){let b=l.get(i);if(!b)return utils.warn("Could not find value node:",i);b.setSelected(g),u(i);},getElementById(i){let g=r.get(i);if(g instanceof HTMLElement)return g}}}var O=A(()=>{let[e,t]=eventBus.createSimpleEmitter(),[o,n]=eventBus.createSimpleEmitter(),r=eventBus.createEventHub(p=>({ComputationUpdates:p(),StructureUpdates:p(),InspectorUpdate:p(),InspectedNodeDetails:p()})),[l,s,a]=(()=>{let p=primitives.atom(),N=primitives.atom(),D=primitives.atom(!1);return solidJs.createComputed(primitives.defer(solidJs.createMemo(()=>!!p()?.()||!!N()?.()),E=>{solidJs.batch(()=>{l(E),E||(c({}),v.togglePluginLocatorMode(!1),v.setPluginHighlightTarget(null),I.setInspectedNode(null));});})),[D,E=>void N(()=>E),E=>void p(()=>E)]})(),[u,c]=solidJs.createSignal({});function d(p,N){let D=u()[p];if(D){for(let E of D)if(E.id===N)return E}}function S(p){c(N=>{let D=Object.assign({},N);return delete D[p],D}),i({removed:p});}function m(p,N){c(D=>Object.assign(D,{[p.id]:N})),i({updated:p});}let i=(()=>{let p=[],N=new Set,D=scheduled.throttle(()=>{let f={};for(let y=p.length-1;y>=0;y--){let h=p[y],{id:w}=h;!N.has(w)&&!f[w]&&(f[w]=h);}r.emit("StructureUpdates",{updated:f,removed:[...N]}),p.length=0,N.clear();},50);return f=>{if("removed"in f)N.add(f.removed);else {if(N.has(f.updated.id))return;p.push(f.updated);}D();}})(),g=qe(p=>{r.emit("ComputationUpdates",p);}),b=(p,N)=>{g({rootId:p,id:N});},I=mt(l,{eventHub:r}),v=it({components:u,debuggerEnabled:l,findComponent:d,getElementById:I.getElementById,setLocatorEnabledSignal:a});function x(){let p=I.getLastDetails();!p||!p.location||v.openElementSourceCode(p.location,p.name);}function C(){return {listenTo:r.on,setUserEnabledSignal:s,triggerUpdate:t,forceTriggerUpdate:n,openInspectedNodeLocation:x,inspector:{setInspectedNode:I.setInspectedNode,toggleValueNode:I.toggleValueNode},locator:{toggleEnabled:v.togglePluginLocatorMode,enabledByDebugger:v.enabledByDebugger,addClickInterceptor:v.addClickInterceptor,setHighlightTarget:v.setPluginHighlightTarget,onHoveredComponent:v.onDebuggerHoveredComponentChange}}}return {onUpdate:e,onForceUpdate:o,enabled:l,useDebugger:C,updateRoot:m,removeRoot:S,pushComputationUpdate:b,useLocator:v.useLocator}});var ue=new Map,ft=(e,t)=>{let o=ue.get(e);return o?o.forceUpdate(t):null};function Ho(e){A(t=>{V(e,t);let o=T(e),n=(s,a)=>{e.isDisposed||(solidJs.untrack(O.enabled)&&l(),O.pushComputationUpdate(s,a));},r=primitives.untrackedCallback(s=>{if(e.isDisposed)return null;let a=Ze(e,{onComputationUpdate:n,rootId:o,inspectedId:s??null});return O.updateRoot(a.root,a.components),a}),l=scheduled.throttle(r,300);ue.set(o,{forceUpdate:r,dispose:t}),O.onUpdate(l),O.onForceUpdate(r),solidJs.createEffect(()=>{O.enabled()&&r();}),Ce(e,{rootId:o,triggerRootUpdate:l,forceRootUpdate:r}),solidJs.onCleanup(()=>{ze(e),O.removeRoot(o),e.isDisposed=!0,ue.delete(o);});});}function ce(e=U()){let t=e;if(!t)return utils.warn("reatachOwner helper should be called synchronously in a reactive owner.");jo(t,(o,n)=>{if(n!==B&&(o.sdtAttached=null,M(o,0),Ho(o),n)){n.triggerRootUpdate();let r=It(o);if(!r.owner)return utils.warn("PARENT_SHOULD_BE_ALIVE");o.sdtAttached=r.owner;let l=()=>{let u=It(o);u.owner?(r=u,o.sdtAttached=r.owner,V(r.root,l)):(o.sdtAttached=null,a());},s=V(r.root,l),a=V(o,()=>{o.isDisposed=!0,o.sdtAttached=null,s(),n.triggerRootUpdate();});}});}function Fo(){ue.forEach(e=>e.dispose());}var yt=!1;function Ae(){yt||(yt=!0,ve(e=>ce(e)));}function It(e){let t=null,o=null,n=e;for(;n.owner&&!o;)n=n.owner,Z(n)&&(n.isDisposed?t=n:o=n);return o?{owner:t?.owner??e.owner,root:o}:{owner:null,root:null}}function jo(e,t){let o=[],n;do{if(Z(e)){if("sdtAttached"in e){n||(n=Ye(e));break}if(e.sdtContext===B){n=B;break}o.push(e);}e=e.owner;}while(e);for(let r=o.length-1;r>=0;r--){let l=o[r];t(l,n),l.sdtContext&&(n=l.sdtContext);}}var Fr=e=>(ce(),e.children),Br=O.useDebugger,Wr=O.useLocator;

exports.Debugger = Fr;
exports.INFINITY = $e;
exports.NAN = Fe;
exports.NEGATIVE_INFINITY = He;
exports.NodeType = Nt;
exports.ValueType = je;
exports.attachDebugger = ce;
exports.createInternalRoot = A;
exports.createUnownedRoot = Lt;
exports.enableRootsAutoattach = Ae;
exports.getFunctionSources = kt;
exports.getNodeName = ee;
exports.getNodeType = Ne;
exports.getOwner = U;
exports.getOwnerType = j;
exports.getValueItemId = In;
exports.interceptComputationRerun = Je;
exports.isSolidComputation = L;
exports.isSolidMemo = k;
exports.isSolidOwner = ye;
exports.isSolidRoot = Z;
exports.isSolidStore = F;
exports.lookupOwner = Ut;
exports.makeCreateRootListener = ve;
exports.makeSolidUpdateListener = he;
exports.makeValueUpdateListener = Pt;
exports.markComponentLoc = Le;
exports.observeComputationUpdate = xe;
exports.observeValueUpdate = W;
exports.onOwnerCleanup = V;
exports.onParentCleanup = Mt;
exports.removeValueUpdateObserver = P;
exports.unobserveAllRoots = Fo;
exports.useDebugger = Br;
exports.useLocator = Wr;