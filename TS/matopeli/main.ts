import Lauta from "./matopeli.js"
import {Mato} from "./matopeli.js"
import {Omena} from "./matopeli.js"
import * as Chance from "chance";
import * as _ from "lodash"; //External library named lodash
import * as p5 from "p5";
//Korjaa laudanpiirto, liian raskas (kolme foreach looppia peräkkäin).
//Ompun ilmestymisen sijainti voi jäädä looppaa jos tilaa ei ole (rakenna jonkinlainen pick-järjestelmä)
//laita pyörimään itsestään



let getRandomIntInclusive: Function = (min, max) => {
    return Chance().integer({min,max});
}

function init(){
    let x_koko = 30;
    let y_koko = 30;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = <CanvasRenderingContext2D> canvas.getContext('2d');
    let animationFrame = window.requestAnimationFrame;
    let lauta = new Lauta(x_koko,y_koko);
    let mato = new Mato();
    let omena = new Omena(getRandomIntInclusive(0, x_koko-1), getRandomIntInclusive(0,y_koko-1));
    let osuma = omena.tarkistaMato(mato);
    if(osuma){
        do{
            omena.x_sijainti = getRandomIntInclusive(0,x_koko-1);
            omena.y_sijainti = getRandomIntInclusive(0,y_koko-1);
            osuma = omena.tarkistaMato(mato);
        }
        while(osuma);
    }
    
    lauta.piirra(mato,ctx);
    mato.piirra(lauta,ctx);
    omena.piirra(ctx);
    console.log(lauta.grid.length)
    console.log(mato);
    
    document.addEventListener('keypress', (event) =>{
        
        let uusiOmppu: boolean;
        mato.Liiku(event.key);
        uusiOmppu = mato.OsumaTarkistus(ctx,lauta,omena);
        lauta.piirra(mato,ctx);
        mato.piirra(lauta,ctx);
        if(uusiOmppu){
            omena.x_sijainti = getRandomIntInclusive(0,x_koko-1);
            omena.y_sijainti = getRandomIntInclusive(0,y_koko-1);
            let osuma = omena.tarkistaMato(mato);
            if(osuma){
                do{
                    omena.x_sijainti = getRandomIntInclusive(0,x_koko-1);
                    omena.y_sijainti = getRandomIntInclusive(0,y_koko-1);
                    osuma = omena.tarkistaMato(mato);
                }
                while(osuma);
            }
        }
        omena.piirra(ctx);
    })
    
}
init();
 
