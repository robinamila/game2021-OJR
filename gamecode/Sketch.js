//forskellige variabler
                        // HUSK AT TILFØJE SPAWN PROTECTION
var ship;
var asteroids = [];
var lasers = [];
var isRight = false;
var isLeft = false;
var isUp = false; 



function setup() { //kode der laver canvasset og bestemmer hvor mange asteroider der bliver tilføjet
    createCanvas(windowWidth, windowHeight);
    ship = new Ship();
    for (var i = 0; i < 20; i++) { //Denne kode er den der bestemmer hvor mange asteroider der er 
    asteroids.push(new Asteroid());
} 
}

function draw(){
    background(0);
    

    for (var i = 0; i < asteroids.length; i++) { //kode der render asteroider
        if (ship.hits(asteroids[i])) {
        //skal skrive en kode hvilken enten reloader siden eller tilføje liv
        location.reload();
               
        } 
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();

    }

    for (var i = lasers.length-1; i >=0; i--) { //kode der render laser skud 
        lasers[i].render();
        lasers[i].update();
        if (lasers[i].offscreen()) {
            lasers.splice(i, 1);
        } else {
        for (var j = asteroids.length-1; j >= 0; j--){ //kode der ødelægger asteroiderne 
        if (lasers[i].hits(asteroids[j])) {
         if (asteroids[j].r > 20){
         var newasteroids = asteroids[j].breakup();
         asteroids = asteroids.concat(newasteroids);
         } 
         asteroids.splice(j, 1);
         lasers.splice(i, 1);
         break;
        }
    }
    }
}


        ship.render();
        ship.turn();
        ship.update(); 
        ship.edges();
        ship.movement();
}  

function keyReleased (){
    ship.setRotation (0);
    ship.boosting(false);

    if (keyCode == 68) {
        isRight = false
    } 
    if (keyCode == 65) {
        isLeft = false
    }
    if (keyCode == 87) {
        isUp = false
    }

 }

function keyPressed () { //kode til at ske noget når man trykker på forskellige knapper
    if (keyCode == 32){ 
        lasers.push(new Laser(ship.pos, ship.heading));
    }  
    if (keyCode == 68) {
        isRight = true
    }
    if (keyCode == 65) {
        isLeft = true
    }
    if (keyCode == 87) {
        isUp = true
    }
    if (keyCode == 80){
        window.location.href = "https://www.youtube.com/watch?v=iik25wqIuFo&ab_channel=Rickroll%2Cbutwithadifferentlink"
    }
   
    // 32 = mellemrum
    // 68 = D 
    // 65 = A
    // 87 = W
    // 80 = P (rickRoll)
}