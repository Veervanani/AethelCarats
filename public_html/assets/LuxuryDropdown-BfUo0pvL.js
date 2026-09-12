import{r as c,j as t,n as j,c as z}from"./react-vendor-BQZO0c5l.js";import{g as u,E as D}from"./ui-vendor-Bs2yixgz.js";const L=D`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,F=u.div`
  position: relative;
  display: inline-block;
  width: ${({$fullWidth:r})=>r?"100%":"auto"};
  user-select: none;
  z-index: ${({$isOpen:r})=>r?9999:1};
`,S=u.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #F5F1E8;
  margin-bottom: 8px;
`,I=u.button`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0 14px;
  background-color: #111111;
  border: 1px solid ${({$open:r})=>r?"#C9A96E":"rgba(140, 116, 75, 0.25)"};
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #F5F1E8;
  cursor: ${({$disabled:r})=>r?"not-allowed":"pointer"};
  opacity: ${({$disabled:r})=>r?.6:1};
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    border-color: #C9A96E;
  }

  &:focus-visible {
    outline: none;
    border-color: #C9A96E;
    box-shadow: 0 0 0 2px rgba(201, 169, 110, 0.2);
  }

  .trigger-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.85rem;
  }

  .chevron {
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    transform: ${({$open:r})=>r?"rotate(180deg)":"rotate(0deg)"};
    color: #C9A96E;
    flex-shrink: 0;
  }
`,R=u.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  min-width: 100%;
  box-sizing: border-box;
  max-height: 180px;
  overflow-y: auto;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.35);
  border-radius: 4px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(201, 169, 110, 0.15);
  list-style: none;
  padding: 4px 0;
  margin: 0;
  z-index: 99999;
  animation: ${L} 160ms cubic-bezier(0.16, 1, 0.3, 1) forwards;

  scrollbar-width: thin;
  scrollbar-color: #C9A96E #111111;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #111111;
    border-radius: 0 4px 4px 0;
  }
  &::-webkit-scrollbar-thumb {
    background: #C9A96E;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #DFBA73;
  }
`,H=u.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 14px;
  font-size: 0.82rem;
  font-weight: ${({$selected:r})=>r?"600":"400"};
  color: ${({$selected:r})=>r?"#C9A96E":"#F5F1E8"};
  background-color: ${({$selected:r,$active:n})=>r?"#1F1B14":n?"#1E1E1E":"transparent"};
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
  white-space: nowrap;

  &:hover {
    background-color: #1E1E1E;
    color: #C9A96E;
  }
`,T=({label:r,options:n,value:a,onChange:g,placeholder:w="Select...",style:y,className:k,fullWidth:E=!0,disabled:b=!1})=>{var m;const[s,i]=c.useState(!1),[v,d]=c.useState(-1),x=c.useRef(null),f=c.useRef(null),h=n.find(e=>e.value===a||e.value&&a&&e.value.toLowerCase()===a.toLowerCase())||(a==="All"||a==="Any"?n.find(e=>e.value==="All"||e.value==="Any"):null),A=h?h.label:w||(((m=n[0])==null?void 0:m.label)??"Select...");c.useEffect(()=>{s&&f.current&&(f.current.scrollTop=0)},[s]),c.useEffect(()=>{const e=l=>{x.current&&!x.current.contains(l.target)&&i(!1)},o=l=>{l.key==="Escape"&&i(!1)};return document.addEventListener("mousedown",e),document.addEventListener("keydown",o),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("keydown",o)}},[]);const C=e=>{b||(e.key==="Enter"||e.key===" "?(e.preventDefault(),i(o=>!o)):e.key==="ArrowDown"?(e.preventDefault(),s?d(o=>o<n.length-1?o+1:0):(i(!0),d(0))):e.key==="ArrowUp"&&(e.preventDefault(),s?d(o=>o>0?o-1:n.length-1):(i(!0),d(n.length-1))))},$=e=>{var o;if(e===a&&e!=="All"&&e!=="Any"){const l=((o=n.find(p=>p.value==="All"||p.value==="Any"))==null?void 0:o.value)||"All";g(l)}else g(e);i(!1)};return t.jsxs(F,{ref:x,$fullWidth:E,$isOpen:s,style:y,className:k,children:[r&&t.jsx(S,{children:r}),t.jsxs(I,{type:"button",$open:s,$disabled:b,onClick:()=>!b&&i(!s),onKeyDown:C,"aria-haspopup":"listbox","aria-expanded":s,children:[t.jsx("span",{className:"trigger-text",children:A}),t.jsx(j,{size:14,className:"chevron"})]}),s&&t.jsx(R,{ref:f,role:"listbox",children:n.map((e,o)=>{if(e.isHeader)return t.jsx("div",{style:{padding:"8px 12px 4px 12px",fontSize:"0.65rem",fontWeight:700,letterSpacing:"0.12em",color:"#C9A96E",textTransform:"uppercase",background:"#111111",borderTop:"1px solid rgba(140, 116, 75, 0.2)",borderBottom:"1px solid rgba(140, 116, 75, 0.2)",margin:"4px 0 2px 0"},children:e.label},e.value||o);const l=e.value===a,p=o===v;return t.jsxs(H,{role:"option","aria-selected":l,$selected:l,$active:p,onClick:()=>$(e.value),onMouseEnter:()=>d(o),children:[t.jsxs("span",{style:{display:"flex",alignItems:"center",gap:6},children:[e.colorHex&&t.jsx("span",{style:{width:12,height:12,borderRadius:"50%",background:e.colorHex,border:"1px solid #ccc",display:"inline-block"}}),e.label]}),l&&t.jsx(z,{size:14,color:"#C9A45C"})]},e.value)})})]})};export{T as L};
