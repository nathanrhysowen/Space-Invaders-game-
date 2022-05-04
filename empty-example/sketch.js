let points = 0;
let lasers = []; //creates array for lasers//
let enemies = []; // creates array for level 1 enemies// 
let enemies2 = []; // creates array for level 2 enemies
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

background(0);
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


i = i + 1;
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
//fill(255,0,0);
//textSize(30);
//text('CLICK THE SCREEN', 70, 280);
//text('TO PLAY GAME',130,320);



strokeWeight(5);
fill(255,0,0);
line(180,300,260,300);


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
  
  noStroke();
  fill(255);
  textSize(20);
  textFont(font);
  text('Level: 1', 220,50);
  fill(255,0,0);
  
  image(playermodel,mouseX,550,60,50); //creating the player//
  
  for(let laser of lasers){ //grabs laser from the array//
    fill(255);
    noStroke();
    rect(laser.x -30,laser.y,4,30) //creating the laser object//
    laser.y -= 12; //speed of which the laser moves//
  }

  for(let enemy of enemies){ //pulls enemies from array//
    enemy.y += 1; //speed of which the enemies are falling//
    fill(255,0,0);
    noStroke();
    
    image(enemymodel,enemy.x -20,enemy.y,50,50)
   
    
   // ellipse(enemy.x + 15,enemy.y + 15,20,20) //enemy shape//
    
     if (enemy.y > height){
      fill(255,0,0);
      noStroke();
      strokeWeight(5)
      text("GAME OVER", 200, 300); //if enemy reaches bottom of screen, game loop ends and death screen appears//
      
     }

   

  

  }

   //collision detection//
  for (let enemy of enemies){
    for(let laser of lasers){
      if(dist(enemy.x,enemy.y,laser.x,laser.y) < 20){
         enemies.splice(enemies.indexOf(enemy), 1); //when lasers and enemies collide, the objexts dissappear//
         lasers.splice(lasers.indexOf(laser), 1)
          points +=1; //adds one point//
          explosion.play();
          
        
      }
    }
  }
  
    
     pointsystem();
  

}








function mousePressed(){
 //defining the location where the lasers spawn//
  let laser = {
    x: mouseX + 30,
    y: 510,
    
  }
  lasers.push(laser); 
  lasersound.play();
}



// if the points are greater than 10, stage 2 begins//
function pointsystem(){
   textSize(30);
   textFont(font);
   text(points,25,50);
   if (points >= 6){
    stage = 2;}

   if (points >=16){
     stage = 3; }
   } 

   if (points >=22){
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
    
    image(enemymodel2,enemy2.x -20,enemy2.y,50,50)
    if (enemy2.y > height){
     fill(255,0,0);
     noStroke();
     strokeWeight(5)
     text("GAME OVER", 200, 300); //if enemy reaches bottom of screen, game loop ends and death screen appears//
      
     }

  

  }

   //collision detection//
  for (let enemy2 of enemies2){
    for(let laser of lasers){
      if(dist(enemy2.x,enemy2.y,laser.x,laser.y) < 20){
         enemies2.splice(enemies2.indexOf(enemy2), 1); //when lasers and enemies collide, the objexts dissappear//
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


function winscreen(){
  background(26, 255, 0);

  points = 16;

  fill(255);
  textFont(font);
  textSize(10);
  text('(click to enter bonus level)', 160,320);
    
  
 
  i = i + 1;
  if (frameCount % 70<30){
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
  

 if (mouseIsPressed == true){
  stage = 4;
 }

}



function bonuslevel(){
  background(0);
  
  

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
  image(playermodel,mouseX + 30,550,60,50); //creating the player//
  for(let laser of lasers){ //grabs laser from the array//
    fill(255);
    noStroke();
    rect(laser.x,laser.y,4,30) //creating the laser object//
    laser.y -= 12; //speed of which the laser moves//
  }

  for(let cat of cats){ //pulls enemies from array//
    cat.y += 1; //speed of which the enemies are falling//
    
    fill(255,0,0);
    noStroke();
    image(catmodel,cat.x,cat.y,50,50) //enemy shape//
    if (cat.y > height){
     stage = 5; }

  textSize(30);
  textFont(font);
  text(bonuspoints,25,50);

  

  }

   //collision detection//
  for (let cat of cats){
    for(let laser of lasers){
      if(dist(cat.x,cat.y,laser.x,laser.y) < 10){
         cats.splice(cats.indexOf(cat), 1); //when lasers and enemies collide, the objexts dissappear//
         cats.splice(lasers.indexOf(laser), 1)
          bonuspoints +=1; //adds one point//
          explosion.play();

          if(bonuspoints >=21){
            stage = 5;
          }

          
      }
    }
  }
  
    
     
}


function thanksforplaying(){
  background(0);

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