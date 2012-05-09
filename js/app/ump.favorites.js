window.Music.favorites = {
	favorites: $.jStorage.get("favorites") || [],
	add: function(item) {
		item.index = this.favorites.length;
		this.favorites.push(item);
		this.save();
	},
	save: function() {
		$.jStorage.set("favorites", this.favorites);
	}
};