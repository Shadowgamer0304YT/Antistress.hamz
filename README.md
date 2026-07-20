# 🫧 Bubble Pop - Anti-Stress Game Website

A beautiful, minimalist anti-stress game website featuring the relaxing "Bubble Pop" game. Designed to help you find moments of calm in your busy day.

## 🌟 Features

- **Simple & Intuitive Gameplay** - Click or tap bubbles to pop them and increase your score
- **Stress Relief Focused** - Calming colors, smooth animations, and peaceful design
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- **Beautiful UI** - Modern gradient design with glass-morphism effects
- **No Ads** - Pure, uninterrupted gameplay experience
- **Progressive Difficulty** - Game gets harder as you score more points
- **Real-time Stats** - Track your score, level, and remaining time

## 🎮 How to Play

1. Click the **Play Now** button or navigate to the game section
2. Click **Start Game** to begin
3. Click or tap on the bubbles as they float up the screen
4. Each bubble you pop increases your score
5. Your level increases based on your score
6. The game lasts 60 seconds - try to pop as many bubbles as possible!

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and game canvas
- **CSS3** - Modern styling with gradients, animations, and glass-morphism
- **Vanilla JavaScript** - No dependencies, pure game logic

## 📁 Project Structure

```
.
├── index.html           # Main HTML file
├── styles/
│   └── main.css        # All styling
├── js/
│   └── game.js         # Game logic and interactivity
└── README.md           # This file
```

## 🚀 Getting Started

### Option 1: Direct Browser
Simply open `index.html` in your web browser.

### Option 2: Local Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server installed)
http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 🎨 Customization

### Change Colors
Edit the CSS variables in `styles/main.css`:

```css
:root {
    --primary: #6366f1;      /* Main color */
    --secondary: #8b5cf6;    /* Secondary color */
    --accent: #ec4899;       /* Accent color */
    /* ... more variables ... */
}
```

### Adjust Game Difficulty
In `js/game.js`, modify these values:

```javascript
const sizes = [40, 50, 60, 70, 80];  // Bubble sizes
timeLeft = 60;                        // Game duration in seconds
spawnBubble();                        // Spawn interval (modify in startGame function)
score += 10 * level;                  // Points per bubble
```

## 📊 Game Mechanics

- **Scoring**: 10 points × current level per bubble
- **Levels**: Increase every 500 points
- **Difficulty**: Increases automatically as you level up
- **Game Duration**: 60 seconds
- **Bubble Movement**: Bubbles float upward and fade out

## 🎯 Future Features

- [ ] Multiple game modes (Time Attack, Zen Mode, etc.)
- [ ] Leaderboard system
- [ ] Sound effects and music toggle
- [ ] Power-ups and special bubbles
- [ ] Daily challenges
- [ ] Achievements and badges
- [ ] Multiplayer mode
- [ ] Mobile app version

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Report bugs
2. Suggest new features
3. Improve the code
4. Enhance the design

## 📄 License

This project is open source and available under the MIT License.

## 💜 About

Created with love for your mental well-being. Bubble Pop is designed to provide a peaceful gaming experience that actually helps you relax, not stress.

Enjoy your gaming experience! 🫧
