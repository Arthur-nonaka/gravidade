const container = document.getElementById("container");

var circle;
var gravity = 0.1;
var friction = 0.03;
var ground = 1.7;

function startGame() {
  myGameArea.start();
  circle = new Circle(25, 200, 10);
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    const WIDTH = 600,
      HEIGHT = 600;
    this.canvas.width = WIDTH;
    this.canvas.height = HEIGHT;
    this.context = this.canvas.getContext("2d");
    container.appendChild(this.canvas);
    this.interval = setInterval(updateGameArea, 7);
    var elemLeft = (window.innerWidth - WIDTH) / 2;
    var elemTop = (window.innerHeight - HEIGHT) / 2;
    this.ok = false;

    this.canvas.onmousemove = function (event) {
      var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

      if (
        x <= circle.x + circle.radius &&
        x >= circle.x - circle.radius &&
        y <= circle.y + circle.radius &&
        y >= circle.y - circle.radius
      ) {
        document.body.classList.add("cursorAtivado");
        document.body.classList.remove("cursorDesativado");
      } else {
        document.body.classList.add("cursorDesativado");
        document.body.classList.remove("cursorAtivado");
      }
    };
    this.canvas.onmousedown = function (event) {
      var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;

      if (
        x <= circle.x + circle.radius &&
        x >= circle.x - circle.radius &&
        y <= circle.y + circle.radius &&
        y >= circle.y - circle.radius
      ) {
        circle.color = "Yellow";
        this.ok = true;
      } else {
        circle.color = "White";
      }
    };
    this.canvas.addEventListener("mouseup", function (event) {
      var x = event.pageX - elemLeft,
        y = event.pageY - elemTop;
      if (this.ok) {
        if (x >= circle.x) circle.velocityX += Math.abs(x - circle.x) * 0.1;
        else if (x < circle.x) circle.velocityX += Math.abs(x - circle.x) * -0.1;
        if (y >= circle.y) circle.velocityY += Math.abs(y - circle.y) * 0.1;
        else if (y < circle.y) circle.velocityY += Math.abs(y - circle.y) * -0.1;
        this.ok = false;
      }
      circle.color = "White";
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function Circle(radius, x, y) {
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.velocityY = 9.8;
  this.velocityX = 10;
  this.color = "White";
  this.update = function () {
    ctx = myGameArea.context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
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
