(function() {
	function AlbumCtrl() {
		this.albumPicasso = angular.copy(albumPicasso);
	}

	angular
		.module('blocJams')
		.controller('AlbumCtrl', AlbumCtrl);
})();