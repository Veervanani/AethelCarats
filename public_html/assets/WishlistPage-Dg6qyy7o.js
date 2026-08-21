import{j as e,H as g,A as t,e as l,ac as h}from"./react-vendor-BSubOYpr.js";import{g as r}from"./ui-vendor-C-kywwZi.js";import{b,u,c as w,R as j}from"./admin-pages-BV0BYq0y.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const y=r.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  background-color: #f9f7f2;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 16px 60px;
  }
`,v=r.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  p {
    font-size: 1rem;
    color: #6b6b6b;
  }
`,k=r.div`
  max-width: 650px;
  margin: 40px auto;
  text-align: center;
  padding: 56px 32px;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  border-radius: 2px;
  box-shadow: 0 4px 20px rgba(31, 31, 31, 0.04);

  .icon-wrapper {
    width: 72px;
    height: 72px;
    margin: 0 auto 24px;
    border-radius: 50%;
    background-color: #faf5eb;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c9a45c;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #6b6b6b;
    margin-bottom: 32px;
    line-height: 1.6;
  }
`,z=r.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`,a=r(l)`
  padding: 12px 22px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background-color: #ffffff;
  color: #1f1f1f;
  border: 1px solid #d9d3c7;
  border-radius: 2px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: #b8944d;
    color: #ffffff;
    border-color: #b8944d;
  }
`,N=r.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,C=r.div`
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  border-radius: 6px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 10px 30px rgba(31, 31, 31, 0.08);
    transform: translateY(-2px);
  }

  .img-box-link {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    background-color: #f9f7f2;
    margin-bottom: 14px;
    border-radius: 4px;
    display: block;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.04);
    }
  }

  .name-link {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: #1f1f1f;
    margin-bottom: 6px;
    line-height: 1.35;
    text-decoration: none;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.2s ease;

    &:hover {
      color: #c9a45c;
    }
  }

  .price {
    font-size: 1.0rem;
    font-weight: 700;
    color: #c9a45c;
    margin-bottom: 16px;
  }

  .btn-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: auto;
    width: 100%;
  }
`,G=r.button`
  flex: 1;
  padding: 12px 14px;
  text-align: center;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background-color: #1f1f1f;
  color: #ffffff;
  border: 1px solid #1f1f1f;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #b8944d;
    border-color: #b8944d;
  }
`,I=r.button`
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  background: #faf7f2;
  border: 1px solid #d9d3c7;
  border-radius: 4px;
  color: #6b6b6b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: #d32f2f;
    background: #fff5f5;
    border-color: #d32f2f;
  }
`,D=()=>{const{wishlistItems:d,toggleWishlist:c}=b(),s=u(),{showToast:p}=w(),f=o=>{const i=d.find(n=>n.id===o);i&&c(i)},x=(o,i)=>{o.preventDefault(),o.stopPropagation(),s!=null&&s.addToCart&&s.addToCart(i,1,i.metal||"14K Yellow Gold","US 6.5"),p(`"${i.name}" added to your shopping bag!`)};return e.jsxs(y,{children:[e.jsxs(v,{children:[e.jsx("h1",{children:"MY WISHLIST"}),e.jsx("p",{children:"Your curated collection of Floksy Jewel fine jewellery & loose diamonds."})]}),d.length===0?e.jsxs(k,{children:[e.jsx("div",{className:"icon-wrapper",children:e.jsx(g,{size:36,color:"#C9A45C"})}),e.jsx("h2",{children:"YOUR WISHLIST IS EMPTY"}),e.jsx("p",{children:"Save your favorite pieces here so you can easily find them later."}),e.jsxs(z,{children:[e.jsxs(a,{to:"/rings?category=engagement",children:["ENGAGEMENT RINGS ",e.jsx(t,{size:14})]}),e.jsxs(a,{to:"/rings?category=wedding",children:["WEDDING RINGS ",e.jsx(t,{size:14})]}),e.jsxs(a,{to:"/rings",children:["FINE JEWELRY ",e.jsx(t,{size:14})]}),e.jsxs(a,{to:"/diamonds?type=NATURAL",children:["DIAMONDS ",e.jsx(t,{size:14})]}),e.jsxs(a,{to:"/diamonds?type=LAB_GROWN",children:["LAB-GROWN DIAMONDS ",e.jsx(t,{size:14})]})]})]}):e.jsx(N,{children:d.map((o,i)=>{const n=o.slug||o.id;return e.jsx(j,{staggerIndex:i,yOffset:25,children:e.jsxs(C,{children:[e.jsx(l,{to:`/product/${n}`,className:"img-box-link",title:`View ${o.name} details`,children:e.jsx("img",{src:o.primaryImage||o.mainImage||(o.images&&o.images[0]?o.images[0].url:"/assets/floksy_rings_cat.png"),alt:o.name})}),e.jsx(l,{to:`/product/${n}`,className:"name-link",children:o.name}),e.jsxs("div",{className:"price",children:["$",(o.price||0).toLocaleString()]}),e.jsxs("div",{className:"btn-row",children:[e.jsx(G,{onClick:m=>x(m,o),children:"ADD TO BAG"}),e.jsx(I,{onClick:()=>f(o.id),title:"Remove from wishlist","aria-label":"Remove item",children:e.jsx(h,{size:18})})]})]})},o.id)})})]})};export{D as WishlistPage};
