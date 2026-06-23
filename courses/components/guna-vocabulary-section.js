/**
 * Guna Vocabulary Section — interactive dictionary
 */
class GunaVocabularySection extends HTMLElement {
    connectedCallback() {
        this.activeCategory = 'greetings';
        this.searchQuery = '';
        this.render();
        this.bindEvents();
    }

    getCategories() {
        return window.GUNA_VOCABULARY?.CATEGORIES || [];
    }

    getFilteredWords() {
        const cats = this.getCategories();
        const cat = cats.find(c => c.id === this.activeCategory) || cats[0];
        if (!cat) return [];
        const q = this.searchQuery.toLowerCase();
        if (!q) return cat.words;
        return cat.words.filter(w =>
            w.guna.toLowerCase().includes(q) ||
            w.es.toLowerCase().includes(q) ||
            w.en.toLowerCase().includes(q)
        );
    }

    speakWord(text) {
        if (!text || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'es-ES';
        u.rate = 0.85;
        window.speechSynthesis.speak(u);
    }

    render() {
        const cats = this.getCategories();
        const words = this.getFilteredWords();

        this.innerHTML = `
            <div class="vocab-section">
                <header class="vocab-hero" data-aos="fade-up">
                    <h1>📖 Guna Vocabulary</h1>
                    <p>Interactive dictionary — browse, listen and learn every word</p>
                    <div class="vocab-search-wrap">
                        <i class="fas fa-search"></i>
                        <input type="search" class="vocab-search" placeholder="Search Guna, Spanish or English..." id="vocabSearch">
                    </div>
                </header>

                <div class="vocab-categories" role="tablist">
                    ${cats.map(c => `
                        <button type="button" class="vocab-cat-btn ${c.id === this.activeCategory ? 'active' : ''}"
                                data-cat="${c.id}" role="tab">
                            <span>${c.icon}</span> ${c.label}
                            <span class="vocab-cat-count">${c.words.length}</span>
                        </button>
                    `).join('')}
                </div>

                <div class="vocab-grid" id="vocabGrid">
                    ${words.length ? words.map(w => `
                        <article class="vocab-card" data-aos="fade-up">
                            <div class="vocab-card-icon">${w.icon || '📝'}</div>
                            <h3 class="vocab-guna">${w.guna}</h3>
                            <p class="vocab-es">${w.es}</p>
                            <p class="vocab-en">${w.en}</p>
                            <p class="vocab-example"><em>${w.example || ''}</em></p>
                            <div class="vocab-card-actions">
                                <button type="button" class="vocab-speak-btn" data-speak="${w.guna}" title="Listen">
                                    <i class="fas fa-volume-up"></i> Listen
                                </button>
                            </div>
                        </article>
                    `).join('') : '<p class="vocab-empty">No words found. Try another search.</p>'}
                </div>

                <div class="vocab-footer-cta">
                    <p>Ready to practice? Go to the Learning Path and complete a level.</p>
                    <button type="button" class="btn-duo btn-duo-primary" id="goToLearnBtn">
                        Start Learning <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    bindEvents() {
        this.querySelector('#vocabSearch')?.addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.render();
            this.bindEvents();
            const input = this.querySelector('#vocabSearch');
            if (input) {
                input.focus();
                input.setSelectionRange(input.value.length, input.value.length);
            }
        });

        this.querySelectorAll('.vocab-cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.activeCategory = btn.dataset.cat;
                this.searchQuery = '';
                this.render();
                this.bindEvents();
            });
        });

        this.querySelectorAll('.vocab-speak-btn').forEach(btn => {
            btn.addEventListener('click', () => this.speakWord(btn.dataset.speak));
        });

        this.querySelector('#goToLearnBtn')?.addEventListener('click', () => {
            window.learningHub?.navigateToSection('learn');
        });
    }
}

customElements.define('guna-vocabulary-section', GunaVocabularySection);
