"use strict";
exports.__esModule = true;
var Lauta_js_1 = require("./Lauta.js");
var Mato_js_1 = require("./Mato.js");
var Palat_js_1 = require("./Palat.js");
var GameWindow_js_1 = require("./GameWindow.js");
var Chance = require("chance");
//Tee canvas-divin koosta dynaamiesti muuttuva
//Ompun ilmestymisen sijainti voi jäädä looppaa jos tilaa ei ole (rakenna jonkinlainen pick-järjestelmä)
//kaksi gameover-boolean-tarkistusta
var suunta;
var gameOver = false;
function GameOver(interval, pisteet) {
    var newGame = false;
    clearInterval(interval);
    newGame = window.confirm("GAME OVER\nPisteesi: " + pisteet + "\nNew Game?");
    if (newGame) {
        //gameOver = false;
        location.reload();
    }
}
function Piirra(mato, lauta, omena, canvas, timer) {
    //Tyhjää kenttä
    canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    if (suunta) {
        //jos madolla on suunta
        mato.Liiku(suunta);
        var uusiOmppu = void 0;
        var gameover = void 0;
        //osuuko mato mihinkään
        gameover = mato.OsumaTarkistus(lauta);
        uusiOmppu = mato.SoikoOmenan(omena);
        if (gameover) {
            GameOver(timer, mato.pisteet);
        }
        if (uusiOmppu) {
            console.log("uusi omena");
            omena.x_sijainti = getRandomIntInclusive(0, canvas.x_koko - 1);
            omena.y_sijainti = getRandomIntInclusive(0, canvas.y_koko - 1);
            var osuma = omena.tarkistaMato(mato);
            if (osuma) {
                do {
                    omena.x_sijainti = getRandomIntInclusive(0, canvas.x_koko - 1);
                    omena.y_sijainti = getRandomIntInclusive(0, canvas.y_koko - 1);
                    osuma = omena.tarkistaMato(mato);
                } while (osuma);
            }
        }
    }
    //Päivitä pisteet näytölle
    document.getElementById("pisteet").innerHTML = "Pisteet: " + mato.pisteet.toString();
    //Piirrä oliot näytölle
    lauta.piirra(mato, canvas.ctx);
    mato.piirra(canvas.ctx);
    omena.piirra(canvas.ctx);
}
;
var getRandomIntInclusive = function (min, max) {
    return Chance().integer({ min: min, max: max });
};
function init() {
    //Tee uudet oliot
    var canvas = new GameWindow_js_1["default"]();
    var lauta = new Lauta_js_1["default"](canvas.x_koko, canvas.y_koko);
    var mato = new Mato_js_1["default"]();
    //omenalle sattumanvarainen sijainti
    var omena = new Palat_js_1.Omena(getRandomIntInclusive(0, canvas.x_koko - 1), getRandomIntInclusive(0, canvas.y_koko - 1));
    //Osuuko omena matoon
    var osuma = omena.tarkistaMato(mato);
    if (osuma) {
        do {
            //Looppaa kunnes omenale löytyy vapaa paikka
            omena.x_sijainti = getRandomIntInclusive(0, canvas.x_koko - 1);
            omena.y_sijainti = getRandomIntInclusive(0, canvas.y_koko - 1);
            osuma = omena.tarkistaMato(mato);
        } while (osuma);
    }
    Piirra(mato, lauta, omena, canvas);
    document.addEventListener('keypress', function (event) {
        //Peli käynnistyy kun pelaaja antaa suunnan
        suunta = event.key;
        if (!gameOver) {
            //Pyöritetään peliä kunnes gameover
            var timer_1 = setInterval(function () { return Piirra(mato, lauta, omena, canvas, timer_1); }, canvas.interVal);
            gameOver = true;
        }
    });
}
init();
