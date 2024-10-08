import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Invalid email format');
      return;
    }

    // API call to sign up the user
    try {
      setLoading(true);
      const response = await api.post('/signup/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log(response)
      toast.success('Account created successfully! Please log in.');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        console.error('Username or Email already taken', error.response.data);
        setError(error.response.data.error || 'Username or Email already taken');
      } else {
        setError('An unexpected error occurred. Please try again.');
        console.error('Error signing up, please try again later:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center text-green-500">Sign Up</h2>

        {error && <p className="text-red-500 mb-4 text-center" aria-live="assertive">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">Username</label>
          <input type="text" id="username" name="username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input type="email" id="email" name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input type="password" id="password" name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input type="password" id="confirmPassword" name="confirmPassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-center text-gray-600"> Already have an account?{' '}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
