import{r as a,j as e,b3 as B,k as O,f as V,a as _,aL as U,i as q,af as G}from"./react-vendor-BXyx942q.js";import{g as r}from"./ui-vendor-VHkRGmvp.js";import{P as D}from"./admin-pages-CpQOasEv.js";import{b as S}from"./businessApi-DCLK4cxV.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const H=r.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(3px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`,Y=r.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,Q=r.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`,i=r.div`
  grid-column: ${({$fullWidth:t})=>t?"1 / -1":"auto"};
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
`,X=({employee:t,onClose:g,onSuccess:E})=>{const l=!!t,[d,A]=a.useState((t==null?void 0:t.fullName)||""),[o,y]=a.useState((t==null?void 0:t.email)||""),[c,C]=a.useState((t==null?void 0:t.phone)||""),[f,h]=a.useState((t==null?void 0:t.department)||"Sales"),[j,v]=a.useState((t==null?void 0:t.designation)||"Sales Executive"),[x,w]=a.useState((t==null?void 0:t.role)||"SALES_EMPLOYEE"),[s,u]=a.useState((t==null?void 0:t.status)||"ACTIVE"),[p,b]=a.useState((t==null?void 0:t.monthlySalesTarget)||0),[T,$]=a.useState((t==null?void 0:t.notes)||""),[m,F]=a.useState(!1),[L,W]=a.useState(""),[N,P]=a.useState(!1),R=async n=>{var z,M;if(n.preventDefault(),!d||!o){alert("Please fill out full name and email.");return}P(!0);try{l&&t?await S.updateEmployee(t.id,{fullName:d,email:o,phone:c,department:f,designation:j,role:x,status:s,monthlySalesTarget:Number(p),notes:T}):await S.createEmployee({fullName:d,email:o,phone:c,department:f,designation:j,role:x,monthlySalesTarget:Number(p),notes:T,createLogin:m,password:m?L:void 0}),E()}catch(k){alert(((M=(z=k==null?void 0:k.response)==null?void 0:z.data)==null?void 0:M.message)||"Operation failed")}finally{P(!1)}};return e.jsx(H,{onClick:g,children:e.jsxs(Y,{onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:700,margin:0},children:l?"Edit Employee Details":"Register New Employee"}),e.jsx("button",{onClick:g,style:{background:"none",border:"none",cursor:"pointer",fontSize:"1.1rem"},children:"✕"})]}),e.jsxs("form",{onSubmit:R,children:[e.jsxs(Q,{children:[e.jsxs(i,{$fullWidth:!0,children:[e.jsx("label",{children:"Full Name *"}),e.jsx("input",{type:"text",value:d,onChange:n=>A(n.target.value),required:!0})]}),e.jsxs(i,{children:[e.jsx("label",{children:"Email Address *"}),e.jsx("input",{type:"email",value:o,onChange:n=>y(n.target.value),required:!0})]}),e.jsxs(i,{children:[e.jsx("label",{children:"Phone Number"}),e.jsx("input",{type:"text",value:c,onChange:n=>C(n.target.value),placeholder:"+1 555-0199"})]}),e.jsxs(i,{children:[e.jsx("label",{children:"Department"}),e.jsxs("select",{value:f,onChange:n=>h(n.target.value),children:[e.jsx("option",{value:"Sales",children:"Sales"}),e.jsx("option",{value:"Atelier & Production",children:"Atelier & Production"}),e.jsx("option",{value:"Accounting & Finance",children:"Accounting & Finance"}),e.jsx("option",{value:"Management",children:"Management"}),e.jsx("option",{value:"Logistics",children:"Logistics"})]})]}),e.jsxs(i,{children:[e.jsx("label",{children:"Designation"}),e.jsx("input",{type:"text",value:j,onChange:n=>v(n.target.value)})]}),e.jsxs(i,{children:[e.jsx("label",{children:"System Role & Permissions"}),e.jsxs("select",{value:x,onChange:n=>w(n.target.value),children:[e.jsx("option",{value:"SALES_EMPLOYEE",children:"Sales Employee (Own Sales & Attendance)"}),e.jsx("option",{value:"SALES_MANAGER",children:"Sales Manager (Team Sales & Approvals)"}),e.jsx("option",{value:"ACCOUNTANT",children:"Accountant (Ledgers & Commission Payouts)"}),e.jsx("option",{value:"ADMIN",children:"Admin (Full Access)"})]})]}),e.jsxs(i,{children:[e.jsx("label",{children:"Monthly Sales Quota Target ($)"}),e.jsx("input",{type:"number",value:p,onChange:n=>b(Number(n.target.value))})]}),l&&e.jsxs(i,{children:[e.jsx("label",{children:"Employment Status"}),e.jsxs("select",{value:s,onChange:n=>u(n.target.value),children:[e.jsx("option",{value:"ACTIVE",children:"ACTIVE"}),e.jsx("option",{value:"INACTIVE",children:"INACTIVE"})]})]}),!l&&e.jsx(i,{$fullWidth:!0,children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginTop:6},children:[e.jsx("input",{type:"checkbox",id:"createLoginCheck",checked:m,onChange:n=>F(n.target.checked)}),e.jsx("label",{htmlFor:"createLoginCheck",style:{cursor:"pointer"},children:"Create System User Login for this employee"})]})}),!l&&m&&e.jsxs(i,{$fullWidth:!0,children:[e.jsx("label",{children:"Temporary Password *"}),e.jsx("input",{type:"password",value:L,onChange:n=>W(n.target.value),required:m,placeholder:"Enter initial login password"})]}),e.jsxs(i,{$fullWidth:!0,children:[e.jsx("label",{children:"Internal Notes & Comments"}),e.jsx("textarea",{rows:2,value:T,onChange:n=>$(n.target.value)})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20},children:[e.jsx("button",{type:"button",onClick:g,style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#ffffff",borderRadius:6,fontWeight:600,cursor:"pointer"},children:"Cancel"}),e.jsx("button",{type:"submit",disabled:N,style:{padding:"8px 20px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,cursor:"pointer"},children:N?"Saving...":l?"Update Employee":"Create Employee"})]})]})]})})},J=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,K=r.div`
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
`,Z=r.div`
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
`,ee=r.table`
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
`,te=r.span`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: ${({$status:t})=>t==="ACTIVE"?"#ebfbee":"#f1f5f9"};
  color: ${({$status:t})=>t==="ACTIVE"?"#2b8a3e":"#64748b"};
  border: 1px solid ${({$status:t})=>t==="ACTIVE"?"#b2f2bb":"#cbd5e1"};
