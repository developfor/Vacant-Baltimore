class SearchController < ApplicationController
	# def index
	# 	begin
	# 		@q = params[:vacant_building][:fullAddress].upcase
	# 	rescue

	# 	end

	# 	begin
	# 		@vb = VacantBuilding.find_by(:fullAddress => @q)
	# 		# @inspect = @vb.inspect
	# 		# @coordinates = @vb.coordinates
	# 		# @fullAddress = @vb.fullAddress

	# 		@array = []
	# 		@geowithin = VacantBuilding.collection.find( { :coordinates => { "$geoWithin" => { "$center" => [ @vb.coordinates, 0.02 ] } } } )
	# 		.each do |document|
	# 			@array << document
	# 		end	
	# 		@arr =  @array.count
	# 		respond_to do |format|
	# 		  format.html
	# 		  format.xml  { render :xml => @array }
	# 		  format.json { render :json => @array }
	# 		end
	# 	rescue
	# 	end
	# end
def index
		begin
			# @q = params[:vacant_building][:fullAddress].upcase
			@lat = params[:vacant_building][:lat]
		    # puts params[:lat]
		    @log = params[:vacant_building][:log]
		    puts @log.to_f
		    @vb_coor = [ @lat.to_f, @log.to_f]
		rescue
		end

		begin
			# @vb = VacantBuilding.find_by(:fullAddress => @q)
			@vb = VacantBuilding.find_by(coordinates: [-76.5677218731, 39.2919877174])

			# @inspect = @vb.inspect
			# @coordinates = @vb.coordinates
			# @fullAddress = @vb.fullAddress

			@array = []
			@geowithin = VacantBuilding.collection.find( { :coordinates => { "$geoWithin" => { "$center" => [ @vb_coor, 0.02 ] } } } )
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
