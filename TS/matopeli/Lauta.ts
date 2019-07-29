import {Pala, Omena} from "./Palat.js"

import GameWindow from "./GameWindow.js"
import Mato from "./Mato.js";
export default class Lauta {
    x_koko: number;
    y_koko: number;
    valit: number;
    mato:Mato;
    omena:Omena;
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
    piirra(ctx:CanvasRenderingContext2D){
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
                        ctx.strokeStyle ="gray";
                        ctx.lineWidth = pala.y_koko/10;
                        ctx.stroke();
                        ctx.closePath();
            });
        });
    }
    getPixelData(canvas: GameWindow){
        //kaiva pixelin värit joka ruudusta canvaksessa
        //ja lähetä ne pääohjelmaan yhtenä pitkänä arrayna
        let pixelData:number[][] = [];
        let numbers :number[] = [];
        for(let i:number =0; i < canvas.canvas.width/this.grid[0][0].x_koko; i++){
            for(let j:number =0; j < canvas.canvas.height/this.grid[0][0].y_koko; j++){
                let pixels = canvas.ctx.getImageData(i*this.grid[0][0].x_koko,j*this.grid[0][0].y_koko,1,1).data;
                //let numbers :number[] = [];
                pixels.forEach(nro => {
                    numbers.push(nro);
                });

                //pixelData.push(numbers);
            }
        }
        pixelData.push(numbers);
        //console.log(pixelData); 
        return pixelData;  
    }
}