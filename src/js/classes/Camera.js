class Camera {
    constructor(canvas) {
        this.x = 0;
        this.y = 0;
        this.canvas = canvas;
        this.levelWidth = LEVEL_WIDTH; // pakai constant langsung
    }

    update(player) {
        this.x = player.position.x - this.canvas.width / 3;
        if (this.x < 0) this.x = 0;
        if (this.x > this.levelWidth - this.canvas.width) {
            this.x = this.levelWidth - this.canvas.width;
        }
    }

    apply() {
        board.translate(-this.x, 0);
    }

    reset() {
        board.translate(this.x, 0);
    }
}