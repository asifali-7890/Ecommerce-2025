import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
import { AuthProvider } from './context/auth.jsx';
import { SearchProvider } from './context/search.jsx';

createRoot(document.getElementById('root')).render(
  <SearchProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </SearchProvider>
)
