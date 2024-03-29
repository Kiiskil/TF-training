"use strict";
exports.__esModule = true;
var Palat_js_1 = require("./Palat.js");
var TFNN_js_1 = require("./TFNN.js");
var Mato = /** @class */ (function () {
    function Mato() {
        this.pisteet = 0;
        this.faces = {
            //Alle tietyn pisterajan (key)
            20: "⊙﹏⊙",
            40: "ಠ_ಠ",
            60: "ಠ‿ಠ",
            1000: "ʘ‿ʘ"
        };
        this.kroppa = [];
        for (var i = 0; i < 2; i++) {
            this.kroppa.push(new Palat_js_1.MatoPala(i, 5));
        }
        this.aivot = new TFNN_js_1["default"](3600, 1800, 4);
        //console.log("Mato luotu");
        console.log(this.kroppa[0].x_sijainti);
    }
    Mato.prototype.Liiku = function (suunta) {
        var lastIndex = this.kroppa.length - 1;
        this.suunta = suunta;
        if (this.suunta === "a" ||
            this.suunta === "d" ||
            this.suunta === "w" ||
            this.suunta === "s") {
            //y-akselin suunta-stringiin lisätty alaviiva neljän parin saamiseksi (pareilla kutsutaan suunnanvalitsimia)
            var suunnat = {
                "a": -1,
                "_a": 0,
                "s": 0,
                "_s": +1,
                "w": 0,
                "_w": -1,
                "d": +1,
                "_d": 0
            };
            this.kroppa.push(new Palat_js_1.MatoPala(this.kroppa[lastIndex].x_sijainti + suunnat[suunta], this.kroppa[lastIndex].y_sijainti + suunnat["_" + suunta]));
        }
        ;
        //console.log(this.kroppa.length +" X: "+this.kroppa[lastIndex].x_sijainti+" Y: "+this.kroppa[lastIndex].y_sijainti + " Index: "+lastIndex )
        //console.log(this.kroppa);
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
            return false;
        }
        else {
            //Älä poista palaa, koska omena syöty
            //console.log("omena syöty");
            this.pisteet += 2;
            return true;
        }
    };
    Mato.prototype.piirra = function (ctx) {
        var _this = this;
        var lastIndex = this.kroppa.length;
        this.kroppa.forEach(function (pala) {
            pala.x_coord = pala.x_koko * pala.x_sijainti;
            pala.y_coord = pala.y_koko * pala.y_sijainti;
        });
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
            for (var key in _this.faces) {
                if (_this.pisteet < parseInt(key)) {
                    ctx.strokeText(_this.faces[key].valueOf(), _this.kroppa[lastIndex - 1].x_coord, _this.kroppa[lastIndex - 1].y_coord + 16);
                    break;
                }
            }
            ctx.closePath();
        });
        //console.log("Mato piirretty");
    };
    return Mato;
}());
exports["default"] = Mato;
