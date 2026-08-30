import{u as We,j as o,aV as Be,aN as He,r as l,X as x,ay as xe}from"./react-vendor-C99zPlZ9.js";import{g as i}from"./ui-vendor-w5XrXtd1.js";import{S as Me,a as J,R as T}from"./admin-pages-o0cgFWXb.js";import{g as Ue}from"./diamondImageHelper-BFWwNb-k.js";import{L as I}from"./LuxuryDropdown-Cix548QX.js";import{D as Ve,A as _e,a as Ye}from"./diamondShapes-Cr3dfuxZ.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const Z=i.div`
  background-color: ${({theme:e})=>e.colors.white};
  border: 1px solid ${({theme:e})=>e.colors.border};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease;
  cursor: pointer;
  overflow: hidden;
  will-change: transform;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({theme:e})=>e.colors.gold};
    box-shadow: ${({theme:e})=>e.shadows.cardHover};
  }
`,Xe=i.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #f7f4ed;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 82%;
    height: 82%;
    object-fit: contain;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  ${Z}:hover & img {
    transform: scale(1.08);
  }
`,qe=i.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${({$isLab:e})=>e?"#1f1f1f":"#C9A45C"};
  color: #ffffff;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 9px;
  border-radius: 2px;
  backdrop-filter: blur(4px);
`,Ke=i.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(31, 31, 31, 0.85);
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background-color 0.2s ease;

  ${Z}:hover & {
    background-color: #c9a45c;
    transform: scale(1.1);
  }
`,Qe=i.div`
  padding: 22px 18px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: #ffffff;
`,Je=i.h4`
  font-family: ${({theme:e})=>e.fonts.heading};
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textPrimary};
  letter-spacing: 0.04em;
  text-transform: uppercase;
`,ge=i.div`
  font-size: 0.82rem;
  font-weight: 500;
  color: ${({theme:e})=>e.colors.textSecondary};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`,Ze=i.div`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: ${({theme:e})=>e.colors.deepGold};
  border: 1px solid ${({theme:e})=>e.colors.border};
  background-color: #faf5eb;
  padding: 4px 10px;
  margin: 4px 0;
  text-transform: uppercase;
  border-radius: 2px;
`,et=i.div`
  font-size: 1.18rem;
  font-weight: 600;
  color: ${({theme:e})=>e.colors.textPrimary};
  margin-top: 4px;
`,tt=i.button`
  width: 100%;
  background-color: transparent;
  border: 1px solid ${({theme:e})=>e.colors.textPrimary};
  color: ${({theme:e})=>e.colors.textPrimary};
  padding: 11px 16px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-top: 10px;
  border-radius: 2px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background-color: ${({theme:e})=>e.colors.textPrimary};
    border-color: ${({theme:e})=>e.colors.textPrimary};
    color: #c9a45c;
  }
`,ot=({diamond:e})=>{const s=We(),z=async E=>{E.stopPropagation();try{const F=await J.getWhatsAppInquiryMessage(e.diamondId);window.open(F.whatsappUrl,"_blank")}catch{window.open(`https://wa.me/447900123456?text=Interested in diamond ${e.diamondId}`,"_blank")}},D=!!(e.fancyColor||e.color==="FANCY"),R=e.fancyColor?`${e.fancyIntensity||"FANCY"} ${e.fancyColor}`:null;return o.jsxs(Z,{"data-diamond-id":e.diamondId,onClick:()=>s(`/diamonds/${e.diamondId}`),children:[o.jsxs(Xe,{children:[o.jsx(Me,{src:Ue(e),alt:`${e.carat}ct ${e.shape} Diamond`,loading:"lazy",width:"400",height:"400"}),o.jsx(qe,{$isLab:e.diamondType==="LAB_GROWN",children:e.growthType?e.growthType:e.diamondType==="LAB_GROWN"?"Lab-Grown":"Natural"}),e.videoUrl&&o.jsx(Ke,{title:"360 Video Available",children:o.jsx(Be,{size:14,fill:"white"})})]}),o.jsxs(Qe,{children:[o.jsxs(Je,{children:[e.carat.toFixed(2),"ct ",e.shape]}),o.jsx(ge,{children:D&&R?o.jsx("span",{style:{color:"#c9a45c",fontWeight:600},children:R}):`${e.color} | ${e.clarity} | ${e.cut||"EXCELLENT"}`}),D&&o.jsxs(ge,{style:{fontSize:"0.78rem"},children:[e.clarity," | ",e.cut||"EXCELLENT"]}),e.lab&&o.jsxs(Ze,{children:[e.lab," CERTIFIED"]}),o.jsxs(et,{children:["$",e.price.toLocaleString(),e.pricePerCarat&&o.jsxs("span",{style:{fontSize:"0.75rem",color:"#777",fontWeight:400,marginLeft:6},children:["($",Math.round(e.pricePerCarat).toLocaleString(),"/ct)"]})]}),o.jsx(tt,{onClick:z,children:"INQUIRE NOW"})]})]})},rt=["IGI","GIA","GCAL","HRD"],me=[{label:"PRICE: LOW → HIGH",value:"price-asc"},{label:"PRICE: HIGH → LOW",value:"price-desc"},{label:"CARAT: HIGH → LOW",value:"carat-desc"},{label:"CARAT: LOW → HIGH",value:"carat-asc"}],it=i.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  box-sizing: border-box;

  @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
    padding: 24px 16px 60px;
  }
