ump.handlers["youtube"] = {
	play: function(callback){
			if( ump.position != this.index /* || (ump.position == this.index && ump.options.repeat == 1) */ ) {
				clearInterval(ump.handlers.buffer_timer);
				clearInterval(ump.handlers.play_timer);
				
				var t = this;
				ump.handle = this;
				
				swfobject.embedSWF("http://www.youtube.com/v/"+t.options["data-url"]+"?fs=1&hd=1&modestbranding=1&showinfo=0&disablekb=1&controls=0&enablejsapi=1&playerapiid=ytplayer&version=3&wmode=transparent", "player", "425", "256", "8", null, null, { allowscriptaccess: "always", wmode: "transparent" }, { id: "player", name: "theplayer", wmode: "transparent" });
				window.onYouTubePlayerReady = function(p){
					ump.handlers.handle = document.getElementById("player");
					// buffer
					ump.handlers.buffer_timer = setInterval(function(){
						t.buffered = ump.handlers.handle.getVideoBytesLoaded() / ump.handlers.handle.getVideoBytesTotal();
						UMP.buffering(t.buffered);
						if( t.buffered >= ump.handlers.handle.getVideoBytesTotal() )
							clearInterval(ump.handlers.buffer_timer);
					}, 1000);
					ump.handlers.play_timer = setInterval(function(){
						t.played = ump.handlers.handle.getCurrentTime() / ump.handlers.handle.getDuration();
						UMP.playing(t.played, ump.handlers.handle.getCurrentTime());
						if( t.played >= 1 ) {
							clearInterval(ump.handlers.play_timer);
							t.next();
						}
					}, 1000);
					ump.handlers.handle.playVideo();
					UMP.played(t);
					if( callback != null && typeof callback == "function" )
						callback.call(this);
				};
				ump.position = t.index;
			}
			else if( ump.position == this.index && ump.options.repeat == 1 ) {
				ump.handlers.handle.seekTo(0);
				ump.handlers.handle.playVideo();
			}
			else {
				ump.handlers.handle.playVideo();
				UMP.played(this);
			}
	},
	pause: function(){
		ump.handlers.handle.pauseVideo();
		UMP.paused();
	},
	prev: function(){
		if( this.getTimeElapsed() < 5 ) {
			var p = ump.handlers.ump.prev();
			p.play();
		}
		else {
			p = this;
			this.seekTo(0);
		}
		return p;
	},
	next: function(){
		var p = ump.handlers.ump.next();
		p.play();
		return p;
	},
	setVolume: function(x){
		ump.handlers.handle.setVolume(x);
	},
	getVolume: function(){
		return ump.handlers.handle.getVolume();
	},
	seekTo: function(x){
		ump.handlers.handle.seekTo(x);
	},
	getDuration: function(){
		return ump.handlers.handle.getDuration();
	},
	getTimeElapsed: function(){
		return ump.handlers.handle.getCurrentTime();
	}
}
