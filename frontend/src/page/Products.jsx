import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const goToCheckout = (id) => {
    navigate(`/checkout/${id}`);
  };

  return (
    <div style={{
      padding: '3rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
        Our Products
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {products.map(product => (
          <div key={product._id} style={{
            background: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '1.5rem',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
            onClick={() => goToCheckout(product._id)}
            onKeyPress={(e) => { if (e.key === 'Enter') goToCheckout(product._id); }}
            role="button"
            tabIndex={0}
          >
            <h3 style={{ marginBottom: '0.5rem', color: '#222' }}>{product.name}</h3>
            <p style={{
              flexGrow: 1,
              color: '#666',
              fontSize: '0.9rem',
              marginBottom: '1rem',
              lineHeight: '1.4',
              minHeight: '4.2rem' // keep height consistent
            }}>{product.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ color: '#007BFF', fontSize: '1.1rem' }}>
                ${(product.productPrice / 100).toFixed(2)}
              </strong>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToCheckout(product._id);
                }}
                style={{
                  backgroundColor: '#007BFF',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007BFF'}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
