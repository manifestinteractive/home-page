var settings = {},
	cookie = $.cookie('homepage_settings'),
	fullscreen = false,
	hide_menu = null,
	timeout = 10000,
	use_ios7_bg_animate = true,
	use_keyboard_shortcuts = true;

if(cookie && cookie !== '' && cookie !== '{}')
{
	window.settings = JSON.parse($.cookie('homepage_settings'));
}

/**
 * Attempt to request Browser Geo Location
 * @param  {Function} callback Callback Function to use
 */
function browser_geolocation(callback)
{
	try {
		if(!google)
		{
			google = 0;
		}
	}
	catch(err){
		google = 0;
	}

	// FireFox/HTML5 GeoLocation
	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(function(position)
		{
			zip_from_latlng(position.coords.latitude,position.coords.longitude,callback);
		});
	}
	// Google Gears GeoLocation
	else if(google && google.gears)
	{
		var geloc = google.gears.factory.create('beta.geolocation');
		geloc.getPermission();
		geloc.getCurrentPosition(function(position)
		{
			zip_from_latlng(position.latitude,position.longitude,callback);
		},
		function(err){});
	}
}

/**
 * Get Zipcode from Latitude & Longitude
 * @param  {number}   latitude
 * @param  {number}   longitude
 * @param  {Function} callback  Callback Function to Use
 */
function zip_from_latlng(latitude, longitude, callback)
{
	var script = document.createElement("script");
		script.src = "http://ws.geonames.org/findNearbyPostalCodesJSON?lat=" + latitude + "&lng=" + longitude + "&callback=" + callback;

	document.getElementsByTagName("head")[0].appendChild(script);
}

/**
 * Handle Geo Location Response
 * @param  {object} json JSON Object
 */
function fetch_geolcation(json)
{
	window.settings.geolocation = {
		zip: json.postalCodes[0].postalCode,
		country: json.postalCodes[0].countryCode,
		state: json.postalCodes[0].adminName1,
		county: json.postalCodes[0].adminName2,
		place: json.postalCodes[0].placeName,
		lat: json.postalCodes[0].lat,
		lng: json.postalCodes[0].lng
	};

	$.cookie('homepage_settings', JSON.stringify(window.settings));

	setTimeout(load_data, 500);
}

/**
 * Launch Fullscreen Website
 */
function launch_fullscreen()
{
	if(document.documentElement.requestFullScreen)
	{
		document.documentElement.requestFullScreen();
	}
	else if(document.documentElement.mozRequestFullScreen)
	{
		document.documentElement.mozRequestFullScreen();
	}
	else if(document.documentElement.webkitRequestFullScreen)
	{
		document.documentElement.webkitRequestFullScreen(document.body.ALLOW_KEYBOARD_INPUT);
	}

	window.fullscreen = true;
}

/**
 * Cancel Fullscreen Website
 */
function cancel_fullscreen()
{
	if(document.cancelFullScreen)
	{
		document.cancelFullScreen();
	}
	else if(document.mozCancelFullScreen)
	{
		document.mozCancelFullScreen();
	}
	else if(document.webkitCancelFullScreen)
	{
		document.webkitCancelFullScreen();
	}

	window.fullscreen = false;
}

/**
 * Generate Clock Time
 */
function start_time()
{
	var today = new Date();
	var hour = today.getHours();
	var minute = today.getMinutes();
	var second = today.getSeconds();
	var ampm = 'AM';

	if(hour > 12)
	{
		hour -= 12;
		ampm = 'PM';
	}

	if (minute<10)
	{
		minute="0" + minute;
	}

	if (second<10)
	{
		second="0" + second;
	}

	$('.clock').html('<i class="icon-time"></i>&nbsp; '+ hour +'<span>:<\/span>'+ minute +'<span>:<\/span>'+ second +' '+ ampm);

	setTimeout(start_time, 1000);
}

/**
 * Load Date
 */
