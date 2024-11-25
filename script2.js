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

window.onload = function() {
    let music = document.getElementById("music");
    music.volume = 0.4;  // Reduced volume for a softer background
}


// ---------------------------------------------------------------------------------------

// Canvas animation for moving hearts
var canvas, stage, container, captureContainers, captureIndex;

function initHearts() {
    // Canvas and Stage Setup
    canvas = document.getElementById("backgroundCanvas");
    stage = new createjs.Stage(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var w = canvas.width;
    var h = canvas.height;

    container = new createjs.Container();
    stage.addChild(container);

    captureContainers = [];
    captureIndex = 0;

    // Create Hearts
    for (var i = 0; i < 100; i++) {
        var heart = new createjs.Shape();
        heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 360, 100, 50));
        heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10)
            .curveTo(16, 0, 0, 12).curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20)
            .curveTo(-1, -20, 0, -12);
        heart.y = -100;

        container.addChild(heart);
    }

    for (i = 0; i < 100; i++) {
        var captureContainer = new createjs.Container();
        captureContainer.cache(0, 0, w, h);
        captureContainers.push(captureContainer);
    }

    // Ticker for Animation
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on("tick", tickHearts);
}

function tickHearts(event) {
    var w = canvas.width;
    var h = canvas.height;
    var l = container.numChildren;

    captureIndex = (captureIndex + 1) % captureContainers.length;
    stage.removeChildAt(0);
    var captureContainer = captureContainers[captureIndex];
    stage.addChildAt(captureContainer, 0);
    captureContainer.addChild(container);

    // Animate Hearts
    for (var i = 0; i < l; i++) {
        var heart = container.getChildAt(i);
        if (heart.y < -50) {
            heart._x = Math.random() * w;
            heart.y = h * (1 + Math.random()) + 50;
            heart.perX = (1 + Math.random() * 2) * h;
            heart.offX = Math.random() * h;
            heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
            heart.velY = -Math.random() * 2 - 1;
            heart.scale = Math.random() * 2 + 1;
            heart._rotation = Math.random() * 40 - 20;
            heart.alpha = Math.random() * 0.75 + 0.05;
            heart.compositeOperation = Math.random() < 0.33 ? "lighter" : "source-over";
        }
        var int = (heart.offX + heart.y) / heart.perX * Math.PI * 2;
        heart.y += heart.velY * heart.scaleX / 2;
        heart.x = heart._x + Math.cos(int) * heart.ampX;
        heart.rotation = heart._rotation + Math.sin(int) * 30;
    }

    captureContainer.updateCache("source-over");
    stage.update(event);
}

// Initialize Animation
initHearts();
