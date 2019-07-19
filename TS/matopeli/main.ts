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
let mato = new Mato();
let omena = new Omena(getRandomIntInclusive(0, x_koko-1), getRandomIntInclusive(0,y_koko-1));

lauta.piirra(mato,ctx);
mato.piirra(lauta,ctx);
omena.piirra(ctx);
 
document.addEventListener('keypress', (event) =>{
    let uusiOmppu: boolean;
    mato.Liiku(event.key);
    uusiOmppu = mato.OsumaTarkistus(ctx,lauta,omena);
    if(uusiOmppu){
        omena.x_sijainti = getRandomIntInclusive(0,x_koko-1);
        omena.y_sijainti = getRandomIntInclusive(0,y_koko-1);
    }
    omena.piirra(ctx);
})
