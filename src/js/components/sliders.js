function initImgElem() {
    "use strict";
    var fixSrc;
    var slideSpeed;
    $('[humge-type=slider]').each(function() {
        var attr = $(this).attr('humge-effect');
        if(attr === undefined) {
            $(this).attr('humge-effect', 'slide')
        }
    });
    if($('[humge-effect=slide]')) {
        fixSrc = '';
        slideSpeed = 0;
        $('[humge-effect=slide] img').each(function() {
            $(this).parent().addClass('img')
        });
		
        $('[humge-effect=slide] .img').each(function() {
            $(this).attr('data-type', 'slider_img')
        });
        $('[humge-effect=slide]>div:first-child').addClass('slider');
        $('[humge-effect=slide]').each(function(ind) {
            $(this).find('.slider').addClass('slider' + (ind))
        });
		if(!$('[humge-effect=slide] .img').parent().is('.slider')){
			$('[humge-effect=slide] .img').unwrap(); 
		}
        fixSrc = $('[humge-effect=slide]').find('.img:first-child img').attr('src');
        $('[humge-effect=slide] .slider').prepend('<img src="' + fixSrc + '" alt="fix" class="fix" />');
        $('[humge-effect=slide]').css('position', 'relative');
        $(document).ready(function() {
			var isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));

			if(isMobile){ 
				var startx;
				var dist = 0;
				var touchobj = null;
				var numbOfImg = 0;
				var cnt = 1;
				$('[humge-effect=slide] .img').on('touchstart', function(e){
					touchobj = e.originalEvent.changedTouches[0];
					startx = parseInt(touchobj.clientX);
					numbOfImg = $(this).parent().find('.img').length;
				});
				$('[humge-effect=slide] .img').on('touchend', function(e){
					touchobj = e.originalEvent.changedTouches[0];
					dist = parseInt(touchobj.clientX);
					var slideWidth = $(this).width();
					if(!$(this).parent().is(':animated')){
						if(startx > dist){
							$(this).parent().animate({ 
								"left": '-'+slideWidth
							}, 1000, function() {
								$(this).find('.img').first().appendTo($(this));
								$(this).css('left','0');
							});
						}else if(startx < dist){
							$(this).parent().find('.img').last().prependTo($(this).parent());
							$(this).parent().css('left','-'+slideWidth+'px'); 
							$(this).parent().animate({
								"left": 0
							}, 1000);
						}
					}
				});
			}
            $('[humge-effect=slide]').each(function(index) {
                if($(this).is('[humge-speed]')) {
                    if(Number($(this).attr('humge-speed')) > 1) {
                        slideSpeed = Number($(this).attr('humge-speed')) * 1000
                    } else {
                        slideSpeed = 1500
                    }
                } else {
                    slideSpeed = 5000
                }
                if($(this).is('[humge-loadbar=true]')) {
                    $(this).find('.slider').append('<div class="loadbar"> </div>');
                    $('.loadbar').css({
                        width: '0%'
                    })
                }
                if($(this).is('[humge-control=dots]')) {
                    $(this).find('.slider').append('<div class="dots"></div>');
                    for(var i = 0; i < $(this).find('.slider .img').length; i++) {
                        $(this).find('.slider .dots').append('<a class="active" href="#" onclick="scrollToSlide(' + i + ', ' + index + ',' + slideSpeed + '); return false;" data-type="slider-dot"> </a>')
                    }
                } else if($(this).is('[humge-control=arrow]')) {
                    $(this).find('.slider').append('<a href="#" class="c_prev" onclick="prevSlide(' + index + ',' + slideSpeed + '); return false;"></a><a href="#" class="c_next" onclick="nextSlide(' + index + ',' + slideSpeed + '); return false;"></a>')
                }
                initSlideSlider(index, slideSpeed);
				
            })
        })
    }
    if($('[humge-effect=fade]')) {
        fixSrc = ''; 
        slideSpeed = 0;
        $('[humge-effect=fade] img').each(function() {
            $(this).parent().addClass('img')
        });
        $('[humge-effect=fade]>div:first-child').addClass('sliderFade');
        $('[humge-effect=fade]>div:first-child').addClass('slider');
        $('[humge-effect=fade]').each(function(ind) {
            $(this).find('.sliderFade').addClass('sliderFade' + (ind))
        });
        fixSrc = $('[humge-effect=fade]').find('.img img').attr('src');  
		
        $('[humge-effect=fade] .sliderFade').prepend('<img src="' + fixSrc + '" alt="fix" class="fix" />');
        $('[humge-effect=fade]').css('position', 'relative');
        $(document).ready(function() {
			var isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));
			if(isMobile){ 
				var startx;
				var dist = 0;
				var touchobj = null;
				var numbOfImg = 0;
				var cnt = 1;
				$('[humge-effect=fade] .img').on('touchstart', function(e){
					touchobj = e.originalEvent.changedTouches[0];
					startx = parseInt(touchobj.clientX);
					numbOfImg = $(this).parent().find('.img').length;
				});
				$('[humge-effect=fade] .img').on('touchend', function(e){ 
					touchobj = e.originalEvent.changedTouches[0];
					dist = parseInt(touchobj.clientX);
					var slideWidth = $(this).width();
					if(!$(this).parent().is(':animated')){
						if(startx > dist){
							$(this).parent().animate({ 
								"left": '-'+slideWidth
							}, 1000, function() {
								$(this).find('.img').first().appendTo($(this));
								$(this).css('left','0');
							});
						}else if(startx < dist){
							$(this).parent().find('.img').last().prependTo($(this).parent());
							$(this).parent().css('left','-'+slideWidth+'px'); 
							$(this).parent().animate({
								"left": 0
							}, 1000);
						}
					}
				});
			}
            $('[humge-effect=fade]').each(function(index) {
                if($(this).is('[humge-speed]')) {
                    if(Number($(this).attr('humge-speed')) > 1) {
                        slideSpeed = Number($(this).attr('humge-speed')) * 1000
                    } else {
                        slideSpeed = 1500
                    }
                } else {
                    slideSpeed = 5000
                }
                if($(this).is('[humge-loadbar=true]')) {
                    $(this).find('.sliderFade').append('<div class="loadbar"> </div>');
                    $('.loadbar').css({
                        width: '0%'
                    })
                }
                if($(this).is('[humge-control=dots]')) {
                    $(this).find('.sliderFade').append('<div class="dots"></div>');
                    for(var j = 0; j < $(this).find('.sliderFade .img').length; j++) {
                        $(this).find('.sliderFade .dots').append('<a href="#" onclick="scrollToFadeSlide(' + j + ', ' + index + ',' + slideSpeed + '); return false;"> </a>')
                    }
                } else if($(this).is('[humge-control=arrow]')) {
                    $(this).find('.sliderFade').append('<a href="#" class="c_prev" onclick="prevNextFade(' + index + ',' + slideSpeed + ', \'prev\'); return false;"></a><a href="#" class="c_next" onclick="prevNextFade(' + index + ',' + slideSpeed + ', \'prev\'); return false;"></a>')
                }
                initFadeSlider(index, slideSpeed)
            })
        })
    }
}

