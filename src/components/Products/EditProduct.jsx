import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGet } from '../../hooks/useGet';
import { usePut } from '../../hooks/usePut'; // Asume que tienes un hook para PUT
import { successToast, errorToast } from '../../ui/toast/NotificationToast'; // Opcional
import { useNavigate } from 'react-router-dom';
import './css/AddProduct.css'; // Reutiliza los estilos del formulario de agregar

function EditProduct() {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('id'); // Obtiene el ID del query param
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [GetData, loading, error] = useGet({ consulta: `products/${productId}` });
    const [PutData, updating, updateError] = usePut({ consulta: `products/${productId}` }); // Hook para actualizar
    const navigate = useNavigate();

    useEffect(() => {
        const syncProduct = async () => {
            try {
                const data = await GetData();
                // Establece los valores iniciales del formulario
                setValue('title', data.title);
                setValue('price', data.price);
                setValue('description', data.description);
                setValue('category', data.category);
                setValue('image', data.image);
            } catch (error) {
                console.error("Error sync product:", error);
            }
        };

        if (productId) {
            syncProduct();
        }
    }, [GetData, productId, setValue]);

    const onSubmit = async (data) => {
        try {
            const updatedProduct = {
                title: data.title,
                price: parseFloat(data.price),
                description: data.description,
                category: data.category,
                image: data.image,
            };

            await PutData(updatedProduct); // Actualiza el producto
            successToast("Producto actualizado exitosamente"); // Opcional
            reset();
            navigate("/"); // Redirige a la lista de productos
        } catch (err) {
            errorToast("Error al actualizar el producto"); // Opcional
            console.error("Error al actualizar el producto:", err);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar el producto.</p>;

    return (
        <div className="add-product-container">
            <h2>Editar Producto</h2>
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

                <button type="submit" className="submit-button" disabled={updating}>
                    {updating ? 'Actualizando...' : 'Guardar Cambios'}
                </button>
            </form>
            {updateError && <p className="error-message">Error: {updateError.message}</p>}
        </div>
    );
}

export default EditProduct;