let fixedBar = 230;
let attachedBar = 120;
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
  var pendulumCanvas = createCanvas(800, 800);
  pendulumCanvas.parent("pendulumCanvas");
  pixelDensity(1);

  /*
  For small angles, a pendulum behaves like a linear system (see Simple Pendulum). 
  When the angles are small in the Double Pendulum, the system behaves like the linear Double Spring.

  This is because the motion is determined by simple sine and cosine functions.
  For large angles, the pendulum is non-linear and the phase graph becomes much more complex.

  a1 = fixedBarAngle
  a2 = attachedBarAngle
  */

 


  
  Change = PI / 180;
  a1 = 90*Change; 
  a2 = 90*Change;



  //if (a2 != 0) {
  //  a2 = 90*Change;
  //}
  //a2 = 90*Change;
  //endif 



  //cx, cy - coordinates of origin of the the system of fixed bar
  cx = width / 2;
  cy = height / 4;


  buffer = createGraphics(width, height);
  buffer.background(255);
  buffer.translate(cx, cy);

}



function draw() {

  background(175);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  /*
    Equation of Motion of the angular acceleration of the fixedBar
  */

  // let num1 = -gravitationalAcceleration * (2 * massFixedObject + massAttachedObject) * math.sin(a1);
  // let num2 = -massAttachedObject * gravitationalAcceleration * math.sin(a1 - 2 * a2);
  // let num3 = -2 * math.sin(a1 - a2) * massAttachedObject;
  // let num4 = angularVelocityAttachedObject * angularVelocityAttachedObject * attachedBar + angularVelocityFixedObject * angularVelocityFixedObject * fixedBar * math.cos(a1 - a2);
  // let den = fixedBar * (2 * massFixedObject + massAttachedObject - massAttachedObject * math.cos(2 * a1 - 2 * a2));
  // let angularAccelerationFixedBar = (num1 + num2 + num3 * num4) / den;

  // /*
  //   Equation of Motion of the angular acceleration of the attachedBar
  // */
 
  // num1 = 2 * math.sin(a1 - a2); 
  // num2 = (angularVelocityFixedObject * angularVelocityFixedObject * fixedBar * (massFixedObject + massAttachedObject));
  // num3 = gravitationalAcceleration * (massFixedObject + massAttachedObject) * math.cos(a1);
  // num4 = angularVelocityAttachedObject * angularVelocityAttachedObject * attachedBar * massAttachedObject * math.cos(a1 - a2);
  // den = attachedBar * (2 * massFixedObject + massAttachedObject - massAttachedObject * math.cos(2 * a1 - 2 * a2));
  // let angularAccelerationAttachedBar = (num1 * (num2 + num3 + num4)) / den;

  document.getElementById("btn").addEventListener("click", PendulumButton);

  var a3 = parseInt(document.getElementById("Theta1").value);
  var a4 = parseInt(document.getElementById("Theta2").value);

  function PendulumButton() {
   
  //alert("This function is being called")
  // var a3 = parseInt(document.getElementById("Theta1").value);
  
  // var a4 = parseInt(document.getElementById("Theta2").value);

  a1 = a3*Change;
  a2 = a4*Change;

  num1 = -gravitationalAcceleration * (2 * massFixedObject + massAttachedObject) * math.sin(a1);
  num2 = -massAttachedObject * gravitationalAcceleration * math.sin(a1 - 2 * a2);
  num3 = -2 * math.sin(a1 - a2) * massAttachedObject;
  num4 = angularVelocityAttachedObject * angularVelocityAttachedObject * attachedBar + angularVelocityFixedObject * angularVelocityFixedObject * fixedBar * math.cos(a1 - a2);
  den = fixedBar * (2 * massFixedObject + massAttachedObject - massAttachedObject * math.cos(2 * a1 - 2 * a2));
  angularAccelerationFixedBar = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * math.sin(a1 - a2); 
  num2 = (angularVelocityFixedObject * angularVelocityFixedObject * fixedBar * (massFixedObject + massAttachedObject));
  num3 = gravitationalAcceleration * (massFixedObject + massAttachedObject) * math.cos(a1);
  num4 = angularVelocityAttachedObject * angularVelocityAttachedObject * attachedBar * massAttachedObject * math.cos(a1 - a2);
  den = attachedBar * (2 * massFixedObject + massAttachedObject - massAttachedObject * math.cos(2 * a1 - 2 * a2));
  angularAccelerationAttachedBar = (num1 * (num2 + num3 + num4)) / den;


  // a1 = a3*Change; 
  // a2 = a4*Change;

  }


  if (a3 != null) {
    a1 = a3*Change; 
    a2 = a4*Change;
  } else {
    a1 = 90*Change
    a2 = 90*Change;

  }
  
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

  angularVelocityFixedObject *= 0.9999; // this is the dampening
  angularVelocityAttachedObject *= 0.9999;

  buffer.stroke(0);
  if (frameCount > 1) {
    buffer.line(px2, py2, x2, y2);
  }

  px2 = x2; //point being made as pendulum moves - trajectory of motion
  py2 = y2;
  
  //console.log("Values of fixedBar", x1, y1);
  //console.log("Values of attachedBar", x2, y2);
}

