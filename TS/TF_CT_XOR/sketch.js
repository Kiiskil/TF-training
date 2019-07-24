"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var p5 = require("p5");
var tf = require("@tensorflow/tfjs");
var sketch = function (p) {
    var resolution = 20;
    var cols;
    var rows;
    var model;
    var inputs;
    //XOR-problem with Tensorflow
    //Coding challenge #106: XOR Problem with Tensorflow.js
    var training_data = [{
            inputs: [0, 0],
            outputs: [0]
        },
        {
            inputs: [1, 0],
            outputs: [1]
        },
        {
            inputs: [0, 1],
            outputs: [1]
        },
        {
            inputs: [1, 1],
            outputs: [0]
        }];
    var trainConf = {
        /*         verbose : 1,  //0,1,2
                epochs : 1, */
        shuffle: true
    };
    //console.log(training_data);
    var xs = tf.tensor2d(training_data.map(function (item) {
        return item.inputs;
    }));
    var ys = tf.tensor2d(training_data.map(function (item) {
        return item.outputs;
    }));
    p.setup = function () {
        p.createCanvas(400, 400);
        cols = p.width / resolution;
        rows = p.height / resolution;
        var data = [];
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                var x1 = i / cols;
                var x2 = j / rows;
                data.push(
                //even though we are sending just pne array of two numbers, we have to instantiate it to [[number,number]]
                [x1, x2]);
            }
        }
        ;
        inputs = tf.tensor2d(data);
        model = tf.sequential();
        var hidden = tf.layers.dense({
            inputShape: [2],
            units: 2,
            activation: 'sigmoid'
        });
        var output = tf.layers.dense({
            units: 1,
            activation: 'sigmoid'
        });
        model.add(hidden);
        model.add(output);
        var sgdOPt = tf.train.sgd(0.8);
        model.compile({
            optimizer: sgdOPt,
            loss: tf.losses.meanSquaredError
        });
    };
    function trainModel() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, model.fit(xs, ys, trainConf)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    p.draw = function () {
        //p.noLoop();
        p.background(0);
        model.fit(xs, ys, trainConf).then(function (result) {
            console.log("TRAINED");
            console.log(result.history.loss[0]);
            //REKURSIIVINEN LOOPPI, KORJAA toimimaan ilman noLoop()-funktiota
            // p.draw();  
            var index = 0;
            var response = model.predict(inputs);
            for (var i = 0; i < cols; i++) {
                for (var j = 0; j < rows; j++) {
                    //p.noStroke();
                    //console.log(response.dataSync()[0]);
                    p.fill(response.dataSync()[index] * 255);
                    p.rect(i * resolution, j * resolution, resolution, resolution);
                    index++;
                }
            }
        });
    };
};
new p5(sketch);
