import{r as n,j as e,P as $,bg as Y,Z as D,h as B,aP as F,ad as I}from"./react-vendor-DxLkccZ0.js";import{g as x}from"./ui-vendor-BuBsKREC.js";import{b as m}from"./businessApi-CEPea6U7.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-CJSUgSee.js";import"./admin-tools-vendor-CKN5doRT.js";const O=x.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,G=x.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
`,g=x.div`
  background: #ffffff;
  border: 1px solid ${({$highlight:o})=>o?"#0d1319":"#e2e8f0"};
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  .label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.04em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .val {
    font-size: 1.45rem;
    font-weight: 800;
    color: #0f172a;
    margin-top: 6px;
  }

  .sub {
    font-size: 0.72rem;
    color: #64748b;
    margin-top: 4px;
  }
`,E=x.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
`,H=x.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 14px;
  }

  .month-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: #0f172a;
  }

  .period-badge {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 3px 8px;
    background: #f1f5f9;
    color: #334155;
    border-radius: 6px;
  }

  .progress-bar-container {
    height: 10px;
    background: #f1f5f9;
    border-radius: 5px;
    overflow: hidden;
    margin: 14px 0;
  }

  .progress-fill {
    height: 100%;
    transition: width 0.4s ease;
  }
`,w=["January","February","March","April","May","June","July","August","September","October","November","December"],c=o=>(Number(o)||0).toLocaleString(),Z=()=>{const[o,b]=n.useState([]),[N,y]=n.useState(!0),[C,p]=n.useState(!1),[i,j]=n.useState("2026"),[v,z]=n.useState("8"),[S,k]=n.useState("50000"),[T,M]=n.useState("Company Monthly Sales Target"),u=async()=>{y(!0);try{const r=await m.getTargets({year:i}),t=Array.isArray(r)?r:(r==null?void 0:r.targets)||[];b(t)}catch(r){console.error(r),b([])}finally{y(!1)}};n.useEffect(()=>{u()},[i]);const A=async r=>{var t,s;r.preventDefault();try{await m.createTarget({periodType:"MONTHLY",periodYear:Number(i),periodMonth:Number(v),targetAmount:Number(S),notes:T}),p(!1),u(),alert("✅ Company monthly sales target established successfully.")}catch(a){alert(((s=(t=a==null?void 0:a.response)==null?void 0:t.data)==null?void 0:s.message)||"Failed to save target")}},R=async(r,t)=>{var s,a;if(window.confirm(`⚠️ Are you sure you want to remove target for ${t}?`))try{await m.deleteTarget(r),u(),alert("✅ Target removed.")}catch(l){alert(((a=(s=l==null?void 0:l.response)==null?void 0:s.data)==null?void 0:a.message)||"Failed to delete target")}},f=o.reduce((r,t)=>r+(Number(t.targetAmount)||0),0),h=o.reduce((r,t)=>r+(Number(t.actualRevenue||t.actualSales)||0),0),P=o.reduce((r,t)=>r+(Number(t.netProfit)||0),0),W=o.reduce((r,t)=>r+(Number(t.orderCount)||0),0);return e.jsxs("div",{children:[e.jsxs(O,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Company Monthly Sales Targets"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Set monthly business revenue targets and track organization-wide fulfillment across closed deals"})]}),e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[e.jsxs("select",{value:i,onChange:r=>j(r.target.value),style:{padding:"8px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem",fontWeight:600,background:"#ffffff",cursor:"pointer"},children:[e.jsx("option",{value:"2025",children:"Year 2025"}),e.jsx("option",{value:"2026",children:"Year 2026"}),e.jsx("option",{value:"2027",children:"Year 2027"})]}),e.jsxs("button",{onClick:()=>p(!0),style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx($,{size:16})," Set Monthly Target"]})]})]}),e.jsxs(G,{children:[e.jsxs(g,{children:[e.jsxs("div",{className:"label",children:[e.jsx("span",{children:"Configured Targets"}),e.jsx(Y,{size:15,color:"#2563eb"})]}),e.jsxs("div",{className:"val",children:["$",c(f)]}),e.jsxs("div",{className:"sub",children:[o.length," monthly quotas"]})]}),e.jsxs(g,{$highlight:!0,children:[e.jsxs("div",{className:"label",children:[e.jsx("span",{children:"Billed Revenue"}),e.jsx(D,{size:15,color:"#0f172a"})]}),e.jsxs("div",{className:"val",children:["$",c(h)]}),e.jsxs("div",{className:"sub",children:[W," invoiced transactions"]})]}),e.jsxs(g,{children:[e.jsxs("div",{className:"label",children:[e.jsx("span",{children:"Net Profit Generated"}),e.jsx(B,{size:15,color:"#16a34a"})]}),e.jsxs("div",{className:"val",style:{color:"#16a34a"},children:["$",c(P)]}),e.jsx("div",{className:"sub",children:"Company gross margin"})]}),e.jsxs(g,{children:[e.jsxs("div",{className:"label",children:[e.jsx("span",{children:"Overall Fulfillment"}),e.jsx(F,{size:15,color:"#d97706"})]}),e.jsxs("div",{className:"val",style:{color:f>0&&h>=f?"#16a34a":"#2563eb"},children:[f>0?(h/f*100).toFixed(1):0,"%"]}),e.jsx("div",{className:"sub",children:"Progress toward annual quota"})]})]}),e.jsxs(E,{children:[o.map(r=>{const t=r.monthName||w[(r.periodMonth||8)-1]||"Month",s=Number(r.actualRevenue||r.actualSales)||0,a=Number(r.targetAmount)||0,l=a>0?Math.min(100,Math.round(s/a*100)):0,d=s>=a&&a>0;return e.jsxs(H,{children:[e.jsxs("div",{children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"month-title",children:[t," ",r.periodYear]}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b",marginTop:2},children:r.notes||"Company Target"})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"0.7rem",fontWeight:700,padding:"3px 8px",borderRadius:6,background:d?"#ebfbee":s>0?"#eff6ff":"#f8fafc",color:d?"#2b8a3e":s>0?"#1d4ed8":"#64748b",border:d?"1px solid #b2f2bb":s>0?"1px solid #bfdbfe":"1px solid #e2e8f0"},children:d?"🟢 Achieved":s>0?"🔵 In Progress":"🟡 Pending"}),e.jsx("button",{onClick:()=>R(r.id,`${t} ${r.periodYear}`),style:{background:"#fff1f2",border:"1px solid #fecdd3",color:"#e11d48",borderRadius:5,padding:"4px 6px",cursor:"pointer"},title:"Delete Target",children:e.jsx(I,{size:13})})]})]}),e.jsx("div",{className:"progress-bar-container",children:e.jsx("div",{className:"progress-fill",style:{width:`${l}%`,background:d?"#16a34a":"#2563eb"}})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.86rem",fontWeight:800},children:[e.jsxs("span",{style:{color:"#0f172a"},children:["Achieved: $",c(s)]}),e.jsxs("span",{style:{color:"#64748b"},children:["Target: $",c(a)]})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.74rem",color:"#64748b",marginTop:16,paddingTop:12,borderTop:"1px solid #f1f5f9"},children:[e.jsxs("span",{children:["Fulfillment: ",e.jsxs("strong",{style:{color:d?"#16a34a":"#0f172a"},children:[l,"%"]})]}),e.jsxs("span",{children:[r.orderCount||0," Orders"]}),e.jsxs("span",{children:["Remaining: ",e.jsxs("strong",{children:["$",c(Math.max(0,a-s))]})]})]})]},r.id)}),o.length===0&&!N&&e.jsxs("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"48px 24px",background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:12,color:"#94a3b8"},children:["No company monthly targets configured for ",i,'. Click "Set Monthly Target" to establish goals.']})]}),C&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15, 23, 42, 0.7)",backdropFilter:"blur(3px)",zIndex:1e4,display:"flex",justifyContent:"center",alignItems:"center",padding:16},onClick:()=>p(!1),children:e.jsxs("div",{style:{background:"#ffffff",borderRadius:12,width:"100%",maxWidth:480,padding:24,boxShadow:"0 20px 25px -5px rgba(0,0,0,0.1)"},onClick:r=>r.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:800,color:"#0f172a",margin:0},children:"Set Company Monthly Target"}),e.jsx("button",{onClick:()=>p(!1),style:{background:"none",border:"none",cursor:"pointer",fontSize:"1.1rem"},children:"✕"})]}),e.jsxs("form",{onSubmit:A,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600,color:"#334155",display:"block",marginBottom:4},children:"Target Year"}),e.jsxs("select",{value:i,onChange:r=>j(r.target.value),style:{width:"100%",padding:"8px 10px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.84rem"},children:[e.jsx("option",{value:"2025",children:"2025"}),e.jsx("option",{value:"2026",children:"2026"}),e.jsx("option",{value:"2027",children:"2027"})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600,color:"#334155",display:"block",marginBottom:4},children:"Target Month"}),e.jsx("select",{value:v,onChange:r=>z(r.target.value),style:{width:"100%",padding:"8px 10px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.84rem"},children:w.map((r,t)=>e.jsx("option",{value:t+1,children:r},t+1))})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600,color:"#334155",display:"block",marginBottom:4},children:"Company Revenue Target ($ USD) *"}),e.jsx("input",{type:"number",value:S,onChange:r=>k(r.target.value),style:{width:"100%",padding:"8px 10px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.84rem",boxSizing:"border-box"},required:!0,placeholder:"e.g. 50000"})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600,color:"#334155",display:"block",marginBottom:4},children:"Target Description / Goal Notes"}),e.jsx("input",{type:"text",value:T,onChange:r=>M(r.target.value),style:{width:"100%",padding:"8px 10px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.84rem",boxSizing:"border-box"},placeholder:"e.g. Q3 High Atelier & Diamond Sales Quota"})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:24},children:[e.jsx("button",{type:"button",onClick:()=>p(!1),style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#ffffff",borderRadius:6,fontWeight:600,cursor:"pointer"},children:"Cancel"}),e.jsx("button",{type:"submit",style:{padding:"8px 20px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:700,cursor:"pointer"},children:"Save Company Target"})]})]})]})})]})};export{Z as BusinessSalesTargetsPage};
