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
    Lauta.prototype.piirra = function (ctx) {
        //tallentaa oletuksena nykyisen canvaksen kunnon
        //ctx.save();
        //Piirrä kaikki laudan palat mustaksi
        this.grid.forEach(function (rivi) {
            rivi.forEach(function (pala) {
                ctx.beginPath();
                ctx.rect(pala.x_coord, pala.y_coord, pala.x_koko, pala.y_koko);
                ctx.fillStyle = pala.vari;
                ctx.fill();
                ctx.strokeStyle = "gray";
                ctx.lineWidth = pala.y_koko / 10;
                ctx.stroke();
                ctx.closePath();
            });
        });
    };
    Lauta.prototype.getPixelData = function (canvas) {
        //kaiva pixelin värit joka ruudusta canvaksessa
        //ja lähetä ne pääohjelmaan yhtenä pitkänä arrayna
        var pixelData = [];
        var numbers = [];
        for (var i = 0; i < canvas.canvas.width / this.grid[0][0].x_koko; i++) {
            for (var j = 0; j < canvas.canvas.height / this.grid[0][0].y_koko; j++) {
                var pixels = canvas.ctx.getImageData(i * this.grid[0][0].x_koko, j * this.grid[0][0].y_koko, 1, 1).data;
                //let numbers :number[] = [];
                pixels.forEach(function (nro) {
                    numbers.push(nro);
                });
                //pixelData.push(numbers);
            }
        }
        pixelData.push(numbers);
        //console.log(pixelData); 
        return pixelData;
    };
    return Lauta;
}());
exports["default"] = Lauta;
