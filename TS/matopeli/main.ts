import Lauta from "./matopeli.js"
import {Mato} from "./matopeli.js"
import {Omena} from "./matopeli.js"
import * as Chance from "chance";
import * as _ from "lodash"; //External library named lodash
import * as p5 from "p5";


let x_koko = 20;
let y_koko = 20;

let getRandomIntInclusive: Function = (min, max) => {
    return Chance().integer({min,max});
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = <CanvasRenderingContext2D> canvas.getContext('2d');

let lauta = new Lauta(x_koko,y_koko);
console.log(lauta.grid[0][0]);
let mato = new Mato();
let omena = new Omena(getRandomIntInclusive(0, x_koko-1), getRandomIntInclusive(0,y_koko-1));

lauta.piirra(ctx);
mato.piirra(ctx);
omena.piirra(ctx);
 console.log(mato);
 console.log(omena);

document.addEventListener('keypress', (event) =>{
    console.log(event.key);
    mato.Liiku(event.key,ctx);
})