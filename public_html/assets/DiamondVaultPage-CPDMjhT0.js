import{u as He,j as t,aW as Me,aP as Ue,r as l,X as h,aa as ge}from"./react-vendor-BsBv4awM.js";import{g as n}from"./ui-vendor-C0FaE403.js";import{S as Ve,a as Z,R as I}from"./admin-pages-BYybl7sm.js";import{g as _e}from"./diamondImageHelper-BFWwNb-k.js";import{L as x}from"./LuxuryDropdown-C7uKpys6.js";import{D as Ye,A as Xe,a as he}from"./diamondShapes-Cr3dfuxZ.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const ee=n.div`
  background-color: ${({theme:o})=>o.colors.white};
  border: 1px solid ${({theme:o})=>o.colors.border};
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
    border-color: ${({theme:o})=>o.colors.gold};
    box-shadow: ${({theme:o})=>o.shadows.cardHover};
  }
`,qe=n.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #0B0B0B;
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

  ${ee}:hover & img {
    transform: scale(1.08);
  }
`,Ke=n.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: ${({$isLab:o})=>o?"#1f1f1f":"#C9A45C"};
  color: #ffffff;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 9px;
  border-radius: 2px;
  backdrop-filter: blur(4px);
`,Qe=n.div`
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

  ${ee}:hover & {
    background-color: #c9a45c;
    transform: scale(1.1);
  }
`,Je=n.div`
  padding: 22px 18px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: #151515;
`,Ze=n.h4`
  font-family: ${({theme:o})=>o.fonts.heading};
  font-size: 1.3rem;
  font-weight: 600;
  color: #F5F1E8;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`,ue=n.div`
  font-size: 0.82rem;
  font-weight: 500;
  color: #D8D2C5;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`,et=n.div`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #C9A96E;
  border: 1px solid rgba(140, 116, 75, 0.3);
  background-color: #1F1F1F;
  padding: 4px 10px;
  margin: 4px 0;
  text-transform: uppercase;
  border-radius: 4px;
`,tt=n.div`
  font-size: 1.18rem;
  font-weight: 700;
  color: #C9A96E;
  margin-top: 4px;
`,ot=n.button`
  width: 100%;
  background-color: transparent;
  border: 1px solid rgba(140, 116, 75, 0.4);
  color: #F5F1E8;
  padding: 11px 16px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background-color: #C9A96E;
    border-color: #C9A96E;
    color: #0B0B0B;
    transform: translateY(-1px);
  }
`,rt=({diamond:o})=>{const z=He(),T=async M=>{M.stopPropagation();try{const N=await Z.getWhatsAppInquiryMessage(o.diamondId);window.open(N.whatsappUrl,"_blank")}catch{window.open(`https://wa.me/917990278892?text=Interested in diamond ${o.diamondId}`,"_blank")}},O=!!(o.fancyColor||o.color==="FANCY"),P=o.fancyColor?`${o.fancyIntensity||"FANCY"} ${o.fancyColor}`:null;return t.jsxs(ee,{"data-diamond-id":o.diamondId,onClick:()=>z(`/diamonds/${o.diamondId}`),children:[t.jsxs(qe,{children:[t.jsx(Ve,{src:_e(o),alt:`${o.carat}ct ${o.shape} Diamond`,loading:"lazy",width:"400",height:"400"}),t.jsx(Ke,{$isLab:o.diamondType==="LAB_GROWN",children:o.growthType?o.growthType:o.diamondType==="LAB_GROWN"?"Lab-Grown":"Natural"}),o.videoUrl&&t.jsx(Qe,{title:"360 Video Available",children:t.jsx(Me,{size:14,fill:"white"})})]}),t.jsxs(Je,{children:[t.jsxs(Ze,{children:[o.carat.toFixed(2),"ct ",o.shape]}),t.jsx(ue,{children:O&&P?t.jsx("span",{style:{color:"#c9a45c",fontWeight:600},children:P}):`${o.color} | ${o.clarity} | ${o.cut||"EXCELLENT"}`}),O&&t.jsxs(ue,{style:{fontSize:"0.78rem"},children:[o.clarity," | ",o.cut||"EXCELLENT"]}),o.lab&&t.jsxs(et,{children:[o.lab," CERTIFIED"]}),t.jsxs(tt,{children:["$",o.price.toLocaleString(),o.pricePerCarat&&t.jsxs("span",{style:{fontSize:"0.75rem",color:"#777",fontWeight:400,marginLeft:6},children:["($",Math.round(o.pricePerCarat).toLocaleString(),"/ct)"]})]}),t.jsx(ot,{onClick:T,children:"INQUIRE NOW"})]})]})},Q=["IGI","GIA","GCAL","HRD"],me=[{label:"PRICE: LOW → HIGH",value:"price-asc"},{label:"PRICE: HIGH → LOW",value:"price-desc"},{label:"CARAT: HIGH → LOW",value:"carat-desc"},{label:"CARAT: LOW → HIGH",value:"carat-asc"}],at=n.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  box-sizing: border-box;
  color: #F5F1E8;

  @media (max-width: ${({theme:o})=>o.breakpoints.tablet}) {
    padding: 24px 16px 60px;
  }
