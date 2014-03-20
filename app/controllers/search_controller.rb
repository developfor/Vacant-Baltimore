class SearchController < ApplicationController
	def index

		begin
			@lat = params[:vacant_building][:lat]	   
		    @log = params[:vacant_building][:log]
		    @vb_coor = [ @lat.to_f, @log.to_f]
		    
		rescue
		end

		begin
		    # @vb = VacantBuilding.find_by(coordinates: [-76.5677218731, 39.2919877174])


			@array = []
			 
			# VacantBuilding.limit(50).geo_near(@vb_coor).spherical
			# @geowithin = VacantBuilding.collection.find( { :coordinates => { "$geoWithin" => { "$center" => [ @vb_coor, 5 ] } } } ).limit(200)
			VacantBuilding.limit(20).geo_near(@vb_coor)
			.each do |document|
				@array << document
			end	

			# puts @array.count

			respond_to do |format|
			  format.html
			  format.xml  { render :xml => @array }
			  format.js { render :json => @array }

			end
			# render json: move_json 
		rescue
		end
	end
	# def desktop

	# 	begin
	# 		@lat = params[:vacant_building][:lat]	   
	# 	    @log = params[:vacant_building][:log]
	# 	    @vb_coor = [ @lat.to_f, @log.to_f]
		    
	# 	rescue
	# 	end

	# 	begin
	# 	    # @vb = VacantBuilding.find_by(coordinates: [-76.5677218731, 39.2919877174])

	# 		@array = []
			 
	# 		# VacantBuilding.limit(50).geo_near(@vb_coor).spherical
	# 		# @geowithin = VacantBuilding.collection.find( { :coordinates => { "$geoWithin" => { "$center" => [ @vb_coor, 5 ] } } } ).limit(200)
	# 		VacantBuilding.limit(1000).geo_near(@vb_coor)
	# 		.each do |document|
	# 			@array << document
	# 		end	

	# 		# puts @array.count

	# 		respond_to do |format|
	# 		  format.html
	# 		  format.xml  { render :xml => @array }
	# 		  move_json = format.json { render :json => @array }
	# 		end
	# 	rescue
	# 	end
	# end
	# def address_search
	# 		@location = params[:vacant_building][:searchLocation].upcase
	# 		@get_address = Geokit::Geocoders::GoogleGeocoder.geocode(@location)
	# 		# puts @get_address
	# 	respond_to do |format|
	# 	  format.html
	# 	  format.xml  { render :xml => @get_address }
	# 	  format.json { render :json => @get_address }
	# 	end
	# end
	def intial_load
		respond_to do |format|
		  format.html
		  format.xml  { render :xml => VacantBuilding.all }
		  format.json { render :json => VacantBuilding.limit(200).all }
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
