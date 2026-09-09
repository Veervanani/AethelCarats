import{r as u,j as t,az as $e,ad as Je,bh as Ge,aa as He,ac as Ke}from"./react-vendor-BsBv4awM.js";import{g as x}from"./ui-vendor-C0FaE403.js";import{b as d}from"./businessApi-D2kVdC5o.js";import{u as a,w as Ye}from"./admin-tools-vendor-CKN5doRT.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-pages-Bspc8SQC.js";const qe=x.div`
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
`,Qe=x.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 10px 12px;
  }
`,j=x.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 12px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  border: 1px solid ${({$active:o})=>o?"#0d1319":"#cbd5e1"};
  background: ${({$active:o})=>o?"#0d1319":"#ffffff"};
  color: ${({$active:o})=>o?"#ffffff":"#334155"};
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.15s ease;

  &:hover {
    border-color: #0d1319;
  }
`,y=x.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  margin-bottom: 20px;
  scrollbar-width: thin;
`,w=x.table`
  width: 100%;
  min-width: 680px;
  border-collapse: collapse;
  font-size: 0.82rem;
  white-space: nowrap;

  th {
    text-align: left;
    padding: 12px 16px;
    background: #0d1319;
    color: #ffffff;
    font-weight: 600;
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
  }

  tr:hover td {
    background: #f8fafc;
  }
`,Xe=x.span`
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  display: inline-block;

  ${({$type:o})=>{switch(o){case"AUTOMATIC_WEEKLY":return"background: #ebfbee; color: #2b8a3e; border: 1px solid #b2f2bb;";case"MANUAL_SNAPSHOT":return"background: #ede9fe; color: #6d28d9; border: 1px solid #ddd6fe;";default:return"background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1;"}}}
