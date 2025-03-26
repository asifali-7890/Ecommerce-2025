import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth,] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="pt-10 mt-10">
        <div className="flex justify-center">
          <div className="w-full">
            <h1 className="text-center bg-gray-100 p-4 mb-4 text-2xl">
              {!auth?.user ? "Hello Guest" : `Hello ${auth?.token && auth?.user?.name}`}
              <p className="text-center text-md">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout!"}`
                  : "Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap">
            {/* Cart Items Section */}
            <div className="w-full md:w-7/12 p-2">
              {cart?.map((p) => (
                <div className="flex border rounded-lg mb-4" key={p._id}>
                  <div className="w-4/12">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <div className="w-4/12 p-4">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm">{p.description.substring(0, 30)}</p>
                    <p className="font-semibold">Price: ${p.price}</p>
                  </div>
                  <div className="w-4/12 p-4 flex items-center justify-center">
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary Section */}
            <div className="w-full md:w-5/12 p-2">
              <div className="border rounded-lg p-4 bg-gray-100">
                <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
                <p className="mb-4">Total | Checkout | Payment</p>
                <hr className="mb-4" />
                <h4 className="text-lg font-semibold">Total: {totalPrice()} </h4>

                {/* Address Section */}
                {auth?.user?.address ? (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold">Current Address</h4>
                    <h5 className="text-sm">{auth?.user?.address}</h5>
                    <button
                      className="mt-2 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                ) : (
                  <div className="mt-4">
                    {auth?.token ? (
                      <button
                        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Please Login to checkout
                      </button>
                    )}
                  </div>
                )}

                {/* Payment Section */}
                <div className="mt-6">
                  {!clientToken || !auth?.token || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing ...." : "Make Payment"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default CartPage;
