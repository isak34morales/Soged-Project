/**
 * Guna AI Tutor — Interactive learning assistant
 */
class GunaAiTutor extends HTMLElement {
    constructor() {
        super();
        this.course = this.getAttribute('course') || 'guna';
        this.messages = [];
    }

    connectedCallback() {
        this.render();
        this.addWelcomeMessage();
        this.bindEvents();
    }

    getCourseName() {
        const names = { guna: 'Guna', ngabe: 'Ngäbe', embera: 'Emberá', naso: 'Naso' };
        return names[this.course] || 'Indigenous';
    }

    addWelcomeMessage() {
        this.addMessage('ai', `Hello! I'm your ${this.getCourseName()} AI tutor. Ask me about greetings, vocabulary, molas, culture, or practice phrases. What would you like to learn today?`);
    }

    render() {
        this.innerHTML = `
            <div class="ai-tutor-section">
                <div class="ai-tutor-header">
                    <div class="ai-tutor-avatar">🤖</div>
                    <div>
                        <h2 class="ai-tutor-title">AI Tutor</h2>
                        <p class="ai-tutor-subtitle">Your personal ${this.getCourseName()} language assistant</p>
                    </div>
                    <div class="ai-tutor-status">
                        <i class="fas fa-circle"></i> Online
                    </div>
                </div>

                <div class="ai-tutor-chat" id="aiChatMessages" role="log" aria-live="polite"></div>

                <div class="ai-tutor-input-area">
                    <div class="ai-tutor-suggestions">
                        <button type="button" class="ai-suggestion" data-prompt="How do I say hello in Guna?">How do I say hello?</button>
                        <button type="button" class="ai-suggestion" data-prompt="Tell me about Guna molas">About molas</button>
                        <button type="button" class="ai-suggestion" data-prompt="What does Gwad mean?">Coconut word</button>
                        <button type="button" class="ai-suggestion" data-prompt="Guna family vocabulary">Family words</button>
                    </div>
                    <div class="ai-tutor-input-row">
                        <textarea id="aiChatInput" rows="1" placeholder="Ask about ${this.getCourseName()} language or culture..." aria-label="Message to AI tutor"></textarea>
                        <button type="button" id="aiChatSend" class="ai-send-btn" aria-label="Send message">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        const input = this.querySelector('#aiChatInput');
        const sendBtn = this.querySelector('#aiChatSend');

        sendBtn.addEventListener('click', () => this.handleSend());
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });

        this.querySelectorAll('.ai-suggestion').forEach(btn => {
            btn.addEventListener('click', () => {
                input.value = btn.dataset.prompt;
                this.handleSend();
            });
        });
    }

    handleSend() {
        const input = this.querySelector('#aiChatInput');
        const text = input.value.trim();
        if (!text) return;

        this.addMessage('user', text);
        input.value = '';

        this.showTyping();
        setTimeout(() => {
            this.hideTyping();
            this.addMessage('ai', this.generateResponse(text));
        }, 600 + Math.random() * 400);
    }

    showTyping() {
        const container = this.querySelector('#aiChatMessages');
        const el = document.createElement('div');
        el.className = 'ai-msg ai-msg--typing';
        el.id = 'aiTypingIndicator';
        el.innerHTML = `<div class="ai-msg-avatar">🤖</div><div class="ai-msg-bubble ai-typing"><span></span><span></span><span></span></div>`;
        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
    }

    hideTyping() {
        const el = this.querySelector('#aiTypingIndicator');
        if (el) el.remove();
    }

    addMessage(role, text) {
        const container = this.querySelector('#aiChatMessages');
        const el = document.createElement('div');
        el.className = `ai-msg ai-msg--${role}`;
        const avatar = role === 'ai' ? '🤖' : '🧑‍🎓';
        el.innerHTML = `
            <div class="ai-msg-avatar">${avatar}</div>
            <div class="ai-msg-bubble">${this.escapeHtml(text)}</div>
        `;
        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
        this.messages.push({ role, text });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML.replace(/\n/g, '<br>');
    }

    generateResponse(input) {
        const q = input.toLowerCase();

        if (/hello|hi|hola|anna|greeting|saludo/.test(q)) {
            return `In Guna, you can say:\n• ¡ anna ! — Hello\n• ¡ naa ! — Hi\n• ¡ degidde ! — Hello\n• degi malo — Goodbye\n• ¡ banmalo ! — See you tomorrow\n\nTry using "¡ anna !" when meeting someone on the islands!`;
        }

        if (/mola|textile|tejido/.test(q)) {
            return `Molas are reverse-appliqué textiles made by Guna women. They feature colorful designs of animals, nature and geometric patterns.\n\nEach mola tells a story passed through generations. They are a symbol of Guna identity and are recognized worldwide. You can explore mola images in the Guna Store!`;
        }

        if (/coconut|gwad|coco/.test(q)) {
            return `Gwad means coconut in Guna! 🥥\n\nCoconut is essential in Guna cuisine — used in traditional dishes with fish, plantain and yuca. In SOGED you earn cocos (coconuts) as rewards while learning!`;
        }

        if (/family|nana|tata|mother|father|familia/.test(q)) {
            return `Key family words in Guna:\n• Nana — Mother\n• Tata — Father\n• Inna — Son/Daughter\n• Dummad — Brother\n• Nueded — Sister\n• Dada — Grandmother\n• Bab — Grandfather\n\nFamily and elders are central to Guna community life.`;
        }

        if (/water|sii|fire|dii|house|muu|number|vocab|word|dictionary/.test(q)) {
            return `Here is useful Guna vocabulary:\n• Sii — Water\n• Dii — Fire\n• Muu — House\n• Onmaked — Canoe\n• Gwad — Coconut\n• Ardi — Turtle\n• Uli — Crab\n\nCheck Stories for the full trilingual dictionary PDF!`;
        }

        if (/culture|historia|history|revolution|tule|1925|guna yala/.test(q)) {
            return `The Guna people live in Guna Yala on Panama's Caribbean coast. In 1925, the Tule Revolution defended their customs, dress and autonomy.\n\nSpiritual figures include Ibeorgun (creator) and Kantule (ancestral sage). Leaders called Saglas guide community congresses. Read the Complete Guna Culture Guide in Stories!`;
        }

