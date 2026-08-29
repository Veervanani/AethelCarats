import{r as s,j as e,P as I,k as A}from"./react-vendor-BXyx942q.js";import{g as c}from"./ui-vendor-VHkRGmvp.js";import{b as a}from"./businessApi-DCLK4cxV.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-CpQOasEv.js";import"./admin-tools-vendor-CKN5doRT.js";const T=c.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,L=c.div`
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
`,M=c.table`
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
`,G=()=>{const[l,S]=s.useState([]),[C,w]=s.useState([]),[o,k]=s.useState(""),[z,p]=s.useState(!0),[R,r]=s.useState(!1),[x,h]=s.useState(""),[f,g]=s.useState(""),[u,m]=s.useState(""),[b,W]=s.useState(""),[y,P]=s.useState(""),[j,E]=s.useState(""),[N,B]=s.useState(""),v=async()=>{p(!0);try{const[t,n]=await Promise.all([a.getCustomers({search:o}),a.getEmployees({status:"ACTIVE"})]);S(t.customers||[]),w(n.employees||[])}catch(t){console.error(t)}finally{p(!1)}};s.useEffect(()=>{v()},[o]);const D=async t=>{var n,i;t.preventDefault();try{await a.createCustomer({name:x,email:f,phone:u,country:b,company:y,assignedEmployeeId:j||void 0,notes:N}),r(!1),h(""),g(""),m(""),v(),alert("✅ Customer registered")}catch(d){alert(((i=(n=d==null?void 0:d.response)==null?void 0:n.data)==null?void 0:i.message)||"Creation failed")}};return e.jsxs("div",{children:[e.jsxs(T,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Client CRM & Accounts"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Private customer directory, transaction volumes, and sales representative assignments"})]}),e.jsxs("button",{onClick:()=>r(!0),style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(I,{size:16})," Add Client"]})]}),e.jsxs(L,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,background:"#f8fafc",padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",width:300},children:[e.jsx(A,{size:14,color:"#64748b"}),e.jsx("input",{type:"text",placeholder:"Search by client name, country, company...",value:o,onChange:t=>k(t.target.value),style:{border:"none",background:"transparent",outline:"none",fontSize:"0.82rem",width:"100%"}})]}),e.jsxs("div",{style:{fontSize:"0.8rem",color:"#64748b"},children:["Showing ",l.length," clients"]})]}),e.jsxs(M,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Client Name"}),e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Contact Details"}),e.jsx("th",{children:"Assigned Staff"}),e.jsx("th",{children:"Total Invoiced Deals"}),e.jsx("th",{children:"Lifetime Volume"}),e.jsx("th",{children:"Net Profit"}),e.jsx("th",{children:"Last Sale Date"})]})}),e.jsxs("tbody",{children:[l.map(t=>{var n,i;return e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:t.name}),e.jsx("td",{children:t.country||"-"}),e.jsxs("td",{children:[e.jsx("div",{children:t.email}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:t.phone||t.company||"-"})]}),e.jsx("td",{children:((n=t.assignedEmployee)==null?void 0:n.fullName)||"Unassigned"}),e.jsx("td",{style:{fontWeight:600},children:((i=t._count)==null?void 0:i.internalSales)||0}),e.jsxs("td",{style:{fontWeight:700},children:["$",(t.totalSales||0).toLocaleString()]}),e.jsxs("td",{style:{color:"#16a34a",fontWeight:600},children:["$",(t.totalNetProfit||0).toLocaleString()]}),e.jsx("td",{children:t.lastSaleDate?new Date(t.lastSaleDate).toLocaleDateString():"-"})]},t.id)}),l.length===0&&!z&&e.jsx("tr",{children:e.jsx("td",{colSpan:8,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No clients found matching search."})})]})]}),R&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15, 23, 42, 0.7)",backdropFilter:"blur(3px)",zIndex:1e4,display:"flex",justifyContent:"center",alignItems:"center",padding:16},onClick:()=>r(!1),children:e.jsxs("div",{style:{background:"#fff",borderRadius:12,width:"100%",maxWidth:500,padding:24},onClick:t=>t.stopPropagation(),children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:700,margin:"0 0 16px 0"},children:"Register Client Profile"}),e.jsxs("form",{onSubmit:D,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Client Name *"}),e.jsx("input",{type:"text",value:x,onChange:t=>h(t.target.value),placeholder:"e.g. TG NZ or Mandy J.",style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},required:!0})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Email"}),e.jsx("input",{type:"email",value:f,onChange:t=>g(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Phone"}),e.jsx("input",{type:"text",value:u,onChange:t=>m(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Country"}),e.jsx("input",{type:"text",value:b,onChange:t=>W(t.target.value),placeholder:"e.g. New Zealand",style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Company"}),e.jsx("input",{type:"text",value:y,onChange:t=>P(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Assigned Sales Person"}),e.jsxs("select",{value:j,onChange:t=>E(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},children:[e.jsx("option",{value:"",children:"Unassigned"}),C.map(t=>e.jsxs("option",{value:t.id,children:[t.fullName||t.name," (",t.employeeCode,")"]},t.id))]})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20},children:[e.jsx("button",{type:"button",onClick:()=>r(!1),style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6},children:"Cancel"}),e.jsx("button",{type:"submit",style:{padding:"8px 20px",background:"#0d1319",color:"#fff",border:"none",borderRadius:6},children:"Save Client"})]})]})]})})]})};export{G as BusinessCustomersPage};
