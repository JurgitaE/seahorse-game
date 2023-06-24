class Enemy {
    constructor(game) {
        this.game = game;
        this.x = this.game.width;
        this.speedX = Math.random() * -0.5 - 0.5; //adjusted from * -1.5
        this.markedForDeletion = false;
        this.lives = 5;
        this.score = this.lives;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 37;
        // FYI due to higher fps - had to adjust frameX
        this.frameXAccum = 0;
        this.frameFlipSpeed = 0.25;
    }
    update() {
        this.x += this.speedX - this.game.speed;
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
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
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
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
        context.font = '20px Helvetica';
        context.fillText(this.lives, this.x, this.y);
    }
}
class Angler1 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 228;
        this.height = 169;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);
        this.image = document.getElementById('angler1');
        this.frameY = Math.floor(Math.random() * 3);
        this.lives = 2;
        this.score = this.lives;
    }
}
class Angler2 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 213;
        this.height = 165;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);
        this.image = document.getElementById('angler2');
        this.frameY = Math.floor(Math.random() * 2);
        this.lives = 3;
        this.score = this.lives;
    }
}
class LuckyFish extends Enemy {
    constructor(game) {
        super(game);
        this.width = 99;
        this.height = 95;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);
        this.image = document.getElementById('lucky');
        this.frameY = Math.floor(Math.random() * 2);
        this.lives = 3;
        this.score = 15;
        this.type = 'lucky';
    }
}

export { Enemy, Angler1, Angler2, LuckyFish };
