class LabelsController < ApplicationController
	before_action :require_login
	def index 
		@labels = Label.all 
		render json: @labels
	end

	def create
		label = Label.create(lable_name: params[:label_name])
		render json: @label
	end
 
	def update
	    label = Label.find(params[:id])
	    label.update(labels_params)
	    render json: label
    end

    def destroy
    	label = Label.find(params[:id])
     	label.destroy
     	render json: label
    end	
end
