class LinksController < ApplicationController

  include StoriesHelper

  before_action :require_login
  after_action :push_mod_notification, only: [:create, :update, :destroy]

  def index
    @links = find_story(params[:story_id]).links
  end

  def create
    @link = Link.new(link_params)
    @link[:story_id] = params[:story_id] if find_story(params[:story_id])
    do_action { @link.save }
  end

  def update
    @link = Link.find(params[:id])
    do_action { @link.update(link_params )}  
  end

  def destroy
    @link = Link.find(params[:id])
    do_action { @link.destroy } 
  end

  private

  def push_mod_notification
    story = @link.story
    push_notification(story.project_id, 'mod', {id: story.id, at: ''})
  end

  def action_object
    @link
  end
 
  def can_edit?(link)
    return true unless link && link.persisted?
    link.story.project.member?(current_user)
  end

  def link_params
    result = params.require(:link).permit(:related_link, :user_id, :story_id)
    result[:related_link].strip! if result[:related_link]
    result
  end
end
