const canvas = document.querySelector("canvas");
const board = canvas.getContext("2d");

canvas.width  = DISPLAY_PIXEL.width  * ASPECT_RATIO.width;
canvas.height = DISPLAY_PIXEL.height * ASPECT_RATIO.height;

const TILE = 64;
const GY   = canvas.height - TILE;

const FLOOR_TILE    = "src/assets/Tiles/tile_0001.png";
const PLATFORM_TILE = "src/assets/Tiles/tile_0081.png";

const playerProperty = {
    width: 64, height: 64, speed: 4,
    position: { x: 100, y: canvas.height - 64 },
    sprites: {
        idle: "src/assets/player/Idle (32x32).png",
        run:  "src/assets/player/Run (32x32).png",
        jump: "src/assets/player/Jump (32x32).png",
        fall: "src/assets/player/Fall (32x32).png"
    }
};

const musuhProperty = {
    width: 64, height: 64,
    position: { x: 500, y: canvas.height - 64 },
    patrolDistance: 150,
    sprites: {
        idle: "src/assets/musuh/Idle (32x32).png",
        run:  "src/assets/musuh/Run (32x32).png",
        jump: "src/assets/musuh/Jump (32x32).png",
        fall: "src/assets/musuh/Fall (32x32).png",
        hit:  "src/assets/musuh/Hit (32x32).png"
    }
};

function makePlatform(startX, count, y, src, h = 24) {
    return Array.from({ length: count }, (_, i) => ({
        x: startX + i * TILE, y, w: TILE, h, src
    }));
}

const platformTiles = [
    ...makePlatform(200, 2, GY - TILE * 2, PLATFORM_TILE), 
    ...makePlatform(1300, 3, GY - TILE * 3, PLATFORM_TILE), 
    ...makePlatform(2400, 2, GY - TILE * 2, PLATFORM_TILE), 
];

const floorCount = Math.ceil(LEVEL_WIDTH / TILE);

const ground = new Ground({
    bgSrc: "src/assets/background/Pink.png",
    tileSize: 64,
    levelWidth: LEVEL_WIDTH,
    tiles: [
        ...Array.from({ length: floorCount }, (_, i) => ({
            x: i * TILE, y: GY, src: FLOOR_TILE
        })),
        ...platformTiles,
    ]
});

const dekorasi = new Dekorasi([
    { src: "src/assets/Tiles/tile_0010.png", x: 150,  y: GY - 96, w: 48, h: 96 },
    { src: "src/assets/Tiles/tile_0010.png", x: 600,  y: GY - 96, w: 48, h: 96 },
    { src: "src/assets/Tiles/tile_0010.png", x: 1100, y: GY - 96, w: 48, h: 96 },
    { src: "src/assets/Tiles/tile_0010.png", x: 1600, y: GY - 96, w: 48, h: 96 },
    { src: "src/assets/Tiles/tile_0010.png", x: 2100, y: GY - 96, w: 48, h: 96 },
]);

