const container = document.getElementById("container");
const text = document.getElementById("text");
const buttonBackground = document.getElementById("backgroundButton");
const backgroundMusic = document.getElementById("backgroundMusic");
var buttonMoneyMultiplier;
const upgradeSection = document.getElementById("upgradeSection");

const gameValues = {
  money: {
    element: document.getElementById("money"),
    value: 0,
  },
  multiplier: {
    value: 0.01,
  },
  priceMultiplier: {
    value: 10,
  },
};

let clickAmount = 0;
const textArray = [
  "Pandas are so adorable.",
  "I only eat glazed donuts.",
  "How big of an idiot are you?",
  "Diamonds are forever.",
  "That was a stroke of luck.",
  "Please don't touch me there",
  "This Is my no no square",
  "It usually rains every day here.",
  "I was thinking of going round your place.",
  "Get away from me, you slimy little worm!",
  "Do you have a bigger one?",
  "I am so tired.",
  "I am so happy to see you today.",
  "We are good friends.",
  "Mind your own business!",
  "I made a smoothie for you.",
  "Sunflowers always brighten my day.",
  "Chocolate chip cookies are my weakness.",
  "Why did you spill the coffee?",
  "Star twinkle like distant dreams.",
  "Te ocean waves soothe my soul.",
  "Dont forget to water the plants.",
  "aughter is the best medicine.",
  "Life isfull of unexpected surprises.",
  "Ilove the smell of fresh rain.",
  "Kindness costs nothing but means everything.",
  "The moon hispers secrets to the night.",
  "Adventue awaits around every corner.",
  "Hppiness is a warm cup of tea.",
  "Boks take me to magical places.",
  "Cherish the momens that take your breath away.",
];

var circle;
var gravity = 0.1;
var friction = 0.23;
var ground = 1.7;

function startGame() {
  myGameArea.start();
  circle = new Circle(25, 15, 300);
}

