import React from 'react';
import { useForm } from 'react-hook-form';
import { usePost } from '../../hooks/usePost';
import { successToast, errorToast } from '../../ui/toast/NotificationToast'; // Opcional, si tienes notificaciones
import './css/AddProduct.css'; // Opcional, para estilos personalizados
import { useNavigate } from 'react-router'

function AddProduct() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [PostData, loading, error] = usePost({ consulta: "products" });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const productData = {
        id: 0, 
        title: data.title,
        price: parseFloat(data.price),
        description: data.description,
        category: data.category,
        image: data.image,
      };

      await PostData(productData);
      successToast("Producto agregado exitosamente"); // Opcional
      reset(); // Resetea el formulario
      navigate("/"); // Redirige a la página de productos o donde desees
    } catch (err) {
      errorToast("Error al agregar el producto"); // Opcional
      console.error("Error al agregar el producto:", err);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Agregar Nuevo Producto</h2>
      <form className="add-product-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'El título es obligatorio' })}
          />
          {errors.title && <p className="error-message">{errors.title.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            step="0.01"
            id="price"
            {...register('price', { required: 'El precio es obligatorio', min: 0.1 })}
          />
          {errors.price && <p className="error-message">{errors.price.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            {...register('description', { required: 'La descripción es obligatoria' })}
          />
          {errors.description && <p className="error-message">{errors.description.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría:</label>
          <input
            type="text"
            id="category"
            {...register('category', { required: 'La categoría es obligatoria' })}
          />
          {errors.category && <p className="error-message">{errors.category.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="image">URL de la Imagen:</label>
          <input
            type="url"
            id="image"
            {...register('image', { required: 'La URL de la imagen es obligatoria' })}
          />
          {errors.image && <p className="error-message">{errors.image.message}</p>}
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Agregando...' : 'Agregar Producto'}
        </button>
      </form>
      {error && <p className="error-message">Error: {error.message}</p>}
    </div>
  );
}

export default AddProduct;