`,st=i.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-family: ${({theme:e})=>e.fonts.heading};
    font-size: 3rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({theme:e})=>e.colors.textPrimary};
    margin-bottom: 12px;

    @media (max-width: 768px) {
      font-size: 2.2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.7rem;
      letter-spacing: 0.05em;
    }
  }

  p {
    font-size: 1.05rem;
    color: ${({theme:e})=>e.colors.textSecondary};

    @media (max-width: 480px) {
      font-size: 0.88rem;
    }
  }
`,at=i.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;

  @media (max-width: 576px) {
    gap: 8px;
  }
`,Q=i.button`
  padding: 12px 28px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background-color: ${({$active:e,theme:s})=>e?s.colors.textPrimary:"transparent"};
  color: ${({$active:e,theme:s})=>e?s.colors.white:s.colors.textPrimary};
  border: 1px solid ${({theme:e})=>e.colors.textPrimary};
  transition: all 0.2s ease;
  box-sizing: border-box;
  cursor: pointer;

  @media (max-width: 576px) {
    padding: 10px 16px;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
  }

  &:hover {
    background-color: ${({theme:e})=>e.colors.textPrimary};
    color: ${({theme:e})=>e.colors.white};
  }
`,nt=i.div`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  gap: 10px;
  margin-bottom: 32px;

  @media (max-width: ${({theme:e})=>e.breakpoints.laptop}) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`,he=i.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: ${({$selected:e})=>e?"brightness(0) saturate(100%) invert(69%) sepia(26%) saturate(1048%) hue-rotate(5deg) brightness(92%) contrast(87%)":"brightness(0.2)"};
  transition: filter 0.2s ease, transform 0.2s ease;
`,lt=i.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 6px;
  background-color: ${({$selected:e,theme:s})=>e?s.colors.white:"#fffdf9"};
  border: 1px solid ${({$selected:e,theme:s})=>e?s.colors.gold:s.colors.border};
  box-shadow: ${({$selected:e})=>e?"0 2px 10px rgba(201, 164, 92, 0.25)":"none"};
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;

  span {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-top: 6px;
    color: ${({$selected:e,theme:s})=>e?s.colors.gold:s.colors.textPrimary};
    transition: color 0.2s ease;
  }

  &:hover, &:focus-visible {
    border-color: ${({theme:e})=>e.colors.gold};
    background-color: ${({theme:e})=>e.colors.white};
    box-shadow: 0 4px 12px rgba(201, 164, 92, 0.2);

    span {
      color: ${({theme:e})=>e.colors.gold};
    }

    ${he} {
      filter: brightness(0) saturate(100%) invert(69%) sepia(26%) saturate(1048%) hue-rotate(5deg) brightness(92%) contrast(87%);
      transform: scale(1.08);
    }
  }
