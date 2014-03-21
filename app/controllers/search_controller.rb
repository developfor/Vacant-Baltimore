class SearchController < ApplicationController
	def index

	end

	def address_search
			@location = params[:vacant_building][:searchLocation].upcase
			@get_address = Geokit::Geocoders::GoogleGeocoder.geocode(@location)
			# puts @get_address
		respond_to do |format|
		  format.html
		  format.xml  { render :xml => @get_address }
		  format.json { render :json => @get_address }
		end
	end


	def load_markers
		
			@lat = params[:vacant_building][:lat]	   
		    @log = params[:vacant_building][:log]
		    @vb_coor = [ @lat.to_f, @log.to_f]    
			# puts @vb_coor

		
		    # @vb = VacantBuilding.find_by(coordinates: [-76.5677218731, 39.2919877174])


			@array = []
			 
			# VacantBuilding.limit(50).geo_near(@vb_coor).spherical
			# @geowithin = VacantBuilding.collection.find( { :coordinates => { "$geoWithin" => { "$center" => [ @vb_coor, 5 ] } } } ).limit(200)
			VacantBuilding.limit(200).geo_near(@vb_coor)
			.each do |document|
				@array << document
			end	

			# puts @array.count

			respond_to do |format|
			  format.html
			  format.xml  { render :xml => @array, status: :ok }
			  # format.json { render :json => @array, status: :ok }
			  format.json { render status: 200, json: @array.to_json}

			end
			# render json: move_json 
		
	end


	def howdy
		respond_to do |format|
		  format.html
		  format.xml  { render :xml => VacantBuilding.all }
		  format.json { render :json => VacantBuilding.all }
		end
	end
end
