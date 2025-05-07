import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './css/UserPage.css'; 
import { useNavigate } from 'react-router';

const UserPage = () => {
    const { isLoggedIn, userLoged } = useContext(UserContext);
    const navigate = useNavigate();
    if (!isLoggedIn) {
        
        navigate("/login");
    }
    return (
        <div className="home-page">
            <div className="construction-page">
                <div className="construction-content">
                    <h4>Bienvenido {userLoged.name}</h4>
                    <h1>🚧 Página en Construcción 🚧</h1>
                    <p>Estamos trabajando arduamente para volver pronto.</p>
                    <div className="construction-animation">
                        <div className="cone"></div>
                        <div className="worker"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;