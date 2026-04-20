import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orders';
import { supabase } from '../lib/supabase';

const Checkout = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const { currentUser } = useAuth(); // still usable for email display
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  // -------------------------
  // LOAD RAZORPAY SAFELY
  // -------------------------
  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // -------------------------
  // CHECKOUT HANDLER
  // -------------------------
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      // 🔥 1. CHECK FIREBASE AUTH USER
      if (!currentUser) {
        toast.error("Please login to checkout");
        setIsProcessing(false);
        return;
      }

      // 🔥 2. CREATE PAYMENT ORDER (NETLIFY FUNCTION)
      const response = await fetch('/.netlify/functions/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error("Payment gateway error");
      }

      // 🔥 3. LOAD RAZORPAY
      const loaded = await loadRazorpay();

      if (!loaded || !window.Razorpay) {
        toast.error("Payment SDK failed to load");
        setIsProcessing(false);
        return;
      }

      // 🔥 4. RAZORPAY CONFIG
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

            // 🔥 5. VERIFY PAYMENT
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

            // 🔥 6. SHIPPING DATA
            const shippingAddress = {
              name: `${formData.firstName} ${formData.lastName}`,
              address: formData.address
            };

            // 🔥 7. CREATE ORDER IN SUPABASE
            await createOrder(
              currentUser.uid, // Use Firebase UID
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

      // 🔥 8. OPEN PAYMENT
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

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="section-padding py-32 bg-ivory-white min-h-screen">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">

        {/* FORM */}
        <div className="flex-grow">
          <h1 className="text-4xl font-serif text-forest-green mb-8">
            Checkout
          </h1>

          <form
            id="checkout-form"
            onSubmit={handleCheckout}
            className="space-y-6 bg-white p-8 rounded-2xl border"
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
                className="input"
              />

              <input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input"
              />

              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="col-span-2 input"
              />
            </div>
          </form>
        </div>

        {/* SUMMARY */}
        <div className="w-full md:w-80">
          <div className="bg-white p-6 rounded-2xl border sticky top-32">

            <h3 className="text-xl font-serif mb-6">
              Order Summary
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              form="checkout-form"
              type="submit"
              disabled={isProcessing}
              className="w-full mt-6 premium-btn"
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;