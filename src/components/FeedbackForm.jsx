import React  from "react";

import '../styles/FeedbackForm.scss';
function FeedbackForm({ onClose }) {
    return (
      <div className="feedback-form">
        <form>
          <button 
            type="button" 
            className="close-btn"
            onClick={onClose}
            aria-label="Close form"
          />
          
          <h2>Contact Us</h2>
          
          <label>
            <span>Your Name</span>
            <input type="text" name="name" placeholder="John Doe" />
          </label>
          
          <label>
            <span>Email Address</span>
            <input type="email" name="email" placeholder="john@example.com" />
          </label>
          
          <label>
            <span>Your Message</span>
            <textarea name="comment" placeholder="Write your message here..." />
          </label>
          
          <input type="submit" value="Send Message" />
        </form>
      </div>
    )
  }

export default FeedbackForm;
