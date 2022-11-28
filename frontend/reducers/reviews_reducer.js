import {
  RECEIVE_ALL_REVIEWS,
  RECEIVE_REVIEW_CHANGES,
  RECEIVE_DELETE_REVIEW,
} from '../actions/review_actions';

const defaultState = {}

const ReviewsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_REVIEWS:
      return action.reviews;

    case RECEIVE_REVIEW_CHANGES: {
      let newState = Object.assign({}, state);
      newState[action.review.id] = action.review;
      return newState;
    }

    case RECEIVE_DELETE_REVIEW: {
      let newState = Object.assign({}, state);
      delete newState[action.review.id];
      return newState;
    }

    default:
      return state;
  }
};

export default ReviewsReducer;
