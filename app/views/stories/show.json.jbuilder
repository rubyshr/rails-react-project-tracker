# frozen_string_literal: true

json.partial! 'stories/story', story: @story
json.set! :tasks do
  @story.tasks.each do |task|
    json.set! task.id do
      json.partial! 'tasks/task', task: task
    end
  end
end

json.set! :blockers do
  @story.blockers.each do |blocker|
    json.set! blocker.id do
      json.partial! 'blockers/blocker', blocker: blocker
    end
  end
end

json.set! :links do
  @story.links.each do |link|
    json.set! link.id do
      json.partial! 'links/link', link: link
    end
  end
end

json.set! :follows do
  @story.follows.each do |follow|
    json.set! follow.id do
      json.partial! 'stories/follow', follow: follow
    end
  end
end
