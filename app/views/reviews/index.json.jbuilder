@reviews.each do |review|
  json.set! review.id do
    json.partial! 'reviews/review', review: review
  end
end
