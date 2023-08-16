const container = document.getElementById("container");
var circle;
var gravity = 0.2;


function startGame() {
    myGameArea.start();
    circle = new Circle(25, 200, 30);
    circle = new Circle(25, 100, 30);
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        container.appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 10);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function Circle(radius, x, y) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();
        this.velocity += gravity;
        this.y += circle.velocity;
    }
}

function updateGameArea() {
    myGameArea.clear();
    circle.update();
};