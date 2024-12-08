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

  const navigate = useNavigate(); // Hook to navigate to other routes

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