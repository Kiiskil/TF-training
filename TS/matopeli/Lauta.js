"use strict";
exports.__esModule = true;
var Palat_js_1 = require("./Palat.js");
var Lauta = /** @class */ (function () {
    function Lauta(korkeus, leveys) {
        //Alusta 2d-array
        this.grid = [];
        this.x_koko = leveys;
        this.y_koko = korkeus;
        for (var i = 0; i < this.x_koko; i++) {
            this.grid[i] = [];
            for (var j = 0; j < this.y_koko; j++) {
                this.grid[i][j] = new Palat_js_1.Pala(i, j);
            }
        }
    }
    Lauta.prototype.piirra = function (mato, ctx) {
        //tallentaa oletuksena nykyisen canvaksen kunnon
        ctx.save();
        //Tää pitää korjata, aiavan saatanan raskas toimitus
        //Tarkista onko mato missään kohdassa ja jos ei, piirrä se mustaksi
        this.grid.forEach(function (rivi) {
            rivi.forEach(function (pala) {
                /* mato.kroppa.forEach(matopala => {
                    if(matopala.x_sijainti != pala.x_sijainti || matopala.y_sijainti != pala.y_sijainti){ */
                ctx.beginPath();
                ctx.rect(pala.x_coord, pala.y_coord, pala.x_koko, pala.y_koko);
                ctx.fillStyle = pala.vari;
                ctx.fill();
                ctx.strokeStyle = "white";
                ctx.lineWidth = pala.y_koko / 10;
                ctx.stroke();
                ctx.closePath();
                /* }
            }); */
            });
        });
        //ctx.restore();
    };
    return Lauta;
}());
exports["default"] = Lauta;
