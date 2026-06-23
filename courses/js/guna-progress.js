/**
 * Guna Learning Path — lesson progress & unlocks
 */
const GunaProgress = {
    STORAGE_KEY: 'guna_lesson_progress',
    TOTAL_LESSONS: 10,

    getProgress() {
        try {
            const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || 'null');
            if (data && Array.isArray(data.completed)) return data;
        } catch { /* ignore */ }
        return { completed: [1, 2, 3], current: 4 };
    },

    saveProgress(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    },

    isCompleted(lessonId) {
        return this.getProgress().completed.includes(lessonId);
    },

    getLessonsWithStatus(baseLessons) {
        const progress = this.getProgress();
        return baseLessons.map(lesson => {
            let status = 'locked';
            if (progress.completed.includes(lesson.id)) {
                status = 'completed';
            } else if (lesson.id === progress.current) {
                status = 'current';
            }
            return { ...lesson, status };
        });
    },

    completeLesson(lessonId) {
        const progress = this.getProgress();
        if (!progress.completed.includes(lessonId)) {
            progress.completed.push(lessonId);
            progress.completed.sort((a, b) => a - b);
        }
        const next = lessonId + 1;
        progress.current = next <= this.TOTAL_LESSONS ? next : lessonId;
        this.saveProgress(progress);

        if (typeof CocosEconomy !== 'undefined') {
            CocosEconomy.addCocos(25);
        }
        return progress;
    },

    getCompletedCount() {
        return this.getProgress().completed.length;
    }
};

window.GunaProgress = GunaProgress;
