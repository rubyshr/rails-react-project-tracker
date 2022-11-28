import * as APIUtil from '../util/link_api_util';
import { receiveErrors } from './error_actions';

export const RECEIVE_LINK = 'RECEIVE_LINK';
export const RECEIVE_DELETE_LINK = 'RECEIVE_DELETE_LINK';

export const receiveLink = link => ({
	type: RECEIVE_LINK,
	link
});

export const receiveDeleteLink = link => ({
  type: RECEIVE_DELETE_LINK,
  link
});

export const fetchLink = id => dispatch => (
  APIUtil.fetchLink(id)
    .done(link => dispatch(receiveLink(link)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const createLink = link => dispatch => (
  APIUtil.createLink(link)
    .done(link => dispatch(receiveLink(link)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const updateLink = link => dispatch => (
	APIUtil.updateLink(link)
  	.done(link => dispatch(receiveLink(link)))
    .fail(errors => dispatch(receiveErrors(errors)))
);

export const deleteLink = link => dispatch =>(
	APIUtil.deleteLink(link)
		.done(() => dispatch(receiveDeleteLink(link)))
		.fail(errors => dispatch(receiveErrors(errors)))
	);

export const removeLink = link => dispatch => {
  return new Promise((resolve, reject) => {
    resolve(dispatch(receiveDeleteLink(link)))
  });
}
