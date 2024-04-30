var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var isDrawing = false;

var startX;
var startY;

var currentColor = 'black';


function startDrawing(event) {
    isDrawing = true;
    startX = event.clientX - canvas.offsetLeft;
    startY = event.clientY - canvas.offsetTop;
}

function draw(event) {
    if (!isDrawing) return;

    var mouseX = event.clientX - canvas.offsetLeft;
    var mouseY = event.clientY - canvas.offsetTop;

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(mouseX, mouseY);
    context.strokeStyle = currentColor;
    context.stroke();

    startX = mouseX;
    startY = mouseY;
}

function stopDrawing() {
    isDrawing = false;
}

// 추가
document.addEventListener('keydown', function(event) {
    var key = event.key;
    if (key === 'r') {
        currentColor = 'red';
    } else if (key === 'g') {
        currentColor = 'green';
    } else if (key === 'b') {
        currentColor = 'blue';
    } else if (key === 'w') {
        currentColor = 'white';
    } else if (key === 'c') {    // 삭제
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);