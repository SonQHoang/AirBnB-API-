import React, { useState, useEffect, useRef } from 'react';
import './ReviewModal.css';

const ReviewModal = ({ onSubmit, onClose, serverError, clearServerError, spotId}) => {
  // console.log('Received error', serverError)
  // console.log('serverError ============>', serverError)
  
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [reviewError, setReviewError] = useState(null);
  const [starsError, setStarsError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (review.length < 10) {
      setReviewError("Review must be at least 10 characters long.");
      return;
    }
    if (stars === 0) {
      setStarsError("Please select at least 1 star.");
      return;
    }
    setReviewError(null);
    setStarsError(null);


  await onSubmit({review, stars})
  setReview('')
  setStars(0)
  

    // console.log('Review:', review);
    // console.log('Stars:', stars);
    // console.log('Can I test this way===>', { review, stars });
    
    // setServerError(null)
    // setServerError(error.message)
    // console.log('serverError ============>', serverError)
    
    const handleModalClose=() => {
      setReview('');
    setStars(0);
    setReviewError(null);
    setStarsError(null);
    onClose();
    }
  }
      
    // ! Need to fix this overlay later
    const modalOverlayRef = useRef();
    
    const handleClickOutside = (e) => {
      if (modalOverlayRef.current && !modalOverlayRef.current.contains(e.target)) {
        onClose()
        clearServerError()
      }
    };
    

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    
    const disableButtonIf = review.length < 10 || stars === 0;
    
    const renderStars = () => {
      const maxStars = 5;
      const starIcons = '★☆'; // Full star and empty star symbols
    
      const starsArray = Array.from({ length: maxStars }, (_, index) => {
        const isFilled = index < stars;
        return (
          <span
            key={index}
            className={`star ${isFilled ? 'filled' : ''}`}
            onClick={() => setStars(index + 1)}
          >
            {isFilled ? starIcons[0] : starIcons[1]}
          </span>
        );
      });
    
      return starsArray;
    };

  return (
    <div className="modal" ref={modalOverlayRef}>
      <div className="modal-content">
        <div>
          <h2>How was your stay?</h2>
        </div>
          {reviewError && <p className="error-message">{reviewError}</p>}
          {starsError && <p className="error-message">{starsError}</p>}
          {serverError && <p className="error-message">{serverError}</p>}
        <div>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <textarea
              className="review-textarea"
              placeholder="Leave your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <div>
              <label>
                <div className="stars-container">{renderStars()}</div>
                <span className="stars-label"></span>
              </label>
            </div>
            <div>
              <button className="review-button" disabled={disableButtonIf}>
                Submit Your Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div> 
  );
};

export default ReviewModal;
