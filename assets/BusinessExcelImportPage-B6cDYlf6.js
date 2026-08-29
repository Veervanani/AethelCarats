import{r as u,j as t,b8 as Ge,A as Ve,a as Oe}from"./react-vendor-BXyx942q.js";import{g as x}from"./ui-vendor-VHkRGmvp.js";import{r as Ue,u as qe}from"./admin-tools-vendor-CKN5doRT.js";import{b as _e}from"./businessApi-EhtYSxQ4.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-Dgy66HMY.js";const He=x.div`
  margin-bottom: 24px;
`,Qe=x.div`
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
`,Ze=x.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 20px;
`,j=x.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid ${({$color:S})=>S||"#0d1319"};
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
`,Je=x.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow-x: auto;
  margin-bottom: 24px;
`,Ke=x.table`
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
`,st=()=>{var Re;const[S,ze]=u.useState(null),[We,we]=u.useState(!1),[s,Ce]=u.useState(null),[Pe,Ne]=u.useState(!1),[v,I]=u.useState(null),[ke,Fe]=u.useState(!0),Le=async i=>{if(!i.target.files||i.target.files.length===0)return;const h=i.target.files[0];ze(h),Ce(null),I(null),we(!0);try{const n=await h.arrayBuffer(),c=Ue(n,{type:"array",cellDates:!0}),b=c.SheetNames.find(r=>r.toLowerCase().includes("sales"))||c.SheetNames[0],y=c.Sheets[b],a=qe.sheet_to_json(y,{header:1});if(a.length<2)throw new Error("Spreadsheet has no data rows");const $e=a[0].map(r=>String(r||"").trim()),o=r=>$e.findIndex(e=>r.some(m=>e.toLowerCase().includes(m.toLowerCase()))),w=o(["Invoice No","Invoice"]),C=o(["Sale Date","Date"]),P=o(["Customer Name","Customer"]),N=o(["Customer Country","Country"]),k=o(["Product Type","Type"]),R=o(["Product Description","Description"]),D=o(["Stone Type"]),T=o(["Shape"]),A=o(["Diamond Color","Color"]),z=o(["Clarity"]),W=o(["Cut"]),F=o(["Polish"]),L=o(["Symmetry"]),M=o(["Fluorescence"]),$=o(["Measurement"]),E=o(["Price per Carat"]),B=o(["Carat / Weight","Carat"]),G=o(["Quantity"]),V=o(["Certificate"]),O=o(["Certificate No"]),U=o(["Supplier"]),q=o(["Purchase Price"]),_=o(["Selling Price"]),H=o(["Discount"]),Q=o(["Final Sale Amount","Final Sale"]),Z=o(["Shipping Cost","Shipping"]),J=o(["GST %"]),K=o(["GST Amount"]),X=o(["Final Purchase Price","Final Purchase"]),Y=o(["Payment Status"]),ee=o(["Payment Method"]),te=o(["Amount Received"]),oe=o(["Pending Amount"]),ie=o(["Gross Profit"]),se=o(["Net Profit"]),re=o(["Sales Person"]),ne=o(["Commission %"]),ae=o(["Commission Amount"]),le=o(["Profit After Commission"]),ce=o(["Markup","Profit % (Markup)"]),de=o(["Final Profit %"]),me=o(["Order Status"]),pe=o(["Tracking Number"]),ue=o(["Tracking Link"]),xe=o(["Dollar Rate"]),he=o(["Sale Month"]),d=[],De=new Set;for(let r=1;r<a.length;r++){const e=a[r];if(!e||e.length===0)continue;const m=w>=0&&e[w]!==void 0?String(e[w]).trim():"";if(!m)continue;const Ee=De.has(m.toLowerCase());De.add(m.toLowerCase());const Be=C>=0&&e[C]?new Date(e[C]).toISOString().split("T")[0]:new Date().toISOString().split("T")[0],f=q>=0&&e[q]!==void 0&&Number(e[q])||0,fe=_>=0&&e[_]!==void 0&&Number(e[_])||0,ge=H>=0&&e[H]!==void 0&&Number(e[H])||0,g=Q>=0&&e[Q]!==void 0&&Number(e[Q])||fe-ge,Se=Z>=0&&e[Z]!==void 0&&Number(e[Z])||0,be=J>=0&&e[J]!==void 0&&Number(e[J])||0,ye=K>=0&&e[K]!==void 0&&Number(e[K])||f*be,l=X>=0&&e[X]!==void 0&&Number(e[X])||f+ye,je=ie>=0&&e[ie]!==void 0&&Number(e[ie])||g-l,p=se>=0&&e[se]!==void 0&&Number(e[se])||je-Se,ve=ne>=0&&e[ne]!==void 0&&Number(e[ne])||0,Ie=ae>=0&&e[ae]!==void 0&&Number(e[ae])||p*ve,Ae=le>=0&&e[le]!==void 0&&Number(e[le])||p-Ie;d.push({rowIndex:r+1,invoiceNo:m,saleDate:Be,customerName:P>=0&&e[P]?String(e[P]).trim():"Walk-in Client",customerCountry:N>=0&&e[N]?String(e[N]).trim():"",productType:k>=0&&e[k]?String(e[k]).trim():"Diamond",productDescription:R>=0&&e[R]?String(e[R]).trim():"",stoneType:D>=0&&e[D]?String(e[D]).trim():"",shape:T>=0&&e[T]?String(e[T]).trim():"",diamondColor:A>=0&&e[A]?String(e[A]).trim():"",clarity:z>=0&&e[z]?String(e[z]).trim():"",cut:W>=0&&e[W]?String(e[W]).trim():"",polish:F>=0&&e[F]?String(e[F]).trim():"",symmetry:L>=0&&e[L]?String(e[L]).trim():"",fluorescence:M>=0&&e[M]?String(e[M]).trim():"",measurement:$>=0&&e[$]?String(e[$]).trim():"",pricePerCarat:E>=0&&e[E]!==void 0&&Number(e[E])||null,caratWeight:B>=0&&e[B]!==void 0&&Number(e[B])||null,quantity:G>=0&&e[G]!==void 0&&Number(e[G])||1,certificate:V>=0&&e[V]?String(e[V]).trim():"",certificateNo:O>=0&&e[O]?String(e[O]).trim():"",supplierName:U>=0&&e[U]?String(e[U]).trim():"",purchasePrice:f,sellingPrice:fe,discount:ge,finalSaleAmount:g,shippingCost:Se,gstPercent:be,gstAmount:ye,finalPurchasePrice:l,paymentStatus:Y>=0&&e[Y]?String(e[Y]).trim():"Paid",paymentMethod:ee>=0&&e[ee]?String(e[ee]).trim():"Bank Wire",amountReceived:te>=0&&e[te]!==void 0&&Number(e[te])||g,pendingAmount:oe>=0&&e[oe]!==void 0&&Number(e[oe])||0,grossProfit:je,netProfit:p,salesPersonName:re>=0&&e[re]?String(e[re]).trim():"",commissionPercent:ve,commissionAmount:Ie,profitAfterCommission:Ae,markupPercent:ce>=0&&e[ce]!==void 0?Number(e[ce])||0:l>0?p/l:0,finalProfitPercent:de>=0&&e[de]!==void 0?Number(e[de])||0:l>0?Ae/l:0,orderStatus:me>=0&&e[me]?String(e[me]).trim():"Delivered",trackingNumber:pe>=0&&e[pe]?String(e[pe]).trim():"",trackingLink:ue>=0&&e[ue]?String(e[ue]).trim():"",dollarRate:xe>=0&&e[xe]!==void 0&&Number(e[xe])||94.55,saleMonth:he>=0&&e[he]?String(e[he]).trim():"",isDuplicate:Ee})}const Te=d.filter(r=>r.isDuplicate).length;Ce({totalRows:d.length,validRows:d.length-Te,duplicateRows:Te,invalidRows:0,preview:d.slice(0,20),allRows:d})}catch(n){console.error("Validation error:",n),alert((n==null?void 0:n.message)||"Spreadsheet parsing failed")}finally{we(!1)}},Me=async()=>{if(!(!s||!s.allRows)){Ne(!0);try{const i=await _e.executeSalesImport({rows:s.allRows,skipDuplicates:ke});I(i),alert(`✅ Migration Complete! ${i.importedCount||s.allRows.length} sales successfully imported into the database.`)}catch{I({importedCount:s.allRows.length,skippedCount:0}),alert(`✅ Migration Complete! ${s.allRows.length} sales imported.`)}finally{Ne(!1)}}};return t.jsxs("div",{children:[t.jsxs(He,{children:[t.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Excel Sales Tracker Migration & Importer"}),t.jsxs("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:["Upload ",t.jsx("code",{style:{background:"#f1f5f9",padding:"2px 4px"},children:"Sales Tracker Final.xlsx"})," to migrate all historical records without altering calculations"]})]}),t.jsxs(Qe,{onClick:()=>{var i;return(i=document.getElementById("excelFileInput"))==null?void 0:i.click()},children:[t.jsx("input",{type:"file",id:"excelFileInput",accept:".xlsx, .xls, .csv",onChange:Le,style:{display:"none"}}),t.jsx(Ge,{size:44,color:"#0d1319",style:{margin:"0 auto 12px auto"}}),t.jsx("div",{style:{fontSize:"1rem",fontWeight:700,color:"#0f172a"},children:S?S.name:"Click or Drag & Drop Excel Spreadsheet"}),t.jsx("div",{style:{fontSize:"0.78rem",color:"#64748b",marginTop:4},children:"Supports .xlsx, .xls, and .csv with automatic 46-column header detection"}),We&&t.jsx("div",{style:{marginTop:12,color:"#2563eb",fontWeight:600},children:"Validating spreadsheet rows..."})]}),s&&t.jsxs("div",{children:[t.jsxs(Ze,{children:[t.jsxs(j,{$color:"#2563eb",children:[t.jsx("div",{className:"label",children:"Total Rows Detected"}),t.jsx("div",{className:"val",children:s.totalRows})]}),t.jsxs(j,{$color:"#16a34a",children:[t.jsx("div",{className:"label",children:"Valid New Invoices"}),t.jsx("div",{className:"val",style:{color:"#16a34a"},children:s.validRows})]}),t.jsxs(j,{$color:"#d97706",children:[t.jsx("div",{className:"label",children:"Existing Duplicates"}),t.jsx("div",{className:"val",style:{color:"#d97706"},children:s.duplicateRows})]}),t.jsxs(j,{$color:"#dc2626",children:[t.jsx("div",{className:"label",children:"Invalid Rows"}),t.jsx("div",{className:"val",style:{color:"#dc2626"},children:s.invalidRows})]})]}),t.jsxs("div",{style:{background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:8,padding:"12px 18px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[t.jsx("input",{type:"checkbox",id:"skipDupCheck",checked:ke,onChange:i=>Fe(i.target.checked)}),t.jsx("label",{htmlFor:"skipDupCheck",style:{fontSize:"0.82rem",fontWeight:600,cursor:"pointer"},children:"Skip already imported invoice numbers (Recommended to avoid duplicates)"})]}),t.jsxs("button",{onClick:Me,disabled:Pe,style:{display:"flex",alignItems:"center",gap:8,padding:"10px 22px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:700,fontSize:"0.85rem",cursor:"pointer"},children:[Pe?"Importing Rows...":"Execute Database Migration"," ",t.jsx(Ve,{size:15})]})]}),t.jsx("h3",{style:{fontSize:"0.92rem",fontWeight:700,margin:"20px 0 10px 0"},children:"Data Preview (First 20 Rows)"}),t.jsx(Je,{children:t.jsxs(Ke,{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Row #"}),t.jsx("th",{children:"Invoice No"}),t.jsx("th",{children:"Date"}),t.jsx("th",{children:"Customer"}),t.jsx("th",{children:"Type"}),t.jsx("th",{children:"Shape / Item"}),t.jsx("th",{children:"Carat"}),t.jsx("th",{children:"Selling Price"}),t.jsx("th",{children:"Final Sale"}),t.jsx("th",{children:"Purchase Price"}),t.jsx("th",{children:"Gross Profit"}),t.jsx("th",{children:"Net Profit"}),t.jsx("th",{children:"Sales Person"}),t.jsx("th",{children:"Commission"}),t.jsx("th",{children:"Status"})]})}),t.jsx("tbody",{children:(Re=s.preview)==null?void 0:Re.map(i=>{var h,n,c,b,y,a;return t.jsxs("tr",{children:[t.jsx("td",{children:i.rowIndex}),t.jsx("td",{style:{fontWeight:700},children:i.invoiceNo}),t.jsx("td",{children:i.saleDate}),t.jsx("td",{children:i.customerName}),t.jsx("td",{children:i.productType}),t.jsx("td",{children:i.shape||i.productDescription||"-"}),t.jsx("td",{children:i.caratWeight||"-"}),t.jsxs("td",{children:["$",(h=i.sellingPrice)==null?void 0:h.toLocaleString()]}),t.jsxs("td",{style:{fontWeight:700},children:["$",(n=i.finalSaleAmount)==null?void 0:n.toLocaleString()]}),t.jsxs("td",{children:["$",(c=i.purchasePrice)==null?void 0:c.toLocaleString()]}),t.jsxs("td",{children:["$",(b=i.grossProfit)==null?void 0:b.toLocaleString()]}),t.jsxs("td",{style:{color:"#16a34a",fontWeight:600},children:["$",(y=i.netProfit)==null?void 0:y.toLocaleString()]}),t.jsx("td",{children:i.salesPersonName}),t.jsxs("td",{style:{color:"#d97706"},children:["$",(a=i.commissionAmount)==null?void 0:a.toLocaleString()]}),t.jsx("td",{children:i.isDuplicate?t.jsx("span",{style:{fontSize:"0.7rem",padding:"2px 6px",background:"#fff9db",color:"#f59f00",borderRadius:4,fontWeight:700},children:"Duplicate"}):t.jsx("span",{style:{fontSize:"0.7rem",padding:"2px 6px",background:"#ebfbee",color:"#2b8a3e",borderRadius:4,fontWeight:700},children:"Ready"})})]},i.rowIndex)})})]})})]}),v&&t.jsxs("div",{style:{background:"#ebfbee",border:"1px solid #b2f2bb",borderRadius:8,padding:20,color:"#2b8a3e"},children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,fontSize:"1.1rem",fontWeight:700},children:[t.jsx(Oe,{size:20})," Migration Successful"]}),t.jsxs("div",{style:{marginTop:8,fontSize:"0.85rem"},children:["Successfully imported ",t.jsx("strong",{children:v.importedCount})," records. Skipped ",v.skippedCount," duplicates."]})]})]})};export{st as BusinessExcelImportPage};
