import{r,j as e,P as G,k as Z,c as A}from"./react-vendor-DxLkccZ0.js";import{g as x}from"./ui-vendor-BuBsKREC.js";import{b as d}from"./businessApi-DGsCEnDz.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-6iAS44Fe.js";import"./admin-tools-vendor-CKN5doRT.js";const W=x.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  border-radius: 4px;
  border: 1.5px solid ${({$checked:l})=>l?"#0d1319":"#cbd5e1"};
  background: ${({$checked:l})=>l?"#0d1319":"#ffffff"};
  color: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  vertical-align: middle;

  &:hover {
    border-color: #0d1319;
    box-shadow: 0 0 0 2px rgba(13, 19, 25, 0.12);
  }

  input {
    display: none;
  }
`,q=x.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,H=x.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 12px 18px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
`,J=x.table`
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
`,te=()=>{const[l,u]=r.useState([]),[D,g]=r.useState([]),[i,p]=r.useState(new Set),[f,N]=r.useState(""),[I,m]=r.useState(!0),[R,h]=r.useState(!1),[y,b]=r.useState(""),[j,S]=r.useState(""),[C,v]=r.useState(""),[w,E]=r.useState(""),[k,P]=r.useState(""),[z,T]=r.useState(""),[$,U]=r.useState(""),a=async()=>{m(!0);try{const[t,s]=await Promise.all([d.getCustomers({search:f}),d.getEmployees({status:"ACTIVE"})]),n=Array.isArray(t)?t:(t==null?void 0:t.customers)||[],o=Array.isArray(s)?s:(s==null?void 0:s.employees)||[];u(n),g(o),p(new Set)}catch(t){console.error(t),u([]),g([])}finally{m(!1)}};r.useEffect(()=>{a()},[f]);const L=t=>{i.size===l.length&&l.length>0?p(new Set):p(new Set(l.map(s=>s.id)))},B=t=>{const s=new Set(i);s.has(t)?s.delete(t):s.add(t),p(s)},M=async(t,s)=>{var n,o;if(window.confirm(`Are you sure you want to delete customer "${s}"?`))try{await d.deleteCustomer(t),a()}catch(c){alert(((o=(n=c==null?void 0:c.response)==null?void 0:n.data)==null?void 0:o.message)||"Delete failed")}},O=async()=>{var t,s;if(i.size!==0&&window.confirm(`Are you sure you want to delete ${i.size} selected clients?`))try{await d.deleteCustomersBatch(Array.from(i)),a()}catch(n){alert(((s=(t=n==null?void 0:n.response)==null?void 0:t.data)==null?void 0:s.message)||"Batch delete failed")}},V=async()=>{var t,s;if(window.confirm("⚠️ WARNING: Are you sure you want to permanently delete ALL client records? This action cannot be undone."))try{await d.deleteAllCustomers(),a(),alert("✅ All clients have been deleted successfully.")}catch(n){alert(((s=(t=n==null?void 0:n.response)==null?void 0:t.data)==null?void 0:s.message)||"Failed to delete all clients")}},F=async t=>{var s,n;t.preventDefault();try{await d.createCustomer({name:y,email:j,phone:C,country:w,company:k,assignedEmployeeId:z||void 0,notes:$}),h(!1),b(""),S(""),v(""),a(),alert("✅ Customer registered")}catch(o){alert(((n=(s=o==null?void 0:o.response)==null?void 0:s.data)==null?void 0:n.message)||"Creation failed")}};return e.jsxs("div",{children:[e.jsxs(q,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Client CRM & Accounts"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Private customer directory, transaction volumes, and sales representative assignments"})]}),e.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[e.jsx("button",{onClick:V,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#fff1f2",color:"#e11d48",border:"1px solid #fecdd3",borderRadius:6,fontWeight:600,fontSize:"0.8rem",cursor:"pointer"},children:"🗑️ Delete All Clients"}),i.size>0&&e.jsxs("button",{onClick:O,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#e11d48",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.8rem",cursor:"pointer"},children:["🗑️ Delete Selected (",i.size,")"]}),e.jsxs("button",{onClick:()=>h(!0),style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(G,{size:16})," Add Client"]})]})]}),e.jsxs(H,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,background:"#f8fafc",padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",width:300},children:[e.jsx(Z,{size:14,color:"#64748b"}),e.jsx("input",{type:"text",placeholder:"Search by client name, country, company...",value:f,onChange:t=>N(t.target.value),style:{border:"none",background:"transparent",outline:"none",fontSize:"0.82rem",width:"100%"}})]}),e.jsxs("div",{style:{fontSize:"0.8rem",color:"#64748b"},children:["Showing ",l.length," clients"]})]}),e.jsxs(J,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:36,textAlign:"center"},children:e.jsxs(W,{$checked:l.length>0&&i.size===l.length,onClick:t=>{t.preventDefault(),L()},title:"Select All Clients",children:[e.jsx("input",{type:"checkbox",checked:l.length>0&&i.size===l.length,readOnly:!0}),l.length>0&&i.size===l.length&&e.jsx(A,{size:11,strokeWidth:3})]})}),e.jsx("th",{children:"Client Name"}),e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Contact Details"}),e.jsx("th",{children:"Assigned Staff"}),e.jsx("th",{children:"Total Invoiced Deals"}),e.jsx("th",{children:"Lifetime Volume"}),e.jsx("th",{children:"Net Profit"}),e.jsx("th",{children:"Last Sale Date"}),e.jsx("th",{style:{textAlign:"center"},children:"Actions"})]})}),e.jsxs("tbody",{children:[l.map(t=>{var s,n,o;return e.jsxs("tr",{children:[e.jsx("td",{style:{textAlign:"center"},children:e.jsxs(W,{$checked:i.has(t.id),onClick:c=>{c.preventDefault(),B(t.id)},title:`Select client ${t.name}`,children:[e.jsx("input",{type:"checkbox",checked:i.has(t.id),readOnly:!0}),i.has(t.id)&&e.jsx(A,{size:11,strokeWidth:3})]})}),e.jsx("td",{style:{fontWeight:600},children:t.name||t.clientName||t.customerName||"Client"}),e.jsx("td",{children:t.country||t.customerCountry||"-"}),e.jsxs("td",{children:[e.jsx("div",{children:t.email&&t.email!=="-"?t.email:t.phone||"-"}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:t.company||t.companyName||""})]}),e.jsx("td",{children:((s=t.assignedEmployee)==null?void 0:s.fullName)||((n=t.assignedEmployee)==null?void 0:n.name)||t.assignedStaff||"Sales Team"}),e.jsx("td",{style:{fontWeight:600},children:((o=t._count)==null?void 0:o.internalSales)??t.totalInvoicedDeals??t.totalOrders??0}),e.jsxs("td",{style:{fontWeight:700},children:["$",Number(t.lifetimeVolume??t.totalSales??0).toLocaleString()]}),e.jsxs("td",{style:{color:"#16a34a",fontWeight:600},children:["$",Number(t.netProfit??t.totalNetProfit??0).toLocaleString()]}),e.jsx("td",{children:t.lastSaleDate?new Date(t.lastSaleDate).toLocaleDateString():"-"}),e.jsx("td",{style:{textAlign:"center"},children:e.jsx("button",{onClick:()=>M(t.id,t.name),style:{background:"none",border:"none",cursor:"pointer",color:"#e11d48"},title:"Delete Client",children:"🗑️"})})]},t.id)}),l.length===0&&!I&&e.jsx("tr",{children:e.jsx("td",{colSpan:10,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No clients found."})})]})]}),R&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15, 23, 42, 0.7)",backdropFilter:"blur(3px)",zIndex:1e4,display:"flex",justifyContent:"center",alignItems:"center",padding:16},onClick:()=>h(!1),children:e.jsxs("div",{style:{background:"#fff",borderRadius:12,width:"100%",maxWidth:500,padding:24},onClick:t=>t.stopPropagation(),children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:700,margin:"0 0 16px 0"},children:"Register Client Profile"}),e.jsxs("form",{onSubmit:F,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Client Name *"}),e.jsx("input",{type:"text",value:y,onChange:t=>b(t.target.value),placeholder:"e.g. TG NZ or Mandy J.",style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},required:!0})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Email"}),e.jsx("input",{type:"email",value:j,onChange:t=>S(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Phone"}),e.jsx("input",{type:"text",value:C,onChange:t=>v(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Country"}),e.jsx("input",{type:"text",value:w,onChange:t=>E(t.target.value),placeholder:"e.g. New Zealand",style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Company"}),e.jsx("input",{type:"text",value:k,onChange:t=>P(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Assigned Sales Person"}),e.jsxs("select",{value:z,onChange:t=>T(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},children:[e.jsx("option",{value:"",children:"Unassigned"}),D.map(t=>e.jsxs("option",{value:t.id,children:[t.fullName||t.name," (",t.employeeCode,")"]},t.id))]})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20},children:[e.jsx("button",{type:"button",onClick:()=>h(!1),style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6},children:"Cancel"}),e.jsx("button",{type:"submit",style:{padding:"8px 20px",background:"#0d1319",color:"#fff",border:"none",borderRadius:6},children:"Save Client"})]})]})]})})]})};export{te as BusinessCustomersPage};
