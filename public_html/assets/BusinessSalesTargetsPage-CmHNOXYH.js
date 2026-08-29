import{r as s,j as e,P as z}from"./react-vendor-BXyx942q.js";import{g as p}from"./ui-vendor-VHkRGmvp.js";import{b as l}from"./businessApi-Bwmqiw23.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-B_GOVOBv.js";import"./admin-tools-vendor-CKN5doRT.js";const P=p.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,R=p.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
`,N=p.div`
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
`,Q=()=>{const[c,h]=s.useState([]),[b,y]=s.useState([]),[j,g]=s.useState(!0),[v,n]=s.useState(!1),[o,x]=s.useState(""),[u,S]=s.useState("50000"),[C,M]=s.useState("MONTHLY"),[a,T]=s.useState("2026"),[m,w]=s.useState("8"),f=async()=>{g(!0);try{const[t,r]=await Promise.all([l.getTargets({year:a}),l.getEmployees({status:"ACTIVE"})]);h(t||[]),y(r.employees||[]),r.employees&&r.employees.length>0&&!o&&x(r.employees[0].id)}catch(t){console.error(t)}finally{g(!1)}};s.useEffect(()=>{f()},[a]);const k=async t=>{var r,i;t.preventDefault();try{await l.createTarget({employeeId:o,periodType:C,periodYear:Number(a),periodMonth:Number(m),targetAmount:Number(u)}),n(!1),f(),alert("✅ Sales target established")}catch(d){alert(((i=(r=d==null?void 0:d.response)==null?void 0:r.data)==null?void 0:i.message)||"Failed to save target")}};return e.jsxs("div",{children:[e.jsxs(P,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Sales Targets & Quotas"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Set monthly quota targets and track live progress against closed revenue"})]}),e.jsxs("button",{onClick:()=>n(!0),style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(z,{size:16})," Set Quota Target"]})]}),e.jsxs(R,{children:[c.map(t=>{var r,i;return e.jsxs(N,{children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{children:[e.jsx("div",{className:"emp-name",children:(r=t.employee)==null?void 0:r.fullName}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b"},children:(i=t.employee)==null?void 0:i.employeeCode})]}),e.jsxs("span",{className:"period-badge",children:[t.periodType," ",t.periodMonth?`(M${t.periodMonth}/${t.periodYear})`:t.periodYear]})]}),e.jsx("div",{className:"progress-bar-container",children:e.jsx("div",{className:"progress-fill",style:{width:`${Math.min(100,t.achievementPercent||0)}%`,background:(t.achievementPercent||0)>=100?"#16a34a":"#2563eb"}})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.82rem",fontWeight:700},children:[e.jsxs("span",{children:["Achieved: $",(t.actualSales||0).toLocaleString()]}),e.jsxs("span",{children:["Quota: $",t.targetAmount.toLocaleString()]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",color:"#64748b",marginTop:8},children:[e.jsxs("span",{children:["Achievement: ",t.achievementPercent||0,"%"]}),e.jsxs("span",{children:[t.orderCount||0," Orders"]}),e.jsxs("span",{children:["Remaining: $",(t.remaining||0).toLocaleString()]})]})]},t.id)}),c.length===0&&!j&&e.jsxs("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"40px",background:"#fff",borderRadius:8,color:"#94a3b8"},children:["No quotas established for ",a,'. Click "Set Quota Target" to configure targets.']})]}),v&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15, 23, 42, 0.7)",backdropFilter:"blur(3px)",zIndex:1e4,display:"flex",justifyContent:"center",alignItems:"center",padding:16},onClick:()=>n(!1),children:e.jsxs("div",{style:{background:"#fff",borderRadius:12,width:"100%",maxWidth:480,padding:24},onClick:t=>t.stopPropagation(),children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:700,margin:"0 0 16px 0"},children:"Set Employee Sales Quota"}),e.jsxs("form",{onSubmit:k,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Employee *"}),e.jsx("select",{value:o,onChange:t=>x(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},required:!0,children:b.map(t=>e.jsxs("option",{value:t.id,children:[t.fullName||t.name," (",t.employeeCode,")"]},t.id))})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Period Year"}),e.jsx("input",{type:"number",value:a,onChange:t=>T(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Month (1 - 12)"}),e.jsx("input",{type:"number",min:"1",max:"12",value:m,onChange:t=>w(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Target Amount ($) *"}),e.jsx("input",{type:"number",value:u,onChange:t=>S(t.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},required:!0})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20},children:[e.jsx("button",{type:"button",onClick:()=>n(!1),style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6},children:"Cancel"}),e.jsx("button",{type:"submit",style:{padding:"8px 20px",background:"#0d1319",color:"#fff",border:"none",borderRadius:6},children:"Save Quota Target"})]})]})]})})]})};export{Q as BusinessSalesTargetsPage};