        if (/animal|turtle|shark|crab|tortuga|mar/.test(q)) {
            return `Sea and forest animals in Guna:\n• Ardi — Turtle\n• Ibeler — Shark\n• Uli — Crab\n• Makki — Parrot\n• Suu — Monkey\n• Wala — Butterfly\n\nThe sea is central to Guna identity and appears in molas and legends.`;
        }

        if (/pronoun|na |be |you |i |nosotros/.test(q)) {
            return `Guna pronouns:\n• Na — I\n• Be — You\n• Nega — He/She\n• Anmar — We\n• Bega — You (plural)\n• Negga — They\n\nUseful phrases:\n• Eye — Yes\n• Banmalo — See you tomorrow\n• Degii — That's right`;
        }

        if (/help|ayuda|what can/.test(q)) {
            return `I can help you with:\n✓ Guna greetings and phrases\n✓ Vocabulary (family, animals, food)\n✓ Mola culture and history\n✓ Pronunciation tips\n✓ Learning path guidance\n\nTry asking: "How do I say hello?" or "Tell me about molas"`;
        }

        if (/practice|learn|lesson|path|level/.test(q)) {
            return `Your Learning Path has 10 interactive levels — from Island Greetings to the Grand Challenge!\n\nComplete lessons to earn XP and cocos. Visit Stories for reference PDFs and the Guna Store to spend your cocos on cultural rewards.`;
        }

        if (/thank|gracias|bye|goodbye|malo/.test(q)) {
            return `You're welcome! To say goodbye in Guna use "degi malo". To say see you tomorrow: "¡ banmalo !"\n\nKeep practicing — every word connects you to Guna heritage! 🏝️`;
        }

        return `That's a great question about ${this.getCourseName()}! Based on our cultural resources:\n\nI recommend exploring the Learning Path lessons and the reference documents in Stories. If you're asking about a specific word, try asking "What does [word] mean?" or use the suggestion buttons above.\n\nFor greetings, remember: ¡ anna ! means Hello in Guna.`;
    }
}

customElements.define('guna-ai-tutor', GunaAiTutor);