function initSlideSlider(cntS, speed) {
	var isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));
    
	if(isMobile){ 
		$('.slider' + cntS + ' .img').css('z-index', '200');
		var slideSize = ($('.slider' + cntS + ' .img').length*$('.slider' + cntS +' .img').width());
		var slideWidth = $('.slider' + cntS +' .img').width();
		var slideHeight = $('.slider' + cntS +' .img').height();
		$('.slider' + cntS).parent().css('width', '100%');
		$('.slider' + cntS).parent().css('overflow', 'hidden');
		$('.slider' + cntS +' .img').css('display', 'inline-block');
		$('.slider' + cntS + ' .fix').css('display', 'none');
		$('.slider' + cntS + ' .c_prev').css('display', 'none');
		$('.slider' + cntS + ' .c_next').css('display', 'none');
		$('.slider' + cntS + ' .img').each(function(){
			$(this).css('width', slideWidth);
			$(this).css('position', 'static');
			$(this).css('overflow', 'inherit');
		});

		$('.slider' + cntS).css('width', slideSize); 
		$('.slider' + cntS).css('height', slideHeight);
		
	}else{
		window['images' + cntS] = $('.slider' + cntS + ' [data-type="slider_img"]');
    	window['dots' + cntS] = $('.slider' + cntS + ' [data-type="slider-dot"]');
    	window['infos' + cntS] = $('.slider' + cntS + ' [class="info"]');
		$(window['images' + cntS]).css("left", "100%");
		$(window['images' + cntS][0]).css("left", "0px");
		$(window['dots' + cntS]).removeClass("active");
		$(window['dots' + cntS][0]).addClass("active");
		$(window['infos' + cntS]).hide();
		$(window['infos' + cntS][0]).show();
		window['slideCnt' + cntS] = window['images' + cntS].length;
		window['activeSlide' + cntS] = 0;
		window['sliderT' + cntS] = window.setTimeout("nextSlide(" + cntS + "," + speed + ")", speed);
		$('.slider' + cntS + '').find('.loadbar').animate({
			width: '100%'
		}, speed, function() {
			$(this).css({
				width: '0%'
			})
		})
	}
   
}

