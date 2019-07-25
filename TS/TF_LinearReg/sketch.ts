import * as p5 from "p5";
import * as tf from "@tensorflow/tfjs"
import { createCanvas } from "@tensorflow/tfjs-core/dist/backends/webgl/canvas_util";
import { mod, Tensor, Tensor2D, tensor2d } from "@tensorflow/tfjs";
import { setTensorTracker } from "@tensorflow/tfjs-core/dist/tensor";

var sketch = function (p: p5) {

    let x_vals: number[] = [];
    let y_vals: number[] = [];

    let m:tf.Tensor, b: tf.Tensor;

    //Learning rate (how much variables are tweaked per fit())
    const learningRate: number = 0.5;
    //Optimizer = the one that minimizes (this case) the loss function
    const optimizer: tf.SGDOptimizer = tf.train.sgd(learningRate);
    
    //Get number-array, change it to tensor, make it a line (y = mx + b) and return line
    function predict(x:number[]):tf.Tensor{
        const xs = tf.tensor1d(x);
        const ys = xs.mul(m).add(b);
        return ys;
    }

    //Loss function. Basically meansquarederror
    function loss(pred, label){
        return pred.sub(label).square().mean()
    }   

    p.setup = function () {
        let canvas = p.createCanvas(400,400);
        //Push clicked coords into arrays (x's and y's separately)
        canvas.mousePressed(()=>{
            let x = p.map(p.mouseX, 0, p.width, 0, 1);
            let y = p.map(p.mouseY, 0, p.height, 1, 0);
            x_vals.push(x);
            y_vals.push(y);
        })
        //Variable means, that normally immutable tensors can be adjusted
        m = tf.variable(tf.scalar(p.random(1)));
        b = tf.variable(tf.scalar(p.random(1)));
       
    }
    
    p.draw = function () {
        tf.tidy(() => {
            if(x_vals.length > 0){
                const ys = tf.tensor1d(y_vals);
                //Minimize errors in predicted x_vals and y_vals with optimizer
                optimizer.minimize(():tf.Tensor<tf.Rank.R0> => {
                    return loss(predict(x_vals), ys);
                })
            }
        })
        
        p.background(0);
        p.stroke(255);
        p.strokeWeight(8);

        
        let line_x = [0,1];
        let ys: tf.Tensor = tf.tidy(() => predict(line_x));
        let line_y = ys.dataSync();
        ys.dispose();

        //Draw points
        for(let i:number = 0; i < x_vals.length; i++){
            let px: number = p.map(x_vals[i], 0, 1, 0, p.width);
            let py: number = p.map(y_vals[i], 0, 1, p.height, 0);
            p.point(px,py);
        }
        //Draw the line
        let x1 = p.map(line_x[0], 0, 1, 0, p.width);
        let x2 = p.map(line_x[1], 0, 1, 0, p.width);

        let y1 = p.map(line_y[0], 0, 1, p.height, 0 );
        let y2 = p.map(line_y[1], 0, 1, p.height,0);
        p.strokeWeight(2);
        p.line(x1,y1,x2,y2)
       
    }
}
  
new p5(sketch)