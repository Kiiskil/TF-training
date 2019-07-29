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
//Tee niin, että matoja ja omenia voi olla useampi kentällä. Tätä varten NN input ei voi olla pixelidata kentästä
//tosin riittää jos vain yksi näytetään
var suunta;
var canvas = new GameWindow_js_1["default"]();
var lauta = new Lauta_js_1["default"](canvas.x_koko, canvas.y_koko);
function GameOver(interval, pisteet) {
    var newGame = false;
    clearInterval(interval);
    /* newGame = window.confirm("GAME OVER\nPisteesi: "+ pisteet +"\nNew Game?")
    if(newGame){
        init();
    } */
    init();
}
function Piirra(lauta, canvas, timer) {
    //Tyhjää kenttä
    var mato = lauta.mato;
    var omena = lauta.omena;
    canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    if (suunta) {
        //jos madolla on suunta
        mato.Liiku(mato.aivot.predict(lauta.getPixelData(canvas)));
        //mato.Liiku(suunta);
        //console.log("mato liikkuu pääohjelmassa");
        var uusiOmppu = void 0;
        var gameover = void 0;
        //osuuko mato mihinkään
        gameover = mato.OsumaTarkistus(lauta);
        uusiOmppu = mato.SoikoOmenan(omena);
        if (gameover) {
            console.log("Mato kuoli");
            gameover = false;
            GameOver(timer, mato.pisteet);
        }
        if (uusiOmppu) {
            console.log("uusi omena");
            omena.x_sijainti = getRandomIntInclusive(0, canvas.x_koko - 1);
            omena.y_sijainti = getRandomIntInclusive(0, canvas.y_koko - 1);
            omena.getFace();
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
    //console.log("//Piirrä oliot näytölle");
    lauta.piirra(canvas.ctx);
    mato.piirra(canvas.ctx);
    omena.piirra(canvas.ctx);
}
;
var getRandomIntInclusive = function (min, max) {
    return Chance().integer({ min: min, max: max });
};
function init() {
    //Tee uudet oliot
    suunta = null;
    var mato = new Mato_js_1["default"]();
    //omenalle sattumanvarainen sijainti
    var omena = new Palat_js_1.Omena(getRandomIntInclusive(0, canvas.x_koko - 1), getRandomIntInclusive(0, canvas.y_koko - 1));
    //Osuuko omena matoon
    var osuma = omena.tarkistaMato(mato);
    if (osuma) {
        do {
            //Looppaa kunnes omenalle löytyy vapaa paikka
            omena.x_sijainti = getRandomIntInclusive(0, canvas.x_koko - 1);
            omena.y_sijainti = getRandomIntInclusive(0, canvas.y_koko - 1);
            osuma = omena.tarkistaMato(mato);
        } while (osuma);
    }
    lauta.mato = mato;
    lauta.omena = omena;
    //eka piirto
    var timer = setInterval(function () { return Piirra(lauta, canvas, timer); }, canvas.interVal);
    //Piirra(lauta,canvas);
}
init();
//Add event listener for keypresses
document.addEventListener('keypress', function (event) {
    //Peli käynnistyy kun pelaaja antaa suunnan
    if (event.key === "w" || event.key === "a" || event.key === "s" || event.key === "d") {
        suunta = event.key;
        console.log("nappia painettu");
        //Pelkkä piirra() ilman intervalia ja gameoveria mahdollistaa liikkumisen haluttaessa
        Piirra(lauta, canvas);
    }
    else {
        alert("WASD-napeilla liikkuu");
    }
});
