"use strict";

let cardTemplate = require('../templates/onload.hbs');
let dbInteractions = require('./db-interactions.js');
let signIn = require("./user");
let movieTemplate = require('../templates/movieTemplate.hbs');


function createCards (data) {
    signIn.getUser();
    console.log(signIn.getUser());
    console.log("create cards", data);
    let cardInfo = cardTemplate(data);
    $("#mainView").html(cardInfo);
    $("#untrackedView").html(cardInfo);
    $(".delete-btn").hide();
    $(".add-btn").click(function(e){
        let currentUser = signIn.getUser();
        console.log("clicked add");
        if(currentUser === null){
            console.log("You must be logged in to save a movie.");
        } else if (currentUser !== null){
            let movieId = this.id;
            console.log(this.id);
            dbInteractions.saveMovies(movieId).then(function(data){
                console.log("saved movie data", data);
                data.watched = false;
                data.uid = currentUser;
                data.rating = null;
                console.log("post new prop", data, currentUser);
                dbInteractions.storeMovies(data, currentUser);
            });

        }
    });
}

function watchedTemplate (data){
    let watchedInfo = movieTemplate(data);
    $("#watchedView").append(watchedInfo);
}

module.exports = {createCards, watchedTemplate};
