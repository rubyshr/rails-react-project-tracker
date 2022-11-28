import React from 'react';
import { isNew, isEmptyLink } from './story_util';
import StoryLink from './story_link';

class StoryLinks extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }

  render() {
    const items = this.renderItems();
    const story = this.props.story;
    const completed = story.links && Object.keys(story.links).reduce(
      (sum, id) => (sum += story.links[id].done ? 1 : 0), 0);
    return (
      <section className='story-tasks-section'>
        <div className='story-section-caption'>
          Links ({`${items.length}`})
        </div>
        <div className='story-section-content'>
          {items}
          <button
            className='story-add-task-btn'
            onClick={this.handleAdd}>
            <i className='fa fa-plus'/>Add a Link of Code
          </button>
        </div>
      </section>
    );
  }

  renderItems() {
    const items = []
    const story = this.props.story;
    if (story.links) {
      Object.keys(story.links).forEach(id => {
        const link = story.links[id];
        if (!isNew(link) || link.id.match(`${this.props.form_id}`)) {
          items.push(
            <StoryLink
              key={id}
              link={link}
              handleChange={this.props.handleChange(link)}
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
    const newLinkId = story.links && Object.keys(story.links).find(
      id => isNew(story.links[id])
    )
    if (newLinkId) {
      const link = story.links[newLinkId];
      if (isEmptyLink(link)) {
        this.props.handleDelete(link).then(() => {
          this.props.handleAdd(e)
        });
      } else {
        this.props.handleSave(link).then(() => {
          this.props.handleAdd(e)
        });
      }
    } else {
      this.props.handleAdd(e);
    }
  }

}

export default StoryLinks;