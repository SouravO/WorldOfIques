import React from 'react';

const Contact = () => {
  return (
    <div className="page">
      <h1>Contact Us</h1>
      <p>Get in touch with us. We'd love to hear from you!</p>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message"></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;