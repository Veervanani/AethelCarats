import{r as s,j as e,P as F}from"./react-vendor-DxLkccZ0.js";import{g as r}from"./ui-vendor-BuBsKREC.js";import{b as o}from"./businessApi-DGsCEnDz.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-6iAS44Fe.js";import"./admin-tools-vendor-CKN5doRT.js";const B=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,V=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
`,c=r.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid ${({$color:i})=>i||"#0d1319"};
  border-radius: 8px;
  padding: 16px;

  .card-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
  }
  .card-val {
    font-size: 1.5rem;
    font-weight: 800;
    color: #0f172a;
    margin-top: 4px;
  }
`,Y=r.div`
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
`,_=r.table`
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
`,q=r.span`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  ${({$status:i})=>{switch(i){case"PRESENT":return"background: #ebfbee; color: #2b8a3e; border: 1px solid #b2f2bb;";case"ABSENT":return"background: #fff5f5; color: #e03131; border: 1px solid #ffc9c9;";case"HALF_DAY":return"background: #fff9db; color: #f59f00; border: 1px solid #ffe066;";case"LEAVE":return"background: #f3f0ff; color: #7950f2; border: 1px solid #d0bfff;";default:return"background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1;"}}}
`,X=()=>{const[i,A]=s.useState(null),[C,R]=s.useState([]),[u,N]=s.useState([]),[d,z]=s.useState(new Date().toISOString().split("T")[0]),[L,m]=s.useState(!0),[D,f]=s.useState(!1),[h,j]=s.useState(""),[y,M]=s.useState("PRESENT"),[v,I]=s.useState("09:00"),[S,W]=s.useState("18:00"),[k,P]=s.useState("9"),[E,O]=s.useState(!1),[w,$]=s.useState(""),g=async()=>{m(!0);try{const[t,n,a]=await Promise.all([o.getTodayAttendanceSummary(),o.getAttendance({date:d}),o.getEmployees({status:"ACTIVE"})]);A(t),R(n.records||n.attendance||[]),N(a.employees||[]),a.employees&&a.employees.length>0&&!h&&j(a.employees[0].id)}catch(t){console.error(t)}finally{m(!1)}};s.useEffect(()=>{g()},[d]);const H=async t=>{var n,a;t.preventDefault();try{const l=new Date(`${d}T${v}:00Z`),x=new Date(`${d}T${S}:00Z`);await o.manualAttendanceEntry({employeeId:h,date:d,checkInTime:l,checkOutTime:x,workingHours:Number(k),status:y,lateStatus:E,notes:w}),f(!1),g(),alert("✅ Manual entry saved")}catch(l){alert(((a=(n=l==null?void 0:l.response)==null?void 0:n.data)==null?void 0:a.message)||"Failed to save")}},p=async(t,n,a=!1)=>{var l,x;try{await o.manualAttendanceEntry({employeeId:t,date:d,workingHours:n==="PRESENT"?8:n==="HALF_DAY"?4:0,status:n,lateStatus:a,notes:`Quick-Marked as ${n}`}),await g()}catch(b){alert(((x=(l=b==null?void 0:b.response)==null?void 0:l.data)==null?void 0:x.message)||"Failed to mark attendance")}},T=u.map(t=>{const n=C.find(a=>{var l;return a.employeeId===t.id||((l=a.employee)==null?void 0:l.id)===t.id});return{employee:t,record:n}});return e.jsxs("div",{children:[e.jsxs(B,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Attendance Roster"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Daily check-in logs, punctuality tracking, and 1-click attendance marking"})]}),e.jsxs("button",{onClick:()=>f(!0),style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(F,{size:16})," Record Custom Time"]})]}),e.jsxs(V,{children:[e.jsxs(c,{$color:"#2563eb",children:[e.jsx("div",{className:"card-label",children:"Active Staff"}),e.jsx("div",{className:"card-val",children:(i==null?void 0:i.totalEmployees)||u.length||3})]}),e.jsxs(c,{$color:"#16a34a",children:[e.jsx("div",{className:"card-label",children:"Present Today"}),e.jsx("div",{className:"card-val",style:{color:"#16a34a"},children:(i==null?void 0:i.present)||0})]}),e.jsxs(c,{$color:"#d97706",children:[e.jsx("div",{className:"card-label",children:"Late Arrivals"}),e.jsx("div",{className:"card-val",style:{color:"#d97706"},children:(i==null?void 0:i.late)||0})]}),e.jsxs(c,{$color:"#dc2626",children:[e.jsx("div",{className:"card-label",children:"Absent"}),e.jsx("div",{className:"card-val",style:{color:"#dc2626"},children:(i==null?void 0:i.absent)||0})]}),e.jsxs(c,{$color:"#7c3aed",children:[e.jsx("div",{className:"card-label",children:"On Leave"}),e.jsx("div",{className:"card-val",style:{color:"#7c3aed"},children:(i==null?void 0:i.onLeave)||(i==null?void 0:i.leave)||0})]})]}),e.jsxs(Y,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{style:{fontSize:"0.82rem",fontWeight:600,color:"#334155"},children:"Select Date:"}),e.jsx("input",{type:"date",value:d,onChange:t=>z(t.target.value),style:{padding:"6px 10px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"}})]}),e.jsxs("div",{style:{fontSize:"0.8rem",color:"#64748b"},children:["Viewing roster for ",e.jsx("strong",{children:new Date(d).toDateString()})]})]}),e.jsxs(_,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Employee"}),e.jsx("th",{children:"Role / Designation"}),e.jsx("th",{children:"Check In"}),e.jsx("th",{children:"Check Out"}),e.jsx("th",{children:"Hours"}),e.jsx("th",{children:"Current Status"}),e.jsx("th",{children:"Quick Actions"})]})}),e.jsxs("tbody",{children:[T.map(({employee:t,record:n})=>e.jsxs("tr",{children:[e.jsxs("td",{style:{fontWeight:600},children:[e.jsx("div",{children:t.name||t.fullName||"Staff Member"}),e.jsxs("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:[t.employeeCode," • ",t.email]})]}),e.jsxs("td",{children:[e.jsx("div",{style:{fontWeight:600,fontSize:"0.78rem"},children:t.designation||"Sales Executive"}),e.jsx("div",{style:{fontSize:"0.7rem",color:"#64748b"},children:t.role||"SALES_EMPLOYEE"})]}),e.jsx("td",{children:n!=null&&n.checkInTime?new Date(n.checkInTime).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):n!=null&&n.checkIn?new Date(n.checkIn).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"-"}),e.jsx("td",{children:n!=null&&n.checkOutTime?new Date(n.checkOutTime).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):n!=null&&n.checkOut?new Date(n.checkOut).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"-"}),e.jsxs("td",{style:{fontWeight:600},children:[(n==null?void 0:n.workingHours)||(n==null?void 0:n.hoursWorked)||0," hrs"]}),e.jsx("td",{children:n?e.jsx(q,{$status:n.status,children:n.status}):e.jsx("span",{style:{fontSize:"0.72rem",color:"#94a3b8",background:"#f1f5f9",padding:"2px 6px",borderRadius:4},children:"Not Marked"})}),e.jsx("td",{children:e.jsxs("div",{style:{display:"flex",gap:6},children:[e.jsx("button",{onClick:()=>p(t.id,"PRESENT",!1),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:"#ebfbee",color:"#2b8a3e",border:"1px solid #b2f2bb",borderRadius:4,cursor:"pointer"},title:"Mark Present (On Time)",children:"✓ Present"}),e.jsx("button",{onClick:()=>p(t.id,"PRESENT",!0),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:"#fff9db",color:"#f59f00",border:"1px solid #ffe066",borderRadius:4,cursor:"pointer"},title:"Mark Late",children:"Late"}),e.jsx("button",{onClick:()=>p(t.id,"ABSENT",!1),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:"#fff5f5",color:"#e03131",border:"1px solid #ffc9c9",borderRadius:4,cursor:"pointer"},title:"Mark Absent",children:"Absent"}),e.jsx("button",{onClick:()=>p(t.id,"LEAVE",!1),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:"#f3f0ff",color:"#7950f2",border:"1px solid #d0bfff",borderRadius:4,cursor:"pointer"},title:"Mark Leave",children:"Leave"})]})})]},t.id)),T.length===0&&!L&&e.jsx("tr",{children:e.jsx("td",{colSpan:7,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No active staff found. Add employees in the Employee Directory."})})]})]}),D&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15, 23, 42, 0.7)",backdropFilter:"blur(3px)",zIndex:1e4,display:"flex",justifyContent:"center",alignItems:"center",padding:16},onClick:()=>f(!1),children:e.jsxs("div",{style:{background:"#fff",borderRadius:12,width:"100%",maxWidth:500,padding:24},onClick:t=>t.stopPropagation(),children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:700,margin:"0 0 16px 0"},children:"Manual Attendance Adjustment"}),e.jsxs("form",{onSubmit:H,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Select Employee"}),e.jsx("select",{value:h,onChange:t=>j(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},required:!0,children:u.map(t=>e.jsxs("option",{value:t.id,children:[t.fullName||t.name," (",t.employeeCode,")"]},t.id))})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Status"}),e.jsxs("select",{value:y,onChange:t=>M(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},children:[e.jsx("option",{value:"PRESENT",children:"PRESENT"}),e.jsx("option",{value:"ABSENT",children:"ABSENT"}),e.jsx("option",{value:"HALF_DAY",children:"HALF DAY"}),e.jsx("option",{value:"LEAVE",children:"ON LEAVE"})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Working Hours"}),e.jsx("input",{type:"number",step:"0.5",value:k,onChange:t=>P(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Check In"}),e.jsx("input",{type:"time",value:v,onChange:t=>I(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Check Out"}),e.jsx("input",{type:"time",value:S,onChange:t=>W(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("input",{type:"checkbox",id:"manualLateCheck",checked:E,onChange:t=>O(t.target.checked)}),e.jsx("label",{htmlFor:"manualLateCheck",style:{fontSize:"0.8rem",cursor:"pointer"},children:"Mark as Late Arrival"})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Reason / Audit Notes"}),e.jsx("input",{type:"text",value:w,onChange:t=>$(t.target.value),placeholder:"e.g. Approved leave / Fingerprint sensor offline",style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20},children:[e.jsx("button",{type:"button",onClick:()=>f(!1),style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6},children:"Cancel"}),e.jsx("button",{type:"submit",style:{padding:"8px 20px",background:"#0d1319",color:"#fff",border:"none",borderRadius:6},children:"Save Entry"})]})]})]})})]})};export{X as BusinessAttendancePage};
