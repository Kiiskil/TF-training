"use strict";
exports.__esModule = true;
var Palat_js_1 = require("./Palat.js");
var Mato = /** @class */ (function () {
    function Mato() {
        this.pisteet = 0;
        this.kroppa = [];
        for (var i = 0; i < 5; i++) {
            this.kroppa.push(new Palat_js_1.MatoPala(i, 5));
        }
    }
    Mato.prototype.Liiku = function (suunta) {
        var lastIndex = this.kroppa.length - 1;
        //Tee uusi MatoPala siihen suuntaan, johon pelaaja on käskenyt
        if (suunta == null) {
        }
        else if (suunta === "a") {
            this.kroppa.push(new Palat_js_1.MatoPala(this.kroppa[lastIndex].x_sijainti - 1, this.kroppa[lastIndex].y_sijainti));
        }
        else if (suunta === "d") {
            this.kroppa.push(new Palat_js_1.MatoPala(this.kroppa[lastIndex].x_sijainti + 1, this.kroppa[lastIndex].y_sijainti));
        }
        else if (suunta === "w") {
            this.kroppa.push(new Palat_js_1.MatoPala(this.kroppa[lastIndex].x_sijainti, this.kroppa[lastIndex].y_sijainti - 1));
        }
        else if (suunta === "s") {
            this.kroppa.push(new Palat_js_1.MatoPala(this.kroppa[lastIndex].x_sijainti, this.kroppa[lastIndex].y_sijainti + 1));
        }
    };
    Mato.prototype.OsumaTarkistus = function (lauta) {
        var lastIndex = this.kroppa.length - 1;
        var osuma = false;
        //syökö itsensä
        for (var i = 0; i < this.kroppa.length - 1; i++) {
            if (this.kroppa[i].x_sijainti == this.kroppa[lastIndex].x_sijainti && this.kroppa[i].y_sijainti == this.kroppa[lastIndex].y_sijainti) {
                osuma = true;
                break;
            }
            else {
                osuma = false;
            }
        }
        //osuuko seiniin
        if (this.kroppa[lastIndex].x_sijainti == lauta.grid.length || this.kroppa[lastIndex].y_sijainti == lauta.grid.length
            || this.kroppa[lastIndex].x_sijainti < 0 || this.kroppa[lastIndex].y_sijainti < 0) {
            osuma = true;
        }
        return osuma;
    };
    Mato.prototype.SoikoOmenan = function (omena) {
        var lastIndex = this.kroppa.length - 1;
        //osuuko omenaan
        if (this.kroppa[lastIndex].x_sijainti !== omena.x_sijainti || this.kroppa[lastIndex].y_sijainti !== omena.y_sijainti) {
            //jos ei, poista ensimmäinen MatoPala
            this.kroppa.splice(0, 1);
            this.paivitaKroppa();
            return false;
        }
        else {
            //Älä poista palaa, koska omena syöty
            console.log("omena syöty");
            this.pisteet += 10;
            this.paivitaKroppa();
            return true;
        }
    };
    Mato.prototype.paivitaKroppa = function () {
        //Canvas-sijainnin päivitys
        this.kroppa.forEach(function (pala) {
            pala.x_coord = pala.x_koko * pala.x_sijainti;
            pala.y_coord = pala.y_koko * pala.y_sijainti;
        });
    };
    Mato.prototype.piirra = function (ctx) {
        var _this = this;
        var lastIndex = this.kroppa.length;
        //Madon joka palan piirto
        this.kroppa.forEach(function (pala) {
            ctx.beginPath();
            ctx.rect(pala.x_coord, pala.y_coord, pala.x_koko, pala.y_koko);
            ctx.fillStyle = pala.vari;
            ctx.fill();
            //Palojen reunat
            /* ctx.strokeStyle ="black";
            ctx.lineWidth = pala.y_koko/20;
            ctx.stroke(); */
            //Naama
            ctx.lineWidth = 1;
            ctx.strokeStyle = "red";
            ctx.font = "8pt sans-serif";
            ctx.strokeText("ಠ_ಠ", _this.kroppa[lastIndex - 1].x_coord + 1, _this.kroppa[lastIndex - 1].y_coord + 16);
            ctx.closePath();
        });
    };
    return Mato;
}());
exports["default"] = Mato;
