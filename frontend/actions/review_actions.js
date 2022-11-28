import * as APIUtil from '../util/review_api_util';
import { receiveErrors } from './error_actions';

export const RECEIVE_ALL_REVIEWS = 'RECEIVE_ALL_REVIEWS';
export const RECEIVE_DELETE_REVIEW = 'RECEIVE_DELETE_REVIEW';
export const RECEIVE_REVIEW_CHANGES = 'RECEIVE_REVIEW_CHANGES';

export const receiveReviews = reviews => ({
  type: RECEIVE_ALL_REVIEWS,
  reviews
});

export const receiveDeleteReview = review => ({
  type: RECEIVE_DELETE_REVIEW,
  review
});

export const receiveReviewChenges = changes => ({
  type: RECEIVE_REVIEW_CHANGES,
  changes
});

export const fetchReviews = id => dispatch => (
  APIUtil.fetchReviews(id)
    .done(reviews => dispatch(receiveReviews(reviews)))
    .fail(errors => dispatch(receiveErrors(errors)))
);
