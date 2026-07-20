// Game Variables
let gameActive = false;
let gamePaused = false;
let score = 0;
let level = 1;
let timeLeft = 60;
let timeInterval = null;
let bubbles = [];
const gameCanvas = document.getElementById('gameCanvas');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

// Bubble class
class Bubble {
    constructor(x, y, size, index) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.index = index;
        this.popped = false;
        this.element = document.createElement('div');
        this.element.className = 'game-bubble';
        this.element.style.left = x + 'px';
        this.element.style.top = y + 'px';
        this.element.style.width = size + 'px';
        this.element.style.height = size + 'px';
        this.element.onclick = (e) => {
            e.stopPropagation();
            this.pop();
        };
        gameCanvas.appendChild(this.element);
        this.animate();
    }

    animate() {
        const duration = 3 + Math.random() * 2; // Longer duration to reach the top
        const startY = this.y;
        const endY = -this.size; // Move all the way to top (beyond visible area)
        const startTime = Date.now();

        const updatePosition = () => {
            if (!gameActive || this.popped) return;

            const elapsed = (Date.now() - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);

            if (progress < 1) {
                this.y = startY + (endY - startY) * progress;
                this.element.style.top = this.y + 'px';
                this.element.style.opacity = 1 - progress * 0.2;
                requestAnimationFrame(updatePosition);
            } else if (gameActive && !this.popped) {
                // Bubble reached the top without being clicked - pop automatically (no points)
                this.autoPopAtTop();
            }
        };

        requestAnimationFrame(updatePosition);
    }

    pop() {
        if (this.popped || gamePaused || !gameActive) return;
        this.popped = true;
        score += 10 * level; // Award points only for user-clicked bubbles
        scoreDisplay.textContent = score;

        // Pop animation
        this.element.classList.add('bubble-pop');
        this.element.style.animation = 'bubblePop 0.5s ease-out forwards';

        // Create particle effect
        this.createParticles();

        setTimeout(() => {
            this.element.remove();
            bubbles = bubbles.filter(b => b !== this);
        }, 500);

        // Spawn new bubble
        spawnBubble();
    }

    autoPopAtTop() {
        // Bubble reached top without being clicked - no points awarded
        this.popped = true;

        // Small pop animation at top
        this.element.classList.add('bubble-pop');
        this.element.style.animation = 'bubblePop 0.3s ease-out forwards';

        setTimeout(() => {
            this.element.remove();
            bubbles = bubbles.filter(b => b !== this);
        }, 300);

        // Spawn new bubble
        spawnBubble();
    }

    createParticles() {
        const particleCount = 8;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = (this.x + this.size / 2) + 'px';
            particle.style.top = (this.y + this.size / 2) + 'px';
            gameCanvas.appendChild(particle);

            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = 2 + Math.random() * 3;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            let x = this.x + this.size / 2;
            let y = this.y + this.size / 2;
            const startTime = Date.now();
            const duration = 500;

            const animateParticle = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                if (progress < 1) {
                    x += vx;
                    y += vy;
                    vy += 0.15; // gravity
                    particle.style.left = x + 'px';
                    particle.style.top = y + 'px';
                    particle.style.opacity = 1 - progress;
                    requestAnimationFrame(animateParticle);
                } else {
                    particle.remove();
                }
            };

            animateParticle();
        }
    }
}

// Spawn bubble
function spawnBubble() {
    if (!gameActive || gamePaused) return;

    const sizes = [40, 50, 60, 70, 80];
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const x = Math.random() * (gameCanvas.clientWidth - size);
    const y = gameCanvas.clientHeight - 20;
    const index = bubbles.length;

    const bubble = new Bubble(x, y, size, index);
    bubbles.push(bubble);
}

// Start game
function startGame() {
    if (gameActive) return;

    gameActive = true;
    gamePaused = false;
    score = 0;
    level = 1;
    timeLeft = 60;
    bubbles = [];
    gameCanvas.innerHTML = '';

    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
    startBtn.disabled = true;
    pauseBtn.disabled = false;

    // Spawn initial bubbles
    for (let i = 0; i < 3; i++) {
        setTimeout(() => spawnBubble(), i * 500);
    }

    // Spawn bubbles periodically
    let spawnInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(spawnInterval);
            return;
        }
        if (!gamePaused) {
            spawnBubble();
        }
    }, 1500);

    // Timer
    timeInterval = setInterval(() => {
        if (gamePaused) return;

        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            endGame();
            clearInterval(timeInterval);
            clearInterval(spawnInterval);
        }
    }, 1000);
}

// Toggle pause
function togglePause() {
    if (!gameActive) return;

    gamePaused = !gamePaused;
    pauseBtn.textContent = gamePaused ? 'Resume' : 'Pause';
    pauseBtn.classList.toggle('paused');

    if (gamePaused) {
        bubbles.forEach(b => b.element.style.opacity = '0.5');
    } else {
        bubbles.forEach(b => b.element.style.opacity = '1');
    }
}

// Update timer display
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Update level based on score
    const newLevel = Math.floor(score / 500) + 1;
    if (newLevel !== level) {
        level = newLevel;
        levelDisplay.textContent = level;
    }
}

// End game
function endGame() {
    gameActive = false;
    gamePaused = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';

    // Show game over message
    const gameOverDiv = document.createElement('div');
    gameOverDiv.className = 'game-over';
    gameOverDiv.innerHTML = `
        <div class="game-over-content">
            <h2>Game Over!</h2>
            <p class="final-score">Final Score: ${score}</p>
            <p class="final-level">Level Reached: ${level}</p>
        </div>
    `;
    gameCanvas.appendChild(gameOverDiv);

    setTimeout(() => {
        gameOverDiv.remove();
    }, 3000);
}

// Reset game
function resetGame() {
    gameActive = false;
    gamePaused = false;
    score = 0;
    level = 1;
    timeLeft = 60;
    bubbles = [];
    gameCanvas.innerHTML = '';

    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
    timerDisplay.textContent = '60s';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';

    if (timeInterval) clearInterval(timeInterval);
}

// Add styles for game elements
const style = document.createElement('style');
style.textContent = `
    .game-bubble {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(99, 102, 241, 0.4));
        box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4), inset -2px -2px 5px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        transition: all 0.1s ease;
        border: 2px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
    }

    .game-bubble:hover {
        transform: scale(1.1);
        box-shadow: 0 12px 30px rgba(99, 102, 241, 0.6), inset -2px -2px 5px rgba(0, 0, 0, 0.3);
    }

    .game-bubble:active {
        transform: scale(0.95);
    }

    @keyframes bubblePop {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.2);
            opacity: 0.7;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }

    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(139, 92, 246, 1), rgba(99, 102, 241, 0.5));
        border-radius: 50%;
        box-shadow: 0 0 4px rgba(99, 102, 241, 0.8);
    }

    .game-over {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 23, 42, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        backdrop-filter: blur(5px);
        z-index: 100;
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .game-over-content {
        text-align: center;
        color: #f1f5f9;
    }

    .game-over-content h2 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .final-score {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    .final-level {
        font-size: 1.2rem;
        color: #cbd5e1;
    }

    .btn.paused {
        background: rgba(239, 68, 68, 0.1);
        border-color: rgba(239, 68, 68, 0.5);
        color: #ef4444;
    }
`;
document.head.appendChild(style);

// Update nav links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scrollY = window.scrollY;

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLinks[index]) navLinks[index].classList.add('active');
        }
    });
});
