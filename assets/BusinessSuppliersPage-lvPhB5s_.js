import{r,j as e,P as W}from"./react-vendor-DSaFutMS.js";import{g as m}from"./ui-vendor-DguFyjS7.js";import{b}from"./businessApi-DWjPpxND.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-CVbMhYb3.js";import"./admin-tools-vendor-CKN5doRT.js";const R=m.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,E=m.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;

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
`,V=()=>{const[d,j]=r.useState([]),[o,A]=r.useState(""),[y,l]=r.useState(!0),[S,n]=r.useState(!1),[a,c]=r.useState(""),[p,v]=r.useState(""),[x,C]=r.useState(""),[u,w]=r.useState(""),[h,P]=r.useState("India"),[k,I]=r.useState(""),f=async()=>{l(!0);try{const t=await b.getSuppliers({search:o});j(t||[])}catch(t){console.error(t)}finally{l(!1)}};r.useEffect(()=>{f()},[o]);const z=async t=>{var s,g;t.preventDefault();try{await b.createSupplier({name:a,contactPerson:p,email:x,phone:u,country:h,notes:k}),n(!1),c(""),f(),alert("✅ Supplier registered")}catch(i){alert(((g=(s=i==null?void 0:i.response)==null?void 0:s.data)==null?void 0:g.message)||"Creation failed")}};return e.jsxs("div",{children:[e.jsxs(R,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Diamond & Material Suppliers"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Procurement partners, diamond manufacturers, and precious metals suppliers"})]}),e.jsxs("button",{onClick:()=>n(!0),style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(W,{size:16})," Add Supplier"]})]}),e.jsxs(E,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Supplier Name"}),e.jsx("th",{children:"Contact Person"}),e.jsx("th",{children:"Email / Phone"}),e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Procured Sales Orders"}),e.jsx("th",{children:"Status"})]})}),e.jsxs("tbody",{children:[d.map(t=>{var s;return e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:700},children:t.name}),e.jsx("td",{children:t.contactPerson||"-"}),e.jsxs("td",{children:[e.jsx("div",{children:t.email||"-"}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:t.phone||"-"})]}),e.jsx("td",{children:t.country||"-"}),e.jsx("td",{style:{fontWeight:600},children:((s=t._count)==null?void 0:s.sales)||0}),e.jsx("td",{children:e.jsx("span",{style:{fontSize:"0.72rem",fontWeight:700,padding:"2px 6px",background:"#ebfbee",color:"#2b8a3e",borderRadius:4},children:t.status})})]},t.id)}),d.length===0&&!y&&e.jsx("tr",{children:e.jsx("td",{colSpan:6,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No suppliers found."})})]})]}),S&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15, 23, 42, 0.7)",backdropFilter:"blur(3px)",zIndex:1e4,display:"flex",justifyContent:"center",alignItems:"center",padding:16},onClick:()=>n(!1),children:e.jsxs("div",{style:{background:"#fff",borderRadius:12,width:"100%",maxWidth:480,padding:24},onClick:t=>t.stopPropagation(),children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:700,margin:"0 0 16px 0"},children:"Add Supplier / Vendor"}),e.jsxs("form",{onSubmit:z,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Company / Supplier Name *"}),e.jsx("input",{type:"text",value:a,onChange:t=>c(t.target.value),placeholder:"e.g. UNIQUE DIAMAX PVT LTD",style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Contact Person"}),e.jsx("input",{type:"text",value:p,onChange:t=>v(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Email"}),e.jsx("input",{type:"email",value:x,onChange:t=>C(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Phone"}),e.jsx("input",{type:"text",value:u,onChange:t=>w(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Country"}),e.jsx("input",{type:"text",value:h,onChange:t=>P(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20},children:[e.jsx("button",{type:"button",onClick:()=>n(!1),style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6},children:"Cancel"}),e.jsx("button",{type:"submit",style:{padding:"8px 20px",background:"#0d1319",color:"#fff",border:"none",borderRadius:6},children:"Save Supplier"})]})]})]})})]})};export{V as BusinessSuppliersPage};
