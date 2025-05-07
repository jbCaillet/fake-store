import React, { useState, useEffect, useContext } from 'react';
import { useGet } from '../hooks/useGet';
import Product from '../components/Products/product';
import { UserContext } from '../context/UserContext'

const HomePage = () => {
    const { handleLogOut, isLoggedIn, userLoged } = useContext(UserContext);
    const [GetData, loading, error] = useGet({ consulta: "products" });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const syncData = async () => {
            try {
                const data = await GetData();
                setProducts(data); // Guarda los productos en el estado
            } catch (error) {
                console.error("Error sync data:", error);
            }
        };

        syncData();
    }, [GetData]); // Ahora GetData no cambia en cada renderizado

    return (
        <div className="home-page">

            {isLoggedIn && <h1>Bienvenido {userLoged.name} a TiendaFake</h1>}
            {!isLoggedIn && <h1>Bienvenido a TiendaFake</h1>}

            <p>Un lugar para hacer compras Fake</p>

            {/* Mostrar mensaje de carga */}
            {loading && <p>Cargando productos...</p>}

            {/* Mostrar mensaje de error */}
            {error && <p>Error cargando productos: {error.message}</p>}

            {/* Mostrar productos solo si no hay error y no está cargando */}
            {!loading && !error && products.length > 0 && (
                <ul className="product-list">
                    {products.map((product) => (
                        <li key={product.id}>
                            <Product product={product} />
                        </li>
                    ))}
                </ul>
            )}

            {/* Mostrar mensaje si no hay productos */}
            {!loading && !error && products.length === 0 && (
                <p>No hay productos disponibles.</p>
            )}
        </div>
    );
};

export default HomePage;