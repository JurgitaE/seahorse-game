import Game from './javascript/Game.js';

const startBtn = document.getElementById('start');

window.addEventListener('load', function () {
    // canvas setup
    const canvas = document.getElementById('canvas1');

    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 500;
    //implementing pause
    let paused = false;
    function togglePause() {
        if (!paused) {
            paused = true;
        } else if (paused) {
            paused = false;
        }
    }
    window.addEventListener('keydown', function (e) {
        let key = e.key;
        if (key === 'p') {
            togglePause();
        }
    });

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;
    let startTime = 0;
    // animation loop

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(ctx);
        if (!paused) game.update(deltaTime);
        requestAnimationFrame(animate);
    }
    startBtn.addEventListener('click', () => {
        document.getElementById('info').style.display = 'none';
        lastTime = this.performance.now();

        animate(0);
    });
});
