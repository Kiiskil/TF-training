import * as p5 from "p5";
import * as tf from "@tensorflow/tfjs"
import { mod, sigmoid, losses } from "@tensorflow/tfjs";
import { activationOptions, ActivationIdentifier } from "@tensorflow/tfjs-layers/dist/keras_format/activation_config";
import { LossIdentifier } from "@tensorflow/tfjs-layers/dist/keras_format/loss_config";
import { LossOrMetricFn } from "@tensorflow/tfjs-layers/dist/types";

export namespace Layers {
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
     * 6. Fit
     *  - Get history
     * 7. Predict
     *  - Get history
     */
    export const model = tf.sequential();

    //one layer is tf.Dense, which is fully connected. Meaning every node in layer is connected to every node of previous layer
    //when instantiating a layer, it needs a shape (at least on first layer) of inputs, units and a activationprotocol as param
    const configOutput = {
        //No inputshape here is necessary, because tensorfow infers it from previous layer
        units: 1 as number,
        activation : "sigmoid" as ActivationIdentifier
    }

    //Making two dense-layers with options
    const hidden: tf.layers.Layer = tf.layers.dense({
        units: 4 as number,
        inputShape: [2],
        activation : 'sigmoid' as ActivationIdentifier,
    });
    const output: tf.layers.Layer = tf.layers.dense(configOutput);

    //add layers to sequential-model
    model.add(hidden);
    model.add(output);

    //model have to be compiled, and it needs a optimizer and a loss-function for that
    //optimizer is created with tf.train() and uses stochastic gradient descent and the learning rate is .1
    const sgdOPt : tf.SGDOptimizer = tf.train.sgd(0.1);
    const config = 
    model.compile({
        optimizer: sgdOPt,
        loss: tf.losses.meanSquaredError as LossOrMetricFn
        //loss: 'meanSquaredError'
        //loss: tf.losses.cosineDistance as LossOrMetricFn
    });
    console.log("Compiled")

    /**
     * Using the model:
     * predict() : give the model inputs and get out a predict (Prefered to use a trained model)
     * fit() : Training the model
     * this case: train the model to map 1 to 0 and vice versa 
     */

     const xs = tf.tensor2d([
        [0, 0],
        [0.5, 0.5],
        [1, 1]
     ]);

     const ys = tf.tensor2d([
        [1],
        [0.5],
        [0]
     ]);

     const trainConf = {
        verbose : 1,  //0,1,2
        epochs : 5,
        shuffle: true
     }

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
    async function train() {
        //responses type?
        let response;
        //one param for fit is "shuffle: boolean", which shuffles the inputs for quicker learning

        do{
            //inputs, outputs, params
            response = await model.fit(xs,ys, trainConf);
            console.log(response.history.loss[0]);
        }
        while(response.history.loss[0] > 0.03)
    };
    train().then(() => console.log("Training complete"))
        .then(()=>{
            //const inputs = tf.tensor1d([0.25, 0.92]); //Error: Error when checking : expected dense_Dense1_input to have shape [null,2] but got array with shape [2,1].
            let outputs  = model.predict(xs);
            (<tf.Tensor>outputs).print()
        });
}