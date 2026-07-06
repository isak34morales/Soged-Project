/**
 * Educational Memory Match game — Spanish to Indigenous Language
 */
class GunaMemorySection extends HTMLElement {
    connectedCallback() {
        this.difficulty = 'medium';
        this.render();
        this.startGame();
    }

    getWords() {
        // Educational vocabulary pairs: Spanish - Indigenous Language
        const educationalPairs = [
            { es: 'Hola', guna: 'Na', icon: '👋' },
            { es: 'Tortuga', guna: 'Yarbi', icon: '🐢' },
            { es: 'Familia', guna: 'Dummad', icon: '👨‍👩‍👧‍👦' },
            { es: 'Agua', guna: 'Ubb', icon: '💧' },
            { es: 'Sol', guna: 'Baba', icon: '☀️' },
            { es: 'Luna', guna: 'Olo', icon: '🌙' },
            { es: 'Coco', guna: 'Ogob', icon: '🥥' },
            { es: 'Mar', guna: 'Naggwa', icon: '🌊' },
            { es: 'Montaña', guna: 'Nargga', icon: '⛰️' },
            { es: 'Pescado', guna: 'Mai', icon: '🐟' },
            { es: 'Casa', guna: 'Dummag', icon: '🏠' },
            { es: 'Comida', guna: 'Naggwe', icon: '🍽️' },
            { es: 'Amigo', guna: 'Suggwa', icon: '🤝' },
            { es: 'Gracias', guna: 'Diaba', icon: '🙏' },
            { es: 'Buenos días', guna: 'Bai naggwe', icon: '🌅' },
            { es: 'Buenas noches', guna: 'Bai olo', icon: '🌙' }
        ];
        return educationalPairs;
    }

