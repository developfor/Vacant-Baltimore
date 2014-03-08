class MapController < ApplicationController
	def index
		begin
			@q = params[:vacant_building][:fullAddress].upcase
		rescue

		end

		begin
			@vb = VacantBuilding.find_by(:fullAddress => @q)
			

			@array = []
			@geowithin = VacantBuilding.collection.find( { :coordinates => { "$geoWithin" => { "$center" => [ @vb.coordinates, 0.02 ] } } } )
			.each do |document|
				@array << document
			end	
			@arr =  @array.count
			respond_to do |format|
			  format.html 
			  format.xml  { render :xml => @array }
			  format.json { render :json => @array }
			end
		rescue
		end
	end

	def howdy
		respond_to do |format|
		  format.html 
		  format.xml  { render :xml => VacantBuilding.all }
		  format.json { render :json => VacantBuilding.all }
		end
	end
end
