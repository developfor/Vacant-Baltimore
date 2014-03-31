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
			# puts "councilDistrict: 1 is the amount: #{VacantBuilding.where(councilDistrict: 1).count}"
		 #    puts "councilDistrict: 2 is the amount: #{VacantBuilding.where(councilDistrict: 2).count}"
		 #    puts "councilDistrict: 3 is the amount: #{VacantBuilding.where(councilDistrict: 3).count}"
		 #    puts "councilDistrict: 4 is the amount: #{VacantBuilding.where(councilDistrict: 4).count}"
		 #    puts "councilDistrict: 5 is the amount: #{VacantBuilding.where(councilDistrict: 5).count}"
		 #    puts "councilDistrict: 6 is the amount: #{VacantBuilding.where(councilDistrict: 6).count}"
		 #    puts "councilDistrict: 7 is the amount: #{VacantBuilding.where(councilDistrict: 7).count}"
		 #    puts "councilDistrict: 8 is the amount: #{VacantBuilding.where(councilDistrict: 8).count}"
		 #    puts "councilDistrict: 9 is the amount: #{VacantBuilding.where(councilDistrict: 9).count}"
		 #     puts "councilDistrict: 10 is the amount: #{VacantBuilding.where(councilDistrict: 10).count}"
		 #      puts "councilDistrict: 11 is the amount: #{VacantBuilding.where(councilDistrict: 11).count}"
		 #       puts "councilDistrict: 12 is the amount: #{VacantBuilding.where(councilDistrict: 12).count}"
		 #        puts "councilDistrict: 13 is the amount: #{VacantBuilding.where(councilDistrict: 13).count}"
		 #         puts "councilDistrict: 14 is the amount: #{VacantBuilding.where(councilDistrict: 14).count}"



			@lat = params[:vacant_building][:lat]	   
		    @log = params[:vacant_building][:log]

		    @vb_coor = [ @lat.to_f, @log.to_f]    # center of map		
			@array = []
			 
			VacantBuilding.limit(300).geo_near(@vb_coor)
			.each do |document|

				lat = document[:coordinates][0].round(5) # round up lat
				log = document[:coordinates][1].round(5) # round up log

				document = { 
					coordinates: [lat, log], 
					noticeDate: document[:noticeDate], 
					fullAddress: document[:fullAddress].to_s.titleize, 
					neighborhood: document[:neighborhood].to_s.titleize, 
					councilDistrict: document[:councilDistrict], 
					policeDistrict: document[:policeDistrict].to_s.titleize, 
					blockLot: document[:blockLot].to_s.titleize
				}
					
				 @array << document

			end	

			respond_to do |format|
			  format.html
			  format.xml  { render :xml => @array, status: :ok }
			  format.json { render :json => @array, status: :ok }

			end
		
	end



end