    speak(text) {
        if (!text || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'es-ES';
        u.rate = 0.85;
        window.speechSynthesis.speak(u);
    }

    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    render() {
        this.innerHTML = `
            <div class="memory-section-modern">
                <header class="memory-hero-modern" data-aos="fade-up">
                    <div class="memory-header-content">
                        <h1 class="memory-title-modern">🧠 Juego de Memoria Educativo</h1>
                        <p class="memory-subtitle-modern">Empareja palabras en español con su traducción en lengua indígena</p>
                    </div>
                    <div class="memory-stats-modern">
                        <div class="stat-box">
                            <span class="stat-label">Movimientos</span>
                            <span class="stat-value" id="memoryMoves">0</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-label">Parejas</span>
                            <span class="stat-value"><span id="memoryPairs">0</span> / <span id="memoryTotal">0</span></span>
                        </div>
                    </div>
                </header>

                <div class="memory-controls-modern" data-aos="fade-up" data-aos-delay="100">
                    <div class="difficulty-selector" role="group" aria-label="Dificultad">
                        ${['easy', 'medium', 'hard'].map(d => {
                            const counts = { easy: 4, medium: 6, hard: 8 };
                            return `<button type="button" class="difficulty-btn ${d === this.difficulty ? 'active' : ''}" data-diff="${d}">
                                ${d.charAt(0).toUpperCase() + d.slice(1)} (${counts[d]} parejas)
                            </button>`;
                        }).join('')}
                    </div>
                </div>

                <div class="memory-game-container" data-aos="fade-up" data-aos-delay="200">
                    <div class="memory-grid-modern" id="memoryGrid"></div>
                </div>

                <div class="memory-feedback-modern" id="memoryFeedback" hidden></div>
                
                <div class="victory-screen" id="victoryScreen" hidden>
                    <div class="victory-content">
                        <img src="../Images/Soged/Newturttle.png" alt="Soggy" class="victory-soggy">
                        <h2 class="victory-title">¡Excelente trabajo!</h2>
                        <p class="victory-message">Has completado el juego de memoria</p>
                        <div class="victory-stats">
                            <div class="victory-stat">
                                <span class="victory-stat-label">Movimientos</span>
                                <span class="victory-stat-value" id="victoryMoves">0</span>
                            </div>
                            <div class="victory-reward">
                                <span class="reward-icon">🥥</span>
                                <span class="reward-text">+50 Cocos</span>
                            </div>
                        </div>
                        <button class="victory-btn" onclick="this.closest('.victory-screen').hidden = true; document.querySelector('.memory-section-modern').dispatchEvent(new Event('restart'))">
                            <i class="fas fa-redo"></i> Jugar de nuevo
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.difficulty = btn.dataset.diff;
                this.render();
                this.startGame();
            });
        });

        this.addEventListener('restart', () => {
            this.render();
            this.startGame();
        });
    }

    startGame() {
        const pairCounts = { easy: 4, medium: 6, hard: 8 };
        const count = Math.min(pairCounts[this.difficulty] || 6, this.getWords().length);
        const words = this.shuffle(this.getWords()).slice(0, count);
        const pairs = words.map((w, i) => ({
            id: `pair-${i}`, es: w.es, guna: w.guna, icon: w.icon
        }));

        const grid = this.querySelector('#memoryGrid');
        const totalEl = this.querySelector('#memoryTotal');
        const victoryScreen = this.querySelector('#victoryScreen');
        
        if (victoryScreen) victoryScreen.hidden = true;
        if (totalEl) totalEl.textContent = count;
        if (!grid) return;

        // Create cards: Spanish word and Indigenous translation
        const cards = [];
        pairs.forEach(p => {
            cards.push({ pairId: p.id, type: 'spanish', label: p.es, icon: p.icon, language: 'Español' });
            cards.push({ pairId: p.id, type: 'indigenous', label: p.guna, icon: p.icon, language: 'Lengua Indígena' });
        });

        let state = {
            cards: this.shuffle(cards),
            flipped: [],
            moves: 0,
            matched: 0,
            lock: false,
            totalPairs: count,
            errorCards: []
        };

        const renderGrid = () => {
            const gridClass = count <= 4 ? 'grid-3x4' : 'grid-4x4';
            grid.className = `memory-grid-modern ${gridClass}`;
            
            grid.innerHTML = state.cards.map((c, i) => `
                <button type="button" 
                        class="memory-card-modern ${c.matched ? 'matched' : ''} ${c.error ? 'error' : ''} ${c.revealed ? 'flipped' : ''}" 
                        data-idx="${i}" 
                        aria-label="Memory card: ${c.label}" 
                        ${c.matched ? 'disabled' : ''}>
                    <div class="card-inner">
                        <div class="card-front">
                            <span class="card-icon">${c.icon}</span>
                        </div>
                        <div class="card-back">
                            <span class="card-language">${c.language}</span>
                            <span class="card-word">${c.label}</span>
                        </div>
                    </div>
                </button>
            `).join('');
            
            const movesEl = this.querySelector('#memoryMoves');
            const pairsEl = this.querySelector('#memoryPairs');
            if (movesEl) movesEl.textContent = state.moves;
            if (pairsEl) pairsEl.textContent = state.matched;
        };

        const onWin = () => {
            const victoryScreen = this.querySelector('#victoryScreen');
            const victoryMoves = this.querySelector('#victoryMoves');
            
            if (victoryScreen) {
                victoryScreen.hidden = false;
                if (victoryMoves) victoryMoves.textContent = state.moves;
            }

            // Award cocos
            if (typeof CocosEconomy !== 'undefined') {
                CocosEconomy.addCocos(50);
                CocosEconomy.triggerConfetti();
            }

            if (typeof GunaGamification !== 'undefined') {
                GunaGamification.onMemoryGameComplete(state.moves <= state.totalPairs + 2);
            }
        };

        grid.onclick = (e) => {
            const btn = e.target.closest('.memory-card-modern');
            if (!btn || btn.disabled || state.lock) return;
            
            const idx = parseInt(btn.dataset.idx, 10);
            const card = state.cards[idx];
            if (!card || card.matched || card.revealed) return;

            card.revealed = true;
            state.flipped.push(idx);
            this.speak(card.label);
            renderGrid();

            if (state.flipped.length < 2) return;

            state.moves++;
            state.lock = true;
            const [a, b] = state.flipped.map(i => state.cards[i]);

            if (a.pairId === b.pairId) {
                // Match found - show success
                a.matched = true;
                b.matched = true;
                state.matched++;
                state.flipped = [];
                state.lock = false;
                renderGrid();
                
                if (state.matched >= state.totalPairs) {
                    setTimeout(onWin, 500);
                }
            } else {
                // No match - show error then flip back
                a.error = true;
                b.error = true;
                renderGrid();
                
                setTimeout(() => {
                    a.revealed = false;
                    b.revealed = false;
                    a.error = false;
                    b.error = false;
                    state.flipped = [];
                    state.lock = false;
                    renderGrid();
                }, 1200);
            }
        };

        renderGrid();
    }
}

customElements.define('guna-memory-section', GunaMemorySection);
