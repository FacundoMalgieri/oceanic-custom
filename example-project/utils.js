// Utility functions for the Oceanic Custom theme demo
// Showcasing JavaScript syntax highlighting

/**
 * Format a date string for display
 * @param {Date|string} date - The date to format
 * @param {string} locale - The locale for formatting
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = 'en-US') => {
    const dateObj = date instanceof Date ? date : new Date(date);

    return dateObj.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Generate a random color from the Oceanic theme palette
 * @returns {string} Hex color code
 */
export const getRandomThemeColor = () => {
    const colors = [
        '#5CCFE6', // Primary cyan
        '#89DDFF', // Secondary cyan
        '#FF8F40', // Orange accent
        '#C792EA', // Purple
        '#BAE67E', // Green
        '#82AAFF', // Blue
        '#FFCB6B'  // Yellow
    ];

    return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Create a deep copy of an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Deep cloned object
 */
export const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;

    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));

    const cloned = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }

    return cloned;
};

/**
 * Throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
    let inThrottle;

    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Class example for syntax highlighting
export class ThemeManager {
    constructor(initialTheme = 'oceanic') {
        this.currentTheme = initialTheme;
        this.themes = new Map();
        this.observers = [];

        // Initialize default themes
        this.addTheme('oceanic', {
            name: 'Oceanic Custom',
            colors: {
                primary: '#5CCFE6',
                secondary: '#89DDFF',
                accent: '#FF8F40',
                background: '#263238'
            }
        });
    }

    /**
     * Add a new theme
     * @param {string} name - Theme name
     * @param {Object} config - Theme configuration
     */
    addTheme(name, config) {
        this.themes.set(name, config);
        this.notifyObservers('themeAdded', { name, config });
    }

    /**
     * Switch to a different theme
     * @param {string} themeName - Name of theme to switch to
     */
    switchTheme(themeName) {
        if (this.themes.has(themeName)) {
            const oldTheme = this.currentTheme;
            this.currentTheme = themeName;
            this.notifyObservers('themeChanged', { oldTheme, newTheme: themeName });
            return true;
        }

        console.warn(`Theme "${themeName}" not found`);
        return false;
    }

    /**
     * Subscribe to theme changes
     * @param {Function} callback - Callback function
     */
    subscribe(callback) {
        this.observers.push(callback);

        // Return unsubscribe function
        return () => {
            const index = this.observers.indexOf(callback);
            if (index > -1) {
                this.observers.splice(index, 1);
            }
        };
    }

    /**
     * Notify all observers of changes
     * @param {string} event - Event type
     * @param {Object} data - Event data
     */
    notifyObservers(event, data) {
        this.observers.forEach(callback => {
            try {
                callback(event, data);
            } catch (error) {
                console.error('Observer callback error:', error);
            }
        });
    }
}

// Export default instance
export default new ThemeManager();
