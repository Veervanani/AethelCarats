import{r as n,j as e,P as O,bc as E,W as B,g as F,x as G,ah as H,af as q}from"./react-vendor-CKfE40gi.js";import{g}from"./ui-vendor-5voluciG.js";import{b as T}from"./businessApi-zZhXMeDi.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-pages-CLj1E1WA.js";import"./admin-tools-vendor-CKN5doRT.js";const J=g.div`
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
`,L=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
`,m=g.div`
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
`,Q=g.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
`,U=g.div`
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
`,M=["January","February","March","April","May","June","July","August","September","October","November","December"],p=o=>(Number(o)||0).toLocaleString(),te=()=>{const[o,u]=n.useState([]),[R,C]=n.useState(!0),[A,c]=n.useState(!1),[b,y]=n.useState(null),[i,x]=n.useState("2026"),[z,j]=n.useState("8"),[N,v]=n.useState("50000"),[k,S]=n.useState("Company Monthly Sales Target"),h=async()=>{C(!0);try{const t=await T.getTargets({year:i}),r=Array.isArray(t)?t:(t==null?void 0:t.targets)||[];u(r)}catch(t){console.error(t),u([])}finally{C(!1)}};n.useEffect(()=>{h()},[i]);const W=()=>{y(null),x(i||"2026"),j(String(new Date().getMonth()+1)),v(""),S("Company Monthly Sales Target"),c(!0)},P=t=>{y(t),x(String(t.periodYear||i)),j(String(t.periodMonth||8)),v(String(t.targetAmount||"")),S(t.notes||"Company Monthly Sales Target"),c(!0)},$=async t=>{var r,s;t.preventDefault();try{await T.createTarget({periodType:"MONTHLY",periodYear:Number(i),periodMonth:Number(z),targetAmount:Number(N),notes:k}),c(!1),y(null),await h(),alert(b?"✅ Company monthly target updated successfully.":"✅ Company monthly target saved successfully.")}catch(a){alert(((s=(r=a==null?void 0:a.response)==null?void 0:r.data)==null?void 0:s.message)||"Failed to save target")}},Y=async(t,r)=>{var s,a;if(window.confirm(`⚠️ Are you sure you want to remove target for ${r}?`))try{u(l=>l.filter(d=>d.id!==t)),await T.deleteTarget(t),await h(),alert("✅ Target removed.")}catch(l){alert(((a=(s=l==null?void 0:l.response)==null?void 0:s.data)==null?void 0:a.message)||"Failed to delete target"),h()}},f=o.reduce((t,r)=>t+(Number(r.targetAmount)||0),0),w=o.reduce((t,r)=>t+(Number(r.actualRevenue||r.actualSales)||0),0),D=o.reduce((t,r)=>t+(Number(r.netProfit)||0),0),I=o.reduce((t,r)=>t+(Number(r.orderCount)||0),0);return e.jsxs("div",{children:[e.jsxs(J,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Company Monthly Sales Targets"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Set monthly business revenue targets and track organization-wide fulfillment across closed deals"})]}),e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[e.jsxs("select",{value:i,onChange:t=>x(t.target.value),style:{padding:"8px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem",fontWeight:600,background:"#ffffff",cursor:"pointer"},children:[e.jsx("option",{value:"2025",children:"Year 2025"}),e.jsx("option",{value:"2026",children:"Year 2026"}),e.jsx("option",{value:"2027",children:"Year 2027"})]}),e.jsxs("button",{onClick:W,style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(O,{size:16})," Set Monthly Target"]})]})]}),e.jsxs(L,{children:[e.jsxs(m,{children:[e.jsxs("div",{className:"label",children:[e.jsx("span",{children:"Configured Targets"}),e.jsx(E,{size:15,color:"#2563eb"})]}),e.jsxs("div",{className:"val",children:["$",p(f)]}),e.jsxs("div",{className:"sub",children:[o.length," monthly quotas"]})]}),e.jsxs(m,{$highlight:!0,children:[e.jsxs("div",{className:"label",children:[e.jsx("span",{children:"Billed Revenue"}),e.jsx(B,{size:15,color:"#0f172a"})]}),e.jsxs("div",{className:"val",children:["$",p(w)]}),e.jsxs("div",{className:"sub",children:[I," invoiced transactions"]})]}),e.jsxs(m,{children:[e.jsxs("div",{className:"label",children:[e.jsx("span",{children:"Net Profit Generated"}),e.jsx(F,{size:15,color:"#16a34a"})]}),e.jsxs("div",{className:"val",style:{color:"#16a34a"},children:["$",p(D)]}),e.jsx("div",{className:"sub",children:"Company gross margin"})]}),e.jsxs(m,{children:[e.jsxs("div",{className:"label",children:[e.jsx("span",{children:"Overall Fulfillment"}),e.jsx(G,{size:15,color:"#d97706"})]}),e.jsxs("div",{className:"val",style:{color:f>0&&w>=f?"#16a34a":"#2563eb"},children:[f>0?(w/f*100).toFixed(1):0,"%"]}),e.jsx("div",{className:"sub",children:"Progress toward annual quota"})]})]}),e.jsxs(Q,{children:[o.map(t=>{const r=t.monthName||M[(t.periodMonth||8)-1]||"Month",s=Number(t.actualRevenue||t.actualSales)||0,a=Number(t.targetAmount)||0,l=a>0?Math.min(100,Math.round(s/a*100)):0,d=s>=a&&a>0;return e.jsxs(U,{children:[e.jsxs("div",{children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"month-title",children:[r," ",t.periodYear]}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b",marginTop:2},children:t.notes||"Company Target"})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"0.7rem",fontWeight:700,padding:"3px 8px",borderRadius:6,background:d?"#ebfbee":s>0?"#eff6ff":"#f8fafc",color:d?"#2b8a3e":s>0?"#1d4ed8":"#64748b",border:d?"1px solid #b2f2bb":s>0?"1px solid #bfdbfe":"1px solid #e2e8f0"},children:d?"🟢 Achieved":s>0?"🔵 In Progress":"🟡 Pending"}),e.jsx("button",{type:"button",onClick:()=>P(t),style:{background:"#f8fafc",border:"1px solid #cbd5e1",color:"#0f172a",borderRadius:6,width:30,height:30,minWidth:30,cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0},title:"Edit Target",children:e.jsx(H,{size:14,color:"#0f172a"})}),e.jsx("button",{type:"button",onClick:()=>Y(t.id,`${r} ${t.periodYear}`),style:{background:"#fff1f2",border:"1px solid #fecdd3",color:"#e11d48",borderRadius:6,width:30,height:30,minWidth:30,cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0},title:"Delete Target",children:e.jsx(q,{size:14,color:"#e11d48"})})]})]}),e.jsx("div",{className:"progress-bar-container",children:e.jsx("div",{className:"progress-fill",style:{width:`${l}%`,background:d?"#16a34a":"#2563eb"}})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.86rem",fontWeight:800},children:[e.jsxs("span",{style:{color:"#0f172a"},children:["Achieved: $",p(s)]}),e.jsxs("span",{style:{color:"#64748b"},children:["Target: $",p(a)]})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.74rem",color:"#64748b",marginTop:16,paddingTop:12,borderTop:"1px solid #f1f5f9"},children:[e.jsxs("span",{children:["Fulfillment: ",e.jsxs("strong",{style:{color:d?"#16a34a":"#0f172a"},children:[l,"%"]})]}),e.jsxs("span",{children:[t.orderCount||0," Orders"]}),e.jsxs("span",{children:["Remaining: ",e.jsxs("strong",{children:["$",p(Math.max(0,a-s))]})]})]})]},t.id)}),o.length===0&&!R&&e.jsxs("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"48px 24px",background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:12,color:"#94a3b8"},children:["No company monthly targets configured for ",i,'. Click "Set Monthly Target" to establish goals.']})]}),A&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15, 23, 42, 0.7)",backdropFilter:"blur(3px)",zIndex:1e4,display:"flex",justifyContent:"center",alignItems:"center",padding:10,boxSizing:"border-box"},onClick:()=>c(!1),children:e.jsxs("div",{style:{background:"#ffffff",borderRadius:12,width:"100%",maxWidth:480,maxHeight:"92vh",overflowY:"auto",overflowX:"hidden",padding:20,boxShadow:"0 20px 25px -5px rgba(0,0,0,0.1)",boxSizing:"border-box"},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"nowrap",gap:10,width:"100%",boxSizing:"border-box"},children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:800,color:"#0f172a",margin:0,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:b?"Edit Company Target":"Set Company Target"}),e.jsx("button",{type:"button",onClick:()=>c(!1),style:{background:"#f1f5f9",border:"none",borderRadius:6,width:32,height:32,minWidth:32,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"1rem",color:"#64748b",flexShrink:0},children:"✕"})]}),e.jsxs("form",{onSubmit:$,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600,color:"#334155",display:"block",marginBottom:4},children:"Target Year"}),e.jsxs("select",{value:i,onChange:t=>x(t.target.value),style:{width:"100%",padding:"8px 10px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.84rem"},children:[e.jsx("option",{value:"2025",children:"2025"}),e.jsx("option",{value:"2026",children:"2026"}),e.jsx("option",{value:"2027",children:"2027"})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600,color:"#334155",display:"block",marginBottom:4},children:"Target Month"}),e.jsx("select",{value:z,onChange:t=>j(t.target.value),style:{width:"100%",padding:"8px 10px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.84rem"},children:M.map((t,r)=>e.jsx("option",{value:r+1,children:t},r+1))})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600,color:"#334155",display:"block",marginBottom:4},children:"Company Revenue Target ($ USD) *"}),e.jsx("input",{type:"number",value:N,onChange:t=>v(t.target.value),style:{width:"100%",padding:"8px 10px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.84rem",boxSizing:"border-box"},required:!0,placeholder:"e.g. 50000"})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600,color:"#334155",display:"block",marginBottom:4},children:"Target Description / Goal Notes"}),e.jsx("input",{type:"text",value:k,onChange:t=>S(t.target.value),style:{width:"100%",padding:"8px 10px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.84rem",boxSizing:"border-box"},placeholder:"e.g. Q3 High Atelier & Diamond Sales Quota"})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:24},children:[e.jsx("button",{type:"button",onClick:()=>c(!1),style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#ffffff",borderRadius:6,fontWeight:600,cursor:"pointer"},children:"Cancel"}),e.jsx("button",{type:"submit",style:{padding:"8px 20px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:700,cursor:"pointer"},children:b?"Update Company Target":"Save Company Target"})]})]})]})})]})};export{te as BusinessSalesTargetsPage};
