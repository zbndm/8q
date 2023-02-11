import { onCleanup, createEffect, on, $PROXY, untrack } from 'solid-js';
import { asArray, arrayEquals } from '@solid-primitives/utils';
import { getOwner, isSolidComputation, observeValueUpdate, removeValueUpdateObserver, interceptComputationRerun, onParentCleanup, lookupOwner, getOwnerType, makeSolidUpdateListener, getFunctionSources, makeValueUpdateListener, isSolidStore, isSolidMemo, getNodeType, getNodeName } from '@solid-devtools/debugger';
import { NodeType } from '@solid-devtools/debugger/types';
import { dedupeArray, arrayRefEquals } from '@solid-devtools/shared/utils';

function R(){let e=performance.now();return ()=>{let n=performance.now(),o=n-e;return e=n,Math.round(o)}}function O(e,n,o=WeakMap){let r=new o,a=[],l=[...n];return e.forEach(t=>{let i=l.indexOf(t);i!==-1?l.splice(i,1):r.set(t,"removed"),a.push(t);}),l.forEach(t=>{a.includes(t)||(r.set(t,"added"),a.push(t));}),[t=>r.get(t)||null,a]}function B(e,n,o=WeakMap){let r=new o,a=[...e];for(let l=a.length;l<n.length;l++)a.push(n[l]),r.set(n[l],"added");return [l=>r.get(l)||null,a]}var S=Symbol("unused"),f={bold:"font-weight: bold; font-size: 1.1em;",ownerName:"font-weight: bold; font-size: 1.1em; background: rgba(153, 153, 153, 0.3); padding: 0.1em 0.3em; border-radius: 4px;",grayBackground:"background: rgba(153, 153, 153, 0.3); padding: 0 0.2em; border-radius: 4px;",signalUnderline:"text-decoration: orange wavy underline;",new:"color: orange; font-style: italic"},u=e=>`\x1B[90m${e}\x1B[m`,A=e=>`\x1B[90;3m${e}\u200Ams\x1B[m`,h=e=>e===NodeType.Signal?f.signalUnderline:f.grayBackground;function C(e){return typeof e=="object"?" %o":typeof e=="function"?" %O":""}function w(e){if("type"in e&&"typeName"in e&&"name"in e)return e;let n=getNodeType(e);return {type:n,typeName:NodeType[n],name:getNodeName(e)}}function G(e){if("type"in e&&"typeName"in e&&"name"in e)return e;let n=getNodeType(e);return {type:n,typeName:NodeType[n],name:getNodeName(e),value:e.value}}function ge(){let e=0;return [n=>n.padEnd(e),n=>e=Math.max(n.length,e)]}function v(e,n,o){let[r,a]=ge();e.map((t,i)=>{let s=n(t,i);return a(s),[t,s]}).forEach(([t,i],s)=>o(r(i),t,s));}var Y=(e,n,o)=>[`%c${e} %c${n}%c created  ${A(o)}`,"",f.ownerName,""],q=(e,n)=>[`%c${e}%c re-executed  ${A(n)}`,f.ownerName,""],z=e=>[`%c${e}%c disposed`,f.ownerName,""];function K(e){console.log(`${u("Previous =")}${C(e)}`,e);}var X=({causedBy:e,owner:n,owned:o,sources:r,prev:a,value:l})=>{if(n!==S){let t=u("Owner:");if(!n)console.log(t,null);else {let{name:i}=w(n);console.log(`${t} %c${i}`,f.grayBackground);}}if(l!==S&&console.log(`${u("Value =")}${C(l)}`,l),a!==S&&K(a),e&&e.length)if(e.length===1){let{name:t,type:i,value:s}=e[0];console.log(`%c${u("Caused By:")} %c${t}%c ${u("=")}`,"",h(i),"",s);}else console.groupCollapsed(u("Caused By:"),e.length),e.forEach(({name:t,type:i,value:s})=>{console.log(`%c${t}%c ${u("=")}`,h(i),"",s);}),console.groupEnd();r.length?(console.groupCollapsed(u("Sources:"),r.length),r.forEach(t=>{let{type:i,name:s}=w(t);console.log(`%c${s}%c ${u("=")}`,h(i),"",t.value);}),console.groupEnd()):console.log(u("Sources:"),0),o.length?(console.groupCollapsed(u("Owned:"),o.length),oe(o),console.groupEnd()):console.log(u("Owned:"),0);},D=(e,n)=>{console.groupCollapsed(...e),X(n),console.groupEnd();};function H(e,n,o){console.groupCollapsed(`Owned by the %c${e.name}%c ${e.typeName}:`,f.ownerName,"",n.length),ee(o,n,"stack",r=>{let a=r.sources?dedupeArray(r.sources):[],t=!!r.fn.length||isSolidMemo(r);X({owner:e,owned:r.owned??[],sources:a,prev:S,value:t?r.value:S,causedBy:null});}),console.groupEnd();}function J(e){console.groupCollapsed("Signals initial values:"),e.forEach(N),console.groupEnd();}function Q(e){let{type:n,typeName:o,value:r,name:a}=G(e);console.log(`%c${o} %c${a}%c initial value ${u("=")}${C(r)}`,"",`${f.bold} ${h(n)}`,"",r);}function N(e){let{type:n,typeName:o,name:r,value:a}=G(e);console.log(`${u(o)} %c${r}%c ${u("=")}${C(a)}`,`${h(n)}`,"",a);}function Z({name:e,type:n},o,r,a){console.groupCollapsed(`%c${e}%c updated ${u("=")}${C(o)}`,`${f.bold} ${h(n)}`,"",o),K(r),a&&pe(a),console.groupEnd();}function pe(e){e.length&&(console.groupCollapsed(u("Caused Updates:"),e.length),oe(e),console.groupEnd());}function _(e,n,o){let r=[`%c${e}%c observers changed:`,`${f.bold} ${f.signalUnderline}`,"",n.length];if(!n.length&&!o.length)return console.log(...r);console.groupCollapsed(...r),ee(o,n,"thorow"),console.groupEnd();}function ee(e,n,o,r){let[a,l]=o==="thorow"?O(e,n):B(e,n);v(l,t=>NodeType[getOwnerType(t)],(t,i)=>{let s=a(i),d=getNodeName(i),c=(()=>s==="added"?[`${u(t)} %c${d}%c  new`,f.grayBackground,f.new]:s==="removed"?[`${u(t)} %c${d}`,"background: rgba(153, 153, 153, 0.15); padding: 0 0.2em; border-radius: 4px; text-decoration: line-through; color: #888"]:[`${u(t)} %c${d}`,f.grayBackground])();r?(console.groupCollapsed(...c),r(i),console.groupEnd()):console.log(...c);});}function oe(e,n){v(e,o=>NodeType[getOwnerType(o)],(o,r)=>{let a=[`${u(o)} %c${getNodeName(r)}`,f.grayBackground];n?(console.groupCollapsed(...a),n(r),console.groupEnd()):console.log(...a);});}function P(e,n,o){let{type:r,typeName:a,name:l}=e;return [`%c${a} %c${l}%c created with ${o?"empty":""}${n?"dynamic ":""}props`,"",h(r),""]}function L({name:e,type:n},o){return [`Dynamic props of %c${e}%c ${o?"are empty now":"updated keys:"}`,h(n),""]}function k(e,n,o,r){return r===null?[`${u(e)} ${n} ${u("=")}${C(o)}`,o]:r==="added"?[`${u(e)} ${n}%c new ${u("=")}${C(o)}`,f.new,o]:[`${u(e)} %c${n}`,"text-decoration: line-through; color: #888"]}var ke=e=>!!e[$PROXY];function M(e,n){let o;return n==="computation"?o="$debug":n==="signals"?o="$debugSignals":n==="owned"?o="$debugOwned":o="$debugSignal",e[o]?!0:(e[o]=!0,()=>e[o]=!1)}function Ee(e,{initialRun:n=!0}={}){let o=e===void 0?getOwner():e;if(!o||!isSolidComputation(o))return console.warn("owner is not a computation");if(M(o,"computation")===!0)return;let{type:r,typeName:a,name:l}=w(o),t=Symbol(l),i=!!o.fn.length,s=i||r===NodeType.Memo,d=[],c=[],g=b=>{d.forEach(m=>m()),d=[],b.forEach(m=>{observeValueUpdate(m,y=>c.push({...w(m),value:y}),t),d.push(()=>removeValueUpdateObserver(m,t));});};n?observeValueUpdate(o,b=>{let m=p();removeValueUpdateObserver(o,t);let y=o.sources?dedupeArray(o.sources):[];D(Y(a,l,m),{owner:{type:r,typeName:a,name:l},owned:o.owned??[],sources:y,prev:S,value:s?b:S,causedBy:null}),g(y);},t):g(o.sources?dedupeArray(o.sources):[]),interceptComputationRerun(o,(b,m)=>{let y=c;c=[],p();let se=b(),ue=p(),W=o.sources?dedupeArray(o.sources):[];D(q(l,ue),{owner:S,owned:o.owned??[],sources:W,prev:i?m:S,value:s?se:S,causedBy:y}),g(W);}),onParentCleanup(o,()=>{console.log(...z(l)),d.forEach(b=>b()),d.length=0,c.length=0;},!0);let p=R();}function Je(e){let n=e===void 0?getOwner():e;if(!n)return console.warn("no owner passed to debugOwnedComputations");let o=M(n,"owned");if(o===!0)return;onCleanup(o);let{type:r,typeName:a,name:l}=w(lookupOwner(n,i=>getOwnerType(i)!==NodeType.Refresh)),t=[];makeSolidUpdateListener(()=>{let{owned:i}=n;if(!i)return;let s=[],d=t.length;for(;d<i.length;d++){let c=i[d];Ee(c,{initialRun:!1}),s.push(c);}s.length!==0&&(s=[...t,...s],H({type:r,typeName:a,name:l},s,t),t=s);});}function re(e,n={}){let o;if(typeof e=="function"){let g=getFunctionSources(e);if(g.length===0)return console.warn("No signal was passed to debugSignal");if(g.length>1)return console.warn("More then one signal was passed to debugSignal");o=g[0];}else o=e;if(M(o)===!0)return;let{trackObservers:r=!0,logInitialValue:a=!0}=n,l=w(o),t=Symbol(l.name);a&&Q({...l,value:o.value});let i,s=[],d=[];if(o.observers||(o.observers=[],o.observerSlots=[]),makeValueUpdateListener(o,(g,p)=>{Z(l,g,p,r?s:dedupeArray(o.observers));},t),r){let g=function(){let p=dedupeArray(i);arrayRefEquals(p,s)||(_(l.name,p,s),s=[...p],d=[...i]);};makeSolidUpdateListener(()=>{if(i=o.observers,i.length!==d.length)return g();for(let p=i.length;p>=0;p--)if(i[p]!==d[p])return g()});}}function Ve(e,n={}){let o=[];if(asArray(e).forEach(a=>{typeof a=="function"?o.push.apply(o,getFunctionSources(a)):o.push(a);}),o.length===0)return console.warn("No signals were passed to debugSignals");if(o=o.filter(a=>!a.$debugSignal),o.length===1)return re(o[0],n);let{logInitialValue:r=!0}=n;r&&J(o),o.forEach(a=>{re(a,{...n,logInitialValue:!1});});}function Qe(e,n={}){if(e=getOwner(),!e)return console.warn("debugOwnerState found no Owner");if(M(e,"signals")===!0)return;let o=e,r=0,a=0;makeSolidUpdateListener(()=>{let l=[],t;if(o.sourceMap){let i=Object.values(o.sourceMap);for(t=r;t<i.length;t++){let s=i[t];isSolidStore(s)||l.push(s);}r=t;}if(o.owned){for(t=a;t<o.owned.length;t++){let i=o.owned[t];isSolidMemo(i)&&l.push(i);}a=t;}l.length!==0&&Ve(l,n);});}var ae=(e,n)=>untrack(()=>n.get?n.get.call(e):n.value);function Ze(e){let n=getOwner();if(!n)return console.warn("debugProps should be used synchronously inside a component");let o=w(lookupOwner(n,l=>getOwnerType(l)!==NodeType.Refresh)),r=ke(e),a=Object.entries(Object.getOwnPropertyDescriptors(e));a.length===0?console.log(...P(o,r,!0)):(console.groupCollapsed(...P(o,r,!1)),v(a,([,l])=>l.get?"Getter":"Value",(l,[t,i])=>{let s=ae(e,i),d=l==="Getter"?getFunctionSources(()=>e[t]):[],c=k(l,t,s,null);d.length>0?(console.groupCollapsed(...c),d.forEach(N),console.groupEnd()):console.log(...c);}),console.groupEnd()),r&&createEffect(on(()=>Object.keys(e),(l,t)=>{if(!t||arrayEquals(l,t))return;let i=Object.getOwnPropertyDescriptors(e);if(Object.entries(i).length===0)console.log(...L(o,!0));else {let[s,d]=O(t,l,Map);console.groupCollapsed(...L(o,!1)),d.forEach(c=>{let g=s(c);if(g==="removed")return console.log(...k("Getter",c,null,"removed"));let p=i[c],b=ae(e,p),m=k("Getter",c,b,g),y=getFunctionSources(()=>e[c]);y.length>0?(console.groupCollapsed(...m),y.forEach(N),console.groupEnd()):console.log(...m);}),console.groupEnd();}}),void 0,{name:"debugProps EFFECT"});}

export { Ee as debugComputation, Je as debugOwnerComputations, Qe as debugOwnerSignals, Ze as debugProps, re as debugSignal, Ve as debugSignals };