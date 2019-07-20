import Lauta from "./Lauta.js"
import Mato from "./Mato.js"
import {Omena} from "./Palat.js"
import {GameWindow} from "./GameWindow.js"
import * as Chance from "chance"
import * as _ from "lodash"; //External library named lodash
import * as p5 from "p5";
//Tee canvas-divin koosta dynaamiesti muuttuva
//Ompun ilmestymisen sijainti voi jäädä looppaa jos tilaa ei ole (rakenna jonkinlainen pick-järjestelmä)
//kaksi gameover-boolean-tarkistusta

let suunta:string;
let gameOver:boolean = false;

function GameOver(interval,pisteet:number){
    let newGame: boolean = false;
    clearInterval(interval);
    newGame = window.confirm("GAME OVER\nPisteesi: "+ pisteet +"\nNew Game?")
    if(newGame){
        //gameOver = false;
        location.reload();
    }
}

//let animationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

function Piirra(mato:Mato,lauta:Lauta, omena:Omena, canvas:GameWindow,timer?:number){
    canvas.ctx.clearRect(0,0, canvas.canvas.width, canvas.canvas.height);
    if(suunta){
        mato.Liiku(suunta);
        let uusiOmppu: boolean;
        let gameover: boolean;
        gameover = mato.OsumaTarkistus(lauta);
        uusiOmppu = mato.SoikoOmenan(omena);
        //console.log(uusiOmppu);
        if(gameover){
            GameOver(timer,mato.pisteet);
        }
        if(uusiOmppu){
            console.log("uusi omena");
            omena.x_sijainti = getRandomIntInclusive(0,canvas.x_koko-1);
            omena.y_sijainti = getRandomIntInclusive(0,canvas.y_koko-1);
            let osuma = omena.tarkistaMato(mato);
            if(osuma){
                do{
                    omena.x_sijainti = getRandomIntInclusive(0,canvas.x_koko-1);
                    omena.y_sijainti = getRandomIntInclusive(0,canvas.y_koko-1);
                    osuma = omena.tarkistaMato(mato);
                }
                while(osuma);
            }
        }
        //animationFrame(()=>Piirra(ctx,mato,lauta,omena));
    }
    document.getElementById("pisteet").innerHTML = "Pisteet: "+ mato.pisteet.toString();
    lauta.piirra(mato,canvas.ctx);
    mato.piirra(lauta,canvas.ctx);
    omena.piirra(canvas.ctx);
};

let getRandomIntInclusive: Function = (min, max) => {
    return Chance().integer({min,max});
}

function init(){
    let canvas = new GameWindow();
    let lauta = new Lauta(canvas.x_koko,canvas.y_koko);
    let mato = new Mato();
    let omena = new Omena(getRandomIntInclusive(0, canvas.x_koko-1), getRandomIntInclusive(0,canvas.y_koko-1));
    let osuma = omena.tarkistaMato(mato);
    //console.log(osuma);
    if(osuma){
        do{
            omena.x_sijainti = getRandomIntInclusive(0,canvas.x_koko-1);
            omena.y_sijainti = getRandomIntInclusive(0,canvas.y_koko-1);
            osuma = omena.tarkistaMato(mato);
        }
        while(osuma);
    }
    Piirra(mato,lauta,omena,canvas);
    document.addEventListener('keypress', (event) =>{
        //console.log(suunta);
        suunta = event.key;
        if(!gameOver){
            let timer = setInterval(()=>Piirra(mato,lauta,omena,canvas,timer), canvas.interVal);
            gameOver = true;
        }
        //Piirra(ctx,mato,lauta,omena);
    })
}
init();
 
