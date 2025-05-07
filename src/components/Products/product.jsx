import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './product.css';

function Product({ product }) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className="product-item">
        <h3>{product.title}</h3>
        <div className="image-container">
          <img src={product.image} alt={product.title} />
        </div>
        <p className="description">{product.description.slice(0, 80)}...</p>
        <p className="price">${product.price}</p>
        <button onClick={handleShow}>Ver Más</button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{product.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={product.image} alt={product.title} style={{ width: '100%', marginBottom: '15px' }} />
          <p><strong>Descripción:</strong> {product.description}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          <p><strong>Categoría:</strong> {product.category}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Product;