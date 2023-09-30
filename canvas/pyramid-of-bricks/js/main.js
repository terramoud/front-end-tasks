"use strict"

// Get the canvas element
const canvas = document.getElementById("canvas");

// Set up the drawing context
const context = canvas.getContext("2d");

// Constants
const BRICK_HEIGHT = 20;
const BRICK_WIDTH = 40;
const BRICKS_IN_BASE = 7;

// Calculate pyramid dimensions
const pyramidWidth = BRICKS_IN_BASE * BRICK_WIDTH;
const pyramidHeight = BRICKS_IN_BASE * BRICK_HEIGHT;

// Calculate starting position of the pyramid
const startX = (canvas.width - pyramidWidth) / 2;
const startY = (canvas.height - pyramidHeight);

// Colors
const brickColor = '#A0522D';
const brickBorderColor = '#8B4513';

// Draw brick with borders
function drawBrick(x, y) {
  context.fillStyle = brickColor;
  context.fillRect(x, y, BRICK_WIDTH, BRICK_HEIGHT);

  context.strokeStyle = brickBorderColor;
  context.lineWidth = 2;
  context.strokeRect(x, y, BRICK_WIDTH, BRICK_HEIGHT);
}

// Draw pyramid
let currentX = startX;
let currentY = startY;

for (let row = 0; row < BRICKS_IN_BASE; row++) {
  let bricksInRow = row + 1;
  let rowOffset = (BRICKS_IN_BASE - bricksInRow) * (BRICK_WIDTH / 2);

  for (let brick = 0; brick < bricksInRow; brick++) {
    let x = currentX + brick * BRICK_WIDTH + rowOffset;
    let y = currentY;
    drawBrick(x, y);
  }

  currentY += BRICK_HEIGHT;
}