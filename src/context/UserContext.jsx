import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";


const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userLoged, setUserLoged] = useState({
        id: '',
        role: '',
        name: '',
        email: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userRole = decoded.sub === 2 ? "admin" : "user";
                setUserLoged({
                    id: decoded.sub,
                    role: userRole,
                    name: decoded.user,
                    userName: decoded.user
                });
                handleUser(decoded);
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                handleLogOut();
            }
        } else {
            setUserLoged({ id: '', role: '', name: '', email: '' });
            setIsLoggedIn(false);
        }
    }, [isLoggedIn]);

    const handleLogOut = () => {
        Cookies.remove("token");
        setIsLoggedIn(false);
        setUserLoged({ id: '', role: '', name: '', email: '' });
    };

    const handleUser = (data) => {
        const userRole = data.sub === 2 ? "admin" : "user";
        setUserLoged({
            id: data.sub,
            role: userRole,
            name: data.user,
            userName: data.user
        });
        setIsLoggedIn(true);
    };

    return (
        <UserContext.Provider value={{ userLoged, handleUser, handleLogOut, isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
