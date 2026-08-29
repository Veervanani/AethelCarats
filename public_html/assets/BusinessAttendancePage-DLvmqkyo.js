import{r as a,j as e,P as O}from"./react-vendor-BXyx942q.js";import{g as i}from"./ui-vendor-VHkRGmvp.js";import{b as p}from"./businessApi-DwfDP9iJ.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-Bu8aELZV.js";import"./admin-tools-vendor-CKN5doRT.js";const $=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,H=i.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
`,o=i.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid ${({$color:s})=>s||"#0d1319"};
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
`,F=i.div`
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
`,B=i.table`
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
`,V=i.span`
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  ${({$status:s})=>{switch(s){case"PRESENT":return"background: #ebfbee; color: #2b8a3e; border: 1px solid #b2f2bb;";case"ABSENT":return"background: #fff5f5; color: #e03131; border: 1px solid #ffc9c9;";case"HALF_DAY":return"background: #fff9db; color: #f59f00; border: 1px solid #ffe066;";case"LEAVE":return"background: #f3f0ff; color: #7950f2; border: 1px solid #d0bfff;";default:return"background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1;"}}}
`,J=()=>{const[s,k]=a.useState(null),[u,w]=a.useState([]),[E,T]=a.useState([]),[r,A]=a.useState(new Date().toISOString().split("T")[0]),[C,h]=a.useState(!0),[N,c]=a.useState(!1),[x,f]=a.useState(""),[g,R]=a.useState("PRESENT"),[m,z]=a.useState("09:00"),[b,D]=a.useState("18:00"),[j,I]=a.useState("9"),[y,M]=a.useState(!1),[v,L]=a.useState(""),S=async()=>{h(!0);try{const[t,d,l]=await Promise.all([p.getTodayAttendanceSummary(),p.getAttendance({date:r}),p.getEmployees({status:"ACTIVE"})]);k(t),w(d.records||[]),T(l.employees||[]),l.employees&&l.employees.length>0&&!x&&f(l.employees[0].id)}catch(t){console.error(t)}finally{h(!1)}};a.useEffect(()=>{S()},[r]);const W=async t=>{var d,l;t.preventDefault();try{const n=new Date(`${r}T${m}:00Z`),P=new Date(`${r}T${b}:00Z`);await p.manualAttendanceEntry({employeeId:x,date:r,checkInTime:n,checkOutTime:P,workingHours:Number(j),status:g,lateStatus:y,notes:v}),c(!1),S(),alert("✅ Manual entry saved")}catch(n){alert(((l=(d=n==null?void 0:n.response)==null?void 0:d.data)==null?void 0:l.message)||"Failed to save")}};return e.jsxs("div",{children:[e.jsxs($,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Attendance Roster"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Daily check-in logs, punctuality tracking, and manual admin adjustments"})]}),e.jsxs("button",{onClick:()=>c(!0),style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(O,{size:16})," Record Manual Entry"]})]}),e.jsxs(H,{children:[e.jsxs(o,{$color:"#2563eb",children:[e.jsx("div",{className:"card-label",children:"Active Staff"}),e.jsx("div",{className:"card-val",children:(s==null?void 0:s.totalEmployees)||0})]}),e.jsxs(o,{$color:"#16a34a",children:[e.jsx("div",{className:"card-label",children:"Present Today"}),e.jsx("div",{className:"card-val",style:{color:"#16a34a"},children:(s==null?void 0:s.present)||0})]}),e.jsxs(o,{$color:"#d97706",children:[e.jsx("div",{className:"card-label",children:"Late Arrivals"}),e.jsx("div",{className:"card-val",style:{color:"#d97706"},children:(s==null?void 0:s.late)||0})]}),e.jsxs(o,{$color:"#dc2626",children:[e.jsx("div",{className:"card-label",children:"Absent / Unrecorded"}),e.jsx("div",{className:"card-val",style:{color:"#dc2626"},children:(s==null?void 0:s.absent)||0})]}),e.jsxs(o,{$color:"#7c3aed",children:[e.jsx("div",{className:"card-label",children:"On Leave"}),e.jsx("div",{className:"card-val",style:{color:"#7c3aed"},children:(s==null?void 0:s.leave)||0})]})]}),e.jsxs(F,{children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("span",{style:{fontSize:"0.82rem",fontWeight:600,color:"#334155"},children:"Select Date:"}),e.jsx("input",{type:"date",value:r,onChange:t=>A(t.target.value),style:{padding:"6px 10px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem"}})]}),e.jsxs("div",{style:{fontSize:"0.8rem",color:"#64748b"},children:["Viewing records for ",e.jsx("strong",{children:new Date(r).toDateString()})]})]}),e.jsxs(B,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Employee"}),e.jsx("th",{children:"Department"}),e.jsx("th",{children:"Check In"}),e.jsx("th",{children:"Check Out"}),e.jsx("th",{children:"Hours"}),e.jsx("th",{children:"Punctuality"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Notes"})]})}),e.jsxs("tbody",{children:[u.map(t=>{var d,l,n;return e.jsxs("tr",{children:[e.jsxs("td",{style:{fontWeight:600},children:[e.jsx("div",{children:((d=t.employee)==null?void 0:d.fullName)||"Staff Member"}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:(l=t.employee)==null?void 0:l.employeeCode})]}),e.jsx("td",{children:((n=t.employee)==null?void 0:n.department)||"Sales"}),e.jsx("td",{children:t.checkInTime?new Date(t.checkInTime).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"-"}),e.jsx("td",{children:t.checkOutTime?new Date(t.checkOutTime).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"-"}),e.jsxs("td",{style:{fontWeight:600},children:[t.workingHours||0," hrs"]}),e.jsx("td",{children:t.lateStatus?e.jsx("span",{style:{color:"#d97706",fontWeight:600},children:"⚠️ Late Arrival"}):e.jsx("span",{style:{color:"#16a34a"},children:"✓ On Time"})}),e.jsx("td",{children:e.jsx(V,{$status:t.status,children:t.status})}),e.jsxs("td",{style:{fontSize:"0.75rem",color:"#64748b"},children:[t.isManualEntry&&e.jsx("span",{style:{color:"#2563eb",fontWeight:600},children:"[Admin] "}),t.notes||"-"]})]},t.id)}),u.length===0&&!C&&e.jsx("tr",{children:e.jsx("td",{colSpan:8,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No attendance logs found for this date."})})]})]}),N&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15, 23, 42, 0.7)",backdropFilter:"blur(3px)",zIndex:1e4,display:"flex",justifyContent:"center",alignItems:"center",padding:16},onClick:()=>c(!1),children:e.jsxs("div",{style:{background:"#fff",borderRadius:12,width:"100%",maxWidth:500,padding:24},onClick:t=>t.stopPropagation(),children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:700,margin:"0 0 16px 0"},children:"Manual Attendance Adjustment"}),e.jsxs("form",{onSubmit:W,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Select Employee"}),e.jsx("select",{value:x,onChange:t=>f(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},required:!0,children:E.map(t=>e.jsxs("option",{value:t.id,children:[t.fullName," (",t.employeeCode,")"]},t.id))})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Status"}),e.jsxs("select",{value:g,onChange:t=>R(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},children:[e.jsx("option",{value:"PRESENT",children:"PRESENT"}),e.jsx("option",{value:"ABSENT",children:"ABSENT"}),e.jsx("option",{value:"HALF_DAY",children:"HALF DAY"}),e.jsx("option",{value:"LEAVE",children:"ON LEAVE"})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Working Hours"}),e.jsx("input",{type:"number",step:"0.5",value:j,onChange:t=>I(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Check In"}),e.jsx("input",{type:"time",value:m,onChange:t=>z(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Check Out"}),e.jsx("input",{type:"time",value:b,onChange:t=>D(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("input",{type:"checkbox",id:"manualLateCheck",checked:y,onChange:t=>M(t.target.checked)}),e.jsx("label",{htmlFor:"manualLateCheck",style:{fontSize:"0.8rem",cursor:"pointer"},children:"Mark as Late Arrival"})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Reason / Audit Notes"}),e.jsx("input",{type:"text",value:v,onChange:t=>L(t.target.value),placeholder:"e.g. Approved leave / Fingerprint sensor offline",style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20},children:[e.jsx("button",{type:"button",onClick:()=>c(!1),style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6},children:"Cancel"}),e.jsx("button",{type:"submit",style:{padding:"8px 20px",background:"#0d1319",color:"#fff",border:"none",borderRadius:6},children:"Save Entry"})]})]})]})})]})};export{J as BusinessAttendancePage};
