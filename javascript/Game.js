import { Angler1 } from './Enemy.js';
import InputHandler from './InputHandler.js';
import Player from './Player.js';
import UI from './UI.js';

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.keys = [];
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.ammo = 20;
        this.maxAmmo = 50;
        this.ammoTimer = 0;
        this.ammoInterval = 500;
        this.gameOver = false;
        this.score = 0;
        this.winningScore = 10;
    }
    update(deltaTime) {
        this.player.update();
        if (this.ammoTimer > this.ammoInterval) {
            if (this.ammo < this.maxAmmo) {
                this.ammo++;
                this.ammoTimer = 0;
            }
        } else {
            this.ammoTimer += deltaTime;
        }
        this.enemies.forEach(enemy => {
            enemy.update();
            if (this.isColliding(this.player, enemy)) {
                enemy.markedForDeletion = true;
            }
            this.player.projectiles.forEach(projectile => {
                if (this.isColliding(projectile, enemy)) {
                    enemy.lives--;
                    projectile.markedForDeletion = true;
                    if (enemy.lives <= 0) {
                        enemy.markedForDeletion = true;
                        this.score += enemy.score;
                        if (this.score > this.winningScore) {
                            this.gameOver = true;
                        }
                    }
                }
            });
        });
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
    }
    draw(context) {
        this.player.draw(context);
        this.ui.draw(context);
        this.enemies.forEach(enemy => enemy.draw(context));
    }
    addEnemy() {
        this.enemies.push(new Angler1(this));
        // console.log(this.enemies);
    }
    isColliding(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }
}

export default Game;
