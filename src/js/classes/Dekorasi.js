class Dekorasi {
    constructor(items) {
        // items = array of { src, x, y, w, h }
        this.items = items.map(item => ({
            ...item,
            img: (() => {
                const i = new Image();
                i.src = item.src;
                return i;
            })()
        }));
    }

    create() {
        this.items.forEach(item => {
            board.drawImage(
                item.img,
                0, 0, 16, 16,
                item.x, item.y,
                item.w || 64,
                item.h || 64
            );
        });
    }
}