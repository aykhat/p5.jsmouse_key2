let mic;
let webcam;
let mode = 1; 
let angle = 0;

function setup() {
  createCanvas(600, 600);
  
  mic = new p5.AudioIn();
  mic.start();
  
  webcam = createCapture(VIDEO);
  webcam.size(600, 600);
  // webcam.hide();
}

function draw() {
  // Clear the canvas fresh every frame
  background(30, 30, 40);
  
  let vol = mic.getLevel();
  let mappedSize = map(vol, 0, 1, 50, 350);

  // Mode 1: Show webcam background
  if (mode === 1) {
    push();
    image(webcam, 0, 0, width, height);
    pop();
  }
  // If mode is 2, it skips the webcam image and just shows the solid background color

  // Rotating outer box (push & pop transformation)
  push();
  translate(width / 2, height / 2);
  rotate(angle);                    
  
  noFill();
  stroke(255, 100, 150, 180);
  strokeWeight(3);
  rectMode(CENTER);
  rect(0, 0, 200 + mouseX * 0.2, 200 + mouseY * 0.2);
  
  angle += 0.02; 
  pop(); 

  // Microphone reactive center ellipse
  push();
  translate(width / 2, height / 2);
  
  let dynamicColor = color(random(100, 255), 150, 200);
  if (mouseIsPressed) {
    fill(dynamicColor); 
  } else {
    fill(100, 200, 255, 200);
  }
  
  noStroke();
  ellipse(0, 0, mappedSize);
  pop();

  // Screen instructions text updated for W and Q
  fill(255);
  noStroke();
  textSize(14);
  text("Press 'W': Webcam Background Mode", 20, 30);
  text("Press 'Q': Solid Background Mode", 20, 50);
  text("Click & Hold Mouse: Change Center Color", 20, 70);
}

function keyPressed() {
  // Remember to click once inside the canvas window first so it registers key presses!
  if (key === 'w' || key === 'W') {
    mode = 1;
  } else if (key === 'q' || key === 'Q') {
    mode = 2;
  }
}

function mousePressed() {
  userStartAudio();
}