# 🏝️ Guna Language Lessons - Documentation

## Overview

This module provides interactive lessons for the Guna language, featuring cultural context, vocabulary, quizzes, and conversation practice. The content is based on authentic Guna language data and designed to be easily extensible.

## 📁 File Structure

```
courses/components/
├── guna-lessons.js          # Lesson content and data
├── guna-lesson-viewer.js    # Interactive lesson viewer component
└── guna-lessons.css         # Styling for Guna lessons
```

## 🚀 Quick Start

### 1. Include the Scripts

Add these scripts to your HTML file:

```html
<!-- Guna Language Lessons -->
<script src="components/guna-lessons.js"></script>
<script src="components/guna-lesson-viewer.js"></script>
<link rel="stylesheet" href="css/guna-lessons.css">
```

### 2. Use the Lesson Viewer

```html
<guna-lesson-viewer lesson-id="1"></guna-lesson-viewer>
```

### 3. Integration with Learning Hub

The lessons are automatically integrated with the learning hub when the course is set to 'guna':

```javascript
// The learning hub will automatically load Guna lessons
// when the course is 'guna' and a lesson is started
```

## 📚 Lesson Structure

Each lesson contains multiple sections:

### Section Types

1. **Introduction** (`type: 'introduction'`)
   - Cultural context
   - Welcome message
   - Learning objectives

2. **Vocabulary** (`type: 'vocabulary'`)
   - Word/phrase tables
   - Pronunciation guides
   - Cultural notes

3. **Interactive** (`type: 'interactive'`)
   - Multiple choice quizzes
   - Matching exercises
   - Progress tracking

4. **Conversation** (`type: 'conversation'`)
   - Real-world scenarios
   - Practice dialogues
   - Cultural context

5. **Summary** (`type: 'summary'`)
   - What was learned
   - Cultural notes
   - Next steps

## 🎯 Adding New Lessons

### 1. Create Lesson Content

Add a new lesson method in `guna-lessons.js`:

```javascript
getNewLesson() {
    return {
        id: 6, // Unique lesson ID
        title: "🏝️ New Lesson Title",
        subtitle: "Lesson description",
        duration: 20,
        xp: 100,
        sections: [
            {
                type: 'introduction',
                title: "Welcome to New Lesson",
                content: `
                    <div class="lesson-intro">
                        <h2>New Lesson Content</h2>
                        <p>Your lesson content here...</p>
                    </div>
                `
            },
            // Add more sections...
        ]
    };
}
```

### 2. Register the Lesson

Add the lesson to the `getLessonContent` method:

```javascript
getLessonContent(lessonId) {
    const lessons = {
        1: this.getGreetingsLesson(),
        2: this.getNumbersLesson(),
        3: this.getFamilyLesson(),
        4: this.getColorsLesson(),
        5: this.getAssessmentLesson(),
        6: this.getNewLesson() // Add your new lesson
    };
    
    return lessons[lessonId] || this.getGreetingsLesson();
}
```

### 3. Update Learning Path

Update the learning path in `learning-section.js`:

```javascript
'guna': [
    // ... existing lessons
    { 
        id: 6, 
        title: 'New Lesson', 
        description: 'Description of new lesson', 
        status: 'locked', 
        xp: 100, 
        duration: 20, 
        exercises: 15, 
        type: 'normal' 
    }
]
```

## 🎨 Customizing Styles

### Color Scheme

The Guna lessons use a specific color scheme defined in CSS variables:

```css
:root {
    --guna-primary: #00A3E0;      /* Main blue */
    --guna-secondary: #29B6F6;    /* Light blue */
    --guna-accent: #FF6B35;       /* Orange accent */
    --guna-success: #2ECC71;      /* Green for success */
    --guna-warning: #F39C12;      /* Orange for warnings */
    --guna-danger: #E74C3C;       /* Red for errors */
}
```

### Adding Custom Styles

Create custom styles for your lesson content:

```css
.my-custom-section {
    background: var(--guna-gradient-primary);
    color: white;
    padding: 2rem;
    border-radius: 16px;
    margin: 2rem 0;
}

.my-custom-element {
    border-left: 4px solid var(--guna-accent);
    padding-left: 1rem;
}
```

## 🧪 Interactive Features

