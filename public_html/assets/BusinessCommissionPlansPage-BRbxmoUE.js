import{r as i,j as e,f as z,aq as k,P as D}from"./react-vendor-BXyx942q.js";import{g as d}from"./ui-vendor-VHkRGmvp.js";import{P as T}from"./admin-pages-Bt6HuqhS.js";import{b as j}from"./businessApi-DVdz7WMn.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const w=d.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`,N=d.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
`,E=d.div`
  background: #ffffff;
  border: 1px solid ${({$isDefault:l})=>l?"#e2b96f":"#e2e8f0"};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  position: relative;

  .plan-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .plan-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: #0f172a;
  }
  .rule-list {
    margin-top: 14px;
    border-top: 1px solid #f1f5f9;
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .rule-item {
    font-size: 0.8rem;
    display: flex;
    justify-content: space-between;
    padding: 4px 8px;
    background: #f8fafc;
    border-radius: 4px;
  }
`,M=()=>{var b,y;const[l,v]=i.useState([]),[W,c]=i.useState(!0),[P,r]=i.useState(!1),[p,m]=i.useState(""),[f,x]=i.useState(""),[u,S]=i.useState(!1),[o,g]=i.useState([{productType:"DIAMOND",commissionBasis:"NET_PROFIT",commissionRate:.05},{productType:"JEWELRY",commissionBasis:"NET_PROFIT",commissionRate:.06}]),h=async()=>{c(!0);try{const s=await j.getCommissionPlans();v(s||[])}catch(s){console.error(s)}finally{c(!1)}};i.useEffect(()=>{h()},[]);const R=async s=>{var t,a;s.preventDefault();try{await j.createCommissionPlan({name:p,description:f,isDefault:u,rules:o}),r(!1),m(""),x(""),h(),alert("✅ Plan created successfully")}catch(n){alert(((a=(t=n==null?void 0:n.response)==null?void 0:t.data)==null?void 0:a.message)||"Failed to create plan")}};return e.jsxs("div",{children:[e.jsxs(w,{children:[e.jsxs("div",{children:[e.jsxs(z,{to:`${T}/commissions`,style:{display:"inline-flex",alignItems:"center",gap:6,fontSize:"0.8rem",color:"#64748b",textDecoration:"none",marginBottom:6},children:[e.jsx(k,{size:14})," Back to Commissions"]}),e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Commission Plans & Rules"})]}),e.jsxs("button",{onClick:()=>r(!0),style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(D,{size:16})," Create Commission Plan"]})]}),e.jsx(N,{children:l.map(s=>{var t,a;return e.jsxs(E,{$isDefault:s.isDefault,children:[e.jsxs("div",{className:"plan-header",children:[e.jsx("div",{className:"plan-name",children:s.name}),s.isDefault&&e.jsx("span",{style:{fontSize:"0.68rem",fontWeight:700,padding:"2px 6px",background:"#fef3c7",color:"#b45309",borderRadius:4},children:"DEFAULT"})]}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"0 0 10px 0"},children:s.description||"Standard atelier commission plan"}),e.jsx("div",{style:{fontSize:"0.75rem",fontWeight:700,color:"#475569",textTransform:"uppercase"},children:"Rules"}),e.jsx("div",{className:"rule-list",children:(t=s.rules)==null?void 0:t.map((n,C)=>e.jsxs("div",{className:"rule-item",children:[e.jsxs("span",{children:[n.productType," (",n.commissionBasis,"):"]}),e.jsxs("strong",{children:[(n.commissionRate*100).toFixed(1),"%"]})]},C))}),e.jsxs("div",{style:{fontSize:"0.72rem",color:"#64748b",marginTop:14},children:["Assigned to ",e.jsx("strong",{children:((a=s._count)==null?void 0:a.employees)||0})," staff members"]})]},s.id)})}),P&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15, 23, 42, 0.7)",backdropFilter:"blur(3px)",zIndex:1e4,display:"flex",justifyContent:"center",alignItems:"center",padding:16},onClick:()=>r(!1),children:e.jsxs("div",{style:{background:"#fff",borderRadius:12,width:"100%",maxWidth:540,padding:24},onClick:s=>s.stopPropagation(),children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:700,margin:"0 0 16px 0"},children:"Create Commission Plan"}),e.jsxs("form",{onSubmit:R,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Plan Name *"}),e.jsx("input",{type:"text",value:p,onChange:s=>m(s.target.value),placeholder:"e.g. Senior Diamond Executive Plan",style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Description"}),e.jsx("input",{type:"text",value:f,onChange:s=>x(s.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("input",{type:"checkbox",id:"isDefPlan",checked:u,onChange:s=>S(s.target.checked)}),e.jsx("label",{htmlFor:"isDefPlan",style:{fontSize:"0.8rem",cursor:"pointer"},children:"Set as Default Plan for New Employees"})]}),e.jsxs("div",{style:{borderTop:"1px solid #e2e8f0",paddingTop:12},children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:700,textTransform:"uppercase"},children:"Plan Rates"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:8},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600},children:"Diamond Net Profit %"}),e.jsx("input",{type:"number",step:"0.005",value:((b=o[0])==null?void 0:b.commissionRate)||.05,onChange:s=>{const t=[...o];t[0].commissionRate=Number(s.target.value),g(t)},style:{width:"100%",padding:"6px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600},children:"Jewelry Net Profit %"}),e.jsx("input",{type:"number",step:"0.005",value:((y=o[1])==null?void 0:y.commissionRate)||.06,onChange:s=>{const t=[...o];t[1].commissionRate=Number(s.target.value),g(t)},style:{width:"100%",padding:"6px",border:"1px solid #cbd5e1",borderRadius:6}})]})]})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20},children:[e.jsx("button",{type:"button",onClick:()=>r(!1),style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6},children:"Cancel"}),e.jsx("button",{type:"submit",style:{padding:"8px 20px",background:"#0d1319",color:"#fff",border:"none",borderRadius:6},children:"Save Plan"})]})]})]})})]})};export{M as BusinessCommissionPlansPage};
