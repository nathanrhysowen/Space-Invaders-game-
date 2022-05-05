let points = 0; 
let lasers = []; 
let enemies = []; 
let enemies2 = []; 
let stage = 0; 
let font;
level2points = 10;
let lasersound;
let i = 0;
let stage1music;
let menumusic;
let stage2music;
let playermodel;
let enemymodel;
let cats = [];
let hitboxes = []
let enemymodel2;
let bonuspoints = 16;



//preloading sounds, images and fonts//
function preload(){
 
lasersound = loadSound("Sounds/lasersound.wav");
font = loadFont('Sounds/PressStart2P-Regular.ttf');
stage1music = loadSound("Sounds/Stage1music.mp3");
stage2music = loadSound("Sounds/Stage2Music.mp3");
menumusic = loadSound("Sounds/MenuMusic.mp3");
explosion = loadSound("Sounds/explosion.mp3")
playermodel = loadImage("Sounds/playermodel.png")
enemymodel = loadImage("Sounds/enemymodel.png")
catmodel = loadImage("Sounds/catmodel.png")
enemymodel2 = loadImage("Sounds/enemymodellevel2.png")
bonuslevelmusic = loadSound("Sounds/bonuslevelmusic.mp3")
}



function setup() {
  createCanvas(600,600);
  rectMode(CENTER);
  imageMode(CENTER);
  //ellipseMode(CENTER)
  
  for(let i = 0; i < 6; i++){ //creates 6 enemies for level 1//
    //spawns an enemy at a random x and y above the visible screen//
    let enemy = {
      x: random(50,500),
      y: random(-400,0)
    }
    enemies.push(enemy);
  }

  

 

  for(let i = 0; i < 10; i++){ //creating enememies for level 2//
    let enemy2 = {
      x: random(50, 550),
      y: random(-400,0)
    }
    enemies2.push(enemy2);
  }


  for(let i = 0; i < 6; i++){  //creating enemies for bonus level//
    let cat = {
      x: random(0, 550),
      y: random(-400,0)
    }
    cats.push(cat);
  }

 
  
  
}

    
    


function draw() {
 
 //allowing level progression using if statements//
  if (stage == 0){

    titlescreen();
  }

  if (stage == 1){
    level1();
  }

  if (stage == 2){
    level2();
  }

  if (stage == 3){
    winscreen();
  }

  if (stage == 4){
    bonuslevel();
  }

  if (stage == 5){
    thanksforplaying();
  }
  
  
  //playing stage music and stopping the previous stage music//
  if (stage == 0){
    if(!menumusic.isPlaying()){



    menumusic.play();
  }
  }

  if (stage == 1){
    if(!stage1music.isPlaying()){
    stage1music.play();
    menumusic.stop();
  }}

  if(stage == 2){
    if(!stage2music.isPlaying()){
      stage2music.play();
      stage1music.stop();
    }
  }

  if(stage == 4){
    if(!bonuslevelmusic.isPlaying()){
      bonuslevelmusic.play();
      stage2music.stop();
    }
  }
}








function titlescreen(){

background(0);  //background set to black//
//red border//
stroke(255,0,0);
noFill()
strokeWeight(10);
rect(height/2,width/2,height,width);
noStroke();

//words//
fill(255,0,0);
textSize(40);
textFont(font);
text('SPACE INVADERS', 20, 100);

//making the text blink and controlling the speed of which it blinks//

if (frameCount % 70<30){  
  fill (50);
  textSize(35);
  text('CLICK THE SCREEN', 20, 280);
  text('TO PLAY GAME',100,320);
}
else{
  fill(255)
  textSize(35);
  text('CLICK THE SCREEN', 20, 280);
  text('TO PLAY GAME',100,320);
}


fill(255,0,0);
textSize(25);
text('HOW TO PLAY', 160, 420);

fill(255,0,0);
textSize(9);
text('1.Use mouse courser to move along the X-axis.', 105, 440);
text('2.Use left mouse button to fire lasers.', 130, 460);
text('3.Defeat all imvaders before they reach the bottom', 90, 480);

noFill()
stroke(255,0,0);
strokeWeight(3);

//if the mouse is clikced, the game will begin//
if (mouseIsPressed == true){    
  stage = 1;
}



}








function level1(){

  
  //red border//
  background(0);

  stroke(255,0,0);
  noFill()
  strokeWeight(10);
  rect(width/2, height/2, width, height);
  
  //levell 1 text//
  noStroke();
  fill(255);
  textSize(20);
  textFont(font);
  text('Level: 1', 220,50);
  fill(255,0,0);
  
  image(playermodel,mouseX,550,60,50); //creating the player and allowing it to track the mouse along the X axis//
  
  for(let laser of lasers){ //grabs laser from the array//
    fill(255);
    noStroke();
    rect(laser.x -30,laser.y,4,30) //creating the laser object as a white rectangle//
    laser.y -= 12; //speed of which the laser moves//
  }

  for(let enemy of enemies){ //pulls enemies from array//
    enemy.y += 1; //speed of which the enemies are falling down the Y axis //
    fill(255,0,0);
    noStroke();
    
    image(enemymodel,enemy.x -20,enemy.y,50,50) //creating the enemy models and positioning them above the screen. (placing the image 20 to the left due to an error with the image collisions being too far to the left)//
   
    
  
    //if enemy reaches bottom of screen, game ends and death screen appears//
     if (enemy.y > height){
      fill(255,0,0);
      noStroke();
      strokeWeight(5)
      text("GAME OVER", 200, 300); 
      
     }

   

  

  }

   //collision detection//
  for (let enemy of enemies){
    for(let laser of lasers){
      if(dist(enemy.x,enemy.y,laser.x,laser.y) < 20){
         enemies.splice(enemies.indexOf(enemy), 1); 
         lasers.splice(lasers.indexOf(laser), 1) //when the distance between the enemy x and y and the lasers x and y is less that 20, enemies are removed from the array//
          points +=1; //adds one point//
          explosion.play(); //explosion sound effect//
          
        
      }
    }
  }
  
    
     pointsystem();
  

}








