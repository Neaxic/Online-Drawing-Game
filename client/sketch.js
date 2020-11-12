
// COLOR PICKER
// var img
// var c = 0;
// function preload() {
//   img = loadImage("gradient.png");
// }

var socket = io();

var r = 255;
var g = 255;
var b = 255;
var rainbow = 0;

function ColorWhite() {
  r = 255;
  g = 255;
  b = 255;
  //document.getElementById("myBtnGreen").innerHTML = "YOU CLICKED ME!";
}

function ColorGreen() {
  r = 152;
  g = 251;
  b = 152;
  //document.getElementById("myBtnGreen").innerHTML = "YOU CLICKED ME!";
}

function ColorBlue() {
  r = 128;
  g = 206;
  b = 255;
  //document.getElementById("myBtnGreen").innerHTML = "YOU CLICKED ME!";
}

function ColorPurple() {
  r = 194;
  g = 157;
  b = 253;
  //document.getElementById("myBtnGreen").innerHTML = "YOU CLICKED ME!";
}

function ColorRed() {
  r = 255;
  g = 105;
  b = 97;
  //document.getElementById("myBtnGreen").innerHTML = "YOU CLICKED ME!";
}

function ColorYellow() {
  r = 253;
  g = 253;
  b = 150;
  //document.getElementById("myBtnGreen").innerHTML = "YOU CLICKED ME!";
}

function ColorEraser() {
  r = 0;
  g = 0;
  b = 0;
  //document.getElementById("myBtnGreen").innerHTML = "YOU CLICKED ME!";
}

function setup() {
    var canvas = createCanvas(window.innerWidth, window.innerHeight-20);
    canvas.parent('sketch-holder');
    background(0, 0, 0);
    // socket.on('mouse', newDrawing);
    // socket.on('positionEvent',newPositionMsg);
    //image(img, 0, 0, 400, 400);

    //Button Reset
      // button = createButton('Reset');
      // button.position(45, 950);
      // button.mousePressed(ResetButton);
      
      // function ResetButton(){
      //   const colorData = {
      //   f: 99
      // }      
        
      // }
  }

  // function mouseClicked(){
  //   var valp = 100;
  //   const colorData = {
  //     x: valp,
  //   };
  //   socket.emit("positionEvent",colorData);
  //   console.log(colorData);
  // }

  // function newPositionMsg(posData) {
  //   // console.log("got: ");
  //   // console.log(posData);
  //   positionRecived(posData);
  // }

  function mouseDragged() {
    const x = mouseX;
    const y = mouseY;
    fill (r,g,b);
    noStroke();
    ellipse(x,y,20,20);
    
    let pos = {
     x: x,
     y: y,
    };

    console.log(pos)

    socket.emit('PositionEvent',{
        x: x,
        y: y,
        r: r,
        g: g,
        b: b,
      });
}

socket.on('NewPositionEvent',positionRecived);

  function positionRecived(data){
    fill (data.r,data.g,data.b);
    ellipse(data.x,data.y,20,20);
  }