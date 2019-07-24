"use strict";
exports.__esModule = true;
var tf = require("@tensorflow/tfjs");
require("@tensorflow/tfjs-node");
//Do NOT use *import* with json, because it's a file not a module
var iris = require("./iris.json");
var irisTesting = require("./iris-testing.json");
// convert/setup  our data
//Taking input data and mapping it to a 2-dimensional array of arrays 
var trainingData = tf.tensor2d(iris.map(function (item) { return [
    item.sepal_length, item.sepal_width, item.petal_length, item.petal_width,
]; }));
trainingData.print();
var outputData = tf.tensor2d(iris.map(function (item) { return [
    item.species === "setosa" ? 1 : 0,
    item.species === "virginica" ? 1 : 0,
    item.species === "versicolor" ? 1 : 0,
]; }));
var testingData = tf.tensor2d(irisTesting.map(function (item) { return [
    item.sepal_length, item.sepal_width, item.petal_length, item.petal_width,
]; }));
//build neural network
var model = tf.sequential();
//First layer
model.add(tf.layers.dense({
    inputShape: [4],
    activation: "sigmoid",
    //another type of problem is regression type of problem
    units: 5
}));
//added hidden layer
model.add(tf.layers.dense({
    //first layer is outputting 5, so this one is receiving 5
    inputShape: [5],
    activation: "sigmoid",
    //units going down to 3, because output is 3 units
    units: 3
}));
model.add(tf.layers.dense({
    //Input can be dynamically determined
    activation: "sigmoid",
    //units going down to 3, because output is 3 units
    units: 3
}));
//error handling
model.compile({
    loss: "meanSquaredError",
    optimizer: tf.train.adam(.06)
});
//train/fit NN
//start time for timelogs
var startTime = Date.now();
//This is training the NN, or FIT in TF
model.fit(trainingData, outputData, { epochs: 100 }) //Epochs = how many times training iterates
    .then(function (history) {
    console.log("DONE!", Date.now() - startTime);
    //console.log(history);
    //Test NN
    //.print does not work straight away on TS, but you have to notify the compiler which on it is (type assertion)
    model.predict(testingData).print();
});
//Created a NN, added 3 layers to it, trained it and tested it. =)
