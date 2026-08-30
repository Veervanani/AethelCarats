import{r as i,j as e,b3 as B,k as O,c as M,f as W,a as _,aL as U,i as q,af as G}from"./react-vendor-BRIbQ1pk.js";import{g as o}from"./ui-vendor-B_xwrEci.js";import{P as F}from"./admin-pages-CcwK00Co.js";import{b as m}from"./businessApi-M3o-idrU.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const H=o.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(3px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`,Y=o.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,X=o.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`,c=o.div`
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
`,J=({employee:s,onClose:v,onSuccess:l})=>{const d=!!s,[b,E]=i.useState((s==null?void 0:s.fullName)||""),[u,z]=i.useState((s==null?void 0:s.email)||""),[h,I]=i.useState((s==null?void 0:s.phone)||""),[p,L]=i.useState((s==null?void 0:s.department)||"Sales"),[S,j]=i.useState((s==null?void 0:s.designation)||"Sales Executive"),[y,w]=i.useState((s==null?void 0:s.role)||"SALES_EMPLOYEE"),[f,T]=i.useState((s==null?void 0:s.status)||"ACTIVE"),[A,D]=i.useState((s==null?void 0:s.notes)||""),[g,P]=i.useState(!1),[t,a]=i.useState(""),[r,x]=i.useState(!1),C=async n=>{var $,V;if(n.preventDefault(),!b||!u){alert("Please fill out full name and email.");return}x(!0);try{d&&s?await m.updateEmployee(s.id,{fullName:b,email:u,phone:h,department:p,designation:S,role:y,status:f,notes:A}):await m.createEmployee({fullName:b,email:u,phone:h,department:p,designation:S,role:y,notes:A,createLogin:g,password:g?t:void 0}),l()}catch(N){alert(((V=($=N==null?void 0:N.response)==null?void 0:$.data)==null?void 0:V.message)||"Operation failed")}finally{x(!1)}};return e.jsx(H,{onClick:v,children:e.jsxs(Y,{onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:700,margin:0},children:d?"Edit Employee Details":"Register New Employee"}),e.jsx("button",{onClick:v,style:{background:"none",border:"none",cursor:"pointer",fontSize:"1.1rem"},children:"✕"})]}),e.jsxs("form",{onSubmit:C,children:[e.jsxs(X,{children:[e.jsxs(c,{$fullWidth:!0,children:[e.jsx("label",{children:"Full Name *"}),e.jsx("input",{type:"text",value:b,onChange:n=>E(n.target.value),required:!0})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Email Address *"}),e.jsx("input",{type:"email",value:u,onChange:n=>z(n.target.value),required:!0})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Phone Number"}),e.jsx("input",{type:"text",value:h,onChange:n=>I(n.target.value),placeholder:"+1 555-0199"})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Department"}),e.jsxs("select",{value:p,onChange:n=>L(n.target.value),children:[e.jsx("option",{value:"Sales",children:"Sales"}),e.jsx("option",{value:"Atelier & Production",children:"Atelier & Production"}),e.jsx("option",{value:"Accounting & Finance",children:"Accounting & Finance"}),e.jsx("option",{value:"Management",children:"Management"}),e.jsx("option",{value:"Logistics",children:"Logistics"})]})]}),e.jsxs(c,{children:[e.jsx("label",{children:"Designation"}),e.jsx("input",{type:"text",value:S,onChange:n=>j(n.target.value)})]}),e.jsxs(c,{children:[e.jsx("label",{children:"System Role & Permissions"}),e.jsxs("select",{value:y,onChange:n=>w(n.target.value),children:[e.jsx("option",{value:"SALES_EMPLOYEE",children:"Sales Employee (Own Sales & Attendance)"}),e.jsx("option",{value:"SALES_MANAGER",children:"Sales Manager (Team Sales & Approvals)"}),e.jsx("option",{value:"ACCOUNTANT",children:"Accountant (Ledgers & Commission Payouts)"}),e.jsx("option",{value:"ADMIN",children:"Admin (Full Access)"})]})]}),d&&e.jsxs(c,{children:[e.jsx("label",{children:"Employment Status"}),e.jsxs("select",{value:f,onChange:n=>T(n.target.value),children:[e.jsx("option",{value:"ACTIVE",children:"ACTIVE"}),e.jsx("option",{value:"INACTIVE",children:"INACTIVE"})]})]}),!d&&e.jsx(c,{$fullWidth:!0,children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginTop:6},children:[e.jsx("input",{type:"checkbox",id:"createLoginCheck",checked:g,onChange:n=>P(n.target.checked)}),e.jsx("label",{htmlFor:"createLoginCheck",style:{cursor:"pointer"},children:"Create System User Login for this employee"})]})}),!d&&g&&e.jsxs(c,{$fullWidth:!0,children:[e.jsx("label",{children:"Temporary Password *"}),e.jsx("input",{type:"password",value:t,onChange:n=>a(n.target.value),required:g,placeholder:"Enter initial login password"})]}),e.jsxs(c,{$fullWidth:!0,children:[e.jsx("label",{children:"Internal Notes & Comments"}),e.jsx("textarea",{rows:2,value:A,onChange:n=>D(n.target.value)})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20},children:[e.jsx("button",{type:"button",onClick:v,style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#ffffff",borderRadius:6,fontWeight:600,cursor:"pointer"},children:"Cancel"}),e.jsx("button",{type:"submit",disabled:r,style:{padding:"8px 20px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,cursor:"pointer"},children:r?"Saving...":d?"Update Employee":"Create Employee"})]})]})]})})},R=o.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  border-radius: 4px;
  border: 1.5px solid ${({$checked:s})=>s?"#0d1319":"#cbd5e1"};
  background: ${({$checked:s})=>s?"#0d1319":"#ffffff"};
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
`,K=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,Q=o.div`
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
`,Z=o.div`
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
`,ee=o.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  margin-bottom: 20px;
  scrollbar-width: thin;
