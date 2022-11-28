import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DragSource, DropTarget } from 'react-dnd';
import * as StoryUtil from './story_util';
import { selectUser } from '../../util/selectors';
import {
  updateStory,
  receiveStory,
  findFollows,
  prioritizeStory
} from '../../actions/story_actions';
import StoryForm from './story_form';
import StoryWorkflow from './story_workflow';

class StoryItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: StoryUtil.isNew(this.props.story) }
    this.handleCaret = this.handleCaret.bind(this);
    this.handleWorkflow = this.handleWorkflow.bind(this);
  }

  render() {
    return this.state.open
      ? <StoryForm
        story={this.props.story}
        handleClose={this.handleCaret}
        handleEdit={this.props.handleEdit}
        handleWorkflow={this.handleWorkflow}
        />
      : this.renderItem();
  }

  renderItem() {
    const { story, canDrag } = this.props;
    const { connectDragSource, isDragging } = this.props;
    const { connectDropTarget, isOver } = this.props;

    const className =`story-item ${story.state}`
      + (isDragging ? ' drag-source' : '')
      + (isOver ? ' drop-target' : '')
      + (canDrag(story) ? ' can-drag' : '');

    return connectDropTarget(connectDragSource(
      <div className={className} onDoubleClick={this.handleCaret}>
        <div>
          {this.renderCaret()}
          {this.renderKind()}
          {this.renderTitle()}
        </div>
        {this.renderWorkflow()}
      </div>
    ));
  }

  renderCaret() {
    const icon = `fa fa-caret-${this.state.open ? 'down' : 'right'}`
    return <i className={`caret ${icon}`} onClick={this.handleCaret} />
  }

  renderKind() {
    return StoryUtil.renderKind(this.props.story.kind);
  }

  renderTitle() {
    const { story, initials } = this.props;
    return (
      <div>
        <span className='title'>
          {story.title}
        </span> (<span className='initials'>{initials}</span>)
      </div>
    );
  }

  renderWorkflow() {
    const story = this.props;
    return (
      <StoryWorkflow
        story={this.props.story}
        handleWorkflow={this.handleWorkflow}
        />
    )
  }

  handleCaret(e) {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  handleWorkflow(action) {
    return (e) => {
      const story = Object.assign({}, this.props.story, { state: action, });
      if (action === 'started' || !story.assignee_id) {
        story.assignee_id = this.props.user_id;
      }
      if (this.state.open) {
        this.props.receiveStory(story);
      } else {
        this.props.updateStory(story);
      }
      this.props.findFollows(story.id);
    }
  }
}

//  drag & drop

const storySource = {
  canDrag: ({ story, canDrag }) => canDrag(story),
  beginDrag: ({ story }) => ({ sourceId: story.id }),
  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      const story = monitor.getDropResult();
      if (story) {
        const old_priority = parseInt(props.story.priority);
        let new_priority = parseInt(story.priority);
        if (old_priority !== new_priority) {
          props.prioritizeStory(props.story, new_priority);
        }
      }
    }
  }
}

const storyTarget = {
  drop: ({ story }) => story
}

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const collectTarget = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
});

const dragSource = DragSource(
  StoryUtil.DragDropItemTypes.STORY,
  storySource,
  collectSource
)(StoryItem);

const dragSourceAndDropTarget = DropTarget(
  StoryUtil.DragDropItemTypes.STORY,
  storyTarget,
  collectTarget
)(dragSource);

const mapStateToProps = (state, {story}) => ({
  user_id: state.session.currentUser.id,
  initials: selectUser(state, story.author_id)['initials']
});

const mapDispatchToProps = dispatch => ({
  updateStory: story => dispatch(updateStory(story)),
  receiveStory: story => dispatch(receiveStory(story)),
  findFollows: id => dispatch(findFollows(id)),
  prioritizeStory: (story, priority) => (
    dispatch(prioritizeStory(story, priority))
  )
})

const connectedDragSourceAndDropTarget = connect(
  mapStateToProps,
  mapDispatchToProps
)(dragSourceAndDropTarget);

export default connectedDragSourceAndDropTarget;