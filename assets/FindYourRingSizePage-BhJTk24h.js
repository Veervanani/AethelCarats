import{r as o,j as e,f as s,X as S,ah as v}from"./react-vendor-BXyx942q.js";import{g as i}from"./ui-vendor-VHkRGmvp.js";import{S as m,R as l}from"./admin-pages-BBG06x5T.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const z=i.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 32px 24px 80px;

  @media (max-width: 768px) {
    padding: 16px 16px 60px;
  }
`,k=i.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #77736c;
  margin-bottom: 32px;

  a {
    color: #55514b;
    text-decoration: none;
    &:hover {
      color: #c9a45c;
    }
  }

  span.current {
    color: #1f1f1f;
    font-weight: 600;
  }
`,w=i.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin-bottom: 64px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`,C=i.div`
  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    color: #1f1f1f;
    line-height: 1.15;
    margin-bottom: 16px;
  }

  p.subtitle {
    font-size: 1.15rem;
    color: #c9a45c;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  p.desc {
    font-size: 1rem;
    color: #55514b;
    line-height: 1.8;
  }
`,R=i.div`
  aspect-ratio: 4 / 3;
  background: #f5f2ea;
  border-radius: 6px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,u=i.div`
  max-width: 800px;
  margin: 0 auto 64px;
  text-align: center;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    color: #1f1f1f;
    margin-bottom: 16px;
  }

  p {
    font-size: 1rem;
    color: #55514b;
    line-height: 1.8;
  }
`,F=i.div`
  background: #19202a;
  color: #fff;
  padding: 48px 32px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 24px;
  }

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    color: #fffdf9;
    margin: 0;
  }

  a.cta-btn {
    padding: 14px 28px;
    background: #c9a45c;
    color: #1f1f1f;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.85rem;
    transition: all 0.2s ease;

    &:hover {
      background: #fffdf9;
      color: #1f1f1f;
    }
  }
`,f=i.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  margin-bottom: 80px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .content-side {
    h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.2rem;
      color: #1f1f1f;
      margin-bottom: 16px;
    }

    p {
      font-size: 0.95rem;
      color: #55514b;
      line-height: 1.8;
      margin-bottom: 24px;
    }

    button.action-btn {
      padding: 14px 24px;
      background: #1f1f1f;
      color: #c9a45c;
      border: none;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-size: 0.82rem;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: #c9a45c;
        color: #1f1f1f;
      }
    }
  }

  .media-side {
    background: #f5f2ea;
    border: 1px solid #e8e3d9;
    border-radius: 6px;
    overflow: hidden;
    padding: 24px;
    text-align: center;

    img {
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
`,N=i.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 80px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`,c=i.div`
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 32px 24px;

  .num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    color: #c9a45c;
    font-weight: 700;
    margin-bottom: 12px;
  }

  h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.88rem;
    color: #55514b;
    line-height: 1.7;
  }
`,I=i.div`
  margin-bottom: 80px;
  overflow-x: auto;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    color: #1f1f1f;
    margin-bottom: 20px;
    text-align: center;
  }
`,G=i.table`
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  font-size: 0.85rem;
  background: #fff;
  border: 1px solid #e8e3d9;

  th,
  td {
    padding: 12px 16px;
    text-align: center;
    border: 1px solid #e8e3d9;
  }

  th {
    background: #1f1f1f;
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-size: 0.78rem;
  }

  tr:nth-child(even) {
    background: #faf8f5;
  }
`,T=i.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,E=i.div`
  background: #fffdf9;
  border-radius: 8px;
  padding: 36px;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`,P=()=>{const[p,a]=o.useState(!1),[x,g]=o.useState(!1),[t,n]=o.useState({name:"",email:"",address:"",city:"",postalCode:""}),[d,h]=o.useState(null);o.useEffect(()=>{fetch("/api/v1/ring-size-guide").then(r=>r.json()).then(r=>{if(r){if(typeof r.conversionsJson=="string")try{r.conversions=JSON.parse(r.conversionsJson)}catch{}if(typeof r.measureStepsJson=="string")try{r.measureSteps=JSON.parse(r.measureStepsJson)}catch{}h(r)}}).catch(r=>console.error("Failed to fetch CMS ring size guide:",r))},[]);const b=()=>{window.print()},y=r=>{r.preventDefault(),g(!0)},j=(d==null?void 0:d.conversions)||[{us:"3",uk:"F",eu:"44",diameter:"14.1 mm",circumference:"44.2 mm"},{us:"3.5",uk:"G",eu:"45",diameter:"14.5 mm",circumference:"45.5 mm"},{us:"4",uk:"H 1/2",eu:"47",diameter:"14.9 mm",circumference:"46.8 mm"},{us:"4.5",uk:"I 1/2",eu:"48",diameter:"15.3 mm",circumference:"48.0 mm"},{us:"5",uk:"J 1/2",eu:"49",diameter:"15.7 mm",circumference:"49.3 mm"},{us:"5.5",uk:"K 1/2",eu:"51",diameter:"16.1 mm",circumference:"50.6 mm"},{us:"6",uk:"L 1/2",eu:"52",diameter:"16.5 mm",circumference:"51.9 mm"},{us:"6.5",uk:"M 1/2",eu:"53",diameter:"16.9 mm",circumference:"53.1 mm"},{us:"7",uk:"N 1/2",eu:"54",diameter:"17.3 mm",circumference:"54.4 mm"},{us:"7.5",uk:"O 1/2",eu:"56",diameter:"17.7 mm",circumference:"55.7 mm"},{us:"8",uk:"P 1/2",eu:"57",diameter:"18.1 mm",circumference:"57.0 mm"},{us:"8.5",uk:"Q 1/2",eu:"58",diameter:"18.5 mm",circumference:"58.3 mm"},{us:"9",uk:"R 1/2",eu:"59",diameter:"18.9 mm",circumference:"59.5 mm"},{us:"9.5",uk:"S 1/2",eu:"61",diameter:"19.4 mm",circumference:"60.8 mm"},{us:"10",uk:"T 1/2",eu:"62",diameter:"19.8 mm",circumference:"62.1 mm"},{us:"10.5",uk:"U 1/2",eu:"63",diameter:"20.2 mm",circumference:"63.4 mm"},{us:"11",uk:"V 1/2",eu:"65",diameter:"20.6 mm",circumference:"64.6 mm"},{us:"11.5",uk:"W 1/2",eu:"66",diameter:"21.0 mm",circumference:"65.9 mm"},{us:"12",uk:"Y",eu:"67",diameter:"21.4 mm",circumference:"67.2 mm"}];return e.jsxs(z,{children:[e.jsxs(k,{children:[e.jsx(s,{to:"/",children:"Home"})," / ",e.jsx(s,{to:"/education",children:"Education"})," / ",e.jsx(s,{to:"/rings",children:"Rings"})," / ",e.jsx("span",{className:"current",children:"Find Your Ring Size"})]}),e.jsxs(w,{children:[e.jsxs(C,{children:[e.jsx("p",{className:"subtitle",children:"Ring Sizer & Conversion Guide"}),e.jsx("h1",{children:"How To Measure Your Ring Size"}),e.jsx("p",{className:"desc",children:"Discovering your ideal ring size ensures maximum comfort and security for your bespoke Floksy Jewel creation. Follow our complimentary guide, printable sizer, and international conversion matrix."})]}),e.jsx(R,{children:e.jsx(m,{src:"/assets/floksy_solitaire_ring_perfect.png",alt:"Floksy Jewel Ring Sizing"})})]}),e.jsxs(u,{children:[e.jsx("h2",{children:"Finding Your Ring Size"}),e.jsx("p",{children:"Finding the right ring size is one of the most essential steps when choosing an engagement ring or wedding band. Floksy Jewel provides complimentary resizing within 30 days for all non-custom creation orders."})]}),e.jsx(l,{yOffset:35,children:e.jsxs(F,{children:[e.jsxs("div",{children:[e.jsx("h3",{children:"Browse Our Selection of Fine Rings"}),e.jsx("p",{style:{margin:"8px 0 0",color:"#aaa",fontSize:"0.9rem"},children:"Handcrafted 18K Gold & Platinum Solitaires"})]}),e.jsx(s,{to:"/rings",className:"cta-btn",children:"FIND YOUR RING"})]})}),e.jsx(l,{yOffset:35,children:e.jsxs(f,{children:[e.jsxs("div",{className:"content-side",children:[e.jsx("h3",{children:"Complimentary Plastic Ring Sizer"}),e.jsx("p",{children:"Receive a free Floksy Jewel belt-style plastic ring sizer delivered directly to your doorstep. It works like a belt around your finger for easy, accurate measurements at home."}),e.jsx("button",{className:"action-btn",onClick:()=>a(!0),children:"REQUEST FREE RING SIZER"})]}),e.jsx("div",{className:"media-side",children:e.jsx(m,{src:"/assets/why-floksy/craftsmanship-hero.jpg",alt:"Free Ring Sizer",style:{borderRadius:4}})})]})}),e.jsx(l,{yOffset:35,children:e.jsxs(f,{children:[e.jsx("div",{className:"media-side",children:e.jsxs("div",{style:{padding:20,background:"#fff",border:"1px solid #d9d3c7",borderRadius:4},children:[e.jsx("div",{style:{fontWeight:700,fontSize:"1.2rem",marginBottom:12,color:"#1f1f1f"},children:"US Standard Diameter Circles"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:12},children:["5","6","7","8","9","10","11","12"].map(r=>e.jsxs("div",{style:{padding:12,border:"1.5px dashed #c9a45c",borderRadius:"50%",aspectRatio:"1/1",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:"0.85rem"},children:["US ",r]},r))})]})}),e.jsxs("div",{className:"content-side",children:[e.jsx("h3",{children:"Printable Ring Size Chart"}),e.jsx("p",{children:"Print our 1:1 scale ring size chart to measure an existing ring or match your finger diameter directly on paper. Ensure page scaling is set to 100% when printing."}),e.jsx("button",{className:"action-btn",onClick:b,children:"PRINT RING SIZE CHART"})]})]})}),e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"2.2rem",textAlign:"center",marginBottom:32},children:"How To Measure At Home"}),e.jsxs(N,{children:[e.jsxs(c,{children:[e.jsx("div",{className:"num",children:"01"}),e.jsx("h4",{children:"Measure an Existing Ring"}),e.jsx("p",{children:"Place an existing ring that fits the target finger over our printable sizing circles until the inside of the ring aligns exactly with the circle perimeter."})]}),e.jsxs(c,{children:[e.jsx("div",{className:"num",children:"02"}),e.jsx("h4",{children:"Measure Your Finger"}),e.jsx("p",{children:"Wrap a flexible measuring tape or strip of paper snugly around the knuckle base. Mark the overlap point and measure length in millimeters to find circumference."})]}),e.jsxs(c,{children:[e.jsx("div",{className:"num",children:"03"}),e.jsx("h4",{children:"Use Our Free Ring Sizer"}),e.jsx("p",{children:"Thread the end of our plastic sizer through the buckle. Adjust until it slides comfortably over the knuckle for exact US ring size reading."})]})]}),e.jsxs(I,{children:[e.jsx("h3",{children:"International Ring Size Conversion Chart"}),e.jsxs(G,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"US Size"}),e.jsx("th",{children:"UK & Australia"}),e.jsx("th",{children:"EU & Japan"}),e.jsx("th",{children:"Inside Diameter (mm)"}),e.jsx("th",{children:"Inside Circumference (mm)"})]})}),e.jsx("tbody",{children:j.map(r=>e.jsxs("tr",{children:[e.jsxs("td",{style:{fontWeight:700,color:"#c9a45c"},children:["US ",r.us]}),e.jsx("td",{children:r.uk}),e.jsx("td",{children:r.eu}),e.jsx("td",{children:r.diameter}),e.jsx("td",{children:r.circumference})]},r.us))})]})]}),e.jsxs(u,{style:{background:"#faf8f5",padding:"40px 32px",borderRadius:6,border:"1px solid #e8e3d9"},children:[e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",color:"#1f1f1f",marginBottom:12},children:"Between Two Sizes?"}),e.jsx("p",{style:{fontSize:"0.92rem",color:"#55514b",lineHeight:1.8},children:"If you fall between two sizes, we always recommend sizing up. Fingers fluctuate in size depending on temperature, humidity, and time of day (typically slightly larger in the evening). Wider band styles (above 4mm) also feel tighter than slim solitaire bands."})]}),e.jsxs("div",{style:{textAlign:"center",marginTop:80,paddingTop:48,borderTop:"1px solid #e8e3d9"},children:[e.jsx("h2",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"2.5rem",marginBottom:16},children:"Find Your Perfect Floksy Jewel Ring"}),e.jsx("p",{style:{color:"#666",fontSize:"1rem",maxWidth:600,margin:"0 auto 28px"},children:"Explore our certified GIA natural and lab diamond solitaire engagement rings and eternity bands."}),e.jsx(s,{to:"/rings",style:{padding:"16px 36px",background:"#1f1f1f",color:"#c9a45c",textDecoration:"none",fontWeight:700,letterSpacing:"0.1em",borderRadius:4,display:"inline-block"},children:"SHOP RINGS CATALOGUE"})]}),p&&e.jsx(T,{onClick:()=>a(!1),children:e.jsxs(E,{onClick:r=>r.stopPropagation(),children:[e.jsx("button",{onClick:()=>a(!1),style:{position:"absolute",top:16,right:16,background:"none",border:"none",cursor:"pointer"},children:e.jsx(S,{size:20})}),x?e.jsxs("div",{style:{textAlign:"center",padding:"24px 0"},children:[e.jsx(v,{size:48,color:"#137333",style:{marginBottom:16}}),e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",marginBottom:8},children:"Free Sizer Requested!"}),e.jsx("p",{style:{color:"#666",fontSize:"0.9rem"},children:"We are mailing your complimentary Floksy Jewel Ring Sizer to your address. Estimated arrival: 3-5 business days."})]}):e.jsxs("form",{onSubmit:y,children:[e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",marginBottom:12},children:"Request Free Ring Sizer"}),e.jsx("p",{style:{color:"#666",fontSize:"0.85rem",marginBottom:20},children:"We will mail a free plastic belt sizer directly to your home."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx("input",{type:"text",required:!0,placeholder:"Full Name",value:t.name,onChange:r=>n({...t,name:r.target.value}),style:{padding:10,border:"1px solid #d9d3c7",borderRadius:4}}),e.jsx("input",{type:"email",required:!0,placeholder:"Email Address",value:t.email,onChange:r=>n({...t,email:r.target.value}),style:{padding:10,border:"1px solid #d9d3c7",borderRadius:4}}),e.jsx("input",{type:"text",required:!0,placeholder:"Shipping Street Address",value:t.address,onChange:r=>n({...t,address:r.target.value}),style:{padding:10,border:"1px solid #d9d3c7",borderRadius:4}}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[e.jsx("input",{type:"text",required:!0,placeholder:"City",value:t.city,onChange:r=>n({...t,city:r.target.value}),style:{padding:10,border:"1px solid #d9d3c7",borderRadius:4}}),e.jsx("input",{type:"text",required:!0,placeholder:"Postal Code",value:t.postalCode,onChange:r=>n({...t,postalCode:r.target.value}),style:{padding:10,border:"1px solid #d9d3c7",borderRadius:4}})]}),e.jsx("button",{type:"submit",style:{marginTop:12,padding:14,background:"#1f1f1f",color:"#c9a45c",border:"none",borderRadius:4,fontWeight:700,cursor:"pointer"},children:"SUBMIT MAILING REQUEST"})]})]})]})})]})};export{P as FindYourRingSizePage};
