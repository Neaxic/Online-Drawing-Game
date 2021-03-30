var socket = io('https://ancient-hamlet-73501.herokuapp.com/');

var r = 255;
var g = 255;
var b = 255;
var size = 30;


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


window.onload=function(){
  document.getElementById('colorPicker').addEventListener("change", function(){
    hexToRGB(document.getElementById("colorPicker").value);
  });  
  document.getElementById('sizeRange').addEventListener("change", function(){
    size = document.getElementById('sizeRange').value;
    document.getElementById("currentSize").innerHTML = "SIZE: " + size;
  })
}

function hexToRGB(h){
  let r = 0, g = 0, b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

  // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  
  this.r = r;
  this.g = g;
  this.b = b;
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

    function mousePressed(){
      console.log("Test");
      FileList(r,g,b);
      ellipse(x, y, size, size);
    }
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