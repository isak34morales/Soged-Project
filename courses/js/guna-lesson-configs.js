/**
 * Guna Lesson Configs — data for all 10 learning levels
 */
const GUNA_LESSON_CONFIGS = {
    1: {
        id: 1, title: '👋 Greetings & Introductions', subtitle: 'Greetings and introductions',
        duration: 15, xp: 50,
        wordsKey: 'greetings',
        introTitle: 'Welcome', introHeading: '👋 Greetings & Introductions',
        introText: 'Learn basic greetings, pronouns and how to introduce yourself in Guna.',
        culturalText: 'Guna people greet each other warmly on the islands. Respectful greetings open every conversation and ceremony.',
        vocabTitle: 'Greetings & Pronouns', vocabIntro: 'Essential words to start speaking Guna:',
        quiz: [
            { q: 'How do you say "I" in Guna?', options: [
                { value: 'na', label: 'Na' }, { value: 'be', label: 'Be' },
                { value: 'eye', label: 'Eye' }, { value: 'degii', label: 'Degii' }
            ]},
            { q: 'What does "Eye" mean?', options: [
                { value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' },
                { value: 'you', label: 'You' }, { value: 'hello', label: 'Hello' }
            ]},
            { q: 'Which means "That\'s right"?', options: [
                { value: 'degii', label: 'Degii' }, { value: 'basuli', label: 'Basuli' },
                { value: 'bia', label: 'Bia?' }, { value: 'emi', label: 'Emi' }
            ]}
        ],
        matchPairs: [{ guna: 'Na' }, { guna: 'Be' }, { guna: 'Eye' }],
        matchOptionPool: [
            { value: 'i', label: 'I' }, { value: 'you', label: 'You' },
            { value: 'yes', label: 'Yes' }, { value: 'right', label: "That's right" }
        ],
        dragPairs: [
            { guna: 'Na', value: 'i', label: 'I' },
            { guna: 'Be', value: 'you', label: 'You' },
            { guna: 'Eye', value: 'yes', label: 'Yes' }
        ],
        completionTitle: 'Greetings mastered!', completionText: 'You can greet people and use basic pronouns in Guna.'
    },
    2: {
        id: 2, title: '👨‍👩‍👧 Family', subtitle: 'Family members',
        duration: 20, xp: 75,
        wordsKey: 'family',
        introTitle: 'Family', introHeading: '👨‍👩‍👧 Family',
        introText: 'Learn to name parents, siblings and grandparents in Guna.',
        culturalText: 'Family is the heart of Guna society. Elders pass wisdom through oral tradition.',
        vocabTitle: 'Family Vocabulary', vocabIntro: 'Key family terms:',
        quiz: [
            { q: 'How do you say "Mother"?', options: [
                { value: 'nana', label: 'Nana' }, { value: 'tata', label: 'Tata' },
                { value: 'dada', label: 'Dada' }, { value: 'bab', label: 'Bab' }
            ]},
            { q: 'What does "Tata" mean?', options: [
                { value: 'father', label: 'Father' }, { value: 'mother', label: 'Mother' },
                { value: 'brother', label: 'Brother' }, { value: 'sister', label: 'Sister' }
            ]},
            { q: 'Which word means "Grandmother"?', options: [
                { value: 'dada', label: 'Dada' }, { value: 'bab', label: 'Bab' },
                { value: 'nueded', label: 'Nueded' }, { value: 'dummad', label: 'Dummad' }
            ]}
        ],
        matchPairs: [{ guna: 'Nana' }, { guna: 'Tata' }, { guna: 'Dummad' }],
        matchOptionPool: [
            { value: 'mother', label: 'Mother' }, { value: 'father', label: 'Father' },
            { value: 'brother', label: 'Brother' }, { value: 'sister', label: 'Sister' }
        ],
        dragPairs: [
            { guna: 'Nana', value: 'mother', label: 'Mother' },
            { guna: 'Tata', value: 'father', label: 'Father' },
            { guna: 'Dummad', value: 'brother', label: 'Brother' }
        ],
        completionTitle: 'Family words learned!', completionText: 'You can talk about your family in Guna.'
    },
    3: {
        id: 3, title: '🏠 Home Objects', subtitle: 'Home objects',
        duration: 20, xp: 75,
        wordsKey: 'home',
        introTitle: 'Home', introHeading: '🏠 Home Objects',
        introText: 'Learn words for everyday objects in the Guna home.',
        culturalText: 'Guna homes (Muu) are gathering places for family and community on the islands.',
        vocabTitle: 'Home Vocabulary', vocabIntro: 'Objects you find at home:',
        quiz: [
            { q: 'How do you say "House"?', options: [
                { value: 'muu', label: 'Muu' }, { value: 'nika', label: 'Nika' },
                { value: 'misi', label: 'Misi' }, { value: 'bii', label: 'Bii' }
            ]},
            { q: 'What does "Misi" mean?', options: [
                { value: 'plate', label: 'Plate' }, { value: 'table', label: 'Table' },
                { value: 'spoon', label: 'Spoon' }, { value: 'clothes', label: 'Clothes' }
            ]},
            { q: 'Which word means "Spoon"?', options: [
                { value: 'tapa', label: 'Tapa' }, { value: 'nika', label: 'Nika' },
                { value: 'muu', label: 'Muu' }, { value: 'bii', label: 'Bii' }
            ]}
        ],
        matchPairs: [{ guna: 'Muu' }, { guna: 'Nika' }, { guna: 'Tapa' }],
        matchOptionPool: [
            { value: 'house', label: 'House' }, { value: 'table', label: 'Table' },
            { value: 'spoon', label: 'Spoon' }, { value: 'plate', label: 'Plate' }
        ],
        dragPairs: [
            { guna: 'Muu', value: 'house', label: 'House' },
            { guna: 'Nika', value: 'table', label: 'Table' },
            { guna: 'Tapa', value: 'spoon', label: 'Spoon' }
        ],
        completionTitle: 'Home objects learned!', completionText: 'You can name objects in the Guna home.'
    },
    4: {
        id: 4, title: '🌊 Nature', subtitle: 'Nature elements',
        duration: 25, xp: 100,
        wordsKey: 'nature',
        introTitle: 'Nature', introHeading: '🌊 Nature',
        introText: 'Learn words for water, fire, wood and clay — elements of island life.',
        culturalText: 'Water (Sii) and fire (Dii) are sacred elements in Guna daily life and ceremonies.',
        vocabTitle: 'Nature Vocabulary', vocabIntro: 'Natural elements:',
        quiz: [
            { q: 'How do you say "Water"?', options: [
                { value: 'sii', label: 'Sii' }, { value: 'dii', label: 'Dii' },
                { value: 'kalu', label: 'Kalu' }, { value: 'tii', label: 'Tii' }
            ]},
            { q: 'What does "Dii" mean?', options: [
                { value: 'fire', label: 'Fire' }, { value: 'water', label: 'Water' },
                { value: 'wood', label: 'Wood' }, { value: 'clay', label: 'Clay' }
            ]},
            { q: 'Which word means "Wood"?', options: [
                { value: 'kalu', label: 'Kalu' }, { value: 'tii', label: 'Tii' },
                { value: 'sii', label: 'Sii' }, { value: 'dii', label: 'Dii' }
            ]}
        ],
        matchPairs: [{ guna: 'Sii' }, { guna: 'Dii' }, { guna: 'Kalu' }],
        matchOptionPool: [
            { value: 'water', label: 'Water' }, { value: 'fire', label: 'Fire' },
            { value: 'wood', label: 'Wood' }, { value: 'clay', label: 'Clay' }
        ],
        dragPairs: [
            { guna: 'Sii', value: 'water', label: 'Water' },
            { guna: 'Dii', value: 'fire', label: 'Fire' },
            { guna: 'Kalu', value: 'wood', label: 'Wood' }
        ],
        completionTitle: 'Nature words learned!', completionText: 'You understand Guna words for natural elements.'
    },
    5: {
        id: 5, title: '🐢 Animals', subtitle: 'Animals of land and sea',
        duration: 30, xp: 125,
        wordsKey: 'animals',
        introTitle: 'Animals', introHeading: '🐢 Animals',
        introText: 'Learn animals from the sea, forest and island.',
        culturalText: 'Turtles, sharks and butterflies appear in Guna legends and mola designs.',
        vocabTitle: 'Animal Vocabulary', vocabIntro: 'Animals of Guna territory:',
        quiz: [
            { q: 'How do you say "Turtle"?', options: [
                { value: 'ardi', label: 'Ardi' }, { value: 'uli', label: 'Uli' },
                { value: 'ibeler', label: 'Ibeler' }, { value: 'wala', label: 'Wala' }
            ]},
            { q: 'What does "Uli" mean?', options: [
                { value: 'crab', label: 'Crab' }, { value: 'shark', label: 'Shark' },
                { value: 'chicken', label: 'Chicken' }, { value: 'monkey', label: 'Monkey' }
            ]},
            { q: 'Which word means "Butterfly"?', options: [
                { value: 'wala', label: 'Wala' }, { value: 'malu', label: 'Malú' },
                { value: 'suu', label: 'Suu' }, { value: 'ardi', label: 'Ardi' }
            ]}
        ],
        matchPairs: [{ guna: 'Ardi' }, { guna: 'Ibeler' }, { guna: 'Wala' }],
        matchOptionPool: [
            { value: 'turtle', label: 'Turtle' }, { value: 'shark', label: 'Shark' },
            { value: 'butterfly', label: 'Butterfly' }, { value: 'crab', label: 'Crab' }
        ],
        dragPairs: [
            { guna: 'Ardi', value: 'turtle', label: 'Turtle' },
            { guna: 'Ibeler', value: 'shark', label: 'Shark' },
            { guna: 'Wala', value: 'butterfly', label: 'Butterfly' }
        ],
        completionTitle: 'Animals mastered!', completionText: 'You can name animals in Guna.'
    },
    6: {
        id: 6, title: '🥥 Plants & Food', subtitle: 'Plants and foods',
        duration: 30, xp: 125,
        wordsKey: 'plants',
        introTitle: 'Plants & Food', introHeading: '🥥 Plants & Foods',
        introText: 'Learn traditional plants and foods including the sacred coconut.',
        culturalText: 'Coconut (Gwad) is essential to Guna cuisine, crafts and daily island life.',
        vocabTitle: 'Plants & Foods', vocabIntro: 'Traditional foods and plants:',
        quiz: [
            { q: 'How do you say "Coconut"?', options: [
                { value: 'gwad', label: 'Gwad' }, { value: 'ogob', label: 'Ogob' },
                { value: 'naggid', label: 'Naggid' }, { value: 'bagar', label: 'Bagar' }
            ]},
            { q: 'What does "Ogob" mean?', options: [
                { value: 'corn', label: 'Corn' }, { value: 'coconut', label: 'Coconut' },
                { value: 'yam', label: 'Yam' }, { value: 'tomato', label: 'Tomato' }
            ]},
            { q: 'Which word means "Cassava"?', options: [
                { value: 'naggid', label: 'Naggid' }, { value: 'suggid', label: 'Suggid' },
                { value: 'suwad', label: 'Suwad' }, { value: 'bagar', label: 'Bagar' }
            ]}
        ],
        matchPairs: [{ guna: 'Gwad' }, { guna: 'Ogob' }, { guna: 'Naggid' }],
        matchOptionPool: [
            { value: 'coconut', label: 'Coconut' }, { value: 'corn', label: 'Corn' },
            { value: 'cassava', label: 'Cassava' }, { value: 'tomato', label: 'Tomato' }
        ],
        dragPairs: [
            { guna: 'Gwad', value: 'coconut', label: 'Coconut' },
            { guna: 'Ogob', value: 'corn', label: 'Corn' },
            { guna: 'Naggid', value: 'cassava', label: 'Cassava' }
        ],
        completionTitle: 'Plants & foods learned!', completionText: 'You know Guna words for traditional foods.'
    },
    7: {
        id: 7, title: '💬 Basic Conversations', subtitle: 'Basic conversations',
        duration: 25, xp: 100,
        wordsKey: 'phrases',
        introTitle: 'Basic Phrases', introHeading: '💬 Basic Conversations',
        introText: 'Learn everyday questions and expressions for simple conversations.',
        culturalText: 'Oral tradition keeps the Guna language alive through daily conversations and ceremonies.',
        vocabTitle: 'Useful Phrases', vocabIntro: 'Everyday expressions:',
        quiz: [
            { q: 'How do you ask "Where?"', options: [
                { value: 'bia', label: 'Bia?' }, { value: 'doa', label: 'Doa?' },
                { value: 'basuli', label: 'Basuli' }, { value: 'emi', label: 'Emi' }
            ]},
            { q: 'What does "Doa?" mean?', options: [
                { value: 'who', label: 'Who?' }, { value: 'where', label: 'Where?' },
                { value: 'today', label: 'Today' }, { value: 'tomorrow', label: 'Tomorrow' }
            ]},
            { q: 'Which means "See you tomorrow"?', options: [
                { value: 'banmalo', label: 'Banmalo' }, { value: 'basuli', label: 'Basuli' },
                { value: 'bia', label: 'Bia?' }, { value: 'degii', label: 'Degii' }
            ]}
        ],
        matchPairs: [{ guna: 'Bia?' }, { guna: 'Doa?' }, { guna: 'Banmalo' }],
        matchOptionPool: [
            { value: 'where', label: 'Where?' }, { value: 'who', label: 'Who?' },
            { value: 'tomorrow', label: 'See you tomorrow' }, { value: 'matter', label: "Doesn't matter" }
        ],
        dragPairs: [
            { guna: 'Bia?', value: 'where', label: 'Where?' },
            { guna: 'Doa?', value: 'who', label: 'Who?' },
            { guna: 'Banmalo', value: 'tomorrow', label: 'See you tomorrow' }
        ],
        completionTitle: 'Basic phrases learned!', completionText: 'You can use everyday Guna expressions.'
    }
};

GUNA_LESSON_CONFIGS.quizAnswers = {
    1: { 1: 'na', 2: 'yes', 3: 'degii', 4: { 1: 'i', 2: 'you', 3: 'yes' } },
    2: { 1: 'nana', 2: 'father', 3: 'dada', 4: { 1: 'mother', 2: 'father', 3: 'brother' } },
    3: { 1: 'muu', 2: 'plate', 3: 'tapa', 4: { 1: 'house', 2: 'table', 3: 'spoon' } },
    4: { 1: 'sii', 2: 'fire', 3: 'kalu', 4: { 1: 'water', 2: 'fire', 3: 'wood' } },
    5: { 1: 'ardi', 2: 'crab', 3: 'wala', 4: { 1: 'turtle', 2: 'shark', 3: 'butterfly' } },
    6: { 1: 'gwad', 2: 'corn', 3: 'naggid', 4: { 1: 'coconut', 2: 'corn', 3: 'cassava' } },
    7: { 1: 'bia', 2: 'who', 3: 'banmalo', 4: { 1: 'where', 2: 'who', 3: 'tomorrow' } },
    8: { 1: 'anna', 2: 'coconut', 3: 'saglas', 4: { 1: 'water', 2: 'mother', 3: 'turtle' } },
    9: { 1: 'textiles', 2: 'autonomy', 3: 'ibeorgun', 4: { 1: 'textile', 2: 'leader', 3: 'language' } },
    10: { 1: 'malo', 2: 'tule', 3: 'mother', 4: { 1: 'coconut', 2: 'water', 3: 'turtle' } }
};

window.GUNA_LESSON_CONFIGS = GUNA_LESSON_CONFIGS;