const levels = [
    // level 1
    {
        bgSrc: "src/assets/background/Pink.png",
        musuhSpeed: 1.5,
        musuhData: [
            { x: 500  }, { x: 900  }, { x: 1400 },
            { x: 1900 }, { x: 2400 }
        ],
        trapData: [
            { type: "spike", src: "src/assets/Traps/Spikes/Idle.png",
              x: 350,  y: GY - 32, width: 48, height: 32 },
            { type: "spike", src: "src/assets/Traps/Spikes/Idle.png",
              x: 750,  y: GY - 32, width: 48, height: 32 },
            { type: "spike", src: "src/assets/Traps/Spikes/Idle.png",
              x: 1200, y: GY - 32, width: 48, height: 32 },
            { type: "saw", src: "src/assets/Traps/Saw/On (38x38).png",
              x: 650,  y: GY - 200, width: 56, height: 56,
              spriteWidth: 38, moveRange: 120, moveSpeed: 2 },
            { type: "saw", src: "src/assets/Traps/Saw/On (38x38).png",
              x: 1500, y: GY - 200, width: 56, height: 56,
              spriteWidth: 38, moveRange: 150, moveSpeed: 2 },
        ],
        movingPlatformData: [
            { x: 400,  y: GY - TILE * 2, width: 128,
              moveType: "horizontal", moveRange: 150, moveSpeed: 2 },
            { x: 700,  y: GY - TILE * 3, width: 128,
              moveType: "vertical",   moveRange: 80,  moveSpeed: 2 },
            { x: 1000, y: GY - TILE * 2, width: 128,
              moveType: "horizontal", moveRange: 180, moveSpeed: 2.5 },
            { x: 1400, y: GY - TILE * 3, width: 128,
              moveType: "vertical",   moveRange: 100, moveSpeed: 2 },
            { x: 1700, y: GY - TILE * 2, width: 128,
              moveType: "horizontal", moveRange: 200, moveSpeed: 3 },
            { x: 2000, y: GY - TILE * 3, width: 128,
              moveType: "vertical",   moveRange: 120, moveSpeed: 2.5 },
            { x: 2200, y: GY - TILE * 2, width: 128,
              moveType: "horizontal", moveRange: 150, moveSpeed: 3 },
        ]
    },
    // level 2
    {
        bgSrc: "src/assets/background/Pink.png",
        musuhSpeed: 2.5,
        musuhData: [
            { x: 400  }, { x: 800  }, { x: 1200 },
            { x: 1600 }, { x: 2000 }, { x: 2500 }
        ],
        trapData: [
            { type: "spike", src: "src/assets/Traps/Spikes/Idle.png",
              x: 300,  y: GY - 32, width: 48, height: 32 },
            { type: "spike", src: "src/assets/Traps/Spikes/Idle.png",
              x: 600,  y: GY - 32, width: 48, height: 32 },
            { type: "spike", src: "src/assets/Traps/Spikes/Idle.png",
              x: 1000, y: GY - 32, width: 48, height: 32 },
            { type: "spike", src: "src/assets/Traps/Spikes/Idle.png",
              x: 1400, y: GY - 32, width: 48, height: 32 },
            { type: "saw", src: "src/assets/Traps/Saw/On (38x38).png",
              x: 500,  y: GY - 200, width: 56, height: 56,
              spriteWidth: 38, moveRange: 150, moveSpeed: 3 },
            { type: "saw", src: "src/assets/Traps/Saw/On (38x38).png",
              x: 1200, y: GY - 200, width: 56, height: 56,
              spriteWidth: 38, moveRange: 150, moveSpeed: 3 },
            { type: "saw", src: "src/assets/Traps/Saw/On (38x38).png",
              x: 2000, y: GY - 200, width: 56, height: 56,
              spriteWidth: 38, moveRange: 150, moveSpeed: 4 },
        ],
        movingPlatformData: [
            { x: 300,  y: GY - TILE * 2, width: 128,
              moveType: "horizontal", moveRange: 200, moveSpeed: 3.5 },
            { x: 600,  y: GY - TILE * 3, width: 128,
              moveType: "vertical",   moveRange: 120, moveSpeed: 3 },
            { x: 900,  y: GY - TILE * 2, width: 128,
              moveType: "horizontal", moveRange: 180, moveSpeed: 4 },
            { x: 1200, y: GY - TILE * 4, width: 128,
              moveType: "vertical",   moveRange: 140, moveSpeed: 3 },
            { x: 1500, y: GY - TILE * 2, width: 128,
              moveType: "horizontal", moveRange: 200, moveSpeed: 4 },
            { x: 1800, y: GY - TILE * 3, width: 128,
              moveType: "vertical",   moveRange: 150, moveSpeed: 3.5 },
            { x: 2100, y: GY - TILE * 2, width: 128,
              moveType: "horizontal", moveRange: 180, moveSpeed: 4.5 },
            { x: 2400, y: GY - TILE * 3, width: 128,
              moveType: "vertical",   moveRange: 120, moveSpeed: 4 },
        ]
    }
];

