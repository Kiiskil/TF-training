"use strict";
exports.__esModule = true;
var GameWindow = /** @class */ (function () {
    function GameWindow(interVal) {
        //size of the board
        this.x_koko = 30;
        this.y_koko = 30;
        //game speed in ms (refresh rate)
        this.interVal = 100;
        if (interVal) {
            this.interVal = interVal;
        }
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
    }
    return GameWindow;
}());
exports.GameWindow = GameWindow;
