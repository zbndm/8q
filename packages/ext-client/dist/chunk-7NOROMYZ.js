var r=()=>(e,t)=>postMessage({id:e,payload:t},"*"),o,a={};function i(){typeof window>"u"||addEventListener("message",e=>{let t=e.data?.id;if(typeof t!="string")return;let n=a[t];n?n.forEach(s=>s(e.data.payload)):o&&o(e.data);});}var p=()=>(e,t)=>{let n=a[e];return n||(n=a[e]=[]),n.push(t),()=>a[e]=n.filter(s=>s!==t)},l=e=>{o=e;},g=e=>typeof e=="object"&&e!==null&&e.forwarding===!0&&"id"in e,y=e=>{postMessage({id:e.id,payload:e.payload},"*");};function M(e,t,n){let s=e(t,(...d)=>(s(),n(...d)));return s}

export { r as a, i as b, p as c, l as d, g as e, y as f, M as g };
