import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        const foundProduct = response.data.find(p => p._id === id);
        setProduct(foundProduct);
      })
      .catch(err => console.error('Error fetching product:', err));
  }, [id]);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handlePayNow = async () => {
    setError('');
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    setLoading(true);

    try {
      const items = [
        {
          name: product.name,
          description: product.description,
          price: product.productPrice,
          quantity,
        }
      ];

      const response = await axios.post('http://localhost:5000/api/checkout/create-session', {
        email,
        items,
      });

      window.location.href = response.data.url;
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to create checkout session.');
      setLoading(false);
    }
  };

  if (!product) return <p style={{ textAlign: 'center' }}>Loading product details...</p>;

  return (
    <div style={{
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Checkout <span style={{ fontSize: '1.4rem', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
  {quantity}
</span></h1>
      


      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ marginBottom: '0.5rem', color: '#222' }}>{product.name}</h2>
        <p style={{ color: '#555', marginBottom: '0.25rem' }}>{product.description}</p>
        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#007BFF' }}>
          ${(product.productPrice / 100).toFixed(2)}
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <button
          onClick={() => handleQuantityChange(-1)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1.2rem',
            backgroundColor: '#eee',
            border: '1px solid #ccc',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
        >−</button>

        <span style={{ fontSize: '1.4rem', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>{quantity}</span>

        <button
          onClick={() => handleQuantityChange(1)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1.2rem',
            backgroundColor: '#eee',
            border: '1px solid #ccc',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
        >＋</button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '6px',
            border: '1px solid #ccc'
          }}
        />
      </div>

      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

      <button
        onClick={handlePayNow}
        disabled={loading}
        style={{
          width: '100%',
          backgroundColor: '#28a745',
          color: '#fff',
          padding: '0.75rem',
          fontSize: '1.1rem',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s ease',
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? 'Processing Payment...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default Checkout;
