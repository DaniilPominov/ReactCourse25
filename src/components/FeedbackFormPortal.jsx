import ReactDOM from 'react-dom';
import FeedbackForm from './FeedbackForm';

const FeedbackFormPortal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const portalRoot = document.getElementById("portal");
    return ReactDOM.createPortal(
        <FeedbackForm onClose={onClose} />, portalRoot
    )
}   

export default FeedbackFormPortal;