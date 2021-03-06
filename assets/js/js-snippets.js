// Swup options
var options = {
	containers: [
		'#page'
	],
	plugins: [
		new SwupBodyClassPlugin(),
		new SwupScrollPlugin({
		    doScrollingRightAway: false,
		    animateScroll: true,
		    scrollFriction: 0.3,
		    scrollAcceleration: 0.04,
		}),
		new SwupPreloadPlugin()
	]
}

var swup = new Swup(options);

// Run JS after page change via Swup
swup.on('contentReplaced', function () {
	detectJs()
});


// Detect JS, set class on body
function detectJs(){
	document.body.className = document.body.className.replace('no-js', 'js');
}
detectJs();

// When elements enter the window, in-view
// Example setup, give your HTML elements a "view" class
function inViewInit() {
	inView('.view').on('enter', function (el) {
		el.classList.add('visible');
	});
}
inViewInit();

// Lazyload
// Example setup, give your HTML elements a "lazyload" class
var lazyLoadInstance = new LazyLoad({
	elements_selector: '.lazyload',
	threshold: 0
});



// Smooth scroll
var page = $('html, body');

// Anchor smooth scroll
function smoothScroll() {
	$('a[href*="#"]:not([href="#"])').on('click', function() {
		page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
			page.stop();
		});
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$(page).animate({
					scrollTop: target.offset().top-32
				}, 1400, '', function(){});
				return false;
			}
		}
	});
}
smoothScroll();


// Top scroll
function topScroll(){
	$('.scroll-top').on('click', function(){
		page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
			page.stop();
		});
		$(page).stop().animate({
			scrollTop: 0
		}, 1600, '', function(){});
		return false;
	});
}
topScroll();


// Responsive videos (YouTube and Vimeo embeds)
function responsiveVideos(){
	var iframes = document.getElementsByTagName( 'iframe' );
		for ( var i = 0; i < iframes.length; i++ ) {
		var iframe = iframes[i],
		players = /www.youtube.com|player.vimeo.com/;
		if ( iframe.src.search( players ) > 0 ) {
			var videoRatio = ( iframe.height / iframe.width ) * 100;
			iframe.style.position = 'absolute';
			iframe.style.top = '0';
			iframe.style.left = '0';
			iframe.width = '100%';
			iframe.height = '100%';
			var wrap = document.createElement( 'div' );
			wrap.className = 'fluid-vids';
			wrap.style.width = '100%';
			wrap.style.position = 'relative';
			wrap.style.paddingTop = videoRatio + '%';
			var iframeParent = iframe.parentNode;
			iframeParent.insertBefore( wrap, iframe );
			wrap.appendChild( iframe );
		}
	}
}
responsiveVideos();