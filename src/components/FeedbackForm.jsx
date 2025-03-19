import React  from "react";
function FeedbackForm({onClose}) {
    return (
        <div>
            <form>
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
                <input type="submit" value="Submit" />
            </form>

            <button onClick={onClose}>Закрыть</button>
        </div>
    )
}

export default FeedbackForm;
