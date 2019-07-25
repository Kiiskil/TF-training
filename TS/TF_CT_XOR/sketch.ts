import * as p5 from "p5";
import * as tf from "@tensorflow/tfjs"
import { createCanvas } from "@tensorflow/tfjs-core/dist/backends/webgl/canvas_util";
import { mod, Tensor, Tensor2D, tensor2d, div } from "@tensorflow/tfjs";
    let div_grid = document.createElement('div');
    let div_info = document.createElement('div');
    let div_info_1 = document.createElement('div');
    div_grid.id = 'div_grid';
    div_info.id = 'div_info';
    div_info_1.id = 'div_info_1';
    div_grid.setAttribute("style","width:"+ 400 +"px;height:"+ 400 +"px;float:left;");
    div_info.setAttribute("style","width:"+ 400 +"px;height:"+ 200 +"px;float:left;");
    div_info_1.setAttribute("style","width:"+ 400 +"px;height:"+ 200 +"px;float:left;");
    window.document.body.appendChild(div_grid);
    window.document.body.appendChild(div_info);
    window.document.body.appendChild(div_info_1);
var sketch = function (p: p5) {
    let resolution = 20;
    let cols;
    let rows;
    let model: tf.Sequential;
    let inputs:tf.Tensor;
    let canvasDiv = document.getElementById('div_grid');
    let infoDiv = document.getElementById('div_info');
    let canvas:p5.Renderer;
    
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
        verbose : 1,  //0,1,2
        epochs : 10,
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
        let width = canvasDiv.offsetWidth;
        canvas = p.createCanvas(width,400);
        canvas.id("canvas");
        canvas.parent("div_grid");
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
    let count: number=0;
    p.draw = function () {
        let response_values;
        p.noLoop();
        p.background(0);
        tf.tidy(() =>{
            trainModel().then((result) =>{
                count++;
                console.log("TRAINED");
                console.log(result.history.loss[0]);
                infoDiv.innerHTML = 'Training Rounds: '+count+'<br> MeanSquaredError: '+(result.history.loss[0] as number).toFixed(5)+'<br />';
                p.redraw();    
            })
        });
        
            //REKURSIIVINEN LOOPPI, KORJAA toimimaan ilman noLoop()-funktiota
            // p.draw();  
        let index: number = 0;
        tf.tidy(()=>{
            let response = model.predict(inputs) as tf.Tensor;
            response_values = response.dataSync();
            for(let i:number = 0; i < cols; i++){
                for(let j: number = 0; j < rows; j++){
                    //p.noStroke();
                    //console.log(response.dataSync()[0]);
                    p.fill(response_values[index] * 255);
                    p.rect(i * resolution, j * resolution, resolution, resolution);
                    index++;
                }
            };
        });
        infoDiv.append('Memory leaks: '+tf.memory().numTensors)
        canvas.mouseClicked(()=>{
            div_info_1.innerHTML = '\nLocation info:<br>   -location: x: '+ (Math.floor(p.mouseX/cols)).toString() 
            +' y: '+ (Math.floor(p.mouseY/rows)).toString()
            +'<br>';
            let index = (Math.floor(p.mouseY/rows))
            +
            ((Math.floor(p.mouseX/cols))* rows );
            div_info_1.append("Predict-response index: "+index+" <br>  ");
            div_info_1.append('\n    value: '+response_values[index]);
        })
        
    };
}
  
new p5(sketch,window.document.getElementById('div_grid'));