import {MatoPala} from "./Palat.js"
import Lauta from "./Lauta.js"
import {Omena} from "./Palat.js"
import NeuralNetwork from "./TFNN.js"

export default class Mato {
    //Madon palat tallennetaan arrayhin (vika on pää)
    kroppa: MatoPala[];
    pisteet:number = 0;
    suunta:string;
    aivot: NeuralNetwork;

    faces = {
        //Alle tietyn pisterajan (key)
        20 : "⊙﹏⊙",
        40 : "ಠ_ಠ",
        60 : "ಠ‿ಠ",
        1000:"ʘ‿ʘ",
    }  
    constructor(){
        this.kroppa = [];
        for(let i = 0; i < 2; i++){
            this.kroppa.push(new MatoPala(i,5))
        }
        this.aivot = new NeuralNetwork(3600,1800,4);
        //console.log("Mato luotu");
        console.log(this.kroppa[0].x_sijainti)
    }
    Liiku(suunta:string):void {
        let lastIndex = this.kroppa.length-1;
        this.suunta = suunta;
        if(this.suunta === "a" ||
        this.suunta === "d" ||
        this.suunta === "w" ||
        this.suunta === "s"){
            //y-akselin suunta-stringiin lisätty alaviiva neljän parin saamiseksi (pareilla kutsutaan suunnanvalitsimia)
            let suunnat = {
                "a" : -1,
                "_a" : 0,
                "s" : 0,
                "_s" : +1,
                "w" : 0,
                "_w" : -1,
                "d" : +1,
                "_d" : 0
            }
            
            this.kroppa.push(
                new MatoPala(this.kroppa[lastIndex].x_sijainti + suunnat[suunta], 
                this.kroppa[lastIndex].y_sijainti + suunnat["_"+suunta])
            );
        };
        //console.log(this.kroppa.length +" X: "+this.kroppa[lastIndex].x_sijainti+" Y: "+this.kroppa[lastIndex].y_sijainti + " Index: "+lastIndex )
        //console.log(this.kroppa);
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
           osuma = true;
        }
        return osuma;
    }
    SoikoOmenan(omena:Omena){
        let lastIndex = this.kroppa.length-1;
        //osuuko omenaan
        if (this.kroppa[lastIndex].x_sijainti !== omena.x_sijainti || this.kroppa[lastIndex].y_sijainti !== omena.y_sijainti){
            //jos ei, poista ensimmäinen MatoPala
            this.kroppa.splice(0,1);
            return false;
        }
        else{
            //Älä poista palaa, koska omena syöty
            //console.log("omena syöty");
            this.pisteet += 2;
            return true;
        } 
    }

    piirra(ctx:CanvasRenderingContext2D){
        let lastIndex = this.kroppa.length;
        
        this.kroppa.forEach(pala => {
            pala.x_coord = pala.x_koko * pala.x_sijainti;
            pala.y_coord = pala.y_koko * pala.y_sijainti;
        });  
        
        //Madon joka palan piirto
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
            //Palojen reunat
            /* ctx.strokeStyle ="black";
            ctx.lineWidth = pala.y_koko/20;
            ctx.stroke(); */
            //Naama
            ctx.lineWidth = 1;
            ctx.strokeStyle = "red";
            ctx.font = "8pt sans-serif";
            for(let key in this.faces){
                if(this.pisteet < parseInt(key)){
                    ctx.strokeText(this.faces[key].valueOf(), this.kroppa[lastIndex-1].x_coord, this.kroppa[lastIndex-1].y_coord+16);
                    break;
                }
            }
            ctx.closePath();
        })
        //console.log("Mato piirretty");
    }
}