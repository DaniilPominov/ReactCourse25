import React  from "react";
import "../styles/modal.css";
function FeedbackForm({onClose}) {
    const btnPrevent = (event) => {
        event.preventDefault();
        onClose();
    }
    return (
        <div className="modal-outlet">
            <form className="modal-content">
            <button className="cross" onClick={onClose}>Закрыть</button>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" />
                </label>
                <label>
                    Comment:
                    <textarea name="comment" rows="4" cols="50"></textarea>
                </label>
                <input type="submit" onClick={btnPrevent} value="Submit" />
            </form>

            
        </div>
    )
}

export default FeedbackForm;