`,ct=i.div`
  background-color: ${({theme:e})=>e.colors.white};
  border: 1px solid ${({theme:e})=>e.colors.border};
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    padding: 16px;
  }
`,dt=i.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 24px;
  align-items: flex-end;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`,k=i.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({theme:e})=>e.colors.textPrimary};
  }

  .input-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  input {
    width: 100%;
    padding: 8px 12px;
    font-size: 0.85rem;
    border: 1px solid ${({theme:e})=>e.colors.border};
    background-color: ${({theme:e})=>e.colors.background};
    outline: none;

    &:focus {
      border-color: ${({theme:e})=>e.colors.gold};
    }
  }
`;i.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;i.button`
  padding: 6px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid ${({$active:e,theme:s})=>e?s.colors.gold:s.colors.border};
  background-color: ${({$active:e,theme:s})=>e?s.colors.lightGold:"transparent"};
  color: ${({$active:e,theme:s})=>e?s.colors.deepGold:s.colors.textPrimary};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: ${({theme:e})=>e.colors.gold};
  }
`;const pt=i.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 12px 16px;
  background-color: #faf8f5;
  border: 1px solid #e8e3d9;

  .label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #c9a45c;
    margin-right: 4px;
  }
`,g=i.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background-color: #ffffff;
  border: 1px solid #c9a45c;
  color: #1a1918;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #c9a45c;
    color: #ffffff;
  }
`,xt=i.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: transparent;
  border: 1px dashed #c9a45c;
  color: #c9a45c;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;

  &:hover {
    background: #c9a45c;
    color: #ffffff;
  }
`,gt=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: ${({theme:e})=>e.colors.white};
  border: 1px solid ${({theme:e})=>e.colors.border};
  margin-bottom: 32px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
    padding: 12px 16px;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
`;i.div`
  position: relative;
  user-select: none;
`;i.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 14px;
  background-color: #ffffff;
  border: 1px solid ${({$open:e,theme:s})=>e?s.colors.gold:s.colors.border};
  border-radius: 2px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: ${({theme:e})=>e.colors.textPrimary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover, &:focus-visible {
    border-color: ${({theme:e})=>e.colors.gold};
    outline: none;
  }

  .arrow {
    transition: transform 0.2s ease;
    transform: ${({$open:e})=>e?"rotate(180deg)":"rotate(0deg)"};
  }
`;i.ul`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  width: 230px;
  background-color: #ffffff;
  border: 1px solid ${({theme:e})=>e.colors.border};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  list-style: none;
  padding: 6px 0;
  margin: 0;
  z-index: 100;

  @media (max-width: 576px) {
    left: 0;
    right: auto;
    width: 100%;
  }
`;i.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  font-size: 0.78rem;
  font-weight: ${({$selected:e})=>e?"700":"500"};
  letter-spacing: 0.06em;
  color: ${({$selected:e,theme:s})=>e?s.colors.gold:s.colors.textPrimary};
  background-color: ${({$selected:e})=>e?"#faf8f5":"transparent"};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: #f7f5f0;
    color: ${({theme:e})=>e.colors.gold};
  }
