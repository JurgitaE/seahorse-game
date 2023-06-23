import Projectile from './Projectile.js';

class Player {
    constructor(game) {
        this.game = game;
        this.width = 120;
        this.height = 190;
        this.x = 20;
        this.y = 100;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 37;
        this.speedY = 0;
        this.maxSpeed = 2;
        this.projectiles = [];
        this.image = document.getElementById('player');
        // FYI due to higher fps - had to adjust frameX
        this.frameXAccum = 0;
        this.frameFlipSpeed = 0.25;
    }
    update() {
        if (this.game.keys.includes('ArrowUp')) {
            this.speedY = -this.maxSpeed;
        } else if (this.game.keys.includes('ArrowDown')) {
            this.speedY = this.maxSpeed;
        } else {
            this.speedY = 0;
        }
        this.y += this.speedY;
        // handle Projectile
        this.projectiles.forEach(el => el.update());
        this.projectiles = this.projectiles.filter(el => !el.markedForDeletion);

        // sprite animation
        if (this.frameX < this.maxFrame) {
            this.frameXAccum += this.frameFlipSpeed;
            this.frameX = Math.floor(this.frameXAccum);
        } else {
            this.frameX = 0;
            this.frameXAccum = 0;
        }
    }
    draw(context) {
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
        this.projectiles.forEach(el => el.draw(context));
    }
    shootTop() {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
            this.game.ammo--;
        }
    }
}

export default Player;
