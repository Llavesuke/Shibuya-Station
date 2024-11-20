import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Función para verificar si el contenido de un campo está vacío
function checkIsEmpty(content) {
  return content === '';
}

// Función para verificar si el email tiene el formato correcto
function checkEmail(email){
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Expresión regular para validar email
  return !regex.test(email);
}

const Contact = () => {
  // Estado para almacenar los datos del formulario (nombre, correo, mensaje)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones para cada campo
    const nameError = checkIsEmpty(formData.name); 
    const emailError = checkEmail(formData.email);
    const messageError = checkIsEmpty(formData.message);

    // Si el nombre está vacío, muestra una notificación de error
    if (nameError) {
      toast('Name is required', {
        style: {
          backgroundColor: '#003366', 
          color: '#E2E2B6',
        },
      });
    }

    // Si el email no es válido, muestra una notificación de error
    if (emailError) {
      toast('Valid email is required', {
        style: {
          backgroundColor: '#003366',
          color: '#E2E2B6',
        },
      });
    }

    // Si el mensaje está vacío, muestra una notificación de error
    if (messageError) {
      toast('Message is required', {
        style: {
          backgroundColor: '#003366', 
          color: '#E2E2B6', 
        },
      });
    }

    // Si no hay errores, muestra una notificación de éxito
    if (!nameError && !emailError && !messageError) {
      toast('Form submitted successfully:', formData); 
    }
  };

  return (
    <>
      {/* El formulario tiene la clase "contact-form" y ejecuta la función handleSubmit al enviarse */}
      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Campo para el nombre */}
        <label htmlFor="name" id="nameInput">Name:</label>
        <input 
          type="text"
          name="name"
          value={formData.name} 
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        {/* Campo para el email */}
        <label htmlFor="email" id="emailInput">Email:</label>
        <input 
          type="text" 
          name="email" 
          value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        {/* Campo para el mensaje */}
        <label htmlFor="message" id="messageInput">Message:</label>
        <textarea 
          id="message" 
          name="message"
          value={formData.message} 
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        ></textarea>

        <button type="submit" id="formSubmitBtn">Send</button>
      </form>

      {/* Contenedor para mostrar las notificaciones */}
      <ToastContainer />
    </>
  );
}

export default Contact;
