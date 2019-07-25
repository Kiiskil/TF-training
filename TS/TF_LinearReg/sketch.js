"use strict";
exports.__esModule = true;
var p5 = require("p5");
var tf = require("@tensorflow/tfjs");
var sketch = function (p) {
    var x_vals = [];
    var y_vals = [];
    var m, b;
    //Learning rate (how much variables are tweaked per fit())
    var learningRate = 0.5;
    //Optimizer = the one that minimizes (this case) the loss function
    var optimizer = tf.train.sgd(learningRate);
    function predict(x) {
        var xs = tf.tensor1d(x);
        // y = mx + b
        var ys = xs.mul(m).add(b);
        return ys;
    }
    //Loss function. Basically meansquarederror
    function loss(pred, label) {
        return pred.sub(label).square().mean();
    }
    p.setup = function () {
        var canvas = p.createCanvas(400, 400);
        canvas.mousePressed(function () {
            var x = p.map(p.mouseX, 0, p.width, 0, 1);
            var y = p.map(p.mouseY, 0, p.height, 1, 0);
            x_vals.push(x);
            y_vals.push(y);
        });
        //Variable means, that normally immutable tensors can be adjusted
        m = tf.variable(tf.scalar(p.random(1)));
        b = tf.variable(tf.scalar(p.random(1)));
    };
    p.draw = function () {
        tf.tidy(function () {
            if (x_vals.length > 0) {
                var ys_1 = tf.tensor1d(y_vals);
                optimizer.minimize(function () {
                    return loss(predict(x_vals), ys_1);
                });
            }
        });
        p.background(0);
        p.stroke(255);
        p.strokeWeight(8);
        var line_x = [0, 1];
        var ys = tf.tidy(function () { return predict(line_x); });
        var line_y = ys.dataSync();
        ys.dispose();
        for (var i = 0; i < x_vals.length; i++) {
            var px = p.map(x_vals[i], 0, 1, 0, p.width);
            var py = p.map(y_vals[i], 0, 1, p.height, 0);
            p.point(px, py);
        }
        var x1 = p.map(line_x[0], 0, 1, 0, p.width);
        var x2 = p.map(line_x[1], 0, 1, 0, p.width);
        var y1 = p.map(line_y[0], 0, 1, p.height, 0);
        var y2 = p.map(line_y[1], 0, 1, p.height, 0);
        p.strokeWeight(2);
        p.line(x1, y1, x2, y2);
    };
};
new p5(sketch);
