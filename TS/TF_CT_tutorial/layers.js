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
var tf = require("@tensorflow/tfjs");
var Layers;
(function (Layers) {
    /**
     * tf.Sequential - model
     * when one layers output are next layers inputs
     * this is less generic and supports only a linear stack of layers
     *
     * tf.Model - model
     * is a more generic model, supporting an arbitrary graph (without cycles) of layers
     *
     * Recap:
     * 1. Make sequential-object (model)
     * 2. Make layers
     * 3. Configure layers
     *  - Units (output, kinda)
     *  - InputShape
     *  - ActivationProtocol
     * 4. Add layers to model
     * 5. Compile
     *  - Optimizer
     *  - Loss-function
     */
    Layers.model = tf.sequential();
    //one layer is tf.Dense, which is fully connected. Meaning every node in layer is connected to every node of previous layer
    //when instantiating a layer, it needs a shape (at least on first layer) of inputs, units and a activationprotocol as param
    var configOutput = {
        //No inputshape here is necessary, because tensorfow infers it from previous layer
        units: 1,
        activation: "sigmoid"
    };
    //Making two dense-layers with options
    var hidden = tf.layers.dense({
        units: 4,
        inputShape: [2],
        activation: 'sigmoid'
    });
    var output = tf.layers.dense(configOutput);
    //add layers to sequential-model
    Layers.model.add(hidden);
    Layers.model.add(output);
    //model have to be compiled, and it needs a optimizer and a loss-function for that
    //optimizer is created with tf.train() and uses stochastic gradient descent and the learning rate is .1
    var sgdOPt = tf.train.sgd(0.1);
    var config = Layers.model.compile({
        optimizer: sgdOPt,
        loss: tf.losses.meanSquaredError
        //loss: 'meanSquaredError'
        //loss: tf.losses.cosineDistance as LossOrMetricFn
    });
    console.log("Compiled");
    /**
     * Using the model:
     * predict() : give the model inputs and get out a predict (Prefered to use a trained model)
     * fit() : Training the model
     */
    var xs = tf.tensor2d([
        [0, 0],
        [0.5, 0.5],
        [1, 1]
    ]);
    var ys = tf.tensor2d([
        [1],
        [0.5],
        [0]
    ]);
    var trainConf = {
        verbose: 1,
        epochs: 5,
        shuffle: true
    };
    //1.
    /* const history = model.fit(xs,ys);
    console.log(history); //Promise { <state>: "pending" } */
    //2.
    /* model.fit(xs,ys).then((history)=>{
       console.log(history);
    }); */
    //3.
    /*  model.fit(xs,ys,trainConf).then((history)=>{
        console.log(history);
    }); */
    //4
    /* async function train() {
        for (let i: number = 0; i < 1000; i++){
            const response = await model.fit(xs,ys);
            console.log(response.history.loss[0]);
        }
    }; */
    function train() {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Layers.model.fit(xs, ys, trainConf)];
                    case 1:
                        //inputs, outputs, params
                        response = _a.sent();
                        console.log(response.history.loss[0]);
                        _a.label = 2;
                    case 2:
                        if (response.history.loss[0] > 0.03) return [3 /*break*/, 0];
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    ;
    train().then(function () { return console.log("Training complete"); })
        .then(function () {
        //const inputs = tf.tensor1d([0.25, 0.92]); //Error: Error when checking : expected dense_Dense1_input to have shape [null,2] but got array with shape [2,1].
        var outputs = Layers.model.predict(xs);
        outputs.print();
    });
})(Layers = exports.Layers || (exports.Layers = {}));
