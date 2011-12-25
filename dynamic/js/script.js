$(document).ready(function() {
						   
	var g, c, s, v, p, 
		//some vars for caching
		navanchors = $('a', '#nav'),
		nivoslider = $('#nivoslider', '#content'),
		slides = $('.slide', '#content');
		//slidersettings
		slideropts = {
			 directionNav:false,
			 controlNav:false,
			 keyboardNav:false
		},
		
		
		//init function
		init = function(){
	
			//replace all headings with custom font
			Cufon.replace('h1,h2,h3,h4,h5');
			//get the current location
			var current = location.hash.substr(3) || slides[0].id;
			
			//show current
			$('#'+current).show();
			
			slides.css({
				position:'absolute',
				top:70,
				left:0
			});
			
			//merge the slideropts
			$.extend(slideropts, params.slider);
			
			//init nivoslider
			nivoslider.nivoSlider(slideropts);
			
			
			//bind the pagetransition to the navigation
			navanchors.bind('click', function(){
											   
				var t = $(this);
				
				navanchors.removeClass('active');
				t.addClass('active');
				var id = t.attr('href').substr(1);
				
				if(id != current){
					$('#'+id).stop().css({
							  top:10,
							  opacity:0,
							  'z-index':3
							  }).show();
					$('#'+current).stop().animate({
							top:120,
							opacity:0
							},function(){$(this).hide();}).css('zIndex', '2');
					$('#'+id).animate({
							top:70,
							opacity:1
							});
					current = id;
					document.title = document.title.split(' - ')[0]+' - '+t.text();
					location.href = '#!/'+current;
				}
				
				//saveing some CPU power ;)
				if(id != '{{_('home')}}'){
					//stop nivoslider if not at 'home'
					nivoslider.data('nivoslider').stop();			
				}else{
					//or start if we are
					nivoslider.data('nivoslider').start(); 
				}
				return false;
				
			});
			
			if($('a[href=#'+current+']', '#nav').length){
				//trigger current navigation point if it exists
				$('a[href=#'+current+']', '#nav').click();
			}else{
				//trigger first navigation point if not exists
				navanchors.eq(0).click();
			}
			
			//Some on site navigation handling
			$('a[href^=#]', '#content').bind('click',function(){
				var id = $(this).attr('href').substr(1);
				$('#nav a[href=#'+id+']').click();
				return false;
			});
			
			//placeholder in inputs is not implemented well in all browsers, so we need to trick this		
			$("[placeholder]").focus(function() {
				var el = $(this);
				if (el.val() == el.attr("placeholder")) {
					el.val("");
					el.removeClass("placeholder").css('color','#333333');
				}
			}).blur(function() {
				var el = $(this);
				if (el.val() == "" || el.val() == el.attr("placeholder")) {
					el.addClass("placeholder");
					el.val(el.attr("placeholder")).css('color','#DDDDDD');
				}
			}).blur();
			
			
			
			//portfolio
			g = new gallery('portfolio');
			g.init();
			//social media
			s = new socialmedia();
			s.init();
			//contact form
			c = new contact();
			c.init();
			
		};




/* GALLERY FORM SECTION START
	*  
	*  This part for the Portfolio
	*/

    var gallery = function (slideid) {
		
		var i = 0,
			g = $('.gallery', '#'+slideid),
			pages = g.find('ul'),
			currentid = 0,
			portfoliotitel,
			galnavanchors;
		
		function init(){
			//init the gallery
			g.find('a').prettyPhoto();
			
			setTitle();
			//make the navigation if more than 1 pages
			if(pages.length > 1){
				
				navpoints = '';
				pages.each(function(i,e){
					navpoints += '<li><a href="#'+i+'">'+(i+1)+'</a></li>';
				});
				pages.css({
					position:'absolute',
					left:0,
					top:0
				}).hide();
				
				pages.eq(currentid).show();
				
				var galnav = $('.gallerynav', '#'+slideid);
				galnav.html(navpoints);
				
				galnavanchors = galnav.find('a');
				
				galnavanchors
					.eq(currentid)
					.addClass('selected');
					
				galnavanchors.bind('click', function(){
					changePage($(this).attr('href').substr(1));
					return false;
				});
			}
		}
		
		function changePage(id){
			//define the direction
			if(id < currentid){
				start = -40;
				end = 20;
			}else{
				start = 20;
				end = -40;
			}
			if(id != currentid){
				pages.eq(id).stop().css({
						  left:start,
						  opacity:0,
						  'z-index':5
						}).show();
				pages.eq(currentid).stop().animate({
						left:end,
						opacity:0
						},function(){$(this).hide();}).css('zIndex', '3');
				pages.eq(id).animate({
						left:0,
						opacity:1
						});
				currentid = parseInt(id,10);
				galnavanchors.removeClass('selected').eq(id).addClass('selected');
			}
			setTitle();
		}
		
		//set a custome portolfio titel if necessary
		function setTitle(){
			var el = $('#'+slideid+' > h2');
			portfoliotitel = portfoliotitel || el.text();
			var title = pages.eq(currentid).attr('title') || portfoliotitel;
			var current = el.text();
			if(current != title){
				el.fadeOut('fast',function(){
					el.text(title).fadeIn('fast');
					Cufon.replace('#'+slideid+' > h2');
				});
			}
			
		}
		
		
        //public functions
        return {
            init: function () {
                init();
            }
        };
	};

/* GALLERY FORM SECTION END
	*/




/* SOCIAL MEDIA SECTION START
	*  
	*  This part for the Social Media
	*/

    var socialmedia = function () {
        //public functions
		
		function init(){
			//hover effect for the icons
			$('#networks').find('a').fadeTo(1,0.6).hover(function(){
				$(this).stop().fadeTo(50,0.99);	//trick IE to prevent pixelate background									
			}, function(){
				$(this).clearQueue().delay(100).fadeTo(500,0.6);										
			});
		}
		
        return {
            init: function () {
                init();
            }
        };
	};

/* SOCIAL MEDIA SECTION END
	*/




/* CONTACT FORM SECTION START
	*  
	*  This part for the Contact Form
	*/

    var contact = function () {

        var timeout, email,
			nameel = $('#name'),
			emailel = $('#contactemail'),
			msgel = $('#contactmsg'),
            form = $('#contactform'),
            button = $('#contactsubmit'),
			status = $('#contactstatus'),
			valid = false;


        //init
        function init() {

			//hover effect for the vcard
			$('.vcardfile').find('img').fadeTo(1,0.6).hover(function(){
				$(this).stop().fadeTo(50,1);										
			}, function(){
				$(this).clearQueue().delay(100).fadeTo(500,0.6);										
			});
			//add event handler for validation and submiting
			nameel.bind('keyup', keyupHandler);
			emailel.bind('keyup', keyupHandler);
			msgel.bind('keyup', keyupHandler);
			form.bind('submit', submitForm);

			//first check of email input
			check();
        }

        //checks the input after 500 ms
        function keyupHandler() {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                check();
            }, 500);
        }

        //sets the status


        function setStatus(txt) {
            status.show().html(txt).delay(4000).fadeOut(1000);
        }

        //submits the email address
        function submitForm() {

            //If everything is correct
            if (valid) {
                //unbind event and clear interval to prevent false status
				nameel.unbind('keyup');
				emailel.unbind('keyup');
				msgel.unbind('keyup');
				
				//disable button
				button.attr('disabled','disabled');
                setStatus(params.texts.contactformwait);
                //ajax call
                $.post("contact.php", {
                    name: $.trim(nameel.val()),
                    email: $.trim(emailel.val().toLowerCase()),
                    msg: $.trim(msgel.val())
                }, function (data) {
					//enable the input
					button.removeAttr('disabled');
                    if (data.success) {
                        //set status and clear the inputs
                        setStatus(params.texts.contactformadded);
                        nameel.val('').blur();
                        emailel.val('').blur();
                        msgel.val('').blur();
						//now its invalid again
						valid = false;
						
						init();
                    } else {
                        //set status and rebind the keyupHandler
                        setStatus(params.texts.contactformfail);
						nameel.bind('keyup', keyupHandler);
						emailel.bind('keyup', keyupHandler);
						msgel.bind('keyup', keyupHandler);
						//now its invalid again
						valid = false;
                    }
                }, "json");
            } else {
                //some fields are invalid
				var email = (emailel.val() == emailel.attr('placeholder')) ? '' : emailel.val();
				if(email != '' && !verify(email)){
					setStatus(params.texts.contactforminvalidemail);
				}else{
					setStatus(params.texts.contactforminvalid);
				}
            }
            return false;
        }

        //checks the inputs an change status + color of button
        function check() {
            email = emailel.val();
            if (verify(email) && nameel.val() != '' && msgel.val() != '' && nameel.val() != nameel.attr('placeholder') && msgel.val() != msgel.attr('placeholder')) {
                //valid inputs 
                button.css('background-color','#5780CC');
                valid = true;
            } else {
                //invalid inputs
                button.css('background-color','#BBBBBB');
                valid = false;
            }
        }

        //verify the syntax of an email
        function verify(email) {
            email = $.trim(email.toLowerCase());
            return (email && /^([\w-]+(?:\.[\w-]+)*)\@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$|(\[?(\d{1,3}\.){3}\d{1,3}\]?)$/.test(email))
        }

        //public functions
        return {
            init: function () {
                init();
            }
        };
    };

/* CONTACT FORM SECTION END
	*/


	//init the whole thing
	init();
	
});


