var toTime = function(x){
	var m = Math.floor(x/60);
	var s = Math.ceil(x%60);
	if( m >= 60 )
		m = 0;
	if( s >= 60 )
		s = 0;
	if( s < 10 )
		s = "0"+s;
	return m+":"+s;
}

var urls = {
	"reddit": ["http://reddit.com/r/listentothis.json?jsonp=?&callback=?&limit=10"]
};

var u = UMP(urls, function(data){
	$.each(data, function(k, v) {
		v.options.class = "item "+v.options["data-service"];
		v.options.html = '<a href="#">' + v.options["data-title"] + '</a>';
		$item = $("<td>", v.options)
			.click(function(){
				$(this).parents("tr").addClass("loading");
				v.play();
				$("#trackinfo").html('<b>Title: </b>'+v.options["data-title"]+'<br /><b>Artist: </b>'+v.options["data-artist"]+'<br /><b>Song: </b>'+v.options["data-song"]+'<br /><b>Genres: </b>'+v.options["data-genres"]);
				return false;
			});
		$tr = $("<tr />");/*.append('<td class="options"><div class="move"></div><input type="checkbox" /><i class="favorite">b</i><i class="add">=</i></td>').append($item)*/
		$td = $("<td />", { class: "options" });
		$checkbox = $("<input />", { type: "checkbox" } ).click(function(){ console.log("checkbox"); }).appendTo($td);
		$favorite = $("<i />", { class: "icon-heart" }).click(function(){
			$(this).addClass("active");
			ump.favorites.add(v);
		}).appendTo($td);
		$add = $("<i />", { class: "icon-plus" }).click(function(){ console.log("add for "+v.options["data-title"]); }).appendTo($td);
		$tr.append($td).append($item);

		if( k == 0 ) {
			v.play(function(){ v.pause(); });
		}
		$("#music-list").append($tr);
	});
});


UMP.buffering = function(x){
	$("#buffered .bar").width($("#buffered").width()*x);
};
UMP.playing = function(width, time){
	$("#timeplayed").html(toTime(time));
	$("#played > .bar").width($("#played").width()*width);
};

UMP.played = function(x){
	$("#totaltime").html(toTime(x.getDuration()));
	// x.setVolume(last_volume);
	// $("#volumeslide").slider("value", last_volume);
	
	$("#played").mousemove(
		function(e){
			$("#timehover").html(toTime((e.offsetX/$(this).width())*x.getDuration())).css("left", e.offsetX+25).show();
		}
	);
	$("#played").mouseleave(function(){
		$("#timehover").hide();
	});
	
	$("[data-uid="+x.options["data-uid"]+"]").parents("tr").addClass("active").siblings().removeClass("active");		
	
	$("#pause").show();
	$("#play").hide();
};

UMP.paused = function(){
	$("#play").show();
	$("#pause").hide();
};
