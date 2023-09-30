"use strict"

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set up score variable
let score = 0;

// Set up game variables
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 1;
let dy = -1;
const ballRadius = 10;

let paddleWidth = 75;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
const paddleY = canvas.height - paddleHeight;

let rightPressed = false;
let leftPressed = false;

// Set up brick variables
const brickRowCount = 3;
const brickColumnCount = 4;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 60;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

// Set up event listeners for paddle movement
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// Functions to handle key events
function keyDownHandler(event) {
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    rightPressed = true;
  } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(event) {
  if (event.key === 'Right' || event.key === 'ArrowRight') {
    rightPressed = false;
  } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

// Function to draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

// Function to draw the paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

// Function to draw the bricks
function drawBricks() {
  let id = 0;
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) { // !!!!
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        // ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = `#0095DD`;
        ctx.fill();
        // ctx.closePath();
      }
    }
  }
}

// Function to update the game state
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  // Ball movement
  x += dx;
  y += dy;

  // Paddle movement
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  // Ball collision with walls
  // bug with ball when paddle height more then botom of window
  // 1) fix 'if' for gameover. set gameover to paddle height
  // 2) current ball position y = top of paddle
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    // Ball collision with paddle
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      //y = canvas.height - ballRadius - PADDLE_RADIUS;
    } else {
      // Game over
      alert('Game Over');
      //document.location.reload();
      return;
    }
  }

  requestAnimationFrame(update);
}

/* function collisionDetection() { //!!!!!!!
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const brick = bricks[c][r];
      if (brick.status === 1) {
        // Calculate the position of the ball's center
        const ballCenterX = x;
        const ballCenterY = y;

        // Calculate the position of the brick's center
        const brickCenterX = brick.x + brickWidth / 2;
        const brickCenterY = brick.y + brickHeight / 2;

        // Calculate the distances between the centers of the ball and the brick
        const distanceX = Math.abs(ballCenterX - brickCenterX);
        const distanceY = Math.abs(ballCenterY - brickCenterY);

        // Calculate the overlap on each axis
        const overlapX = ballRadius + brickWidth / 2 - distanceX;
        const overlapY = ballRadius + brickHeight / 2 - distanceY;

        // Check for a collision
        if (overlapX > 0 && overlapY > 0) {
          if (overlapX > overlapY) {
            dy = -dy; // Collided with top or bottom side of the brick
          } else {
            dx = -dx; // Collided with left or right side of the brick
          }
          brick.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            alert('Congratulations! You win!');
            //document.location.reload();
            return;
          }
          return;
        }
      }
    }
  }
} */

/* 
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const brick = bricks[c][r];
      if (brick.status === 1) {
        // Calculate the position of the ball's center
        const ballCenterX = x;
        const ballCenterY = y;

        // Calculate the position of the brick's center
        const brickCenterX = brick.x + brickWidth / 2;
        const brickCenterY = brick.y + brickHeight / 2;

        // Calculate the distance between the centers of the ball and the brick
        const distanceX = Math.abs(ballCenterX - brickCenterX);
        const distanceY = Math.abs(ballCenterY - brickCenterY);

        // Check for a collision
        if (distanceX < ballRadius + brickWidth / 2 && distanceY < ballRadius + brickHeight / 2) {
          dy = -dy;
          brick.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            alert('Congratulations! You win!');
            //document.location.reload();
            return;
          }
          return;
        }
      }
    }
  }
} 
*/

/* // Function to handle collision detection with bricks
function collisionDetection() {
  for (let rowBricks of bricks) {
    for (let brick of rowBricks) {
      if (brick.status === 1) {
        if (x + ballRadius > brick.x && 
            x - ballRadius < brick.x + brickWidth && 
            y + ballRadius > brick.y && 
            y - ballRadius < brick.y + brickHeight) {
          dy = -dy;
          brick.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            alert('Congratulations! You win!');
            //document.location.reload();
            return;
          }
          return;
        }
      }
    }
  }
}  */

// Function to handle collision detection with bricks
function collisionDetection() {
  let isCollided = false; // Flag to keep track of whether a collision occurred

  for (let rowBricks of bricks) {
    for (let brick of rowBricks) {
      if (brick.status === 1) {
        // Original collision check without changing the condition
        if (x + ballRadius > brick.x && 
            x - ballRadius < brick.x + brickWidth && 
            y + ballRadius > brick.y && 
            y - ballRadius < brick.y + brickHeight) {
          
          if (!isCollided) { // Check if collision has not occurred yet
            // Determine the side of the brick the ball hit and change direction accordingly
            dy = -dy;

            isCollided = true; // Set collided to true to indicate a collision occurred
          }

          brick.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            alert('Congratulations! You win!');
            //document.location.reload();
            return;
          }
        }
      }
    }
  }
}


update();


// м'яч пролітає скрізь блоки і не міняє діректшн
