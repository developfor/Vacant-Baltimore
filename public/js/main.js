(function(window, document, undefined){

var dataInsert = function(){

    var isAnimate = 1,
    toggleSpeed = 300;

    //the click function for the info and embed buttons
    var clickInfo = function(){
       
        var last;
        $('#info-button, #embed-button, #embed-close, #info-close').on('click', function(){

            if(isAnimate === 1){
                isAnimate = 0;
                var current = $(this).attr("id").split('-')[0];// split this id to get a single id
                current += "-text";
                toggles(current, last);//call the toggle function
                last = current;
            }
        });
    };//END OF CLICKINFO

    //toggle function it is called by clickInfo
    var toggles = function(picked, last){

        if($('#info-dropdown').is(':visible')){  //if the dropdown is open
            if(picked === last){  //if the button clicked is the same as the one clicked before
                $('#info-dropdown').slideToggle(toggleSpeed, function(){
                    isAnimate = 1;//turn ability to click on once toggle has finished
                });
              
            }else{ //if the button clicked is different from the one clicked before

                $('#info-dropdown').slideToggle(toggleSpeed, function(){
                    $('#info-text').hide();
                    $('#embed-text').hide();
                    $('#'+picked).show();
                    $('#info-dropdown').slideToggle(toggleSpeed);
                    isAnimate = 1; //turn ability to click on once toggle has finished
                });
            
            }
        }else{ //if nothing has been clicked yet
            $('#info-text').hide();
            $('#embed-text').hide();
            $('#'+picked).show();
            $('#info-dropdown').slideToggle(toggleSpeed, function(){
                isAnimate = 1; //turn ability to click on once toggle has finished
                
            });
        }

    };//END OF TOGGLES FUNCTION

    clickInfo(); 
    $(".scroll-text").niceScroll({horizrailenabled:false, cursorcolor:"#282F35", cursorborder: "0px", background: "grey", cursorminheight: "10"});
};

dataInsert();

})(this, document);