//edit

Webflow.push(function () {
    $(".w-condition-invisible").remove();
});
Webflow.ready();


function pauseAllVideos() {
    $('iframe').each(function () {
        var players = new Vimeo.Player($(this))
        players.pause();
        console.log('PAUSED ALL VIDEOS')
    });
}

function pauseAllSvgs() {
    var svgs = document.querySelector('lottie-player')
    svgs.pause()
}

function lightTheme() {
    $('.swiper-fraction, .slider-text, .etc-menu').addClass('white-text');
    $('.swiper-next, .swiper-prev').addClass('white-cursor');
    console.log('light theme loaded')
}

function darkTheme() {
    $('.swiper-fraction, .slider-text, .etc-menu').removeClass('white-text');
    $('.swiper-next, .swiper-prev').removeClass('white-cursor');
    console.log('dark theme loaded')
}

function loadTheme() {
    if ($('.swiper-slide-active').children('.white-menu').length == 1) {
        lightTheme()
    } else {
        darkTheme()
    }
}

function playVideo() {
    var activeSlideVimeo = document.querySelector('.swiper-slide-active')
    var iframe = activeSlideVimeo.querySelector('iframe')
    var player = new Vimeo.Player(iframe)
    player.play()
    console.log('PLAY VIDEO')
}

function playSvg() {
    var activeSlideLottie = document.querySelector('.swiper-slide-active')
    var svg = activeSlideLottie.querySelector('lottie-player')
    svg.play()
    console.log('playing svg')
}

Pace.on('done', function () {
    loadTheme()
    $('.intro-load').fadeOut(300);

});

var initDestroyTimeOutPace = function () {
    var counter = 0;

    var refreshIntervalId = setInterval(function () {
        var progress;

        if (typeof $('.pace-progress').attr('data-progress-text') !== 'undefined') {
            progress = Number($('.pace-progress').attr('data-progress-text').replace("%", ''));
        }

        if (progress === 99) {
            counter++;
        }

        if (counter > 50) {
            clearInterval(refreshIntervalId);
            Pace.stop();
        }
    }, 100);
}
initDestroyTimeOutPace();
pauseAllVideos()
var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 300,
    autoplay: false,
    pagination: {
        el: '.swiper-fraction',
        type: 'fraction'
    },
    navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev'
    }
})

mySwiper.on('slideChangeTransitionStart', function () {
    pauseAllVideos()
    //pauseAllSvgs()
    var currentSlide = $('.swiper-slide-active');

    if (currentSlide.children('.white-menu').length == 1) {
        lightTheme()
    } else {

        darkTheme()
    }

    if (currentSlide.find('iframe').length == 1) {
        playVideo()
        //console.log('PLAYING VIDEO')
    } else if (currentSlide.find('lottie-player').length == 1) {
        playSvg()
    } else if (currentSlide.find('#font-tester').length == 1) {
        document.getElementById("font-tester").focus();
    } else {}

});