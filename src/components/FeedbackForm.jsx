import React, { useState } from "react";
import "../styles/modal.css";

function FeedbackForm({ onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        comment: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onClose(formData); // Передаем заполненные данные в onClose
    };

    return (
        <div className="modal-outlet">
            <form className="modal-content" onSubmit={handleSubmit}>
                <button type="button" className="cross" onClick={() => onClose(formData)}>Закрыть</button>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </label>
                <label>
                    Comment:
                    <textarea name="comment" rows="4" cols="50" value={formData.comment} onChange={handleInputChange}></textarea>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default FeedbackForm;