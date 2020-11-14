var socket = io('https://ancient-hamlet-73501.herokuapp.com/');

var r = 255;
var g = 255;
var b = 255;
var size = 15;

function ColorWhite() {
  r = 255;
  g = 255;
  b = 255;
}

function ColorGreen() {
  r = 152;
  g = 251;
  b = 152;
}

function ColorBlue() {
  r = 128;
  g = 206;
  b = 255;
}

function ColorPurple() {
  r = 194;
  g = 157;
  b = 253;
}

function ColorRed() {
  r = 255;
  g = 105;
  b = 97;
}

function ColorYellow() {
  r = 253;
  g = 253;
  b = 150;
}

function ColorEraser() {
  r = 0;
  g = 0;
  b = 0;
}

function Increse() {
  size ++;
  document.getElementById("currentSize").innerHTML = "SIZE: " + size;
}
function Decrese() {
  size --;
  document.getElementById("currentSize").innerHTML = "SIZE: " + size;
}

function EraseLoc() {
  background(0, 0, 0);
}

function EraseGlo() {
    background(0,0,0);
    socket.emit('ResetBackground');
  }
/*
  function draw(){
    if((mouseX < window.innerWidth)  && (mouseY < window.innerHeight)){
      const x = mouseX;
      const y = mouseY;
      const px = pmouseX;
      const py = pmouseY;
      stroke('red');
      strokeWeight(2);
      noFill();
      ellipse(x,y,size,size);
      stroke('black');
      strokeWeight(4);
      ellipse(px,py,size,size);
    }
  }
*/


function setup() {
    var canvas = createCanvas(window.innerWidth, window.innerHeight-20);
    canvas.parent('sketch-holder');
    background(0, 0, 0);
  }

  function mouseDragged() {
    const x = mouseX;
    const y = mouseY;
    const px = pmouseX;
    const py = pmouseY;
    stroke(r,g,b);
    strokeWeight(size);
    line(x, y, px, py);

    socket.emit('PositionEvent',{
        x: x,
        y: y,
        px: px,
        py: py,
        r: r,
        g: g,
        b: b,
        size: size,
    });
}

socket.on('NewPositionEvent', positionRecived);
  function positionRecived(data){
    stroke(data.r,data.g,data.b);
    strokeWeight(data.size);
    line(data.x,data.y,data.px,data.py);
  }

socket.on('NewResetBackground', ResetBackRecived);
  function ResetBackRecived(){
    background(0,0,0);
  }