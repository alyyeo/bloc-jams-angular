(function() {
	function SongPlayer(Fixtures) {
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
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'], 
				preload: true
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
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};

		return SongPlayer;
	}

	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
})();