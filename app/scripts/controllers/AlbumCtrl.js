(function() {
	function AlbumCtrl(Fixtures) {
		this.albumPicasso = Fixtures.getAlbum();
	}

	angular
		.module('blocJams')
		.controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();