`,te=o.table`
  width: 100%;
  min-width: 820px;
  border-collapse: collapse;
  font-size: 0.84rem;
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
`,se=o.span`
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
`,k=o.button`
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
`,de=()=>{const[s,v]=i.useState([]),[l,d]=i.useState(new Set),[b,E]=i.useState(!0),[u,z]=i.useState(""),[h,I]=i.useState("ALL"),[p,L]=i.useState("ALL"),[S,j]=i.useState(!1),[y,w]=i.useState(null),f=async()=>{E(!0);try{const t=await m.getEmployees({search:u||void 0,department:h!=="ALL"?h:void 0,status:p!=="ALL"?p:void 0});v(t.employees||[]),d(new Set)}catch(t){console.error(t)}finally{E(!1)}};i.useEffect(()=>{f()},[u,h,p]);const T=t=>{l.size===s.length&&s.length>0?d(new Set):d(new Set(s.map(a=>a.id)))},A=t=>{const a=new Set(l);a.has(t)?a.delete(t):a.add(t),d(a)},D=async(t,a)=>{var r,x;if(window.confirm(`Are you sure you want to delete employee "${a}"?`))try{await m.deleteEmployee(t),f()}catch(C){alert(((x=(r=C==null?void 0:C.response)==null?void 0:r.data)==null?void 0:x.message)||"Delete failed")}},g=async()=>{var t,a;if(l.size!==0&&window.confirm(`Are you sure you want to delete ${l.size} selected employees?`))try{await m.deleteEmployeesBatch(Array.from(l)),f()}catch(r){alert(((a=(t=r==null?void 0:r.response)==null?void 0:t.data)==null?void 0:a.message)||"Batch delete failed")}},P=async t=>{var a,r;try{await m.toggleEmployeeStatus(t),f()}catch(x){alert(((r=(a=x==null?void 0:x.response)==null?void 0:a.data)==null?void 0:r.message)||"Failed to update status")}};return e.jsxs("div",{children:[e.jsxs(K,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Staff & Employee Directory"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Manage atelier personnel, designations, quotas, and access permissions"})]}),e.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[l.size>0&&e.jsxs("button",{onClick:g,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#e11d48",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.8rem",cursor:"pointer"},children:["🗑️ Delete Selected (",l.size,")"]}),e.jsxs("button",{onClick:()=>{w(null),j(!0)},style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(B,{size:16})," Add Employee"]})]})]}),e.jsxs(Q,{children:[e.jsxs(Z,{children:[e.jsx(O,{size:14,color:"#64748b"}),e.jsx("input",{type:"text",placeholder:"Search by name, email, code...",value:u,onChange:t=>z(t.target.value)})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("select",{value:h,onChange:t=>I(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Departments"}),e.jsx("option",{value:"Sales",children:"Sales"}),e.jsx("option",{value:"Atelier & Production",children:"Atelier & Production"}),e.jsx("option",{value:"Accounting & Finance",children:"Accounting & Finance"}),e.jsx("option",{value:"Management",children:"Management"})]}),e.jsxs("select",{value:p,onChange:t=>L(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Status"}),e.jsx("option",{value:"ACTIVE",children:"ACTIVE"}),e.jsx("option",{value:"INACTIVE",children:"INACTIVE"})]})]})]}),e.jsx(ee,{children:e.jsxs(te,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:36,textAlign:"center"},children:e.jsxs(R,{$checked:s.length>0&&l.size===s.length,onClick:t=>{t.preventDefault(),T()},title:"Select All Employees",children:[e.jsx("input",{type:"checkbox",checked:s.length>0&&l.size===s.length,readOnly:!0}),s.length>0&&l.size===s.length&&e.jsx(M,{size:11,strokeWidth:3})]})}),e.jsx("th",{children:"Code"}),e.jsx("th",{children:"Full Name"}),e.jsx("th",{children:"Email / Phone"}),e.jsx("th",{children:"Department"}),e.jsx("th",{children:"Designation"}),e.jsx("th",{children:"Sales Deals"}),e.jsx("th",{children:"Status"}),e.jsx("th",{style:{textAlign:"right"},children:"Actions"})]})}),e.jsxs("tbody",{children:[s.map(t=>{var a;return e.jsxs("tr",{children:[e.jsx("td",{style:{textAlign:"center"},children:e.jsxs(R,{$checked:l.has(t.id),onClick:r=>{r.preventDefault(),A(t.id)},title:`Select ${t.fullName||t.name}`,children:[e.jsx("input",{type:"checkbox",checked:l.has(t.id),readOnly:!0}),l.has(t.id)&&e.jsx(M,{size:11,strokeWidth:3})]})}),e.jsx("td",{style:{fontWeight:700,color:"#64748b"},children:t.employeeCode}),e.jsx("td",{style:{fontWeight:600},children:e.jsx(W,{to:`${F}/employees/${t.id}`,style:{color:"#0f172a",textDecoration:"none"},children:t.fullName||t.name||"Staff Member"})}),e.jsxs("td",{children:[e.jsx("div",{children:t.email}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:t.phone||"-"})]}),e.jsx("td",{children:t.department||"Sales"}),e.jsx("td",{children:t.designation||"Sales Executive"}),e.jsxs("td",{children:[((a=t._count)==null?void 0:a.sales)||0," deals"]}),e.jsx("td",{children:e.jsxs(se,{$status:t.status,children:[t.status==="ACTIVE"?e.jsx(_,{size:12}):e.jsx(U,{size:12}),t.status]})}),e.jsx("td",{style:{textAlign:"right"},children:e.jsxs("div",{style:{display:"inline-flex",gap:6},children:[e.jsx(W,{to:`${F}/employees/${t.id}`,children:e.jsx(k,{title:"View Profile",children:e.jsx(q,{size:13})})}),e.jsx(k,{title:"Edit Details",onClick:()=>{w(t),j(!0)},children:e.jsx(G,{size:13})}),e.jsx(k,{title:t.status==="ACTIVE"?"Deactivate":"Activate",onClick:()=>P(t.id),children:t.status==="ACTIVE"?"Deactivate":"Activate"}),e.jsx(k,{title:"Delete Staff",onClick:()=>D(t.id,t.fullName||t.name||t.employeeCode),style:{color:"#e11d48",borderColor:"#fecdd3",background:"#fff1f2"},children:"🗑️"})]})})]},t.id)}),s.length===0&&!b&&e.jsx("tr",{children:e.jsx("td",{colSpan:9,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No employees found matching criteria."})})]})]})}),S&&e.jsx(J,{employee:y,onClose:()=>j(!1),onSuccess:()=>{j(!1),f()}})]})};export{de as BusinessEmployeesPage};
