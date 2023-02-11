import { b as b$1, a as a$1, c } from './chunk-PRSR3EF5.js';
import { template, transformAsync } from '@babel/core';
import k from 'path';
import * as a from '@babel/types';

var x=process.cwd(),N=template(`globalThis.${b$1} = %%loc%%;`)({loc:a.stringLiteral(x)}),h=template(`globalThis.${a$1}(%%loc%%);`),b=n=>/^[A-Z]/.test(n),T=(n,e,r)=>`${n}:${e}:${r}`;function y(n,e,r=!1){if(!(!n.loc||typeof e.filename!="string"))return T(k.relative(x,e.filename),n.loc.start.line,n.loc.start.column+(r?2:0))}var d=!1,w=n=>({name:"@solid-devtools/location",visitor:{Program(e,r){d=!1,!(typeof r.filename!="string"||!r.filename.includes(x))&&(d=!0,e.node.body.push(N));},...n.jsx&&{JSXOpeningElement(e,r){let{openingElement:t}=e.container;if(!d||t.name.type!=="JSXIdentifier"||b(t.name.name))return;let o=y(t,r,!0);o&&t.attributes.push(a.jsxAttribute(a.jsxIdentifier(c),a.stringLiteral(o)));}},...n.components&&{FunctionDeclaration(e,r){if(!d||!e.node.id||!b(e.node.id.name))return;let t=y(e.node,r);t&&e.node.body.body.unshift(h({loc:a.stringLiteral(t)}));},VariableDeclarator(e,r){let{init:t,id:o}=e.node;if(!d||!o||!("name"in o)||!b(o.name)||!t||t.type!=="FunctionExpression"&&t.type!=="ArrowFunctionExpression"||t.body.type!=="BlockStatement")return;let s=y(e.node,r);s&&t.body.body.unshift(h({loc:a.stringLiteral(s)}));}}}}),A=w;var L=a.identifier("name");function P(n,e){if(n.type!==e.type)return !1;switch(n.type){case"Identifier":case"V8IntrinsicIdentifier":return n.name===e.name;case"PrivateName":return n.id===e.id;case"MemberExpression":return P(n.object,e.object)&&P(n.property,e.property);default:return !1}}var C={createSignal:1,createMemo:2,createStore:1,createMutable:1},g,R={name:"@solid-devtools/name",visitor:{Program(){g={createSignal:[],createMemo:[],createStore:[],createMutable:[]};},ImportDeclaration(n){let e=n.node,r=e.source.value,t;switch(r){case"solid-js":t=["createSignal","createMemo"];break;case"solid-js/store":t=["createStore","createMutable"];break;default:return}for(let o of e.specifiers)switch(o.type){case"ImportNamespaceSpecifier":for(let c of t)g[c].push(a.memberExpression(o.local,a.identifier(c)));break;case"ImportSpecifier":let s;switch(o.imported.type){case"Identifier":if(!t.includes(o.imported.name))continue;s=o.imported.name;break;case"StringLiteral":if(!t.includes(o.imported.value))continue;s=o.imported.value;break;default:continue}g[s].push(o.local);break}},VariableDeclaration(n){let e=n.node.declarations;for(let r of e){let t=r.init;if(!t||t.type!=="CallExpression")continue;let o;for(let[i,u]of Object.entries(g))if(u.some(m=>P(t.callee,m))){o=i;break}if(!o)continue;let s=r.id,c;switch(s.type){case"Identifier":c=s.name;break;case"ArrayPattern":if(!s.elements.length)continue;let i=s.elements[0];if(!i||i.type!=="Identifier")continue;c=i.name;break;default:continue}let f=a.objectProperty(L,a.stringLiteral(c)),p=C[o];for(;t.arguments.length<p;)t.arguments.push(a.identifier("undefined"));if(t.arguments.length===p)t.arguments.push(a.objectExpression([f]));else {let i=t.arguments[p];if(i.type!=="ObjectExpression"||i.properties.some(u=>u.type==="ObjectProperty"&&u.key.type==="Identifier"&&u.key.name===L.name)||i.type!=="ObjectExpression")continue;i.properties.unshift(f);break}}}}},M=R;function D(n){let e=n.lastIndexOf(".");return e<0?"":n.substring(e+1)}var _=(n={})=>{let{name:e=!1,jsxLocation:r=!1,componentLocation:t=!1}=n,o=!1,s=process.cwd();return {name:"solid-devtools",enforce:"pre",configResolved(c){o=c.command==="serve"&&c.mode!=="production";},async transform(c,f,p){if(p?.ssr||!o)return;let i=D(f);if(!["js","jsx","ts","tsx"].includes(i))return;let u=i==="jsx"||i==="tsx",m=[];if((r||t)&&u&&m.push(A({jsx:r,components:t})),e&&m.push(M),m.length===0)return;m.splice(0,0,["@babel/plugin-syntax-typescript",{isTSX:u}]);let S=await transformAsync(c,{babelrc:!1,configFile:!1,root:s,filename:f,sourceFileName:f,plugins:m});if(!S)return null;let{code:j}=S;return j?{code:j}:null}}},Z=_;

export { Z as default, _ as devtoolsPlugin };
