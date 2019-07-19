
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
            this.kroppa.push(new MatoPala(i,5))
        }
    }
    Liiku(suunta:string):void {
        let lastIndex = this.kroppa.length-1;
        if(suunta === "a"){
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
    OsumaTarkistus(ctx:CanvasRenderingContext2D, lauta:Lauta, omena:Omena):boolean{
        let lastIndex = this.kroppa.length-1;
        let osuma: boolean = false;
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
                //gameOver();
                console.log("GAMEOVER")
        }
        else if(osuma){
             //gameOver();
             console.log("GAMEOVER")
        }
        //osuuko omenaan
        if (this.kroppa[lastIndex].x_sijainti !== omena.x_sijainti || this.kroppa[lastIndex].y_sijainti !== omena.y_sijainti){
            this.kroppa.splice(0,1);
            this.paivitaKroppa();
            return false;
        }
        else {
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
        this.vari = "red";
    }
    tarkistaMato(mato:Mato):boolean{
        let osuma: boolean;
        for(let i = 0; i < mato.kroppa.length; i++){
            if(mato.kroppa[i].x_sijainti !== this.x_sijainti || mato.kroppa[i].y_sijainti !== this.y_sijainti){
                osuma = false;
            }
            else{
                console.log("BINGO");
                osuma = true;
                break;
            }
        }
        return osuma;   
    }
    piirra(ctx:CanvasRenderingContext2D){
        this.x_coord = this.x_koko * this.x_sijainti;
        this.y_coord = this.y_koko * this.y_sijainti;
        //ctx.save();
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
        //ctx.restore();
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
    piirra(mato:Mato,ctx:CanvasRenderingContext2D){
        //tallentaa oletuksena nykyisen canvaksen kunnon
        ctx.save();
        //Tää pitää korjata, aiavan saatanan raskas toimitus
        //Tarkista onko mato missään kohdassa ja jos ei, piirrä se mustaksi
        this.grid.forEach(rivi => {
            rivi.forEach(pala => {
                mato.kroppa.forEach(matopala => {
                    if(matopala.x_sijainti != pala.x_sijainti || matopala.y_sijainti != pala.y_sijainti){
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
                    }
                });
            });
        });
        //ctx.restore();

    }
}