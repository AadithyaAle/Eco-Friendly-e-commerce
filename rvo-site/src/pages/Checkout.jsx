import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orders';

const Checkout = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      if (!currentUser) {
        toast.error("Please login to checkout");
        setIsProcessing(false);
        return;
      }

      const response = await fetch('/.netlify/functions/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error("Payment gateway error");
      }

      const loaded = await loadRazorpay();

      if (!loaded || !window.Razorpay) {
        toast.error("Payment SDK failed to load");
        setIsProcessing(false);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "RVO Fabric Essentials",
        description: "Eco-Friendly Purchase",
        order_id: data.order_id,

        handler: async function (paymentResponse) {
          try {
            toast.loading("Verifying payment...", { id: "pay" });

            const verifyRes = await fetch(
              '/.netlify/functions/verify-payment',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentResponse)
              }
            );

            const verifyData = await verifyRes.json();

            if (!verifyData.success) {
              throw new Error("Payment verification failed");
            }

            const shippingAddress = {
              name: `${formData.firstName} ${formData.lastName}`,
              address: formData.address
            };

            await createOrder(
              currentUser.uid,
              cartItems,
              total,
              shippingAddress,
              {
                paymentId: paymentResponse.razorpay_payment_id,
                status: "Confirmed"
              }
            );

            toast.success("Order placed successfully!", { id: "pay" });

            await clearCart();
            navigate("/profile");

          } catch (error) {
            console.error("ORDER ERROR:", error);
            toast.error("Payment successful but order save failed", {
              id: "pay"
            });
          }
        },

        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: currentUser?.email || ""
        },

        theme: {
          color: "#1F4D36"
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", () => {
        toast.error("Payment failed");
      });

      rzp.open();

    } catch (error) {
      console.error(error);
      toast.error("Checkout failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-ivory-white min-h-screen">
      <div className="h-32 md:h-40"></div>

      <div className="section-padding pb-32 pt-0">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif text-forest-green mb-8">
            Checkout
          </h1>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-grow">
              <form
                id="checkout-form"
                onSubmit={handleCheckout}
                className="space-y-6 bg-white p-8 rounded-2xl border border-forest-green/5 shadow-sm"
              >
                <h3 className="text-xl font-serif text-forest-green mb-4">
                  Shipping Details
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-premium-gold"
                  />

                  <input
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-premium-gold"
                  />

                  <input
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="col-span-2 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-premium-gold"
                  />
                </div>
              </form>
            </div>

            <div className="w-full md:w-80 flex-shrink-0">
              <div className="bg-white p-6 rounded-2xl border border-forest-green/5 shadow-sm sticky top-40 z-10">
                <h3 className="text-xl font-serif text-forest-green mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>

                  <div className="border-t pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button
                  form="checkout-form"
                  type="submit"
                  disabled={isProcessing}
                  className="w-full premium-btn py-3"
                >
                  {isProcessing ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;