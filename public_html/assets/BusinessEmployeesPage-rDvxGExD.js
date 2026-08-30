import{r,j as e,C as X,bc as H,b3 as J,k as Q,c as B,f as U,a as Z,aL as ee,i as te,af as se}from"./react-vendor-Cp-UByyT.js";import{g as d}from"./ui-vendor-9EZLEUQ9.js";import{e as ne,P as G}from"./admin-pages-C6VF3sn6.js";import{b as S}from"./businessApi-C5aXRG43.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const re=d.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(3px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`,ae=d.div`
  background: #ffffff;
  border-radius: 12px;
  width: 100%;
  max-width: 640px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 26px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,ie=d.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`,o=d.div`
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
`,oe=({employee:s,onClose:A,onSuccess:l})=>{const{user:c}=ne(),C=(c==null?void 0:c.role)==="ADMIN"||(c==null?void 0:c.role)==="SUPER_ADMIN",x=!!s,[m,L]=r.useState((s==null?void 0:s.fullName)||""),[u,R]=r.useState((s==null?void 0:s.email)||""),[j,z]=r.useState((s==null?void 0:s.phone)||""),[w,v]=r.useState((s==null?void 0:s.department)||"Sales"),[y,k]=r.useState((s==null?void 0:s.designation)||"Sales Executive"),[p,I]=r.useState((s==null?void 0:s.role)||"SALES_EMPLOYEE"),[N,M]=r.useState((s==null?void 0:s.status)||"ACTIVE"),[E,D]=r.useState((s==null?void 0:s.notes)||""),[t,a]=r.useState(""),[i,g]=r.useState(""),[h,Y]=r.useState(!1),[F,f]=r.useState(""),[T,V]=r.useState(!1),b=p==="SALES_HR_MANAGER",K=async n=>{var W,O;if(n.preventDefault(),f(""),!m.trim()||!u.trim()){f("Full Name and Email Address are required.");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.trim())){f("Please enter a valid email address.");return}if(["SUPER_ADMIN","ADMIN","SALES_HR_MANAGER"].includes(p)&&!C){f("Only Administrators can assign Administrator or Manager roles.");return}if(b&&!x){if(!t){f("Password is required for SALES_HR_MANAGER.");return}if(t.length<6){f("Password must be at least 6 characters long.");return}if(t!==i){f("Password and Confirm Password do not match.");return}}if(t){if(t.length<6){f("Password must be at least 6 characters long.");return}if(t!==i){f("Password and Confirm Password do not match.");return}}V(!0);try{x&&s?await S.updateEmployee(s.id,{fullName:m.trim(),email:u.trim().toLowerCase(),phone:j.trim(),department:w,designation:y.trim(),role:p,status:N,notes:E.trim(),password:t||void 0,confirmPassword:t?i:void 0}):await S.createEmployee({fullName:m.trim(),email:u.trim().toLowerCase(),phone:j.trim(),department:w,designation:y.trim(),role:p,notes:E.trim(),createLogin:b||h,password:b||h||t?t:void 0,confirmPassword:b||h||t?i:void 0}),l()}catch(_){f(((O=(W=_==null?void 0:_.response)==null?void 0:W.data)==null?void 0:O.message)||"Operation failed. Please try again.")}finally{V(!1)}};return e.jsx(re,{onClick:A,children:e.jsxs(ae,{onClick:n=>n.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[e.jsx("h2",{style:{fontSize:"1.2rem",fontWeight:800,color:"#0f172a",margin:0},children:x?"Edit Employee Details":"Register New Employee"}),e.jsx("button",{onClick:A,style:{background:"none",border:"none",cursor:"pointer",fontSize:"1.1rem",color:"#64748b"},children:"✕"})]}),F&&e.jsxs(le,{children:[e.jsx(X,{size:15}),e.jsx("span",{children:F})]}),e.jsxs("form",{onSubmit:K,children:[e.jsxs(ie,{children:[e.jsxs(o,{$fullWidth:!0,children:[e.jsx("label",{children:"Full Name *"}),e.jsx("input",{type:"text",value:m,onChange:n=>L(n.target.value),required:!0,placeholder:"e.g. Ramesh Patel"})]}),e.jsxs(o,{children:[e.jsx("label",{children:"Email Address (Login Username) *"}),e.jsx("input",{type:"email",value:u,onChange:n=>R(n.target.value),required:!0,placeholder:"employee@floksyjewel.com"}),e.jsx("span",{className:"helper-text",children:"Used as the login username/email for system access"})]}),e.jsxs(o,{children:[e.jsx("label",{children:"Phone Number"}),e.jsx("input",{type:"text",value:j,onChange:n=>z(n.target.value),placeholder:"+91 98765 43210"})]}),e.jsxs(o,{children:[e.jsx("label",{children:"Department"}),e.jsxs("select",{value:w,onChange:n=>v(n.target.value),children:[e.jsx("option",{value:"Sales",children:"Sales"}),e.jsx("option",{value:"Human Resources",children:"Human Resources"}),e.jsx("option",{value:"Atelier & Production",children:"Atelier & Production"}),e.jsx("option",{value:"Accounting & Finance",children:"Accounting & Finance"}),e.jsx("option",{value:"Management",children:"Management"}),e.jsx("option",{value:"Logistics",children:"Logistics"})]})]}),e.jsxs(o,{children:[e.jsx("label",{children:"Designation"}),e.jsx("input",{type:"text",value:y,onChange:n=>k(n.target.value),placeholder:"e.g. Sales & HR Manager"})]}),e.jsxs(o,{$fullWidth:!0,children:[e.jsx("label",{children:"System Role & Permissions *"}),e.jsxs("select",{value:p,onChange:n=>I(n.target.value),children:[C&&e.jsxs(e.Fragment,{children:[e.jsx("option",{value:"SUPER_ADMIN",children:"SUPER_ADMIN (Full System & Super Admin)"}),e.jsx("option",{value:"ADMIN",children:"ADMIN (Full Operations & Settings)"}),e.jsx("option",{value:"SALES_HR_MANAGER",children:"SALES_HR_MANAGER (Sales, HR, Attendance & CRM Operations)"})]}),e.jsx("option",{value:"SALES_MANAGER",children:"SALES_MANAGER (Team Sales & Approvals)"}),e.jsx("option",{value:"SALES_EMPLOYEE",children:"SALES_EMPLOYEE (Sales & Attendance)"}),e.jsx("option",{value:"ACCOUNTANT",children:"ACCOUNTANT (Finance & Ledgers)"})]}),e.jsx("span",{className:"helper-text",children:b?"SALES_HR_MANAGER has full access to Employees, Attendance, Sales, Invoices, Commissions, Customers & Suppliers.":"Assign appropriate operational access level for this employee."})]}),x&&e.jsxs(o,{children:[e.jsx("label",{children:"Employment Status"}),e.jsxs("select",{value:N,onChange:n=>M(n.target.value),children:[e.jsx("option",{value:"ACTIVE",children:"ACTIVE (Allowed to login & record operations)"}),e.jsx("option",{value:"INACTIVE",children:"INACTIVE (Access blocked)"})]})]}),b&&!x&&e.jsxs($,{children:[e.jsxs("div",{className:"box-header",children:[e.jsx(H,{size:15,color:"#d97706"}),e.jsx("span",{children:"SALES_HR_MANAGER Login Credentials *"})]}),e.jsxs("div",{className:"password-grid",children:[e.jsxs(o,{children:[e.jsx("label",{children:"Password *"}),e.jsx("input",{type:"password",value:t,onChange:n=>a(n.target.value),required:!0,placeholder:"Minimum 6 characters"})]}),e.jsxs(o,{children:[e.jsx("label",{children:"Confirm Password *"}),e.jsx("input",{type:"password",value:i,onChange:n=>g(n.target.value),required:!0,placeholder:"Re-enter password"})]})]}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b",marginTop:6},children:"Password is encrypted using secure bcrypt hash before storage. Plaintext passwords are never saved or exposed."})]}),x&&e.jsxs($,{children:[e.jsxs("div",{className:"box-header",children:[e.jsx(H,{size:15,color:"#475569"}),e.jsx("span",{children:"Change Password (Optional)"})]}),e.jsxs("div",{className:"password-grid",children:[e.jsxs(o,{children:[e.jsx("label",{children:"New Password"}),e.jsx("input",{type:"password",value:t,onChange:n=>a(n.target.value),placeholder:"Leave empty to keep existing"})]}),e.jsxs(o,{children:[e.jsx("label",{children:"Confirm New Password"}),e.jsx("input",{type:"password",value:i,onChange:n=>g(n.target.value),placeholder:"Confirm new password"})]})]}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b",marginTop:6},children:"Leave password fields blank if you do not wish to change the existing login credentials."})]}),!b&&!x&&e.jsxs(e.Fragment,{children:[e.jsx(o,{$fullWidth:!0,children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginTop:4},children:[e.jsx("input",{type:"checkbox",id:"createLoginCheck",checked:h,onChange:n=>Y(n.target.checked)}),e.jsx("label",{htmlFor:"createLoginCheck",style:{cursor:"pointer",fontWeight:600},children:"Create System User Login for this employee"})]})}),h&&e.jsx($,{children:e.jsxs("div",{className:"password-grid",children:[e.jsxs(o,{children:[e.jsx("label",{children:"Password *"}),e.jsx("input",{type:"password",value:t,onChange:n=>a(n.target.value),required:h,placeholder:"Minimum 6 characters"})]}),e.jsxs(o,{children:[e.jsx("label",{children:"Confirm Password *"}),e.jsx("input",{type:"password",value:i,onChange:n=>g(n.target.value),required:h,placeholder:"Re-enter password"})]})]})})]}),e.jsxs(o,{$fullWidth:!0,children:[e.jsx("label",{children:"Internal Notes & Comments"}),e.jsx("textarea",{rows:2,value:E,onChange:n=>D(n.target.value),placeholder:"Optional administrative notes"})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:24},children:[e.jsx("button",{type:"button",onClick:A,style:{padding:"9px 18px",border:"1px solid #cbd5e1",background:"#ffffff",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer",color:"#334155"},children:"Cancel"}),e.jsx("button",{type:"submit",disabled:T,style:{padding:"9px 22px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:700,fontSize:"0.82rem",cursor:"pointer",opacity:T?.7:1},children:T?"Saving...":x?"Update Employee":"Register Employee"})]})]})]})})},q=d.label`
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
`,de=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,ce=d.div`
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
`,xe=d.div`
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
`,pe=d.div`
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
`,he=d.table`
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
`,ue=d.span`
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
`,P=d.button`
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
`,Ae=()=>{const[s,A]=r.useState([]),[l,c]=r.useState(new Set),[C,x]=r.useState(!0),[m,L]=r.useState(""),[u,R]=r.useState("ALL"),[j,z]=r.useState("ALL"),[w,v]=r.useState(!1),[y,k]=r.useState(null),p=async()=>{x(!0);try{const t=await S.getEmployees({search:m||void 0,department:u!=="ALL"?u:void 0,status:j!=="ALL"?j:void 0});A(t.employees||[]),c(new Set)}catch(t){console.error(t)}finally{x(!1)}};r.useEffect(()=>{p()},[m,u,j]);const I=t=>{l.size===s.length&&s.length>0?c(new Set):c(new Set(s.map(a=>a.id)))},N=t=>{const a=new Set(l);a.has(t)?a.delete(t):a.add(t),c(a)},M=async(t,a)=>{var i,g;if(window.confirm(`Are you sure you want to delete employee "${a}"?`))try{await S.deleteEmployee(t),p()}catch(h){alert(((g=(i=h==null?void 0:h.response)==null?void 0:i.data)==null?void 0:g.message)||"Delete failed")}},E=async()=>{var t,a;if(l.size!==0&&window.confirm(`Are you sure you want to delete ${l.size} selected employees?`))try{await S.deleteEmployeesBatch(Array.from(l)),p()}catch(i){alert(((a=(t=i==null?void 0:i.response)==null?void 0:t.data)==null?void 0:a.message)||"Batch delete failed")}},D=async t=>{var a,i;try{await S.toggleEmployeeStatus(t),p()}catch(g){alert(((i=(a=g==null?void 0:g.response)==null?void 0:a.data)==null?void 0:i.message)||"Failed to update status")}};return e.jsxs("div",{children:[e.jsxs(de,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Staff & Employee Directory"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Manage atelier personnel, designations, quotas, and access permissions"})]}),e.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[l.size>0&&e.jsxs("button",{onClick:E,style:{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#e11d48",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.8rem",cursor:"pointer"},children:["🗑️ Delete Selected (",l.size,")"]}),e.jsxs("button",{onClick:()=>{k(null),v(!0)},style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(J,{size:16})," Add Employee"]})]})]}),e.jsxs(ce,{children:[e.jsxs(xe,{children:[e.jsx(Q,{size:14,color:"#64748b"}),e.jsx("input",{type:"text",placeholder:"Search by name, email, code...",value:m,onChange:t=>L(t.target.value)})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsxs("select",{value:u,onChange:t=>R(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Departments"}),e.jsx("option",{value:"Sales",children:"Sales"}),e.jsx("option",{value:"Atelier & Production",children:"Atelier & Production"}),e.jsx("option",{value:"Accounting & Finance",children:"Accounting & Finance"}),e.jsx("option",{value:"Management",children:"Management"})]}),e.jsxs("select",{value:j,onChange:t=>z(t.target.value),style:{padding:"6px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"},children:[e.jsx("option",{value:"ALL",children:"All Status"}),e.jsx("option",{value:"ACTIVE",children:"ACTIVE"}),e.jsx("option",{value:"INACTIVE",children:"INACTIVE"})]})]})]}),e.jsx(pe,{children:e.jsxs(he,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{width:36,textAlign:"center"},children:e.jsxs(q,{$checked:s.length>0&&l.size===s.length,onClick:t=>{t.preventDefault(),I()},title:"Select All Employees",children:[e.jsx("input",{type:"checkbox",checked:s.length>0&&l.size===s.length,readOnly:!0}),s.length>0&&l.size===s.length&&e.jsx(B,{size:11,strokeWidth:3})]})}),e.jsx("th",{children:"Code"}),e.jsx("th",{children:"Full Name"}),e.jsx("th",{children:"Email / Phone"}),e.jsx("th",{children:"Department"}),e.jsx("th",{children:"Designation"}),e.jsx("th",{children:"Sales Deals"}),e.jsx("th",{children:"Status"}),e.jsx("th",{style:{textAlign:"right"},children:"Actions"})]})}),e.jsxs("tbody",{children:[s.map(t=>{var a;return e.jsxs("tr",{children:[e.jsx("td",{style:{textAlign:"center"},children:e.jsxs(q,{$checked:l.has(t.id),onClick:i=>{i.preventDefault(),N(t.id)},title:`Select ${t.fullName||t.name}`,children:[e.jsx("input",{type:"checkbox",checked:l.has(t.id),readOnly:!0}),l.has(t.id)&&e.jsx(B,{size:11,strokeWidth:3})]})}),e.jsx("td",{style:{fontWeight:700,color:"#64748b"},children:t.employeeCode}),e.jsx("td",{style:{fontWeight:600},children:e.jsx(U,{to:`${G}/employees/${t.id}`,style:{color:"#0f172a",textDecoration:"none"},children:t.fullName||t.name||"Staff Member"})}),e.jsxs("td",{children:[e.jsx("div",{children:t.email}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:t.phone||"-"})]}),e.jsx("td",{children:t.department||"Sales"}),e.jsx("td",{children:t.designation||"Sales Executive"}),e.jsxs("td",{children:[((a=t._count)==null?void 0:a.sales)||0," deals"]}),e.jsx("td",{children:e.jsxs(ue,{$status:t.status,children:[t.status==="ACTIVE"?e.jsx(Z,{size:12}):e.jsx(ee,{size:12}),t.status]})}),e.jsx("td",{style:{textAlign:"right"},children:e.jsxs("div",{style:{display:"inline-flex",gap:6},children:[e.jsx(U,{to:`${G}/employees/${t.id}`,children:e.jsx(P,{title:"View Profile",children:e.jsx(te,{size:13})})}),e.jsx(P,{title:"Edit Details",onClick:()=>{k(t),v(!0)},children:e.jsx(se,{size:13})}),e.jsx(P,{title:t.status==="ACTIVE"?"Deactivate":"Activate",onClick:()=>D(t.id),children:t.status==="ACTIVE"?"Deactivate":"Activate"}),e.jsx(P,{title:"Delete Staff",onClick:()=>M(t.id,t.fullName||t.name||t.employeeCode),style:{color:"#e11d48",borderColor:"#fecdd3",background:"#fff1f2"},children:"🗑️"})]})})]},t.id)}),s.length===0&&!C&&e.jsx("tr",{children:e.jsx("td",{colSpan:9,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No employees found matching criteria."})})]})]})}),w&&e.jsx(oe,{employee:y,onClose:()=>v(!1),onSuccess:()=>{v(!1),p()}})]})};export{Ae as BusinessEmployeesPage};
