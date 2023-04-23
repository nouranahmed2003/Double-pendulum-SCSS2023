/*
  Default starting values
*/
let fixedBar = 120;
let attachedBar = 120;
let massFixedObject = 10;
let massAttachedObject = 1;

/* 
  a1 = fixedBarAngle
  a2 = attachedBarAngle
*/
let a1 = 0; 
let a2 = 0;
let a1_change = 90;
let a2_change = 90; 

let angularVelocityFixedObject = 0;
let a1_v = angularVelocityFixedObject;

let angularVelocityAttachedObject = 0;
let a2_v = angularVelocityAttachedObject;

let gravitationalAcceleration = 0.981;

let px2 = 0; 
let py2 = 0;

/*
  cx, cy - coordinates of origin of the the system of fixed bar
*/
let cx, cy;

let buffer;
let pendulumAnimation = true;

/*
  Overriding values if input is found
*/
let entry1;


function setup() {
  var pendulumCanvas = createCanvas(800, 800);
  pendulumCanvas.parent("pendulumCanvas");
  pixelDensity(1);

  /*
  For small angles, a pendulum behaves like a linear system (see Simple Pendulum). 
  When the angles are small in the Double Pendulum, the system behaves like the linear Double Spring.

  This is because the motion is determined by simple sine and cosine functions.
  For large angles, the pendulum is non-linear and the phase graph becomes much more complex.
  */
  
  degreeValue = PI / 180;
  a1 = a1_change*degreeValue; 
  a2 = a2_change*degreeValue;
  
  cx = width / 2;
  cy = height / 4;

  buffer = createGraphics(width, height);
  buffer.background(255);
  buffer.translate(cx, cy);

  createSpan("What's your name? "); //label for entry1
  // createInput([value], [type])
  // type: "text" (default), "number",
  // "date", "password", "email", etc.
  entry1 = createInput();
  //If text in the entry field changes, call
  //the entryCallback function.
  entry1.changed(entryCallback);

}


function draw() {

  background(175);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  /*
    Equation of Motion of the angular acceleration of the fixedBar
  */

  let num1 = -gravitationalAcceleration * (2 * massFixedObject + massAttachedObject) * math.sin(a1);
  let num2 = -massAttachedObject * gravitationalAcceleration * math.sin(a1 - 2 * a2);
  let num3 = -2 * math.sin(a1 - a2) * massAttachedObject;
  let num4 = angularVelocityAttachedObject * angularVelocityAttachedObject * attachedBar + angularVelocityFixedObject * angularVelocityFixedObject * fixedBar * math.cos(a1 - a2);
  let den = fixedBar * (2 * massFixedObject + massAttachedObject - massAttachedObject * math.cos(2 * a1 - 2 * a2));
  let angularAccelerationFixedBar = (num1 + num2 + num3 * num4) / den;

  /*
    Equation of Motion of the angular acceleration of the attachedBar
  */
 
  num1 = 2 * math.sin(a1 - a2); 
  num2 = (angularVelocityFixedObject * angularVelocityFixedObject * fixedBar * (massFixedObject + massAttachedObject));
  num3 = gravitationalAcceleration * (massFixedObject + massAttachedObject) * math.cos(a1);
  num4 = angularVelocityAttachedObject * angularVelocityAttachedObject * attachedBar * massAttachedObject * math.cos(a1 - a2);
  den = attachedBar * (2 * massFixedObject + massAttachedObject - massAttachedObject * math.cos(2 * a1 - 2 * a2));
  let angularAccelerationAttachedBar = (num1 * (num2 + num3 + num4)) / den;

  translate(cx, cy);
  stroke(0);
  strokeWeight(2);

  let x1 = fixedBar * math.sin(a1);
  let y1 = fixedBar * math.cos(a1);

  let x2 = x1 + attachedBar * math.sin(a2);
  let y2 = y1 + attachedBar * math.cos(a2);

  line(0, 0, x1, y1);
  fill(0);
  ellipse(x1, y1, 10, 10);

  line(x1, y1, x2, y2);
  fill(0);
  ellipse(x2, y2, 10, 10);

  angularVelocityFixedObject += angularAccelerationFixedBar;
  angularVelocityAttachedObject += angularAccelerationAttachedBar;
  a1 += angularVelocityFixedObject;
  a2 += angularVelocityAttachedObject;

  angularVelocityFixedObject *= 0.9999; // multiplication by 0.9999 is the dampening effect
  angularVelocityAttachedObject *= 0.9999;

  buffer.stroke(0);
  if (frameCount > 1) {
    buffer.line(px2, py2, x2, y2);
  }

  px2 = x2; //point being made as pendulum moves - trajectory of motion
  py2 = y2;
  
  //console.log("Values of fixedBar", x1, y1);
  //console.log("Values of attachedBar", x2, y2);
  //console.log(frameCount);
}

function eqqAngularAccelerationFixedBar(){
  let num1 = -gravitationalAcceleration * (2 * massFixedObject + massAttachedObject) * math.sin(a1);
  let num2 = -massAttachedObject * gravitationalAcceleration * math.sin(a1 - 2 * a2);
  let num3 = -2 * math.sin(a1 - a2) * massAttachedObject;
  let num4 = angularVelocityAttachedObject * angularVelocityAttachedObject * attachedBar + angularVelocityFixedObject * angularVelocityFixedObject * fixedBar * math.cos(a1 - a2);
  let den = fixedBar * (2 * massFixedObject + massAttachedObject - massAttachedObject * math.cos(2 * a1 - 2 * a2));
  angularAccelerationFixedBar = (num1 + num2 + num3 * num4) / den;
  return angularAccelerationFixedBar;
}

function eqmAngularAccelerationAttachedBar(){
  num1 = 2 * math.sin(a1 - a2); 
  num2 = (angularVelocityFixedObject * angularVelocityFixedObject * fixedBar * (massFixedObject + massAttachedObject));
  num3 = gravitationalAcceleration * (massFixedObject + massAttachedObject) * math.cos(a1);
  num4 = angularVelocityAttachedObject * angularVelocityAttachedObject * attachedBar * massAttachedObject * math.cos(a1 - a2);
  den = attachedBar * (2 * massFixedObject + massAttachedObject - massAttachedObject * math.cos(2 * a1 - 2 * a2));
  angularAccelerationAttachedBar = (num1 * (num2 + num3 + num4)) / den;
  return angularAccelerationAttachedBar;
}

function openIt(){
  const url = "/index.html";
  window.open(url,"something","width=800,height=800");
  
}

//callback function for entry1
function entryCallback() {
  for (let i = 0; i < 25; i++) {
    text(entry1.value(), random(width),
          random(height));
  }

}
