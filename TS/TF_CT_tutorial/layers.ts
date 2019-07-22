import * as p5 from "p5";
import * as tf from "@tensorflow/tfjs"
import { mod, sigmoid } from "@tensorflow/tfjs";
import { activationOptions, ActivationIdentifier } from "@tensorflow/tfjs-layers/dist/keras_format/activation_config";

export namespace Layers {
    /**
     * tf.Sequential - model
     * when one layers output are next layers inputs
     * this is less generic and supports only a linear stack of layers
     * 
     * tf.Model - model
     * is a more generic model, supporting an arbitrary graph (without cycles) of layers
     */
    export const model = tf.sequential();

    //one layer is tf.Dense, which is fully connected. Meaning every node in layer is connected to every node of previous layer
    //when instantiating a layer, it needs a shape (at least on first layer) of inputs, units and a activationprotocol as param
    const configHidden = {
        units: 4 as number,
        inputShape: [2],
        activation : 'sigmoid' as ActivationIdentifier,
    }
    const configOutput = {
        units: 3 as number,
        activation : "sigmoid" as ActivationIdentifier
    }

    const hidden: tf.layers.Layer = tf.layers.dense(configHidden);
    const output: tf.layers.Layer = tf.layers.dense(configOutput);

    //add layers to sequential-model
    model.add(hidden);
    model.add(output);
}