/**
 * Guna Language Lessons Content
 * Interactive lessons for the Guna language
 */

class GunaLessons {
    constructor() {
        this.currentLesson = null;
        this.userAnswers = {};
        this.lessonProgress = {};
    }

    // Get lesson content by ID
    getLessonContent(lessonId) {
        const lessons = {
            1: this.getGreetingsLesson(),
            2: this.getNumbersLesson(),
            3: this.getFamilyLesson(),
            4: this.getColorsLesson(),
            5: this.getAssessmentLesson(),
            6: this.getMolaCultureLesson(),
            7: this.getPronounsLesson(),
            8: this.getMasteryLesson(),
            9: this.getOralTraditionsLesson(),
            10: this.getGrandChallengeLesson()
        };
        
        return lessons[lessonId] || this.getGreetingsLesson();
    }

    buildVocabRows(words) {
        return words.map(w => `
            <tr>
                <td><strong>${w.guna}</strong></td>
                <td>${w.es}</td>
                <td>${w.en}</td>
                <td>${w.guna}</td>
            </tr>
        `).join('');
    }

    buildQuizQuestion(num, question, options) {
        return `
            <div class="quiz-question" data-question="${num}">
                <h4>Question ${num}: ${question}</h4>
                <div class="quiz-options">
                    ${options.map(o => `<button class="quiz-option" data-answer="${o.value}">${o.label}</button>`).join('')}
                </div>
                <div class="quiz-feedback" style="display: none;"></div>
            </div>
        `;
    }

    buildMatchingExercise(pairs) {
        return `
            <div class="quiz-question" data-question="4">
                <h4>Question 4: Match each Guna word with its meaning:</h4>
                <div class="matching-exercise">
                    <div class="matching-pairs">
                        ${pairs.map((p, i) => `
                            <div class="matching-item" data-pair="${i + 1}">
                                <span class="guna-text">${p.guna}</span>
                                <select class="matching-select">
                                    <option value="">Select meaning...</option>
                                    ${p.options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('')}
                                </select>
                            </div>
                        `).join('')}
                    </div>
                    <div class="matching-feedback" style="display: none;"></div>
                </div>
            </div>
        `;
    }

    buildStandardLesson(config) {
        const words = config.words;
        const matchPairs = config.matchPairs;
        const optionPool = config.matchOptionPool;

        return {
            id: config.id,
            title: config.title,
            subtitle: config.subtitle,
            duration: config.duration,
            xp: config.xp,
            sections: [
                {
                    type: 'introduction',
                    title: config.introTitle,
                    content: `
                        <div class="lesson-intro">
                            <div class="intro-header">
                                <h2>${config.introHeading}</h2>
                                <p>${config.introText}</p>
                            </div>
                            <div class="cultural-context">
                                <h3>🌊 Cultural Context</h3>
                                <p>${config.culturalText}</p>
                            </div>
                        </div>
                    `
                },
                {
                    type: 'vocabulary',
                    title: config.vocabTitle,
                    content: `
                        <div class="vocabulary-section">
                            <h3>📚 ${config.vocabTitle}</h3>
                            <p>${config.vocabIntro}</p>
                            <div class="vocabulary-table">
                                <table>
                                    <thead>
                                        <tr><th>Guna</th><th>Español</th><th>English</th><th>Pronunciation</th></tr>
                                    </thead>
                                    <tbody>${this.buildVocabRows(words)}</tbody>
                                </table>
                            </div>
                        </div>
                    `
                },
                {
                    type: 'interactive',
                    title: 'Practice Time!',
                    content: `
                        <div class="interactive-section">
                            <h3>🎯 Let's Practice!</h3>
                            <p>Test your knowledge with these interactive exercises:</p>
                            <div class="quiz-container">
                                ${this.buildQuizQuestion(1, config.quiz[0].q, config.quiz[0].options)}
                                ${this.buildQuizQuestion(2, config.quiz[1].q, config.quiz[1].options)}
                                ${this.buildQuizQuestion(3, config.quiz[2].q, config.quiz[2].options)}
                                ${this.buildMatchingExercise(matchPairs.map(p => ({
                                    guna: p.guna,
                                    options: optionPool
                                })))}
                                <div class="quiz-results" style="display: none;">
                                    <h4>Quiz Results</h4>
                                    <p>Score: <span class="correct-answers">0</span> / 4</p>
                                    <div class="progress-track"><div class="progress-fill" style="width: 0%"></div></div>
                                </div>
                            </div>
                        </div>
                    `
                },
                {
                    type: 'completion',
                    title: 'Lesson Complete!',
                    content: `
                        <div class="completion-section">
                            <h3>🎉 ${config.completionTitle}</h3>
                            <p>${config.completionText}</p>
                            <div class="learned-greetings">
                                <h4>✅ Words you learned:</h4>
                                <ul>${words.map(w => `<li><strong>${w.guna}</strong> — ${w.en}</li>`).join('')}</ul>
                            </div>
                            <div class="lesson-completion">
                                <button class="complete-lesson-btn">Complete Lesson</button>
                                <button class="review-lesson-btn">Review Again</button>
                            </div>
                        </div>
                    `
                }
            ]
        };
    }