const camera = new Camera(canvas);
const player = new Player(playerProperty);

let gameState    = "menu";
let score        = 0;
let currentLevel = 0;

let movingPlatforms = [];
let activeMusuhs    = [];
let activeTrapList  = [];

function loadLevel(index) {
    const lvl = levels[index];

    player.hp         = 3;
    player.position.x = 100;
    player.position.y = canvas.height - 64;
    player.velocity.x = 0;
    player.velocity.y = 0;
    camera.x          = 0;

    movingPlatforms = lvl.movingPlatformData.map(p => new MovingPlatform({
        ...p, src: PLATFORM_TILE
    }));

    activeMusuhs = lvl.musuhData.map(m => new Musuh({
        ...musuhProperty,
        speed: lvl.musuhSpeed,
        position: { x: m.x, y: canvas.height - 64 }
    }));

    activeTrapList = lvl.trapData.map(t => new Trap({ ...t }));

    ground.bgImage.src = lvl.bgSrc;
}

function resetGame() {
    score        = 0;
    currentLevel = 0;
    loadLevel(0);
}

function drawHUD() {
    for (let i = 0; i < 3; i++) {
        board.fillStyle = i < player.hp ? "#e74c3c" : "#555";
        board.beginPath();
        board.arc(30 + i * 40, 30, 14, 0, Math.PI * 2);
        board.fill();
    }
    board.fillStyle = "white";
    board.font      = "bold 24px Arial";
    board.textAlign = "left";
    board.fillText("Score: " + score, 20, 70);
    board.fillText("Level: " + (currentLevel + 1), 20, 100);
}

function drawMenu() {
    board.fillStyle = "rgba(0,0,0,0.7)";
    board.fillRect(0, 0, canvas.width, canvas.height);

    board.fillStyle = "#f1c40f";
    board.font      = "bold 80px Arial";
    board.textAlign = "center";
    board.fillText("PLATFORMER", canvas.width / 2, canvas.height / 2 - 80);

    board.fillStyle = "white";
    board.font      = "28px Arial";
    board.fillText("Injak musuh untuk mengalahkan mereka!", canvas.width / 2, canvas.height / 2);
    board.fillText("Hindari spike dan saw!", canvas.width / 2, canvas.height / 2 + 40);

    board.fillStyle = "#2ecc71";
    board.beginPath();
    board.roundRect(canvas.width / 2 - 120, canvas.height / 2 + 90, 240, 60, 12);
    board.fill();
    board.fillStyle = "white";
    board.font      = "bold 32px Arial";
    board.fillText("MULAI", canvas.width / 2, canvas.height / 2 + 130);

    board.fillStyle = "#aaa";
    board.font      = "20px Arial";
    board.fillText("Tekan ENTER atau SPACE untuk mulai", canvas.width / 2, canvas.height / 2 + 190);
    board.fillText("WASD / Arrow Keys untuk bergerak", canvas.width / 2, canvas.height / 2 + 220);
}

function drawGameOver() {
    board.fillStyle = "rgba(0,0,0,0.7)";
    board.fillRect(0, 0, canvas.width, canvas.height);

    board.fillStyle = "#e74c3c";
    board.font      = "bold 80px Arial";
    board.textAlign = "center";
    board.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 60);

    board.fillStyle = "white";
    board.font      = "bold 36px Arial";
    board.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 10);

    board.fillStyle = "#2ecc71";
    board.beginPath();
    board.roundRect(canvas.width / 2 - 120, canvas.height / 2 + 60, 240, 60, 12);
    board.fill();
    board.fillStyle = "white";
    board.font      = "bold 28px Arial";
    board.fillText("MAIN LAGI (R)", canvas.width / 2, canvas.height / 2 + 100);
}

