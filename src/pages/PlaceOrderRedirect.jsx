import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function PlaceOrderRedirect() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const orderId = params.get('orderId');

    if (!orderId) {
      navigate('/checkout', { replace: true });
      return;
    }

    navigate(`/place-order/${orderId}`, { replace: true });
  }, []);

  return null;
}