function load_data()
{
	// Load Weather based on Browsers Location
	$.simpleWeather({
		zipcode: window.settings.geolocation.zip,
		location: '',
		unit: 'f',
		success: function(weather) {
			html = '<img class="nobounce" src="'+ weather.image +'" width="250" height="180">' +
				'<h2 class="nobounce">'+ weather.temp +'&deg;'+weather.units.temp+'</h2>' +
				'<ul class="nobounce">' +
				'<li class="nobounce">'+ weather.currently +'</li>' +
				'<li class="nobounce"><i class="icon-angle-up"></i> '+ weather.high +'&deg;&nbsp; <i class="icon-angle-down"></i> '+ weather.low +'&deg;</li>' +
				'<li class="nobounce optional hidden-phone"><i class="icon-location-arrow"></i> '+ weather.wind.speed +' '+ weather.wind.direction +'</li>' +
				'</ul>';

			$(".weather").html(html);
		},
		error: function(error) {
			$(".weather").html('<p>'+error+'</p>');
		}
	});

	// Get my Google RSS Feed
	$('.content .google').rssfeed(
		'http://gplusrss.com/rss/feed/b9285465a5642f024e4365dfc45325b0525ebdeb5af94',
		{
			limit: 20,
			header: false,
			linktarget: '_blank'
		},
		function(){
			$('.content .google').prepend('<a name="google"></a>');
		}
	);

	// Get my Github RSS Feed
	$('.content .github').rssfeed(
		'https://github.com/manifestinteractive.private.atom?token=425e6ccb6c7d8d744dc93dafbcc09891',
		{
			limit: 20,
			header: false,
			linktarget: '_blank'
		},
		function(){
			$('.content .github').prepend('<a name="google"></a>');
		}
	);

	// Get my LinkedIn RSS Feed
	$('.content .linkedin').rssfeed(
		'http://www.linkedin.com/rss/nus?key=SpbPKdYV0LKuR6wFHp8xD8YntSPi8PuJ6YLtf_SCZseKVcFounB0LYncptA9ubPew3',
		{
			limit: 20,
			header: false,
			linktarget: '_blank'
		},
		function(){
			$('.content .linkedin').prepend('<a name="google"></a>');
		}
	);

	// Get my Twitter RSS Feed
	$('.content .twitter').rssfeed(
		'http://home.peterschmalfeldt.com/tweetledee/homerss.php',
		{
			limit: 20,
			header: false,
			linktarget: '_blank'
		},
		function(){
			$('.content .twitter').prepend('<a name="google"></a>');
		}
	);

	// Get my Technology RSS Feed
	$('.content .newsfeed').rssfeed(
		'http://feeds.theguardian.com/theguardian/technology/rss',
		{
			limit: 20,
			header: false,
			linktarget: '_blank'
		},
		function(){
			$('.content .newsfeed').prepend('<a name="google"></a>');
		}
	);
}

function orientation_changed(orientation_event)
{
	var beta = orientation_event.beta,
		gamma = orientation_event.gamma;

	if (window.orientation !== null)
	{
		var screen_orientation = window.orientation;

		if (screen_orientation === -90)
		{
			beta = orientation_event.gamma;
			gamma = -1 * orientation_event.beta;
		}
		else if (screen_orientation === 90)
		{
			beta = -1 * orientation_event.gamma;
			gamma = orientation_event.beta;
		}
		else if (screen_orientation === 180)
		{
			beta = -1 * orientation_event.beta;
			gamma = -1 * orientation_event.gamma;
		}
	}

	var tan_of_gamma = Math.tan(gamma * (Math.PI / 180)),
		tan_of_beta = Math.tan((beta - 45) * (Math.PI / 180)),
		background_distance = 15,
		x_image_position = Math.ceil(-1 * tan_of_gamma * background_distance) - 50,
		y_image_position = Math.ceil(-1 * tan_of_beta * background_distance) - 50;

	$('body').css({
		'background-position-x': x_image_position + 'px',
		'background-position-y': y_image_position + 'px',
		'background-size': 'auto 125%',
		'-webkit-transform': 'translate3d(0,0,0)',
		'-moz-transform': 'translate3d(0,0,0)',
		'-ms-transform': 'translate3d(0,0,0)',
		'-o-transform': 'translate3d(0,0,0)',
		'transform': 'translate3d(0,0,0)',
		'-webkit-transition': 'all .1s ease-out',
		'-moz-transition': 'all .1s ease-out',
		'-ms-transition': 'all .1s ease-out',
		'-o-transition': 'all .1s ease-out',
		'transition': 'all .1s ease-out'
	});
}

