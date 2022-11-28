export const fetchReviews = id => $.ajax({
  url: `/reviews?id=${id}`,
});
