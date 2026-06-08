class Musuh {

    constructor(props){
        this.width = props.width;
        this.height = props.height;
        this.speed = props.speed;

        this.position = {
            x: props.position.x,
            y: props.position.y
        };

        this.startX = props.position.x;
        this.patrolDistance = props.patrolDistance;

        this.velocity = {
            x: -this.speed,
            y: 0  // DITAMBAH: velocity Y untuk gravity
        };

        this.direction = "left";

        this.frameX = 0;
        this.frameSpeed = 8;
        this.gameFrame = 0;

        this.spriteWidth = 32;
        this.spriteHeight = 32;

        this.currentAnimation = "run";

        this.sprites = {};
        for(const key in props.sprites){
            const img = new Image();
            img.src = props.sprites[key];
            this.sprites[key] = img;
        }
    }

    update(){
        // DITAMBAH: gravity supaya musuh tidak melayang
        this.velocity.y += 0.5;
        this.position.y += this.velocity.y;

        // DITAMBAH: collision ground untuk musuh
        const ground = canvas.height - this.height;
        if(this.position.y >= ground){
            this.position.y = ground;
            this.velocity.y = 0;
        }

        // patrol — tidak berubah
        this.position.x += this.velocity.x;

        if(this.position.x <= this.startX - this.patrolDistance){
            this.velocity.x = this.speed;
            this.direction = "right";
        }

        if(this.position.x >= this.startX + this.patrolDistance){
            this.velocity.x = -this.speed;
            this.direction = "left";
        }

        if(this.velocity.x !== 0){
            this.currentAnimation = "run";
        } else {
            this.currentAnimation = "idle";
        }
    }

    create(){
        if (this.isDead) {
            this.dieTimer = this.dieTimer ?? 30; // init sekali
            this.dieTimer--;
            if (this.dieTimer <= 0) return; // sudah hilang total, stop render

            board.globalAlpha = this.dieTimer / 30;
            const image = this.sprites["hit"];
            if (image) {
                board.drawImage(
                    image,
                    0, 0, this.spriteWidth, this.spriteHeight,
                    this.position.x, this.position.y,
                    this.width, this.height
                );
            }
            board.globalAlpha = 1;
            return;
        }

        const image = this.sprites[this.currentAnimation];
        if(!image) return;

        const maxFrame = Math.floor(image.width / this.spriteWidth);

        if(this.gameFrame % this.frameSpeed === 0){
            this.frameX++;
            if(this.frameX >= maxFrame){
                this.frameX = 0;
            }
        }

        board.save();

        if(this.direction === "right"){
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