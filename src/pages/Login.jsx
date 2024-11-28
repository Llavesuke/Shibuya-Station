import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../config/firebase';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import isUsserLogged from '../hook/isUsserLogged';

// Función de validación para email
function checkEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return !regex.test(email);
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = checkEmail(formData.email);

    if (emailError) {
      toast.error('Valid email is required', {
        style: {
          backgroundColor: '#003366',
          color: '#E2E2B6',
        },
      });
      return; // Evita continuar si hay error
    }

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });

      toast.success('Login successful!', {
        style: {
          backgroundColor: '#003366',
          color: '#E2E2B6',
        },
      });

      console.log("User logged in");

      isUsserLogged()

    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error('Invalid email or password. Please try again', {
          style: {
            backgroundColor: '#003366',
            color: '#E2E2B6',
          },
        });
      }

      console.log(error.code);
      console.log(error.message);
    }
  };

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="email" id="emailInput">Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <label htmlFor="password" id="passwordInput">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <button type="submit" id="formSubmitBtn">Login</button>
      </form>

      <ToastContainer />
    </>
  );
};

export default Login;
