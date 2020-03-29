export class Chronometer {
    constructor() {
      this.startTime = null;
      this.count = 0;
    }
    chrono(){
        if(this.startTime===null){
            return this.count;
        }else{
            let time = new Date() - this.startTime
            console.log(time)
            return time+this.count
        }
    }
    start(){
        this.startTime= new Date();
    }
    stop(){
        this.count = this.chrono();
        this.startTime = null
    }
    reset(){
        this.count = 0;
        this.startTime = null
    }
}