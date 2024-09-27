import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../utils/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../utils/constants";
import { useEffect, useState } from "react";

// This component protects routes that require authentication.
const ProtectedRoutes = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem(ACCESS_TOKEN));

    useEffect(() => {
        checkAuth().catch(() => setIsAuthenticated(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            setIsAuthenticated(false);
            return;
        }
        try {
            // Get a new access token using the refresh token
            const response = await api.post('/token/refresh/', {
                refresh_token: refreshToken
            });
            // If refresh token is valid, set new access token and set isAuthenticated to true
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthenticated(true);
            } else {
                localStorage.clear();
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error refreshing token:', error.response ? error.response.data : error);

            console.error('Error refreshing token:', error);
            setIsAuthenticated(false);
        }
    };

    const checkAuth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthenticated(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpireTime = decoded.exp * 1000;
        const now = Date.now();
        if (tokenExpireTime < now) {
            await refreshToken();
        } else {
            setIsAuthenticated(true);
        }
    };

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
