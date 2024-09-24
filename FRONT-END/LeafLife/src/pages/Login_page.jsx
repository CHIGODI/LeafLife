import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../utils/api';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from '../utils/constants';

const LoginPage = () => {
    const [formData, setFormData] = useState(
        {
            username: '',
            password: '',
        });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    if (formData.password.len < 8){
        error('Password length must be more than 8 characters')
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');

            // Send login request using the API instance
            const response = await api.post('/login/', {
            username: formData.username,
            password: formData.password,
        });
            // console.log(response.data);
            // Handle successful login
            localStorage.setItem(USER_ID, response.data.user_id);
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
            
            toast.success(response.data.message);
            navigate('/dashboard');  // Redirect to dashboard
            
            } catch (error) {
                if (error.response) {
                // Handle server error responses
                setError(error.response.data.error || 'Login failed. Please try again.');
            } else {
                // Handle network or other unexpected errors
                setError('An unexpected error occurred. Please try again.');
            }
            console.error('Error logging in:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Login</h2>

                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">Username</label>
                        <input type="text" name="username" id="username" value={formData.username} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
                        disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="mt-4 text-center text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-green-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
