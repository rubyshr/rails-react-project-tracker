import React from 'react';
import { connect } from 'react-redux';
import * as StoryUtil from './story_util';
import { selectUser } from '../../util/selectors';
import { clearErrors } from '../../actions/error_actions';
import ErrorMsg from '../util/error';
import {
  fetchStory,
  receiveStory,
  createStory,
  updateStory,
  deleteStory,
  receiveDeleteStory,
  findFollows,
  followStories,
} from '../../actions/story_actions';
import { fetchReviews } from '../../actions/review_actions';
import {
  receiveTask,
  createTask,
  updateTask,
  deleteTask,
  removeTask,
} from '../../actions/task_actions';
import {
  receiveBlocker,
  createBlocker,
  updateBlocker,
  deleteBlocker,
  removeBlocker,
} from '../../actions/blocker_actions';
import {
  receiveLink,
  createLink,
  updateLink,
  deleteLink,
  removeLink,
} from '../../actions/link_actions';
import StoryTitle from './story_form_title';
import StoryActions from './story_form_actions';
import StoryKind from './story_form_kind';
import StoryReviewers from './story_form_reviewers';
import StoryPoints from './story_form_points';
import StoryState from './story_form_state';
import StoryPriority from './story_form_priority';
import StoryRequester from './story_form_requester';
import StoryFollow from './story_form_follow';
import StoryDescription from './story_form_description';
import StoryTasks from './story_form_tasks';
import StoryBlockers from './story_form_blockers';
import StoryLinks from './story_form_links';  

class StoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleChangeTask = this.handleChangeTask.bind(this);
    this.handleSaveTask = this.handleSaveTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);

    this.handleAddBlocker = this.handleAddBlocker.bind(this);
    this.handleChangeBlocker = this.handleChangeBlocker.bind(this);
    this.handleSaveBlocker = this.handleSaveBlocker.bind(this);
    this.handleDeleteBlocker = this.handleDeleteBlocker.bind(this);

    this.handleAddLink = this.handleAddLink.bind(this);
    this.handleChangeLink = this.handleChangeLink.bind(this);
    this.handleSaveLink = this.handleSaveLink.bind(this);
    this.handleDeleteLink = this.handleDeleteLink.bind(this);
    
    this.handleReview = this.handleReview.bind(this);
    
    this.handleSaveFollow = this.handleSaveFollow.bind(this);

    this.id = `${Math.random() * 1e6}`;
    this.task_id = 0;
    this.blocker_id = 0;
    this.link_id = 0;
  }

  componentDidMount() {
    if (this.props.isNew) {
      this.props.handleEdit(this.props.story, 'start');
    } else {
      this.props.fetchStory(this.props.story.id).then(function() {
        this.props.handleEdit(this.props.story, 'start');
      }.bind(this));
    }
    this.handleReview(this.props.story)
  }

  componentWillUnmount() {
    this.props.handleEdit(this.props.story, 'end')
    if (this.props.errorMsg) {
      this.props.clearErrors();
    }
  }

  render() {
    const { errorMsg } = this.props;
    return (
      <div ref={instance => this.myRef = instance} className='story-form'
        onDoubleClick={this.handleDoubleClick}>
        {this.renderTitle()}
        <ErrorMsg msg={errorMsg}/>
        {this.renderActions()}
        <div className='story-options-section'>
          {this.renderKind()}
          {this.renderPoints()}
          {this.renderState()}
          {this.renderPriority()}
          {this.renderRequester()}
          {this.renderFollow()}
          {this.renderReviewers()}
        </div>
        {this.renderDescription()}
        {this.renderTasks()}
        {this.renderBlockers()}
        {this.renderLinks()}
      </div>
    );
  }

  renderTitle() {
    return (
      <StoryTitle
        story={this.props.story}
        handleCaret={this.handleClose}
        handleChange={this.handleChange('title')}
        />
    );
  }

  renderActions() {
    return (
      <StoryActions
        story={this.props.story}
        handleDelete={this.handleDelete}
        handleSave={this.handleSave}
        />
    );
  }

  renderKind() {
    return (
      <StoryKind
        story={this.props.story}
        handleMenu={this.handleMenu('kind')}
        />
    );
  }

  renderPoints() {
    return (
      <StoryPoints
        story={this.props.story}
        handleMenu={this.handleMenu('points')}/>
    );
  }

  renderReviewers() {
    return (
      <StoryReviewers
        handleMenu={this.handleMenu('reviewers')}
        props={this.props}
        />
    );
  }

  renderState() {
    return (
      <StoryState
        story={this.props.story}
        handleMenu={this.handleMenu('state')}
        handleWorkflow={this.props.handleWorkflow}
        />
    );
  }

  renderPriority() {
    return (
      <StoryPriority
        story={this.props.story}
        handleMenu={this.handleMenu('priority')}
        />
    );
  }

  renderRequester() {
    return (
      <StoryRequester
        story={this.props}
        />
    );
  }

  renderFollow() {
    return (
      <StoryFollow
        story={this.props.story}
        form_id={this.id}
        currentUserId = {this.props.user_id}
        handleSave={this.handleSaveFollow}
        handleUnfollow={this.handleUnfollow}
        />
    );
  }

  renderDescription() {
    return (
      <StoryDescription
        story={this.props.story}
        handleChange={this.handleChange('description')}
        />
    );
  }

  renderTasks() {
    return(
      <StoryTasks
        story={this.props.story}
        form_id={this.id}
        handleAdd={this.handleAddTask}
        handleChange={this.handleChangeTask}
        handleSave={this.handleSaveTask}
        handleDelete={this.handleDeleteTask}
        />
    );
  }

  renderBlockers() {
    return(
      <StoryBlockers
        story={this.props.story}
        form_id={this.id}
        handleAdd={this.handleAddBlocker}
        handleChange={this.handleChangeBlocker}
        handleSave={this.handleSaveBlocker}
        handleDelete={this.handleDeleteBlocker}
        />
    );
  }

  renderLinks() {
    return(
      <StoryLinks
        story={this.props.story}
        form_id={this.id}
        handleAdd={this.handleAddLink}
        handleChange={this.handleChangeLink}
        handleSave={this.handleSaveLink}
        handleDelete={this.handleDeleteLink}
        />
    );
  }

  handleDoubleClick(e) {
    if (Object.is(e.target, e.currentTarget)) {
      this.handleClose(e)
    }
  }

  handleClose(e) {
    this.handleSave(e)
  }

  handleDelete(e) {
    if (this.props.isNew) {
      this.props.removeStory(this.props.story);
    } else {
      this.props.deleteStory(this.props.story);
    }
  }

  handleSave(e) {
    const { story, isNew } = this.props;
    if (isNew) {
      if (StoryUtil.isEmpty(story)) {
        this.props.removeStory(story);
      } else {
        this.props.createStory(this.flatten(story))
          .then(() => this.props.removeStory(story));
      }
    } else {
      this.props.updateStory(story).then(() => {
        if (this.myRef) {
          this.props.handleClose(e)
        }
      });

    }
  }


  flatten(story) {
    const result = Object.assign({}, story)
    result.tasks = story.tasks && Object.keys(story.tasks).map(id => ({
      title: story.tasks[id].title,
      done: story.tasks[id].done
    }));
    return result;
  }

  flatten(story) {
    const result = Object.assign({}, story)
    result.blockers = story.blockers && Object.keys(story.blockers).map(id => ({
      block_reason: story.blockers[id].block_reason
    }));
    return result;
  }

  flatten(story) {
    const result = Object.assign({}, story)
    result.links = story.links && Object.keys(story.links).map(id => ({
      related_link: story.links[id].related_link
    }));
    return result;
  }

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      this.setValue(field, e.currentTarget.value);
    };
  }

  handleMenu(field) {
    return (value, e) => {
      this.setValue(field, value);
      if (field == 'state') {
        const story = Object.assign({}, this.props.story, { state: value, });
        if (value === 'started' || !story.assignee_id) {
          story.assignee_id = this.props.user_id;
        }
        this.props.updateStory(story);
      } else if (field == 'points') {
        const story = Object.assign({}, this.props.story, { points: value, });
        this.props.updateStory(story);
      } else if (field == 'kind') {
        const story = Object.assign({}, this.props.story, { kind: value, });
        this.props.updateStory(story);
      } else if (field == "priority") {
        const story = Object.assign({}, this.props.story, { priority: value, });
        this.props.updateStory(story);
      }
    };
  }

  handleReview(story) {
    this.props.fetchReviews(story.project_id);
  }

  setValue(field, value) {
    this.props.receiveStory(Object.assign({}, this.props.story,
      {[field]: value}));
  }

  handleAddTask(e) {
    const task = StoryUtil.initTask({
      id: `${this.id}_${this.task_id++}`,
      story_id: this.props.story.id,
      user_id: this.props.user_id,
    });
    this.props.receiveTask(task);
  }

  handleChangeTask({ id }) {
    return function (field, value) {
      const story = this.props.story;
      const task = Object.assign({}, story.tasks[id], {[field]: value})
      this.props.receiveTask(task);
    }.bind(this);
  }

  handleSaveTask(task) {
    if (this.props.isNew) {
      return new Promise((resolve, reject) => {
        resolve(this.props.receiveTask(task))
      });
    } else if (StoryUtil.isNew(task)) {
      return this.props.createTask(task)
        .then(() => this.props.removeTask(task))
    } else {
      return this.props.updateTask(task);
    }
  }

  handleSaveFollow(currentUserId, story) {
    return this.props.followStories(currentUserId, story);
  }

  handleUnfollow(follow) {
    return this.props.removeFollow(follow);
  }

  handleDeleteTask(task) {
    if (this.props.isNew || StoryUtil.isNew(task)) {
      return this.props.removeTask(task);
    } else {
      return this.props.deleteTask(task);
    }
  }

  handleAddBlocker(e) {
    const blocker = StoryUtil.initBlocker({
      id: `${this.id}_${this.blocker_id++}`,
      story_id: this.props.story.id,
      user_id: this.props.user_id,
    });
    this.props.receiveBlocker(blocker);
  }

  handleChangeBlocker({ id }) {
    return function (field, value) {
      const story = this.props.story;
      const blocker = Object.assign({}, story.blockers[id], {[field]: value})
      this.props.receiveBlocker(blocker);
    }.bind(this);
  }

  handleSaveBlocker(blocker) {
    if (this.props.isNew) {
      return new Promise((resolve, reject) => {
        resolve(this.props.receiveBlocker(blocker))
      });
    } else if (StoryUtil.isNew(blocker)) {
      return this.props.createBlocker(blocker)
        .then(() => this.props.removeBlocker(blocker))
    } else {
      return this.props.updateBlocker(blocker);
    }
  }

  handleDeleteBlocker(blocker) {
    if (this.props.isNew || StoryUtil.isNew(blocker)) {
      return this.props.removeBlocker(blocker);
    } else {
      return this.props.deleteBlocker(blocker);
    }
  }

  handleAddLink(e) {
    const link = StoryUtil.initLink({
      id: `${this.id}_${this.link_id++}`,
      story_id: this.props.story.id,
      user_id: this.props.user_id,
    });
    this.props.receiveLink(link);
  }

  handleChangeLink({ id }) {
    return function (field, value) {
      const story = this.props.story;
      const link = Object.assign({}, story.links[id], {[field]: value})
      this.props.receiveLink(link);
    }.bind(this);
  }

  handleSaveLink(link) {
    if (this.props.isNew) {
      return new Promise((resolve, reject) => {
        resolve(this.props.receiveLink(link))
      });
    } else if (StoryUtil.isNew(link)) {
      return this.props.createLink(link)
        .then(() => this.props.removeLink(link))
    } else {
      return this.props.updateLink(link);
    }
  }

  handleDeleteLink(link) {
    if (this.props.isNew || StoryUtil.isNew(link)) {
      return this.props.removeLink(link);
    } else {
      return this.props.deleteLink(link);
    }
  }
}

