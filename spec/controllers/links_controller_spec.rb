# frozen_string_literal: true

require 'rails_helper'

describe LinksController do
  let!(:user) { create(:user) }
  let!(:project) { create(:project) }
  let!(:membership) {create(:membership, project: project, user: user)}
  let!(:story) { create(:story, project: project) }
  let!(:link) { create(:link, user: user, story: story) }

  before do
    subject.login(user)
  end

  describe '#index' do
    it 'should return all links' do
      get :index, params: { story_id: story.id, format: :json }
      expect(response.status).to eq(200)
    end
  end

  describe '#create' do
    it 'create the link' do
      post :create, params: { story_id: story.id, link: { related_link: "www.google.com", user_id: user, story_id: story }, format: :json }
      expect(response.status).to be 200
    end
  end

  describe '#update' do
    it 'update the link' do
      put :update, params: { id: link.id, link: { related_link: "www.google.com" }, format: :json }
      expect(response.status).to be 200
    end
  end

  describe '#destroy' do
    it 'deletes the link' do
      expect do
        delete :destroy, params: { id: link.id, format: :json }
      end.to change(Link, :count).by(-1)
    end
  end
end
