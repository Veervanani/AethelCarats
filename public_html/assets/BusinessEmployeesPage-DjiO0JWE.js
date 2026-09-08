import{r,j as e,C as X,bb as H,b2 as J,i as Q,c as B,f as U,a as Z,aL as ee,h as te,ah as se,af as ne}from"./react-vendor-CKfE40gi.js";import{g as d}from"./ui-vendor-5voluciG.js";import{e as re,P as G}from"./admin-pages-CjL1b0Kp.js";import{b as w}from"./businessApi-C4guCsxF.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const ie=d.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(3px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
`,ae=d.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 640px;
  max-height: 92vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px;
  box-sizing: border-box;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  @media (max-width: 480px) {
    padding: 16px;
  }
`,oe=d.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`,l=d.div`
  grid-column: ${({$fullWidth:s})=>s?"1 / -1":"auto"};
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #334155;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  input, select, textarea {
    padding: 8px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.84rem;
    outline: none;
    transition: all 0.15s ease;

    &:focus {
      border-color: #e2b96f;
      box-shadow: 0 0 0 2px rgba(226, 185, 111, 0.2);
    }
  }

  .helper-text {
    font-size: 0.72rem;
    color: #64748b;
    margin-top: 2px;
  }
`,$=d.div`
  grid-column: 1 / -1;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 14px 16px;
  margin-top: 4px;

  .box-header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.82rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 10px;
  }

  .password-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    @media (max-width: 540px) {
      grid-template-columns: 1fr;
    }
  }