### Quiz System

The lesson viewer includes a built-in quiz system:

```javascript
// Quiz answers are defined in getQuizAnswers()
getQuizAnswers() {
    return {
        1: 'correct_answer',
        2: 'correct_answer',
        3: 'correct_answer',
        4: { // Matching exercise
            1: 'match1',
            2: 'match2',
            3: 'match3'
        }
    };
}
```

### Progress Tracking

Lessons automatically save progress to localStorage:

```javascript
// Progress is saved automatically
this.gunaLessons.saveProgress(lessonId, {
    quizScore: results.score,
    quizPercentage: results.percentage,
    completed: true
});
```

## 🌊 Cultural Integration

### Cultural Context

Each lesson includes cultural context relevant to the Guna people:

- Maritime culture references
- Traditional practices
- Community values
- Historical context

### Cultural Elements

Use these cultural elements in your lessons:

```html
<div class="cultural-context">
    <h3>🌊 Cultural Context</h3>
    <p>Information about Guna culture...</p>
    
    <div class="cultural-highlights">
        <div class="highlight-item">
            <i class="fas fa-water"></i>
            <span>Sea-faring people</span>
        </div>
        <div class="highlight-item">
            <i class="fas fa-palette"></i>
            <span>Famous for molas</span>
        </div>
    </div>
</div>
```

## 📱 Responsive Design

The lessons are fully responsive and work on:

- Desktop computers
- Tablets
- Mobile phones

### Mobile Optimizations

- Touch-friendly buttons
- Simplified layouts
- Optimized text sizes
- Swipe gestures

## 🔧 Technical Details

### Component Architecture

- **GunaLessons**: Content management class
- **GunaLessonViewer**: Web component for display
- **CSS**: Styling and animations

### Event System

The lesson viewer dispatches events:

```javascript
// Lesson completion event
this.dispatchEvent(new CustomEvent('lessonCompleted', {
    detail: {
        lessonId: this.currentLessonId,
        course: 'guna'
    },
    bubbles: true
}));
```

### Data Persistence

Progress is saved to localStorage:

```javascript
// Save progress
localStorage.setItem('gunaProgress', JSON.stringify(userProgress));

// Load progress
const progress = JSON.parse(localStorage.getItem('gunaProgress') || '{}');
```

## 🚀 Best Practices

### Content Guidelines

1. **Cultural Sensitivity**: Always respect Guna culture and traditions
2. **Accuracy**: Ensure language content is accurate and verified
3. **Progressive Difficulty**: Build from simple to complex concepts
4. **Engagement**: Include interactive elements and cultural context

### Code Guidelines

1. **Modularity**: Keep lessons as separate methods
2. **Reusability**: Use common patterns for similar content
3. **Accessibility**: Include proper ARIA labels and keyboard navigation
4. **Performance**: Optimize images and animations

### Adding New Content Types

To add new interactive content types:

1. Define the content structure
2. Add rendering logic in the viewer
3. Include event handlers
4. Add appropriate styling
5. Test across devices

## 🐛 Troubleshooting

### Common Issues

1. **Lesson not loading**: Check script inclusion order
2. **Styles not applying**: Verify CSS file path
3. **Quiz not working**: Check answer format in getQuizAnswers()
4. **Progress not saving**: Verify localStorage is available

### Debug Mode

Enable debug logging:

```javascript
// Add to guna-lessons.js
const DEBUG = true;

if (DEBUG) {
    console.log('Lesson loaded:', lessonId);
    console.log('User answers:', this.userAnswers);
}
```

## 📈 Future Enhancements

### Planned Features

- Audio pronunciation guides
- Voice recognition for practice
- Cultural video content
- Community features
- Advanced progress analytics

### Extension Points

- Custom quiz types
- Interactive cultural stories
- Gamification elements
- Social learning features

## 🤝 Contributing

When adding new lessons:

1. Follow the existing structure
2. Include cultural context
3. Test on multiple devices
4. Verify language accuracy
5. Add appropriate documentation

## 📞 Support

For questions or issues:

1. Check this documentation
2. Review existing lesson examples
3. Test in different browsers
4. Verify script dependencies

---

**Note**: This module is designed to be culturally respectful and educationally effective. Always consult with native Guna speakers when adding new language content.
