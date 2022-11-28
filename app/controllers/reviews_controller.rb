class ReviewsController < ApplicationController
	def index
		project = Project.find(params[:id])
		@reviews = project.reviews.all
	end
end
