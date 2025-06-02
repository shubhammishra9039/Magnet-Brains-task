import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Products from './page/Products';
import Checkout from './page/Checkout';
import Success from './page/Success'
import Cancel from  './page/Cancel'

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Products</Link>
        <Link to="/checkout">Checkout</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/checkout/:id" element={<Checkout />} />
      
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>


    </Router>
  );
}

export default App;
