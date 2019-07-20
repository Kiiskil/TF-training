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
var Pala = /** @class */ (function () {
    function Pala(x, y) {
        this.x_koko = 20;
        this.y_koko = 20;
        this.x_sijainti = x;
        this.y_sijainti = y;
        this.x_coord = this.x_koko * this.x_sijainti;
        this.y_coord = this.y_koko * this.y_sijainti;
        this.vari = "black";
    }
    return Pala;
}());
exports.Pala = Pala;
var MatoPala = /** @class */ (function (_super) {
    __extends(MatoPala, _super);
    function MatoPala(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.vari = "white";
        return _this;
    }
    return MatoPala;
}(Pala));
exports.MatoPala = MatoPala;
var Omena = /** @class */ (function (_super) {
    __extends(Omena, _super);
    function Omena(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.vari = "red";
        return _this;
    }
    Omena.prototype.tarkistaMato = function (mato) {
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
    Omena.prototype.piirra = function (ctx) {
        this.x_coord = this.x_koko * this.x_sijainti;
        this.y_coord = this.y_koko * this.y_sijainti;
        //ctx.save();
        ctx.beginPath();
        ctx.rect(this.x_coord, this.y_coord, this.x_koko, this.y_koko);
        ctx.fillStyle = this.vari;
        ctx.fill();
        ctx.strokeStyle = this.vari;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
        //ctx.restore();
    };
    return Omena;
}(Pala));
exports.Omena = Omena;