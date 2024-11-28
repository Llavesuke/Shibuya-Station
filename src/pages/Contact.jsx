import { Formik } from 'formik';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";

const Contact = () => {

  const onSubmit = async (values, { setSubmitting, setErrors, resetForm, setTouched }) => {
    try {  

      toast('Form submitted successfully: ');
      resetForm();
      setErrors({});
      setTouched({});
    } catch (error) {
      setErrors({ general: error.message });
      toast.error(error.message, {
        style: {  
          backgroundColor: '#003366', 
          color: '#E2E2B6',
        },
      });
    } finally {
      setSubmitting(false);
    }
  };
  

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().min(3, "Minimo 3 caracteres").required("El campo nombre es requerido"),
    email: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "El email no es válido"
      ).required("El campo email es requerido"), 
    message: Yup.string().trim().min(6, "Mínimo 6 caracteres").required("El campo message es requerido")
  });

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        message: ''
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched, setTouched
      }) => (
        <form
          className="contact-form" 
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" id="nameInput">Name:</label>
          <input 
            type="text"
            name="name"
            value={values.name} 
            onChange={handleChange} 
            onBlur={handleBlur}
          />
          {touched.name && errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}

          <label htmlFor="email" id="emailInput">Email:</label>
          <input 
            type="email"  
            name="email" 
            value={values.email} 
            onChange={handleChange} 
            onBlur={handleBlur} 
          />
          {touched.email && errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}

          <label htmlFor="message" id="messageInput">Message:</label>
          <textarea 
            id="message" 
            name="message"
            value={values.message} 
            onChange={handleChange}
            onBlur={handleBlur} 
          />
          {touched.message && errors.message && <div style={{ color: 'red' }}>{errors.message}</div>}

          {errors.general && <div style={{ color: 'red' }}>{errors.general}</div>}

          <ToastContainer />
          <button type="submit" disabled={isSubmitting} id="formSubmitBtn">Send</button>
        </form>
      )}
    </Formik>
  );
}

export default Contact;
