class Trap {
    constructor(props) {
        this.x          = props.x;
        this.y          = props.y;
        this.width      = props.width  || 64;
        this.height     = props.height || 64;
        this.type       = props.type   || "spike";

        // animasi spritesheet
        this.frameX      = 0;
        this.frameSpeed  = props.frameSpeed || 6;
        this.gameFrame   = 0;
        this.spriteWidth = props.spriteWidth || 0; // 0 = pakai full image

        this.img = new Image();
        this.img.src = props.src;

        // gerak naik turun (untuk saw)
        this.startY    = props.y;
        this.moveRange = props.moveRange || 0;
        this.moveSpeed = props.moveSpeed || 1;
        this.moveDir   = 1;
    }

    update() {
        if (this.moveRange > 0) {
            this.y += this.moveSpeed * this.moveDir;
            if (this.y > this.startY + this.moveRange) this.moveDir = -1;
            if (this.y < this.startY - this.moveRange) this.moveDir =  1;
        }
        this.gameFrame++;
    }

    create() {
        if (!this.img.complete || this.img.naturalWidth === 0) return;

        if (this.type === "saw") {
            // saw: rotasi + animasi frame
            const sw = this.spriteWidth || this.img.naturalWidth;
            const maxFrame = Math.floor(this.img.naturalWidth / sw);

            if (this.gameFrame % this.frameSpeed === 0) {
                this.frameX++;
                if (this.frameX >= maxFrame) this.frameX = 0;
            }

            board.save();
            board.translate(
                this.x + this.width  / 2,
                this.y + this.height / 2
            );
            board.rotate(this.gameFrame * 0.08);
            board.drawImage(
                this.img,
                this.frameX * sw, 0, sw, this.img.naturalHeight,
                -this.width / 2, -this.height / 2,
                this.width, this.height
            );
            board.restore();

        } else {
            // spike: gambar langsung
            board.drawImage(
                this.img,
                0, 0, this.img.naturalWidth, this.img.naturalHeight,
                this.x, this.y, this.width, this.height
            );
        }
    }

    isHitting(player) {
        return (
            player.position.x < this.x + this.width  &&
            player.position.x + player.width  > this.x &&
            player.position.y < this.y + this.height &&
            player.position.y + player.height > this.y
        );
    }
}

class MovingPlatform {
    constructor(props) {
        this.x      = props.x;
        this.y      = props.y;
        this.width  = props.width  || 192; 
        this.height = props.height || 24;
        this.src    = props.src;

        this.startX    = props.x;
        this.startY    = props.y;
        this.moveType  = props.moveType || "horizontal"; 
        this.moveRange = props.moveRange || 150;
        this.moveSpeed = props.moveSpeed || 2;
        this.moveDir   = 1;

        this.img = new Image();
        this.img.src = props.src;

        this.velocityX = 0;
        this.velocityY = 0;
    }

    update() {
        const prevX = this.x;
        const prevY = this.y;

        if (this.moveType === "horizontal") {
            this.x += this.moveSpeed * this.moveDir;
            if (this.x > this.startX + this.moveRange) this.moveDir = -1;
            if (this.x < this.startX - this.moveRange) this.moveDir =  1;
        } else {
            this.y += this.moveSpeed * this.moveDir;
            if (this.y > this.startY + this.moveRange) this.moveDir = -1;
            if (this.y < this.startY - this.moveRange) this.moveDir =  1;
        }

        this.velocityX = this.x - prevX;
        this.velocityY = this.y - prevY;
    }

    create() {
        if (!this.img.complete) return;
  
        const tileW = 16;
        const count = Math.ceil(this.width / 64);
        for (let i = 0; i < count; i++) {
            board.drawImage(
                this.img,
                0, 0, tileW, tileW,
                this.x + i * 64, this.y, 64, this.height
            );
        }
    }

    isPlayerOnTop(player) {
        const tolerance = 8;
        return (
            player.position.x + player.width  > this.x &&
            player.position.x < this.x + this.width &&
            player.position.y + player.height >= this.y - tolerance &&
            player.position.y + player.height <= this.y + this.height &&
            player.velocity.y >= 0
        );
    }

    collideWithPlayer(player) {
        if (!this.isPlayerOnTop(player)) return;
        player.position.y = this.y - player.height;
        player.velocity.y = 0;
        player.jumpCount  = 0;

        player.position.x += this.velocityX;
        player.position.y += this.velocityY;
    }
}