let points = 0;
let lasers = []; //creates array for lasers//
let enemies = []; // creates array for enemies// 
let stage = 0; 
let font;






function setup() {
  createCanvas(600,600);
  rectMode(CENTER);

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
  if (stage == 0){
    titlescreen();
  }

  if (stage == 1){
    level1();
  }

  if (stage == 2){
    level2();
  }
  
  
}








function titlescreen(){
background(0);
//red border//
stroke(255,0,0);
noFill()
strokeWeight(10);
rect(height/2,width/2,height,width);
noStroke();

//words//
fill(255,0,0);
textSize(55);
text('SPACE INVADERS', 65, 100);



fill(255,0,0);
textSize(30);
text('PLAY GAME', 220, 280);

strokeWeight(5);
fill(255,0,0);
line(180,300,260,300);


fill(255,0,0);
textSize(25);
text('HOW TO PLAY', 220, 420);

fill(255,0,0);
textSize(13);
text('1.Use mouse courser to move along the X-axis.', 176, 440);
text('2.Use left mouse button to fire lasers.', 200, 460);
text('3.Defeat all imvaders before they reach the bottom', 165, 480);

noFill()
stroke(255,0,0);
strokeWeight(3);

rect(305,270,200,50);


}








function level1(){

  background(0);
  circle(mouseX,570,25); //creating the player//
  for(let laser of lasers){ //grabs laser from the array//
    rect(laser.x,laser.y,4,20) //creating the laser object//
    laser.y -= 12; //speed of which the laser moves//
  }

  for(let enemy of enemies){ //pulls enemies from array//
    enemy.y += 1; //speed of which the enemies are falling//
    circle(enemy.x,enemy.y,15) //enemy shape//
     if (enemy.y > height){
      text("GAME OVER", 200, 300); //if enemy reaches bottom of screen, game loop ends and death screen appears//
      noLoop();
     }

  

  }

   //collision detection//
  for (let enemy of enemies){
    for(let laser of lasers){
      if(dist(enemy.x,enemy.y,laser.x,laser.y) < 10){
         enemies.splice(enemies.indexOf(enemy), 1); //when lasers and enemies collide, the objexts dissappear//
         lasers.splice(lasers.indexOf(laser), 1)
          points +=1; //adds one point//
      }
    }
  }
  
    
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

 










function level2(){
background(0);

stroke(255,0,0);
noFill()
strokeWeight(3);
rect(width/2, height/2, width, height);
noStroke();

  }