`;const mt=i.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: ${({theme:e})=>e.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({theme:e})=>e.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`,ht=i.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 48px;

  button {
    padding: 8px 16px;
    border: 1px solid ${({theme:e})=>e.colors.border};
    background-color: ${({theme:e})=>e.colors.white};
    font-size: 0.85rem;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`,Lt=()=>{var le,ce,de;const[e,s]=He(),z=(le=e.get("type"))==null?void 0:le.toUpperCase(),D=z==="NATURAL"||z==="LAB_GROWN"?z:"ALL",R=e.get("shapes")?e.get("shapes").split(","):[],E=e.get("colors")?e.get("colors").split(","):[],F=e.get("clarities")?e.get("clarities").split(","):[],fe=e.get("certificate")||e.get("labs")||e.get("lab")?(e.get("certificate")||e.get("labs")||e.get("lab")).split(","):[],ue=e.get("minCarat")||"",be=e.get("maxCarat")||"",ye=e.get("minPrice")||"",je=e.get("maxPrice")||"",Ce=e.get("growthType")||"",we=e.get("sort")||"price-asc",[ve,$e]=l.useState([]),[ee,Le]=l.useState(0),[G,Ae]=l.useState(1),[m,n]=l.useState(1),[d,O]=l.useState(D),[h,te]=l.useState(R),[f,W]=l.useState(E),[u,B]=l.useState(F),[b,H]=l.useState(fe),[y,M]=l.useState(ue),[j,U]=l.useState(be),[C,V]=l.useState(ye),[w,_]=l.useState(je),[v,Y]=l.useState(Ce),[S,oe]=l.useState(we),[ft,re]=l.useState(!1),ie=l.useRef(null);l.useEffect(()=>{const t=a=>{ie.current&&!ie.current.contains(a.target)&&re(!1)},r=a=>{a.key==="Escape"&&re(!1)};return document.addEventListener("mousedown",t),document.addEventListener("keydown",r),()=>{document.removeEventListener("mousedown",t),document.removeEventListener("keydown",r)}},[]);const ke=((ce=e.get("classification"))==null?void 0:ce.toUpperCase())||"WHITE",Se=e.get("fancyColor")?e.get("fancyColor").split(","):[],Ie=e.get("overtone")?e.get("overtone").split(","):[],Pe=e.get("intensity")?e.get("intensity").split(","):[],[p,se]=l.useState(ke),[$,X]=l.useState(Se),[L,q]=l.useState(Ie),[A,K]=l.useState(Pe);l.useEffect(()=>{const t={};d!=="ALL"&&(t.type=d),p&&(t.classification=p),h.length>0&&(t.shapes=h.join(",")),f.length>0&&(t.colors=f.join(",")),$.length>0&&(t.fancyColor=$.join(",")),L.length>0&&(t.overtone=L.join(",")),A.length>0&&(t.intensity=A.join(",")),u.length>0&&(t.clarities=u.join(",")),b.length>0&&(t.certificate=b.join(",")),y&&(t.minCarat=y),j&&(t.maxCarat=j),C&&(t.minPrice=C),w&&(t.maxPrice=w),v&&(t.growthType=v),S&&S!=="price-asc"&&(t.sort=S),m>1&&(t.page=m.toString()),s(t,{replace:!0})},[d,p,h,f,$,L,A,u,b,y,j,C,w,v,S,m,s]);const[c,Te]=l.useState(null);l.useEffect(()=>{J.getDiamondFilterConfig().then(t=>{t&&Te(t)}).catch(console.error)},[]);const ze=()=>{const t={page:m,limit:100,sort:S,type:d==="ALL"?void 0:d,classification:p,shapes:h.length>0?h.join(","):void 0,minCarat:y||void 0,maxCarat:j||void 0,colors:f.length>0?f.join(","):void 0,fancyColor:$.length>0?$.join(","):void 0,overtone:L.length>0?L.join(","):void 0,intensity:A.length>0?A.join(","):void 0,clarities:u.length>0?u.join(","):void 0,labs:b.length>0?b.join(","):void 0,minPrice:C||void 0,maxPrice:w||void 0,growthType:v||void 0};J.getDiamonds(t).then(r=>{var a,N;$e(r.diamonds||[]),Le(((a=r.pagination)==null?void 0:a.total)||0),Ae(((N=r.pagination)==null?void 0:N.totalPages)||1)}).catch(console.error)};l.useEffect(()=>{ze()},[d,p,h,f,$,L,A,u,b,y,j,C,w,v,S,m]);const ae=t=>{te(r=>r.includes(t)?r.filter(a=>a!==t):[...r,t])},Oe=t=>{W(r=>r.includes(t)?r.filter(a=>a!==t):[...r,t])},Ne=t=>{B(r=>r.includes(t)?r.filter(a=>a!==t):[...r,t])},De=t=>{H(r=>r.includes(t)?r.filter(a=>a!==t):[...r,t])},P=()=>{te([]),W([]),X([]),q([]),K([]),B([]),H([]),M(""),U(""),V(""),_(""),Y(""),n(1)},ne=()=>{O("ALL"),P(),oe("price-asc")},Re=d!=="ALL"||h.length>0||f.length>0||$.length>0||L.length>0||A.length>0||u.length>0||b.length>0||!!y||!!j||!!C||!!w||!!v;return(de=me.find(t=>t.value===S))!=null&&de.label,o.jsxs(it,{children:[o.jsx(T,{yOffset:35,children:o.jsxs(st,{children:[o.jsx("h1",{children:"THE DIAMOND VAULT"}),o.jsx("p",{children:"Select your perfect loose diamond from our certified international inventory."})]})}),o.jsx(T,{yOffset:25,children:o.jsxs(at,{children:[o.jsx(Q,{$active:d==="ALL",onClick:()=>{O("ALL"),P()},children:"ALL DIAMONDS"}),o.jsx(Q,{$active:d==="NATURAL",onClick:()=>{O("NATURAL"),P()},children:"NATURAL DIAMONDS"}),o.jsx(Q,{$active:d==="LAB_GROWN",onClick:()=>{O("LAB_GROWN"),P()},children:"LAB-GROWN"})]})}),o.jsx(T,{yOffset:20,children:o.jsxs("div",{style:{display:"flex",gap:16,marginBottom:24,borderBottom:"1px solid #d9d3c7",paddingBottom:12},children:[o.jsx("button",{onClick:()=>{se("WHITE"),P()},style:{background:"none",border:"none",fontFamily:"Cormorant Garamond, serif",fontSize:"1.2rem",fontWeight:p==="WHITE"?700:500,letterSpacing:"0.1em",textTransform:"uppercase",color:p==="WHITE"?"#c9a45c":"#1f1f1f",borderBottom:p==="WHITE"?"2px solid #c9a45c":"2px solid transparent",paddingBottom:6,cursor:"pointer"},children:"WHITE DIAMONDS"}),o.jsx("button",{onClick:()=>{se("FANCY"),P()},style:{background:"none",border:"none",fontFamily:"Cormorant Garamond, serif",fontSize:"1.2rem",fontWeight:p==="FANCY"?700:500,letterSpacing:"0.1em",textTransform:"uppercase",color:p==="FANCY"?"#c9a45c":"#1f1f1f",borderBottom:p==="FANCY"?"2px solid #c9a45c":"2px solid transparent",paddingBottom:6,cursor:"pointer"},children:"FANCY COLOR DIAMONDS"})]})}),o.jsx(T,{yOffset:25,children:o.jsx(nt,{children:Ve.map((t,r)=>{const a=t.value||t.name,N=t.name||a,Fe=a?a.charAt(0).toUpperCase()+a.slice(1).toLowerCase():"",Ee=t.image||`/assets/diamonds/${Fe}.svg`,pe=h.includes(a.toUpperCase())||h.includes(a);return o.jsxs(lt,{$selected:pe,onClick:()=>{ae(a.toUpperCase()),n(1)},"data-testid":`shape-btn-${a.toLowerCase()}`,children:[o.jsx(he,{src:Ee,alt:N,$selected:pe,onError:Ge=>{Ge.target.style.display="block"}}),o.jsx("span",{children:N.toUpperCase()})]},a)})})}),o.jsx(T,{yOffset:25,children:o.jsx(ct,{children:o.jsxs(dt,{children:[o.jsxs(k,{children:[o.jsx("label",{children:"Carat Weight"}),o.jsxs("div",{className:"input-row",children:[o.jsx("input",{type:"number",step:"0.01",min:"0",placeholder:"Min",value:y,onChange:t=>{M(t.target.value),n(1)}}),o.jsx("span",{children:"-"}),o.jsx("input",{type:"number",step:"0.01",min:"0",placeholder:"Max",value:j,onChange:t=>{U(t.target.value),n(1)}})]})]}),p==="WHITE"&&o.jsx(k,{children:o.jsx(I,{label:"Color Grade",options:[{label:"All White Colors",value:""},...((c==null?void 0:c.colors)||_e).map(t=>({label:`Color ${t}`,value:t}))],value:f[0]||"",onChange:t=>{W(t?[t]:[]),n(1)},fullWidth:!0})}),d!=="NATURAL"&&o.jsx(k,{children:o.jsx(I,{label:"Growth Method",options:[{label:"All Growth Methods",value:""},{label:"HPHT (High Pressure High Temp)",value:"HPHT"},{label:"CVD (Chemical Vapor Deposition)",value:"CVD"}],value:v,onChange:t=>{Y(t),n(1)},fullWidth:!0})}),p==="FANCY"&&o.jsxs(o.Fragment,{children:[o.jsx(k,{children:o.jsx(I,{label:"Fancy Color",options:[{label:"All Fancy Colors",value:""},...((c==null?void 0:c.fancyColors)||["Yellow","Orange","Pink","Blue","Green","Brown","Red","White","Violet","Purple","Gray","Olive","Black","Other"]).map(t=>{const r=typeof t=="string"?t:t.name||t.value;return{label:r,value:r}})],value:$[0]||"",onChange:t=>{X(t?[t]:[]),n(1)},fullWidth:!0})}),o.jsx(k,{children:o.jsx(I,{label:"Overtone",options:[{label:"All Overtones",value:""},...((c==null?void 0:c.overtones)||["Yellow","Yellowish","Pink","Pinkish","Blue","Bluish","Red","Reddish","Green","Greenish","Purple","Purplish","Orange","Orangy","Violet","Violetish","Gray","Grayish","Black","Brown","Brownish","Champagne","Cognac","Chameleon","White","Other"]).map(t=>({label:t,value:t}))],value:L[0]||"",onChange:t=>{q(t?[t]:[]),n(1)},fullWidth:!0})}),o.jsx(k,{children:o.jsx(I,{label:"Intensity",options:[{label:"All Intensities",value:""},...((c==null?void 0:c.intensities)||["Fancy Deep","Fancy Dark","Fancy Vivid","Fancy Intense","Fancy","Very Light","Fancy Light","Light","Faint"]).map(t=>({label:t,value:t}))],value:A[0]||"",onChange:t=>{K(t?[t]:[]),n(1)},fullWidth:!0})})]}),o.jsx(k,{children:o.jsx(I,{label:"Clarity Grade",options:[{label:"All Clarities",value:""},...((c==null?void 0:c.clarities)||Ye).map(t=>({label:t,value:t}))],value:u[0]||"",onChange:t=>{B(t?[t]:[]),n(1)},fullWidth:!0})}),o.jsx(k,{children:o.jsx(I,{label:"Lab Certification",options:[{label:"All Certifications",value:""},...((c==null?void 0:c.certifications)||rt).map(t=>({label:t,value:t}))],value:b[0]||"",onChange:t=>{H(t?[t]:[]),n(1)},fullWidth:!0})}),o.jsxs(k,{children:[o.jsx("label",{children:"Price Range ($)"}),o.jsxs("div",{className:"input-row",children:[o.jsx("input",{type:"number",step:"10",min:"0",placeholder:"Min $",value:C,onChange:t=>{V(t.target.value),n(1)}}),o.jsx("span",{children:"-"}),o.jsx("input",{type:"number",step:"10",min:"0",placeholder:"Max $",value:w,onChange:t=>{_(t.target.value),n(1)}})]})]})]})})}),Re&&o.jsxs(pt,{children:[o.jsx("span",{className:"label",children:"FILTERS:"}),d!=="ALL"&&o.jsxs(g,{onClick:()=>{O("ALL"),n(1)},children:[d==="NATURAL"?"Natural Diamonds":"Lab-Grown"," ",o.jsx(x,{size:12})]}),h.map(t=>o.jsxs(g,{onClick:()=>{ae(t),n(1)},children:[t," ",o.jsx(x,{size:12})]},t)),b.map(t=>o.jsxs(g,{onClick:()=>{De(t),n(1)},children:[t," ",o.jsx(x,{size:12})]},t)),f.map(t=>o.jsxs(g,{onClick:()=>{Oe(t),n(1)},children:["Color ",t," ",o.jsx(x,{size:12})]},t)),$.map(t=>o.jsxs(g,{onClick:()=>{X(r=>r.filter(a=>a!==t)),n(1)},children:["Fancy: ",t," ",o.jsx(x,{size:12})]},t)),L.map(t=>o.jsxs(g,{onClick:()=>{q(r=>r.filter(a=>a!==t)),n(1)},children:["Overtone: ",t," ",o.jsx(x,{size:12})]},t)),A.map(t=>o.jsxs(g,{onClick:()=>{K(r=>r.filter(a=>a!==t)),n(1)},children:["Intensity: ",t," ",o.jsx(x,{size:12})]},t)),u.map(t=>o.jsxs(g,{onClick:()=>{Ne(t),n(1)},children:[t," ",o.jsx(x,{size:12})]},t)),(y||j)&&o.jsxs(g,{onClick:()=>{M(""),U(""),n(1)},children:[y||"0"," - ",j||"∞"," ct ",o.jsx(x,{size:12})]}),v&&o.jsxs(g,{onClick:()=>{Y(""),n(1)},children:["Growth: ",v," ",o.jsx(x,{size:12})]}),(C||w)&&o.jsxs(g,{onClick:()=>{V(""),_(""),n(1)},children:["$",C||"0"," - $",w||"∞"," ",o.jsx(x,{size:12})]}),o.jsxs(xt,{onClick:ne,children:[o.jsx(xe,{size:12})," CLEAR ALL"]})]}),o.jsxs(gt,{children:[o.jsx("div",{children:o.jsxs("span",{"data-testid":"diamond-count",children:[ee.toLocaleString()," ",ee===1?"DIAMOND FOUND":"DIAMONDS FOUND"]})}),o.jsxs("div",{style:{display:"flex",gap:16,alignItems:"center"},children:[o.jsxs("button",{onClick:ne,style:{fontSize:"0.8rem",display:"flex",alignItems:"center",gap:6,cursor:"pointer",background:"none",border:"none",color:"#55524D"},children:[o.jsx(xe,{size:14})," RESET FILTERS"]}),o.jsx(I,{options:me,value:S,onChange:t=>{oe(t),n(1)},fullWidth:!1,style:{width:220}})]})]}),o.jsx(mt,{children:ve.map((t,r)=>o.jsx(T,{staggerIndex:r,yOffset:25,children:o.jsx(ot,{diamond:t})},t.id))}),G>1&&o.jsxs(ht,{children:[o.jsx("button",{disabled:m===1,onClick:()=>n(m-1),children:"PREVIOUS"}),o.jsxs("span",{children:["Page ",m," of ",G]}),o.jsx("button",{disabled:m===G,onClick:()=>n(m+1),children:"NEXT"})]})]})};export{Lt as DiamondVaultPage};