`,le=d.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 14px;
`,de=({employee:s,onClose:S,onSuccess:o})=>{const{user:c}=re(),C=(c==null?void 0:c.role)==="ADMIN"||(c==null?void 0:c.role)==="SUPER_ADMIN",x=!!s,[m,N]=r.useState((s==null?void 0:s.fullName)||""),[u,P]=r.useState((s==null?void 0:s.email)||""),[b,I]=r.useState((s==null?void 0:s.phone)||""),[y,v]=r.useState((s==null?void 0:s.department)||"Sales"),[A,k]=r.useState((s==null?void 0:s.designation)||"Sales Executive"),[p,L]=r.useState((s==null?void 0:s.role)||"SALES_EMPLOYEE"),[z,R]=r.useState((s==null?void 0:s.status)||"ACTIVE"),[E,M]=r.useState((s==null?void 0:s.notes)||""),[t,i]=r.useState(""),[a,f]=r.useState(""),[h,Y]=r.useState(!1),[V,g]=r.useState(""),[T,W]=r.useState(!1),j=p==="SALES_HR_MANAGER",K=async n=>{var F,O;if(n.preventDefault(),g(""),!m.trim()||!u.trim()){g("Full Name and Email Address are required.");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.trim())){g("Please enter a valid email address.");return}if(["SUPER_ADMIN","ADMIN","SALES_HR_MANAGER"].includes(p)&&!C){g("Only Administrators can assign Administrator or Manager roles.");return}if(j&&!x){if(!t){g("Password is required for SALES_HR_MANAGER.");return}if(t.length<6){g("Password must be at least 6 characters long.");return}if(t!==a){g("Password and Confirm Password do not match.");return}}if(t){if(t.length<6){g("Password must be at least 6 characters long.");return}if(t!==a){g("Password and Confirm Password do not match.");return}}W(!0);try{x&&s?await w.updateEmployee(s.id,{fullName:m.trim(),email:u.trim().toLowerCase(),phone:b.trim(),department:y,designation:A.trim(),role:p,status:z,notes:E.trim(),password:t||void 0,confirmPassword:t?a:void 0}):await w.createEmployee({fullName:m.trim(),email:u.trim().toLowerCase(),phone:b.trim(),department:y,designation:A.trim(),role:p,notes:E.trim(),createLogin:j||h,password:j||h||t?t:void 0,confirmPassword:j||h||t?a:void 0}),o()}catch(D){g(((O=(F=D==null?void 0:D.response)==null?void 0:F.data)==null?void 0:O.message)||"Operation failed. Please try again.")}finally{W(!1)}};return e.jsx(ie,{onClick:S,children:e.jsxs(ae,{onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"nowrap",gap:10,width:"100%",boxSizing:"border-box"},children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:800,color:"#0f172a",margin:0,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:x?"Edit Employee Details":"Register New Employee"}),e.jsx("button",{type:"button",onClick:S,style:{background:"#f1f5f9",border:"none",borderRadius:6,width:32,height:32,minWidth:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"1rem",color:"#64748b",flexShrink:0},children:"✕"})]}),V&&e.jsxs(le,{children:[e.jsx(X,{size:15}),e.jsx("span",{children:V})]}),e.jsxs("form",{onSubmit:K,children:[e.jsxs(oe,{children:[e.jsxs(l,{$fullWidth:!0,children:[e.jsx("label",{children:"Full Name *"}),e.jsx("input",{type:"text",value:m,onChange:n=>N(n.target.value),required:!0,placeholder:"e.g. Ramesh Patel"})]}),e.jsxs(l,{children:[e.jsx("label",{children:"Email Address (Login Username) *"}),e.jsx("input",{type:"email",value:u,onChange:n=>P(n.target.value),required:!0,placeholder:"employee@auroradiamonds.com"}),e.jsx("span",{className:"helper-text",children:"Used as the login username/email for system access"})]}),e.jsxs(l,{children:[e.jsx("label",{children:"Phone Number"}),e.jsx("input",{type:"text",value:b,onChange:n=>I(n.target.value),placeholder:"+91 98765 43210"})]}),e.jsxs(l,{children:[e.jsx("label",{children:"Department"}),e.jsxs("select",{value:y,onChange:n=>v(n.target.value),children:[e.jsx("option",{value:"Sales",children:"Sales"}),e.jsx("option",{value:"Human Resources",children:"Human Resources"}),e.jsx("option",{value:"Atelier & Production",children:"Atelier & Production"}),e.jsx("option",{value:"Accounting & Finance",children:"Accounting & Finance"}),e.jsx("option",{value:"Management",children:"Management"}),e.jsx("option",{value:"Logistics",children:"Logistics"})]})]}),e.jsxs(l,{children:[e.jsx("label",{children:"Designation"}),e.jsx("input",{type:"text",value:A,onChange:n=>k(n.target.value),placeholder:"e.g. Sales & HR Manager"})]}),e.jsxs(l,{$fullWidth:!0,children:[e.jsx("label",{children:"System Role & Permissions *"}),e.jsxs("select",{value:p,onChange:n=>L(n.target.value),children:[C&&e.jsxs(e.Fragment,{children:[e.jsx("option",{value:"SUPER_ADMIN",children:"SUPER_ADMIN (Full System & Super Admin)"}),e.jsx("option",{value:"ADMIN",children:"ADMIN (Full Operations & Settings)"}),e.jsx("option",{value:"SALES_HR_MANAGER",children:"SALES_HR_MANAGER (Sales, HR, Attendance & CRM Operations)"})]}),e.jsx("option",{value:"SALES_MANAGER",children:"SALES_MANAGER (Team Sales & Approvals)"}),e.jsx("option",{value:"SALES_EMPLOYEE",children:"SALES_EMPLOYEE (Sales & Attendance)"}),e.jsx("option",{value:"ACCOUNTANT",children:"ACCOUNTANT (Finance & Ledgers)"})]}),e.jsx("span",{className:"helper-text",children:j?"SALES_HR_MANAGER has full access to Employees, Attendance, Sales, Invoices, Commissions, Customers & Suppliers.":"Assign appropriate operational access level for this employee."})]}),x&&e.jsxs(l,{children:[e.jsx("label",{children:"Employment Status"}),e.jsxs("select",{value:z,onChange:n=>R(n.target.value),children:[e.jsx("option",{value:"ACTIVE",children:"ACTIVE (Allowed to login & record operations)"}),e.jsx("option",{value:"INACTIVE",children:"INACTIVE (Access blocked)"})]})]}),j&&!x&&e.jsxs($,{children:[e.jsxs("div",{className:"box-header",children:[e.jsx(H,{size:15,color:"#d97706"}),e.jsx("span",{children:"SALES_HR_MANAGER Login Credentials *"})]}),e.jsxs("div",{className:"password-grid",children:[e.jsxs(l,{children:[e.jsx("label",{children:"Password *"}),e.jsx("input",{type:"password",value:t,onChange:n=>i(n.target.value),required:!0,placeholder:"Minimum 6 characters"})]}),e.jsxs(l,{children:[e.jsx("label",{children:"Confirm Password *"}),e.jsx("input",{type:"password",value:a,onChange:n=>f(n.target.value),required:!0,placeholder:"Re-enter password"})]})]}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b",marginTop:6},children:"Password is encrypted using secure bcrypt hash before storage. Plaintext passwords are never saved or exposed."})]}),x&&e.jsxs($,{children:[e.jsxs("div",{className:"box-header",children:[e.jsx(H,{size:15,color:"#475569"}),e.jsx("span",{children:"Change Password (Optional)"})]}),e.jsxs("div",{className:"password-grid",children:[e.jsxs(l,{children:[e.jsx("label",{children:"New Password"}),e.jsx("input",{type:"password",value:t,onChange:n=>i(n.target.value),placeholder:"Leave empty to keep existing"})]}),e.jsxs(l,{children:[e.jsx("label",{children:"Confirm New Password"}),e.jsx("input",{type:"password",value:a,onChange:n=>f(n.target.value),placeholder:"Confirm new password"})]})]}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b",marginTop:6},children:"Leave password fields blank if you do not wish to change the existing login credentials."})]}),!j&&!x&&e.jsxs(e.Fragment,{children:[e.jsx(l,{$fullWidth:!0,children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginTop:4},children:[e.jsx("input",{type:"checkbox",id:"createLoginCheck",checked:h,onChange:n=>Y(n.target.checked)}),e.jsx("label",{htmlFor:"createLoginCheck",style:{cursor:"pointer",fontWeight:600},children:"Create System User Login for this employee"})]})}),h&&e.jsx($,{children:e.jsxs("div",{className:"password-grid",children:[e.jsxs(l,{children:[e.jsx("label",{children:"Password *"}),e.jsx("input",{type:"password",value:t,onChange:n=>i(n.target.value),required:h,placeholder:"Minimum 6 characters"})]}),e.jsxs(l,{children:[e.jsx("label",{children:"Confirm Password *"}),e.jsx("input",{type:"password",value:a,onChange:n=>f(n.target.value),required:h,placeholder:"Re-enter password"})]})]})})]}),e.jsxs(l,{$fullWidth:!0,children:[e.jsx("label",{children:"Internal Notes & Comments"}),e.jsx("textarea",{rows:2,value:E,onChange:n=>M(n.target.value),placeholder:"Optional administrative notes"})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:24},children:[e.jsx("button",{type:"button",onClick:S,style:{padding:"9px 18px",border:"1px solid #cbd5e1",background:"#ffffff",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer",color:"#334155"},children:"Cancel"}),e.jsx("button",{type:"submit",disabled:T,style:{padding:"9px 22px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:700,fontSize:"0.82rem",cursor:"pointer",opacity:T?.7:1},children:T?"Saving...":x?"Update Employee":"Register Employee"})]})]})]})})},q=d.label`
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
`,ce=d.div`
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
`,xe=d.div`
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

  @media (max-width: 640px) {
    padding: 10px 12px;
    flex-direction: column;
    align-items: stretch;
  }
`,pe=d.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  padding: 6px 12px;
  border-radius: 6px;
  width: 280px;

  @media (max-width: 640px) {
    width: 100%;
    box-sizing: border-box;
  }

  input {
    border: none;
    background: transparent;
    font-size: 0.82rem;
    outline: none;
    width: 100%;
  }
`,he=d.div`
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
`,ue=d.table`
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
`,fe=d.span`
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
`,ge=d.button`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  height: 32px;
  min-width: 32px;
  padding: 0 10px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.76rem;
  font-weight: 600;
  color: #334155;
  transition: all 0.15s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
    border-color: #cbd5e1;
  }
`,_=d.button`
  background: ${({$danger:s})=>s?"#fff1f2":"#ffffff"};
  border: 1px solid ${({$danger:s})=>s?"#fecdd3":"#e2e8f0"};
  color: ${({$danger:s})=>s?"#e11d48":"#475569"};
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background: ${({$danger:s})=>s?"#ffe4e6":"#f1f5f9"};
    color: ${({$danger:s})=>s?"#be123c":"#0f172a"};
    border-color: ${({$danger:s})=>s?"#fda4af":"#cbd5e1"};
  }

  svg {
    width: 15px;
    height: 15px;
    display: block;
    stroke-width: 2.2;
  }
`,Ae=()=>{const[s,S]=r.useState([]),[o,c]=r.useState(new Set),[C,x]=r.useState(!0),[m,N]=r.useState(""),[u,P]=r.useState("ALL"),[b,I]=r.useState("ALL"),[y,v]=r.useState(!1),[A,k]=r.useState(null),p=async()=>{x(!0);try{const t=await w.getEmployees({search:m||void 0,department:u!=="ALL"?u:void 0,status:b!=="ALL"?b:void 0});S(t.employees||[]),c(new Set)}catch(t){console.error(t)}finally{x(!1)}};r.useEffect(()=>{p()},[m,u,b]);const L=t=>{o.size===s.length&&s.length>0?c(new Set):c(new Set(s.map(i=>i.id)))},z=t=>{const i=new Set(o);i.has(t)?i.delete(t):i.add(t),c(i)},R=async(t,i)=>{var a,f;if(window.confirm(`Are you sure you want to delete employee "${i}"?`))try{await w.deleteEmployee(t),p()}catch(h){alert(((f=(a=h==null?void 0:h.response)==null?void 0:a.data)==null?void 0:f.message)||"Delete failed")}},E=async()=>{var t,i;if(o.size!==0&&window.confirm(`Are you sure you want to delete ${o.size} selected employees?`))try{await w.deleteEmployeesBatch(Array.from(o)),p()}catch(a){alert(((i=(t=a==null?void 0:a.response)==null?void 0:t.data)==null?void 0:i.message)||"Batch delete failed")}},M=async t=>{var i,a;try{await w.toggleEmployeeStatus(t),p()}catch(f){alert(((a=(i=f==null?void 0:f.response)==null?void 0:i.data)==null?void 0:a.message)||"Failed to update status")}};return e.jsxs("div",{children:[e.jsxs(ce,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Staff & Employee Directory"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Manage atelier personnel, designations, quotas, and access permissions"})]}),e.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[o.size>0&&e.jsxs("button",{onClick:E,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#e11d48",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.8rem",cursor:"pointer"},children:["🗑️ Delete Selected (",o.size,")"]}),e.jsxs("button",{onClick:()=>{k(null),v(!0)},style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(J,{size:16})," Add Employee"]})]})]}),e.jsxs(xe,{children:[e.jsxs(pe,{children:[e.jsx(Q,{size:14,color:"#64748b"}),e.jsx("input",{type:"text",placeholder:"Search by name, email, code...",value:m,onChange:t=>N(t.target.value)})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("select",{value:u,onChange:t=>P(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Departments"}),e.jsx("option",{value:"Sales",children:"Sales"}),e.jsx("option",{value:"Atelier & Production",children:"Atelier & Production"}),e.jsx("option",{value:"Accounting & Finance",children:"Accounting & Finance"}),e.jsx("option",{value:"Management",children:"Management"})]}),e.jsxs("select",{value:b,onChange:t=>I(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Status"}),e.jsx("option",{value:"ACTIVE",children:"ACTIVE"}),e.jsx("option",{value:"INACTIVE",children:"INACTIVE"})]})]})]}),e.jsx(he,{children:e.jsxs(ue,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:36,textAlign:"center"},children:e.jsxs(q,{$checked:s.length>0&&o.size===s.length,onClick:t=>{t.preventDefault(),L()},title:"Select All Employees",children:[e.jsx("input",{type:"checkbox",checked:s.length>0&&o.size===s.length,readOnly:!0}),s.length>0&&o.size===s.length&&e.jsx(B,{size:11,strokeWidth:3})]})}),e.jsx("th",{children:"Code"}),e.jsx("th",{children:"Full Name"}),e.jsx("th",{children:"Email / Phone"}),e.jsx("th",{children:"Department"}),e.jsx("th",{children:"Designation"}),e.jsx("th",{children:"Sales Deals"}),e.jsx("th",{children:"Status"}),e.jsx("th",{style:{textAlign:"right"},children:"Actions"})]})}),e.jsxs("tbody",{children:[s.map(t=>{var i;return e.jsxs("tr",{children:[e.jsx("td",{style:{textAlign:"center"},children:e.jsxs(q,{$checked:o.has(t.id),onClick:a=>{a.preventDefault(),z(t.id)},title:`Select ${t.fullName||t.name}`,children:[e.jsx("input",{type:"checkbox",checked:o.has(t.id),readOnly:!0}),o.has(t.id)&&e.jsx(B,{size:11,strokeWidth:3})]})}),e.jsx("td",{style:{fontWeight:700,color:"#64748b"},children:t.employeeCode}),e.jsx("td",{style:{fontWeight:600},children:e.jsx(U,{to:`${G}/employees/${t.id}`,style:{color:"#0f172a",textDecoration:"none"},children:t.fullName||t.name||"Staff Member"})}),e.jsxs("td",{children:[e.jsx("div",{children:t.email}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:t.phone||"-"})]}),e.jsx("td",{children:t.department||"Sales"}),e.jsx("td",{children:t.designation||"Sales Executive"}),e.jsxs("td",{children:[((i=t._count)==null?void 0:i.sales)||0," deals"]}),e.jsx("td",{children:e.jsxs(fe,{$status:t.status,children:[t.status==="ACTIVE"?e.jsx(Z,{size:12}):e.jsx(ee,{size:12}),t.status]})}),e.jsx("td",{style:{textAlign:"right"},children:e.jsxs("div",{style:{display:"inline-flex",gap:6,alignItems:"center"},children:[e.jsx(U,{to:`${G}/employees/${t.id}`,style:{textDecoration:"none"},children:e.jsx(_,{title:"View Profile",type:"button",children:e.jsx(te,{size:15,color:"#2563eb"})})}),e.jsx(_,{title:"Edit Details",type:"button",onClick:()=>{k(t),v(!0)},children:e.jsx(se,{size:15,color:"#0f172a"})}),e.jsx(ge,{type:"button",title:t.status==="ACTIVE"?"Deactivate":"Activate",onClick:()=>M(t.id),style:{background:t.status==="ACTIVE"?"#fff7ed":"#f0fdf4",borderColor:t.status==="ACTIVE"?"#ffedd5":"#bbf7d0",color:t.status==="ACTIVE"?"#c2410c":"#16a34a"},children:t.status==="ACTIVE"?"Deactivate":"Activate"}),e.jsx(_,{$danger:!0,type:"button",title:"Delete Staff",onClick:()=>R(t.id,t.fullName||t.name||t.employeeCode),children:e.jsx(ne,{size:15})})]})})]},t.id)}),s.length===0&&!C&&e.jsx("tr",{children:e.jsx("td",{colSpan:9,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No employees found matching criteria."})})]})]})}),y&&e.jsx(de,{employee:A,onClose:()=>v(!1),onSuccess:()=>{v(!1),p()}})]})};export{Ae as BusinessEmployeesPage};
