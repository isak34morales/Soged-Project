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
            5: this.getAssessmentLesson()
        };
        
        return lessons[lessonId] || this.getGreetingsLesson();
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

    // Numbers Lesson (placeholder for future content)
    getNumbersLesson() {
        return {
            id: 2,
            title: "🌊 Ocean Numbers - Números Guna",
            subtitle: "Learn to count like the sea people",
            duration: 20,
            xp: 75,
            sections: [
                {
                    type: 'introduction',
                    title: "Coming Soon!",
                    content: `
                        <div class="coming-soon">
                            <h3>🚧 This lesson is under development</h3>
                            <p>We're working hard to bring you the best Guna numbers lesson!</p>
                        </div>
                    `
                }
            ]
        };
    }

    // Family Lesson (placeholder for future content)
    getFamilyLesson() {
        return {
            id: 3,
            title: "👨‍👩‍👧‍👦 Family & Community - Familia Guna",
            subtitle: "Learn family relationships and community terms",
            duration: 25,
            xp: 100,
            sections: [
                {
                    type: 'introduction',
                    title: "Coming Soon!",
                    content: `
                        <div class="coming-soon">
                            <h3>🚧 This lesson is under development</h3>
                            <p>We're working hard to bring you the best Guna family lesson!</p>
                        </div>
                    `
                }
            ]
        };
    }

    // Colors Lesson (placeholder for future content)
    getColorsLesson() {
        return {
            id: 4,
            title: "🎨 Colors & Nature - Colores Guna",
            subtitle: "Describe the natural world in Guna",
            duration: 30,
            xp: 125,
            sections: [
                {
                    type: 'introduction',
                    title: "Coming Soon!",
                    content: `
                        <div class="coming-soon">
                            <h3>🚧 This lesson is under development</h3>
                            <p>We're working hard to bring you the best Guna colors lesson!</p>
                        </div>
                    `
                }
            ]
        };
    }

    // Assessment Lesson (placeholder for future content)
    getAssessmentLesson() {
        return {
            id: 5,
            title: "🏆 Cultural Assessment - Evaluación Guna",
            subtitle: "Test your knowledge with cultural scenarios",
            duration: 45,
            xp: 200,
            sections: [
                {
                    type: 'introduction',
                    title: "Coming Soon!",
                    content: `
                        <div class="coming-soon">
                            <h3>🚧 This assessment is under development</h3>
                            <p>We're working hard to bring you the best Guna cultural assessment!</p>
                        </div>
                    `
                }
            ]
        };
    }

    // Quiz answers for validation
    getQuizAnswers() {
        return {
            1: 'anna', // How do you say "Hello" in Guna?
            2: 'goodbye', // What does "degi malo" mean?
            3: 'banmalo', // Which phrase means "See you tomorrow"?
            4: { // Matching exercise
                1: 'hello', // ¡ anna ! = Hello
                2: 'goodbye', // degi malo = Goodbye
                3: 'tomorrow' // ¡ banmalo ! = See you tomorrow
            }
        };
    }

    // Validate quiz answers
    validateQuiz(answers) {
        const correctAnswers = this.getQuizAnswers();
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
