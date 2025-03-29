import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';
import { Toaster } from 'react-hot-toast';
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to control spinner visibility

  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useAuth();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start showing spinner
    try {
      const response = await axios.post('/api/v1/auth/login', { email, password });

      if (response.data.success) {
        toast.success('Login successful');
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        setTimeout(() => {
          navigate(location.state || "/"); // Redirect after a delay
        }, 1000); // 1 second delay
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false); // Hide spinner after API call completes
    }
  };

  return (
    <Layout title="Login - Ecommerce App">
      <Toaster /> {/* Include this at the root of your app */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-center text-3xl font-bold text-gray-800">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex justify-center items-center"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>Login</span>
              )}
            </button>


            <p className="text-center text-sm text-gray-600 pt-4 flex justify-between">
              <button
                type="button"
                className="hover:underline text-blue-500"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password?
              </button>
              <span>
                Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
