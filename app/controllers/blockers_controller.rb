class BlockersController < ApplicationController

  include StoriesHelper

  before_action :require_login
  after_action :push_mod_notification, only: [:create, :update, :destroy]

  def index
    @blockers = find_story(params[:story_id]).blockers
  end

  def create
    @blocker = Blocker.new(blocker_params)
    @blocker[:story_id] = params[:story_id] if find_story(params[:story_id])
    do_action { @blocker.save }
  end

  def update
    @blocker = Blocker.find(params[:id])
    do_action { @blocker.update(blocker_params )}  
  end

  def destroy
    @blocker = Blocker.find(params[:id])
    do_action { @blocker.destroy } 
  end

  private

  def push_mod_notification
    story = @blocker.story
    push_notification(story.project_id, 'mod', {id: story.id, at: ''})
  end

  def action_object
    @blocker
  end
 
  def can_edit?(blocker)
    return true unless blocker && blocker.persisted?
    blocker.project.member?(current_user)
  end

  def blocker_params
    result = params.require(:blocker).permit(:block_reason, :user_id, :story_id)
    result[:block_reason].strip! if result[:block_reason]
    result
  end
end
