import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import ProductoList from '../components/AdminSector/ProductoList';
import ProductoForm from '../components/AdminSector/ProductoForm';

const AdminPage = () => {
    const { user } = useContext(UserContext);

    if (!user || user.role !== 'Admin') {
        return <h2>Acceso denegado!</h2>;
    }

    return (
        <div>
            <h1>Administrar Productos</h1>
            <ProductoList />
            <ProductoForm />
        </div>
    );
};

export default AdminPage;