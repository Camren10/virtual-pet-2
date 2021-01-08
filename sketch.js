var dogImg1,dogImg2;
var database;
var dog;
var food,foodObject;
var feedButton, addFoodButton;
var lastFed;

function preload()
{
  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 800);
  database = firebase.database();
  
  dog = createSprite(400,450);
  dog.addImage(dogImg1)
  dog.scale=0.5

  feedButton=createButton('feed the dog');
  addFoodButton=createButton('add food');
  feedButton.position(700,100);
  addFoodButton.position(800,100);

  foodObject=new Food();
  foodObject.getFoodStock();

  var fedTimeRef=database.ref('fedTime');
  fedTimeRef.on("value",(data)=>{
    lastFed=data.val();
  });
}


function draw() {  
  background("green");
  /*if(food!==undefined) {
    fill("black")
    textSize(16);
    text("food remaining: "+food,350,50);
  }*/

  drawSprites();

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12) {
    text("last fed : "+ lastFed%12 + " PM", 350,30);
  }else if(lastFed===0) {
    text("last fed : 12 AM", 350,30);
  }else{
    text("last fed : "+ lastFed + " AM", 350,30);
  }

  foodObject.display();

  feedButton.mousePressed(()=>{
    food=food-1;
    foodObject.updateFoodStock(food);
    dog.addImage(dogImg2);
    lastFed=hour();
    database.ref('/').update({
      fedTime: lastFed
    });
  });

  addFoodButton.mousePressed(()=>{
    food=food+1;
    foodObject.updateFoodStock(food);
  });
}

/*function keyPressed() {
  if(keyCode===UP_ARROW) {
    dog.addImage(dogImg2);
    if(food<=0) {
      food=0
    }
    else {
      food=food-1
    }
    database.ref('/').update({
      foodStock:food
    });
  }
}*/