`,it=()=>{var N,R,v,$,W,A,B,T,M,z,L,_,I,U,O,F,V,E,J,G,H,K,Y,q,Q,X,Z,ee,te,re,se,oe,ie,ne,le,ce,de,ae,fe,he,pe,ue,xe,me;const[o,b]=u.useState("sales"),[e,We]=u.useState(null),[k,S]=u.useState([]),[Ae,P]=u.useState(!0),[C,D]=u.useState(!1),Be=async()=>{P(!0);try{const[r,n]=await Promise.all([d.getDashboardMetrics({period:"all"}),d.getBackups()]);We(r),S(n.backups||[])}catch(r){console.error(r)}finally{P(!1)}};u.useEffect(()=>{Be()},[]);const Te=async()=>{var r,n;D(!0);try{await d.createManualBackup(),alert("✅ Database snapshot created successfully.");const s=await d.getBackups();S(s.backups||[])}catch(s){alert(((n=(r=s==null?void 0:s.response)==null?void 0:r.data)==null?void 0:n.message)||"Failed to create backup snapshot.")}finally{D(!1)}},Me=async(r,n)=>{var s,l;if(window.confirm(`⚠️ Are you sure you want to delete backup "${n}"?`))try{await d.deleteBackup(r),S(i=>i.filter(f=>f.id!==r)),alert("✅ Backup removed.")}catch(i){alert(((l=(s=i==null?void 0:i.response)==null?void 0:s.data)==null?void 0:l.message)||"Failed to delete backup.")}},ze=async(r,n)=>{try{await d.downloadBackup(r,n)}catch{alert("Failed to download backup snapshot.")}},Le=async(r,n)=>{var s,l;if(window.confirm(`⚠️ CAUTION: Are you sure you want to restore database snapshot "${n}"? This will sync all records from this backup snapshot point.`))try{const i=await d.restoreBackup(r);alert(`✅ ${i.message||"Database restored successfully!"}`),window.location.reload()}catch(i){alert(((l=(s=i==null?void 0:i.response)==null?void 0:s.data)==null?void 0:l.message)||"Failed to restore backup snapshot.")}},_e=()=>{var r,n,s,l,i,f,c,m,g,be,ge,je,ye,we,ke,Se,Pe,Ce,De,Ne,Re;try{const h=a.book_new(),Ie=[{Category:"Loose Diamonds",Orders:((n=(r=e==null?void 0:e.productDistribution)==null?void 0:r.diamond)==null?void 0:n.orders)||0,Revenue:((l=(s=e==null?void 0:e.productDistribution)==null?void 0:s.diamond)==null?void 0:l.revenue)||0,NetProfit:((f=(i=e==null?void 0:e.productDistribution)==null?void 0:i.diamond)==null?void 0:f.netProfit)||0,ProfitMargin:(Number((c=e==null?void 0:e.metrics)==null?void 0:c.averageMarkupPercent)||0).toFixed(1)+"%"},{Category:"Finished Jewelry",Orders:((g=(m=e==null?void 0:e.productDistribution)==null?void 0:m.jewelry)==null?void 0:g.orders)||0,Revenue:((ge=(be=e==null?void 0:e.productDistribution)==null?void 0:be.jewelry)==null?void 0:ge.revenue)||0,NetProfit:((ye=(je=e==null?void 0:e.productDistribution)==null?void 0:je.jewelry)==null?void 0:ye.netProfit)||0,ProfitMargin:"0%"}],Ue=a.json_to_sheet(Ie);a.book_append_sheet(h,Ue,"Category Breakdown");const ve=((e==null?void 0:e.salesPersonPerformance)||[]).map(p=>({"Staff Member":p.name||"Unassigned",Orders:p.orders||0,"Revenue ($)":p.revenue||0,"Net Profit ($)":p.netProfitUSD||0,"Commission ($)":p.commissionUSD||0,"Profit Retained ($)":p.profitAfterCommission||0})),Oe=a.json_to_sheet(ve.length>0?ve:[{"Staff Member":"No Sales Recorded"}]);a.book_append_sheet(h,Oe,"Staff Performance");const Fe=[{Metric:"Total Orders",Value:((we=e==null?void 0:e.metrics)==null?void 0:we.totalOrders)||0},{Metric:"Total Revenue ($)",Value:((ke=e==null?void 0:e.metrics)==null?void 0:ke.totalRevenue)||0},{Metric:"Total Purchase Cost ($)",Value:((Se=e==null?void 0:e.metrics)==null?void 0:Se.totalPurchaseCost)||0},{Metric:"Total Gross Profit ($)",Value:((Pe=e==null?void 0:e.metrics)==null?void 0:Pe.totalGrossProfit)||0},{Metric:"Total Net Profit ($)",Value:((Ce=e==null?void 0:e.metrics)==null?void 0:Ce.totalNetProfit)||0},{Metric:"Total Commission Due ($)",Value:((De=e==null?void 0:e.metrics)==null?void 0:De.totalCommission)||0},{Metric:"Total Retained Profit ($)",Value:((Ne=e==null?void 0:e.metrics)==null?void 0:Ne.totalProfitAfterCommission)||0},{Metric:"Average Markup %",Value:(((Re=e==null?void 0:e.metrics)==null?void 0:Re.averageMarkupPercent)||0)+"%"}],Ve=a.json_to_sheet(Fe);a.book_append_sheet(h,Ve,"Executive Summary");const Ee=`Aura_Jewel_Audit_Report_${new Date().toISOString().slice(0,10)}.xlsx`;Ye(h,Ee)}catch(h){console.error(h),alert("Failed to generate audit report file.")}};return t.jsxs("div",{children:[t.jsxs(qe,{children:[t.jsxs("div",{children:[t.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Business Intelligence & Database Backups"}),t.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Consolidated financial auditing, salesperson profitability analysis, and automated weekly database snapshots"})]}),t.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[t.jsxs("button",{onClick:Te,disabled:C,style:{display:"flex",alignItems:"center",gap:8,padding:"8px 16px",background:"#ffffff",color:"#0f172a",border:"1px solid #cbd5e1",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[t.jsx($e,{size:15,color:"#2563eb"})," ",C?"Creating Snapshot...":"⚡ Create Instant Snapshot"]}),t.jsxs("button",{onClick:_e,style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[t.jsx(Je,{size:15})," Export Audit Report (.xlsx)"]})]})]}),t.jsx(Qe,{children:t.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[t.jsx(j,{$active:o==="sales",onClick:()=>b("sales"),children:"Sales Breakdown"}),t.jsx(j,{$active:o==="staff",onClick:()=>b("staff"),children:"Staff Performance"}),t.jsx(j,{$active:o==="profit",onClick:()=>b("profit"),children:"Margin & Retained Profit"}),t.jsxs(j,{$active:o==="backups",onClick:()=>b("backups"),children:[t.jsx($e,{size:14})," Database Backups (",k.length,")"]})]})}),o==="sales"&&t.jsx(y,{children:t.jsxs(w,{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Category"}),t.jsx("th",{children:"Orders"}),t.jsx("th",{children:"Total Revenue"}),t.jsx("th",{children:"Net Profit"}),t.jsx("th",{children:"Profit Margin"})]})}),t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{fontWeight:600},children:"Loose Diamonds"}),t.jsx("td",{children:((R=(N=e==null?void 0:e.productDistribution)==null?void 0:N.diamond)==null?void 0:R.orders)||0}),t.jsxs("td",{style:{fontWeight:700},children:["$",((($=(v=e==null?void 0:e.productDistribution)==null?void 0:v.diamond)==null?void 0:$.revenue)||0).toLocaleString()]}),t.jsxs("td",{style:{color:"#16a34a",fontWeight:600},children:["$",(((A=(W=e==null?void 0:e.productDistribution)==null?void 0:W.diamond)==null?void 0:A.netProfit)||0).toLocaleString()]}),t.jsxs("td",{children:[(((T=(B=e==null?void 0:e.productDistribution)==null?void 0:B.diamond)==null?void 0:T.revenue)||0)>0?((((z=(M=e==null?void 0:e.productDistribution)==null?void 0:M.diamond)==null?void 0:z.netProfit)||0)/(((_=(L=e==null?void 0:e.productDistribution)==null?void 0:L.diamond)==null?void 0:_.revenue)||1)*100).toFixed(1):0,"%"]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{fontWeight:600},children:"Finished Jewelry"}),t.jsx("td",{children:((U=(I=e==null?void 0:e.productDistribution)==null?void 0:I.jewelry)==null?void 0:U.orders)||0}),t.jsxs("td",{style:{fontWeight:700},children:["$",(((F=(O=e==null?void 0:e.productDistribution)==null?void 0:O.jewelry)==null?void 0:F.revenue)||0).toLocaleString()]}),t.jsxs("td",{style:{color:"#16a34a",fontWeight:600},children:["$",(((E=(V=e==null?void 0:e.productDistribution)==null?void 0:V.jewelry)==null?void 0:E.netProfit)||0).toLocaleString()]}),t.jsxs("td",{children:[(((G=(J=e==null?void 0:e.productDistribution)==null?void 0:J.jewelry)==null?void 0:G.revenue)||0)>0?((((K=(H=e==null?void 0:e.productDistribution)==null?void 0:H.jewelry)==null?void 0:K.netProfit)||0)/(((q=(Y=e==null?void 0:e.productDistribution)==null?void 0:Y.jewelry)==null?void 0:q.revenue)||1)*100).toFixed(1):0,"%"]})]})]})]})}),o==="staff"&&t.jsx(y,{children:t.jsxs(w,{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Sales Representative"}),t.jsx("th",{children:"Total Orders"}),t.jsx("th",{children:"Sales Volume (USD)"}),t.jsx("th",{children:"Net Profit (USD)"}),t.jsx("th",{children:"Commission (USD)"}),t.jsx("th",{children:"Net Profit (INR)"})]})}),t.jsxs("tbody",{children:[(Q=e==null?void 0:e.salesPersonPerformance)==null?void 0:Q.map((r,n)=>{var m;const s=Number(r.revenue)||0,l=Number(r.netProfitUSD)||0,i=Number(r.netProfitINR)||l*(((m=e==null?void 0:e.metrics)==null?void 0:m.dollarRate)||94.55),f=Number(r.commissionUSD)||0,c=g=>(Number(g)||0).toLocaleString();return t.jsxs("tr",{children:[t.jsx("td",{style:{fontWeight:600},children:r.name||"Unassigned"}),t.jsx("td",{children:r.orders||0}),t.jsxs("td",{style:{fontWeight:700},children:["$",c(s)]}),t.jsxs("td",{style:{color:"#16a34a",fontWeight:600},children:["$",c(l)]}),t.jsxs("td",{style:{color:"#d97706"},children:["$",c(f)]}),t.jsxs("td",{children:["₹",c(i)]})]},n)}),(!(e!=null&&e.salesPersonPerformance)||e.salesPersonPerformance.length===0)&&t.jsx("tr",{children:t.jsx("td",{colSpan:6,style:{textAlign:"center",padding:"24px",color:"#94a3b8"},children:"No staff performance records available."})})]})]})}),o==="profit"&&t.jsx(y,{children:t.jsxs(w,{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Financial Metric"}),t.jsx("th",{children:"Value (USD)"}),t.jsxs("th",{children:["Value (INR @ ",((X=e==null?void 0:e.metrics)==null?void 0:X.dollarRate)||94.55,")"]})]})}),t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{fontWeight:600},children:"Total Billed Revenue"}),t.jsxs("td",{style:{fontWeight:700},children:["$",(Number((Z=e==null?void 0:e.metrics)==null?void 0:Z.totalRevenue)||0).toLocaleString()]}),t.jsxs("td",{children:["₹",((Number((ee=e==null?void 0:e.metrics)==null?void 0:ee.totalRevenue)||0)*(((te=e==null?void 0:e.metrics)==null?void 0:te.dollarRate)||94.55)).toLocaleString()]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{fontWeight:600},children:"Procurement Cost (COGS)"}),t.jsxs("td",{children:["$",(Number((re=e==null?void 0:e.metrics)==null?void 0:re.totalPurchaseCost)||0).toLocaleString()]}),t.jsxs("td",{children:["₹",((Number((se=e==null?void 0:e.metrics)==null?void 0:se.totalPurchaseCost)||0)*(((oe=e==null?void 0:e.metrics)==null?void 0:oe.dollarRate)||94.55)).toLocaleString()]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{fontWeight:600},children:"Net Operational Profit"}),t.jsxs("td",{style:{color:"#16a34a",fontWeight:700},children:["$",(Number((ie=e==null?void 0:e.metrics)==null?void 0:ie.totalNetProfit)||0).toLocaleString()]}),t.jsxs("td",{style:{color:"#16a34a",fontWeight:700},children:["₹",(Number((ne=e==null?void 0:e.metrics)==null?void 0:ne.totalNetProfitINR)||(Number((le=e==null?void 0:e.metrics)==null?void 0:le.totalNetProfit)||0)*(((ce=e==null?void 0:e.metrics)==null?void 0:ce.dollarRate)||94.55)).toLocaleString()]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{fontWeight:600},children:"Total Sales Commission"}),t.jsxs("td",{style:{color:"#d97706",fontWeight:700},children:["$",(Number((de=e==null?void 0:e.metrics)==null?void 0:de.totalCommission)||0).toLocaleString()]}),t.jsxs("td",{style:{color:"#d97706",fontWeight:700},children:["₹",(Number((ae=e==null?void 0:e.metrics)==null?void 0:ae.totalCommissionINR)||(Number((fe=e==null?void 0:e.metrics)==null?void 0:fe.totalCommission)||0)*(((he=e==null?void 0:e.metrics)==null?void 0:he.dollarRate)||94.55)).toLocaleString()]})]}),t.jsxs("tr",{style:{background:"#f8fafc"},children:[t.jsx("td",{style:{fontWeight:800},children:"Retained Company Profit"}),t.jsxs("td",{style:{color:"#0d1319",fontWeight:800},children:["$",(Number((pe=e==null?void 0:e.metrics)==null?void 0:pe.totalProfitAfterCommission)||0).toLocaleString()]}),t.jsxs("td",{style:{color:"#0d1319",fontWeight:800},children:["₹",(Number((ue=e==null?void 0:e.metrics)==null?void 0:ue.profitAfterCommissionINR)||(Number((xe=e==null?void 0:e.metrics)==null?void 0:xe.totalProfitAfterCommission)||0)*(((me=e==null?void 0:e.metrics)==null?void 0:me.dollarRate)||94.55)).toLocaleString()]})]})]})]})}),o==="backups"&&t.jsxs("div",{children:[t.jsx("div",{style:{background:"#f0fdf4",border:"1px solid #bbf7d0",padding:"12px 16px",borderRadius:8,marginBottom:16,fontSize:"0.8rem",color:"#166534",display:"flex",justifyContent:"space-between",alignItems:"center"},children:t.jsxs("span",{children:["🛡️ ",t.jsx("strong",{children:"Automated Database Resilience:"})," Full database snapshots of all Sales, Staff, Clients, Attendance, and Commissions are automatically archived weekly in dedicated snapshot tables."]})}),t.jsx(y,{children:t.jsxs(w,{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Backup Snapshot"}),t.jsx("th",{children:"Type"}),t.jsx("th",{children:"Created At"}),t.jsx("th",{children:"Sales Records"}),t.jsx("th",{children:"Staff"}),t.jsx("th",{children:"Clients"}),t.jsx("th",{children:"Size"}),t.jsx("th",{style:{textAlign:"right"},children:"Actions"})]})}),t.jsxs("tbody",{children:[k.map(r=>t.jsxs("tr",{children:[t.jsx("td",{style:{fontWeight:700,color:"#0f172a"},children:r.backupName}),t.jsx("td",{children:t.jsx(Xe,{$type:r.backupType,children:r.backupType==="AUTOMATIC_WEEKLY"?"🟢 Weekly Auto":"🟣 Manual Snapshot"})}),t.jsx("td",{children:r.createdAt?new Date(r.createdAt).toLocaleString():"-"}),t.jsxs("td",{style:{fontWeight:600},children:[r.salesCount||0," sales"]}),t.jsxs("td",{children:[r.employeesCount||0," staff"]}),t.jsxs("td",{children:[r.customersCount||0," clients"]}),t.jsxs("td",{style:{color:"#64748b"},children:[Math.round((r.fileSizeBytes||1024)/1024)," KB"]}),t.jsx("td",{style:{textAlign:"right"},children:t.jsxs("div",{style:{display:"inline-flex",gap:6},children:[t.jsxs("button",{onClick:()=>ze(r.id,r.backupName),style:{display:"inline-flex",alignItems:"center",gap:4,padding:"5px 10px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:5,fontSize:"0.74rem",fontWeight:700,cursor:"pointer"},title:"Download JSON Snapshot",children:[t.jsx(Ge,{size:13})," Download"]}),t.jsxs("button",{onClick:()=>Le(r.id,r.backupName),style:{display:"inline-flex",alignItems:"center",gap:4,padding:"5px 10px",background:"#eff6ff",color:"#1d4ed8",border:"1px solid #bfdbfe",borderRadius:5,fontSize:"0.74rem",fontWeight:700,cursor:"pointer"},title:"Restore Database from this Snapshot",children:[t.jsx(He,{size:13})," Restore"]}),t.jsx("button",{onClick:()=>Me(r.id,r.backupName),style:{padding:"5px 8px",background:"#fff1f2",color:"#e11d48",border:"1px solid #fecdd3",borderRadius:5,cursor:"pointer"},title:"Delete Backup",children:t.jsx(Ke,{size:13})})]})})]},r.id)),k.length===0&&!Ae&&t.jsx("tr",{children:t.jsx("td",{colSpan:8,style:{textAlign:"center",padding:"32px",color:"#94a3b8"},children:"No database backups found."})})]})]})})]})]})};export{it as BusinessReportsPage};
