import{r as f,j as r,o as E,c as D}from"./react-vendor-DSaFutMS.js";import{g as c,E as L}from"./ui-vendor-DguFyjS7.js";const A=L`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,z=c.div`
  position: relative;
  display: inline-block;
  width: ${({$fullWidth:t})=>t?"100%":"auto"};
  user-select: none;
`,S=c.label`
  display: block;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6b6b6b;
  margin-bottom: 4px;
`,C=c.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 12px;
  background-color: #ffffff;
  border: 1px solid ${({$open:t})=>t?"#c9a45c":"#d9d3c7"};
  border-radius: 2px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #1f1f1f;
  cursor: ${({$disabled:t})=>t?"not-allowed":"pointer"};
  opacity: ${({$disabled:t})=>t?.6:1};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({$disabled:t})=>t?"#d9d3c7":"#c9a45c"};
  }

  &:focus-visible {
    outline: 2px solid #c9a45c;
    outline-offset: 1px;
  }

  .trigger-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chevron {
    transition: transform 0.2s ease;
    transform: ${({$open:t})=>t?"rotate(180deg)":"rotate(0deg)"};
    color: #6b6b6b;
    flex-shrink: 0;
  }
`,I=c.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  min-width: 140px;
  max-height: 240px;
  overflow-y: auto;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  border-radius: 2px;
  box-shadow: 0 8px 24px rgba(31, 31, 31, 0.08);
  list-style: none;
  padding: 4px 0;
  margin: 0;
  z-index: 1000;
  animation: ${A} 200ms ease-out forwards;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d9d3c7;
    border-radius: 2px;
  }
`,H=c.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  font-size: 0.78rem;
  font-weight: ${({$selected:t})=>t?"700":"500"};
  color: ${({$selected:t})=>t?"#c9a45c":"#1f1f1f"};
  background-color: ${({$selected:t,$active:s})=>t?"#faf5eb":s?"#faf8f5":"transparent"};
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background-color: #faf5eb;
    color: #c9a45c;
  }
`,K=({label:t,options:s,value:p,onChange:b,placeholder:h="Select...",style:m,className:w,fullWidth:y=!0,disabled:u=!1})=>{const[l,a]=f.useState(!1),[k,i]=f.useState(-1),x=f.useRef(null),g=s.find(e=>e.value===p),v=g?g.label:h;f.useEffect(()=>{const e=n=>{x.current&&!x.current.contains(n.target)&&a(!1)},o=n=>{n.key==="Escape"&&a(!1)};return document.addEventListener("mousedown",e),document.addEventListener("keydown",o),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("keydown",o)}},[]);const j=e=>{u||(e.key==="Enter"||e.key===" "?(e.preventDefault(),a(o=>!o)):e.key==="ArrowDown"?(e.preventDefault(),l?i(o=>o<s.length-1?o+1:0):(a(!0),i(0))):e.key==="ArrowUp"&&(e.preventDefault(),l?i(o=>o>0?o-1:s.length-1):(a(!0),i(s.length-1))))},$=e=>{var o;if(e===p&&e!=="All"&&e!=="Any"){const n=((o=s.find(d=>d.value==="All"||d.value==="Any"))==null?void 0:o.value)||"All";b(n)}else b(e);a(!1)};return r.jsxs(z,{ref:x,$fullWidth:y,style:m,className:w,children:[t&&r.jsx(S,{children:t}),r.jsxs(C,{type:"button",$open:l,$disabled:u,onClick:()=>!u&&a(!l),onKeyDown:j,"aria-haspopup":"listbox","aria-expanded":l,children:[r.jsx("span",{className:"trigger-text",children:v}),r.jsx(E,{size:14,className:"chevron"})]}),l&&r.jsx(I,{role:"listbox",children:s.map((e,o)=>{if(e.isHeader)return r.jsx("div",{style:{padding:"8px 12px 4px 12px",fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.12em",color:"#c9a45c",textTransform:"uppercase",background:"#faf8f5",borderTop:"1px solid #f0ecf6",borderBottom:"1px solid #f0ecf6",margin:"4px 0 2px 0"},children:e.label},e.value||o);const n=e.value===p,d=o===k;return r.jsxs(H,{role:"option","aria-selected":n,$selected:n,$active:d,onClick:()=>$(e.value),onMouseEnter:()=>i(o),children:[r.jsxs("span",{style:{display:"flex",alignItems:"center",gap:6},children:[e.colorHex&&r.jsx("span",{style:{width:12,height:12,borderRadius:"50%",background:e.colorHex,border:"1px solid #ccc",display:"inline-block"}}),e.label]}),n&&r.jsx(D,{size:14,color:"#C9A45C"})]},e.value)})})]})};export{K as L};
