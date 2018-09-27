if(window.location.href.indexOf("#") > -1) {
		$.ajax({
			type: "GET",
			url: window.location.href.split('#').pop(),
			dataType: "html",
			success: function(data) {
				$('[humge-load]').html(data);  
			}
		});
	}