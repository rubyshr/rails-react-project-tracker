import React from 'react';
import StoryMenu from './story_menu';

const items = {
  critical: { title: 'P0 - Critical'},
  high: { title: 'P1 - High' },
  medium: { title: 'P2 - Medium' },
  low: { title: 'P3 - Low' },
}

const StoryPriority = ({story, handleMenu}) => {
  return (
    <section className='story-state-section'>
      <span className='story-section-caption'>Priority</span>
      <div className='story-section-content'>
        <StoryMenu items={items} currentValue={story.priority }
          handleSelect={handleMenu}/>
      </div>
    </section>
  );
}

export default StoryPriority;