`,it=n.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-family: ${({theme:o})=>o.fonts.heading};
    font-size: 3rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
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
    color: #D8D2C5;

    @media (max-width: 480px) {
      font-size: 0.88rem;
    }
  }
`,nt=n.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;

  @media (max-width: 576px) {
    gap: 8px;
  }
`,J=n.button`
  padding: 12px 28px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background-color: ${({$active:o})=>o?"#C9A96E":"transparent"};
  color: ${({$active:o})=>o?"#0B0B0B":"#F5F1E8"};
  border: 1px solid ${({$active:o})=>o?"#C9A96E":"rgba(140, 116, 75, 0.35)"};
  transition: all 0.2s ease;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 4px;

  @media (max-width: 576px) {
    padding: 10px 16px;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
  }

  &:hover {
    background-color: #DFBA73;
    color: #0B0B0B;
    border-color: #DFBA73;
  }
`,st=n.div`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  gap: 10px;
  margin-bottom: 32px;

  @media (max-width: ${({theme:o})=>o.breakpoints.laptop}) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: ${({theme:o})=>o.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
`,be=n.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: ${({$selected:o})=>o?"brightness(0) saturate(100%) invert(69%) sepia(26%) saturate(1048%) hue-rotate(5deg) brightness(92%) contrast(87%)":"brightness(0) invert(0.85)"};
  transition: filter 0.2s ease, transform 0.2s ease;
`,lt=n.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 6px;
  background-color: ${({$selected:o})=>o?"#1E1E1E":"#151515"};
  border: 1px solid ${({$selected:o})=>o?"#C9A96E":"rgba(140, 116, 75, 0.25)"};
  border-radius: 4px;
  box-shadow: ${({$selected:o})=>o?"0 2px 10px rgba(201, 169, 110, 0.25)":"none"};
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;

  span {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-top: 6px;
    color: ${({$selected:o})=>o?"#C9A96E":"#F5F1E8"};
    transition: color 0.2s ease;
  }

  &:hover, &:focus-visible {
    border-color: #C9A96E;
    background-color: #1E1E1E;
    box-shadow: 0 4px 12px rgba(201, 169, 110, 0.2);

    span {
      color: #C9A96E;
    }

    ${be} {
      filter: brightness(0) saturate(100%) invert(69%) sepia(26%) saturate(1048%) hue-rotate(5deg) brightness(92%) contrast(87%);
      transform: scale(1.08);
    }
  }
`,ct=n.div`
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 6px;
  padding: 24px;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 10;

  @media (max-width: ${({theme:o})=>o.breakpoints.mobile}) {
    padding: 16px;
  }
`,pt=n.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 24px;
  align-items: flex-end;

  @media (max-width: ${({theme:o})=>o.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: ${({theme:o})=>o.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`,p=n.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
  }

  .input-row {
    display: flex;
    gap: 8px;
    align-items: center;
    color: #A8A8A8;
  }

  input {
    width: 100%;
    height: 40px;
    padding: 0 12px;
    font-size: 0.85rem;
    border: 1px solid rgba(140, 116, 75, 0.25);
    background-color: #111111;
    color: #F5F1E8;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #C9A96E;
    }

    &::placeholder {
      color: #777777;
    }
  }
