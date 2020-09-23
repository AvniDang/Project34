//Create variables here
var dog, happyDog;
var dogSprite
var database;
var foodS, foodStock;

function preload(){
  //load images here
  dog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {

  var config = {
    apiKey: "AIzaSyA5LGtnkDLTJkFsNyjMHST_MtlU9pLROIU",
    authDomain: "virtual-pet-e63a7.firebaseapp.com",
    databaseURL: "https://virtual-pet-e63a7.firebaseio.com",
    projectId: "virtual-pet-e63a7",
    storageBucket: "virtual-pet-e63a7.appspot.com",
    messagingSenderId: "128263651741",
    appId: "1:128263651741:web:4b21ebf73cca942d10ef74"
  }
  firebase.initializeApp(config);
  database = firebase.database();
  createCanvas(500, 500);

  dogSprite = createSprite(250,250);
  dogSprite.addImage(dog, "dog.png");
  dogSprite.scale = 0.3;
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
}

function draw(){  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDog, "happyDog.png");
  }

  drawSprites();

  //add styles here
  textSize(18);
  fill("black");
  stroke("white");
  text("Note: Press UP_ARROW key to feed Bruno milk!", 100,50);

  textSize(20);
  fill("aqua");
  stroke("black");
  text("Remaining Food: 10", 200,100);
}

function readStock(data) {
  foodS = data.val()
}

function writeStock(x) {
  database.ref('/').update({
    foodS:x
  })

  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }
}
