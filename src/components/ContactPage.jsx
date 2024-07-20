import React, { useState }  from 'react';
import styles from '../styles/ContactPage.module.css';
import emailjs from 'emailjs-com';


const ContactForm = () => {
  const [successMessage, setSuccessMessage] = useState('');

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_rrfhjpc', 'template_r5bnmlo', e.target, 'ypgUcuvM-YC3jlmDZ')
    .then((result) => {
      console.log('Email sent successfully');
      setSuccessMessage('Thank you! Your message has been sent successfully.');
      e.target.reset(); // Clear the form
    }, (error) => {
      console.log(error.text);
      setSuccessMessage(''); // Clear any previous success message
    });
  }

  return (
    <div className={styles.contactPage}>
      <p className={styles.mobileInfoText}>Please provide the information below so we can discuss your needs. I will get back to you within 24 hours.</p>
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      <form className={styles.contactForm} onSubmit={sendEmail}>
        <input type="hidden" name="contact_number" />
        <div className={styles.formGroup}>
          <label>Name</label>
          <input type="text" name="from_name" />
        </div>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" name="from_email" />
        </div>
        <div className={styles.formGroup}>
          <label>Subject</label>
          <input type="text" name="subject" />
        </div>
        <div className={styles.formGroup}>
          <label>Message</label>
          <textarea name="message" />
        </div>
        <button type="submit" className={styles.submitBtn}>Send</button>
      </form>
    </div>
  );



};

export default ContactForm;
