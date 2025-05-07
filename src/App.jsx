import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import './index.css';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import MainLayout from './pages/Layout/Main/MainLayout';
import AdminLayout from './pages/Layout/Admin/AdminLayout';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import LoginForm from './components/Auth/LoginForm';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import AddProduct from './components/Products/addProduct';
import ProductList from './components/Products/ProductList';
import EditProduct from './components/Products/EditProduct';

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductList />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/user" element={<UserPage />} />
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/agregar-producto" element={<AddProduct />} />
              <Route path="/editar-producto" element={<EditProduct />} />
            </Route>
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;