`;n.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;n.button`
  padding: 6px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid ${({$active:o})=>o?"#C9A96E":"rgba(140, 116, 75, 0.25)"};
  background-color: ${({$active:o})=>o?"#C9A96E":"#111111"};
  color: ${({$active:o})=>o?"#0B0B0B":"#F5F1E8"};
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: #C9A96E;
  }
`;const dt=n.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 12px 16px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 6px;

  .label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #C9A96E;
    margin-right: 4px;
  }
`,u=n.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background-color: #1F1F1F;
  border: 1px solid rgba(140, 116, 75, 0.35);
  color: #F5F1E8;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #C9A96E;
    color: #0B0B0B;
  }
`,xt=n.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: transparent;
  border: 1px dashed #C9A96E;
  color: #C9A96E;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #C9A96E;
    color: #0B0B0B;
  }
`,gt=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 6px;
  margin-bottom: 32px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #F5F1E8;
  position: relative;
  z-index: 1;

  @media (max-width: ${({theme:o})=>o.breakpoints.tablet}) {
    padding: 12px 16px;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
`,ht=n.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: ${({theme:o})=>o.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({theme:o})=>o.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`,ut=n.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 48px;
  color: #F5F1E8;

  button {
    padding: 8px 16px;
    border: 1px solid rgba(140, 116, 75, 0.25);
    background-color: #151515;
    color: #F5F1E8;
    border-radius: 4px;
    font-size: 0.85rem;
    cursor: pointer;

    &:hover:not(:disabled) {
      border-color: #C9A96E;
      color: #C9A96E;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`,Et=()=>{var ce,pe,de;const[o,z]=Ue(),T=(ce=o.get("type"))==null?void 0:ce.toUpperCase(),O=T==="NATURAL"||T==="LAB_GROWN"?T:"ALL",P=o.get("shapes")?o.get("shapes").split(","):[],M=o.get("colors")?o.get("colors").split(","):[],N=o.get("clarities")?o.get("clarities").split(","):[],fe=o.get("certificate")||o.get("labs")||o.get("lab")?(o.get("certificate")||o.get("labs")||o.get("lab")).split(","):[],Ce=o.get("minCarat")||"",je=o.get("maxCarat")||"",ye=o.get("minPrice")||"",ve=o.get("maxPrice")||"",Ae=o.get("growthType")||"",we=o.get("sort")||"price-asc",[Ee,Le]=l.useState([]),[te,Fe]=l.useState(0),[U,Se]=l.useState(1),[m,a]=l.useState(1),[c,$]=l.useState(O),[b,oe]=l.useState(P),[v,V]=l.useState(M),[f,R]=l.useState(N),[g,B]=l.useState(fe),[A,_]=l.useState(Ce),[w,Y]=l.useState(je),[C,W]=l.useState(ye),[j,G]=l.useState(ve),[y,H]=l.useState(Ae),[S,re]=l.useState(we),[mt,ae]=l.useState(!1),ie=l.useRef(null);l.useEffect(()=>{const e=i=>{ie.current&&!ie.current.contains(i.target)&&ae(!1)},r=i=>{i.key==="Escape"&&ae(!1)};return document.addEventListener("mousedown",e),document.addEventListener("keydown",r),()=>{document.removeEventListener("mousedown",e),document.removeEventListener("keydown",r)}},[]);const ke=((pe=o.get("classification"))==null?void 0:pe.toUpperCase())||"WHITE",Ie=o.get("fancyColor")?o.get("fancyColor").split(","):[],Te=o.get("overtone")?o.get("overtone").split(","):[],$e=o.get("intensity")?o.get("intensity").split(","):[],[d,ne]=l.useState(ke),[E,X]=l.useState(Ie),[L,q]=l.useState(Te),[F,K]=l.useState($e);l.useEffect(()=>{const e={};c!=="ALL"&&(e.type=c),d&&(e.classification=d),b.length>0&&(e.shapes=b.join(",")),v.length>0&&(e.colors=v.join(",")),E.length>0&&(e.fancyColor=E.join(",")),L.length>0&&(e.overtone=L.join(",")),F.length>0&&(e.intensity=F.join(",")),f.length>0&&(e.clarities=f.join(",")),g.length>0&&(e.certificate=g.join(",")),A&&(e.minCarat=A),w&&(e.maxCarat=w),C&&(e.minPrice=C),j&&(e.maxPrice=j),y&&(e.growthType=y),S&&S!=="price-asc"&&(e.sort=S),m>1&&(e.page=m.toString()),z(e,{replace:!0})},[c,d,b,v,E,L,F,f,g,A,w,C,j,y,S,m,z]);const[s,Be]=l.useState(null);l.useEffect(()=>{Z.getDiamondFilterConfig().then(e=>{e&&Be(e)}).catch(console.error)},[]);const De=()=>{const e={page:m,limit:100,sort:S,type:c==="ALL"?void 0:c,classification:d,shapes:b.length>0?b.join(","):void 0,minCarat:A||void 0,maxCarat:w||void 0,colors:v.length>0?v.join(","):void 0,fancyColor:E.length>0?E.join(","):void 0,overtone:L.length>0?L.join(","):void 0,intensity:F.length>0?F.join(","):void 0,clarities:f.length>0?f.join(","):void 0,labs:g.length>0?g.join(","):void 0,minPrice:C||void 0,maxPrice:j||void 0,growthType:y||void 0};Z.getDiamonds(e).then(r=>{var i,D;Le(r.diamonds||[]),Fe(((i=r.pagination)==null?void 0:i.total)||0),Se(((D=r.pagination)==null?void 0:D.totalPages)||1)}).catch(console.error)};l.useEffect(()=>{De()},[c,d,b,v,E,L,F,f,g,A,w,C,j,y,S,m]);const se=e=>{oe(r=>r.includes(e)?r.filter(i=>i!==e):[...r,e])},ze=e=>{V(r=>r.includes(e)?r.filter(i=>i!==e):[...r,e])},Oe=e=>{R(r=>r.includes(e)?r.filter(i=>i!==e):[...r,e])},Pe=e=>{B(r=>r.includes(e)?r.filter(i=>i!==e):[...r,e])},k=()=>{oe([]),V([]),X([]),q([]),K([]),R([]),B([]),_(""),Y(""),W(""),G(""),H(""),a(1)},le=()=>{$("ALL"),k(),re("price-asc")},Ne=c!=="ALL"||b.length>0||v.length>0||E.length>0||L.length>0||F.length>0||f.length>0||g.length>0||!!A||!!w||!!C||!!j||!!y;return(de=me.find(e=>e.value===S))!=null&&de.label,t.jsxs(at,{children:[t.jsx(I,{yOffset:35,children:t.jsxs(it,{children:[t.jsx("h1",{children:"THE DIAMOND VAULT"}),t.jsx("p",{children:"Select your perfect loose diamond from our certified international inventory."})]})}),t.jsx(I,{yOffset:25,children:t.jsxs(nt,{children:[t.jsx(J,{$active:c==="ALL",onClick:()=>{$("ALL"),k()},children:"ALL DIAMONDS"}),t.jsx(J,{$active:c==="NATURAL",onClick:()=>{$("NATURAL"),k()},children:"NATURAL DIAMONDS"}),t.jsx(J,{$active:c==="LAB_GROWN",onClick:()=>{$("LAB_GROWN"),k()},children:"LAB-GROWN"})]})}),t.jsx(I,{yOffset:20,children:t.jsxs("div",{style:{display:"flex",gap:16,marginBottom:24,borderBottom:"1px solid rgba(140, 116, 75, 0.25)",paddingBottom:12},children:[t.jsx("button",{onClick:()=>{ne("WHITE"),k()},style:{background:"none",border:"none",fontFamily:"Cormorant Garamond, serif",fontSize:"1.2rem",fontWeight:d==="WHITE"?700:500,letterSpacing:"0.1em",textTransform:"uppercase",color:d==="WHITE"?"#C9A96E":"#A8A8A8",borderBottom:d==="WHITE"?"2px solid #C9A96E":"2px solid transparent",paddingBottom:6,cursor:"pointer"},children:"WHITE DIAMONDS"}),t.jsx("button",{onClick:()=>{ne("FANCY"),k()},style:{background:"none",border:"none",fontFamily:"Cormorant Garamond, serif",fontSize:"1.2rem",fontWeight:d==="FANCY"?700:500,letterSpacing:"0.1em",textTransform:"uppercase",color:d==="FANCY"?"#C9A96E":"#A8A8A8",borderBottom:d==="FANCY"?"2px solid #C9A96E":"2px solid transparent",paddingBottom:6,cursor:"pointer"},children:"FANCY COLOR DIAMONDS"})]})}),t.jsx(I,{yOffset:25,children:t.jsx(st,{children:Ye.map((e,r)=>{const i=e.value||e.name,D=e.name||i,Re=i?i.charAt(0).toUpperCase()+i.slice(1).toLowerCase():"",We=e.image||`/assets/diamonds/${Re}.svg`,xe=b.includes(i.toUpperCase())||b.includes(i);return t.jsxs(lt,{$selected:xe,onClick:()=>{se(i.toUpperCase()),a(1)},"data-testid":`shape-btn-${i.toLowerCase()}`,children:[t.jsx(be,{src:We,alt:D,$selected:xe,onError:Ge=>{Ge.target.style.display="block"}}),t.jsx("span",{children:D.toUpperCase()})]},i)})})}),t.jsx(I,{yOffset:25,style:{position:"relative",zIndex:100},children:t.jsx(ct,{children:t.jsxs(pt,{children:[t.jsxs(p,{children:[t.jsx("label",{children:"Carat Weight"}),t.jsxs("div",{className:"input-row",children:[t.jsx("input",{type:"number",step:"0.01",min:"0",placeholder:"Min",value:A,onChange:e=>{_(e.target.value),a(1)}}),t.jsx("span",{children:"-"}),t.jsx("input",{type:"number",step:"0.01",min:"0",placeholder:"Max",value:w,onChange:e=>{Y(e.target.value),a(1)}})]})]}),d==="WHITE"&&t.jsxs(t.Fragment,{children:[t.jsx(p,{children:t.jsx(x,{label:"Color Grade",options:[{label:"All White Colors",value:""},...((s==null?void 0:s.colors)||Xe).map(e=>({label:`Color ${e}`,value:e}))],value:v[0]||"",onChange:e=>{V(e?[e]:[]),a(1)},fullWidth:!0})}),c!=="NATURAL"?t.jsx(p,{children:t.jsx(x,{label:"Growth Method",options:[{label:"All Growth Methods",value:""},{label:"HPHT (High Pressure High Temp)",value:"HPHT"},{label:"CVD (Chemical Vapor Deposition)",value:"CVD"}],value:y,onChange:e=>{H(e),a(1)},fullWidth:!0})}):t.jsx(p,{children:t.jsx(x,{label:"Lab Certification",options:[{label:"All Certifications",value:""},...((s==null?void 0:s.certifications)||Q).map(e=>({label:e,value:e}))],value:g[0]||"",onChange:e=>{B(e?[e]:[]),a(1)},fullWidth:!0})}),t.jsxs(p,{children:[t.jsx("label",{children:"Price Range ($)"}),t.jsxs("div",{className:"input-row",children:[t.jsx("input",{type:"number",step:"10",min:"0",placeholder:"Min $",value:C,onChange:e=>{W(e.target.value),a(1)}}),t.jsx("span",{children:"-"}),t.jsx("input",{type:"number",step:"10",min:"0",placeholder:"Max $",value:j,onChange:e=>{G(e.target.value),a(1)}})]})]}),t.jsx(p,{children:t.jsx(x,{label:"Clarity Grade",options:[{label:"All Clarities",value:""},...((s==null?void 0:s.clarities)||he).map(e=>({label:e,value:e}))],value:f[0]||"",onChange:e=>{R(e?[e]:[]),a(1)},fullWidth:!0})}),c!=="NATURAL"&&t.jsx(p,{children:t.jsx(x,{label:"Lab Certification",options:[{label:"All Certifications",value:""},...((s==null?void 0:s.certifications)||Q).map(e=>({label:e,value:e}))],value:g[0]||"",onChange:e=>{B(e?[e]:[]),a(1)},fullWidth:!0})})]}),d==="FANCY"&&t.jsxs(t.Fragment,{children:[t.jsx(p,{children:t.jsx(x,{label:"Fancy Color",options:[{label:"All Fancy Colors",value:""},...((s==null?void 0:s.fancyColors)||["Yellow","Orange","Pink","Blue","Green","Brown","Red","White","Violet","Purple","Gray","Olive","Black","Other"]).map(e=>{const r=typeof e=="string"?e:e.name||e.value;return{label:r,value:r}})],value:E[0]||"",onChange:e=>{X(e?[e]:[]),a(1)},fullWidth:!0})}),t.jsx(p,{children:t.jsx(x,{label:"Overtone",options:[{label:"All Overtones",value:""},...((s==null?void 0:s.overtones)||["Yellow","Yellowish","Pink","Pinkish","Blue","Bluish","Red","Reddish","Green","Greenish","Purple","Purplish","Orange","Orangy","Violet","Violetish","Gray","Grayish","Black","Brown","Brownish","Champagne","Cognac","Chameleon","White","Other"]).map(e=>({label:e,value:e}))],value:L[0]||"",onChange:e=>{q(e?[e]:[]),a(1)},fullWidth:!0})}),t.jsxs(p,{children:[t.jsx("label",{children:"Price Range ($)"}),t.jsxs("div",{className:"input-row",children:[t.jsx("input",{type:"number",step:"10",min:"0",placeholder:"Min $",value:C,onChange:e=>{W(e.target.value),a(1)}}),t.jsx("span",{children:"-"}),t.jsx("input",{type:"number",step:"10",min:"0",placeholder:"Max $",value:j,onChange:e=>{G(e.target.value),a(1)}})]})]}),t.jsx(p,{children:t.jsx(x,{label:"Intensity",options:[{label:"All Intensities",value:""},...((s==null?void 0:s.intensities)||["Fancy Deep","Fancy Dark","Fancy Vivid","Fancy Intense","Fancy","Very Light","Fancy Light","Light","Faint"]).map(e=>({label:e,value:e}))],value:F[0]||"",onChange:e=>{K(e?[e]:[]),a(1)},fullWidth:!0})}),t.jsx(p,{children:t.jsx(x,{label:"Clarity Grade",options:[{label:"All Clarities",value:""},...((s==null?void 0:s.clarities)||he).map(e=>({label:e,value:e}))],value:f[0]||"",onChange:e=>{R(e?[e]:[]),a(1)},fullWidth:!0})}),t.jsx(p,{children:t.jsx(x,{label:"Lab Certification",options:[{label:"All Certifications",value:""},...((s==null?void 0:s.certifications)||Q).map(e=>({label:e,value:e}))],value:g[0]||"",onChange:e=>{B(e?[e]:[]),a(1)},fullWidth:!0})}),c!=="NATURAL"&&t.jsx(p,{children:t.jsx(x,{label:"Growth Method",options:[{label:"All Growth Methods",value:""},{label:"HPHT (High Pressure High Temp)",value:"HPHT"},{label:"CVD (Chemical Vapor Deposition)",value:"CVD"}],value:y,onChange:e=>{H(e),a(1)},fullWidth:!0})})]})]})})}),Ne&&t.jsxs(dt,{children:[t.jsx("span",{className:"label",children:"FILTERS:"}),c!=="ALL"&&t.jsxs(u,{onClick:()=>{$("ALL"),a(1)},children:[c==="NATURAL"?"Natural Diamonds":"Lab-Grown"," ",t.jsx(h,{size:12})]}),b.map(e=>t.jsxs(u,{onClick:()=>{se(e),a(1)},children:[e," ",t.jsx(h,{size:12})]},e)),g.map(e=>t.jsxs(u,{onClick:()=>{Pe(e),a(1)},children:[e," ",t.jsx(h,{size:12})]},e)),v.map(e=>t.jsxs(u,{onClick:()=>{ze(e),a(1)},children:["Color ",e," ",t.jsx(h,{size:12})]},e)),E.map(e=>t.jsxs(u,{onClick:()=>{X(r=>r.filter(i=>i!==e)),a(1)},children:["Fancy: ",e," ",t.jsx(h,{size:12})]},e)),L.map(e=>t.jsxs(u,{onClick:()=>{q(r=>r.filter(i=>i!==e)),a(1)},children:["Overtone: ",e," ",t.jsx(h,{size:12})]},e)),F.map(e=>t.jsxs(u,{onClick:()=>{K(r=>r.filter(i=>i!==e)),a(1)},children:["Intensity: ",e," ",t.jsx(h,{size:12})]},e)),f.map(e=>t.jsxs(u,{onClick:()=>{Oe(e),a(1)},children:[e," ",t.jsx(h,{size:12})]},e)),(A||w)&&t.jsxs(u,{onClick:()=>{_(""),Y(""),a(1)},children:[A||"0"," - ",w||"∞"," ct ",t.jsx(h,{size:12})]}),y&&t.jsxs(u,{onClick:()=>{H(""),a(1)},children:["Growth: ",y," ",t.jsx(h,{size:12})]}),(C||j)&&t.jsxs(u,{onClick:()=>{W(""),G(""),a(1)},children:["$",C||"0"," - $",j||"∞"," ",t.jsx(h,{size:12})]}),t.jsxs(xt,{onClick:le,children:[t.jsx(ge,{size:12})," CLEAR ALL"]})]}),t.jsxs(gt,{children:[t.jsx("div",{children:t.jsxs("span",{"data-testid":"diamond-count",children:[te.toLocaleString()," ",te===1?"DIAMOND FOUND":"DIAMONDS FOUND"]})}),t.jsxs("div",{style:{display:"flex",gap:16,alignItems:"center"},children:[t.jsxs("button",{onClick:le,style:{fontSize:"0.8rem",display:"flex",alignItems:"center",gap:6,cursor:"pointer",background:"none",border:"none",color:"#D8D2C5"},children:[t.jsx(ge,{size:14})," RESET FILTERS"]}),t.jsx(x,{options:me,value:S,onChange:e=>{re(e),a(1)},fullWidth:!1,style:{width:220}})]})]}),t.jsx(ht,{children:Ee.map((e,r)=>t.jsx(I,{staggerIndex:r,yOffset:25,children:t.jsx(rt,{diamond:e})},e.id))}),U>1&&t.jsxs(ut,{children:[t.jsx("button",{disabled:m===1,onClick:()=>a(m-1),children:"PREVIOUS"}),t.jsxs("span",{children:["Page ",m," of ",U]}),t.jsx("button",{disabled:m===U,onClick:()=>a(m+1),children:"NEXT"})]})]})};export{Et as DiamondVaultPage};
