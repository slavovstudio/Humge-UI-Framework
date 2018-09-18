
function initAcordElem() {
	var percent = 0.25;
    $('dl[humge-type=accordion]').each(function(index) {
        $(this).addClass('accord' + index);
		
        $(this).children('dd').each(function() {
			var conentAcc = $(this).html();
			$(this).html('');
			$(this).append('<div class="accordText"></div>');
			$(this).find('.accordText').html(conentAcc);
            $(this).css({
                height: "0px"
            })
        });
        if(!$(this).is('[humge-autoclose=true]') && !$(this).is('[humge-autoclose=false]')) {
            $(this).attr('humge-autoclose', 'true')
        }
    });
    $('dl[humge-type=accordion]').each(function(index, element) {
        if($('.accord' + index).is('[humge-autoclose=true]')) {
            if($('.accord' + index).is('[humge-open=true]')) {
                $('.accord' + index).find('dt:first-of-type').addClass('active');
                $('.accord' + index).find('dd:first-of-type').addClass('open');
                $('.accord' + index).find('dd:first-of-type').css('height', '100%')
            }
            $('.accord' + index).children('dt').click(function() {
                $('.accord' + index + ' dt').each(function() {
                    $(this).removeClass('active')
                });
                $('.accord' + index).find('.open').animate({
                    height: '0px'
                }, 700);
                $('.accord' + index).find('.open').removeClass('open');
                $(this).addClass('active');
                $(this).next().addClass('open');
				
				add_width = ($(this).next().find('.accordText').innerHeight())+'px';
                $(this).next().animate({
                    height: add_width
                }, 700)
            })
        } else if($('.accord' + index).is('[humge-autoclose=false]')) {
            if($('.accord' + index).is('[humge-open=true]')) {
                $('.accord' + index).find('dt:first-of-type').addClass('active');
                $('.accord' + index).find('dd:first-of-type').addClass('open');
                $('.accord' + index).find('dd:first-of-type').css('height', '100%')
            }
            $('.accord' + index).children('dt').click(function() {
                $(this).toggleClass('active');
                if($(this).is('.active')) {
					add_width = ($(this).next().find('.accordText').innerHeight())+'px';
                    $(this).next().animate({
                        height: add_width
                    }, 700)
                } else {
                    $(this).next().animate({
                        height: '0px'
                    }, 700)
                }
            })
        }
    })
}


$(document).ready(function() {
    initAcordElem();
	
})