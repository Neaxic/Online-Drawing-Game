var socket = io('https://ancient-hamlet-73501.herokuapp.com/');

var r = 255;
var g = 255;
var b = 255;

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

function EraseLoc() {
  background(0, 0, 0);
}

function EraseGlo() {
    background(0,0,0);
    socket.emit('ResetBackground');
  }

function setup() {
    var canvas = createCanvas(window.innerWidth, window.innerHeight-20);
    canvas.parent('sketch-holder');
    background(0, 0, 0);
  }

  function mouseDragged() {
    const x = mouseX;
    const y = mouseY;
    fill (r,g,b);
    noStroke();
    ellipse(x,y,20,20);

    socket.emit('PositionEvent',{
        x: x,
        y: y,
        r: r,
        g: g,
        b: b,
    });
}

socket.on('NewPositionEvent', positionRecived);
  function positionRecived(data){
    fill (data.r,data.g,data.b);
    ellipse(data.x,data.y,20,20);
  }

socket.on('NewResetBackground', ResetBackRecived);
  function ResetBackRecived(){
    background(0,0,0);
    console.log("Test");
  }