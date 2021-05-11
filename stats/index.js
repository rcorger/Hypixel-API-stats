const fetch = require('node-fetch'); // you have to do 'npm i node-fetch'
const prompt = require('prompt-sync')(); //npm i prompt-sync
const config = require('./config.json'); //config file
const apiToken = config.api;

const username = prompt("Username: "); //input

if (username.length < 3) {
    console.log("Username has to be atleast 3 characters long.");
    return;
}

var lines = "----------------------------------------";
var lines2 = "----------------Bedwars-----------------";
var lines3 = "----------------Skywars-----------------";

fetch(`https://api.hypixel.net/player?key=${apiToken}&name=${username}`)
    .then(response => response.json())
    .then(data => { //
        let stat2 = data["player"]["lastLogin"] //works same as python in this
        let stat1 = data["player"]["lastLogout"]
        let pastUsernames = data["player"]["knownAliases"]
        var bedwarsCoins = data["player"]["stats"]["Bedwars"]["coins"]
        var skywarsCoins = data["player"]["stats"]["SkyWars"]["coins"]
        var PName = data["player"]["displayname"]
        var bedwarsKills = data["player"]["stats"]["Bedwars"]["kills_bedwars"]
        var finalBedwrsKills = data["player"]["stats"]["Bedwars"]["final_kills_bedwars"]
        var hypixelRank = data["player"]["newPackageRank"]
        var skywarsKills = data["player"]["stats"]["SkyWars"]["kills"]
        var playedGamesSkywars = data["player"]["stats"]["SkyWars"]["games_played_skywars"]
        var expSkywars = data["player"]["stats"]["SkyWars"]["skywars_experience"]
        var bwLosses = data["player"]["stats"]["Bedwars"]["losses_bedwars"] //losses
        var bwWins = data["player"]["stats"]["Bedwars"]["wins_bedwars"] //wins 
        var bwPlayed = data["player"]["stats"]["Bedwars"]["games_played_bedwars"] //total played //deaths_bedwars
        var bwDeaths = data["player"]["stats"]["Bedwars"]["deaths_bedwars"]
        var bwKDR = bedwarsKills/bwDeaths; //BW KDR
        var bwkdrfixed = bwKDR.toFixed(2);
        var bwLevel = data["player"]["achievements"]["bedwars_level"] //skywars_you_re_a_star
        var swLevel = data["player"]["achievements"]["skywars_you_re_a_star"]
        var mainVers = data["player"]["mcVersionRp"]
        var swLosses = data["player"]["stats"]["SkyWars"]["losses"]
        var swKDR = skywarsKills/swLosses
        var swKDR = swKDR.toFixed(2);


        console.log(`\nShowing the avaiable stats for the hypixel user ${PName}.\n${lines}`);

        function say() {
            //Bedwars
            console.log(`${PName} has played ${bwPlayed} bedwars games.`);
            console.log(`${PName} has won ${bwWins} of them.`);
            console.log(`And ${PName} has ${bwLosses} losses.`);
            console.log(`${PName} has ${bedwarsCoins} bedwars coins.`);
            console.log(`${PName} has ${bwDeaths} deaths in bedwars.`);
            console.log(`${PName} has a total of ${finalBedwrsKills} final kills in bedwars.`);
            console.log(`${PName}'s bedwars KDR is ${bwkdrfixed}`);
            console.log(`${PName}'s bedwars level is ✫ ${bwLevel}.\n${lines3}`)
            //Skywars
            console.log(`${PName} has ${skywarsCoins} skywars coins.`);
            console.log(`${PName} has played ${playedGamesSkywars} skywars games.`);
            console.log(`${PName}'s skywars level is ✫ ${swLevel}`);
            console.log(`${PName}'s skywars kdr is ${swKDR}\n${lines}`);
        }

        if (stat2 > stat1) {
            console.log(`User ${PName} is currently online.\n${lines2}`);
            say()
        } else {
            console.log(`User ${PName} is currently offline.\n${lines2}`);
            say()
        }

        
    }).catch(error => console.log("\nAn error has occurred with the Hypixel API here are some of the reasons that could've cause it:\nYou have entered the api key wrongly.\nYou've searched up this name recently.\nYou've typed a space in the username or the username is over 16 characters.")); /*console.log(error)*/
