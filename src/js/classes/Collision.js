class Collision {

    // Cek apakah dua objek bersentuhan (AABB)
    static isColliding(a, b) {
        return (
            a.position.x < b.position.x + b.width &&
            a.position.x + a.width > b.position.x &&
            a.position.y < b.position.y + b.height &&
            a.position.y + a.height > b.position.y
        );
    }

    // Player vs platform tiles — supaya player bisa berdiri
    static playerVsPlatform(player, tiles, tileSize) {
        tiles.forEach(tile => {
            const tw = tile.w || tileSize;
            const th = tile.h || tileSize;
            const tileBounds = {
                position: { x: tile.x, y: tile.y },
                width: tw,
                height: th
            };

            if (!this.isColliding(player, tileBounds)) return;

            const playerBottom = player.position.y + player.height;
            const playerRight  = player.position.x + player.width;
            const tileBottom   = tile.y + tileSize;
            const tileRight    = tile.x + tileSize;

            // overlap di tiap sisi
            const overlapTop    = playerBottom - tile.y;
            const overlapBottom = (tile.y + th) - player.position.y;
            const overlapLeft   = playerRight  - tile.x;
            const overlapRight  = (tile.x + tw) - player.position.x;

            // cari overlap terkecil = sisi collision
            const minOverlap = Math.min(
                overlapTop, overlapBottom,
                overlapLeft, overlapRight
            );

            if (minOverlap === overlapTop && player.velocity.y >= 0) {
                // mendarat di atas tile
                player.position.y = tile.y - player.height;
                player.velocity.y = 0;
                player.jumpCount  = 0;
            } else if (minOverlap === overlapBottom && player.velocity.y < 0) {
                // kepala kena bawah tile
                player.position.y = tileBottom;
                player.velocity.y = 0;
            } else if (minOverlap === overlapLeft && player.velocity.x > 0) {
                // kanan player kena kiri tile
                player.position.x = tile.x - player.width;
            } else if (minOverlap === overlapRight && player.velocity.x < 0) {
                // kiri player kena kanan tile
                player.position.x = tileRight;
            }
        });
    }

    // Player vs musuh
    static playerVsMusuh(player, musuh) {
        if (musuh.isDead) return false;   // TAMBAH: skip kalau sudah mati
        if (!this.isColliding(player, musuh)) return false;

        // stomp = player jatuh dari atas DAN kaki player di atas titik tengah musuh
        if (
            player.velocity.y > 0 &&
            player.position.y + player.height <= musuh.position.y + musuh.height * 0.6
        ) {
            return "stomp";
        }

        return "hit";
    }
}