    // Greetings Lesson - Based on the provided table
    getGreetingsLesson() {
        return {
            id: 1,
            title: "🏝️ Island Greetings - Saludos Guna",
            subtitle: "Learn traditional Guna welcome expressions",
            duration: 15,
            xp: 50,
            sections: [
                {
                    type: 'introduction',
                    title: "Welcome to Guna Language!",
                    content: `
                        <div class="lesson-intro">
                            <div class="intro-header">
                                <h2>🏝️ Bienvenido al idioma Guna</h2>
                                <p>Discover the beautiful language of the Guna people, who live on the islands of Panama's Caribbean coast.</p>
                            </div>
                            
                            <div class="cultural-context">
                                <h3>🌊 Cultural Context</h3>
                                <p>The Guna people are known for their rich maritime culture, beautiful molas (traditional textiles), and strong community values. Their language reflects their deep connection to the sea and their island home.</p>
                                
                                <div class="cultural-highlights">
                                    <div class="highlight-item">
                                        <i class="fas fa-water"></i>
                                        <span>Sea-faring people</span>
                                    </div>
                                    <div class="highlight-item">
                                        <i class="fas fa-palette"></i>
                                        <span>Famous for molas</span>
                                    </div>
                                    <div class="highlight-item">
                                        <i class="fas fa-users"></i>
                                        <span>Strong community</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                },
                {
                    type: 'vocabulary',
                    title: "Essential Greetings",
                    content: `
                        <div class="vocabulary-section">
                            <h3>📚 Basic Greetings Vocabulary</h3>
                            <p>Let's learn the most important greeting words and phrases in Guna:</p>
                            
                            <div class="vocabulary-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Guna</th>
                                            <th>Español</th>
                                            <th>English</th>
                                            <th>Pronunciation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>¡ anna !</strong></td>
                                            <td>Hola</td>
                                            <td>Hello</td>
                                            <td>¡ anna !</td>
                                        </tr>
                                        <tr>
                                            <td><strong>¡ naa !</strong></td>
                                            <td>Hola</td>
                                            <td>Hi</td>
                                            <td>¡ naa !</td>
                                        </tr>
                                        <tr>
                                            <td><strong>¡ degidde !</strong></td>
                                            <td>Hola</td>
                                            <td>Hello</td>
                                            <td>¡ degite !</td>
                                        </tr>
                                        <tr>
                                            <td><strong>degi malo</strong></td>
                                            <td>Adios</td>
                                            <td>Goodbye</td>
                                            <td>Degi malo</td>
                                        </tr>
                                        <tr>
                                            <td><strong>¡ banmalo !</strong></td>
                                            <td>Hasta mañana</td>
                                            <td>See you tomorrow</td>
                                            <td>Banmelo</td>
                                        </tr>
                                        <tr>
                                            <td><strong>¡ banemalo !</strong></td>
                                            <td>Hasta mañana</td>
                                            <td>See you tomorrow</td>
                                            <td>Banemalo</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="pronunciation-tips">
                                <h4>💡 Pronunciation Tips</h4>
                                <ul>
                                    <li><strong>¡ anna !</strong> - Similar to "ah-nah" with emphasis</li>
                                    <li><strong>¡ naa !</strong> - Sounds like "nah" with a long 'a'</li>
                                    <li><strong>degidde</strong> - "deh-gee-deh" with soft 'g'</li>
                                    <li><strong>malo</strong> - "mah-lo" with clear 'o'</li>
                                </ul>
                            </div>
                        </div>
                    `
                },
                {
                    type: 'interactive',
                    title: "Practice Time!",
                    content: `
                        <div class="interactive-section">
                            <h3>🎯 Let's Practice!</h3>
                            <p>Test your knowledge of Guna greetings with these interactive exercises:</p>
                            
                            <div class="quiz-container">
                                <div class="quiz-question" data-question="1">
                                    <h4>Question 1: How do you say "Hello" in Guna?</h4>
                                    <div class="quiz-options">
                                        <button class="quiz-option" data-answer="anna">¡ anna !</button>
                                        <button class="quiz-option" data-answer="malo">degi malo</button>
                                        <button class="quiz-option" data-answer="banmalo">¡ banmalo !</button>
                                        <button class="quiz-option" data-answer="naa">¡ naa !</button>
                                    </div>
                                    <div class="quiz-feedback" style="display: none;"></div>
                                </div>
                                
                                <div class="quiz-question" data-question="2">
                                    <h4>Question 2: What does "degi malo" mean?</h4>
                                    <div class="quiz-options">
                                        <button class="quiz-option" data-answer="hello">Hello</button>
                                        <button class="quiz-option" data-answer="goodbye">Goodbye</button>
                                        <button class="quiz-option" data-answer="tomorrow">See you tomorrow</button>
                                        <button class="quiz-option" data-answer="thanks">Thank you</button>
                                    </div>
                                    <div class="quiz-feedback" style="display: none;"></div>
                                </div>
                                
                                <div class="quiz-question" data-question="3">
                                    <h4>Question 3: Which phrase means "See you tomorrow"?</h4>
                                    <div class="quiz-options">
                                        <button class="quiz-option" data-answer="anna">¡ anna !</button>
                                        <button class="quiz-option" data-answer="malo">degi malo</button>
                                        <button class="quiz-option" data-answer="banmalo">¡ banmalo !</button>
                                        <button class="quiz-option" data-answer="naa">¡ naa !</button>
                                    </div>
                                    <div class="quiz-feedback" style="display: none;"></div>
                                </div>
                                
                                <div class="quiz-question" data-question="4">
                                    <h4>Question 4: Match the Guna greeting with its meaning:</h4>
                                    <div class="matching-exercise">
                                        <div class="matching-pairs">
                                            <div class="matching-item" data-pair="1">
                                                <span class="guna-text">¡ anna !</span>
                                                <select class="matching-select">
                                                    <option value="">Select meaning...</option>
                                                    <option value="hello">Hello</option>
                                                    <option value="goodbye">Goodbye</option>
                                                    <option value="tomorrow">See you tomorrow</option>
                                                </select>
                                            </div>
                                            <div class="matching-item" data-pair="2">
                                                <span class="guna-text">degi malo</span>
                                                <select class="matching-select">
                                                    <option value="">Select meaning...</option>
                                                    <option value="hello">Hello</option>
                                                    <option value="goodbye">Goodbye</option>
                                                    <option value="tomorrow">See you tomorrow</option>
                                                </select>
                                            </div>
                                            <div class="matching-item" data-pair="3">
                                                <span class="guna-text">¡ banmalo !</span>
                                                <select class="matching-select">
                                                    <option value="">Select meaning...</option>
                                                    <option value="hello">Hello</option>
                                                    <option value="goodbye">Goodbye</option>
                                                    <option value="tomorrow">See you tomorrow</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button class="check-matching-btn">Check Answers</button>
                                        <div class="matching-feedback" style="display: none;"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="quiz-results" style="display: none;">
                                <h4>🎉 Quiz Results</h4>
                                <div class="results-summary">
                                    <p>You got <span class="correct-answers">0</span> out of <span class="total-questions">4</span> questions correct!</p>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 0%"></div>
                                    </div>
                                </div>
                                <button class="retry-quiz-btn">Try Again</button>
                                <button class="continue-lesson-btn">Continue to Next Section</button>
                            </div>
                        </div>
                    `
                },
                {
                    type: 'conversation',
                    title: "Real Conversation Practice",
                    content: `
                        <div class="conversation-section">
                            <h3>💬 Practice Conversation</h3>
                            <p>Practice using Guna greetings in realistic scenarios:</p>
                            
                            <div class="conversation-scenarios">
                                <div class="scenario" data-scenario="1">
                                    <h4>Scenario 1: Meeting a Guna friend</h4>
                                    <div class="scenario-content">
                                        <p><strong>You:</strong> [Choose the appropriate greeting]</p>
                                        <div class="scenario-options">
                                            <button class="scenario-option" data-greeting="anna">¡ anna !</button>
                                            <button class="scenario-option" data-greeting="naa">¡ naa !</button>
                                            <button class="scenario-option" data-greeting="degidde">¡ degidde !</button>
                                        </div>
                                        <div class="scenario-response" style="display: none;">
                                            <p><strong>Friend:</strong> ¡ anna ! ¿Cómo estás?</p>
                                            <p><strong>You:</strong> [Now choose how to say goodbye]</p>
                                            <div class="scenario-options">
                                                <button class="scenario-option" data-greeting="malo">degi malo</button>
                                                <button class="scenario-option" data-greeting="banmalo">¡ banmalo !</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="scenario" data-scenario="2">
                                    <h4>Scenario 2: Saying goodbye for the day</h4>
                                    <div class="scenario-content">
                                        <p><strong>You:</strong> [Choose the appropriate farewell]</p>
                                        <div class="scenario-options">
                                            <button class="scenario-option" data-greeting="malo">degi malo</button>
                                            <button class="scenario-option" data-greeting="banmalo">¡ banmalo !</button>
                                            <button class="scenario-option" data-greeting="banemalo">¡ banemalo !</button>
                                        </div>
                                        <div class="scenario-response" style="display: none;">
                                            <p><strong>Friend:</strong> ¡ banmalo ! Que tengas un buen día.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                },
                {
                    type: 'summary',
                    title: "Lesson Summary",
                    content: `
                        <div class="lesson-summary">
                            <h3>📝 What You've Learned</h3>
                            
                            <div class="summary-content">
                                <div class="learned-greetings">
                                    <h4>✅ Greetings You Can Now Use:</h4>
                                    <ul>
                                        <li><strong>¡ anna !</strong> - Hello (most common)</li>
                                        <li><strong>¡ naa !</strong> - Hi (informal)</li>
                                        <li><strong>¡ degidde !</strong> - Hello (alternative)</li>
                                        <li><strong>degi malo</strong> - Goodbye</li>
                                        <li><strong>¡ banmalo !</strong> - See you tomorrow</li>
                                        <li><strong>¡ banemalo !</strong> - See you tomorrow (alternative)</li>
                                    </ul>
                                </div>
                                
                                <div class="cultural-notes">
                                    <h4>🌊 Cultural Notes:</h4>
                                    <ul>
                                        <li>Guna greetings often reflect their maritime culture</li>
                                        <li>Use "¡ anna !" as your go-to greeting</li>
                                        <li>Show respect by using the appropriate farewell</li>
                                        <li>Practice pronunciation to show cultural respect</li>
                                    </ul>
                                </div>
                                
                                <div class="next-steps">
                                    <h4>🚀 Next Steps:</h4>
                                    <p>Great job! You're ready to move on to:</p>
                                    <ul>
                                        <li>Numbers and counting in Guna</li>
                                        <li>Family vocabulary</li>
                                        <li>Basic conversation skills</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="lesson-completion">
                                <button class="complete-lesson-btn">Complete Lesson</button>
                                <button class="review-lesson-btn">Review Again</button>
                            </div>
                        </div>
                    `
                }
            ]
        };
    }

