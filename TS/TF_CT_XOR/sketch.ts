import * as p5 from "p5";
import * as tf from "@tensorflow/tfjs"
import { createCanvas } from "@tensorflow/tfjs-core/dist/backends/webgl/canvas_util";
import { mod, Tensor, Tensor2D, tensor2d } from "@tensorflow/tfjs";

var sketch = function (p: p5) {
    let resolution = 20;
    let cols;
    let rows;
    let model: tf.Sequential;
    let inputs:tf.Tensor;
    
    //XOR-problem with Tensorflow
    //Coding challenge #106: XOR Problem with Tensorflow.js
    let training_data = [{
        inputs: [0,0],
        outputs: [0]
    },
    {
        inputs: [1,0],
        outputs: [1]
    },
    {
        inputs: [0,1],
        outputs: [1]
    },
    {
        inputs: [1,1],
        outputs: [0] 
    }]
    const trainConf = {
/*         verbose : 1,  //0,1,2
        epochs : 1, */
        shuffle: true
     }
     //console.log(training_data);
    const xs = tf.tensor2d(training_data.map((item)=>
        item.inputs
    ));
    const ys = tf.tensor2d(training_data.map(item =>
        item.outputs
    ));

    p.setup = function () {
        p.createCanvas(400,400);
        cols = p.width / resolution;
        rows = p.height / resolution;

        let data:number[][] = []
        for(let i:number = 0; i < cols; i++){
            for(let j: number = 0; j < rows; j++){
                let x1:number = i / cols;
                let x2:number = j / rows;
                data.push(
                    //even though we are sending just pne array of two numbers, we have to instantiate it to [[number,number]]
                    [x1,x2]
                );
            }
        };
        inputs = tf.tensor2d(data);

        model = tf.sequential();
        let hidden = tf.layers.dense({
            inputShape: [2],
            units: 2,
            activation: 'sigmoid'
        });
        let output = tf.layers.dense({
            units: 1,
            activation: 'sigmoid'
        });
        model.add(hidden);
        model.add(output);

        const sgdOPt : tf.SGDOptimizer = tf.train.sgd(0.8);
        model.compile({
            optimizer: sgdOPt,
            loss: tf.losses.meanSquaredError
        })
       
    }
    async function trainModel(){
        return await model.fit(xs,ys,trainConf);
    }
  
    p.draw = function () {
        //p.noLoop();
        p.background(0);
        
        trainModel().then((result) =>{
            console.log("TRAINED");
            console.log(result.history.loss[0]);
            
            //REKURSIIVINEN LOOPPI, KORJAA toimimaan ilman noLoop()-funktiota
           // p.draw();  
            let index: number = 0;
            let response = model.predict(inputs) as tf.Tensor;

            for(let i:number = 0; i < cols; i++){
                for(let j: number = 0; j < rows; j++){
                    //p.noStroke();
                    //console.log(response.dataSync()[0]);
                    p.fill(response.dataSync()[index] * 255);
                    p.rect(i * resolution, j * resolution, resolution, resolution);
                    index++;
                }
            } 
        });
    }
}
  
new p5(sketch)