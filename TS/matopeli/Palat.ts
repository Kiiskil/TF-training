import Mato from "./Mato.js"
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
    constructor(x:number, y:number)
    {
        this.x_sijainti = x;
        this.y_sijainti = y;
        this.x_coord = this.x_koko * this.x_sijainti;
        this.y_coord = this.y_koko * this.y_sijainti;
        this.vari = "black";
    }
}

export class MatoPala extends Pala{
    //Madon pala
    constructor(x: number,y:number){
        super(x,y);
        this.vari = "white";
    }
}

export class Omena extends Pala {
    constructor(x: number,y:number){
        super(x,y);
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
        ctx.closePath();
    }
}

