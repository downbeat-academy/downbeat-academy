import{g as F,R as h}from"./index-1b03fe98.js";var j={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(i){(function(){var r={}.hasOwnProperty;function t(){for(var e="",l=0;l<arguments.length;l++){var a=arguments[l];a&&(e=s(e,n(a)))}return e}function n(e){if(typeof e=="string"||typeof e=="number")return e;if(typeof e!="object")return"";if(Array.isArray(e))return t.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var l="";for(var a in e)r.call(e,a)&&e[a]&&(l=s(l,a));return l}function s(e,l){return l?e?e+" "+l:e+l:e}i.exports?(t.default=t,i.exports=t):window.classNames=t})()})(j);var J=j.exports;const X=F(J),Y="badge-module__root--UYP-r",$="badge-module__small---XFTH",M="badge-module__medium--25YDr",U="badge-module__large--Ibjaq",k="badge-module__filled--neutral--j3gmu",A="badge-module__filled--info--Wzv8c",D="badge-module__filled--success--vXmJN",G="badge-module__filled--warning--twlkm",L="badge-module__filled--error--lW2Gf",Q="badge-module__filled--highlight--z7V0E",C="badge-module__outlined--neutral--I8FlL",K="badge-module__outlined--info--epPxs",Z="badge-module__outlined--success--O3JyT",ee="badge-module__outlined--warning--eJmeR",le="badge-module__outlined--error--Po6F-",te="badge-module__outlined--highlight--HQWUR",ae="badge-module__light--neutral--n1uBl",ie="badge-module__light--info--dWXb4",re="badge-module__light--success---136R",ne="badge-module__light--warning--RYb5M",se="badge-module__light--error--k6R2V",oe="badge-module__light--highlight--ttvTI",o={root:Y,small:$,medium:M,large:U,"filled--neutral":"badge-module__filled--neutral--j3gmu",filledNeutral:k,"filled--info":"badge-module__filled--info--Wzv8c",filledInfo:A,"filled--success":"badge-module__filled--success--vXmJN",filledSuccess:D,"filled--warning":"badge-module__filled--warning--twlkm",filledWarning:G,"filled--error":"badge-module__filled--error--lW2Gf",filledError:L,"filled--highlight":"badge-module__filled--highlight--z7V0E",filledHighlight:Q,"outlined--neutral":"badge-module__outlined--neutral--I8FlL",outlinedNeutral:C,"outlined--info":"badge-module__outlined--info--epPxs",outlinedInfo:K,"outlined--success":"badge-module__outlined--success--O3JyT",outlinedSuccess:Z,"outlined--warning":"badge-module__outlined--warning--eJmeR",outlinedWarning:ee,"outlined--error":"badge-module__outlined--error--Po6F-",outlinedError:le,"outlined--highlight":"badge-module__outlined--highlight--HQWUR",outlinedHighlight:te,"light--neutral":"badge-module__light--neutral--n1uBl",lightNeutral:ae,"light--info":"badge-module__light--info--dWXb4",lightInfo:ie,"light--success":"badge-module__light--success---136R",lightSuccess:re,"light--warning":"badge-module__light--warning--RYb5M",lightWarning:ne,"light--error":"badge-module__light--error--k6R2V",lightError:se,"light--highlight":"badge-module__light--highlight--ttvTI",lightHighlight:oe},B=({text:i,type:r="neutral",size:t="medium",style:n="filled",icon:s,className:e})=>{const l=X([o.root,o[t],o[`${n}--${r}`],e]),a=!!s,P=!!i;return h.createElement("div",{className:l,"data-cy":"cds-badge"},a&&h.createElement("span",{className:o.icon,"data-cy":"icon"},s),P&&h.createElement("span",{className:o.text,"data-cy":"text"},i))};B.__docgenInfo={description:"",methods:[],displayName:"Badge",props:{type:{required:!1,tsType:{name:"union",raw:"'neutral' | 'info' | 'success' | 'highlight' | 'warning' | 'error'",elements:[{name:"literal",value:"'neutral'"},{name:"literal",value:"'info'"},{name:"literal",value:"'success'"},{name:"literal",value:"'highlight'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'error'"}]},description:"",defaultValue:{value:"'neutral'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"",defaultValue:{value:"'medium'",computed:!1}},style:{required:!1,tsType:{name:"union",raw:"'filled' | 'outlined' | 'light'",elements:[{name:"literal",value:"'filled'"},{name:"literal",value:"'outlined'"},{name:"literal",value:"'light'"}]},description:"",defaultValue:{value:"'filled'",computed:!1}},text:{required:!1,tsType:{name:"string"},description:""},icon:{required:!1,tsType:{name:"ReactElement"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const O=({text:i="Badge",type:r="neutral",size:t="medium",style:n="filled"})=>h.createElement("div",{style:{display:"flex",justifyContent:"start",alignItems:"center",height:"100%"}},h.createElement(B,{text:i,type:r,size:t,style:n}));O.__docgenInfo={description:"",methods:[],displayName:"Example",props:{type:{required:!1,tsType:{name:"union",raw:"'neutral' | 'info' | 'success' | 'highlight' | 'warning' | 'error'",elements:[{name:"literal",value:"'neutral'"},{name:"literal",value:"'info'"},{name:"literal",value:"'success'"},{name:"literal",value:"'highlight'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'error'"}]},description:"",defaultValue:{value:"'neutral'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"",defaultValue:{value:"'medium'",computed:!1}},style:{required:!1,tsType:{name:"union",raw:"'filled' | 'outlined' | 'light'",elements:[{name:"literal",value:"'filled'"},{name:"literal",value:"'outlined'"},{name:"literal",value:"'light'"}]},description:"",defaultValue:{value:"'filled'",computed:!1}},text:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'"Badge"',computed:!1}},icon:{required:!1,tsType:{name:"ReactElement"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const de={title:"Badge",component:O},d={args:{text:"Neutral badge",type:"neutral",size:"medium",style:"filled"}},u={args:{text:"Info badge",type:"info",size:"medium",style:"filled"}},m={args:{text:"Success badge",type:"success",size:"medium",style:"filled"}},g={args:{text:"Highlight badge",type:"highlight",size:"medium",style:"filled"}},c={args:{text:"Warning badge",type:"warning",size:"medium",style:"filled"}},f={args:{text:"Error badge",type:"error",size:"medium",style:"filled"}};var p,_,b;d.parameters={...d.parameters,docs:{...(p=d.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    text: 'Neutral badge',
    type: 'neutral',
    size: 'medium',
    style: 'filled'
  }
}`,...(b=(_=d.parameters)==null?void 0:_.docs)==null?void 0:b.source}}};var y,v,x;u.parameters={...u.parameters,docs:{...(y=u.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    text: 'Info badge',
    type: 'info',
    size: 'medium',
    style: 'filled'
  }
}`,...(x=(v=u.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var w,E,S;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    text: 'Success badge',
    type: 'success',
    size: 'medium',
    style: 'filled'
  }
}`,...(S=(E=m.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var N,z,I;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    text: 'Highlight badge',
    type: 'highlight',
    size: 'medium',
    style: 'filled'
  }
}`,...(I=(z=g.parameters)==null?void 0:z.docs)==null?void 0:I.source}}};var T,W,R;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    text: 'Warning badge',
    type: 'warning',
    size: 'medium',
    style: 'filled'
  }
}`,...(R=(W=c.parameters)==null?void 0:W.docs)==null?void 0:R.source}}};var q,H,V;f.parameters={...f.parameters,docs:{...(q=f.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    text: 'Error badge',
    type: 'error',
    size: 'medium',
    style: 'filled'
  }
}`,...(V=(H=f.parameters)==null?void 0:H.docs)==null?void 0:V.source}}};const ue=["Neutral","Info","Success","Highlight","Warning","Error"],ge=Object.freeze(Object.defineProperty({__proto__:null,Error:f,Highlight:g,Info:u,Neutral:d,Success:m,Warning:c,__namedExportsOrder:ue,default:de},Symbol.toStringTag,{value:"Module"}));export{ge as B};
