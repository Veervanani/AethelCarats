import{r,j as e,P as W}from"./react-vendor-BsBv4awM.js";import{g as s}from"./ui-vendor-C0FaE403.js";import{b as y}from"./businessApi-BWCDuXbQ.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-pages-Ry4OMD_D.js";import"./admin-tools-vendor-CKN5doRT.js";const R=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;

  h1 {
    font-size: 1.35rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;

    @media (max-width: 640px) {
      font-size: 1.15rem;
    }
  }

  p {
    font-size: 0.78rem;
    color: #64748b;
    margin: 3px 0 0 0;

    @media (max-width: 640px) {
      font-size: 0.72rem;
    }
  }
`,A=s.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  margin-bottom: 20px;
  scrollbar-width: thin;
`,I=s.table`
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
  font-size: 0.82rem;
  white-space: nowrap;

  th {
    text-align: left;
    padding: 12px 16px;
    background: #f8fafc;
    color: #475569;
    font-weight: 600;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
    vertical-align: middle;
  }

  tr:hover td {
    background: #f8fafc;
  }
`,O=()=>{const[d,l]=r.useState([]),[a,E]=r.useState(""),[j,p]=r.useState(!0),[S,i]=r.useState(!1),[c,x]=r.useState(""),[h,v]=r.useState(""),[f,w]=r.useState(""),[u,C]=r.useState(""),[g,z]=r.useState("India"),[k,N]=r.useState(""),b=async()=>{p(!0);try{const t=await y.getSuppliers({search:a});l(Array.isArray(t)?t:(t==null?void 0:t.suppliers)||[])}catch(t){console.error(t),l([])}finally{p(!1)}};r.useEffect(()=>{b()},[a]);const P=async t=>{var n,m;t.preventDefault();try{await y.createSupplier({name:c,contactPerson:h,email:f,phone:u,country:g,notes:k}),i(!1),x(""),b(),alert("✅ Supplier registered")}catch(o){alert(((m=(n=o==null?void 0:o.response)==null?void 0:n.data)==null?void 0:m.message)||"Creation failed")}};return e.jsxs("div",{children:[e.jsxs(R,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Diamond & Material Suppliers"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Procurement partners, diamond manufacturers, and precious metals suppliers"})]}),e.jsxs("button",{onClick:()=>i(!0),style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(W,{size:16})," Add Supplier"]})]}),e.jsx(A,{children:e.jsxs(I,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Supplier Name"}),e.jsx("th",{children:"Contact Person"}),e.jsx("th",{children:"Email / Phone"}),e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Procured Sales Orders"}),e.jsx("th",{children:"Status"})]})}),e.jsxs("tbody",{children:[d.map(t=>{var n;return e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:700},children:t.name}),e.jsx("td",{children:t.contactPerson||"-"}),e.jsxs("td",{children:[e.jsx("div",{children:t.email||"-"}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:t.phone||"-"})]}),e.jsx("td",{children:t.country||"-"}),e.jsx("td",{style:{fontWeight:600},children:((n=t._count)==null?void 0:n.sales)||0}),e.jsx("td",{children:e.jsx("span",{style:{fontSize:"0.72rem",fontWeight:700,padding:"2px 6px",background:"#ebfbee",color:"#2b8a3e",borderRadius:4},children:t.status})})]},t.id)}),d.length===0&&!j&&e.jsx("tr",{children:e.jsx("td",{colSpan:6,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No suppliers found."})})]})]})}),S&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15, 23, 42, 0.7)",backdropFilter:"blur(3px)",zIndex:1e4,display:"flex",justifyContent:"center",alignItems:"center",padding:10,boxSizing:"border-box"},onClick:()=>i(!1),children:e.jsxs("div",{style:{background:"#fff",borderRadius:12,width:"100%",maxWidth:480,maxHeight:"92vh",overflowY:"auto",overflowX:"hidden",padding:20,boxSizing:"border-box"},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"nowrap",gap:10,width:"100%",boxSizing:"border-box"},children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:800,color:"#0f172a",margin:0,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:"Add Supplier / Vendor"}),e.jsx("button",{type:"button",onClick:()=>i(!1),style:{background:"#f1f5f9",border:"none",borderRadius:6,width:32,height:32,minWidth:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"1rem",color:"#64748b",flexShrink:0},children:"✕"})]}),e.jsxs("form",{onSubmit:P,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Company / Supplier Name *"}),e.jsx("input",{type:"text",value:c,onChange:t=>x(t.target.value),placeholder:"e.g. UNIQUE DIAMAX PVT LTD",style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Contact Person"}),e.jsx("input",{type:"text",value:h,onChange:t=>v(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Email"}),e.jsx("input",{type:"email",value:f,onChange:t=>w(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Phone"}),e.jsx("input",{type:"text",value:u,onChange:t=>C(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Country"}),e.jsx("input",{type:"text",value:g,onChange:t=>z(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20},children:[e.jsx("button",{type:"button",onClick:()=>i(!1),style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6},children:"Cancel"}),e.jsx("button",{type:"submit",style:{padding:"8px 20px",background:"#0d1319",color:"#fff",border:"none",borderRadius:6},children:"Save Supplier"})]})]})]})})]})};export{O as BusinessSuppliersPage};
