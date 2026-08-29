import{r as a,j as e,b3 as B,k as O,f as W,a as _,aL as U,i as q,af as G}from"./react-vendor-BXyx942q.js";import{g as c}from"./ui-vendor-VHkRGmvp.js";import{P as F}from"./admin-pages-6IVwTqxF.js";import{b as m}from"./businessApi-CkAB3SVO.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const H=c.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(3px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`,Y=c.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,Q=c.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`,o=c.div`
  grid-column: ${({$fullWidth:s})=>s?"1 / -1":"auto"};
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #334155;
  }

  input, select, textarea {
    padding: 8px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.84rem;
    outline: none;

    &:focus {
      border-color: #e2b96f;
      box-shadow: 0 0 0 2px rgba(226, 185, 111, 0.2);
    }
  }
`,X=({employee:s,onClose:S,onSuccess:d})=>{const l=!!s,[f,C]=a.useState((s==null?void 0:s.fullName)||""),[x,T]=a.useState((s==null?void 0:s.email)||""),[u,I]=a.useState((s==null?void 0:s.phone)||""),[h,L]=a.useState((s==null?void 0:s.department)||"Sales"),[v,j]=a.useState((s==null?void 0:s.designation)||"Sales Executive"),[y,w]=a.useState((s==null?void 0:s.role)||"SALES_EMPLOYEE"),[p,z]=a.useState((s==null?void 0:s.status)||"ACTIVE"),[A,N]=a.useState((s==null?void 0:s.monthlySalesTarget)||0),[E,P]=a.useState((s==null?void 0:s.notes)||""),[t,i]=a.useState(!1),[r,g]=a.useState(""),[b,M]=a.useState(!1),R=async n=>{var V,$;if(n.preventDefault(),!f||!x){alert("Please fill out full name and email.");return}M(!0);try{l&&s?await m.updateEmployee(s.id,{fullName:f,email:x,phone:u,department:h,designation:v,role:y,status:p,monthlySalesTarget:Number(A),notes:E}):await m.createEmployee({fullName:f,email:x,phone:u,department:h,designation:v,role:y,monthlySalesTarget:Number(A),notes:E,createLogin:t,password:t?r:void 0}),d()}catch(D){alert((($=(V=D==null?void 0:D.response)==null?void 0:V.data)==null?void 0:$.message)||"Operation failed")}finally{M(!1)}};return e.jsx(H,{onClick:S,children:e.jsxs(Y,{onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:700,margin:0},children:l?"Edit Employee Details":"Register New Employee"}),e.jsx("button",{onClick:S,style:{background:"none",border:"none",cursor:"pointer",fontSize:"1.1rem"},children:"✕"})]}),e.jsxs("form",{onSubmit:R,children:[e.jsxs(Q,{children:[e.jsxs(o,{$fullWidth:!0,children:[e.jsx("label",{children:"Full Name *"}),e.jsx("input",{type:"text",value:f,onChange:n=>C(n.target.value),required:!0})]}),e.jsxs(o,{children:[e.jsx("label",{children:"Email Address *"}),e.jsx("input",{type:"email",value:x,onChange:n=>T(n.target.value),required:!0})]}),e.jsxs(o,{children:[e.jsx("label",{children:"Phone Number"}),e.jsx("input",{type:"text",value:u,onChange:n=>I(n.target.value),placeholder:"+1 555-0199"})]}),e.jsxs(o,{children:[e.jsx("label",{children:"Department"}),e.jsxs("select",{value:h,onChange:n=>L(n.target.value),children:[e.jsx("option",{value:"Sales",children:"Sales"}),e.jsx("option",{value:"Atelier & Production",children:"Atelier & Production"}),e.jsx("option",{value:"Accounting & Finance",children:"Accounting & Finance"}),e.jsx("option",{value:"Management",children:"Management"}),e.jsx("option",{value:"Logistics",children:"Logistics"})]})]}),e.jsxs(o,{children:[e.jsx("label",{children:"Designation"}),e.jsx("input",{type:"text",value:v,onChange:n=>j(n.target.value)})]}),e.jsxs(o,{children:[e.jsx("label",{children:"System Role & Permissions"}),e.jsxs("select",{value:y,onChange:n=>w(n.target.value),children:[e.jsx("option",{value:"SALES_EMPLOYEE",children:"Sales Employee (Own Sales & Attendance)"}),e.jsx("option",{value:"SALES_MANAGER",children:"Sales Manager (Team Sales & Approvals)"}),e.jsx("option",{value:"ACCOUNTANT",children:"Accountant (Ledgers & Commission Payouts)"}),e.jsx("option",{value:"ADMIN",children:"Admin (Full Access)"})]})]}),e.jsxs(o,{children:[e.jsx("label",{children:"Monthly Sales Quota Target ($)"}),e.jsx("input",{type:"number",value:A,onChange:n=>N(Number(n.target.value))})]}),l&&e.jsxs(o,{children:[e.jsx("label",{children:"Employment Status"}),e.jsxs("select",{value:p,onChange:n=>z(n.target.value),children:[e.jsx("option",{value:"ACTIVE",children:"ACTIVE"}),e.jsx("option",{value:"INACTIVE",children:"INACTIVE"})]})]}),!l&&e.jsx(o,{$fullWidth:!0,children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginTop:6},children:[e.jsx("input",{type:"checkbox",id:"createLoginCheck",checked:t,onChange:n=>i(n.target.checked)}),e.jsx("label",{htmlFor:"createLoginCheck",style:{cursor:"pointer"},children:"Create System User Login for this employee"})]})}),!l&&t&&e.jsxs(o,{$fullWidth:!0,children:[e.jsx("label",{children:"Temporary Password *"}),e.jsx("input",{type:"password",value:r,onChange:n=>g(n.target.value),required:t,placeholder:"Enter initial login password"})]}),e.jsxs(o,{$fullWidth:!0,children:[e.jsx("label",{children:"Internal Notes & Comments"}),e.jsx("textarea",{rows:2,value:E,onChange:n=>P(n.target.value)})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20},children:[e.jsx("button",{type:"button",onClick:S,style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#ffffff",borderRadius:6,fontWeight:600,cursor:"pointer"},children:"Cancel"}),e.jsx("button",{type:"submit",disabled:b,style:{padding:"8px 20px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,cursor:"pointer"},children:b?"Saving...":l?"Update Employee":"Create Employee"})]})]})]})})},J=c.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,K=c.div`
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
`,Z=c.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  padding: 6px 12px;
  border-radius: 6px;
  width: 280px;

  input {
    border: none;
    background: transparent;
    font-size: 0.82rem;
    outline: none;
    width: 100%;
  }
`,ee=c.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;
  background: #ffffff;
  border-radius: 10px;
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
`,te=c.span`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: ${({$status:s})=>s==="ACTIVE"?"#ebfbee":"#f1f5f9"};
  color: ${({$status:s})=>s==="ACTIVE"?"#2b8a3e":"#64748b"};
  border: 1px solid ${({$status:s})=>s==="ACTIVE"?"#b2f2bb":"#cbd5e1"};
