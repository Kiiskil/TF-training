https://www.youtube.com/watch?v=XdErOpUzupY
TensorFlow JS Tutorial - Build a neural network with TensorFlow for Beginners

https://gist.github.com/learncodeacademy/a96d80a29538c7625652493c2407b6be
learncodeacademy/iris-tensorflow-js.js


In your `tsconfig.json` file, under compiler options, add these two lines:

{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true  
  }
}

Then you can import json like this:

// Typescript
// app.ts

import data from './example.json';

const word = (<any>data).name;

console.log(word); // output 'testing'

OR

Use 

*var iris = require("./iris.json")*

because it's a file not a module

//sudo npm install node
//npm install @tensorflow/tfjs-node
//sudo npm install @tensorflow/tfjs
//npm install --save @tensorflow/tfjs
//sudo npm install --save @tensorflow/tfjs-node
//sudo npm install --save @tensorflow/tfjs
//tsc iris.ts OR tsc --module commonjs iris.ts
//node iris.js

RESULTS
-------

DONE! 6110
Tensor
    [[0.9849404, 0.0002239, 0.0200558],
     [0.0033981, 0.9268655, 0.0775802],
     [0.012237 , 0.0280173, 0.9600013]]

so, this NN thinks pretty strongly that first example is Setosa(98%), second Virginica(92%) and third Versicolor(96%)

var kvArray = [{slength: 1, swidth:10},
              {slength: 2, swidth:20},
              {slength: 3, swidth:30}];

const map = kvArray.map(item => [
  item.slength, item.swidth
]);

console.log(map) // Array [ Array[1,10], Array[2,20], Array[3,30] ]