function hideSlide(idx, indexC) {
    $(window['images' + indexC][idx]).animate({
        "left": "-100%",
        "opacity": "0"
    }, 1000, function() {
        $(window['images' + indexC][idx]).css("left", "100%")
    });
    $(window['dots' + indexC][idx]).removeClass("active");
    $(window['infos' + indexC][idx]).fadeOut(1000)
}

function showSlide(idx, indexC) {
    $(window['images' + indexC][idx]).fadeTo(1, 750);
    $(window['images' + indexC][idx]).animate({
        "left": "0%"
    }, 750);
    $(window['dots' + indexC][idx]).addClass("active");
    $(window['infos' + indexC][idx]).fadeIn(1000)
}

function nextSlide(indexC, speed) {
    window.clearTimeout(window['sliderT' + indexC]);
    $('.slider' + indexC + '').find('.loadbar').stop();
    $('.slider' + indexC + '').find('.loadbar').width(0 + '%');
    hideSlide(window['activeSlide' + indexC], indexC);
    window['activeSlide' + indexC]++;
    if(window['activeSlide' + indexC] >= window['slideCnt' + indexC]) window['activeSlide' + indexC] = 0;
    showSlide(window['activeSlide' + indexC], indexC);
    window['sliderT' + indexC] = window.setTimeout("nextSlide(" + indexC + "," + speed + ")", speed);
    $('.slider' + indexC + '').find('.loadbar').animate({
        width: '100%'
    }, speed, function() {
        $(this).css({
            width: '0%'
        })
    })
}

function prevSlide(indexC, speed) {
    window.clearTimeout(window['sliderT' + indexC]);
    $('.slider' + indexC + '').find('.loadbar').stop();
    $('.slider' + indexC + '').find('.loadbar').width(0 + '%');
    hideSlide(window['activeSlide' + indexC], indexC);
    window['activeSlide' + indexC]--;
    if(window['activeSlide' + indexC] < 0) window['activeSlide' + indexC] = window['slideCnt' + indexC] - 1;
    showSlide(window['activeSlide' + indexC], indexC);
    window['sliderT' + indexC] = window.setTimeout("nextSlide(" + indexC + "," + speed + ")", speed);
    $('.slider' + indexC + '').find('.loadbar').animate({
        width: '100%'
    }, speed, function() {
        $(this).css({
            width: '0%'
        })
    })
}

