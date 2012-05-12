$("#play").click(function(){
	u.handle.play();
});
$("#pause").click(function(){
	u.handle.pause();
});
$("#prev").click(function(){
	var p = u.handle.prev();
	console.log(p);
	$("#seek #buffered").width(0);
	$("#seek #played").width(0);
});
$("#next").click(function(){
	var n = u.handle.next();
	$("#seek #buffered").width(0);
	$("#seek #played").width(0);
});
$("#seek").click(function(e){
	u.handle.seekTo(e.offsetX/$(this).width()*u.handle.getDuration());
});

$("#shuffle").click(function(){
	if( $(this).hasClass("active") ) {
		$(this).removeClass("active");
		u.shuffle(false);
	}
	else {
		$(this).addClass("active");
		u.shuffle(true);
	}
});
$("#repeat").click(function(){
	if( $(this).hasClass("active") ) {
		$(this).removeClass("active");
		u.repeat(0);
	}
	else {
		$(this).addClass("active");
		$("#repeatone").removeClass("active");
		u.repeat(2);
	}
});
$("#repeatone").click(function(){
	if( $(this).hasClass("active") ) {
		$(this).removeClass("active");
		u.repeat(0);
	}
	else {
		$(this).addClass("active");
		$("#repeat").removeClass("active");
		u.repeat(1);
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
		// u.handlers.handle.setVolume(v);
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
		// u.handlers.handle.setVolume(v);
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