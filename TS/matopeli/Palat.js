"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Chance = require("chance");
var Pala = /** @class */ (function () {
    function Pala(x_sijainti, y_sijainti) {
        //Pöydän pala
        this.x_koko = 25;
        this.y_koko = 25;
        this.x_sijainti = x_sijainti;
        this.y_sijainti = y_sijainti;
        this.x_coord = this.x_koko * this.x_sijainti;
        this.y_coord = this.y_koko * this.y_sijainti;
        this.vari = "black";
    }
    return Pala;
}());
exports.Pala = Pala;
var MatoPala = /** @class */ (function (_super) {
    __extends(MatoPala, _super);
    //Madon pala
    function MatoPala(x_sijainti, y_sijainti) {
        var _this = _super.call(this, x_sijainti, y_sijainti) || this;
        _this.vari = "white";
        return _this;
    }
    return MatoPala;
}(Pala));
exports.MatoPala = MatoPala;
var getRandomIntInclusive = function (min, max) {
    return Chance().integer({ min: min, max: max });
};
var Omena = /** @class */ (function (_super) {
    __extends(Omena, _super);
    function Omena(x_sijainti, y_sijainti) {
        var _this = _super.call(this, x_sijainti, y_sijainti) || this;
        _this.faces = [{
                1: "⊙﹏⊙",
                2: "ಠ_ಠ",
                3: "ಠ‿ಠ",
                4: "ʘ‿ʘ",
                5: "(•ω•)",
                6: "(°ʖ°)",
                7: "(ツ)"
            }];
        _this.faceInd = getRandomIntInclusive(1, Object.keys(_this.faces[0]).length);
        _this.vari = "red";
        return _this;
    }
    Omena.prototype.tarkistaMato = function (mato) {
        //Osuuko omenan uusi sijainti matoon
        var osuma;
        for (var i = 0; i < mato.kroppa.length; i++) {
            if (mato.kroppa[i].x_sijainti !== this.x_sijainti || mato.kroppa[i].y_sijainti !== this.y_sijainti) {
                osuma = false;
            }
            else {
                console.log("Omena yritti syntyä matoon");
                osuma = true;
                break;
            }
        }
        return osuma;
    };
    Omena.prototype.getFace = function () {
        this.faceInd = getRandomIntInclusive(1, Object.keys(this.faces[0]).length);
        //console.log(Object.keys(this.faces[0]).length);
    };
    Omena.prototype.piirra = function (ctx) {
        this.x_coord = this.x_koko * this.x_sijainti;
        this.y_coord = this.y_koko * this.y_sijainti;
        ctx.beginPath();
        ctx.rect(this.x_coord, this.y_coord, this.x_koko, this.y_koko);
        ctx.fillStyle = this.vari;
        ctx.fill();
        ctx.strokeStyle = this.vari;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.font = "8pt sans-serif";
        /* console.log(this.faces);
        console.log(this.faces); */
        //get random face
        if (this.faceInd == 2 || this.faceInd == 3 || this.faceInd == 7) {
            ctx.font = "11pt sans-serif";
        }
        ctx.strokeText(this.faces[0][this.faceInd], this.x_coord - 2, this.y_coord + 18);
        ctx.closePath();
    };
    return Omena;
}(Pala));
exports.Omena = Omena;