function scrollToSlide(idx, indexC, speed) {
    window.clearTimeout(window['sliderT' + indexC]);
    $('.slider' + indexC + '').find('.loadbar').stop();
    $('.slider' + indexC + '').find('.loadbar').css({
        width: '0%'
    });
    hideSlide(window['activeSlide' + indexC], indexC);
    window['activeSlide' + indexC] = idx;
    if(window['activeSlide' + indexC] >= window['slideCnt' + indexC]) window['activeSlide' + indexC] = 0;
    showSlide(window['activeSlide' + indexC], indexC);
    window['sliderT' + indexC] = window.setTimeout("nextSlide(" + indexC + "," + speed + ")", speed);
    $('.slider' + indexC + '').find('.loadbar').animate({
        width: '100%'
    }, speed, function() {
        $(this).css({
            width: '0%'
        })
    })
}
$('[humge-effect=fade]').each(function(indexC) {
    window['fade_id' + indexC] = 0
});

function initFadeSlider(indexC, speed) { 
	var isMobile = ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/));  
    
	if(isMobile){ 
		$('.sliderFade' + indexC + ' .img').css('display', 'inline-block');
		var slideSize = ($('.sliderFade' + indexC + ' .img').length*$('.sliderFade' + indexC + ' .img').width());
		var slideWidth = $('.sliderFade' + indexC + ' .img').width();
		var slideHeight = $('.sliderFade' + indexC + ' .img').height();
		$('.sliderFade' + indexC + '').parent().css('width', '100%');
		$('.sliderFade' + indexC + '').parent().css('overflow', 'hidden');
		$('.sliderFade' + indexC + ' .fix').css('display', 'none');
		$('.sliderFade' + indexC + ' .c_prev').css('display', 'none'); 
		$('.sliderFade' + indexC + ' .c_next').css('display', 'none');
		$('.sliderFade' + indexC + ' .img').each(function(){
			$(this).css('width', slideWidth);
			$(this).css('position', 'static'); 
			$(this).css('overflow', 'inherit');
		});

		$('.sliderFade' + indexC + '').css('width', slideSize); 
		$('.sliderFade' + indexC + '').css('height', slideHeight);
		
	}else{
		window['image' + indexC] = $('.sliderFade' + indexC + ' .img');
		$('.sliderFade' + indexC + ' .img').each(function() {
			$(this).hide()
		});
		$(window['image' + indexC][0]).show();
		window['info' + indexC] = $('.sliderFade' + indexC + ' .info');
		window['info' + indexC].each(function(index, element) {
			$(this).hide()
		});
		$(window['info' + indexC][0]).show();
		window['dot' + indexC] = $('.sliderFade' + indexC + ' .dots a');
		$(window['dot' + indexC][0]).addClass('active');
		
		
		window['timeout' + indexC] = window.setTimeout("slideChange(" + indexC + "," + speed + ")", 0);
		$('.sliderFade' + indexC + '').find('.loadbar').animate({
			width: '100%'
		}, speed, function() {
			$(this).css({
				width: '0%'
			})
		})
	}
}

function slideChange(indexC, speed) {
    clearTimeout(window['timeout' + indexC]);
    $('.sliderFade' + indexC + '').find('.loadbar').stop();
    $('.sliderFade' + indexC + '').find('.loadbar').width(0 + '%');
    if((window['image' + indexC].length - 1) > window['fade_id' + indexC]) {
        $(window['image' + indexC][window['fade_id' + indexC]]).fadeOut();
        $(window['dot' + indexC][window['fade_id' + indexC]]).removeClass('active');
        $(window['info' + indexC][window['fade_id' + indexC]]).fadeOut();
        window['fade_id' + indexC]++;
        $(window['image' + indexC][window['fade_id' + indexC]]).fadeIn();
        $(window['dot' + indexC][window['fade_id' + indexC]]).addClass('active');
        $(window['info' + indexC][window['fade_id' + indexC]]).fadeIn(1000)
    } else {
        $(window['image' + indexC][window['fade_id' + indexC]]).fadeOut();
        $(window['dot' + indexC][window['fade_id' + indexC]]).removeClass('active');
        $(window['info' + indexC][window['fade_id' + indexC]]).fadeOut();
        window['fade_id' + indexC] = 0;
        $(window['image' + indexC][window['fade_id' + indexC]]).fadeIn();
        $(window['dot' + indexC][window['fade_id' + indexC]]).addClass('active');
        $(window['info' + indexC][window['fade_id' + indexC]]).fadeIn(1000)
    }
    window['timeout' + indexC] = window.setTimeout("slideChange(" + indexC + "," + speed + ")", speed);
    $('.sliderFade' + indexC + '').find('.loadbar').animate({
        width: '100%'
    }, speed, function() {
        $(this).css({
            width: '0%'
        })
    })
}