function mousePressed(){
 //defines the laser spawn location as the mouse's X axis //
  let laser = {
    x: mouseX + 30,
    y: 510,
    
  }
  lasers.push(laser); 
  lasersound.play(); //laser sound//
}



// point system//
function pointsystem(){
   textSize(30);
   textFont(font);
   text(points,25,50);
   if (points >= 6){   //if points reach 6, level 2 begins//
    stage = 2;}

   if (points >=16){  //if points reach 16, the win screen appears//
     stage = 3; }
   } 

   if (points >=22){ //if points reach 22, the thanks for playing screen appears//
     stage == 5;
   }
   
 

 


function level2(){
  background(0);

  stroke(255,0,0);
  noFill()
  strokeWeight(10);
  rect(width/2, height/2, width, height);
  
  noStroke();
  fill(255);
  textSize(20);
  textFont(font);
  text('Level: 2', 220,50);
  fill(255,0,0);
  image(playermodel,mouseX,550,60,50); //creating the player//
  
  for(let laser of lasers){ //grabs laser from the array//
    fill(255);
    noStroke();
    rect(laser.x -30,laser.y,4,30) //creating the laser object//
    laser.y -= 12; //speed of which the laser moves//
  }

  for(let enemy2 of enemies2){ //pulls enemies from array//
    enemy2.y += 1; //speed of which the enemies are falling//
    fill(255,0,0);
    noStroke();
    
    image(enemymodel2,enemy2.x -20,enemy2.y,50,50) //defining the second levels enemies location and playermodel//
    if (enemy2.y > height){
     fill(255,0,0);
     noStroke();
     strokeWeight(5)
     text("GAME OVER", 200, 300); //if enemy reaches bottom of screen, game ends and death screen appears//
      
     }

  

  }

   //collision detection//
  for (let enemy2 of enemies2){
    for(let laser of lasers){
      if(dist(enemy2.x,enemy2.y,laser.x,laser.y) < 20){ //when the distance between the enemies and lasers x and y axis are less than 20, enemies and lasers are removed from array//
         enemies2.splice(enemies2.indexOf(enemy2), 1); 
         lasers.splice(lasers.indexOf(laser), 1)
          points +=1; //adds one point//
          explosion.play();
      }
    }
  }
  
    
     pointsystem();
  


textSize(30);
textFont(font);
text(points,25,50);
 

}

//win screen//
function winscreen(){
  background(26, 255, 0);  //background green 


  fill(255);
  textFont(font);
  textSize(10);
  text('(click to enter bonus level)', 160,320);
    
  
 
  i = i + 1;
  if (frameCount % 70<30){  //making the text blink using framecount//
    fill (50);
    textFont(font);
    textSize(30);
    text('YOU WIN!',180,300);
  
}
  else{
    fill(255)
    textSize(30);
    textFont(font);
    text('YOU WIN!',180,300); }
  

 if (mouseIsPressed == true){  //if the mouse is pressed, proceed to the bonuns level//
  stage = 4;
 }

}



function bonuslevel(){
  background(0);
  
  
//red border//
  stroke(255,0,0);
  noFill()
  strokeWeight(10);
  rect(width/2, height/2, width, height);
  
  noStroke();
  fill(255);
  textSize(20);
  textFont(font);
  text('Bonus Level', 190,50);
  fill(255,0,0);
  image(playermodel,mouseX + 30,550,60,50); //creating the player and allowing it to follow the mouse along the x-axis //
  for(let laser of lasers){ //grabs laser from the array//
    fill(255);
    noStroke();
    rect(laser.x,laser.y,4,30) //creating the laser object as a white rectangle//
    laser.y -= 12; //speed of which the laser moves up the y-axis//
  }

  for(let cat of cats){ //pulls enemies from array//
    cat.y += 1; //speed of which the enemies are falling//
    
    fill(255,0,0);
    noStroke();
    image(catmodel,cat.x,cat.y,50,50) //defining enemy model and x and y//
    if (cat.y > height){  //if enemies reach bottom, the thanks for playing screen appears//
     stage = 5; }

  textSize(30);
  textFont(font);
  text(bonuspoints,25,50);

  

  }

   //collision detection//
  for (let cat of cats){
    for(let laser of lasers){
      if(dist(cat.x,cat.y,laser.x,laser.y) < 10){//if distance between lasers and cats is less than 10, objects will be removed from array//
         cats.splice(cats.indexOf(cat), 1); 
         lasers.splice(lasers.indexOf(laser), 1)
          bonuspoints +=1; //adds one point//
          explosion.play(); //explosion sound//

          if(bonuspoints >=22){
            stage = 5;
          }

          
      }
    }
  }
  
    
     
}


function thanksforplaying(){
  background(0);
//allowing text to blink using framecount//
  i = i + 1;
  if (frameCount % 70<30){
    fill (50);
    textFont(font);
    textSize(15);
    text('THANKS FOR PLAYING!',155,300);
  
}
  else{
    fill(255)
    textSize(15);
    textFont(font);
    text('THANKS FOR PLAYING!',155,300); }
  
  
  


}