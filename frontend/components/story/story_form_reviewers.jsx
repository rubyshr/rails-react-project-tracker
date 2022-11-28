import React from 'react';
import StoryMenu from './story_menu_data';

const StoryReviewers = ({handleMenu, props}) => {
  const items = props.reviews;

  return (
    <section className='story-reviews-section'>
      <span className='story-section-caption'>Reviewers</span>
      <div className='story-section-content'>
        <StoryMenu items={items} currentValue='+ add review'
          handleSelect={handleMenu}/>
      </div>
    </section>
  );
}

export default StoryReviewers;