const mapStateToProps = (state, { story }) => ({
  requester: selectUser(state, story.author_id)['name'],
  user_id: state.session.currentUser.id,
  errorMsg: state.errors[0],
  reviews: state.reviews,
  follows: story.follows,
});

const mapDispatchToProps = (dispatch, {story}) => {
  return {
    isNew: StoryUtil.isNew(story),
    clearErrors: () => dispatch(clearErrors()),
    fetchStory: id => dispatch(fetchStory(id)),

    receiveStory: story => dispatch(receiveStory(story)),
    createStory: story => dispatch(createStory(story)),
    deleteStory: story => dispatch(deleteStory(story)),
    updateStory: story => dispatch(updateStory(story)),
    removeStory: story => dispatch(receiveDeleteStory(story)),
    followStories: (user_id, story) => dispatch(followStories(user_id, story)),

    receiveTask: task => dispatch(receiveTask(task)),
    createTask: task => dispatch(createTask(task)),
    deleteTask: task => dispatch(deleteTask(task)),
    updateTask: task => dispatch(updateTask(task)),
    removeTask: task => dispatch(removeTask(task)),
  
    receiveBlocker: blocker => dispatch(receiveBlocker(blocker)),
    createBlocker: blocker => dispatch(createBlocker(blocker)),
    deleteBlocker: blocker => dispatch(deleteBlocker(blocker)),
    updateBlocker: blocker => dispatch(updateBlocker(blocker)),
    removeBlocker: blocker => dispatch(removeBlocker(blocker)),

    receiveLink: link => dispatch(receiveLink(link)),
    createLink: link => dispatch(createLink(link)),
    deleteLink: link => dispatch(deleteLink(link)),
    updateLink: link => dispatch(updateLink(link)),
    removeLink: link => dispatch(removeLink(link)),  

    fetchReviews: id => dispatch(fetchReviews(id)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoryForm);