`,k=c.button`
  background: none;
  border: 1px solid #e2e8f0;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: #334155;
  transition: all 0.15s ease;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }
`,oe=()=>{const[s,S]=a.useState([]),[d,l]=a.useState(new Set),[f,C]=a.useState(!0),[x,T]=a.useState(""),[u,I]=a.useState("ALL"),[h,L]=a.useState("ALL"),[v,j]=a.useState(!1),[y,w]=a.useState(null),p=async()=>{C(!0);try{const t=await m.getEmployees({search:x||void 0,department:u!=="ALL"?u:void 0,status:h!=="ALL"?h:void 0});S(t.employees||[]),l(new Set)}catch(t){console.error(t)}finally{C(!1)}};a.useEffect(()=>{p()},[x,u,h]);const z=t=>{t.target.checked?l(new Set(s.map(i=>i.id))):l(new Set)},A=t=>{const i=new Set(d);i.has(t)?i.delete(t):i.add(t),l(i)},N=async(t,i)=>{var r,g;if(window.confirm(`Are you sure you want to delete employee "${i}"?`))try{await m.deleteEmployee(t),p()}catch(b){alert(((g=(r=b==null?void 0:b.response)==null?void 0:r.data)==null?void 0:g.message)||"Delete failed")}},E=async()=>{var t,i;if(d.size!==0&&window.confirm(`Are you sure you want to delete ${d.size} selected employees?`))try{await m.deleteEmployeesBatch(Array.from(d)),p()}catch(r){alert(((i=(t=r==null?void 0:r.response)==null?void 0:t.data)==null?void 0:i.message)||"Batch delete failed")}},P=async t=>{var i,r;try{await m.toggleEmployeeStatus(t),p()}catch(g){alert(((r=(i=g==null?void 0:g.response)==null?void 0:i.data)==null?void 0:r.message)||"Failed to update status")}};return e.jsxs("div",{children:[e.jsxs(J,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Staff & Employee Directory"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Manage atelier personnel, designations, quotas, and access permissions"})]}),e.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[d.size>0&&e.jsxs("button",{onClick:E,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#e11d48",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.8rem",cursor:"pointer"},children:["🗑️ Delete Selected (",d.size,")"]}),e.jsxs("button",{onClick:()=>{w(null),j(!0)},style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(B,{size:16})," Add Employee"]})]})]}),e.jsxs(K,{children:[e.jsxs(Z,{children:[e.jsx(O,{size:14,color:"#64748b"}),e.jsx("input",{type:"text",placeholder:"Search by name, email, code...",value:x,onChange:t=>T(t.target.value)})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("select",{value:u,onChange:t=>I(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Departments"}),e.jsx("option",{value:"Sales",children:"Sales"}),e.jsx("option",{value:"Atelier & Production",children:"Atelier & Production"}),e.jsx("option",{value:"Accounting & Finance",children:"Accounting & Finance"}),e.jsx("option",{value:"Management",children:"Management"})]}),e.jsxs("select",{value:h,onChange:t=>L(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Status"}),e.jsx("option",{value:"ACTIVE",children:"ACTIVE"}),e.jsx("option",{value:"INACTIVE",children:"INACTIVE"})]})]})]}),e.jsxs(ee,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:36,textAlign:"center"},children:e.jsx("input",{type:"checkbox",checked:s.length>0&&d.size===s.length,onChange:z})}),e.jsx("th",{children:"Code"}),e.jsx("th",{children:"Full Name"}),e.jsx("th",{children:"Email / Phone"}),e.jsx("th",{children:"Department"}),e.jsx("th",{children:"Designation"}),e.jsx("th",{children:"Target"}),e.jsx("th",{children:"Sales"}),e.jsx("th",{children:"Status"}),e.jsx("th",{style:{textAlign:"right"},children:"Actions"})]})}),e.jsxs("tbody",{children:[s.map(t=>{var i;return e.jsxs("tr",{children:[e.jsx("td",{style:{textAlign:"center"},children:e.jsx("input",{type:"checkbox",checked:d.has(t.id),onChange:()=>A(t.id)})}),e.jsx("td",{style:{fontWeight:700,color:"#64748b"},children:t.employeeCode}),e.jsx("td",{style:{fontWeight:600},children:e.jsx(W,{to:`${F}/employees/${t.id}`,style:{color:"#0f172a",textDecoration:"none"},children:t.fullName||t.name||"Staff Member"})}),e.jsxs("td",{children:[e.jsx("div",{children:t.email}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:t.phone||"-"})]}),e.jsx("td",{children:t.department||"Sales"}),e.jsx("td",{children:t.designation||"Sales Executive"}),e.jsxs("td",{style:{fontWeight:600},children:["$",(Number(t.monthlySalesTarget)||Number(t.monthlyTarget)||Number(t.targetAmount)||0).toLocaleString()]}),e.jsx("td",{children:((i=t._count)==null?void 0:i.sales)||0}),e.jsx("td",{children:e.jsxs(te,{$status:t.status,children:[t.status==="ACTIVE"?e.jsx(_,{size:12}):e.jsx(U,{size:12}),t.status]})}),e.jsx("td",{style:{textAlign:"right"},children:e.jsxs("div",{style:{display:"inline-flex",gap:6},children:[e.jsx(W,{to:`${F}/employees/${t.id}`,children:e.jsx(k,{title:"View Profile",children:e.jsx(q,{size:13})})}),e.jsx(k,{title:"Edit Details",onClick:()=>{w(t),j(!0)},children:e.jsx(G,{size:13})}),e.jsx(k,{title:t.status==="ACTIVE"?"Deactivate":"Activate",onClick:()=>P(t.id),children:t.status==="ACTIVE"?"Deactivate":"Activate"}),e.jsx(k,{title:"Delete Staff",onClick:()=>N(t.id,t.fullName||t.name||t.employeeCode),style:{color:"#e11d48",borderColor:"#fecdd3",background:"#fff1f2"},children:"🗑️"})]})})]},t.id)}),s.length===0&&!f&&e.jsx("tr",{children:e.jsx("td",{colSpan:10,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No employees found matching criteria."})})]})]}),v&&e.jsx(X,{employee:y,onClose:()=>j(!1),onSuccess:()=>{j(!1),p()}})]})};export{oe as BusinessEmployeesPage};
