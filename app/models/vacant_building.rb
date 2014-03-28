class VacantBuilding
  include Mongoid::Document

  # store_in database: "vb"
  # store_in collection: "vacant_buildings"
  
	field :fullAddress, type: String
	field :blockLot, type: String
	field :coordinates, type: Array
  	index({coordinates: '2d'}, {min: -180, max: 180})
end
