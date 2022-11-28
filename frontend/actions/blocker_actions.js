import * as APIUtil from '../util/blocker_api_util';
import { receiveErrors } from './error_actions';

export const RECEIVE_BLOCKER = 'RECEIVE_BLOCKER';
export const RECEIVE_DELETE_BLOCKER = 'RECEIVE_DELETE_BLOCKER';

export const receiveBlocker = blocker => ({
	type: RECEIVE_BLOCKER,
	blocker
});

export const receiveDeleteBlocker = blocker => ({
  type: RECEIVE_DELETE_BLOCKER,
  blocker
});

export const fetchBlocker = id => dispatch => (
  APIUtil.fetchBlocker(id)
    .done(blocker => dispatch(receiveBlocker(blocker)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const createBlocker = blocker => dispatch => (
  APIUtil.createBlocker(blocker)
    .done(blocker => dispatch(receiveBlocker(blocker)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const updateBlocker = blocker => dispatch => (
	APIUtil.updateBlocker(blocker)
  	.done(blocker => dispatch(receiveBlocker(blocker)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const deleteBlocker = blocker => dispatch =>(
	APIUtil.deleteBlocker(blocker)
		.done(() => dispatch(receiveDeleteBlocker(blocker)))
		.fail(errors => dispatch(receiveErrors(errors)))
	);

export const removeBlocker = blocker => dispatch => {
  return new Promise((resolve, reject) => {
    resolve(dispatch(receiveDeleteBlocker(blocker)))
  });
}
