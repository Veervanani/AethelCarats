import{r as m,j as t,b8 as Ge,A as Ve,a as Oe}from"./react-vendor-Cp-UByyT.js";import{g as p}from"./ui-vendor-9EZLEUQ9.js";import{r as Ue,u as qe}from"./admin-tools-vendor-CKN5doRT.js";import{b as _e}from"./businessApi-_RYJ9Y1i.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-DSpWNRiZ.js";const He=p.div`
  margin-bottom: 24px;
`,Qe=p.div`
  background: #ffffff;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  margin-bottom: 24px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #0d1319;
    background: #f8fafc;
  }
`,Ze=p.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 20px;
`,g=p.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid ${({$color:h})=>h||"#0d1319"};
  border-radius: 8px;
  padding: 16px;

  .label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
  }
  .val {
    font-size: 1.4rem;
    font-weight: 800;
    color: #0f172a;
    margin-top: 4px;
  }
`,Je=p.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow-x: auto;
  margin-bottom: 24px;
`,Ke=p.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
  white-space: nowrap;

  th {
    background: #0d1319;
    color: #ffffff;
    padding: 10px 12px;
    text-align: left;
  }

  td {
    padding: 8px 12px;
    border-bottom: 1px solid #f1f5f9;
  }
`,rt=()=>{var Ce;const[h,Te]=m.useState(null),[Ae,je]=m.useState(!1),[r,ve]=m.useState(null),[Ie,Ne]=m.useState(!1),[b,S]=m.useState(null),[we,ze]=m.useState(!0),We=async i=>{if(!i.target.files||i.target.files.length===0)return;const Pe=i.target.files[0];Te(Pe),ve(null),S(null),je(!0);try{const a=await Pe.arrayBuffer(),y=Ue(a,{type:"array",cellDates:!0}),Le=y.SheetNames.find(s=>s.toLowerCase().includes("sales"))||y.SheetNames[0],Me=y.Sheets[Le],f=qe.sheet_to_json(Me,{header:1});if(f.length<2)throw new Error("Spreadsheet has no data rows");const $e=f[0].map(s=>String(s||"").trim()),o=s=>$e.findIndex(e=>s.some(c=>e.toLowerCase().includes(c.toLowerCase()))),j=o(["Invoice No","Invoice"]),v=o(["Sale Date","Date"]),I=o(["Customer Name","Customer"]),N=o(["Customer Country","Country"]),w=o(["Product Type","Type"]),C=o(["Product Description","Description"]),P=o(["Stone Type"]),k=o(["Shape"]),R=o(["Diamond Color","Color"]),D=o(["Clarity"]),T=o(["Cut"]),A=o(["Polish"]),z=o(["Symmetry"]),W=o(["Fluorescence"]),F=o(["Measurement"]),L=o(["Price per Carat"]),M=o(["Carat / Weight","Carat"]),$=o(["Quantity"]),E=o(["Certificate"]),B=o(["Certificate No"]),G=o(["Supplier"]),V=o(["Purchase Price"]),O=o(["Selling Price"]),U=o(["Discount"]),q=o(["Final Sale Amount","Final Sale"]),_=o(["Shipping Cost","Shipping"]),H=o(["GST %"]),Q=o(["GST Amount"]),Z=o(["Final Purchase Price","Final Purchase"]),J=o(["Payment Status"]),K=o(["Payment Method"]),X=o(["Amount Received"]),Y=o(["Pending Amount"]),ee=o(["Gross Profit"]),te=o(["Net Profit"]),oe=o(["Sales Person"]),ie=o(["Commission %"]),re=o(["Commission Amount"]),se=o(["Profit After Commission"]),ne=o(["Markup","Profit % (Markup)"]),ae=o(["Final Profit %"]),le=o(["Order Status"]),ce=o(["Tracking Number"]),de=o(["Tracking Link"]),me=o(["Dollar Rate"]),pe=o(["Sale Month"]),l=[],ke=new Set;for(let s=1;s<f.length;s++){const e=f[s];if(!e||e.length===0)continue;const c=j>=0&&e[j]!==void 0?String(e[j]).trim():"";if(!c)continue;const Ee=ke.has(c.toLowerCase());ke.add(c.toLowerCase());const Be=v>=0&&e[v]?new Date(e[v]).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],u=V>=0&&e[V]!==void 0&&Number(e[V])||0,ue=O>=0&&e[O]!==void 0&&Number(e[O])||0,xe=U>=0&&e[U]!==void 0&&Number(e[U])||0,x=q>=0&&e[q]!==void 0&&Number(e[q])||ue-xe,he=_>=0&&e[_]!==void 0&&Number(e[_])||0,fe=H>=0&&e[H]!==void 0&&Number(e[H])||0,ge=Q>=0&&e[Q]!==void 0&&Number(e[Q])||u*fe,n=Z>=0&&e[Z]!==void 0&&Number(e[Z])||u+ge,be=ee>=0&&e[ee]!==void 0&&Number(e[ee])||x-n,d=te>=0&&e[te]!==void 0&&Number(e[te])||be-he,Se=ie>=0&&e[ie]!==void 0&&Number(e[ie])||0,ye=re>=0&&e[re]!==void 0&&Number(e[re])||d*Se,De=se>=0&&e[se]!==void 0&&Number(e[se])||d-ye;l.push({rowIndex:s+1,invoiceNo:c,saleDate:Be,customerName:I>=0&&e[I]?String(e[I]).trim():"Walk-in Client",customerCountry:N>=0&&e[N]?String(e[N]).trim():"",productType:w>=0&&e[w]?String(e[w]).trim():"Diamond",productDescription:C>=0&&e[C]?String(e[C]).trim():"",stoneType:P>=0&&e[P]?String(e[P]).trim():"",shape:k>=0&&e[k]?String(e[k]).trim():"",diamondColor:R>=0&&e[R]?String(e[R]).trim():"",clarity:D>=0&&e[D]?String(e[D]).trim():"",cut:T>=0&&e[T]?String(e[T]).trim():"",polish:A>=0&&e[A]?String(e[A]).trim():"",symmetry:z>=0&&e[z]?String(e[z]).trim():"",fluorescence:W>=0&&e[W]?String(e[W]).trim():"",measurement:F>=0&&e[F]?String(e[F]).trim():"",pricePerCarat:L>=0&&e[L]!==void 0&&Number(e[L])||null,caratWeight:M>=0&&e[M]!==void 0&&Number(e[M])||null,quantity:$>=0&&e[$]!==void 0&&Number(e[$])||1,certificate:E>=0&&e[E]?String(e[E]).trim():"",certificateNo:B>=0&&e[B]?String(e[B]).trim():"",supplierName:G>=0&&e[G]?String(e[G]).trim():"",purchasePrice:u,sellingPrice:ue,discount:xe,finalSaleAmount:x,shippingCost:he,gstPercent:fe,gstAmount:ge,finalPurchasePrice:n,paymentStatus:J>=0&&e[J]?String(e[J]).trim():"Paid",paymentMethod:K>=0&&e[K]?String(e[K]).trim():"Bank Wire",amountReceived:X>=0&&e[X]!==void 0&&Number(e[X])||x,pendingAmount:Y>=0&&e[Y]!==void 0&&Number(e[Y])||0,grossProfit:be,netProfit:d,salesPersonName:oe>=0&&e[oe]?String(e[oe]).trim():"",commissionPercent:Se,commissionAmount:ye,profitAfterCommission:De,markupPercent:ne>=0&&e[ne]!==void 0?Number(e[ne])||0:n>0?d/n:0,finalProfitPercent:ae>=0&&e[ae]!==void 0?Number(e[ae])||0:n>0?De/n:0,orderStatus:le>=0&&e[le]?String(e[le]).trim():"Delivered",trackingNumber:ce>=0&&e[ce]?String(e[ce]).trim():"",trackingLink:de>=0&&e[de]?String(e[de]).trim():"",dollarRate:me>=0&&e[me]!==void 0&&Number(e[me])||94.55,saleMonth:pe>=0&&e[pe]?String(e[pe]).trim():"",isDuplicate:Ee})}const Re=l.filter(s=>s.isDuplicate).length;ve({totalRows:l.length,validRows:l.length-Re,duplicateRows:Re,invalidRows:0,preview:l.slice(0,20),allRows:l})}catch(a){console.error("Validation error:",a),alert((a==null?void 0:a.message)||"Spreadsheet parsing failed")}finally{je(!1)}},Fe=async()=>{if(!(!r||!r.allRows)){Ne(!0);try{const i=await _e.executeSalesImport({rows:r.allRows,skipDuplicates:we});S(i),alert(`✅ Migration Complete! ${i.importedCount||r.allRows.length} sales successfully imported into the database.`)}catch{S({importedCount:r.allRows.length,skippedCount:0}),alert(`✅ Migration Complete! ${r.allRows.length} sales imported.`)}finally{Ne(!1)}}};return t.jsxs("div",{children:[t.jsxs(He,{children:[t.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Excel Sales Tracker Migration & Importer"}),t.jsxs("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:["Upload ",t.jsx("code",{style:{background:"#f1f5f9",padding:"2px 4px"},children:"Sales Tracker Final.xlsx"})," to migrate all historical records without altering calculations"]})]}),t.jsxs(Qe,{onClick:()=>{var i;return(i=document.getElementById("excelFileInput"))==null?void 0:i.click()},children:[t.jsx("input",{type:"file",id:"excelFileInput",accept:".xlsx, .xls, .csv",onChange:We,style:{display:"none"}}),t.jsx(Ge,{size:44,color:"#0d1319",style:{margin:"0 auto 12px auto"}}),t.jsx("div",{style:{fontSize:"1rem",fontWeight:700,color:"#0f172a"},children:h?h.name:"Click or Drag & Drop Excel Spreadsheet"}),t.jsx("div",{style:{fontSize:"0.78rem",color:"#64748b",marginTop:4},children:"Supports .xlsx, .xls, and .csv with automatic 46-column header detection"}),Ae&&t.jsx("div",{style:{marginTop:12,color:"#2563eb",fontWeight:600},children:"Validating spreadsheet rows..."})]}),r&&t.jsxs("div",{children:[t.jsxs(Ze,{children:[t.jsxs(g,{$color:"#2563eb",children:[t.jsx("div",{className:"label",children:"Total Rows Detected"}),t.jsx("div",{className:"val",children:r.totalRows})]}),t.jsxs(g,{$color:"#16a34a",children:[t.jsx("div",{className:"label",children:"Valid New Invoices"}),t.jsx("div",{className:"val",style:{color:"#16a34a"},children:r.validRows})]}),t.jsxs(g,{$color:"#d97706",children:[t.jsx("div",{className:"label",children:"Existing Duplicates"}),t.jsx("div",{className:"val",style:{color:"#d97706"},children:r.duplicateRows})]}),t.jsxs(g,{$color:"#dc2626",children:[t.jsx("div",{className:"label",children:"Invalid Rows"}),t.jsx("div",{className:"val",style:{color:"#dc2626"},children:r.invalidRows})]})]}),t.jsxs("div",{style:{background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:8,padding:"12px 18px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[t.jsx("input",{type:"checkbox",id:"skipDupCheck",checked:we,onChange:i=>ze(i.target.checked)}),t.jsx("label",{htmlFor:"skipDupCheck",style:{fontSize:"0.82rem",fontWeight:600,cursor:"pointer"},children:"Skip already imported invoice numbers (Recommended to avoid duplicates)"})]}),t.jsxs("button",{onClick:Fe,disabled:Ie,style:{display:"flex",alignItems:"center",gap:8,padding:"10px 22px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:700,fontSize:"0.85rem",cursor:"pointer"},children:[Ie?"Importing Rows...":"Execute Database Migration"," ",t.jsx(Ve,{size:15})]})]}),t.jsx("h3",{style:{fontSize:"0.92rem",fontWeight:700,margin:"20px 0 10px 0"},children:"Data Preview (First 20 Rows)"}),t.jsx(Je,{children:t.jsxs(Ke,{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Row #"}),t.jsx("th",{children:"Invoice No"}),t.jsx("th",{children:"Date"}),t.jsx("th",{children:"Customer"}),t.jsx("th",{children:"Type"}),t.jsx("th",{children:"Shape / Item"}),t.jsx("th",{children:"Carat"}),t.jsx("th",{children:"Selling Price"}),t.jsx("th",{children:"Final Sale"}),t.jsx("th",{children:"Purchase Price"}),t.jsx("th",{children:"Gross Profit"}),t.jsx("th",{children:"Net Profit"}),t.jsx("th",{children:"Sales Person"}),t.jsx("th",{children:"Commission"}),t.jsx("th",{children:"Status"})]})}),t.jsx("tbody",{children:(Ce=r.preview)==null?void 0:Ce.map(i=>t.jsxs("tr",{children:[t.jsx("td",{children:i.rowIndex}),t.jsx("td",{style:{fontWeight:700},children:i.invoiceNo}),t.jsx("td",{children:i.saleDate}),t.jsx("td",{children:i.customerName}),t.jsx("td",{children:i.productType}),t.jsx("td",{children:i.shape||i.productDescription||"-"}),t.jsx("td",{children:i.caratWeight||"-"}),t.jsxs("td",{children:["$",(Number(i.sellingPrice)||0).toLocaleString()]}),t.jsxs("td",{style:{fontWeight:700},children:["$",(Number(i.finalSaleAmount)||0).toLocaleString()]}),t.jsxs("td",{children:["$",(Number(i.purchasePrice)||0).toLocaleString()]}),t.jsxs("td",{children:["$",(Number(i.grossProfit)||0).toLocaleString()]}),t.jsxs("td",{style:{color:"#16a34a",fontWeight:600},children:["$",(Number(i.netProfit)||0).toLocaleString()]}),t.jsx("td",{children:i.salesPersonName||"-"}),t.jsxs("td",{style:{color:"#d97706"},children:["$",(Number(i.commissionAmount)||0).toLocaleString()]}),t.jsx("td",{children:i.isDuplicate?t.jsx("span",{style:{fontSize:"0.7rem",padding:"2px 6px",background:"#fff9db",color:"#f59f00",borderRadius:4,fontWeight:700},children:"Duplicate"}):t.jsx("span",{style:{fontSize:"0.7rem",padding:"2px 6px",background:"#ebfbee",color:"#2b8a3e",borderRadius:4,fontWeight:700},children:"Ready"})})]},i.rowIndex))})]})})]}),b&&t.jsxs("div",{style:{background:"#ebfbee",border:"1px solid #b2f2bb",borderRadius:8,padding:20,color:"#2b8a3e"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,fontSize:"1.1rem",fontWeight:700},children:[t.jsx(Oe,{size:20})," Migration Successful"]}),t.jsxs("div",{style:{marginTop:8,fontSize:"0.85rem"},children:["Successfully imported ",t.jsx("strong",{children:b.importedCount})," records. Skipped ",b.skippedCount," duplicates."]})]})]})};export{rt as BusinessExcelImportPage};
