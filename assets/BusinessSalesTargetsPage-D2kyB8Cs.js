import{r as a,j as e,P as N}from"./react-vendor-BXyx942q.js";import{g as c}from"./ui-vendor-VHkRGmvp.js";import{b as p}from"./businessApi-Bdm5aIM4.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-BBG06x5T.js";import"./admin-tools-vendor-CKN5doRT.js";const k=c.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,z=c.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
`,M=c.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  .emp-name {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
  }
  .period-badge {
    font-size: 0.68rem;
    font-weight: 700;
    padding: 2px 6px;
    background: #f1f5f9;
    color: #475569;
    border-radius: 4px;
  }
  .progress-bar-container {
    height: 10px;
    background: #f1f5f9;
    border-radius: 5px;
    overflow: hidden;
    margin: 12px 0;
  }
  .progress-fill {
    height: 100%;
    background: #2563eb;
    transition: width 0.3s ease;
  }
`,L=()=>{const[o,g]=a.useState([]),[y,m]=a.useState([]),[j,u]=a.useState(!0),[v,d]=a.useState(!1),[l,x]=a.useState(""),[f,S]=a.useState("50000"),[T,P]=a.useState("MONTHLY"),[i,w]=a.useState("2026"),[h,C]=a.useState("8"),b=async()=>{u(!0);try{const[r,t]=await Promise.all([p.getTargets({year:i}),p.getEmployees({status:"ACTIVE"})]),n=Array.isArray(r)?r:(r==null?void 0:r.targets)||[],s=Array.isArray(t)?t:(t==null?void 0:t.employees)||[];g(n),m(s),s.length>0&&!l&&x(s[0].id)}catch(r){console.error(r),g([]),m([])}finally{u(!1)}};a.useEffect(()=>{b()},[i]);const A=async r=>{var t,n;r.preventDefault();try{await p.createTarget({employeeId:l,periodType:T,periodYear:Number(i),periodMonth:Number(h),targetAmount:Number(f)}),d(!1),b(),alert("✅ Sales target established")}catch(s){alert(((n=(t=s==null?void 0:s.response)==null?void 0:t.data)==null?void 0:n.message)||"Failed to save target")}};return e.jsxs("div",{children:[e.jsxs(k,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Sales Targets & Quotas"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Set monthly quota targets and track live progress against closed revenue"})]}),e.jsxs("button",{onClick:()=>d(!0),style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(N,{size:16})," Set Quota Target"]})]}),e.jsxs(z,{children:[Array.isArray(o)&&o.map(r=>{var t,n,s;return e.jsxs(M,{children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{children:[e.jsx("div",{className:"emp-name",children:((t=r.employee)==null?void 0:t.fullName)||((n=r.employee)==null?void 0:n.name)||r.employeeName||"Staff Member"}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:((s=r.employee)==null?void 0:s.employeeCode)||"-"})]}),e.jsxs("span",{className:"period-badge",children:[r.periodType||"MONTHLY"," ",r.periodMonth?`(M${r.periodMonth}/${r.periodYear||i})`:r.periodYear||i]})]}),e.jsx("div",{className:"progress-bar-container",children:e.jsx("div",{className:"progress-fill",style:{width:`${Math.min(100,r.achievementPercent||0)}%`,background:(r.achievementPercent||0)>=100?"#16a34a":"#2563eb"}})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.82rem",fontWeight:700},children:[e.jsxs("span",{children:["Achieved: $",(Number(r.actualSales)||0).toLocaleString()]}),e.jsxs("span",{children:["Quota: $",(Number(r.targetAmount)||0).toLocaleString()]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",color:"#64748b",marginTop:8},children:[e.jsxs("span",{children:["Achievement: ",r.achievementPercent||0,"%"]}),e.jsxs("span",{children:[r.orderCount||0," Orders"]}),e.jsxs("span",{children:["Remaining: $",(Number(r.remaining)||Math.max(0,(Number(r.targetAmount)||0)-(Number(r.actualSales)||0))).toLocaleString()]})]})]},r.id)}),(!Array.isArray(o)||o.length===0)&&!j&&e.jsxs("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px",background:"#fff",borderRadius:8,color:"#94a3b8"},children:["No quotas established for ",i,'. Click "Set Quota Target" to configure targets.']})]}),v&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15, 23, 42, 0.7)",backdropFilter:"blur(3px)",zIndex:1e4,display:"flex",justifyContent:"center",alignItems:"center",padding:16},onClick:()=>d(!1),children:e.jsxs("div",{style:{background:"#fff",borderRadius:12,width:"100%",maxWidth:480,padding:24},onClick:r=>r.stopPropagation(),children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:700,margin:"0 0 16px 0"},children:"Set Employee Sales Quota"}),e.jsxs("form",{onSubmit:A,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Employee *"}),e.jsx("select",{value:l,onChange:r=>x(r.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},required:!0,children:y.map(r=>e.jsxs("option",{value:r.id,children:[r.fullName||r.name," (",r.employeeCode,")"]},r.id))})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Period Year"}),e.jsx("input",{type:"number",value:i,onChange:r=>w(r.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Month (1 - 12)"}),e.jsx("input",{type:"number",min:"1",max:"12",value:h,onChange:r=>C(r.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Target Amount ($) *"}),e.jsx("input",{type:"number",value:f,onChange:r=>S(r.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},required:!0})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20},children:[e.jsx("button",{type:"button",onClick:()=>d(!1),style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6},children:"Cancel"}),e.jsx("button",{type:"submit",style:{padding:"8px 20px",background:"#0d1319",color:"#fff",border:"none",borderRadius:6},children:"Save Quota Target"})]})]})]})})]})};export{L as BusinessSalesTargetsPage};