    // Numbers Lesson - Essential elements
    getNumbersLesson() {
        const words = GUNA_VOCABULARY.objects;
        return this.buildStandardLesson({
            id: 2,
            title: '🌊 Island Elements - Elementos Guna',
            subtitle: 'Home, water, fire and island tools',
            duration: 20,
            xp: 75,
            introTitle: 'Island Life Vocabulary',
            introHeading: '🏝️ Essential Island Elements',
            introText: 'Learn the words for the elements that shape daily life in Guna Yala — from the house (Muu) to the canoe (Onmaked).',
            culturalText: 'The Guna people live between sea and land. Water (Sii), fire (Dii), and the canoe are central to survival, fishing, and community gatherings on the islands.',
            vocabTitle: 'Objects & Daily Life',
            vocabIntro: 'From the Complete Guna Culture guide and trilingual dictionary:',
            quiz: [
                { q: 'How do you say "Water" in Guna?', options: [
                    { value: 'sii', label: 'Sii' }, { value: 'dii', label: 'Dii' },
                    { value: 'muu', label: 'Muu' }, { value: 'gwamai', label: 'Gwamai' }
                ]},
                { q: 'What does "Muu" mean?', options: [
                    { value: 'house', label: 'House' }, { value: 'fire', label: 'Fire' },
                    { value: 'water', label: 'Water' }, { value: 'canoe', label: 'Canoe' }
                ]},
                { q: 'Which word means "Fishing net"?', options: [
                    { value: 'obaggad', label: 'Obaggad' }, { value: 'onmaked', label: 'Onmaked' },
                    { value: 'misi', label: 'Misi' }, { value: 'bii', label: 'Bii' }
                ]}
            ],
            matchPairs: [{ guna: 'Sii' }, { guna: 'Muu' }, { guna: 'Dii' }],
            matchOptionPool: [
                { value: 'water', label: 'Water' }, { value: 'house', label: 'House' },
                { value: 'fire', label: 'Fire' }, { value: 'hat', label: 'Hat' }
            ],
            completionTitle: 'Great progress!',
            completionText: 'You can now name essential elements of Guna island life.'
        });
    }

