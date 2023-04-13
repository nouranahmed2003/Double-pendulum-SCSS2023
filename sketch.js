let fixedBar = 180;
let attachedBar = 180;
let massFixedObject = 1000;
let massAttachedObject = 1000;

let a1 = 0; 
let a2 = 0; 

let angularVelocityFixedObject = 0;

let a1_v = angularVelocityFixedObject;

let angularVelocityAttachedObject = 0;

let a2_v = angularVelocityAttachedObject;

let gravitationalAcceleration = 0.981;

let px2 = 0; 
let py2 = 0;

let cx, cy;

let buffer;

function setup() {
  createCanvas(900, 800);
  pixelDensity(1);

  /*
  For small angles, a pendulum behaves like a linear system (see Simple Pendulum). 
  When the angles are small in the Double Pendulum, the system behaves like the linear Double Spring.

  This is because the motion is determined by simple sine and cosine functions.
  For large angles, the pendulum is non-linear and the phase graph becomes much more complex.

  a1 = fixedBarAngle
  a2 = attachedBarAngle
  */

  a1 = PI / 2; 
  a2 = PI / 2;

  //cx, cy - coordinates of origin of the the system of fixed bar
  cx = width / 2;
  cy = height / 4;

  
  buffer = createGraphics(width, height);
  buffer.background(225);
  buffer.translate(cx, cy);

}

function draw() {

  background(175);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);


  /*
    Equation of Motion of the angular acceleration of the fixedBar
  */

  let num1 = -gravitationalAcceleration * (2 * massFixedObject + massAttachedObject) * sin(a1);
  let num2 = -massAttachedObject * gravitationalAcceleration * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * massAttachedObject;
  let num4 = angularVelocityAttachedObject * angularVelocityAttachedObject * attachedBar + angularVelocityFixedObject * angularVelocityFixedObject * fixedBar * cos(a1 - a2);
  let den = fixedBar * (2 * massFixedObject + massAttachedObject - massAttachedObject * cos(2 * a1 - 2 * a2));
  let angularAccelerationFixedBar = (num1 + num2 + num3 * num4) / den;

  /*
    Equation of Motion of the angular acceleration of the attachedBar
  */

 
  num1 = 2 * sin(a1 - a2); 
  num2 = (angularVelocityFixedObject * angularVelocityFixedObject * fixedBar * (massFixedObject + massAttachedObject));
  num3 = gravitationalAcceleration * (massFixedObject + massAttachedObject) * cos(a1);
  num4 = angularVelocityAttachedObject * angularVelocityAttachedObject * attachedBar * massAttachedObject * cos(a1 - a2);
  den = attachedBar * (2 * massFixedObject + massAttachedObject - massAttachedObject * cos(2 * a1 - 2 * a2));
  let angularAccelerationAttachedBar = (num1 * (num2 + num3 + num4)) / den;

  translate(cx, cy);
  stroke(0);
  strokeWeight(2);

  let x1 = fixedBar * sin(a1);
  let y1 = fixedBar * cos(a1);

  let x2 = x1 + attachedBar * sin(a2);
  let y2 = y1 + attachedBar * cos(a2);

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

  //angularVelocityFixedObject *= 0.99; //used to assign arbitrary values, not needed for the actual computation of double pendulum, i.e. it isn't the right motion we're after
  //angularVelocityAttachedObject *= 0.99;

  buffer.stroke(0);
  if (frameCount > 1) {
    buffer.line(px2, py2, x2, y2);
  }

  px2 = x2; //point being made as pendulum moves - trajectory of motion
  py2 = y2;
  
  console.log("Values of fixedBar", x1, y1);
  console.log("Values of attachedBar", x2, y2);
}