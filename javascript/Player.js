import Projectile from './Projectile.js';

class Player {
    constructor(game) {
        this.game = game;
        this.width = 120;
        this.height = 190;
        this.x = 20;
        this.y = 100;
        this.speedY = 0;
        this.maxSpeed = 2;
        this.projectiles = [];
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
        this.projectiles.filter(el => !el.markedForDeletion);
    }
    draw(context) {
        context.fillStyle = 'black';
        context.fillRect(this.x, this.y, this.width, this.height);
        this.projectiles.forEach(el => el.draw(context));
    }
    shootTop() {
        this.projectiles.push(new Projectile(this.game, this.x, this.y));
        console.log(this.projectiles);
    }
}

export default Player;
