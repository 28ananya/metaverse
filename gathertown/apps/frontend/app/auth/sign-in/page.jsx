"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
const SigninForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('https://your-backend-url.com/api/signin', credentials);

      if (response.data && response.data.token) {
        localStorage.setItem('jwtToken', response.data.token);
        setSuccessMessage('Sign in successful!');
        setCredentials({ username: '', password: '' });
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Sign In</h1>
      {error && <div className="text-red-500 mb-3">{error}</div>}
      {successMessage && <div className="text-green-500 mb-3">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={credentials.username}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-300"
        >
          Sign In
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?{' '}
        <Link href="/sign-up" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SigninForm;
