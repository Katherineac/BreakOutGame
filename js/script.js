var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var x = canvasWidth / 2;
var y = canvasHeight - 30;
var addToX = 2;
var addToY = -2;

var ballRadius = 5;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvasWidth - paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 50;
var brickHeight = 15;
var brickPadding = 5;
var brickOffsetTop = 10;
var brickOffsetLeft = 10;

var score = 0;
var lives = 3;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

var bricks = [];
for(col=0; col<brickColumnCount; col++) {
    bricks[col] = [];
    for(row=0; row<brickRowCount; row++) {
        bricks[col][row] = { x: 0, y: 0, status: 1};
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#2B60DE";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#2B60DE";
    ctx.fill();
    ctx.closePath();
}

function keyDownHandler(e){
    if (e.keyCode == 39){
        rightPressed = true;
    }else if (e.keyCode == 37){
        leftPressed = true;
    }
}

function keyUpHandler(e){
     if (e.keyCode == 39){
        rightPressed = false;
    }else if (e.keyCode == 37){
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX  > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth / 2;
    }
}

function drawBricks() {
    for(col=0; col<brickColumnCount; col++) {
        for(row=0; row<brickRowCount; row++) {
            if (bricks[col][row].status == 1){
                var brickX = (col*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (row*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[col][row].x = brickX;
                bricks[col][row].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#2B60DE";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (col = 0; col < brickColumnCount; col++){
        for (row = 0; row < brickRowCount; row++){
            var brick = bricks[col][row];
            if (brick.status == 1){
                  if(x > brick.x && x < brick.x+brickWidth && y > brick.y && y < brick.y+brickHeight) {
                    addToY = -addToY;
                    brick.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 120);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvasWidth - 65, 120);
}
    
function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
     if (x + addToX > canvasWidth - ballRadius || x + addToX < ballRadius){
        addToX = -addToX;
    }
    if (y + addToY < ballRadius){
        addToY = -addToY;
    }else if (y + addToY > canvasHeight - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth){
            addToY = -addToY;
        }else{
            lives--;
            if(!lives) {
                alert("Game Over");
                document.location.reload();
            } else {
                x = canvasWidth / 2;
                y = canvasHeight - 30;
                addToX = 3;
                addToY = -3;
                paddleX = (canvasWidth-paddleWidth)/2;
            }
        }
    }
    
    if (rightPressed && paddleX < canvasWidth - paddleWidth ){
        paddleX += 7;
    }else if (leftPressed && paddleX > 0){
        paddleX -= 7;
    }
    x += addToX;
    y += addToY;
    
    requestAnimationFrame(draw);
}

draw();
