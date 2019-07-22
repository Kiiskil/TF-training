"use strict";
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
     */
    Layers.model = tf.sequential();
    //one layer is tf.Dense, which is fully connected. Meaning every node in layer is connected to every node of previous layer
    //when instantiating a layer, it needs a shape (at least on first layer) of inputs, units and a activationprotocol as param
    var configHidden = {
        units: 4,
        inputShape: [2],
        activation: 'sigmoid'
    };
    var configOutput = {
        units: 3,
        activation: "sigmoid"
    };
    var hidden = tf.layers.dense(configHidden);
    var output = tf.layers.dense(configOutput);
    //add layers to sequential-model
    Layers.model.add(hidden);
    Layers.model.add(output);
})(Layers = exports.Layers || (exports.Layers = {}));
