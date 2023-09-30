"use strict";

class BreakoutGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.score = 0;

    this.ball = {
      x: this.canvas.width / 2,
      y: this.canvas.height - 30,
      dx: 1,
      dy: -1,
      radius: 10,
    };

    this.paddle = {
      width: 75,
      height: 10,
      x: (this.canvas.width - 75) / 2,
      y: this.canvas.height - 10,
    };

    this.bricks = [];
    this.brickRowCount = 3;
    this.brickColumnCount = 4;
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 60;

    this.rightPressed = false;
    this.leftPressed = false;

    this.initializeBricks();
    this.setupEventListeners();
    this.update();
  }

  initializeBricks() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r++) {
        this.bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  setupEventListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Right' || event.key === 'ArrowRight') {
        this.rightPressed = true;
      } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        this.leftPressed = true;
      }
    }, false);

    document.addEventListener('keyup', (event) => {
      if (event.key === 'Right' || event.key === 'ArrowRight') {
        this.rightPressed = false;
      } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        this.leftPressed = false;
      }
    }, false);
  }

  drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawPaddle() {
    this.ctx.beginPath();
    this.ctx.rect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawBricks() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        if (this.bricks[c][r].status === 1) {
          const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
          const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          this.ctx.fillStyle = `#0095DD`;
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }

  collisionDetection() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          const ballCenterX = this.ball.x;
          const ballCenterY = this.ball.y;
          const brickCenterX = brick.x + this.brickWidth / 2;
          const brickCenterY = brick.y + this.brickHeight / 2;
          const distanceX = Math.abs(ballCenterX - brickCenterX);
          const distanceY = Math.abs(ballCenterY - brickCenterY);
          const overlapX = this.ball.radius + this.brickWidth / 2 - distanceX;
          const overlapY = this.ball.radius + this.brickHeight / 2 - distanceY;
          if (overlapX > 0 && overlapY > 0) {
            if (overlapX > overlapY) {
              this.ball.dy = -this.ball.dy;
            } else {
              this.ball.dx = -this.ball.dx;
            }
            brick.status = 0;
            this.score++;
            if (this.score === this.brickRowCount * this.brickColumnCount) {
              alert('Congratulations! You win!');
              return;
            }
          }
        }
      }
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBricks();
    this.drawBall();
    this.drawPaddle();
    this.collisionDetection();

    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;

    if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
      this.paddle.x += 7;
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.x -= 7;
    }

    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
      } else {
        alert('Game Over');
        return;
      }
    }

    requestAnimationFrame(() => this.update());
  }
}

const game = new BreakoutGame('gameCanvas');
