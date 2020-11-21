const SCALE = 2;
const WIDTH = 16;
const HEIGHT = 18;
const SCALED_HEIGHT = SCALE * HEIGHT;
const SCALED_WIDTH = SCALE * WIDTH;
const MOVEMENT_SPEED = 2;
const FACING_DOWN = 0;
const FACING_UP = 1;
const FACING_LEFT = 2;
const FACING_RIGHT = 3;
const FRAME_LIMIT = 12;
const MAX_JUMP = -30;
let GRAVITY = 5;
let velocityY = 0;
let currentDirection = FACING_DOWN;
let positionX = 0;
let positionY = 0;
let isJumping = false;
let canJump = true;
let img = new Image();

const CYCLE_LOOP = [0, 1, 0, 2];
let loopIndex = 0;
let frameCount = 0;
let currentDir = 0;


let keypresses = {};

window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
    keypresses[event.key] = true;
}
window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
    keypresses[event.key] = false;
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


function loadImage() {
    img.src = 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png';
    img.onload = function () {
        gameLoop();
    }
}

function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img, frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT, canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let hasMoved = false;
    // if (keypresses.w) {
    //     moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
    //     hasMoved = true;
    // } else if (keypresses.s) {
    //     moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
    //     hasMoved = true;
    // }
    if (velocityY <= -2) {
        velocityY += 2;
    } else {
        isJumping = false;
    }

    moveCharacter(0, MOVEMENT_SPEED * GRAVITY + velocityY, 0, currentDirection);

    if (keypresses.a) {
        moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
        hasMoved = true;
    } else if (keypresses.d) {
        moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
        hasMoved = true;
    }

    if (keypresses[" "]) {
        if (canJump && !isJumping) {
            isJumping = true;
            canJump = false;
            velocityY = MAX_JUMP;
        }
    }
  
    if (hasMoved) {
        frameCount++;
        if (frameCount >= FRAME_LIMIT) {
            frameCount = 0;
            loopIndex = (loopIndex + 1) % CYCLE_LOOP.length;
        }
    } else {
        loopIndex = 0;
    }

    drawFrame(CYCLE_LOOP[loopIndex], currentDirection, positionX, positionY);
    window.requestAnimationFrame(gameLoop)
}

function moveCharacter(deltaX, deltaY, direction) {
    if (positionX + deltaX >= 0 && positionX + deltaX + SCALED_WIDTH < canvas.width) {
        positionX += deltaX;
    }
    if (positionY + deltaY >= 0 && positionY + deltaY + SCALED_HEIGHT < canvas.height) {
        positionY += deltaY;
    } else { canJump = true}
    currentDirection = direction;
}



loadImage();