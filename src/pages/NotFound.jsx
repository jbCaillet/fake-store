import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './css/NotFound.css'; // Asegúrate de crear este archivo CSS

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate('/');
    }

    return () => clearInterval(timer); // Limpia el intervalo al desmontar el componente
  }, [countdown, navigate]);

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>¡Página no encontrada!</h2>
        <p>La página que estás buscando no existe o ha sido movida.</p>
        <p>Serás redirigido al inicio en <span className="countdown">{countdown}</span> segundos.</p>
      </div>
    </div>
  );
};

export default NotFound;