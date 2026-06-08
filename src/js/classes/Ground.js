class Ground {
    constructor(props) {
        this.tileSize = props.tileSize || 64;

        this.bgImage = new Image();
        this.bgImage.src = props.bgSrc;

        this.levelWidth = props.levelWidth || 3840;

        this.tiles = props.tiles.map(tile => ({
            ...tile,
            img: (() => {
                const img = new Image();
                img.src = tile.src;
                return img;
            })()
        }));
    }

    drawBackground() {
        for (let x = 0; x < this.levelWidth; x += canvas.width) {
            board.drawImage(
                this.bgImage,
                x, 0, canvas.width + 1, canvas.height
            );
        }
    }

    create() {
        this.drawBackground();
        this.tiles.forEach(tile => {
            const w = tile.w || this.tileSize;
            const h = tile.h || this.tileSize;
            board.drawImage(
                tile.img,
                0, 0, 16, 16,
                tile.x, tile.y, w, h
            );
        });
    }
}