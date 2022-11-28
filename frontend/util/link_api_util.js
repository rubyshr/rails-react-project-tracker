export const fetchLinks = link => $.ajax({
  url: `/api/stories/${link.story_id}/links`,
});

export const createLink = link => $.ajax({
  method: 'POST',
  url: `/api/stories/${link.story_id}/links`,
  data: { link },
});

export const updateLink = link => $.ajax({
  method: 'PATCH',
  url: `/api/links/${link.id}`,
  data: { link },
});

export const deleteLink = link => $.ajax({
  method: 'DELETE',
  url: `/api/links/${link.id}`,
});
