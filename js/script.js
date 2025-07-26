(function ($) {

  "use strict";

  // ------------------------------------------------------------------------------ //
  // Overlay Menu Navigation
  // ------------------------------------------------------------------------------ //
  var overlayMenu = function () {

    if (!$('.nav-overlay').length) {
      return false;
    }

    var body = undefined;
    var menu = undefined;
    var menuItems = undefined;
    var init = function init() {
      body = document.querySelector('body');
      menu = document.querySelector('.menu-btn');
      menuItems = document.querySelectorAll('.nav__list-item');
      applyListeners();
    };
    var applyListeners = function applyListeners() {
      menu.addEventListener('click', function () {
        return toggleClass(body, 'nav-active');
      });
    };
    var toggleClass = function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass)) element.classList.remove(stringClass); else element.classList.add(stringClass);
    };
    init();
  }


  // Portfolio Slider
  var swiper = new Swiper(".portfolio-Swiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    autoplay: {
      delay: 3000, // 3 seconds delay between slides
      disableOnInteraction: false, // Continue autoplay after user interaction
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      300: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  // Animate Texts
  var initTextFx = function () {
    $('.txt-fx').each(function () {
      var newstr = '';
      var count = 0;
      var delay = 100;
      var stagger = 10;
      var words = this.textContent.split(/\s/);
      var arrWords = new Array();
      
      $.each( words, function( key, value ) {
        newstr = '<span class="word">';

        for ( var i = 0, l = value.length; i < l; i++ ) {
          newstr += "<span class='letter' style='transition-delay:"+ ( delay + stagger * count ) +"ms;'>"+ value[ i ] +"</span>";
          count++;
        }
        newstr += '</span>';

        arrWords.push(newstr);
        count++;
      });

      this.innerHTML = arrWords.join("<span class='letter' style='transition-delay:"+ delay +"ms;'>&nbsp;</span>");
    });
  }

  // init Isotope
  var initIsotope = function() {
    
    $('.grid').each(function(){

      // $('.grid').imagesLoaded( function() {
        // images have loaded
        var $buttonGroup = $( '.button-group' );
        var $checked = $buttonGroup.find('.is-checked');
        var filterValue = $checked.attr('data-filter');
  
        var $grid = $('.grid').isotope({
          itemSelector: '.portfolio-item',
          // layoutMode: 'fitRows',
          filter: filterValue
        });
    
        // bind filter button click
        $('.button-group').on( 'click', 'a', function(e) {
          e.preventDefault();
          filterValue = $( this ).attr('data-filter');
          $grid.isotope({ filter: filterValue });
        });
    
        // change is-checked class on buttons
        $('.button-group').each( function( i, buttonGroup ) {
          $buttonGroup.on( 'click', 'a', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
          });
        });
      // });

    });
  }

  // init Chocolat light box
  var initChocolat = function() {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }

  // Video play function
window.playVideo = function(videoId) {
  const video = document.getElementById(videoId);
  const placeholder = document.getElementById(videoId + '-placeholder');
  const container = video.closest('.video-container');

  // Hide placeholder and show video
  if (placeholder) {
    placeholder.style.display = 'none';
  }
  video.style.display = 'block';

  // Set the actual video source with autoplay
  const videoSources = {
    'video1': 'videos/singing1.mp4?autoplay=1',
    'video2': 'videos/singing2.mp4?autoplay=1',
    'video3': 'videos/dancing1.mp4?autoplay=1',
    'video4': 'videos/dancing2.mp4?autoplay=1'
  };

  video.src = videoSources[videoId];

  // Add playing class to hide the overlay
  container.classList.add('playing');

  // Remove the onclick handler to prevent multiple clicks
  const overlay = container.querySelector('.play-button-overlay');
  overlay.style.pointerEvents = 'none';
};

// Reset all videos to initial state when page loads
window.addEventListener('load', function() {
  const videos = document.querySelectorAll('.video-container iframe');
  videos.forEach(function(video) {
    // Reset video to blank and hide it
    video.src = 'about:blank';
    video.style.display = 'none';
    
    // Show placeholder
    const videoId = video.id;
    const placeholder = document.getElementById(videoId + '-placeholder');
    if (placeholder) {
      placeholder.style.display = 'block';
    }
    
    // Reset container state
    const container = video.closest('.video-container');
    container.classList.remove('playing');
    
    // Reset overlay
    const overlay = container.querySelector('.play-button-overlay');
    if (overlay) {
      overlay.style.pointerEvents = 'auto';
    }
  });
});

  $(document).ready(function () {

    overlayMenu();
    initTextFx();
    initChocolat();

    // mobile menu
    $('.menu-btn').click(function(e){
      e.preventDefault();
      $('body').toggleClass('nav-active');
    });

    AOS.init({
      duration: 1200,
      // once: true,
    })

  });


  // window load
  $(window).load(function () {
    $(".preloader").fadeOut("slow");
    initIsotope();
  })


})(jQuery);