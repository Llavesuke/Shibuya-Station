import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Función de validación para nombre vacío
function checkName(name) {
  return name === '';
}

// Función de validación para email
function checkEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return !regex.test(email);
}

// Función para validar contraseñas
function checkPassword(password, confirmPassword) {
  if (password === '' || confirmPassword === '') {
    return 'Passwords cannot be empty';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
}

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = checkName(formData.username);
    const emailError = checkEmail(formData.email);
    const passwordError = checkPassword(formData.password, formData.confirmPassword);

    if (nameError) {
      toast.error('Username is required', {
        style: {
          backgroundColor: '#003366',
          color: '#E2E2B6',
        },
      });
    }

    if (emailError) {
      toast.error('Valid email is required', {
        style: {
          backgroundColor: '#003366',
          color: '#E2E2B6',
        },
      });
    }

    if (passwordError) {
      toast.error(passwordError, {
        style: {
          backgroundColor: '#003366',
          color: '#E2E2B6',
        },
      });
    }

    if (!nameError && !emailError && !passwordError) {
      toast.success('Form submitted successfully!', {
        style: {
          backgroundColor: '#003366',
          color: '#E2E2B6',
        },
      });

      console.log('Form Data:', formData);
    }
  };

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="username" id="nameInput">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />

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

        <label htmlFor="confirmPassword" id="confirmPasswordInput">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />

        <button type="submit" id="formSubmitBtn">Register</button>
      </form>

      <ToastContainer />
    </>
  );
};

export default Register;
