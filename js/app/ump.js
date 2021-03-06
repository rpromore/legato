Array.prototype.shuffle = function(){
	for( var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x );
	return this;
}
// following 3 functions obtained from http://www.sitepoint.com/forums/showthread.php?318819-Unique-ID-in-Javascript
function getRandomNumber(range) {
	return Math.floor(Math.random() * range);
}
function getRandomChar() {
	var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
	return chars.substr(getRandomNumber(62), 1);
}
function randomID(size) {
	var str = "";
	for(var i = 0; i < size; i++) {
		str += getRandomChar();
	}
	return str;
}

var ump = {
	queued: [],
	original_queued: [],
	position: -1,
	handle: null,
	options: {
		shuffle: true,
		repeat: 0 // 0 - none, 1 - song, 2 - playlist
	},
	repeat: function(n){
		if( n < 0 || n > 2 )
			return false;
		else
			this.options.repeat = n;
	},
	shuffle: function(on){
		if( typeof on == "undefined" )
			on = false;
			
		if( this.original_queued.length == 0 )
			this.original_queued = this.queued;
		
		if( !on ) {
			this.queued = this.original_queued;
			x = 0;
			this.options.shuffle = false;
		}
		else {
			this.queued = this.queued.shuffle();
			// switch first track and selected track so shuffling starts at beginning of playlist
			var temp = this.queued[0];
			this.queued[0] = this.queued[this.position];
			this.queued[this.position] = temp;
			x = 0;
			this.options.shuffle = true;
		}
		for( var i in ump.queued ) {
			ump.queued[i].index = x++;
		}
	},
	services: {},
	handlers: {
		handle: null,
		buffer_timer: null,
		play_timer: null,
		"ump": {
			prev: function(){
				if( ump.options.repeat == 2 && ump.position-1 >= 0 )
					return ump.queued[ump.position-1];
				else if( ump.options.repeat == 2 && ump.position-1 < 0 )
					return ump.queued[ump.queued.length-1];
				else if( ump.options.repeat == 0 && ump.position-1 >= 0 )
					return ump.queued[ump.position-1];
				else if( ump.options.repeat == 0 && ump.position-1 < ump.queued.length )
					return ump.queued[-1];
				else
					return ump.queued[ump.position];
			},
			next: function(){
				if( ump.options.repeat == 2 && ump.position+1 < ump.queued.length )
					return ump.queued[ump.position+1];
				else if( ump.options.repeat == 2 && ump.position+1 >= ump.queued.length )
					return ump.queued[0];
				else if( ump.options.repeat == 0 && ump.position+1 < ump.queued.length )
					return ump.queued[ump.position+1];
				else if( ump.options.repeat == 0 && ump.position+1 >= ump.queued.length )
					return ump.queued[ump.queued.length];
				else
					return ump.queued[ump.position];
			}
		}
	}
};


var UMP = function(data, callback) {
	var defs = [];
	$.each(data, function(s, u){
		if( typeof ump.services[s] == "undefined" )
			$.error("UMP: Service doesn't exist.");
		else {
			$.each(u, function(k, v){
				defs.push(
					$.getJSON(v, function(data){
						ump.services[s].parse(data);
					})
				);
			});
		}
	});
	$.when.apply(null, defs).then(function(data){
		ump.handlers.handle = $("#player");
		callback.call(this, ump.queued);
	});
	return ump;
};
