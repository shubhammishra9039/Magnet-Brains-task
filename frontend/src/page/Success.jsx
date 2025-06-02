import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Success = () => {
  const [searchParams] = useSearchParams();
  const [sessionInfo, setSessionInfo] = useState(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      axios.get(`http://localhost:5000/api/orders/session/${sessionId}`)
        .then(res => setSessionInfo(res.data))
        .catch(err => console.error('Failed to load order:', err));
    }
  }, [sessionId]);

  if (!sessionInfo) return <p>Loading order details...</p>;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Thank you, {sessionInfo.email}</p>
      <p>Your payment of ${(sessionInfo.amount_total / 100).toFixed(2)} was successful.</p>

      <h2>Order Summary:</h2>
      <ul>
        {sessionInfo.items.map((item, i) => (
          <li key={i}>
            {item.quantity} × {item.name} — ${(item.amount_total / 100).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Success;
