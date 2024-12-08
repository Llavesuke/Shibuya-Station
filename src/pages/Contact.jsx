import { Formik } from 'formik';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";

/**
 * Contact component that provides a contact form for users to submit inquiries.
 * @component
 * @returns {JSX.Element} The Contact component.
 */
const Contact = () => {

  /**
   * Handles the form submission.
   * @async
   * @function
   * @param {Object} values - The form values.
   * @param {Object} formikHelpers - The Formik helpers object.
   * @param {Function} formikHelpers.setSubmitting - Function to set the submitting state.
   * @param {Function} formikHelpers.setErrors - Function to set form errors.
   * @param {Function} formikHelpers.resetForm - Function to reset the form.
   * @param {Function} formikHelpers.setTouched - Function to set the touched state.
   */
  const onSubmit = async (values, { setSubmitting, setErrors, resetForm, setTouched }) => {
    try {  
      toast('Form submitted successfully: '); // Show success toast notification
      resetForm(); // Reset the form
      setErrors({}); // Clear any errors
      setTouched({}); // Clear touched fields
    } catch (error) {
      setErrors({ general: error.message }); // Set general error
      toast.error(error.message, {
        style: {  
          backgroundColor: '#003366', 
          color: '#E2E2B6',
        },
      });
    } finally {
      setSubmitting(false); // Set submitting state to false
    }
  };

  return (
    <div className="form-container">
  <Formik
    initialValues={{ name: '', email: '', message: '' }}
    validationSchema={Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      message: Yup.string().required('Message is required'),
    })}
    onSubmit={onSubmit}
  >
    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {touched.name && errors.name ? <div>{errors.name}</div> : null}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {touched.email && errors.email ? <div>{errors.email}</div> : null}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.message}
          />
          {touched.message && errors.message ? <div>{errors.message}</div> : null}
        </div>
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    )}
  </Formik>

</div>
  );
};

export default Contact;