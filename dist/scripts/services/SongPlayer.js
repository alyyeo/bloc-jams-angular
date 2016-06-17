(function() {
	function SongPlayer($rootScope, Fixtures) {
		var SongPlayer = {};

		/**
		@desc album Picasso
		@type {Object}
		*/
		var currentAlbum = Fixtures.getAlbum();

		/**
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;

		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function(song) {
			if (currentBuzzObject) {
				stopSong(SongPlayer.currentSong);
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'], 
				preload: true
			});

			currentBuzzObject.bind('timeupdate', function() {
				$rootScope.$apply(function() {
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
			});

			SongPlayer.currentSong = song;	
		};

		/**
		* @function playSong
		* @desc Plays current buzz object and sets playing to true
		* @param {Object} song
		*/
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		};

		/**
		* @function stopStong
		* @desc Stop playing song
		* @param {Object} song
		*/
		var stopSong = function(song) {
			currentBuzzObject.stop();
			song.playing = null;
		};

		/**
		* @function getSongIndex
		* @desc Returns index of song
		* @param {Object} song
		* returns {Number}
		*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};

		/**
		* @desc currently playing song
		* @type {Object}
		*/
		SongPlayer.currentSong = null;
		/**
		* @desc Current playback time (in seconds) of currently playing song
		* @type {Number}
		*/
		SongPlayer.currentTime = null;

		/**
		* @function play
		* @desc Checks if currentSong is same as song just clicked on and plays song
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song){
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					currentBuzzObject.play();
				}
			}
		};

		/**
		* @function pause
		* @desc Pauses song
		* @param {Object} song
		*/
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};

		/**
		* @function previous
		* @desc Plays the previous song
		*/
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;

			if (currentSongIndex < 0) {
				stopSong(SongPlayer.currentSong);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		/**
		* @function next
		* @desc Plays the next song
		*/
		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;

			if (currentSongIndex > currentAlbum.songs.size) {
				stopSong(SongPlayer.currentSong);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		/**
		* @function setCurrentTime
		* @desc Set current time (in seconds) of currently playing song
		* @param {Number} time
		*/
		SongPlayer.setCurrentTime = function(time) {
			if (currentBuzzObject) {
				currentBuzzObject.setTime(time);
			}
		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();