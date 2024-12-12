import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { registro } from '../config/firebase';
import isUsserLogged from '../hook/isUsserLogged';

/**
 * Validates if the name is empty.
 * @function
 * @param {string} name - The name to validate.
 * @returns {boolean} True if the name is empty, false otherwise.
 */
function checkName(name) {
  return name === '';
}

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
 * Validates the passwords.
 * @function
 * @param {string} password - The password to validate.
 * @param {string} confirmPassword - The confirmation password to validate.
 * @returns {string|null} An error message if validation fails, null otherwise.
 */
function checkPassword(password, confirmPassword) {
  if (password === '' || confirmPassword === '') {
    return 'Passwords cannot be empty';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  if (password.length < 6) {
    return 'Passwords must be more than 6 characters';
  }
  return '';
}

/**
 * Register component that provides a registration form for users.
 * @component
 * @returns {JSX.Element} The Register component.
 */
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  /**
   * Handles the form submission.
   * @async
   * @function
   * @param {Object} e - The event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Pre-validation
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

      // Attempt registration in Firebase
      await registro({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Only if there are no errors:
      console.log("User registered in");
      toast.success("Registration successful!", {
        style: {
          backgroundColor: "#003366",
          color: "#E2E2B6",
        },
      });

      // Redirect to /profile after successful registration
      isUsserLogged();
    } catch (error) {
      // Error handling (Firebase or validation)
      console.error("Error during registration:", error.code, error.message);

      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already in use. Please use a different email.", {
          style: {
            backgroundColor: "#003366",
            color: "#E2E2B6",
          },
        });
      } else {
        // Generic message for other errors
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
    <main className="register">
      <section className="register__container">
        <header className="register__header">
          <h2 className="register__title">Create Account</h2>
          <p className="register__subtitle">Please fill in the details to create an account</p>
        </header>
        <section className="register__form-container">
          <form className="register__form" onSubmit={handleSubmit}>
            <fieldset className="register__group">
              <label htmlFor="username" className="register__label" id="usernameInput">Username:</label>
              <input
                type="text"
                name="username"
                className="register__input"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </fieldset>
            <fieldset className="register__group">
              <label htmlFor="email" className="register__label" id="emailInput">Email:</label>
              <input
                type="email"
                name="email"
                className="register__input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </fieldset>
            <fieldset className="register__group">
              <label htmlFor="password" className="register__label" id="passwordInput">Password:</label>
              <input
                type="password"
                name="password"
                className="register__input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </fieldset>
            <fieldset className="register__group">
              <label htmlFor="confirmPassword" className="register__label" id="confirmPasswordInput">Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                className="register__input"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </fieldset>
            <button type="submit" className="register__button" id="formSubmitBtn">Register</button>
          </form>
        </section>
      </section>
      <ToastContainer />
    </main>
  );
};

export default Register;