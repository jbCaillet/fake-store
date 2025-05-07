import React from 'react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router';
import { errorToast, successToast } from "../../ui/toast/NotificationToast";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import './css/LoginForm.css'; // Importamos el archivo CSS

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { handleUser, setIsLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const [PostData, loading, error] = useAuth({ consulta: "auth/login" });

    const onSubmit = async (data) => {
        try {
            const userData = { username: data.username, password: data.password };
            const responseData = await PostData(userData);
            if (responseData?.token) {
                const token = responseData.token;
                Cookies.set("token", token, { expires: 7 });

                const decoded = jwtDecode(token);
                console.log("Decoded JWT:", decoded);
                const userRole = decoded.sub === 2 ? "admin" : "user";
                handleUser({
                    id: decoded.sub,
                    role: userRole,
                    name: decoded.user,
                    userName: decoded.user
                });

                setIsLoggedIn(true);
                successToast("Bienvenido/a " + decoded.user);

                navigate("/");
            }
        } catch (j) {
            errorToast("Usuario o contraseña incorrectos");
            // Handle error (e.g., show a message to the user)
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="login-title">Iniciar sesión en Tienda Fake</h2>
                <div className="form-group">
                    <label htmlFor="username">Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        className={`form-input ${errors.username ? 'input-error' : ''}`}
                        {...register('username', { required: 'username is required' })}
                    />
                    {errors.username && <p className="error-message">{errors.username.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className={`form-input ${errors.password ? 'input-error' : ''}`}
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;