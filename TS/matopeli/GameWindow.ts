export default class GameWindow{
    //size of the board
    x_koko:number = 30;
    y_koko:number = 30;
    canvas:HTMLCanvasElement; 
    ctx:CanvasRenderingContext2D;
    //game speed in ms (refresh rate)
    interVal: number = 100; 
    timerHandler:TimerHandler;
    constructor(interVal?:number){
        if(interVal){
            this.interVal = interVal;
        }
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
    }
}