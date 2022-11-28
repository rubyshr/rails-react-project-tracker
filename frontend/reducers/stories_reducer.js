import {
  RECEIVE_STORY,
  RECEIVE_DELETE_STORY,
  RECEIVE_STORY_CHANGES,
  RECEIVE_PRIORITIZE_STORIES,
  RECEIVE_FOLLOWS,
 } from '../actions/story_actions';
import { RECEIVE_PROJECT } from '../actions/project_actions';
import { RECEIVE_TASK, RECEIVE_DELETE_TASK } from '../actions/task_actions';
import { RECEIVE_BLOCKER, RECEIVE_DELETE_BLOCKER } from '../actions/blocker_actions';
import { RECEIVE_LINK, RECEIVE_DELETE_LINK } from '../actions/link_actions';
import * as _ from 'lodash';

const defaultState = {}

const StoriesReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROJECT:
      return action.stories || defaultState;

    case RECEIVE_STORY: {
      let newState = Object.assign({}, state);
      newState[action.story.id] = action.story;
      return newState;
    }

    case RECEIVE_DELETE_STORY: {
      let newState = Object.assign({}, state);
      delete newState[action.story.id];
      return newState;
    }

    case RECEIVE_STORY_CHANGES: {
      if (action.changes) {
        let newState = Object.assign({}, state);
        Object.keys(action.changes).forEach(id => {
          Object.assign(newState[id], action.changes[id]);
        });
        return newState;
      } else {
        return state;
      }
    }

    case RECEIVE_PRIORITIZE_STORIES: {
      const { story, changes } = action.payload;
      let newState = Object.assign({}, state);
      changes.forEach(change => {
        const { id, priority, updated_at } = change;
        if (newState[id]) {
          newState[id].priority = priority;
          if (updated_at) {
            newState[id].updated_at = updated_at;
          }
        }
      });
      return newState;
    }

    case RECEIVE_TASK: {
      const { task } = action;
      let newState = _.merge({}, state);
      const story = newState[task.story_id];
      if (story) {
        if (story.tasks) {
          story.tasks[task.id] = task;
        } else {
          story.tasks = {[task.id]: task}
        }
      }
      return newState;
    }

    case RECEIVE_DELETE_TASK: {
      const { task } = action;
      let newState = _.merge({}, state);
      const story = newState[task.story_id];
      if (story && story.tasks) {
        delete story.tasks[task.id];
      }
      return newState;
    }

    case RECEIVE_BLOCKER: {
      const { blocker } = action;
      let newState = _.merge({}, state);
      const story = newState[blocker.story_id];
      if (story) {
        if (story.blockers) {
          story.blockers[blocker.id] = blocker;
        } else {
          story.blockers = {[blocker.id]: blocker}
        }
      }
      return newState;
    }

    case RECEIVE_DELETE_BLOCKER: {
      const { blocker } = action;
      let newState = _.merge({}, state);
      const story = newState[blocker.story_id];
      if (story && story.blockers) {
        delete story.blockers[blocker.id];
      }
      return newState;
    }

    case RECEIVE_LINK: {
      const { link } = action;
      let newState = _.merge({}, state);
      const story = newState[link.story_id];
      if (story) {
        if (story.links) {
          story.links[link.id] = link;
        } else {
          story.links = {[link.id]: link}
        }
      }
      return newState;
    }

    case RECEIVE_DELETE_LINK: {
      const { link } = action;
      let newState = _.merge({}, state);
      const story = newState[link.story_id];
      if (story && story.blockers) {
        delete story.links[link.id];
      }
      return newState;
    }
      
    case RECEIVE_FOLLOWS: {
      const { follow } = action;
      debugger
      let newState = _.merge({}, state);
      const story = newState[follow.story_id];
      if (story) {
        if (story.follows) {
          story.follows[follow.id] = follow;
        } else {
          story.follows = {[follow.id]: follow}
        }
      }
      return newState;
    }
    default:
      return state;
  }
};

export default StoriesReducer;
