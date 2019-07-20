import {Pala} from "./Palat.js"
import Mato from "./Mato.js"
export default class Lauta {
    x_koko: number;
    y_koko: number;
    valit: number;
    //Declare 2d-array
    grid:Pala[][];
    constructor(korkeus: number, leveys: number){
        //Alusta 2d-array
        this.grid = [];
        this.x_koko = leveys;
        this.y_koko = korkeus;
        for(let i:number = 0; i < this.x_koko; i++){
            this.grid[i]= [];
            for(let j:number = 0; j < this.y_koko; j++){
                this.grid[i][j] = new Pala(i,j);
            }
        }
    }
    piirra(mato:Mato,ctx:CanvasRenderingContext2D){
        //tallentaa oletuksena nykyisen canvaksen kunnon
        //ctx.save();
        //Piirrä kaikki laudan palat mustaksi
        this.grid.forEach(rivi => {
            rivi.forEach(pala => {
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
        });
    }
}