import React, { useState, useEffect, useContext } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useGet } from '../../hooks/useGet';
import './css/ProductList.css';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function ProductList() {

    const { isLoggedIn, userLoged } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [GetData, loading, error] = useGet({ consulta: "products" });
    const navigate = useNavigate();

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

    const handleEdit = (product) => {
        console.log("Editar producto:", product);
        navigate(`/editar-producto?id=${product.id}`);
    };

    const handleDelete = (productId) => {
        console.log("Eliminar producto con ID:", productId);
        // Aquí puedes implementar la lógica para eliminar el producto
    };

    return (
        <div className="product-list-container">
            <h2>Lista de Productos</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        {userLoged.role == "admin" && isLoggedIn && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.category}</td>
                            {userLoged.role == "admin" && isLoggedIn && <td className="action-buttons">
                                <Button
                                    variant="secondary"
                                    className="me-2"
                                    onClick={() => handleEdit(product)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ProductList;