const refresher = () => {
  const valueKeys = Object.keys(gameValues);
  valueKeys.forEach((valueKey) => {
    if (gameValues[valueKey].hasOwnProperty("element")) {
      gameValues[valueKey].element.innerHTML =
        gameValues[valueKey].value.toFixed(3);
    }
  });
};

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    const WIDTH = 500,
      HEIGHT = 500;
    this.canvas.width = WIDTH;
    this.canvas.height = HEIGHT;
    this.context = this.canvas.getContext("2d");
    container.appendChild(this.canvas);
    this.interval = setInterval(updateGameArea, 7);
    this.ok = false;

    this.canvas.onmousemove = function (event) {
      const x = event.pageX - (window.innerWidth - WIDTH) / 2,
        y = event.pageY - (window.innerHeight - HEIGHT) / 2;

      if (
        x <= circle.x + circle.radius + 5 &&
        x >= circle.x - circle.radius - 5 &&
        y <= circle.y + circle.radius + 5 &&
        y >= circle.y - circle.radius - 5
      ) {
        document.body.classList.add("cursorAtivado");
        document.body.classList.remove("cursorDesativado");
      } else {
        document.body.classList.add("cursorDesativado");
        document.body.classList.remove("cursorAtivado");
      }
    };
    this.canvas.onmousedown = function (event) {
      const x = event.pageX - (window.innerWidth - WIDTH) / 2,
        y = event.pageY - (window.innerHeight - HEIGHT) / 2;

      if (
        x <= circle.x + circle.radius + 5 &&
        x >= circle.x - circle.radius - 5 &&
        y <= circle.y + circle.radius + 5 &&
        y >= circle.y - circle.radius - 5
      ) {
        circle.color = "Yellow";
        this.ok = true;
      } else {
        circle.color = "White";
      }
    };
    this.canvas.addEventListener("mouseup", function (event) {
      const x = event.pageX - (window.innerWidth - WIDTH) / 2,
        y = event.pageY - (window.innerHeight - HEIGHT) / 2;

      if (this.ok) {
        if (x >= circle.x)
          circle.velocityX += Math.abs(x - circle.x) * circle.speed;
        else if (x < circle.x)
          circle.velocityX += Math.abs(x - circle.x) * (circle.speed * -1);
        if (y >= circle.y)
          circle.velocityY += Math.abs(y - circle.y) * circle.speed;
        else if (y < circle.y)
          circle.velocityY += Math.abs(y - circle.y) * (circle.speed * -1);
        this.ok = false;
        if (clickAmount === 0) {
          text.innerHTML = "Nice!";
          gameValues.multiplier = {
            element: document.createElement("label"),
            value: gameValues.multiplier.value,
          };
          gameValues.priceMultiplier = {
            element: document.createElement("label"),
            value: gameValues.priceMultiplier.value,
          };
          gameValues.priceMultiplier.element.innerHTML =
            gameValues.priceMultiplier.value;
          gameValues.multiplier.element.innerHTML = gameValues.multiplier.value;

          buttonMoneyMultiplier = document.createElement("button");
          buttonMoneyMultiplier.innerHTML = "Incrase money multiplier";
          buttonMoneyMultiplier.appendChild(gameValues.priceMultiplier.element);
          buttonMoneyMultiplier.addEventListener("click", () => {
            if (gameValues.money.value >= gameValues.priceMultiplier.value) {
              gameValues.multiplier.value *= 1.2;
              gameValues.money.value =
                gameValues.money.value - gameValues.priceMultiplier.value;
              gameValues.priceMultiplier.value *= 1.7;
              refresher();
            }
          });
          upgradeSection.appendChild(buttonMoneyMultiplier);
          upgradeSection.appendChild(gameValues.multiplier.element);
          refresher();
        } else {
          const random = Math.floor(Math.random() * textArray.length);
          text.innerHTML = textArray[random];
        }
        clickAmount++;
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
  this.velocityY = 2;
  this.velocityX = 10;
  this.speed = 0.012;
  this.color = "White";
  this.update = function () {
    ctx = myGameArea.context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = "#00FF0000";
    ctx.stroke();
    if (this.x + this.radius >= myGameArea.canvas.width) {
      this.velocityX *= -1;
      this.velocityX /= 2;
      this.x = myGameArea.canvas.width - this.radius - 0.1;
    }
    if (this.x - this.radius <= 0) {
      this.velocityX *= -1;
      this.velocityX /= 2;
      this.x = 0.1 + this.radius;
    }

    if (this.y + this.radius >= myGameArea.canvas.height) {
      this.velocityY /= ground;
      this.velocityY *= -1;
      this.y = myGameArea.canvas.height - this.radius - 0.1;
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
    if (this.y - this.radius <= 0) {
      this.velocityY /= ground;
      this.velocityY *= -1;
      this.y = 0.1 + this.radius;
    }
    if (
      this.velocityX > 1 ||
      this.velocityX < -1 ||
      this.velocityY > 1 ||
      this.velocityY < -1
    ) {
      const positiveVelocityX = Math.abs(this.velocityX);
      const positiveVelocityY = Math.abs(this.velocityY);

      const totalVelocity = positiveVelocityX + positiveVelocityY;
      const valueMoneyToWIn =
        (totalVelocity * gameValues.multiplier.value) / 1.4;

      gameValues.money.value = gameValues.money.value + valueMoneyToWIn;
      refresher();
    }
    this.y += this.velocityY;
    this.x += this.velocityX;
  };
}

function updateGameArea() {
  myGameArea.clear();
  circle.update();
}

buttonBackground.addEventListener("click", () => {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    backgroundMusic.volume = 0.5;
    buttonBackground.classList.add("ativado");
    buttonBackground.classList.remove("desativado");
  } else {
    buttonBackground.classList.add("desativado");
    buttonBackground.classList.remove("ativado");
    backgroundMusic.pause();
  }
});
