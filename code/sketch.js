// Variables for the width of each box
// And an array of box positions
let w;
let boxes = [];

function setup() {
  createCanvas(400, 400, WEBGL);

  // boxes have a blue outline
  stroke(0, 0, 100);

  // Generate an array of boxes
  // All next to each other in a rectangle
  w = width / 8;
  for (let y = 0; y < height * 2; y += w)
    for (let x = 0; x < width * 2 + w*10; x += w)
      boxes.push( {x: x, y: y} );
}

function draw() {
  // Light blue "sky" background
  background(200, 200, 255);

  // Rotate the screen along the x axis
  // To make the boxes appear on the ground
  rotateX(PI /2);

  // Create a white light so everything is visible
  // And add shadows
  // Boxes are blue
  ambientLight(255);
  ambientMaterial(110, 110, 255);
  directionalLight(175, 175, 255, 0, 0, -1);

  // WEBGL mode translates the canvas
  // So (0, 0) is the center.
  // This reverses that, with some changes
  let d = width/2 - w/2;
  translate(-d - 400, -d - 440, -167);

  // Move each box up and down
  // According to the sine value
  // Of the elapsed time and its offset
  let t = frameCount / 25;
  for (let b of boxes) {
    let z = sin(t + b.x + b.y) * 35;

    // push and pop are used to save and restore
    // the canvas' transformations
    push();
    translate(b.x, b.y, z);
    box(w);
    pop();
  }

  // Change endless to false
  // To make it easier to export to an endless loop
  let endless = true;
  if (!endless && t >= TWO_PI)
    noLoop();
}
