
interface PalaConf {
    x_koko:number;
    y_koko:number;
    x_sijainti: number;
    y_sijainti: number;
    vari: string;
    //Kuinka tehdään constructor interfaceen?
}

class Pala implements PalaConf{
    x_koko:number = 40;
    y_koko:number = 40;
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

export class Mato {
    kroppa: MatoPala[];
    
    constructor(){
        this.kroppa = [];
        for(let i = 0; i < 5; i++){
            this.kroppa.push(new MatoPala(5,i))
        }
    }
    Liiku(suunta:string,ctx:CanvasRenderingContext2D):void {
        let lastIndex = this.kroppa.length-1;
        if(suunta ==="a"){
            this.kroppa[lastIndex].x_sijainti = this.kroppa[lastIndex].x_sijainti -1;
        }
        this.paivitaKroppa();
        this.piirra(ctx);
    }
    Kasva(x:number, y:number):void {
        this.kroppa.push(new MatoPala(x,y))
    }
    paivitaKroppa(){
        this.kroppa.forEach(pala => {
            pala.x_coord = pala.x_koko * pala.x_sijainti;
            pala.y_coord = pala.y_koko * pala.y_sijainti;
        });   
    }
    piirra(ctx:CanvasRenderingContext2D){
        //tallentaa oletuksena nykyisen canvaksen kunnon
        ctx.save();
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
            ctx.lineWidth = 5;
            ctx.stroke();
            ctx.closePath();
        });
        ctx.restore();
    }

}

export class MatoPala extends Pala{
    constructor(x: number,y:number){
        super(x,y);
        this.vari = "white";
    }
}

export class Omena extends Pala {
    constructor(x: number,y:number){
        super(x,y);
        /* this.x_sijainti = x;
        this.y_sijainti = y; */
        this.vari = "red";
    }
    piirra(ctx:CanvasRenderingContext2D){
        //tallentaa oletuksena nykyisen canvaksen kunnon
        ctx.save();
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
        ctx.restore();
    }
}

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
    piirra(ctx:CanvasRenderingContext2D){
        //tallentaa oletuksena nykyisen canvaksen kunnon
        ctx.save();
        this.grid.forEach(rivi => {
            rivi.forEach(pala => {
                ctx.beginPath();
            //ctx.rect((lauta.grid[0][0].x_koko), (lauta.grid[0][0].y_koko),lauta.grid[0][0].x_coord, lauta.grid[0][0].y_coord);
            ctx.rect(
                pala.x_coord,
                pala.y_coord,
                pala.x_koko,
                pala.y_koko
                )
            ctx.fillStyle = pala.vari;
            ctx.fill();
            ctx.strokeStyle ="white";
            ctx.lineWidth = 5;
            ctx.stroke();
            ctx.closePath();
            });
        });
        ctx.restore();

    }
}