export const fetchStory = id => $.ajax({
  url: `/api/stories/${id}`,
});

export const createStory = story => $.ajax({
  method: 'POST',
  url: `/api/projects/${story.project_id}/stories`,
  data: { story },
});

export const updateStory = story => $.ajax({
  method: 'PATCH',
  url: `/api/stories/${story.id}`,
  data: { story },
});

export const deleteStory = story => $.ajax({
  method: 'DELETE',
  url: `/api/stories/${story.id}`,
});

export const prioritizeStory = (story, priority) => $.ajax({
  method: 'PATCH',
  url: `/api/stories/${story.id}/prioritize`,
  data: { story : { priority } }
});

export const followStory = (user_id, story) => $.ajax({
  method: 'POST',
  url: `/api/stories/${story.id}/follow_story`,
  data: { user_id },
});

export const findFollows = id => $.ajax({
  url: `/api/find_follow/${id}`,
});