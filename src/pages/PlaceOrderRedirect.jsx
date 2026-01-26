import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { momoApi } from "../../api/payment-api";
import { CartContext } from "../context/CartContext";

export default function PlaceOrderRedirect() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  // 1. Add loading state (default to true since we start working immediately)
  const [isLoading, setIsLoading] = useState(true);
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    const run = async () => {
      const orderId = params.get("orderId");

      if (!orderId) {
        navigate("/checkout", { replace: true });
        return;
      }

      try {
        // 2. Perform the API calls while the loading screen is visible
        const verifyResponse = await momoApi.momoVerify(orderId);
        console.log("MoMo verify response:", verifyResponse.data);
        if (verifyResponse.data.success) {
          await momoApi.momoVerifiedCallback(verifyResponse.data);
          clearCart();
        }
      } catch (err) {
        console.error("Error verifying MoMo transaction:", err);
      } finally {
        // 3. Navigate away when done (whether success or failure)
        navigate(`/place-order/${orderId}`, { replace: true });
      }
    };

    run();
  }, [params, navigate]);

  // 4. Return the Tailwind Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-pink-600"></div>

        {/* Text */}
        <p className="mt-4 text-lg font-medium text-gray-600">
          Verifying Payment...
        </p>
      </div>
    );
  }

  return null;
}
