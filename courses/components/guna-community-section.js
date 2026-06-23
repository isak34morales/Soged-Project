/**
 * Guna Community Section — cultural center
 */
class GunaCommunitySection extends HTMLElement {
    connectedCallback() {
        this.activeTab = 'history';
        this.render();
        this.bindEvents();
    }

    getTabs() {
        return [
            { id: 'history', label: 'History', icon: '📜' },
            { id: 'culture', label: 'Culture', icon: '🧵' },
            { id: 'spirituality', label: 'Spirituality', icon: '🌟' },
            { id: 'nature', label: 'Nature', icon: '🌊' }
        ];
    }

    getTabContent() {
        const content = {
            history: `
                <div class="community-article">
                    <h2>📜 History of the Guna People</h2>
                    <div class="community-cards">
                        <article class="community-card">
                            <h3>Origins & Migrations</h3>
                            <p>The Guna people have inhabited the Caribbean coast and archipelago of Panama for centuries. Their history is marked by migrations from the mainland to the San Blas Islands (Guna Yala), seeking autonomy and preservation of their way of life.</p>
                        </article>
                        <article class="community-card">
                            <h3>1925 Tule Revolution</h3>
                            <p>In February 1925, the Guna people rose up in the <strong>Tule Revolution</strong> to defend their customs, traditional dress, language and political autonomy against external control. This historic event is central to Guna identity.</p>
                        </article>
                        <article class="community-card">
                            <h3>Creation of Guna Yala</h3>
                            <p>Following the revolution, the Guna secured recognition of their territory. <strong>Comarca Guna Yala</strong> became an autonomous indigenous region where the community governs through traditional congresses.</p>
                        </article>
                        <article class="community-card">
                            <h3>Political Organization</h3>
                            <p>Communities are organized through local <strong>congresses</strong> led by <strong>Saglas</strong> (traditional leaders). Decisions are made collectively, reflecting the Guna value of community consensus.</p>
                        </article>
                    </div>
                </div>
            `,
            culture: `
                <div class="community-article">
                    <h2>🧵 Guna Culture</h2>
                    <div class="community-cards">
                        <article class="community-card">
                            <h3>Molas</h3>
                            <p>Molas are reverse-appliqué textiles created by Guna women. Each design tells stories of nature, spirituality and daily life. They are recognized worldwide as masterpieces of indigenous art.</p>
                        </article>
                        <article class="community-card">
                            <h3>Traditional Dress</h3>
                            <p>Guna women wear colorful molas, beaded leg wraps (wini) and gold nose rings. Men traditionally wear simple shirts and pants. Dress is a symbol of cultural pride.</p>
                        </article>
                        <article class="community-card">
                            <h3>Music & Ceremonies</h3>
                            <p>Ceremonial songs preserve ancestral knowledge. Music accompanies rituals, community gatherings and celebrations that strengthen bonds between generations.</p>
                        </article>
                        <article class="community-card">
                            <h3>Customs & Daily Life</h3>
                            <p>Fishing, coconut harvesting, canoe building and collective work (cayuco) shape island life. Sharing and reciprocity are fundamental community values.</p>
                        </article>
                    </div>
                </div>
            `,
            spirituality: `
                <div class="community-article">
                    <h2>🌟 Spirituality & Cosmovision</h2>
                    <div class="community-cards">
                        <article class="community-card">
                            <h3>Ibeorgun — The Creator</h3>
                            <p><strong>Ibeorgun</strong> is the creator who established harmony between humans and nature. Guna spirituality emphasizes balance and respect for all living beings.</p>
                        </article>
                        <article class="community-card">
                            <h3>Kantule — Ancestral Sage</h3>
                            <p><strong>Kantule</strong> is remembered as the ancestral sage who taught medicine, community values and respect for elders through oral tradition.</p>
                        </article>
                        <article class="community-card">
                            <h3>Cosmovision</h3>
                            <p>The Guna worldview sees the natural and spiritual worlds as interconnected. Every animal, plant and element of the sea has meaning in stories and ceremonies.</p>
                        </article>
                        <article class="community-card">
                            <h3>The Four Worlds</h3>
                            <p>Traditional belief describes multiple worlds or realms. Humans have responsibility as caretakers of the Earth — the "fourth world" — for future generations.</p>
                        </article>
                    </div>
                </div>
            `,
            nature: `
                <div class="community-article">
                    <h2>🌊 Nature & Conservation</h2>
                    <div class="community-cards">
                        <article class="community-card">
                            <h3>Relationship with the Sea</h3>
                            <p>The Caribbean Sea is the heart of Guna life — for fishing, transport, and spiritual connection. Turtles, sharks, crabs and dolphins appear in legends and mola designs.</p>
                        </article>
                        <article class="community-card">
                            <h3>Environmental Conservation</h3>
                            <p>Guna communities practice sustainable fishing and forest use. Traditional knowledge guides when and how to harvest coconuts, fish and plants without depleting resources.</p>
                        </article>
                        <article class="community-card">
                            <h3>Sustainable Resources</h3>
                            <p>Coconut, wood, clay and medicinal plants are used with respect. The congress system regulates resource use to protect the islands and mainland forests.</p>
                        </article>
                    </div>
                </div>
            `
        };
        return content[this.activeTab] || content.history;
    }

    render() {
        this.innerHTML = `
            <div class="community-section">
                <header class="community-hero" data-aos="fade-up">
                    <h1>🏝️ Guna Community</h1>
                    <p>Cultural center — history, traditions and wisdom of the Guna people</p>
                </header>

                <nav class="community-tabs" role="tablist">
                    ${this.getTabs().map(t => `
                        <button type="button" class="community-tab ${t.id === this.activeTab ? 'active' : ''}"
                                data-tab="${t.id}" role="tab">
                            ${t.icon} ${t.label}
                        </button>
                    `).join('')}
                </nav>

                <div class="community-content" role="tabpanel">
                    ${this.getTabContent()}
                </div>

                <div class="community-resources">
                    <h3>📚 Explore More</h3>
                    <div class="community-resource-links">
                        <button type="button" class="resource-link-btn" data-go="stories">
                            <i class="fas fa-book-open"></i> Read Stories & PDFs
                        </button>
                        <button type="button" class="resource-link-btn" data-go="vocabulary">
                            <i class="fas fa-book"></i> Browse Vocabulary
                        </button>
                        <button type="button" class="resource-link-btn" data-go="learn">
                            <i class="fas fa-map"></i> Learning Path
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        this.querySelectorAll('.community-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.activeTab = tab.dataset.tab;
                this.render();
                this.bindEvents();
            });
        });

        this.querySelectorAll('.resource-link-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                window.learningHub?.navigateToSection(btn.dataset.go);
            });
        });
    }
}

customElements.define('guna-community-section', GunaCommunitySection);