`,I=r.button`
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
`,oe=()=>{const[t,g]=a.useState([]),[E,l]=a.useState(!0),[d,A]=a.useState(""),[o,y]=a.useState("ALL"),[c,C]=a.useState("ALL"),[f,h]=a.useState(!1),[j,v]=a.useState(null),x=async()=>{l(!0);try{const s=await S.getEmployees({search:d||void 0,department:o!=="ALL"?o:void 0,status:c!=="ALL"?c:void 0});g(s.employees||[])}catch(s){console.error(s)}finally{l(!1)}};a.useEffect(()=>{x()},[d,o,c]);const w=async s=>{var u,p;try{await S.toggleEmployeeStatus(s),x()}catch(b){alert(((p=(u=b==null?void 0:b.response)==null?void 0:u.data)==null?void 0:p.message)||"Failed to update status")}};return e.jsxs("div",{children:[e.jsxs(J,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Staff & Employee Directory"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Manage atelier personnel, designations, quotas, and access permissions"})]}),e.jsxs("button",{onClick:()=>{v(null),h(!0)},style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(B,{size:16})," Add Employee"]})]}),e.jsxs(K,{children:[e.jsxs(Z,{children:[e.jsx(O,{size:14,color:"#64748b"}),e.jsx("input",{type:"text",placeholder:"Search by name, email, code...",value:d,onChange:s=>A(s.target.value)})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("select",{value:o,onChange:s=>y(s.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Departments"}),e.jsx("option",{value:"Sales",children:"Sales"}),e.jsx("option",{value:"Atelier & Production",children:"Atelier & Production"}),e.jsx("option",{value:"Accounting & Finance",children:"Accounting & Finance"}),e.jsx("option",{value:"Management",children:"Management"})]}),e.jsxs("select",{value:c,onChange:s=>C(s.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Status"}),e.jsx("option",{value:"ACTIVE",children:"ACTIVE"}),e.jsx("option",{value:"INACTIVE",children:"INACTIVE"})]})]})]}),e.jsxs(ee,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Code"}),e.jsx("th",{children:"Full Name"}),e.jsx("th",{children:"Email / Phone"}),e.jsx("th",{children:"Department"}),e.jsx("th",{children:"Designation"}),e.jsx("th",{children:"Target"}),e.jsx("th",{children:"Sales"}),e.jsx("th",{children:"Status"}),e.jsx("th",{style:{textAlign:"right"},children:"Actions"})]})}),e.jsxs("tbody",{children:[t.map(s=>{var u;return e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:700,color:"#64748b"},children:s.employeeCode}),e.jsx("td",{style:{fontWeight:600},children:e.jsx(V,{to:`${D}/employees/${s.id}`,style:{color:"#0f172a",textDecoration:"none"},children:s.fullName||s.name||"Staff Member"})}),e.jsxs("td",{children:[e.jsx("div",{children:s.email}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:s.phone||"-"})]}),e.jsx("td",{children:s.department||"Sales"}),e.jsx("td",{children:s.designation||"Sales Executive"}),e.jsxs("td",{style:{fontWeight:600},children:["$",(Number(s.monthlySalesTarget)||Number(s.monthlyTarget)||Number(s.targetAmount)||0).toLocaleString()]}),e.jsx("td",{children:((u=s._count)==null?void 0:u.sales)||0}),e.jsx("td",{children:e.jsxs(te,{$status:s.status,children:[s.status==="ACTIVE"?e.jsx(_,{size:12}):e.jsx(U,{size:12}),s.status]})}),e.jsx("td",{style:{textAlign:"right"},children:e.jsxs("div",{style:{display:"inline-flex",gap:6},children:[e.jsx(V,{to:`${D}/employees/${s.id}`,children:e.jsx(I,{title:"View Profile",children:e.jsx(q,{size:13})})}),e.jsx(I,{title:"Edit Details",onClick:()=>{v(s),h(!0)},children:e.jsx(G,{size:13})}),e.jsx(I,{title:s.status==="ACTIVE"?"Deactivate":"Activate",onClick:()=>w(s.id),children:s.status==="ACTIVE"?"Deactivate":"Activate"})]})})]},s.id)}),t.length===0&&!E&&e.jsx("tr",{children:e.jsx("td",{colSpan:9,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No employees found matching criteria."})})]})]}),f&&e.jsx(X,{employee:j,onClose:()=>h(!1),onSuccess:()=>{h(!1),x()}})]})};export{oe as BusinessEmployeesPage};
