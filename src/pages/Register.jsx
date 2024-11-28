import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import 'react-toastify/dist/ReactToastify.css';
import { registro } from '../config/firebase';
import isUsserLogged from '../hook/isUsserLogged';

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

  if (password.length < 6) {
    return 'Passwords must be more than 6 characters'
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


  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Validación previa
      const nameError = checkName(formData.username);
      const emailError = checkEmail(formData.email);
      const passwordError = checkPassword(formData.password, formData.confirmPassword);
  
      if (nameError) {
        throw new Error("Username is required");
      }
  
      if (emailError) {
        throw new Error("Valid email is required");
      }
  
      if (passwordError) {
        throw new Error(passwordError);
      }
  
      // Intentar registro en Firebase
      await registro({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
  
      // Solo si no hay errores:
      console.log("User registered in");
      toast.success("Registration successful!", {
        style: {
          backgroundColor: "#003366",
          color: "#E2E2B6",
        },
      });

      // Redirigir a /profile después de un registro exitoso
      isUsserLogged()
    } catch (error) {
      // Manejo de errores (Firebase o validación)
      console.error("Error during registration:", error.code, error.message);
  
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already in use. Please use a different email.", {
          style: {
            backgroundColor: "#003366",
            color: "#E2E2B6",
          },
        });
      } else {
        // Mensaje genérico para otros errores
        toast.error(error.message, {
          style: {
            backgroundColor: "#003366",
            color: "#E2E2B6",
          },
        });
      }
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
