const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.96;
canvas.height = window.innerHeight * 0.96;

const scaleWidth = canvas.width / 600;
const scaleHeight = canvas.height / 980;
ctx.scale(scaleWidth, scaleHeight);

const CARD_MOVE_SPEED = 20;
let counter = 5;
let cards = generateCards();
let playedCards = [];

let nextCardIndex = 4;

function generateCards() {
    const cardWidth = 95;
    const cardHeight = 120;
    const gap = 5;
    const totalWidthFor4Cards = 4 * cardWidth + 3 * gap;
    const shiftRight = 65;
    let initialCards = Array(8).fill().map((_, i) => ({
        x: (600 - totalWidthFor4Cards) / 2 + (i % 4) * (cardWidth + gap) + shiftRight,
        y: 850,
        width: cardWidth,
        height: cardHeight,
        dragging: false,
        label: i + 1,
        visible: i < 4
    }));

    return initialCards;
}

function draw() {
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, 600, 840);

    const towersColors = ["darkblue", "blue", "darkblue", "blue", "darkblue", "blue", "brown", "red", "brown", "red", "brown", "red"];
    const towersCoords = [[250, 20, 100, 100], [260, 30, 80, 80], [50, 110, 100, 100], [60, 120, 80, 80],
    [450, 110, 100, 100], [460, 120, 80, 80], [250, 720, 100, 100], [260, 730, 80, 80],
    [50, 630, 100, 100], [60, 640, 80, 80], [450, 630, 100, 100], [460, 640, 80, 80]];
    towersColors.forEach((color, index) => {
        ctx.fillStyle = color;
        const coord = towersCoords[index];
        ctx.fillRect(coord[0], coord[1], coord[2], coord[3]);
    });

    const channelsColors = ["gray", "lightgray", "gray", "lightgray", "darkgreen", "green"];
    const channelsCoords = [[80, 210, 40, 420], [87, 210, 26, 420], [480, 210, 40, 420], [487, 210, 26, 420],
    [0, 400, 600, 40], [0, 407, 600, 26]];
    channelsColors.forEach((color, index) => {
        ctx.fillStyle = color;
        const coord = channelsCoords[index];
        ctx.fillRect(coord[0], coord[1], coord[2], coord[3]);
    });

    const channelEndsColors = ["gray", "lightgray", "gray", "gray", "lightgray", "gray"];
    const channelEndsCoords = [[65, 385, 70, 70], [68, 388, 64, 64], [75, 395, 50, 50], [465, 385, 70, 70],
    [468, 388, 64, 64], [475, 395, 50, 50]];
    channelEndsColors.forEach((color, index) => {
        ctx.fillStyle = color;
        const coord = channelEndsCoords[index];
        ctx.fillRect(coord[0], coord[1], coord[2], coord[3]);
    });

    ctx.fillStyle = "green";
    ctx.fillRect(0, 840, 600, 140);

    ctx.beginPath();
    ctx.arc(50, 925, 30, 0, 2 * Math.PI);
    ctx.arc(80, 925, 30, 0, 2 * Math.PI);
    ctx.arc(65, 940, 30, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(65, 927, 13, 0, 2 * Math.PI);
    ctx.fillStyle = "gray";
    ctx.fill();

    ctx.clearRect(7, 848, 120, 35);
    ctx.font = "30px Arial";
    ctx.fillStyle = "gray";
    ctx.fillText("聖水: " + counter, 21, 876);

    cards.forEach((card, _) => {
        if (card.visible) {
            ctx.fillStyle = "black";
            ctx.fillRect(card.x, card.y, card.width, card.height);
            ctx.fillStyle = "#F7E8AA";
            ctx.fillRect(card.x + 5, card.y + 5, card.width - 10, card.height - 10);
            ctx.font = "25px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(card.label, card.x + card.width / 2 - 10, card.y + card.height / 2 + 10);
        }
    });

    playedCards.forEach((card, _) => {
        ctx.fillStyle = "black";
        ctx.fillRect(card.x, card.y, card.width, card.height);
        ctx.fillStyle = "#F7E8AA";
        ctx.fillRect(card.x + 5, card.y + 5, card.width - 10, card.height - 10);

        ctx.font = "25px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(card.label, card.x + card.width / 2 - 10, card.y + card.height / 2 + 10);
    });
}

function getPointFromEvent(event) {
    return event.touches ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : { x: event.clientX, y: event.clientY };
}

function startDrag(event) {
    if ((counter - 4) >= 0) {
        const point = getPointFromEvent(event);
        cards.forEach(card => {
            if (point.x > card.x * scaleWidth && point.x < (card.x + card.width) * scaleWidth &&
                point.y > card.y * scaleHeight && point.y < (card.y + card.height) * scaleHeight) {
                card.dragging = true;
            }
        });
    }
}

function drag(event) {
    const point = getPointFromEvent(event);
    cards.forEach(card => {
        if (card.dragging) {
            card.x = point.x / scaleWidth - card.width / 2;
            card.y = point.y / scaleHeight - card.height / 2;
            draw();
        }
    });
}

function endDrag(_) {
    let handled = false;
    cards.forEach((card, index) => {
        if (card.dragging && !handled) {
            card.dragging = false;
            handled = true;
            counter -= 4;
            playedCards.push({
                x: card.x,
                y: card.y,
                width: card.width * 0.8,
                height: card.height * 0.8,
                label: card.label,
                moving: true
            });

            card.label += 4;
            if (card.label > 8) {
                card.label -= 8;
            }

            card.x = (600 - 4 * 95 - 3 * 5) / 2 + index * (95 + 5) + 65;
            card.y = 850;

            draw();
        }
    });
}

function movePlayedCards() {
    playedCards.forEach(card => {
        if (card.moving) {
            card.y -= CARD_MOVE_SPEED;

            if (card.y <= 0) {
                card.y = 0;
                card.moving = false;
            }
        }
    });
}

function init() {
    draw();
    setInterval(() => {
        if (counter < 9) {
            counter++;
        }
        draw();
    }, 500);

    setInterval(() => {
        movePlayedCards();
        draw();
    }, 500);

    ['touchstart', 'mousedown'].forEach(evt => canvas.addEventListener(evt, startDrag));
    ['touchmove', 'mousemove'].forEach(evt => canvas.addEventListener(evt, drag));
    ['touchend', 'mouseup'].forEach(evt => canvas.addEventListener(evt, endDrag));
}

init();
