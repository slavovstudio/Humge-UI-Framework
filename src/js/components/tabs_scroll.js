
$(document).ready(function() { 
	
	$('ul[humge-type=tabs]').addClass('tabs');
	
	$('[humge-tab]').addClass('tab-content');
	$('ul[humge-type=tabs] li').each(function(){
		if($(this).is('.current')){
			$('[humge-tab='+$(this).attr('tab')+']').addClass('current');
		}
	});
	
	$('ul.tabs li').click(function(){ 
		$(this).parent().find('li').removeClass('current');
		$(this).parent().nextAll('.tab-content').removeClass('current');

		$(this).addClass('current');
		$('[humge-tab='+$(this).attr('tab')+']').addClass('current');
	});
	
	$('[humge-scroll]').click(function(){ 
		var stop = $('[humge-scroll-to='+$(this).attr('humge-scroll')+']').offset().top;
		var delay = 1000;
		if($(this).is('[humge-speed]')){
			delay = $(this).attr('humge-speed') * 1000;
		}
		
		$('body,html').animate({scrollTop: stop}, delay);
		return false;
	});
	
})