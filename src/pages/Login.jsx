import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import isUsserLogged from '../hook/isUsserLogged';

/**
 * Validates the email format.
 * @function
 * @param {string} email - The email to validate.
 * @returns {boolean} True if the email is invalid, false otherwise.
 */
function checkEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return !regex.test(email);
}

/**
 * Login component that provides a login form for users.
 * @component
 * @returns {JSX.Element} The Login component.
 */
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Hook to navigate to other routes

  /**
   * Handles the form submission.
   * @async
   * @function
   * @param {Object} e - The event object.
   */
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
      return; // Prevents further execution if there is an error
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

      isUsserLogged(); // Check if the user is logged in

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
    <main className="login">
      <section className="login__container">
        <header className="login__header">
          <h2 className="login__title">Welcome Back!</h2>
          <p className="login__subtitle">Please login to your account</p>
        </header>
        <section className="login__form-container">
          <form className="login__form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="email" className="form__label">Email:</label>
              <input
                type="text"
                name="email"
                className="form__input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form__group">
              <label htmlFor="password" className="form__label">Password:</label>
              <input
                type="password"
                name="password"
                className="form__input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <button type="submit" className="form__button">Login</button>
          </form>
        </section>
      </section>
      <ToastContainer />
    </main>
  );
};

export default Login;