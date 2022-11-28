# frozen_string_literal: true

require 'rails_helper'

describe ReviewsController do
  let!(:project) { create(:project) }
  let!(:review) { create(:review, project: project) }

  describe '#index' do
    it 'should return all links' do
      get :index, params: {id: project.id, format: :json }
      expect(response.status).to eq(200)
    end
  end
end