// Once the browser is ready, do your magic
$(document).ready(function() {

	// Check if we already have saved Geolocation to avoid lookups
	if(typeof window.settings.geolocation === 'undefined')
	{
		browser_geolocation('fetch_geolcation');
	}

	// Check if we are on a phone or tablet
	if( ! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
	{
		$('a').tooltip();

		setTimeout(function(){
			window.scrollTo(0, 1);
		}, 0);

		window.addEventListener('orientationchange', function() {
			window.scrollTo(0, 1);
		}, false);
	}
	// On Desktop
	else
	{
		$('.fade-container').css({
			'overflow-y': 'auto'
		});

		$('.refresh').css({
			'right': '58px'
		});

		$('.toggle-fullscreen').hide();

		if(window.use_ios7_bg_animate && /iPhone|iPad|iPod/i.test(navigator.userAgent) )
		{
			window.addEventListener("deviceorientation", orientation_changed, false);
		}
	}

	// Listen for Fullscreen Button Click
	$('.toggle-fullscreen').click(function(){
		if(window.fullscreen)
		{
			cancel_fullscreen();
		}
		else
		{
			launch_fullscreen();
		}

		return false;
	});

	// Listen for Menu Button Click
	$('.menu-list').click(function(){
		$('.submenu').fadeToggle('slow');

		hide_menu = setTimeout(function(){ $('.submenu').fadeOut('slow'); }, window.timeout);

		window.location.href = '#top';

		return false;
	});

	// Listen for Refresh Button Click
	$('.refresh').click(function(){
		load_data();
		$('.refresh').addClass('spin');
		setTimeout(function(){ $('.refresh').removeClass('spin'); }, 1000);
		return false;
	});

	// Clear Timeouts if we're still looking at the menu
	$('.submenu a').hover(function(){
		clearTimeout(hide_menu);
		hide_menu = setTimeout(function(){ $('.submenu').fadeOut('slow'); }, window.timeout);
	});

	// Listen for Submenu Button Clicks
	$('.submenu a').click(function(){

		clearTimeout(hide_menu);
		hide_menu = setTimeout(function(){ $('.submenu').fadeOut('slow'); }, window.timeout);

		$('.submenu a').not(this).removeClass('active');

		$(this).toggleClass('active');

		var myclass = $(this).attr('class');
			myclass = myclass.replace('active', '');
			myclass = myclass.replace('nobounce', '');
			myclass = '.' + myclass.replace(' ', '');

		var anchor = myclass.replace('.', '#');

		$('.fade-container').not(myclass).stop().hide();
		$('.content .close').hide();

		$('.watermark').removeClass('watermark_bookmarks watermark_google watermark_github watermark_linkedin watermark_twitter watermark_newsfeed');

		if($(this).hasClass('active'))
		{
			$(myclass, '.content').stop().fadeIn('fast').removeClass('blur').css({'display': 'inline-block'}).animate({ scrollTop: '0' }, 0);
			$('.content .close').fadeIn('slow');
			$('.content .close').css({
				left: ( $('.content .fade-container:visible').width() + 45 ) + 'px'
			});

			setTimeout(function(){ $('.watermark').addClass('watermark_' + myclass.replace('.', '')); }, 250 );
		}
		else
		{
			$(myclass, '.content').stop().addClass('blur').fadeOut('fast');
			$('.content .close').fadeOut('slow');
		}

		window.location.href = anchor;

		// Now that the page is donw loading, lets trigger the initial resize
		$(window).trigger('resize');

		return false;
	});

	// Listen for Close Button Click
	$('.content .close').click(function(){
		$('.submenu a').removeClass('active');
		$('.content .fade-container').stop().addClass('blur').fadeOut('fast');
		$('.content .close').stop().hide();

		$('.watermark').removeClass('watermark_bookmarks watermark_google watermark_github watermark_linkedin watermark_twitter watermark_newsfeed');

		window.location.href = '#top';

		return false;
	});

	// We don't want to show the scrollbars, but we want them to be scrollable
	$('.fade-container').bind('mousewheel', function(event, delta, deltaX, deltaY) {
		this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
		event.stopPropagation();
		event.preventDefault();
	});

	// Listen for browser resize to update GUI
	$( window ).resize(function() {
		$('.fade-container').css({
			height: ($(document).height() - 200) + 'px'
		});

		$('.content .close').css({
			left: ( $('.content .fade-container:visible').width() + 45 ) + 'px'
		});

		var content_width = $('.content').width(),
			container_width = $('.content .fade-container:visible').width(),
			font_width = container_width * 0.5,
			bg_right = (content_width-container_width) + (container_width / 2) - ( font_width / 2 );

		$('.watermark').css({
			'right': bg_right + 'px',
			'font-size': font_width + 'px',
			'top': 100 + ( container_width / 2 ) + 'px'
		});

		window.scrollTo(0, 1);
	});

	// Add Keyboard Shortcuts to avoid having to use the menu at all
	if(use_keyboard_shortcuts)
	{
		Mousetrap.bind('1', function(){ $('.submenu a.bookmarks').trigger('click'); });
		Mousetrap.bind('2', function(){ $('.submenu a.google').trigger('click'); });
		Mousetrap.bind('3', function(){ $('.submenu a.github').trigger('click'); });
		Mousetrap.bind('4', function(){ $('.submenu a.linkedin').trigger('click'); });
		Mousetrap.bind('5', function(){ $('.submenu a.twitter').trigger('click'); });
		Mousetrap.bind('6', function(){ $('.submenu a.newsfeed').trigger('click'); });

		Mousetrap.bind('c', function(){ $('.close').trigger('click'); });
		Mousetrap.bind('r', function(){ $('.refresh').trigger('click'); });
		Mousetrap.bind('f', function(){ $('.toggle-fullscreen').trigger('click'); });
		Mousetrap.bind('m', function(){ $('.menu-list').trigger('click'); });

		Mousetrap.bind('up', function(event){
			var elem = $('.fade-container:visible'),
				height = elem.height()*0.90;

			elem.stop().animate({ scrollTop: '-='+height+'px' }, 750);
			event.stopPropagation();
			event.preventDefault();
		});

		Mousetrap.bind('down', function(event){
			var elem = $('.fade-container:visible'),
				height = elem.height()*0.90;

			elem.stop().animate({ scrollTop: '+='+height+'px' }, 750);
			event.stopPropagation();
			event.preventDefault();
		});

		Mousetrap.bind('left', function(event){
			$('.submenu a.active').prev().trigger('click');
			event.stopPropagation();
			event.preventDefault();
		});

		Mousetrap.bind('right', function(event){
			$('.submenu a.active').next().trigger('click');
			event.stopPropagation();
			event.preventDefault();
		});

		Mousetrap.bind('home', function(event){
			$('.fade-container:visible').stop().animate({ scrollTop: '0' }, 750);
			event.stopPropagation();
			event.preventDefault();
		});

		Mousetrap.bind('end', function(event){
			$('.fade-container:visible').stop().animate({ scrollTop: $('.fade-container:visible')[0].scrollHeight + 'px' }, 750);
			event.stopPropagation();
			event.preventDefault();
		});
	}

	// Get everything setup
	setInterval(function(){ $('.refresh').trigger('click'); }, 60000);
	setTimeout(load_data, 500);

	// Start Clock
	start_time();

});
