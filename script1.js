var canvas, stage, container;

function initHearts() {
    canvas = document.getElementById("backgroundCanvas");
    stage = new createjs.Stage(canvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    container = new createjs.Container();
    stage.addChild(container);

    for (let i = 0; i < 300; i++) {
        const heart = new createjs.Shape();
        heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 20));
        heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10)
            .curveTo(16, 0, 0, 12).curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20)
            .curveTo(-1, -20, 0, -12);
        heart.x = Math.random() * canvas.width;
        heart.y = Math.random() * canvas.height;
        heart.scaleX = heart.scaleY = Math.random() * 1 + 0.8;
        heart.alpha = Math.random() * 0.7 + 0.3;

        // Add custom movement properties
        heart.velX = Math.random() * 2 - 1; // Random speed in X (-1 to 1)
        heart.velY = Math.random() * 2 - 1; // Random speed in Y (-1 to 1)

        container.addChild(heart);
    }

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on("tick", tickHearts);
}

function tickHearts() {
    container.children.forEach((heart) => {
        // Update position
        heart.x += heart.velX;
        heart.y += heart.velY;

        // Reset position if out of bounds
        if (heart.x < -20) heart.x = canvas.width + 20;
        if (heart.x > canvas.width + 20) heart.x = -20;
        if (heart.y < -20) heart.y = canvas.height + 20;
        if (heart.y > canvas.height + 20) heart.y = -20;
    });
    stage.update();
}

initHearts();

function openGift() {
    let giftBox = document.getElementById("giftBox");
    giftBox.classList.add("open-animation");
    
    let music = document.getElementById("music");
    music.muted = false;
    music.volume = 0.2;

    setTimeout(() => {
        window.location.href = "index3.html";
    }, 1500);  // Transition after animation
}


function openCard() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('birthdayCard').style.display = 'none';
}
