const container = document.getElementById("container");
var circle;
var gravity = 0.1;
var friction = 0.03;
var ground = 2;

function startGame() {
  myGameArea.start();
  circle = new Circle(25, 200, 10);
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 1200;
    this.canvas.height = 600;
    this.context = this.canvas.getContext("2d");
    container.appendChild(this.canvas);
    this.interval = setInterval(updateGameArea, 7);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function Circle(radius, x, y) {
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.velocityY = -4;
  this.velocityX = 2;
  this.update = function () {
    ctx = myGameArea.context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    if (this.x + this.radius >= myGameArea.canvas.width) {
      this.velocityX *= -1;
      this.velocityX /= 2;
      this.x = myGameArea.canvas.width - this.radius;
    }
    if (this.x - this.radius <= 0) {
      this.velocityX *= -1;
      this.velocityX /= 2;
      this.x = 0 + this.radius;
    }

    if (this.y + this.radius >= myGameArea.canvas.height) {
      this.velocityY /= ground;
      this.velocityY *= -1;
      this.y = myGameArea.canvas.height - this.radius;
      if (this.velocityX > -0.1 && this.velocityX < 0.1) {
        this.velocityX = 0;
      } else if (this.velocityX > 0) {
        this.velocityX -= friction;
      } else if (this.velocityX < 0) {
        this.velocityX += friction;
      }
    } else {
      this.velocityY += gravity;
    }
    this.y += this.velocityY;
    this.x += this.velocityX;
  };
}

function updateGameArea() {
  myGameArea.clear();
  circle.update();
}
