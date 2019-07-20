import {MatoPala} from "./Palat.js"
import Lauta from "./Lauta.js"
import {Omena} from "./Palat.js"

export default class Mato {
    kroppa: MatoPala[];
    pisteet:number = 0;
    constructor(){
        this.kroppa = [];
        for(let i = 0; i < 5; i++){
            this.kroppa.push(new MatoPala(i,5))
        }
    }
    Liiku(suunta:string):void {
        let lastIndex = this.kroppa.length-1;
        if(suunta == null){

        }
        else if(suunta === "a"){
            this.kroppa.push(new MatoPala(this.kroppa[lastIndex].x_sijainti-1, this.kroppa[lastIndex].y_sijainti))
        }
        else if(suunta === "d"){
            this.kroppa.push(new MatoPala(this.kroppa[lastIndex].x_sijainti +1,this.kroppa[lastIndex].y_sijainti))
        }
        else if(suunta === "w") {
            this.kroppa.push(new MatoPala(this.kroppa[lastIndex].x_sijainti,this.kroppa[lastIndex].y_sijainti-1))
        }
        else if (suunta === "s"){
            this.kroppa.push(new MatoPala(this.kroppa[lastIndex].x_sijainti,this.kroppa[lastIndex].y_sijainti+1))
        } 
    }
    OsumaTarkistus(lauta:Lauta):boolean{
        let lastIndex = this.kroppa.length-1;
        let osuma: boolean = false;
        //syökö itsensä
        for(let i:number = 0; i < this.kroppa.length-1;i++){
            if(this.kroppa[i].x_sijainti == this.kroppa[lastIndex].x_sijainti && this.kroppa[i].y_sijainti == this.kroppa[lastIndex].y_sijainti){
                osuma = true;
                break;
            }
            else{
                osuma = false;
            }
        }
        //osuuko seiniin
        if (this.kroppa[lastIndex].x_sijainti == lauta.grid.length || this.kroppa[lastIndex].y_sijainti == lauta.grid.length 
            || this.kroppa[lastIndex].x_sijainti < 0 ||this.kroppa[lastIndex].y_sijainti < 0){
           // GameWindow.prototype.GameOver();
           osuma = true;
        }
        return osuma;
    }
    SoikoOmenan(omena:Omena){
        let lastIndex = this.kroppa.length-1;
        //osuuko omenaan
        if (this.kroppa[lastIndex].x_sijainti !== omena.x_sijainti || this.kroppa[lastIndex].y_sijainti !== omena.y_sijainti){
            this.kroppa.splice(0,1);
            this.paivitaKroppa();
            return false;
        }
        else{
            console.log("omena syöty");
            this.pisteet += 10;
            this.paivitaKroppa();
            return true;
        } 
    }

    paivitaKroppa(){
        this.kroppa.forEach(pala => {
            pala.x_coord = pala.x_koko * pala.x_sijainti;
            pala.y_coord = pala.y_koko * pala.y_sijainti;
        });   
    }
    piirra(lauta:Lauta,ctx:CanvasRenderingContext2D){
        //tallentaa oletuksena nykyisen canvaksen kunnon
        //ctx.save();
        //lauta.piirra(this,ctx);
        this.kroppa.forEach(pala => {
            ctx.beginPath();
            ctx.rect(
                pala.x_coord,
                pala.y_coord,
                pala.x_koko,
                pala.y_koko
                )
            ctx.fillStyle = pala.vari;
            ctx.fill();
            ctx.strokeStyle ="white";
            ctx.lineWidth = pala.y_koko/10;
            ctx.stroke();
            ctx.closePath();
        });
        ctx.restore();
    }
}