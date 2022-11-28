export const fetchBlockers = blocker => $.ajax({
  url: `/api/stories/${blocker.story_id}/blockers`,
});

export const createBlocker = blocker => $.ajax({
  method: 'POST',
  url: `/api/stories/${blocker.story_id}/blockers`,
  data: { blocker },
});

export const updateBlocker = blocker => $.ajax({
  method: 'PATCH',
  url: `/api/blockers/${blocker.id}`,
  data: { blocker },
});

export const deleteBlocker = blocker => $.ajax({
  method: 'DELETE',
  url: `/api/blockers/${blocker.id}`,
});
