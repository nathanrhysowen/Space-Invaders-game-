let points = 0;
let lasers = []; //creates array for lasers//
let enemies = []; // creates array for enemies// 
let enemy;

function setup() {
  createCanvas(600,600);

  for(let i = 0; i < 6; i++){ //creates 6 enemies//
    //spawns an enemy at a random x and y above the visible screen//
    let enemy = {
      x: random(0 ,width),
      y: random(-400,0)
    }
    enemies.push(enemy)
  }
}

function draw() {
  background(220);
  circle(mouseX,570,25); //creating the player//
  for(let laser of lasers){ //grabs laser from the array//
    rect(laser.x,laser.y,4,20) //creating the laser object//
    laser.y -= 12; //speed of which the laser moves//
  }

  for(let enemy of enemies){ //pulls enemies from array//
    enemy.y += 1; //speed of which the enemies are falling//
    circle(enemy.x,enemy.y,15) //enemy shape//
    if (enemy.y > height){
     text("GAME OVER", 200, 300);
     noLoop();

  }

   //collision detection//
  for (let enemy of enemies){
    for(let laser of lasers){
      if(dist(enemy.x,enemy.y,laser.x,laser.y) < 10){
         enemies.splice(enemies.indexOf(enemy), 1); //ene
         lasers.splice(lasers.indexOf(laser), 1)
         points +=1;
      }
    }
  }
  
    mousePressed();
    pointsystem();

  
}

function mousePressed(){
 //defining the location where the lasers spawn//
  let laser = {
    x: mouseX,
    y: 570,
  }
  lasers.push(laser); 
}

function pointsystem(){
  textSize(30);
  text(points,25,30);

}


}