    getFamilyLesson() {
        const words = GUNA_VOCABULARY.family;
        return this.buildStandardLesson({
            id: 3,
            title: '👨‍👩‍👧‍👦 Family & Community - Familia Guna',
            subtitle: 'Family relationships and community bonds',
            duration: 25,
            xp: 100,
            introTitle: 'Family in Guna Culture',
            introHeading: '👪 Family & Community',
            introText: 'Family is the heart of Guna society. Learn how to name parents, siblings, grandparents and more.',
            culturalText: 'Guna communities make decisions collectively in local congresses. Elders (Dada and Bab) pass wisdom to younger generations through oral tradition.',
            vocabTitle: 'Family Vocabulary',
            vocabIntro: 'Key family terms from the trilingual dictionary:',
            quiz: [
                { q: 'How do you say "Mother" in Guna?', options: [
                    { value: 'nana', label: 'Nana' }, { value: 'tata', label: 'Tata' },
                    { value: 'dada', label: 'Dada' }, { value: 'bab', label: 'Bab' }
                ]},
                { q: 'What does "Tata" mean?', options: [
                    { value: 'father', label: 'Father' }, { value: 'mother', label: 'Mother' },
                    { value: 'brother', label: 'Brother' }, { value: 'baby', label: 'Baby' }
                ]},
                { q: 'Which word means "Grandmother"?', options: [
                    { value: 'dada', label: 'Dada' }, { value: 'bab', label: 'Bab' },
                    { value: 'nueded', label: 'Nueded' }, { value: 'sogedi', label: 'Sogedi' }
                ]}
            ],
            matchPairs: [{ guna: 'Nana' }, { guna: 'Tata' }, { guna: 'Dummad' }],
            matchOptionPool: [
                { value: 'mother', label: 'Mother' }, { value: 'father', label: 'Father' },
                { value: 'brother', label: 'Brother' }, { value: 'sister', label: 'Sister' }
            ],
            completionTitle: 'Family words mastered!',
            completionText: 'You can now talk about family members in Guna.'
        });
    }

    getColorsLesson() {
        const words = GUNA_VOCABULARY.animals;
        return this.buildStandardLesson({
            id: 4,
            title: '🐢 Sea Creatures & Animals - Animales Guna',
            subtitle: 'Marine life and rainforest animals',
            duration: 30,
            xp: 125,
            introTitle: 'Animals of Guna Territory',
            introHeading: '🌊 Sea Creatures & Animals',
            introText: 'From crabs and sharks to parrots and turtles — animals are part of Guna stories, molas, and daily life.',
            culturalText: 'The sea turtle (Ardi) appears in Guna legends. Crabs (Uli) and sharks (Ibeler) connect the people to the Caribbean waters they have navigated for centuries.',
            vocabTitle: 'Animals Vocabulary',
            vocabIntro: 'Animals from the cultural dictionary:',
            quiz: [
                { q: 'How do you say "Turtle" in Guna?', options: [
                    { value: 'ardi', label: 'Ardi' }, { value: 'uli', label: 'Uli' },
                    { value: 'ibeler', label: 'Ibeler' }, { value: 'makki', label: 'Makki' }
                ]},
                { q: 'What does "Uli" mean?', options: [
                    { value: 'crab', label: 'Crab' }, { value: 'shark', label: 'Shark' },
                    { value: 'bird', label: 'Bird' }, { value: 'monkey', label: 'Monkey' }
                ]},
                { q: 'Which word means "Parrot"?', options: [
                    { value: 'makki', label: 'Makki' }, { value: 'olo', label: 'Olo' },
                    { value: 'wala', label: 'Wala' }, { value: 'malu', label: 'Malú' }
                ]}
            ],
            matchPairs: [{ guna: 'Ardi' }, { guna: 'Ibeler' }, { guna: 'Makki' }],
            matchOptionPool: [
                { value: 'turtle', label: 'Turtle' }, { value: 'shark', label: 'Shark' },
                { value: 'parrot', label: 'Parrot' }, { value: 'butterfly', label: 'Butterfly' }
            ],
            completionTitle: 'Animal vocabulary complete!',
            completionText: 'You can now name animals from the sea and forest in Guna.'
        });
    }

