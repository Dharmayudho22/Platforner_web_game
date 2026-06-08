class Player {
    constructor(props) {
        this.width = props.width;
        this.height = props.height;
        this.speed = props.speed;

        this.position = {
            x: props.position.x,
            y: props.position.y
        };

        this.velocity = {
            x: 0,
            y: 0
        };

        this.gravity = 0.5;
        this.heightJump = 5;
        this.jumpCount = 0;
        this.direction = "right";

        this.frameX = 0;
        this.frameSpeed = 6;
        this.gameFrame = 0;

        this.spriteWidth = 32;
        this.spriteHeight = 32;
        this.currentAnimation = "idle";

        this.hp = 3;
        this.invincible = 0;

        this.sprites = {};
        for (const key in props.sprites) {
            const img = new Image();
            img.src = props.sprites[key];
            this.sprites[key] = img;
        }
    }

    movement(direction, isPressed) {
        switch(direction) {
            case "ArrowUp":
            case "w":
            case "W":
                if (isPressed) {
                    if(this.jumpCount < 2){
                        this.velocity.y = -14;
                        this.jumpCount++;
                    }
                }
                break;
            case "ArrowLeft":
            case "a":
            case "A":
                if(isPressed){
                    this.velocity.x = -this.speed;
                    this.direction = "left";
                } else {
                    if(this.velocity.x < 0) this.velocity.x = 0;
                }
                break;
            case "ArrowRight":
            case "d":
            case "D":
                if(isPressed){
                    this.velocity.x = this.speed;
                    this.direction = "right";
                } else {
                    if(this.velocity.x > 0) this.velocity.x = 0;
                }
                break;
        }
    }

    // DITAMBAH: player kena damage
    takeDamage() {
        if (this.invincible > 0) return; // masih invincible, skip
        this.hp--;
        this.invincible = 90; // ~1.5 detik tidak bisa kena lagi
        // knockback
        this.velocity.y = -8;
        this.velocity.x = this.direction === "right" ? -3 : 3;
    }

    update() {
        const ground = canvas.height - this.height;

        this.velocity.y += this.gravity;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y >= ground){
            this.position.y = ground;
            this.velocity.y = 0;
            this.jumpCount = 0;
        }

        // batasi player tidak keluar layar
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x + this.width > canvas.width) {
            this.position.x = canvas.width - this.width;
        }

        // DITAMBAH: kurangi timer invincible tiap frame
        if(this.invincible > 0) this.invincible--;

        if(this.velocity.y < 0){
            this.currentAnimation = "jump";
        } else if(this.velocity.y > 1){
            this.currentAnimation = "fall";
        } else if(this.velocity.x !== 0){
            this.currentAnimation = "run";
        } else {
            this.currentAnimation = "idle";
        }
    }

    create() {
        const image = this.sprites[this.currentAnimation];
        if(!image) return;

        const maxFrame = Math.floor(image.width / this.spriteWidth);

        if(this.gameFrame % this.frameSpeed === 0){
            this.frameX++;
            if(this.frameX >= maxFrame) this.frameX = 0;
        }

        // DITAMBAH: kedip saat invincible
        if(this.invincible > 0 && Math.floor(this.invincible / 5) % 2 === 0) {
            this.gameFrame++;
            return; // skip render = efek kedip
        }

        board.save();
        if(this.direction === "left"){
            board.scale(-1, 1);
            board.drawImage(
                image,
                this.frameX * this.spriteWidth, 0,
                this.spriteWidth, this.spriteHeight,
                -this.position.x - this.width,
                this.position.y,
                this.width, this.height
            );
        } else {
            board.drawImage(
                image,
                this.frameX * this.spriteWidth, 0,
                this.spriteWidth, this.spriteHeight,
                this.position.x, this.position.y,
                this.width, this.height
            );
        }
        board.restore();
        this.gameFrame++;
    }
}