//Create variables here
var dog
var database
var foodS, foodStock
var dogImg, dogImg1
var feedPet, addFood
fedTime, lastFed
var bedroomImg, gardenImg, washroomImg
foodObj

function preload() {
	//load images here
  dogImg = loadImage("images/dogImg.png")
  dogImg1 = loadImage("images/dogImg1.png")

  bedroomImg = loadImage("BedRoom.png")
  gardenImg = loadImage("Garden.png")
  washroomImg = loadImage("WashRoom.png")
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2

  // read game state from database
  readState = database.ref('gameState')
  readState.on("value",function(data) {
    gameState = data.val()
  })

  // function to update gamestates in database
  function update(state) {
    database.ref('/').update ({
      gameState:state
    })
  }

}


function draw() { 
  background("green");
  if(foodS!== undefined) {
    textSize(20)
    fill("white")
    text("Note: Press UP_ARROW Key to Feed Drago Milk", width-450, 50)
    text("Food Remaining: " +foodS, 150,150)
  
  }
  
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  if(keyWentUp(UP_ARROW)) {
    dog.addImage(dogImg);
  }

  if(foodS === 0) {
    foodS = 20;
  }

  if(gameState != "Hungry") {
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else {
    feed.show();
    addFood.show();
    dog.addImage(sadDog)
  }

  drawSprites();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }

  database.ref("/").update ({
    Food: x
  })
}

function readStock(data) {
  foodS = data.val();
}