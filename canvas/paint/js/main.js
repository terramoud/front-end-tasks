"use strict"

// Get the canvas element
const canvas = document.getElementById("canvas");

// Set up the drawing context
const context = canvas.getContext("2d");
context.lineWidth = 2;
context.strokeStyle = "black";

// Variables to store the current position
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Event listeners for mouse actions
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Function to start drawing
function startDrawing(e) {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
}

// Function to draw
function draw(e) {
	if (!isDrawing) return;

	context.beginPath();
	context.moveTo(lastX, lastY);
	context.lineTo(e.offsetX, e.offsetY);
	context.stroke();

	[lastX, lastY] = [e.offsetX, e.offsetY];
}

// Function to stop drawing
function stopDrawing() {
	isDrawing = false;
}
