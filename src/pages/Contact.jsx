import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Contact = () => {
  const onSubmit = (values, { setSubmitting }) => {
    // Handle form submission
    console.log(values);
    setSubmitting(false);
  };

  return (
    <section className="contact">
      <section className="contact__container login__container">
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
            <form className="contact__form" onSubmit={handleSubmit}>
              <fieldset className="form__group">
                <label htmlFor="name" className="form__label">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form__input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {touched.name && errors.name ? (
                  <p className="contact__form-error">{errors.name}</p>
                ) : null}
              </fieldset>
              <fieldset className="form__group">
                <label htmlFor="email" className="form__label">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form__input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {touched.email && errors.email ? (
                  <p className="contact__form-error">{errors.email}</p>
                ) : null}
              </fieldset>
              <fieldset className="form__group">
                <label htmlFor="message" className="form__label">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  className="form__input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                />
                {touched.message && errors.message ? (
                  <p className="contact__form-error">{errors.message}</p>
                ) : null}
              </fieldset>
              <fieldset className="form__group">
                <button type="submit" className="form__button" disabled={isSubmitting}>
                  Send
                </button>
              </fieldset>
            </form>
          )}
        </Formik>
      </section>
    </section>
  );
};

export default Contact;