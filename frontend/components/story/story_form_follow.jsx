import React, { useState } from 'react';
import { connect } from 'react-redux';

class StoryFollow extends React.Component {
  constructor(props) {

    super(props);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.isFollow = this.isFollow.bind(this);

    const stories = this.props.stories;
    const story_id = this.props.story.id;
    const user_id = this.props.currentUserId;
    let value = false

    if (stories) {
      Object.keys(stories).forEach(id => {
        const story = stories[id];
        if (story.id === story_id && story.follows) {
          Object.keys(story.follows).forEach(id => {
            const follow = story.follows[id];
            if (follow.user_id === user_id) {
              value = true;
            }
          });
        }
      });
    }
    this.state = {
      follow: value
    }
  }

  isFollow() {
    return value;
  }

  render() {
    return (
     <section className='story-follow-section'>
       <label htmlFor='follow' className='story-section-caption'>
         Follow This Story
       </label>,
         <input type="checkbox"
         checked={this.state.follow}
         onChange={this.handleCheckbox} />
      </section>  
    );
  }

  handleCheckbox() {
    this.props.handleSave(this.props.currentUserId, this.props.story);
    this.setState({follow: !this.state.follow});  }

  handleSave() {
    this.props.handleSave(this.props.follow)
  }

  savefollow() { 
    this.props.handleSave(this.props.follow);
  }
}

const mapStateToProps = (state, { story }) => ({
  stories: state.stories
});

export default connect(
  mapStateToProps,
)(StoryFollow);