    getAssessmentLesson() {
        const words = GUNA_VOCABULARY.plants;
        return this.buildStandardLesson({
            id: 5,
            title: '🥥 Plants & Coconut - Plantas Guna',
            subtitle: 'Traditional foods and island agriculture',
            duration: 30,
            xp: 125,
            introTitle: 'Guna Food & Plants',
            introHeading: '🥥 Plants & Coconut',
            introText: 'Coconut (Gwad) is essential to Guna cuisine and culture. Learn plants and foods from land and sea.',
            culturalText: 'Traditional Guna food includes fresh fish, crab, coconut, plantain, yuca and corn. Coconut milk is used in many traditional dishes.',
            vocabTitle: 'Plants & Foods',
            vocabIntro: 'Plants and foods from the cultural guide:',
            quiz: [
                { q: 'How do you say "Coconut" in Guna?', options: [
                    { value: 'gwad', label: 'Gwad' }, { value: 'ogob', label: 'Ogob' },
                    { value: 'naggid', label: 'Naggid' }, { value: 'olawad', label: 'Olawad' }
                ]},
                { q: 'What does "Ogob" mean?', options: [
                    { value: 'corn', label: 'Corn' }, { value: 'coconut', label: 'Coconut' },
                    { value: 'yam', label: 'Yam' }, { value: 'tomato', label: 'Tomato' }
                ]},
                { q: 'Which word means "Cassava (Yuca)"?', options: [
                    { value: 'naggid', label: 'Naggid' }, { value: 'suggid', label: 'Suggid' },
                    { value: 'tula', label: 'Tula' }, { value: 'suwad', label: 'Suwad' }
                ]}
            ],
            matchPairs: [{ guna: 'Gwad' }, { guna: 'Ogob' }, { guna: 'Naggid' }],
            matchOptionPool: [
                { value: 'coconut', label: 'Coconut' }, { value: 'corn', label: 'Corn' },
                { value: 'cassava', label: 'Cassava' }, { value: 'pumpkin', label: 'Pumpkin' }
            ],
            completionTitle: 'Plants & foods learned!',
            completionText: 'You understand key Guna foods including the sacred coconut.'
        });
    }

    getMolaCultureLesson() {
        return {
            id: 6,
            title: '🧵 Mola Culture & History - Cultura Guna',
            subtitle: 'Molas, revolution and spiritual heritage',
            duration: 35,
            xp: 150,
            sections: [
                {
                    type: 'introduction',
                    title: 'Guna Cultural Heritage',
                    content: `
                        <div class="lesson-intro">
                            <h2>🧵 Molas & Guna Identity</h2>
                            <p>From <em>Cultura Guna Completa</em>: Molas are reverse-appliqué textiles made by Guna women, recognized worldwide for their colorful designs.</p>
                            <div class="cultural-context">
                                <h3>📜 Key Historical Events</h3>
                                <ul>
                                    <li><strong>1925 Tule Revolution</strong> — Guna people defended their customs, dress and autonomy.</li>
                                    <li><strong>Ibeorgun</strong> — Creator who taught harmony with nature.</li>
                                    <li><strong>Kantule</strong> — Ancestral sage who taught community, medicine and respect.</li>
                                    <li><strong>Saglas</strong> — Traditional leaders who guide community decisions.</li>
                                </ul>
                            </div>
                        </div>
                    `
                },
                {
                    type: 'vocabulary',
                    title: 'Cultural Concepts',
                    content: `
                        <div class="vocabulary-section">
                            <h3>🏝️ Cultural Vocabulary</h3>
                            <div class="vocabulary-table">
                                <table>
                                    <thead><tr><th>Concept</th><th>Español</th><th>English</th></tr></thead>
                                    <tbody>
                                        <tr><td><strong>Mola</strong></td><td>Textil tradicional Guna</td><td>Traditional Guna textile</td></tr>
                                        <tr><td><strong>Dulegaya / Gunagaya</strong></td><td>Idioma Guna</td><td>Guna language</td></tr>
                                        <tr><td><strong>Comarca Guna Yala</strong></td><td>Territorio autónomo</td><td>Autonomous territory</td></tr>
                                        <tr><td><strong>Sagla</strong></td><td>Líder tradicional</td><td>Traditional leader</td></tr>
                                        <tr><td><strong>Congreso</strong></td><td>Asamblea comunitaria</td><td>Community assembly</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `
                },
                {
                    type: 'interactive',
                    title: 'Culture Quiz',
                    content: `
                        <div class="interactive-section">
                            <div class="quiz-container">
                                ${this.buildQuizQuestion(1, 'What are Guna molas?', [
                                    { value: 'textiles', label: 'Traditional reverse-appliqué textiles' },
                                    { value: 'boats', label: 'Fishing boats' },
                                    { value: 'songs', label: 'Ceremonial songs' },
                                    { value: 'houses', label: 'Traditional houses' }
                                ])}
                                ${this.buildQuizQuestion(2, 'The 1925 Tule Revolution defended:', [
                                    { value: 'autonomy', label: 'Guna customs and autonomy' },
                                    { value: 'trade', label: 'International trade' },
                                    { value: 'mining', label: 'Mining rights' },
                                    { value: 'tourism', label: 'Tourism development' }
                                ])}
                                ${this.buildQuizQuestion(3, 'Who is considered the creator in Guna tradition?', [
                                    { value: 'ibeorgun', label: 'Ibeorgun' },
                                    { value: 'kantule', label: 'Kantule' },
                                    { value: 'sagla', label: 'Sagla' },
                                    { value: 'ardi', label: 'Ardi' }
                                ])}
                                ${this.buildMatchingExercise([
                                    { guna: 'Mola', options: [
                                        { value: 'textile', label: 'Traditional textile' },
                                        { value: 'leader', label: 'Community leader' },
                                        { value: 'language', label: 'Guna language' }
                                    ]},
                                    { guna: 'Sagla', options: [
                                        { value: 'textile', label: 'Traditional textile' },
                                        { value: 'leader', label: 'Community leader' },
                                        { value: 'language', label: 'Guna language' }
                                    ]},
                                    { guna: 'Dulegaya', options: [
                                        { value: 'textile', label: 'Traditional textile' },
                                        { value: 'leader', label: 'Community leader' },
                                        { value: 'language', label: 'Guna language' }
                                    ]}
                                ])}
                                <div class="quiz-results" style="display: none;">
                                    <h4>Quiz Results</h4>
                                    <p>Score: <span class="correct-answers">0</span> / 4</p>
                                    <div class="progress-track"><div class="progress-fill" style="width: 0%"></div></div>
                                </div>
                            </div>
                        </div>
                    `
                },
                {
                    type: 'completion',
                    title: 'Culture Lesson Complete!',
                    content: `
                        <div class="completion-section">
                            <h3>🎉 You explored Guna cultural heritage!</h3>
                            <p>Read the full guide in <strong>Stories → Complete Guna Culture Guide</strong>.</p>
                            <div class="lesson-completion">
                                <button class="complete-lesson-btn">Complete Lesson</button>
                                <button class="review-lesson-btn">Review Again</button>
                            </div>
                        </div>
                    `
                }
            ]
        };
    }

