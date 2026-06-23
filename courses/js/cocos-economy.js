/**
 * Sistema de moneda virtual — Cocos Guna
 */
const CocosEconomy = {
    STORAGE_KEY: 'guna_cocos',
    PURCHASES_KEY: 'guna_purchases',
    DEFAULT_BALANCE: 1250,

    getBalance() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (stored === null) {
            localStorage.setItem(this.STORAGE_KEY, String(this.DEFAULT_BALANCE));
            return this.DEFAULT_BALANCE;
        }
        return parseInt(stored, 10) || 0;
    },

    setBalance(amount) {
        const value = Math.max(0, amount);
        localStorage.setItem(this.STORAGE_KEY, String(value));
        this.updateAllDisplays(value);
        return value;
    },

    addCocos(amount) {
        const newBalance = this.getBalance() + amount;
        this.setBalance(newBalance);
        this.animateCocosChange('gain');
        return newBalance;
    },

    spendCocos(amount) {
        const balance = this.getBalance();
        if (balance < amount) return false;
        this.setBalance(balance - amount);
        this.animateCocosChange('spend');
        return true;
    },

    getPurchases() {
        try {
            return JSON.parse(localStorage.getItem(this.PURCHASES_KEY) || '[]');
        } catch {
            return [];
        }
    },

    isPurchased(itemId) {
        return this.getPurchases().includes(itemId);
    },

    recordPurchase(itemId) {
        const purchases = this.getPurchases();
        if (!purchases.includes(itemId)) {
            purchases.push(itemId);
            localStorage.setItem(this.PURCHASES_KEY, JSON.stringify(purchases));
        }
    },

    formatCocos(amount) {
        return amount.toLocaleString('es-ES');
    },

    updateAllDisplays(balance) {
        const value = balance ?? this.getBalance();
        const formatted = this.formatCocos(value);

        document.querySelectorAll('[data-cocos-balance]').forEach(el => {
            el.textContent = formatted;
        });

        document.querySelectorAll('[data-cocos-label]').forEach(el => {
            el.textContent = `${formatted} Cocos`;
        });
    },

    animateCocosChange(type) {
        document.querySelectorAll('.cocos-counter, .cocos-balance-display').forEach(el => {
            el.classList.remove('cocos-bounce');
            void el.offsetWidth;
            el.classList.add('cocos-bounce');
            if (type === 'gain') el.classList.add('cocos-gain');
            if (type === 'spend') el.classList.add('cocos-spend');
            setTimeout(() => {
                el.classList.remove('cocos-gain', 'cocos-spend');
            }, 600);
        });
    },

    triggerConfetti() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.65 },
                colors: ['#28A745', '#FFB300', '#FF6B35', '#8B5E3C', '#5D8A3E']
            });
        }
    }
};

window.CocosEconomy = CocosEconomy;
