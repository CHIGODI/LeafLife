import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import api from './api';
import { toast } from 'react-toastify';

const handleLogout = async (navigate) => {
    try {
        // Make a request to the backend to log out the user
        // send the refresh token in the body of the request
      const response = await api.post('/logout/', {
            refresh_token: localStorage.getItem(REFRESH_TOKEN),
        });
        toast.success(response.data.message || 'Successfully logged out');

        // Clear the authentication tokens from localStorage
        localStorage.clear();

        // Redirect to the login page
        navigate('/login');
    } catch (error) {
        console.error("Error logging out", error.response);
    }
};

export default handleLogout;