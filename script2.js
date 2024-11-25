var canvas;
var stage;
var container;
var captureContainers;
var captureIndex;

function init() {
  // create a new stage and point it at our canvas:
  canvas = document.getElementById("testCanvas");
  stage = new createjs.Stage(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var w = canvas.width;
  var h = canvas.height;

  container = new createjs.Container();
  stage.addChild(container);

  captureContainers = [];
  captureIndex = 0;

  // create a large number of slightly complex vector shapes, and give them random positions and velocities:
		for (var i = 0; i < 100; i++) {
			var heart = new createjs.Shape();
			heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 30));
			heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
			heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);
			heart.y = -100;

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
