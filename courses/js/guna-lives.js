/**
 * Guna Lives System — hearts for quiz mistakes
 */
const GunaLives = {
    STORAGE_KEY: 'guna_lives_state',
    MAX_LIVES: 5,
    REGEN_MS: 30 * 60 * 1000,

    defaults() {
        return { lives: 5, lastRegenAt: null, specialOfferUsed: false };
    },

    getState() {
        try {
            const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || 'null');
            if (data) return this.applyRegen({ ...this.defaults(), ...data });
        } catch { /* ignore */ }
        return this.defaults();
    },

    saveState(state) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
        this.updateDisplays();
    },

    applyRegen(state) {
        if (state.lives >= this.MAX_LIVES) {
            state.lastRegenAt = null;
            return state;
        }
        if (!state.lastRegenAt) return state;
        while (state.lives < this.MAX_LIVES && Date.now() - state.lastRegenAt >= this.REGEN_MS) {
            state.lives++;
            state.lastRegenAt += this.REGEN_MS;
        }
        if (state.lives >= this.MAX_LIVES) state.lastRegenAt = null;
        return state;
    },

    getLives() {
        return this.getState().lives;
    },

    canPlay() {
        return this.getLives() > 0;
    },

    loseLife() {
        const state = this.getState();
        if (state.lives <= 0) return state;
        state.lives--;
        if (state.lives < this.MAX_LIVES && !state.lastRegenAt) {
            state.lastRegenAt = Date.now();
        }
        this.saveState(state);
        return state;
    },

    addLives(count) {
        const state = this.getState();
        state.lives = Math.min(this.MAX_LIVES, state.lives + count);
        if (state.lives >= this.MAX_LIVES) state.lastRegenAt = null;
        this.saveState(state);
        return state;
    },

    isSpecialOfferUsed() {
        return !!this.getState().specialOfferUsed;
    },

    markSpecialOfferUsed() {
        const state = this.getState();
        state.specialOfferUsed = true;
        this.saveState(state);
    },

    updateDisplays() {
        const lives = this.getLives();
        document.querySelectorAll('[data-lives-count]').forEach(el => {
            el.textContent = lives;
        });
        document.querySelectorAll('.stat-item.lives').forEach(el => {
            el.classList.toggle('lives-empty', lives === 0);
        });
    }
};

window.GunaLives = GunaLives;
