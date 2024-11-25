function openCard() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('birthdayCard').style.display = 'none';

    // เปิดเสียงเพลงและเล่นต่อ
    const music = document.getElementById('music');
    music.muted = false;
    music.play();

    // เรียกใช้งานเอฟเฟกต์คอนเฟตติ
    confettiEffect();
}

// ---------------------------------------------------------------------------------------

// Canvas animation for moving hearts
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

    for (let i = 0; i < 50; i++) {
        const heart = new createjs.Shape();
        heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 30));
        heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10)
            .curveTo(16, 0, 0, 12).curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20)
            .curveTo(-1, -20, 0, -12);
        heart.x = Math.random() * canvas.width;
        heart.y = Math.random() * canvas.height;
        heart.scaleX = heart.scaleY = Math.random() * 1.3 + 0.8;
        heart.alpha = Math.random() * 0.7 + 0.3;

        container.addChild(heart);
    }

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on("tick", tickHearts);
}

function tickHearts() {
    container.children.forEach((heart) => {
        heart.y -= 1 * heart.scaleY;
        if (heart.y < -20) {
            heart.y = canvas.height + 20;
            heart.x = Math.random() * canvas.width;
        }
    });
    stage.update();
}

initHearts();
