/**
 * Guna Gamification — XP, levels, streaks, badges
 */
const GunaGamification = {
    STORAGE_KEY: 'guna_gamification',

    defaults() {
        return { xp: 0, level: 1, streak: 0, lastStudyDate: null, badges: [], totalLessons: 0 };
    },

    getState() {
        try {
            const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || 'null');
            if (data) return { ...this.defaults(), ...data };
        } catch { /* ignore */ }
        return this.defaults();
    },

    saveState(state) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
        this.updateDisplays(state);
    },

    xpForLevel(level) {
        return level * 200;
    },

    addXP(amount) {
        const state = this.getState();
        state.xp += amount;
        while (state.xp >= this.xpForLevel(state.level)) {
            state.xp -= this.xpForLevel(state.level);
            state.level++;
        }
        this.saveState(state);
        return state;
    },

    recordStudyDay() {
        const state = this.getState();
        const today = new Date().toISOString().slice(0, 10);
        if (state.lastStudyDate === today) return state;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yStr = yesterday.toISOString().slice(0, 10);
        state.streak = state.lastStudyDate === yStr ? state.streak + 1 : 1;
        state.lastStudyDate = today;
        this.saveState(state);
        return state;
    },

    onLessonComplete(lessonId, xpReward = 50) {
        const state = this.getState();
        state.totalLessons = Math.max(state.totalLessons, lessonId);
        this.saveState(state);
        this.recordStudyDay();
        return this.addXP(xpReward);
    },

    awardBadge(badgeId) {
        const state = this.getState();
        if (!state.badges.includes(badgeId)) {
            state.badges.push(badgeId);
            this.saveState(state);
        }
        return state;
    },

    updateDisplays(state) {
        state = state || this.getState();
        const xpNext = this.xpForLevel(state.level);
        const pct = Math.round((state.xp / xpNext) * 100);

        document.querySelectorAll('[data-user-level]').forEach(el => {
            el.textContent = state.level;
        });
        document.querySelectorAll('[data-user-xp]').forEach(el => {
            el.textContent = state.xp.toLocaleString('en-US');
        });
        document.querySelectorAll('.xp-current').forEach(el => {
            el.textContent = `${state.xp.toLocaleString('en-US')} XP`;
        });
        document.querySelectorAll('.xp-fill').forEach(el => {
            el.style.width = `${pct}%`;
        });
        document.querySelectorAll('.xp-next').forEach(el => {
            el.textContent = `Next: ${xpNext.toLocaleString('en-US')} XP`;
        });
        document.querySelectorAll('.level-badge').forEach(el => {
            el.textContent = state.level;
        });
        document.querySelectorAll('[data-streak-count]').forEach(el => {
            el.textContent = state.streak;
        });
    }
};

window.GunaGamification = GunaGamification;
