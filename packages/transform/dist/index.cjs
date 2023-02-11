'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@babel/core');
var M = require('path');
var a = require('@babel/types');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n.default = e;
	return Object.freeze(n);
}

var M__default = /*#__PURE__*/_interopDefault(M);
var a__namespace = /*#__PURE__*/_interopNamespace(a);

var O="_$markComponentLoc",E="$sdt_projectPath",I="data-source-loc";var x=process.cwd(),v=core.template(`globalThis.${E} = %%loc%%;`)({loc:a__namespace.stringLiteral(x)}),A=core.template(`globalThis.${O}(%%loc%%);`),b=n=>/^[A-Z]/.test(n),k=(n,e,r)=>`${n}:${e}:${r}`;function y(n,e,r=!1){if(!(!n.loc||typeof e.filename!="string"))return k(M__default.default.relative(x,e.filename),n.loc.start.line,n.loc.start.column+(r?2:0))}var d=!1,C=n=>({name:"@solid-devtools/location",visitor:{Program(e,r){d=!1,!(typeof r.filename!="string"||!r.filename.includes(x))&&(d=!0,e.node.body.push(v));},...n.jsx&&{JSXOpeningElement(e,r){let{openingElement:t}=e.container;if(!d||t.name.type!=="JSXIdentifier"||b(t.name.name))return;let o=y(t,r,!0);o&&t.attributes.push(a__namespace.jsxAttribute(a__namespace.jsxIdentifier(I),a__namespace.stringLiteral(o)));}},...n.components&&{FunctionDeclaration(e,r){if(!d||!e.node.id||!b(e.node.id.name))return;let t=y(e.node,r);t&&e.node.body.body.unshift(A({loc:a__namespace.stringLiteral(t)}));},VariableDeclarator(e,r){let{init:t,id:o}=e.node;if(!d||!o||!("name"in o)||!b(o.name)||!t||t.type!=="FunctionExpression"&&t.type!=="ArrowFunctionExpression"||t.body.type!=="BlockStatement")return;let s=y(e.node,r);s&&t.body.body.unshift(A({loc:a__namespace.stringLiteral(s)}));}}}}),N=C;var T=a__namespace.identifier("name");function P(n,e){if(n.type!==e.type)return !1;switch(n.type){case"Identifier":case"V8IntrinsicIdentifier":return n.name===e.name;case"PrivateName":return n.id===e.id;case"MemberExpression":return P(n.object,e.object)&&P(n.property,e.property);default:return !1}}var _={createSignal:1,createMemo:2,createStore:1,createMutable:1},g,R={name:"@solid-devtools/name",visitor:{Program(){g={createSignal:[],createMemo:[],createStore:[],createMutable:[]};},ImportDeclaration(n){let e=n.node,r=e.source.value,t;switch(r){case"solid-js":t=["createSignal","createMemo"];break;case"solid-js/store":t=["createStore","createMutable"];break;default:return}for(let o of e.specifiers)switch(o.type){case"ImportNamespaceSpecifier":for(let c of t)g[c].push(a__namespace.memberExpression(o.local,a__namespace.identifier(c)));break;case"ImportSpecifier":let s;switch(o.imported.type){case"Identifier":if(!t.includes(o.imported.name))continue;s=o.imported.name;break;case"StringLiteral":if(!t.includes(o.imported.value))continue;s=o.imported.value;break;default:continue}g[s].push(o.local);break}},VariableDeclaration(n){let e=n.node.declarations;for(let r of e){let t=r.init;if(!t||t.type!=="CallExpression")continue;let o;for(let[i,u]of Object.entries(g))if(u.some(m=>P(t.callee,m))){o=i;break}if(!o)continue;let s=r.id,c;switch(s.type){case"Identifier":c=s.name;break;case"ArrayPattern":if(!s.elements.length)continue;let i=s.elements[0];if(!i||i.type!=="Identifier")continue;c=i.name;break;default:continue}let p=a__namespace.objectProperty(T,a__namespace.stringLiteral(c)),f=_[o];for(;t.arguments.length<f;)t.arguments.push(a__namespace.identifier("undefined"));if(t.arguments.length===f)t.arguments.push(a__namespace.objectExpression([p]));else {let i=t.arguments[f];if(i.type!=="ObjectExpression"||i.properties.some(u=>u.type==="ObjectProperty"&&u.key.type==="Identifier"&&u.key.name===T.name)||i.type!=="ObjectExpression")continue;i.properties.unshift(p);break}}}}},L=R;function $(n){let e=n.lastIndexOf(".");return e<0?"":n.substring(e+1)}var F=(n={})=>{let{name:e=!1,jsxLocation:r=!1,componentLocation:t=!1}=n,o=!1,s=process.cwd();return {name:"solid-devtools",enforce:"pre",configResolved(c){o=c.command==="serve"&&c.mode!=="production";},async transform(c,p,f){if(f?.ssr||!o)return;let i=$(p);if(!["js","jsx","ts","tsx"].includes(i))return;let u=i==="jsx"||i==="tsx",m=[];if((r||t)&&u&&m.push(N({jsx:r,components:t})),e&&m.push(L),m.length===0)return;m.splice(0,0,["@babel/plugin-syntax-typescript",{isTSX:u}]);let j=await core.transformAsync(c,{babelrc:!1,configFile:!1,root:s,filename:p,sourceFileName:p,plugins:m});if(!j)return null;let{code:S}=j;return S?{code:S}:null}}},z=F;

exports.default = z;
exports.devtoolsPlugin = F;