function prevNextFade(indexC, speed, direct) {
    clearTimeout(window['timeout' + indexC]);
    $('.sliderFade' + indexC + '').find('.loadbar').stop();
    $('.sliderFade' + indexC + '').find('.loadbar').css({
        width: '0%'
    });
    if(direct == 'prev') {
        $(window['image' + indexC][window['fade_id' + indexC]]).fadeOut();
        $(window['info' + indexC][window['fade_id' + indexC]]).fadeOut();
        if(window['fade_id' + indexC] > 0) {
            window['fade_id' + indexC]--
        } else {
            window['fade_id' + indexC] = (window['image' + indexC].length - 1)
        }
        $(window['image' + indexC][window['fade_id' + indexC]]).fadeIn();
        $(window['info' + indexC][window['fade_id' + indexC]]).fadeIn(1000)
    } else if(direct == 'next') {
        $(window['image' + indexC][window['fade_id' + indexC]]).fadeOut();
        $(window['info' + indexC][window['fade_id' + indexC]]).fadeOut();
        if(window['fade_id' + indexC] < (window['image' + indexC].length - 1)) {
            window['fade_id' + indexC]++
        } else {
            window['fade_id' + indexC] = 0
        }
        window['fade_id' + indexC]++;
        $(window['image' + indexC][window['fade_id' + indexC]]).fadeIn();
        $(window['info' + indexC][window['fade_id' + indexC]]).fadeIn(1000)
    }
    window['timeout' + indexC] = window.setTimeout("slideChange(" + indexC + "," + speed + ")", speed);
    $('.sliderFade' + indexC + '').find('.loadbar').animate({
        width: '100%'
    }, speed, function() {
        $(this).css({
            width: '0%'
        })
    })
}

function scrollToFadeSlide(idxs, indexC, speed) {
    clearTimeout(window['timeout' + indexC]);
    $('.sliderFade' + indexC + '').find('.loadbar').stop();
    $('.sliderFade' + indexC + '').find('.loadbar').css({
        width: '0%'
    });
    $(window['image' + indexC][window['fade_id' + indexC]]).fadeOut();
    $(window['dot' + indexC][window['fade_id' + indexC]]).removeClass('active');
    $(window['info' + indexC][window['fade_id' + indexC]]).fadeOut();
    window['fade_id' + indexC] = idxs;
    $(window['image' + indexC][window['fade_id' + indexC]]).fadeIn();
    $(window['dot' + indexC][window['fade_id' + indexC]]).addClass('active');
    $(window['info' + indexC][window['fade_id' + indexC]]).fadeIn(1000);
    window['timeout' + indexC] = window.setTimeout("slideChange(" + indexC + "," + speed + ")", speed);
    $('.sliderFade' + indexC + '').find('.loadbar').animate({
        width: '100%'
    }, speed, function() {
        $(this).css({
            width: '0%'
        })
    })
}

