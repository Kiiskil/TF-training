import * as tf from "@tensorflow/tfjs"
import "@tensorflow/tfjs-node"
import iris from "./iris.json"
import irisTesting from "./iris-testing.json"

// convert/setup  our data
//Taking input data and mapping it to a 2-dimensional array of arrays 

const trainingData = tf.tensor2d(iris.map(item => [
    item.sepal_length, item.sepal_width, item.petal_length, item.petal_width,
]))
const outputData = tf.tensor2d(iris.map(item => [
    item.species === "setosa" ? 1 : 0,
    item.species === "virginica" ? 1 : 0,
    item.species === "versicolor" ? 1 : 0,
]))
const testingData = tf.tensor2d(irisTesting.map(item => [
    item.sepal_length, item.sepal_width, item.petal_length, item.petal_width,
]))
//build neural network
//train/fit NN
//Test NN

