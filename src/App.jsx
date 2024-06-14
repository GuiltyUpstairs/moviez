import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {SmallProduct} from "./components/SmallProduct.jsx";
import {Product} from "./components/Product.jsx";
import {products} from "./data.js";
import {NavBar} from "./components/NavBar.jsx";
function App() {

    const [selectedProduct, setSelectedProduct] = useState(null);

    let i = 1;
  return (
    <>
        <NavBar/>
        <div className="product-container">
            {products.map(product => <SmallProduct productData={product} key={i++}/>)}
        </div>

    </>
  )
}

export default App
