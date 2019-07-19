"use strict";
exports.__esModule = true;
var matopeli_js_1 = require("./matopeli.js");
var matopeli_js_2 = require("./matopeli.js");
var matopeli_js_3 = require("./matopeli.js");
var Chance = require("chance");
var x_koko = 20;
var y_koko = 20;
var getRandomIntInclusive = function (min, max) {
    return Chance().integer({ min: min, max: max });
};
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var lauta = new matopeli_js_1["default"](x_koko, y_koko);
console.log(lauta.grid[0][0]);
var mato = new matopeli_js_2.Mato();
var omena = new matopeli_js_3.Omena(getRandomIntInclusive(0, x_koko - 1), getRandomIntInclusive(0, y_koko - 1));
lauta.piirra(ctx);
mato.piirra(ctx);
omena.piirra(ctx);
console.log(mato);
console.log(omena);
document.addEventListener('keypress', function (event) {
    console.log(event.key);
    mato.Liiku(event.key, ctx);
});
