const canvas = document.querySelector("canvas");
const board = canvas.getContext("2d");

canvas.width = DISPLAY_PIXEL.width * ASPECT_RATIO.width;
canvas.height = DISPLAY_PIXEL.height * ASPECT_RATIO.height;

const playerProperty = {
    width: 64, height: 64, speed: 2,
    position: { x: 100, y: canvas.height - 64 },
    sprites: {
        idle: "src/assets/player/Idle (32x32).png",
        run:  "src/assets/player/Run (32x32).png",
        jump: "src/assets/player/Jump (32x32).png",
        fall: "src/assets/player/Fall (32x32).png"
    }
};

const musuhProperty = {
    width: 64, height: 64, speed: 1.5,
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

const TILE = 64;
const GY = canvas.height - TILE;
const FLOOR_TILE    = "src/assets/Tiles/tile_0001.png";
const PLATFORM_TILE = "src/assets/Tiles/tile_0081.png";

function makePlatform(startX, count, y, src, h = 64) {
    return Array.from({ length: count }, (_, i) => ({
        x: startX + i * TILE, y, w: TILE, h, src
    }));
}

const platformTiles = [
    ...makePlatform(200, 3, GY - TILE * 2, PLATFORM_TILE, 24),
];

const ground = new Ground({
    bgSrc: "src/assets/background/Pink.png",
    tileSize: 64,
    tiles: [
        ...Array.from({ length: Math.ceil(canvas.width / TILE) }, (_, i) => ({
            x: i * TILE, y: GY, src: FLOOR_TILE
        })),
        ...platformTiles,
    ]
});

const player = new Player(playerProperty);

const musuhList = [
    new Musuh({ ...musuhProperty, position: { x: 400, y: canvas.height - 64 } }),
    new Musuh({ ...musuhProperty, position: { x: 700, y: canvas.height - 64 }, patrolDistance: 200 }),
    new Musuh({ ...musuhProperty, position: { x: 1000, y: canvas.height - 64 } }),
];

const dekorasi = new Dekorasi([
    { src: "src/assets/Tiles/tile_0010.png", x: 150, y: GY - 96, w: 48, h: 96 },
    { src: "src/assets/Tiles/tile_0010.png", x: 600, y: GY - 96, w: 48, h: 96 },
    { src: "src/assets/Tiles/tile_0010.png", x: 900, y: GY - 96, w: 48, h: 96 },
]);

let score = 0;

function drawHP() {
    for (let i = 0; i < 3; i++) {
        board.fillStyle = i < player.hp ? "#e74c3c" : "#555";
        board.beginPath();
        board.arc(30 + i * 40, 30, 14, 0, Math.PI * 2);
        board.fill();
    }
    board.fillStyle = "white";
    board.font = "bold 24px Arial";
    board.textAlign = "left";
    board.fillText("Score: " + score, 20, 70);
}

function animate() {
    board.clearRect(0, 0, canvas.width, canvas.height);

    ground.create();
    dekorasi.create();

    player.update();
    Collision.playerVsPlatform(player, platformTiles, TILE);
    player.create();

    musuhList.forEach(musuh => {
        musuh.update();
        musuh.create();
        const hitResult = Collision.playerVsMusuh(player, musuh);
        if (hitResult === "stomp") {
            musuh.isDead = true;
            player.velocity.y = -10;
            score += 100;
        } else if (hitResult === "hit") {
            player.takeDamage();
        }
    });

    drawHP();

    if (player.hp <= 0) {
        board.fillStyle = "rgba(0,0,0,0.6)";
        board.fillRect(0, 0, canvas.width, canvas.height);
        board.fillStyle = "white";
        board.font = "bold 64px Arial";
        board.textAlign = "center";
        board.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        board.font = "24px Arial";
        board.fillText("Tekan R untuk main lagi", canvas.width / 2, canvas.height / 2 + 60);
        board.font = "bold 32px Arial";
        board.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 110);
        return;
    }

    window.requestAnimationFrame(animate);
}

window.addEventListener("keydown", function(e) {
    player.movement(e.key, true);

    if (e.key === "r" || e.key === "R") {
        score = 0; 
        player.hp = 3;
        player.position.x = 100;
        player.position.y = canvas.height - 64;
        player.velocity.x = 0;
        player.velocity.y = 0;
        musuhList.forEach((musuh, i) => {
            musuh.isDead = false;
            musuh.dieTimer = 30;
            musuh.position.x = [400, 700, 1000][i];
            musuh.position.y = canvas.height - 64;
            musuh.velocity.x = -musuh.speed;
        });
        animate();
    }
});

window.addEventListener("keyup", function(e) {
    player.movement(e.key, false);
});

animate();