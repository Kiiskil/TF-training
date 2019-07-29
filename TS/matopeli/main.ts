import Lauta from "./Lauta.js"
import Mato from "./Mato.js"
import {Omena} from "./Palat.js"
import GameWindow from "./GameWindow.js"
import * as Chance from "chance"
import * as _ from "lodash"; //External library named lodash


//Tee canvas-divin koosta dynaamiesti muuttuva
//Ompun ilmestymisen sijainti voi jäädä looppaa jos tilaa ei ole (rakenna jonkinlainen pick-järjestelmä)
//kaksi gameover-boolean-tarkistusta
//Tee niin, että matoja ja omenia voi olla useampi kentällä. Tätä varten NN input ei voi olla pixelidata kentästä
//tosin riittää jos vain yksi näytetään

let suunta:string;
let canvas = new GameWindow();
let lauta = new Lauta(canvas.x_koko,canvas.y_koko);

function GameOver(interval,pisteet:number){
    let newGame: boolean = false;
    clearInterval(interval);
    /* newGame = window.confirm("GAME OVER\nPisteesi: "+ pisteet +"\nNew Game?")
    if(newGame){
        init();
    } */
    init();
}

function Piirra(lauta:Lauta, canvas:GameWindow,timer?:number){
    //Tyhjää kenttä
    let mato = lauta.mato;
    let omena = lauta.omena;
    canvas.ctx.clearRect(0,0, canvas.canvas.width, canvas.canvas.height);
    if(suunta){
        //jos madolla on suunta
        mato.Liiku(suunta);
        console.log("mato liikkuu pääohjelmassa");
        let uusiOmppu: boolean;
        let gameover: boolean;
        //osuuko mato mihinkään
        gameover = mato.OsumaTarkistus(lauta);
        uusiOmppu = mato.SoikoOmenan(omena);
        if(gameover){
            console.log(mato.kroppa[0].x_sijainti)
            gameover = false;
            GameOver(timer,mato.pisteet);
            
        }
        if(uusiOmppu){
            console.log("uusi omena");
            omena.x_sijainti = getRandomIntInclusive(0,canvas.x_koko-1);
            omena.y_sijainti = getRandomIntInclusive(0,canvas.y_koko-1);
            omena.getFace();
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
    }
    //Päivitä pisteet näytölle
    document.getElementById("pisteet").innerHTML = "Pisteet: "+ mato.pisteet.toString();
    console.log("//Piirrä oliot näytölle");
    lauta.piirra(canvas.ctx);
    mato.piirra(canvas.ctx);
    omena.piirra(canvas.ctx);
};

let getRandomIntInclusive: Function = (min, max) => {
    return Chance().integer({min,max});
}

function init(){
    //Tee uudet oliot
    suunta = null;
    
    let mato = new Mato();
    
    //omenalle sattumanvarainen sijainti
    let omena = new Omena(getRandomIntInclusive(0, canvas.x_koko-1), getRandomIntInclusive(0,canvas.y_koko-1));
    //Osuuko omena matoon
    let osuma = omena.tarkistaMato(mato);
    if(osuma){
        do{
            //Looppaa kunnes omenalle löytyy vapaa paikka
            omena.x_sijainti = getRandomIntInclusive(0,canvas.x_koko-1);
            omena.y_sijainti = getRandomIntInclusive(0,canvas.y_koko-1);
            osuma = omena.tarkistaMato(mato);
        }
        while(osuma);
    }
    lauta.mato = mato;
    lauta.omena = omena;
    console.log("//eka piirto");
    Piirra(lauta,canvas);
}
init();
//Add event listener for keypresses
document.addEventListener('keypress', (event) =>{
    //Peli käynnistyy kun pelaaja antaa suunnan
    if(event.key === "w" || event.key === "a" || event.key === "s" || event.key === "d"){
        suunta = event.key;
        console.log("nappia painettu");
            //Pyöritetään peliä kunnes gameover
            //Pelkkä piirra() ilman intervalia ja gameoveria mahdollistaa liikkumisen haluttaessa
            //Piirra(lauta,canvas);
            let timer = setInterval(()=>{
                suunta = lauta.mato.aivot.predict(lauta.getPixelData(canvas));
                Piirra(lauta,canvas,timer), canvas.interVal;
            });
            //gameOver = true;
    }
    else{
        alert("WASD-napeilla liikkuu");
    } 
})
 
