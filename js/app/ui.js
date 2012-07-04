$("#play").click(function(){
	if( $(this).hasClass("active") ) {
		u.handle.pause();
	}
	else {
		u.handle.play();
	}
});
$("#prev").click(function(){
	var p = u.handle.prev();
});
$("#next").click(function(){
	var n = u.handle.next();
});
$("#nav-time").click(function(e){
	u.handle.seekTo(e.offsetX/$(this).width()*u.handle.getDuration());
});

$("#shuffle").click(function(){
	if( $(this).hasClass("active") ) {
		u.shuffle(false);
		$(this).find("i").removeClass("icon-blue");
	}
	else {
		u.shuffle(true);
		$(this).find("i").addClass("icon-blue");
	}
});
$("#repeatone").click(function(){
	if( $(this).hasClass("active") ) {
		u.repeat(0);
		$(this).find("i").removeClass("icon-blue");
	}
	else {
		u.repeat(1);
		$(this).find("i").addClass("icon-blue");
	}
});

// VOLUME
last_volume = 100;

$("#volume-high, #volume-low").click(function(){
	last_volume = $("#volume .progress").slider("value");
	$("#volume .progress").slider("value", 0);
	log($("#volume .progress").slider("value"));
});
$("#volume-mute").click(function(){
	$("#volume .progress").slider("value", last_volume);
});

$("#volume .progress").slider({
	min: 0,
	max: 100,
	value: 100,
	slide: function(e, ui){
		var v = ui.value;
		u.handlers.handle.setVolume(v);
		if( v == 0 ) {
			$("#volume-mute").show();
			$("#volume-low").hide();
			$("#volume-high").hide();
		}
		else if( v > 0 && v <= 40 ) {
			$("#volume-mute").hide();
			$("#volume-low").show();
			$("#volume-high").hide();
		}
		else {
			$("#volume-mute").hide();
			$("#volume-low").hide();
			$("#volume-high").show();
		}
		$("#volume .bar").width(v);
		if( v != 0 )
			last_volume = v;
	},
	change: function(e, ui){
		var v = ui.value;
		u.handlers.handle.setVolume(v);
		if( v == 0 ) {
			$("#volume-mute").show();
			$("#volume-low").hide();
			$("#volume-high").hide();
		}
		else if( v > 0 && v <= 40 ) {
			$("#volume-mute").hide();
			$("#volume-low").show();
			$("#volume-high").hide();
		}
		else {
			$("#volume-mute").hide();
			$("#volume-low").hide();
			$("#volume-high").show();
		}
		$("#volume .bar").width(v);
		if( v != 0 )
			last_volume = v;
	}
});