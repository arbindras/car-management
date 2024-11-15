import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductListPage from './pages/ProductListPage';
import ProductCreatePage from './pages/ProductCreatePage';
import ProductDetailPage from './pages/ProductDetailPage';

const App = () => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setAuthToken={setAuthToken} />} />
        <Route path="/signup" element={<SignupPage setAuthToken={setAuthToken} />} />
        <Route path="/" element={<ProductListPage authToken={authToken} />} />
        <Route path="/product/create" element={<ProductCreatePage authToken={authToken} />} />
        <Route path="/product/:id" element={<ProductDetailPage authToken={authToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
