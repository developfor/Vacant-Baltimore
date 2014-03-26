class SearchController < ApplicationController
	def index

	end

	def address_search
			@location = params[:vacant_building][:searchLocation].upcase
			@get_address = Geokit::Geocoders::GoogleGeocoder.geocode(@location)
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
			
			@array = []
			 
			VacantBuilding.limit(300).geo_near(@vb_coor)
			.each do |document|
				@array << document
			end	


			respond_to do |format|
			  format.html
			  format.xml  { render :xml => @array, status: :ok }
			  format.json { render :json => @array, status: :ok }
			  # format.json { render status: 200, json: @array.to_json}

			end
		
	end



end
