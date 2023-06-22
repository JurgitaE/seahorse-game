class Enemy {
    constructor(game) {
        this.game = game;
        this.x = this.game.width;
        this.speedX = Math.random() * -1.5 - 0.5;
        this.markedForDeletion = false;
    }
    update() {
        this.x += this.speedX;
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
    }
    draw(context) {
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}
class Angler1 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 228 * 0.2;
        this.height = 169 * 0.2;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);
    }
}

export { Enemy, Angler1 };
