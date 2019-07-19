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
        this.x_koko = 40;
        this.y_koko = 40;
        this.x_sijainti = x;
        this.y_sijainti = y;
        this.x_coord = this.x_koko * this.x_sijainti;
        this.y_coord = this.y_koko * this.y_sijainti;
        this.vari = "black";
    }
    return Pala;
}());
var Mato = /** @class */ (function () {
    function Mato() {
        this.kroppa = [];
        for (var i = 0; i < 5; i++) {
            this.kroppa.push(new MatoPala(5, i));
        }
    }
    Mato.prototype.Liiku = function (suunta, ctx) {
        var lastIndex = this.kroppa.length - 1;
        if (suunta === "a") {
            this.kroppa[lastIndex].x_sijainti = this.kroppa[lastIndex].x_sijainti - 1;
        }
        this.paivitaKroppa();
        this.piirra(ctx);
    };
    Mato.prototype.Kasva = function (x, y) {
        this.kroppa.push(new MatoPala(x, y));
    };
    Mato.prototype.paivitaKroppa = function () {
        this.kroppa.forEach(function (pala) {
            pala.x_coord = pala.x_koko * pala.x_sijainti;
            pala.y_coord = pala.y_koko * pala.y_sijainti;
        });
    };
    Mato.prototype.piirra = function (ctx) {
        //tallentaa oletuksena nykyisen canvaksen kunnon
        ctx.save();
        this.kroppa.forEach(function (pala) {
            ctx.beginPath();
            ctx.rect(pala.x_coord, pala.y_coord, pala.x_koko, pala.y_koko);
            ctx.fillStyle = pala.vari;
            ctx.fill();
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
            ctx.stroke();
            ctx.closePath();
        });
        ctx.restore();
    };
    return Mato;
}());
exports.Mato = Mato;
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
        /* this.x_sijainti = x;
        this.y_sijainti = y; */
        _this.vari = "red";
        return _this;
    }
    Omena.prototype.piirra = function (ctx) {
        //tallentaa oletuksena nykyisen canvaksen kunnon
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x_coord, this.y_coord, this.x_koko, this.y_koko);
        ctx.fillStyle = this.vari;
        ctx.fill();
        ctx.strokeStyle = this.vari;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    };
    return Omena;
}(Pala));
exports.Omena = Omena;
var Lauta = /** @class */ (function () {
    function Lauta(korkeus, leveys) {
        //Alusta 2d-array
        this.grid = [];
        this.x_koko = leveys;
        this.y_koko = korkeus;
        for (var i = 0; i < this.x_koko; i++) {
            this.grid[i] = [];
            for (var j = 0; j < this.y_koko; j++) {
                this.grid[i][j] = new Pala(i, j);
            }
        }
    }
    Lauta.prototype.piirra = function (ctx) {
        //tallentaa oletuksena nykyisen canvaksen kunnon
        ctx.save();
        this.grid.forEach(function (rivi) {
            rivi.forEach(function (pala) {
                ctx.beginPath();
                //ctx.rect((lauta.grid[0][0].x_koko), (lauta.grid[0][0].y_koko),lauta.grid[0][0].x_coord, lauta.grid[0][0].y_coord);
                ctx.rect(pala.x_coord, pala.y_coord, pala.x_koko, pala.y_koko);
                ctx.fillStyle = pala.vari;
                ctx.fill();
                ctx.strokeStyle = "white";
                ctx.lineWidth = 5;
                ctx.stroke();
                ctx.closePath();
            });
        });
        ctx.restore();
    };
    return Lauta;
}());
exports["default"] = Lauta;
