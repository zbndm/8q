'use strict';

var d=(o,n)=>o==="value"?"value":`${o}:${n}`;var p="__$sdt-Infinity__",s="__$sdt-NegativeInfinity__",l="__$sdt-NaN__",r=(t=>(t[t.Root=0]="Root",t[t.Component=1]="Component",t[t.Effect=2]="Effect",t[t.Render=3]="Render",t[t.Memo=4]="Memo",t[t.Computation=5]="Computation",t[t.Refresh=6]="Refresh",t[t.Context=7]="Context",t[t.Signal=8]="Signal",t[t.Store=9]="Store",t))(r||{}),a=(e=>(e[e.Number=0]="Number",e[e.Boolean=1]="Boolean",e[e.String=2]="String",e[e.Null=3]="Null",e[e.Undefined=4]="Undefined",e[e.Symbol=5]="Symbol",e[e.Array=6]="Array",e[e.Object=7]="Object",e[e.Function=8]="Function",e[e.Getter=9]="Getter",e[e.Element=10]="Element",e[e.Instance=11]="Instance",e[e.Store=12]="Store",e))(a||{});

exports.INFINITY = p;
exports.NAN = l;
exports.NEGATIVE_INFINITY = s;
exports.NodeType = r;
exports.ValueType = a;
exports.getValueItemId = d;
