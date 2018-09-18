function initFormElement() {
    "use strict";
	if(!$('input[type=text],input[type=password],input[type=date], textarea').parent().is('.control')){
		$('input[type=text],input[type=password],input[type=date], textarea').wrap('<div class="control"></div>');
	}
    if(!$('input[type=text],input[type=password],input[type=date], textarea').next().is('span')){
		$('input[type=text],input[type=password],input[type=date], textarea').after('<span></span>');
	}
    if(!$('select').parent().is('.control')){
		$('select').wrap('<div class="control select"></div>');
	}
	if(!$('select').next().is('span')){
		$('select').after('<span></span>');
		$('select').next().addClass('select_span');
	}
    $('input[humge-type=date]').parent().addClass('date');
    $('input[humge-type=password]').parent().addClass('password');
    $('input[humge-type=user]').parent().addClass('user');
    $('input[humge-type=email]').parent().addClass('email');
    var swithCNT = 0;
    $('input[type=checkbox]').each(function(index) {
        if($(this).is('[humge-type=switch]')) {
            $(this).attr('id', 'switch' + swithCNT);
			if(!$(this).parent().is('.switch')){
				$(this).wrap('<div class="switch"></div>');
            	$(this).after('<label for="switch' + swithCNT + '">text</label>');
			}
            swithCNT++
        } else {
            window['checkboxText' + index];
            window['checkbox' + index];
            window['checkbox' + index] = $(this);
            window['checkboxText' + index] = $(this).parent().html();
            $(this).parent().addClass('checkbox');
            $(this).parent().addClass('checkbox' + index);
            $('.checkbox' + index).empty();
            $('.checkbox' + index).append(window['checkbox' + index]);
            $('.checkbox' + index).append('<span>' + window['checkboxText' + index] + '</span>');
            $('.checkbox' + index).prepend('<span class="marker"></span>');
			
            if($(this).is(':checked')) {
                $(this).parent().addClass('checked')
            } else {
                $(this).parent().removeClass('checked')
            }
			$(this).remove();
        }
    });
    $('.checkbox').on('click', function() {
        if($(this).find('[type=checkbox]').is(':checked')) {
            $(this).addClass('checked')
        } else {
            $(this).removeClass('checked')
        }
    });
    $('input[type=radio]').each(function() {
        $(this).parent().addClass('n' + $(this).attr('name')).addClass('radio');
        if($(this).is(':checked')) {
            $(this).parent().addClass('checked')
        } else {
            $(this).parent().removeClass('checked')
        }
    });
    $('input[type=radio]').parent().on('click', function() {
        $('.n' + $(this).find('input[type=radio]').attr('name')).removeClass('checked');
		$('.n' + $(this).find('input[type=radio]').attr('name')).each(function(){
			$(this).find('input[type=radio]').removeAttr('checked');
		});
        $(this).addClass('checked');
		$(this).find('input:radio').attr('checked','checked'); 
		$(this).find('input[type=radio]').css('color','red');
    });
    $('input[type=radio]').after('<span class="marker"></span>')
}

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if(this.name.substr(-2) === "[]") {
            this.name = this.name.substr(0, this.name.length - 2);
            o[this.name] = []
        }
        if(o[this.name]) {
            if(!o[this.name].push) {
                o[this.name] = [o[this.name]]
            }
            o[this.name].push(this.value || '')
        } else {
            o[this.name] = this.value || ''
        }
    });
    return o
};
var reqCNT = 0;
var emptFields = 1;

function testInput(index) {
    emptFields = 0;
    $('[data-req=' + index + '] [humge-required=true]').each(function() {
        if(!$.trim($(this).val())) {
            emptFields++
        } else {
            if($(this).is('[humge-type=email]')) {
                validateThisMail($(this))
            }
        }
        if($(this).is('[type=checkbox]')) {
            if(!$(this).is(':checked')) {
				$(this).parent.prev().css('border','2px solid #DC1F26');
				
                emptFields++
            }else{
				$(this).parent.prev().css('border','solid 1px #ACACAC');
			}
        }
    })
}

function testRequiredInputs(index) {
    emptFields = 0;
    $('[data-req=' + index + '] [humge-required=true]').each(function() {
        if(!$.trim($(this).val())) {
            $(this).css({
                'border-bottom': '2px solid #DC1F26'
            });
            emptFields++
        } else {
            $(this).css({
                'border-bottom': '2px solid #56A800'
            })
        }
        if($(this).is('[humge-type=email]')) {
            validateThisMail($(this))
        }
        if($(this).is('[type=checkbox]')) {
            if(!$(this).is(':checked')) {
                $(this).parent().prev().css({
                    'border': '2px solid #DC1F26'
                });
                emptFields++;
				
            } else {
                $(this).parent().prev().css({
                    'border': '1px solid #ACACAC'
                })
            }
        }
    })
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

function validateThisMail(obj) {
    var email = obj.val();
    if(validateEmail(email)) {
        obj.css({
            'color': '#000'
        });
        obj.parent().append('<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDQwNi44MzQgNDA2LjgzNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDA2LjgzNCA0MDYuODM0OyI+DQo8cG9seWdvbiBwb2ludHM9IjM4NS42MjEsNjIuNTA3IDE0Ni4yMjUsMzAxLjkwMSAyMS4yMTMsMTc2Ljg5MSAwLDE5OC4xMDQgMTQ2LjIyNSwzNDQuMzI3IDQwNi44MzQsODMuNzIgIi8+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" class="checkright" />');
        $('.checkright').animate({
            width: '20px'
        }, 1000)
    } else {
        obj.css({
            'color': '#DC1F26'
        });
        obj.css({
            'border-bottom': '2px solid #DC1F26'
        });
        $('.checkright:after').animate({
            width: '0px'
        }, 1000);
        $('.checkright').remove();
        emptFields++
    }
}


$(document).ready(function() {
    initFormElement();
	testInput();
	emptFields = 1;
    $('form button, form a, form input[type=submit], form input[type=button]').each(function() {
        $(this).closest('form').attr('data-req', reqCNT);
        reqCNT++
    });
    $('form button, form a, form input[type=submit], form input[type=button]').bind('click', function() {
        testRequiredInputs($(this).closest('form').attr('data-req'))
    });
    $('[humge-required=true]').on('change', function() {
        if($(this).val() !== '') {
            $(this).css({
                'border-bottom': '2px solid #56A800'
            })
        } else {
            $(this).css({
                'border-bottom': '1px solid rgba(191,191,191,1.00)'
            })
        }
        if($(this).is('[type=checkbox]')) {
            testInput($(this).closest('form').attr('data-req'))
        }
        testInput($(this).closest('form').attr('data-req'))
    });
})