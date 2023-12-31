import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createReviews } from '../../store/review';
import { deleteReviews } from '../../store/review';
import DeleteModal from '../Modals/DeleteSpotModal';
import './singleSpotReview.css'

const SingleReview = ({ review }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const reviewObject = review;

  const user = useSelector((state) => state.session.user);
  const spotReviews = useSelector((state) => state.reviews.singleSpot);

  const reversedReviews = Object.values(spotReviews).reverse()
  // Add state to capture new review and star rating
  const [newReview, setNewReview] = useState('');
  const [newStars, setNewStars] = useState(0);

  const handleDeleteReview = () => {
    dispatch(deleteReviews(reviewObject.id));
    setShowDeleteModal(true);
  };

  // Function to handle new review submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Call the createReviews action to post the new review
    dispatch(createReviews(reviewObject.spotId, { review: newReview, stars: newStars }, user));
    // Clear the form fields after submission
    setNewReview('');
    setNewStars(0);
  };

  // Creating / getting data info for the review

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear()
    return `${month} ${year}`
  }

  return (
    <>
      <div className="review-list-horizontal-line">

        <div className="review-comment">{review.comment}</div>

        {Object.values(reversedReviews).map((review) => (
  <div key={review.id} className="single-review">
    <p>{review.User.firstName}</p>
    <p>{formatDate(review.createdAt)}</p>
    <p>{review.review}</p>
    {user && user.id === review.userId && (
      <button onClick={() => setShowDeleteModal(true)}>Delete</button>
    )}
    {showDeleteModal && review.id === reviewObject.id && (
      <DeleteModal onSubmit={handleDeleteReview} onClose={() => setShowDeleteModal(false)} isReview={true} />
    )}
  </div>
))}


        {/* {user && (
          <form onSubmit={handleSubmitReview}>
            <textarea
              placeholder="Leave your review here..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <div>
              <label>
                <div className="stars-container">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setNewStars(star)}
                      className={`star ${star <= newStars ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="stars-label">Stars</span>
              </label>
            </div>
            <div>
              <button type="submit">Submit Your Review</button>
            </div>
          </form>
        )} */}

      </div>
    </>
  );
};

export default SingleReview;
