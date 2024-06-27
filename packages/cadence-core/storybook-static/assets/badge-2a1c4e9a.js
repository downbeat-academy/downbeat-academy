import{r as m}from"./index-1b03fe98.js";import{u as a}from"./index-314922dd.js";import{M as p,d as j}from"./index-3df797b4.js";import{B as f}from"./badge.stories-eaceb5ca.js";import"./iframe-5ec15c6a.js";import"../sb-preview/runtime.js";import"./index-6fd5a17b.js";import"./index-02182706.js";import"./index-cd13eac2.js";import"./index-356e4a49.js";var h={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var g=m,u=Symbol.for("react.element"),y=Symbol.for("react.fragment"),_=Object.prototype.hasOwnProperty,B=g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,E={key:!0,ref:!0,__self:!0,__source:!0};function x(r,e,l){var t,o={},i=null,d=null;l!==void 0&&(i=""+l),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(d=e.ref);for(t in e)_.call(e,t)&&!E.hasOwnProperty(t)&&(o[t]=e[t]);if(r&&r.defaultProps)for(t in e=r.defaultProps,e)o[t]===void 0&&(o[t]=e[t]);return{$$typeof:u,type:r,key:i,ref:d,props:o,_owner:B.current}}s.Fragment=y;s.jsx=x;s.jsxs=x;h.exports=s;var n=h.exports;function c(r){const e={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(p,{of:f,title:"Badge"}),`
`,n.jsx(e.h1,{id:"badge",children:"Badge"}),`
`,n.jsx(e.p,{children:"Use a Badge to highlight important metadata or information pertaining to an object or UI element."}),`
`,n.jsx(e.h2,{id:"example",children:"Example"}),`
`,n.jsx(j,{}),`
`,n.jsx(e.h2,{id:"usage",children:"Usage"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`import { Badge } from "cadence-core";

const Example = () => {
  return (
      <Badge
        text='Badge text'
        type='neutral'
        size='medium'
        style='filled'
      />
  );
};

export default Example;
`})}),`
`,n.jsx(e.h2,{id:"arguments",children:"Arguments"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"text"})," - A string that represents the text content of the Badge."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"type"})," - The communication type of the Badge. Can be one of ",n.jsx(e.code,{children:"neutral"}),", ",n.jsx(e.code,{children:"success"}),", ",n.jsx(e.code,{children:"warning"}),", ",n.jsx(e.code,{children:"error"}),", ",n.jsx(e.code,{children:"info"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"size"})," - The size of the Badge. Can be one of ",n.jsx(e.code,{children:"small"}),", ",n.jsx(e.code,{children:"medium"}),", ",n.jsx(e.code,{children:"large"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"style"})," - The style of the Badge. Can be one of ",n.jsx(e.code,{children:"filled"}),", ",n.jsx(e.code,{children:"outlined"}),", or ",n.jsx(e.code,{children:"light"}),"."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"icon"})," - An optional icon to display in the Badge."]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"className"})," - An optional class name to apply to the Badge."]}),`
`]})]})}function D(r={}){const{wrapper:e}={...a(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(c,{...r})}):c(r)}export{D as default};
