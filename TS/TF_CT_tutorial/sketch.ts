import * as p5 from "p5";
import * as tf from "@tensorflow/tfjs"
import * as layer from "./layers.js"

var sketch = function (p: p5) {
    //one way to use p5 with TS
    //Scalar(rank 0) = one number
    //vector(rank 1) = array of numbers = tensor1d
    //matrix (rank2) = matrix of numbers = tensor2d
    //tensor3d (rank 3) = array of matrices

    //Lowest level : core API -- highest amount of manual tinkering
    //Middle level : layers API --middle level amount of tinkering (Keras-project)
    //Highest level : ML5-lib -- Least amount of tinkering

    //Check CT-video on *tensorflow promises*
    p.setup = function () {
        p.noCanvas();
        
        let model = layer.Layers.model;
        console.log(model);
        
        
        
        
        
        const values: number[] = [];
        for(let i: number = 0; i < 30; i++){
            values.push(p.random(0,100));
        }

        const shape:[number, number, number] = [2, 5, 3]; //Type assertion
        const insTensor : tf.Tensor = tf.tensor3d(values, shape,'int32')

        //8 inputs
        //shape is 2 of 2*2 (2 rows * 2 columns)
        //datatype is int32
        const insTensor1 = tf.tensor([0, 0, 127, 255, 100, 50, 24, 54], [2, 2, 2], "int32")
        
        //DIFFERENT WAYS TO GET DATA OUT OF TENSOR
        //data.print(); //this is overridden toString()
        //console.log(insTensor.toString());
        //insTensor.data();//console.logs a "promise"
        //console.log(insTensor.dataSync()); // gives all data in tensor back after processing as array
        insTensor.data().then( (stuff) => {
            console.log(stuff);
        }); //actions after promise is handled tih *then()*

        //Tensors are immutable: they CANNOT be altered in anyway after they have been created.
        //one way to handle this is to use *tf.variable()*
        /**
         * Creates a new variable with the provided initial value.

            const x = tf.variable(tf.tensor([1, 2, 3]));
            x.assign(tf.tensor([4, 5, 6]));

            x.print();
         */
        const modInsTensor = tf.variable(insTensor);

        //OPERATIONS
        //element-wise means dealing with each element individually
        //matrix1 (2*2) = [ab
    //                     cd]
        //matrix2 (2*2) = [ef
    //                     gh]
        //matrix1 + matrix2 = [a+e b+f
    //                         c+g d+h]
        let e = tf.tensor3d(values, shape,'int32');
        let d = tf.tensor3d(values, shape,'int32');
        let f = e.add(d);
        // a.print();
        // b.print();
        //f.print();
        //Next commented code is used in draw()
        /* const values1: number[] = [];
        for(let i: number = 0; i < 15; i++){
            values1.push(p.random(0,100));
        }

        const shape1:[number, number] = [5, 3];
        let a = tf.tensor2d(values1, shape1,'int32');
        let b = tf.tensor2d(values1, shape1,'int32');
        let bb = b.transpose();

        // a.print();
        // b.print();
        
        //c = a.mul(b) //element-wise multiplication
        let c = a.matMul(bb); //matrix-multiplication. Takes ONLY rank2-tensors, AND shapes must be comptatible
        //meaning that columns.length of first matrix must be same as rows.length of second matrix
        c.print(); */

        
    }
  
    p.draw = function () {
        //Draw in p5 is automatically executed (kinda like setInterval())
        //MEMORY MANAGEMENT
        /**
         * memory leak is something in program, which continues to allocate memory over and over --> stack overflow
         * because tensors are immutable, they aren't deleted so they just accumulate in memory
         * so they must be manually disposed
         */
        const values1: number[] = [];
        for(let i: number = 0; i < 15; i++){
            values1.push(p.random(0,100));
        }

        const shape1:[number, number] = [5, 3];
        
        //One way to get rid of unused tensors is tf.tidy(), which is a wrapper. It executes provided function and reallocates used memory
        //You can use callback in tidy() itself, or make a NAMED FUNCTION which is passed to tidy() as param
        tf.tidy(() => {
            let a = tf.tensor2d(values1, shape1,'int32');
            let b = tf.tensor2d(values1, shape1,'int32');
            let b_t = b.transpose();
            let c = a.matMul(b_t); //matrix-multiplication. Takes ONLY rank2-tensors, AND shapes must be comptatible
            // a.print();
            // b.print();
            
            //c = a.mul(b) //element-wise multiplication
            //Disposing unused tensors manually
        /*     a.dispose();
            b.dispose();
            c.dispose(),
            b_t.dispose(); */
            
            //If one wishes to use a tensor later, it can be kept with 
            //tf.keep(a);
        });
        //console.log(tf.memory().numTensors);//Check how many tensors are stored in memory   
    }
  }
  
  new p5(sketch)