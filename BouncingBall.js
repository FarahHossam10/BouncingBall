const canvas = document.getElementById("bBalls");
const ctx = canvas.getContext("2d");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
function random(min , max){
       const num = Math.floor(Math.random() * (max-min+1) + min);
       return num;
}
class Ball{
    constructor(x  , y , velx , vely , color , size){
        this.x = x ;
        this.y = y;
        this.velx = velx;  //the value to change place of ball 
        this.vely = vely;
        this.color = color;
        this.size = size; //radius
    }
    draw(){
        ctx.beginPath(); //start drawing
        ctx.fillStyle = this.color;
        ctx.arc(this.x , this.y , this.size , 0 , 2*Math.PI );  //to draw a circle 
        ctx.fill();  //finish drawing
    }
    move(){
        if((this.x + this.size) >= width || (this.x - this.size) <= 0){
            this.velx = -(this.velx);
        }
        if((this.y + this.size) >= height || (this.y - this.size) <= 0 ){
            this.vely = -(this.vely);
        }
        this.x += this.velx;
        this.y += this.vely;
    }
    overlapping(){
        for(let j = 0; j<balls.length ; j++){
            if(!(this === balls[j])){
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if(dist < this.size + balls[j].size){
                    balls[j].color = this.color =  `rgb(${random(0,255)} , ${random(0,255)} , ${random(0,255)})`;
                }
            }
        }
    }
}
let balls = [];
while(balls.length < 25){
   let size = random(10 , 25);
   let ball = new Ball(random(0 + size , width - size), random(0 + size , height - size) , random(-7 , 5) , random(-7 , 5) , `rgb(${random(0,255)} , ${random(0,255)} , ${random(0,255)})` , size);
   balls.push(ball);
}
function display(){
    ctx.fillStyle = 'rgba(0,0,0,.20)';
    ctx.fillRect(0,0, width , height);
    for(let i = 0 ; i < balls.length ; i++){
        balls[i].draw();
        balls[i].move();
        balls[i].overlapping();
    }
    //requestAnimationFrame(display);
}
display();