function initFilmGallery() {
    "use strict";
    var filmFrames;
    var filmStep;
    var filmWidth;
    var filmImgWidth;
	var filmImgHeight;
    var filmSize;
    if($('[humge-type=film_gallery]')) {
        $('[humge-type=film_gallery]').each(function() {
            $(this).addClass('filmFilm')
        });
        $('.filmFilm').each(function(index) {
            $('.filmFilm>div').addClass('film');
			if(!$(this).find('.film').parent().is('.film_gallery')){
				$(this).find('.film').wrap('<div class="film_gallery"></div>');
			}
            
            $(this).find('.film_gallery').addClass('film_gallery' + index);
            $(this).find('img').parent().parent().addClass('img')
        });
        $(document).ready(function() {
            $('.filmFilm').each(function(index) {
                filmFrames = 0;
                filmStep = 0;
                filmWidth = 0;
                filmImgWidth = 0;
				filmImgHeight = 0;
                filmSize = 0;
                $(this).find('img').each(function() {
                    filmSize++
                });
                if($(this).is('[humge-frames]')) {
                    filmFrames = Number($(this).attr('humge-frames'))
                } else {
                    filmFrames = 4
                }
                filmImgWidth = $('.film_gallery' + index + '').width() / filmFrames;
                filmWidth = (filmImgWidth + 5) * filmSize ;
				$('.film_gallery' + index + '').find('.img').css('width', filmImgWidth + 'px');
				
				//filmImgHeight = $('.film_gallery' + index + ' .film').find('.img').height();
				//$('.film_gallery' + index + '').css('height', filmImgHeight + 'px');
                
                $('.film_gallery' + index + '').find('.film').css('width', filmWidth + 'px');
                if($(this).is('[humge-step]')) {
                    filmStep = Number($(this).attr('humge-step'))
                } else {
                    filmStep = 2
                }
                if($(this).is('[humge-control]')) {
                    if($(this).is('[humge-control=true]')) {
                        $(this).find('.film_gallery').append('<a href="#" class="c_prev" onclick="moveSlide(' + index + ', \'prev\', ' + filmStep + '); return false;"></a><a href="#" class="c_next" onclick="moveSlide(' + index + ', \'next\', ' + filmStep + '); return false;"></a>')
                    } else {
                        infinityFilm(index, filmImgWidth, filmStep)
                    }
                } else {
                    $(this).attr('humge-control', 'false');
                    infinityFilm(index, filmImgWidth, filmStep)
                }
            })
        })
    }
}
$(document).ready(function() {
    $('[humge-type=film_gallery]').each(function(indexF) {
        window['leftFilm' + indexF] = 0
    })
});

function moveSlide(indexF, direct, step) {
    window['imageWidth' + indexF] = $('.film_gallery' + indexF + ' .film .img').width();
    window['size' + indexF] = ($('.film_gallery' + indexF + ' .film .img').length / step) - 1;
    window['frames' + indexF] = window['imageWidth' + indexF] * step;
    if(direct === 'next') {
        if(window['leftFilm' + indexF] > (-window['frames' + indexF] * window['size' + indexF])) {
            window['leftFilm' + indexF] -= window['frames' + indexF];
            $('.film_gallery' + indexF + ' .film').animate({
                'left': (Number(window['leftFilm' + indexF]) - 5) + 'px'
            }, 1000) 
        }
    } else {
        if(window['leftFilm' + indexF] < 0) {
            window['leftFilm' + indexF] += window['frames' + indexF];
            $('.film_gallery' + indexF + ' .film').animate({
                'left': window['leftFilm' + indexF] + 'px'
            }, 1000)
        }
    }
}

function infinityFilm(indexF, imgW, step) {
    window['timer' + indexF] = 0;
    window['w' + indexF] = '-' + (imgW * step) + 'px';

    function slider() {
        $('.film_gallery' + indexF + ' .film').animate({
            marginLeft: window['w' + indexF]
        }, 2000, function() {
            $('.film_gallery' + indexF + ' .film .img').slice(0, step).appendTo($(this));
            $(this).css({
                marginLeft: 0
            })
        })
    }
    window['timer' + indexF] = setInterval(slider, 4000);
    $('.film_gallery' + indexF + ' .film .img').hover(function() {
        clearInterval(window['timer' + indexF])
    }, function() {
        window['timer' + indexF] = setInterval(slider, 4000)
    })
}




$(document).ready(function() {

    initImgElem();
    initFilmGallery();
   
})