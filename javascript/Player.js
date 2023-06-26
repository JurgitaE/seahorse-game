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
        this.powerUp = false;
        this.powerUpTimer = 0;
        this.powerUpLimit = 10000;
        // FYI due to higher fps - had to adjust frameX
        this.frameXAccum = 0;
        this.frameFlipSpeed = 0.25;
    }
    update(deltaTime) {
        if (this.game.keys.includes('ArrowUp')) {
            this.speedY = -this.maxSpeed;
        } else if (this.game.keys.includes('ArrowDown')) {
            this.speedY = this.maxSpeed;
        } else {
            this.speedY = 0;
        }
        this.y += this.speedY;
        // Vertical boundaries
        if (this.y > this.game.height - this.height * 0.5) {
            this.y = this.game.height - this.height * 0.5;
        } else if (this.y < -this.height * 0.5) {
            this.y = -this.height * 0.5;
        }
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
        // power Up
        if (this.powerUp) {
            if (this.powerUpTimer > this.powerUpLimit) {
                this.powerUpTimer = 0;
                this.powerUp = false;
                this.frameY = 0;
            } else {
                this.powerUpTimer += deltaTime;
                this.frameY = 1;

                // FYI adjusted for higher flips per second (/2)
                this.game.ammo += 0.1 / 2;
            }
        }
    }
    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        this.projectiles.forEach(el => el.draw(context));
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
    }
    shootTop() {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
            this.game.ammo--;
        }
        if (this.powerUp) this.shootBottom();
    }
    shootBottom() {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 175));
        }
    }

    enterPowerUp() {
        this.powerUpTimer = 0;
        this.powerUp = true;
        if (this.game.ammo < this.game.maxAmmo) this.game.ammo = this.game.maxAmmo;
    }
}

export default Player;
