"use strict";
exports.__esModule = true;
var matopeli_js_1 = require("./matopeli.js");
var matopeli_js_2 = require("./matopeli.js");
var matopeli_js_3 = require("./matopeli.js");
var Chance = require("chance");
//Korjaa laudanpiirto, liian raskas (kolme foreach looppia peräkkäin).
//Ompun ilmestymisen sijainti voi jäädä looppaa jos tilaa ei ole (rakenna jonkinlainen pick-järjestelmä)
//laita pyörimään itsestään
var getRandomIntInclusive = function (min, max) {
    return Chance().integer({ min: min, max: max });
};
function init() {
    var x_koko = 30;
    var y_koko = 30;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var animationFrame = window.requestAnimationFrame;
    var lauta = new matopeli_js_1["default"](x_koko, y_koko);
    var mato = new matopeli_js_2.Mato();
    var omena = new matopeli_js_3.Omena(getRandomIntInclusive(0, x_koko - 1), getRandomIntInclusive(0, y_koko - 1));
    var osuma = omena.tarkistaMato(mato);
    if (osuma) {
        do {
            omena.x_sijainti = getRandomIntInclusive(0, x_koko - 1);
            omena.y_sijainti = getRandomIntInclusive(0, y_koko - 1);
            osuma = omena.tarkistaMato(mato);
        } while (osuma);
    }
    lauta.piirra(mato, ctx);
    mato.piirra(lauta, ctx);
    omena.piirra(ctx);
    console.log(lauta.grid.length);
    console.log(mato);
    document.addEventListener('keypress', function (event) {
        var uusiOmppu;
        mato.Liiku(event.key);
        uusiOmppu = mato.OsumaTarkistus(ctx, lauta, omena);
        lauta.piirra(mato, ctx);
        mato.piirra(lauta, ctx);
        if (uusiOmppu) {
            omena.x_sijainti = getRandomIntInclusive(0, x_koko - 1);
            omena.y_sijainti = getRandomIntInclusive(0, y_koko - 1);
            var osuma_1 = omena.tarkistaMato(mato);
            if (osuma_1) {
                do {
                    omena.x_sijainti = getRandomIntInclusive(0, x_koko - 1);
                    omena.y_sijainti = getRandomIntInclusive(0, y_koko - 1);
                    osuma_1 = omena.tarkistaMato(mato);
                } while (osuma_1);
            }
        }
        omena.piirra(ctx);
    });
}
init();
