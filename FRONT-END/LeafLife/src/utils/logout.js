import axios from 'axios';

const handleLogout = async (navigate) => {
    try {
        // Make a request to the backend to log out the user
        await axios.post('http://127.0.0.1:8000/api/v1/logout/', {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });

        // Clear the authentication tokens from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // Redirect to the login page
        navigate('/login');
    } catch (error) {
        console.error("Error logging out", error.response);
    }
};

export default handleLogout;