ump.services["reddit"] = {
	active: true,
	name: "Reddit",
	parse: function(data) {
		$.each(data.data.children, function(k, v){
			if( (v["data"]["domain"] == "youtube.com" || v["data"]["domain"] == "youtu.be") && v["data"]["is_self"] == false ) {
				var match = v["data"]["url"].match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i);
				if( match ) {
					var video_id = match[1];
					var add = {
						options: {
							"data-provider": "youtube.com",
							"data-service": "reddit",
							"data-url": video_id,
							"data-title": v["data"]["title"],
							"data-uid": randomID(11),
							"data-thumb": v["data"]["media"] ? v["data"]["media"]["oembed"]["thumbnail_url"] : ""
						},
						index: ump.queued.length
					};
					// artist & song & genre info
					var title = v.data.title;
					title = title.match(/([\w\s\,\.\'\"]+) - ([\w\s\,\'\"]+) ([\[\(]([\w\s\/\,\-\'\"']+)[\)\]])*([\w\s]+)*/);
					if( title != null ) {
						add.options["data-artist"] = title[1];
						add.options["data-song"] = title[2];
						add.options["data-genres"] = title[4];
					}
					
					// comments
					var perm = v["data"]["permalink"];
					add.comments = [];
					var url = "http://reddit.com"+perm+".json?jsonp=?&callback=?";
					$.getJSON(url, function(data){
						var results = data[1];
						$.each(results["data"]["children"], function(l, w){
							add.comments.push(w["data"]["body_html"]);
						});
					});
						
					$.extend(add, ump.handlers["youtube"]);
					ump.queued.push(add);
				}
			}
		});
	}
}
