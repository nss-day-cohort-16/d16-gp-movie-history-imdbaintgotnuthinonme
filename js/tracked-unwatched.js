'use strict';

function getSongs(user) {
	return new Promise(function(resolve, reject){
		$.ajax({
			url: `https://imdb-group.firebaseio.com/movies.json?orderBy="uid"&equalTo="${user}"&watched="false"`
		}).done(function(movieData){
			resolve(movieData);
		});
	});
}