    getPronounsLesson() {
        const words = [...GUNA_VOCABULARY.pronouns, ...GUNA_VOCABULARY.phrases];
        return this.buildStandardLesson({
            id: 7,
            title: '💬 Daily Phrases & Pronouns - Frases Guna',
            subtitle: 'Speak in everyday Guna conversations',
            duration: 25,
            xp: 100,
            introTitle: 'Everyday Communication',
            introHeading: '💬 Pronouns & Daily Phrases',
            introText: 'Learn personal pronouns and useful everyday expressions to start simple conversations.',
            culturalText: 'Oral tradition remains fundamental in Guna communities. Ceremonial songs and daily phrases keep the language alive across generations.',
            vocabTitle: 'Pronouns & Phrases',
            vocabIntro: 'From the trilingual dictionary study guide:',
            quiz: [
                { q: 'How do you say "I" in Guna?', options: [
                    { value: 'na', label: 'Na' }, { value: 'be', label: 'Be' },
                    { value: 'anmar', label: 'Anmar' }, { value: 'nega', label: 'Nega' }
                ]},
                { q: 'What does "Eye" mean?', options: [
                    { value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' },
                    { value: 'where', label: 'Where?' }, { value: 'today', label: 'Today' }
                ]},
                { q: 'Which phrase means "See you tomorrow"?', options: [
                    { value: 'banmalo', label: 'Banmalo' }, { value: 'degii', label: 'Degii' },
                    { value: 'basuli', label: 'Basuli' }, { value: 'bia', label: 'Bia?' }
                ]}
            ],
            matchPairs: [{ guna: 'Na' }, { guna: 'Be' }, { guna: 'Anmar' }],
            matchOptionPool: [
                { value: 'i', label: 'I' }, { value: 'you', label: 'You' },
                { value: 'we', label: 'We' }, { value: 'they', label: 'They' }
            ],
            completionTitle: 'Phrases mastered!',
            completionText: 'You can use basic pronouns and everyday Guna expressions.'
        });
    }

    getMasteryLesson() {
        return {
            id: 8,
            title: '🏆 Cultural Mastery - Combined Challenge',
            subtitle: 'Test your combined Guna knowledge',
            duration: 35,
            xp: 175,
            sections: [
                {
                    type: 'introduction',
                    title: 'Final Assessment',
                    content: `
                        <div class="lesson-intro">
                            <h2>🏆 Cultural Mastery Challenge</h2>
                            <p>Combine greetings, vocabulary, culture and phrases from all previous levels.</p>
                            <p>Reference documents: <em>gayamar sabga</em> dictionary, trilingual study guide, and Complete Guna Culture.</p>
                        </div>
                    `
                },
                {
                    type: 'interactive',
                    title: 'Mastery Quiz',
                    content: `
                        <div class="interactive-section">
                            <div class="quiz-container">
                                ${this.buildQuizQuestion(1, 'How do you say "Hello" in Guna?', [
                                    { value: 'anna', label: '¡ anna !' }, { value: 'gwad', label: 'Gwad' },
                                    { value: 'nana', label: 'Nana' }, { value: 'sii', label: 'Sii' }
                                ])}
                                ${this.buildQuizQuestion(2, 'What does "Gwad" mean?', [
                                    { value: 'coconut', label: 'Coconut' }, { value: 'water', label: 'Water' },
                                    { value: 'house', label: 'House' }, { value: 'mother', label: 'Mother' }
                                ])}
                                ${this.buildQuizQuestion(3, 'Traditional Guna leaders are called:', [
                                    { value: 'saglas', label: 'Saglas' }, { value: 'molas', label: 'Molas' },
                                    { value: 'canoes', label: 'Onmaked' }, { value: 'makki', label: 'Makki' }
                                ])}
                                ${this.buildMatchingExercise([
                                    { guna: 'Sii', options: [
                                        { value: 'water', label: 'Water' }, { value: 'fire', label: 'Fire' },
                                        { value: 'mother', label: 'Mother' }, { value: 'coconut', label: 'Coconut' }
                                    ]},
                                    { guna: 'Nana', options: [
                                        { value: 'water', label: 'Water' }, { value: 'fire', label: 'Fire' },
                                        { value: 'mother', label: 'Mother' }, { value: 'coconut', label: 'Coconut' }
                                    ]},
                                    { guna: 'Ardi', options: [
                                        { value: 'turtle', label: 'Turtle' }, { value: 'shark', label: 'Shark' },
                                        { value: 'crab', label: 'Crab' }, { value: 'parrot', label: 'Parrot' }
                                    ]}
                                ])}
                                <div class="quiz-results" style="display: none;">
                                    <h4>Final Score</h4>
                                    <p>Score: <span class="correct-answers">0</span> / 4</p>
                                    <div class="progress-track"><div class="progress-fill" style="width: 0%"></div></div>
                                </div>
                            </div>
                        </div>
                    `
                },
                {
                    type: 'completion',
                    title: 'Mastery Achieved!',
                    content: `
                        <div class="completion-section">
                            <h3>🎉 ¡Excelente! You completed the Guna Learning Path!</h3>
                            <p>Keep exploring the reference documents in Stories and earn cocos in the store.</p>
                            <div class="lesson-completion">
                                <button class="complete-lesson-btn">Complete Lesson</button>
                            </div>
                        </div>
                    `
                }
            ]
        };
    }

    getOralTraditionsLesson() {
        return {
            id: 9,
            title: "📜 Oral Traditions - Sabiduría Ancestral",
            subtitle: "Congress, saglas and ceremonial knowledge",
            duration: 30,
            xp: 150,
            sections: [
                {
                    type: 'introduction',
                    title: 'Oral Tradition & Governance',
                    content: `
                        <div class="lesson-intro">
                            <h2>📜 Oral Traditions & Community</h2>
                            <p>From the Complete Guna Culture guide: Guna communities govern through local congresses where decisions are made collectively.</p>
                            <div class="cultural-context">
                                <h3>🏛️ Key Concepts</h3>
                                <ul>
                                    <li><strong>Saglas</strong> — Traditional leaders who guide the community</li>
                                    <li><strong>Congreso</strong> — Community assembly for collective decisions</li>
                                    <li><strong>Ceremonial songs</strong> — Preserve ancestral stories</li>
                                    <li><strong>Fourth world belief</strong> — Responsibility to care for the Earth</li>
                                </ul>
                            </div>
                        </div>
                    `
                },
                {
                    type: 'interactive',
                    title: 'Tradition Quiz',
                    content: `
                        <div class="interactive-section">
                            <div class="quiz-container">
                                ${this.buildQuizQuestion(1, 'Who are the traditional Guna leaders?', [
                                    { value: 'saglas', label: 'Saglas' },
                                    { value: 'molas', label: 'Mola weavers only' },
                                    { value: 'ibeler', label: 'Ibeler sharks' },
                                    { value: 'gwad', label: 'Coconut farmers' }
                                ])}
                                ${this.buildQuizQuestion(2, 'How are important decisions made?', [
                                    { value: 'congress', label: 'Collectively in congress' },
                                    { value: 'alone', label: 'By one person alone' },
                                    { value: 'online', label: 'Only online' },
                                    { value: 'random', label: 'By random choice' }
                                ])}
                                ${this.buildQuizQuestion(3, 'What preserves ancestral stories?', [
                                    { value: 'songs', label: 'Ceremonial songs & oral tradition' },
                                    { value: 'phones', label: 'Mobile phones only' },
                                    { value: 'tv', label: 'Television' },
                                    { value: 'email', label: 'Email' }
                                ])}
                                ${this.buildMatchingExercise([
                                    { guna: 'Sagla', options: [
                                        { value: 'leader', label: 'Traditional leader' },
                                        { value: 'song', label: 'Ceremonial song' },
                                        { value: 'assembly', label: 'Community assembly' }
                                    ]},
                                    { guna: 'Congreso', options: [
                                        { value: 'leader', label: 'Traditional leader' },
                                        { value: 'song', label: 'Ceremonial song' },
                                        { value: 'assembly', label: 'Community assembly' }
                                    ]},
                                    { guna: 'Kantule', options: [
                                        { value: 'leader', label: 'Traditional leader' },
                                        { value: 'sage', label: 'Ancestral sage' },
                                        { value: 'assembly', label: 'Community assembly' }
                                    ]}
                                ])}
                                <div class="quiz-results" style="display: none;">
                                    <h4>Quiz Results</h4>
                                    <p>Score: <span class="correct-answers">0</span> / 4</p>
                                    <div class="progress-track"><div class="progress-fill" style="width: 0%"></div></div>
                                </div>
                            </div>
                        </div>
                    `
                },
                {
                    type: 'completion',
                    title: 'Lesson Complete!',
                    content: `
                        <div class="completion-section">
                            <h3>🎉 You learned about Guna governance and oral tradition!</h3>
                            <div class="lesson-completion">
                                <button class="complete-lesson-btn">Complete Lesson</button>
                                <button class="review-lesson-btn">Review Again</button>
                            </div>
                        </div>
                    `
                }
            ]
        };
    }

    getGrandChallengeLesson() {
        return {
            id: 10,
            title: "👑 Guna Grand Challenge - Final Boss",
            subtitle: "Prove your mastery of Guna language and culture",
            duration: 45,
            xp: 250,
            sections: [
                {
                    type: 'introduction',
                    title: 'Grand Challenge',
                    content: `
                        <div class="lesson-intro">
                            <h2>👑 Guna Grand Challenge</h2>
                            <p>The ultimate test combining greetings, vocabulary, culture, family, animals, plants and traditions from all 9 previous levels.</p>
                        </div>
                    `
                },
                {
                    type: 'interactive',
                    title: 'Grand Challenge Quiz',
                    content: `
                        <div class="interactive-section">
                            <div class="quiz-container">
                                ${this.buildQuizQuestion(1, 'Complete greeting: To say goodbye use...', [
                                    { value: 'malo', label: 'degi malo' },
                                    { value: 'anna', label: '¡ anna !' },
                                    { value: 'gwad', label: 'Gwad' },
                                    { value: 'nana', label: 'Nana' }
                                ])}
                                ${this.buildQuizQuestion(2, 'The 1925 revolution is called:', [
                                    { value: 'tule', label: 'Tule Revolution' },
                                    { value: 'coco', label: 'Coconut Revolution' },
                                    { value: 'mola', label: 'Mola Revolution' },
                                    { value: 'sea', label: 'Sea Revolution' }
                                ])}
                                ${this.buildQuizQuestion(3, 'Nana means:', [
                                    { value: 'mother', label: 'Mother' },
                                    { value: 'father', label: 'Father' },
                                    { value: 'water', label: 'Water' },
                                    { value: 'fire', label: 'Fire' }
                                ])}
                                ${this.buildMatchingExercise([
                                    { guna: 'Gwad', options: [
                                        { value: 'coconut', label: 'Coconut' },
                                        { value: 'water', label: 'Water' },
                                        { value: 'mother', label: 'Mother' }
                                    ]},
                                    { guna: 'Sii', options: [
                                        { value: 'coconut', label: 'Coconut' },
                                        { value: 'water', label: 'Water' },
                                        { value: 'mother', label: 'Mother' }
                                    ]},
                                    { guna: 'Ardi', options: [
                                        { value: 'turtle', label: 'Turtle' },
                                        { value: 'shark', label: 'Shark' },
                                        { value: 'crab', label: 'Crab' }
                                    ]}
                                ])}
                                <div class="quiz-results" style="display: none;">
                                    <h4>Grand Challenge Score</h4>
                                    <p>Score: <span class="correct-answers">0</span> / 4</p>
                                    <div class="progress-track"><div class="progress-fill" style="width: 0%"></div></div>
                                </div>
                            </div>
                        </div>
                    `
                },
                {
                    type: 'completion',
                    title: 'Grand Master!',
                    content: `
                        <div class="completion-section">
                            <h3>👑 Congratulations! You are a Guna Grand Master!</h3>
                            <p>You completed all 10 levels of the Guna Learning Path.</p>
                            <div class="lesson-completion">
                                <button class="complete-lesson-btn">Complete Lesson</button>
                            </div>
                        </div>
                    `
                }
            ]
        };
    }

    // Quiz answers for validation (per lesson)
    getQuizAnswers(lessonId) {
        const answers = {
            1: { 1: 'anna', 2: 'goodbye', 3: 'banmalo', 4: { 1: 'hello', 2: 'goodbye', 3: 'tomorrow' } },
            2: { 1: 'sii', 2: 'house', 3: 'obaggad', 4: { 1: 'water', 2: 'house', 3: 'fire' } },
            3: { 1: 'nana', 2: 'father', 3: 'dada', 4: { 1: 'mother', 2: 'father', 3: 'brother' } },
            4: { 1: 'ardi', 2: 'crab', 3: 'makki', 4: { 1: 'turtle', 2: 'shark', 3: 'parrot' } },
            5: { 1: 'gwad', 2: 'corn', 3: 'naggid', 4: { 1: 'coconut', 2: 'corn', 3: 'cassava' } },
            6: { 1: 'textiles', 2: 'autonomy', 3: 'ibeorgun', 4: { 1: 'textile', 2: 'leader', 3: 'language' } },
            7: { 1: 'na', 2: 'yes', 3: 'banmalo', 4: { 1: 'i', 2: 'you', 3: 'we' } },
            8: { 1: 'anna', 2: 'coconut', 3: 'saglas', 4: { 1: 'water', 2: 'mother', 3: 'turtle' } },
            9: { 1: 'saglas', 2: 'congress', 3: 'songs', 4: { 1: 'leader', 2: 'assembly', 3: 'sage' } },
            10: { 1: 'malo', 2: 'tule', 3: 'mother', 4: { 1: 'coconut', 2: 'water', 3: 'turtle' } }
        };
        return answers[lessonId] || answers[1];
    }

    validateQuiz(answers, lessonId = 1) {
        const correctAnswers = this.getQuizAnswers(lessonId);
        let score = 0;
        const totalQuestions = 4;
        const feedback = {};

        // Check multiple choice questions
        for (let i = 1; i <= 3; i++) {
            if (answers[i] === correctAnswers[i]) {
                score++;
                feedback[i] = { correct: true, message: "¡Correcto! Well done!" };
            } else {
                feedback[i] = { correct: false, message: `Incorrect. The correct answer is: ${correctAnswers[i]}` };
            }
        }

        // Check matching exercise
        const matchingCorrect = answers[4] && 
            answers[4][1] === correctAnswers[4][1] &&
            answers[4][2] === correctAnswers[4][2] &&
            answers[4][3] === correctAnswers[4][3];

        if (matchingCorrect) {
            score++;
            feedback[4] = { correct: true, message: "¡Perfecto! All matches are correct!" };
        } else {
            feedback[4] = { correct: false, message: "Some matches are incorrect. Try again!" };
        }

        return {
            score,
            totalQuestions,
            percentage: Math.round((score / totalQuestions) * 100),
            feedback
        };
    }

    // Save lesson progress
    saveProgress(lessonId, progress) {
        const userProgress = JSON.parse(localStorage.getItem('gunaProgress') || '{}');
        userProgress[lessonId] = {
            ...userProgress[lessonId],
            ...progress,
            completedAt: new Date().toISOString()
        };
        localStorage.setItem('gunaProgress', JSON.stringify(userProgress));
    }

    // Get lesson progress
    getProgress(lessonId) {
        const userProgress = JSON.parse(localStorage.getItem('gunaProgress') || '{}');
        return userProgress[lessonId] || null;
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GunaLessons;
} else {
    window.GunaLessons = GunaLessons;
}
