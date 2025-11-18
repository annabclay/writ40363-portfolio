// countdown.js - Countdown Timer Logic

const CountdownManager = {
    // Calculate time remaining until an event
    calculateTimeRemaining(eventDateTime) {
        const now = new Date();
        const target = new Date(eventDateTime);
        const difference = target - now;
        
        // If event has passed
        if (difference <= 0) {
            return {
                isPast: true,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                total: 0
            };
        }
        
        // Calculate time units
        return {
            isPast: false,
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            total: difference
        };
    },
    
    // Format countdown display
    formatCountdown(timeRemaining) {
        if (timeRemaining.isPast) {
            return 'Event has passed';
        }
        
        const { days, hours, minutes, seconds } = timeRemaining;
        
        if (days > 0) {
            return `${days} day${days !== 1 ? 's' : ''}, ${hours} hour${hours !== 1 ? 's' : ''}`;
        } else if (hours > 0) {
            return `${hours} hour${hours !== 1 ? 's' : ''}, ${minutes} minute${minutes !== 1 ? 's' : ''}`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''}, ${seconds} second${seconds !== 1 ? 's' : ''}`;
        } else {
            return `${seconds} second${seconds !== 1 ? 's' : ''}`;
        }
    },
    
    // Create countdown HTML
    createCountdownHTML(timeRemaining) {
        if (timeRemaining.isPast) {
            return `
                <div class="countdown">
                    <p style="font-size: 1.2rem;">⏰ Event has passed</p>
                </div>
            `;
        }
        
        const { days, hours, minutes, seconds, total } = timeRemaining;
        
        // Mark as urgent if less than 24 hours
        const urgentClass = total < 86400000 ? 'urgent' : '';
        
        return `
            <div class="countdown ${urgentClass}">
                <p style="font-size: 1rem; margin-bottom: 10px;">⏱️ Time Remaining:</p>
                <div class="countdown-timer">
                    ${days > 0 ? `
                        <div class="time-unit">
                            <div class="time-value">${days}</div>
                            <div class="time-label">Day${days !== 1 ? 's' : ''}</div>
                        </div>
                    ` : ''}
                    <div class="time-unit">
                        <div class="time-value">${hours}</div>
                        <div class="time-label">Hour${hours !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="time-unit">
                        <div class="time-value">${minutes}</div>
                        <div class="time-label">Minute${minutes !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="time-unit">
                        <div class="time-value">${seconds}</div>
                        <div class="time-label">Second${seconds !== 1 ? 's' : ''}</div>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Get human-readable time until event
    getTimeUntilText(eventDateTime) {
        const timeRemaining = this.calculateTimeRemaining(eventDateTime);
        
        if (timeRemaining.isPast) {
            return 'Past event';
        }
        
        const { days, hours, minutes } = timeRemaining;
        
        if (days > 7) {
            return `In ${days} days`;
        } else if (days > 0) {
            return `In ${days} day${days !== 1 ? 's' : ''} and ${hours} hour${hours !== 1 ? 's' : ''}`;
        } else if (hours > 0) {
            return `In ${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}`;
        } else if (minutes > 0) {
            return `In ${minutes} minute${minutes !== 1 ? 's' : ''}`;
        } else {
            return 'Starting soon!';
        }
    },
    
    // Check if event is urgent (less than 24 hours)
    isUrgent(eventDateTime) {
        const timeRemaining = this.calculateTimeRemaining(eventDateTime);
        return !timeRemaining.isPast && timeRemaining.total < 86400000;
    },
    
    // Check if event is very urgent (less than 1 hour)
    isVeryUrgent(eventDateTime) {
        const timeRemaining = this.calculateTimeRemaining(eventDateTime);
        return !timeRemaining.isPast && timeRemaining.total < 3600000;
    },
    
    // Get countdown emoji based on urgency
    getCountdownEmoji(eventDateTime) {
        const timeRemaining = this.calculateTimeRemaining(eventDateTime);
        
        if (timeRemaining.isPast) {
            return '✅';
        } else if (timeRemaining.total < 3600000) { // < 1 hour
            return '🚨';
        } else if (timeRemaining.total < 86400000) { // < 24 hours
            return '⚠️';
        } else if (timeRemaining.total < 604800000) { // < 7 days
            return '⏰';
        } else {
            return '📅';
        }
    },
    
    // Format date and time for display
    formatDateTime(dateTime) {
        const date = new Date(dateTime);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    },
    
    // Get relative time string (e.g., "in 2 days", "tomorrow", "today")
    getRelativeTimeString(dateTime) {
        const now = new Date();
        const target = new Date(dateTime);
        const diffInMs = target - now;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        
        if (diffInMs < 0) {
            return 'Past';
        } else if (diffInDays === 0) {
            return 'Today';
        } else if (diffInDays === 1) {
            return 'Tomorrow';
        } else if (diffInDays < 7) {
            return `In ${diffInDays} days`;
        } else if (diffInDays < 30) {
            const weeks = Math.floor(diffInDays / 7);
            return `In ${weeks} week${weeks !== 1 ? 's' : ''}`;
        } else {
            const months = Math.floor(diffInDays / 30);
            return `In ${months} month${months !== 1 ? 's' : ''}`;
        }
    },
    
    // Update a specific countdown element
    updateCountdownElement(elementId, eventDateTime) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const timeRemaining = this.calculateTimeRemaining(eventDateTime);
        element.innerHTML = this.createCountdownHTML(timeRemaining);
    },
    
    // Start live countdown updates for all events
    startLiveCountdowns() {
        // Update all countdowns every second
        return setInterval(() => {
            const countdownElements = document.querySelectorAll('[data-countdown]');
            countdownElements.forEach(element => {
                const eventDateTime = element.dataset.datetime;
                if (eventDateTime) {
                    const timeRemaining = this.calculateTimeRemaining(eventDateTime);
                    element.innerHTML = this.createCountdownHTML(timeRemaining);
                }
            });
        }, 1000);
    },
    
    // Stop countdown updates
    stopLiveCountdowns(intervalId) {
        if (intervalId) {
            clearInterval(intervalId);
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CountdownManager;
}
