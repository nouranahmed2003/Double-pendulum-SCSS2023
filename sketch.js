let FixedBar = 180;
let AttachedBar = 80;
let MassFixedObject = 10;
let MassAttachedObject = 7;

//let a1 = 0; //angle of fixed, defining the var, but don't need to?
//let a2 = 0; //angle of attached

let AngularVelocityFixedObject = 0;
//a1_v = AngularVelocityFixedObject
let AngularVelocityAttachedObject = 0;
//a2_v = AngularVelocityAttachedObject
//defining the variables? use them later in code with actual values
let g = 0.2;
//gravitational acceleration, if use 9.81, the simulation moves way too quickly

//let px2 = -1; //? do we need to define it with og value when it'll be diff values along motion anyway?
//let py2 = -1;
let cx, cy;

let buffer;

function setup() {
  createCanvas(900, 800);
  //Issue with wrong rendering on a retina Mac. See issue: https://github.com/CodingTrain/website/issues/574
  pixelDensity(1);
  a1 = PI / 2; //change initial angle of motion
  a2 = PI / 2;
  //these are the starting angles of the bars
  cx = width / 2;
  cy = height / 4;
  //cx, cy - coordinates of origin of the the system of fixed bar
  buffer = createGraphics(width, height);
  buffer.background(225);
  buffer.translate(cx, cy);
}

function draw() {
  background(175);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  let num1 = -g * (2 * MassFixedObject + MassAttachedObject) * sin(a1);
  let num2 = -MassAttachedObject * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * MassAttachedObject;
  let num4 = AngularVelocityAttachedObject * AngularVelocityAttachedObject * AttachedBar + AngularVelocityFixedObject * AngularVelocityFixedObject * FixedBar * cos(a1 - a2);
  let den = FixedBar * (2 * MassFixedObject + MassAttachedObject - MassAttachedObject * cos(2 * a1 - 2 * a2));
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = (AngularVelocityFixedObject * AngularVelocityFixedObject * FixedBar * (MassFixedObject + MassAttachedObject));
  num3 = g * (MassFixedObject + MassAttachedObject) * cos(a1);
  num4 = AngularVelocityAttachedObject * AngularVelocityAttachedObject * AttachedBar * MassAttachedObject * cos(a1 - a2);
  den = AttachedBar * (2 * MassFixedObject + MassAttachedObject - MassAttachedObject * cos(2 * a1 - 2 * a2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;

  translate(cx, cy);
  stroke(0);
  strokeWeight(2);

  let x1 = FixedBar * sin(a1);
  let y1 = FixedBar * cos(a1);

  let x2 = x1 + AttachedBar * sin(a2);
  let y2 = y1 + AttachedBar * cos(a2);

  line(0, 0, x1, y1);
  fill(0);
  ellipse(x1, y1, MassFixedObject, MassFixedObject);

  line(x1, y1, x2, y2);
  fill(0);
  ellipse(x2, y2, MassAttachedObject, MassAttachedObject);

  AngularVelocityFixedObject += a1_a;
  AngularVelocityAttachedObject += a2_a;
  a1 += AngularVelocityFixedObject;
  a2 += AngularVelocityAttachedObject;

  //AngularVelocityFixedObject *= 0.99; //used to assign arbitrary values, not needed for the actual computation of double pendulum, i.e. it isn't the right motion we're after
  //AngularVelocityAttachedObject *= 0.99;

  buffer.stroke(0);
  if (frameCount > 1) {
    buffer.line(px2, py2, x2, y2);
  }

  px2 = x2; //point being made as pendulum moves - trajectory of motion
  py2 = y2;
}