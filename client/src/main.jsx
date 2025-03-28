import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
import { AuthProvider } from './context/auth.jsx';
import { SearchProvider } from './context/search.jsx';
import { CartProvider } from './context/cart.jsx';

createRoot(document.getElementById('root')).render(
  <SearchProvider>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </SearchProvider>
)
