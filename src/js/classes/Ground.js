class Ground {
    constructor(props) {
        this.tileSize = props.tileSize || 64;

        this.bgImage = new Image();
        this.bgImage.src = props.bgSrc;

        // load semua tile image dari path langsung
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
        board.drawImage(this.bgImage, 0, 0, canvas.width, canvas.height);
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