function drawLevelClear() {
    board.fillStyle = "rgba(0,0,0,0.6)";
    board.fillRect(0, 0, canvas.width, canvas.height);

    board.fillStyle = "#f1c40f";
    board.font      = "bold 80px Arial";
    board.textAlign = "center";
    board.fillText("LEVEL CLEAR!", canvas.width / 2, canvas.height / 2 - 60);

    board.fillStyle = "white";
    board.font      = "bold 36px Arial";
    board.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 10);

    board.fillStyle = "#2ecc71";
    board.beginPath();
    board.roundRect(canvas.width / 2 - 120, canvas.height / 2 + 60, 240, 60, 12);
    board.fill();
    board.fillStyle = "white";
    board.font      = "bold 28px Arial";
    board.fillText("LANJUT (ENTER)", canvas.width / 2, canvas.height / 2 + 100);
}

function drawWinGame() {
    board.fillStyle = "rgba(0,0,0,0.7)";
    board.fillRect(0, 0, canvas.width, canvas.height);

    board.fillStyle = "#f1c40f";
    board.font      = "bold 72px Arial";
    board.textAlign = "center";
    board.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2 - 60);

    board.fillStyle = "white";
    board.font      = "bold 40px Arial";
    board.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 20);

    board.fillStyle = "#2ecc71";
    board.beginPath();
    board.roundRect(canvas.width / 2 - 140, canvas.height / 2 + 70, 280, 60, 12);
    board.fill();
    board.fillStyle = "white";
    board.font      = "bold 28px Arial";
    board.fillText("MAIN LAGI (R)", canvas.width / 2, canvas.height / 2 + 110);
}

function animate() {
    board.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "menu") {
        drawMenu();
        window.requestAnimationFrame(animate);
        return;
    }
    if (gameState === "gameover") {
        drawGameOver();
        window.requestAnimationFrame(animate);
        return;
    }
    if (gameState === "levelclear") {
        drawLevelClear();
        window.requestAnimationFrame(animate);
        return;
    }
    if (gameState === "wingame") {
        drawWinGame();
        window.requestAnimationFrame(animate);
        return;
    }

    camera.update(player);

    board.save();
    camera.apply();

    ground.create();
    dekorasi.create();

    movingPlatforms.forEach(mp => {
        mp.update();
        mp.create();
        mp.collideWithPlayer(player);
    });

    activeTrapList.forEach(trap => {
        trap.update();
        trap.create();
        if (trap.isHitting(player)) player.takeDamage();
    });

    player.update();
    Collision.playerVsPlatform(player, platformTiles, TILE);
    player.create();

    activeMusuhs.forEach(musuh => {
        musuh.update();
        musuh.create();
        const hit = Collision.playerVsMusuh(player, musuh);
        if (hit === "stomp") {
            musuh.isDead = true;
            player.velocity.y = -10;
            score += 100;
        } else if (hit === "hit") {
            player.takeDamage();
        }
    });

    board.restore();
    drawHUD();

    if (player.hp <= 0) {
        gameState = "gameover";
    }

    if (activeMusuhs.length > 0 && activeMusuhs.every(m => m.isDead)) {
        score += 500;
        gameState = "levelclear";
    }

    window.requestAnimationFrame(animate);
}

window.addEventListener("keydown", function(e) {
    if (gameState === "menu" && (e.key === "Enter" || e.key === " ")) {
        loadLevel(0);
        gameState = "playing";
        return;
    }

    if (gameState === "levelclear" && e.key === "Enter") {
        currentLevel++;
        if (currentLevel >= levels.length) {
            gameState = "wingame";
        } else {
            loadLevel(currentLevel);
            gameState = "playing";
        }
        return;
    }

    if ((gameState === "gameover" || gameState === "wingame") &&
        (e.key === "r" || e.key === "R")) {
        resetGame();
        gameState = "playing";
        return;
    }

    if (gameState === "playing") {
        player.movement(e.key, true);
    }
});

window.addEventListener("keyup", function(e) {
    player.movement(e.key, false);
});

loadLevel(0);
animate();