import Mato from "./Mato.js"
import * as Chance from "chance"
interface PalaConf {
    //Palojen muoto
    x_koko:number;
    y_koko:number;
    x_sijainti: number;
    y_sijainti: number;
    vari: string;
    //Kuinka tehdään constructor interfaceen?
}


export class Pala implements PalaConf{
    //Pöydän pala
    x_koko:number = 25;
    y_koko:number = 25;
    x_sijainti: number;
    y_sijainti: number;
    x_coord:number;
    y_coord:number;
    vari: string;
    constructor(x_sijainti:number, y_sijainti:number)
    {
        this.x_sijainti = x_sijainti;
        this.y_sijainti = y_sijainti;
        this.x_coord = this.x_koko * this.x_sijainti;
        this.y_coord = this.y_koko * this.y_sijainti;
        this.vari = "black";
    }
}

export class MatoPala extends Pala{
    //Madon pala
    constructor(x_sijainti:number, y_sijainti:number){
        super(x_sijainti,y_sijainti);
        this.vari = "white";
    }
}

let getRandomIntInclusive: Function = (min, max) => {
    return Chance().integer({min,max});
}

export class Omena extends Pala {
    faces = [{
        1 : "⊙﹏⊙",
        2 : "ಠ_ಠ",
        3 : "ಠ‿ಠ",
        4 : "ʘ‿ʘ",
        5 : "(•ω•)",
        6 : "(°ʖ°)",
        7 : "(ツ)",
    }];
    faceInd : number = getRandomIntInclusive(1, Object.keys(this.faces[0]).length);
    constructor(x_sijainti:number, y_sijainti:number){
        super(x_sijainti,y_sijainti);
        this.vari = "red";
    }
    tarkistaMato(mato:Mato):boolean{
        //Osuuko omenan uusi sijainti matoon
        let osuma: boolean;
        for(let i = 0; i < mato.kroppa.length; i++){
            if(mato.kroppa[i].x_sijainti !== this.x_sijainti || mato.kroppa[i].y_sijainti !== this.y_sijainti){
                osuma = false;
            }
            else{
                console.log("Omena yritti syntyä matoon");
                osuma = true;
                break;
            }
        }
        return osuma;   
    }
    getFace():void{
        this.faceInd  = getRandomIntInclusive(1, Object.keys(this.faces[0]).length);
        console.log(Object.keys(this.faces[0]).length);
    }
    piirra(ctx:CanvasRenderingContext2D){
        this.x_coord = this.x_koko * this.x_sijainti;
        this.y_coord = this.y_koko * this.y_sijainti;
        ctx.beginPath();
        ctx.rect(
            this.x_coord,
            this.y_coord,
            this.x_koko,
            this.y_koko
        )
        ctx.fillStyle = this.vari;
        ctx.fill();
        ctx.strokeStyle = this.vari;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.font = "12pt sans-serif";
        
        /* console.log(this.faces);
        console.log(this.faces); */
        //get random face 
        ctx.strokeText(this.faces[0][this.faceInd], this.x_coord-3, this.y_coord+18);
        ctx.closePath();
    }
}

