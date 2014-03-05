class SearchController < ApplicationController
	
  def index
	  begin
	  	@q = params[:vacant_building][:fullAddress].upcase
	  rescue

	  end

	  begin
	  	 @vb = VacantBuilding.find_by(:fullAddress => @q)
	  	 @inspect = @vb.inspect
	  	 @coordinates = @vb.coordinates
	  	 @fullAddress = @vb.fullAddress
	 	
	 	 @array = []
@geowithin = VacantBuilding.collection.find( { :coordinates => { "$geoWithin" =>
	{ "$center" => [ @vb.coordinates, 0.02 ] }
	} } ).each do |document|
	 @array << document

end	
	@arr =  @array.count

	  rescue
	
	  end
	 
  end

end
