/**
 * Standalone Memory Match game — Guna vocabulary
 */
class GunaMemorySection extends HTMLElement {
    connectedCallback() {
        this.difficulty = 'medium';
        this.render();
        this.startGame();
    }

    getWords() {
        const cats = window.GUNA_VOCABULARY?.CATEGORIES || [];
        return cats.flatMap(c => c.words);
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
            <div class="memory-section-page">
                <header class="memory-hero" data-aos="fade-up">
                    <h1>🧠 Memory Match</h1>
                    <p>Match Guna words with their meanings — train your memory and vocabulary!</p>
                </header>
                <div class="memory-game-exercise" data-difficulty="${this.difficulty}">
                    <div class="memory-difficulty-bar" role="group" aria-label="Difficulty">
                        ${['easy', 'medium', 'hard', 'expert'].map(d => {
                            const counts = { easy: 3, medium: 6, hard: 10, expert: 15 };
                            return `<button type="button" class="memory-diff-btn ${d === this.difficulty ? 'active' : ''}" data-diff="${d}">
                                ${d.charAt(0).toUpperCase() + d.slice(1)} (${(counts[d] || 3) * 2} cards)
                            </button>`;
                        }).join('')}
                    </div>
                    <div class="memory-stats">
                        <span>Moves: <strong id="memoryMoves">0</strong></span>
                        <span>Pairs: <strong id="memoryPairs">0</strong> / <span id="memoryTotal">0</span></span>
                    </div>
                    <div class="memory-grid" id="memoryGrid"></div>
                    <div class="memory-feedback" id="memoryFeedback" hidden></div>
                </div>
            </div>
        `;

        this.querySelectorAll('.memory-diff-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.difficulty = btn.dataset.diff;
                this.render();
                this.startGame();
            });
        });
    }

    startGame() {
        const pairCounts = { easy: 3, medium: 6, hard: 10, expert: 15 };
        const count = Math.min(pairCounts[this.difficulty] || 6, this.getWords().length);
        const words = this.shuffle(this.getWords()).slice(0, count);
        const pairs = words.map((w, i) => ({
            id: `pair-${i}`, guna: w.guna, icon: w.icon || '📝', es: w.es, en: w.en
        }));

        const grid = this.querySelector('#memoryGrid');
        const totalEl = this.querySelector('#memoryTotal');
        if (totalEl) totalEl.textContent = count;
        if (!grid) return;

        const cards = [];
        pairs.forEach(p => {
            cards.push({ pairId: p.id, type: 'word', label: p.guna, speak: p.guna, es: p.es, en: p.en });
            cards.push({ pairId: p.id, type: 'image', label: p.icon, speak: p.guna, es: p.es, en: p.en });
        });

        let state = {
            cards: this.shuffle(cards),
            flipped: [],
            moves: 0,
            matched: 0,
            lock: false,
            totalPairs: count
        };

        const renderGrid = () => {
            grid.innerHTML = state.cards.map((c, i) => `
                <button type="button" class="memory-card ${c.matched ? 'matched' : ''}" data-idx="${i}" aria-label="Memory card" ${c.matched ? 'disabled' : ''}>
                    <div class="memory-card-inner ${c.revealed ? 'flipped' : ''}">
                        <div class="memory-card-front">?</div>
                        <div class="memory-card-back">
                            ${c.type === 'word' ? `<span class="memory-word">${c.label}</span>` : `<span class="memory-icon">${c.label}</span>`}
                        </div>
                    </div>
                </button>
            `).join('');
            const movesEl = this.querySelector('#memoryMoves');
            const pairsEl = this.querySelector('#memoryPairs');
            if (movesEl) movesEl.textContent = state.moves;
            if (pairsEl) pairsEl.textContent = state.matched;
        };

        const onWin = (perfect) => {
            const fb = this.querySelector('#memoryFeedback');
            if (fb) {
                fb.hidden = false;
                fb.className = 'memory-feedback success';
                fb.innerHTML = `🎉 All pairs found in ${state.moves} moves! +20 XP, +8 cocos`;
            }
            if (typeof GunaGamification !== 'undefined') {
                GunaGamification.onMemoryGameComplete(perfect);
                pairs.forEach(p => GunaGamification.recordVocabWord(p.guna));
            }
        };

        grid.onclick = (e) => {
            const btn = e.target.closest('.memory-card');
            if (!btn || btn.disabled || state.lock) return;
            const idx = parseInt(btn.dataset.idx, 10);
            const card = state.cards[idx];
            if (!card || card.matched || card.revealed) return;

            card.revealed = true;
            state.flipped.push(idx);
            this.speak(card.speak);
            renderGrid();

            if (state.flipped.length < 2) return;

            state.moves++;
            state.lock = true;
            const [a, b] = state.flipped.map(i => state.cards[i]);

            if (a.pairId === b.pairId) {
                a.matched = true;
                b.matched = true;
                state.matched++;
                state.flipped = [];
                state.lock = false;
                renderGrid();
                if (state.matched >= state.totalPairs) onWin(state.moves <= state.totalPairs + 2);
            } else {
                setTimeout(() => {
                    a.revealed = false;
                    b.revealed = false;
                    state.flipped = [];
                    state.lock = false;
                    renderGrid();
                }, 900);
            }
        };

        renderGrid();
    }
}

customElements.define('guna-memory-section', GunaMemorySection);
