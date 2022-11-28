import React from 'react';
import { isNew, isEmptyBlocker } from './story_util';
import StoryBlocker from './story_blocker';

class StoryBlokers extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }

  render() {
    const items = this.renderItems();
    const story = this.props.story;
    const completed = story.blockers && Object.keys(story.blockers).reduce(
      (sum, id) => (sum += story.blockers[id].done ? 1 : 0), 0);
    return (
      <section className='story-tasks-section'>
        <div className='story-section-caption'>
          Blockers ({`${items.length}`})
        </div>
        <div className='story-section-content'>
          {items}
          <button
            className='story-add-task-btn'
            onClick={this.handleAdd}>
            <i className='fa fa-plus'/>Add a Block Reason
          </button>
        </div>
      </section>
    );
  }

  renderItems() {
    const items = []
    const story = this.props.story;
    if (story.blockers) {
      Object.keys(story.blockers).forEach(id => {
        const blocker = story.blockers[id];
        if (!isNew(blocker) || blocker.id.match(`${this.props.form_id}`)) {
          items.push(
            <StoryBlocker
              key={id}
              blocker={blocker}
              handleChange={this.props.handleChange(blocker)}
              handleSave={this.props.handleSave}
              handleDelete={this.props.handleDelete}
              />
          );
        }
      });
    }
    return items;
  }

  handleAdd(e) {
    const story = this.props.story;
    const newBlockerId = story.blockers && Object.keys(story.blockers).find(
      id => isNew(story.blockers[id])
    )
    if (newBlockerId) {
      const blocker = story.blockers[newBlockerId];
      if (isEmptyBlocker(blocker)) {
        this.props.handleDelete(blocker).then(() => {
          this.props.handleAdd(e)
        });
      } else {
        this.props.handleSave(blocker).then(() => {
          this.props.handleAdd(e)
        });
      }
    } else {
      this.props.handleAdd(e);
    }
  }

}

export default StoryBlokers;