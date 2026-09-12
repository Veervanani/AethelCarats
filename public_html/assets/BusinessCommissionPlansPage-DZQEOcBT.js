import{r as t,j as e,f as C,ap as R,P as k}from"./react-vendor-BsBv4awM.js";import{g as d}from"./ui-vendor-C0FaE403.js";import{P as D}from"./admin-pages-DCCVRAkw.js";import{b as v}from"./businessApi-3mK8SaJ1.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const T=d.div`
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
`,N=d.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`,W=d.div`
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
`,O=()=>{var y,j;const[l,c]=t.useState([]),[I,p]=t.useState(!0),[S,o]=t.useState(!1),[m,f]=t.useState(""),[x,u]=t.useState(""),[g,w]=t.useState(!1),[r,h]=t.useState([{productType:"DIAMOND",commissionBasis:"NET_PROFIT",commissionRate:.05},{productType:"JEWELRY",commissionBasis:"NET_PROFIT",commissionRate:.06}]),b=async()=>{p(!0);try{const s=await v.getCommissionPlans();c(Array.isArray(s)?s:(s==null?void 0:s.plans)||[])}catch(s){console.error(s),c([])}finally{p(!1)}};t.useEffect(()=>{b()},[]);const P=async s=>{var i,a;s.preventDefault();try{await v.createCommissionPlan({name:m,description:x,isDefault:g,rules:r}),o(!1),f(""),u(""),b(),alert("✅ Plan created successfully")}catch(n){alert(((a=(i=n==null?void 0:n.response)==null?void 0:i.data)==null?void 0:a.message)||"Failed to create plan")}};return e.jsxs("div",{children:[e.jsxs(T,{children:[e.jsxs("div",{children:[e.jsxs(C,{to:`${D}/commissions`,style:{display:"inline-flex",alignItems:"center",gap:6,fontSize:"0.8rem",color:"#64748b",textDecoration:"none",marginBottom:6},children:[e.jsx(R,{size:14})," Back to Commissions"]}),e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Commission Plans & Rules"})]}),e.jsxs("button",{onClick:()=>o(!0),style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(k,{size:16})," Create Commission Plan"]})]}),e.jsx(N,{children:l.map(s=>{var i,a;return e.jsxs(W,{$isDefault:s.isDefault,children:[e.jsxs("div",{className:"plan-header",children:[e.jsx("div",{className:"plan-name",children:s.name}),s.isDefault&&e.jsx("span",{style:{fontSize:"0.68rem",fontWeight:700,padding:"2px 6px",background:"#fef3c7",color:"#b45309",borderRadius:4},children:"DEFAULT"})]}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"0 0 10px 0"},children:s.description||"Standard atelier commission plan"}),e.jsx("div",{style:{fontSize:"0.75rem",fontWeight:700,color:"#475569",textTransform:"uppercase"},children:"Rules"}),e.jsx("div",{className:"rule-list",children:(i=s.rules)==null?void 0:i.map((n,z)=>e.jsxs("div",{className:"rule-item",children:[e.jsxs("span",{children:[n.productType," (",n.commissionBasis,"):"]}),e.jsxs("strong",{children:[(n.commissionRate*100).toFixed(1),"%"]})]},z))}),e.jsxs("div",{style:{fontSize:"0.72rem",color:"#64748b",marginTop:14},children:["Assigned to ",e.jsx("strong",{children:((a=s._count)==null?void 0:a.employees)||0})," staff members"]})]},s.id)})}),S&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15, 23, 42, 0.7)",backdropFilter:"blur(3px)",zIndex:1e4,display:"flex",justifyContent:"center",alignItems:"center",padding:10,boxSizing:"border-box"},onClick:()=>o(!1),children:e.jsxs("div",{style:{background:"#fff",borderRadius:12,width:"100%",maxWidth:540,maxHeight:"92vh",overflowY:"auto",overflowX:"hidden",padding:20,boxSizing:"border-box"},onClick:s=>s.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"nowrap",gap:10,width:"100%",boxSizing:"border-box"},children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:800,color:"#0f172a",margin:0,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:"Create Commission Plan"}),e.jsx("button",{type:"button",onClick:()=>o(!1),style:{background:"#f1f5f9",border:"none",borderRadius:6,width:32,height:32,minWidth:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"1rem",color:"#64748b",flexShrink:0},children:"✕"})]}),e.jsxs("form",{onSubmit:P,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Plan Name *"}),e.jsx("input",{type:"text",value:m,onChange:s=>f(s.target.value),placeholder:"e.g. Senior Diamond Executive Plan",style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6},required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600},children:"Description"}),e.jsx("input",{type:"text",value:x,onChange:s=>u(s.target.value),style:{width:"100%",padding:"8px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("input",{type:"checkbox",id:"isDefPlan",checked:g,onChange:s=>w(s.target.checked)}),e.jsx("label",{htmlFor:"isDefPlan",style:{fontSize:"0.8rem",cursor:"pointer"},children:"Set as Default Plan for New Employees"})]}),e.jsxs("div",{style:{borderTop:"1px solid #e2e8f0",paddingTop:12},children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:700,textTransform:"uppercase"},children:"Plan Rates"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:8},children:[e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600},children:"Diamond Net Profit %"}),e.jsx("input",{type:"number",step:"0.005",value:((y=r[0])==null?void 0:y.commissionRate)||.05,onChange:s=>{const i=[...r];i[0].commissionRate=Number(s.target.value),h(i)},style:{width:"100%",padding:"6px",border:"1px solid #cbd5e1",borderRadius:6}})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600},children:"Jewelry Net Profit %"}),e.jsx("input",{type:"number",step:"0.005",value:((j=r[1])==null?void 0:j.commissionRate)||.06,onChange:s=>{const i=[...r];i[1].commissionRate=Number(s.target.value),h(i)},style:{width:"100%",padding:"6px",border:"1px solid #cbd5e1",borderRadius:6}})]})]})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:20},children:[e.jsx("button",{type:"button",onClick:()=>o(!1),style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#fff",borderRadius:6},children:"Cancel"}),e.jsx("button",{type:"submit",style:{padding:"8px 20px",background:"#0d1319",color:"#fff",border:"none",borderRadius:6},children:"Save Plan"})]})]})]})})]})};export{O as BusinessCommissionPlansPage};
