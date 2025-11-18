// storage.js - Local Storage Management

const StorageManager = {
    STORAGE_KEY: 'campusEvents',
    
    // Get all events from localStorage
    getEvents() {
        try {
            const events = localStorage.getItem(this.STORAGE_KEY);
            return events ? JSON.parse(events) : [];
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return [];
        }
    },
    
    // Save all events to localStorage
    saveEvents(events) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(events));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },
    
    // Add a new event
    addEvent(eventData) {
        const events = this.getEvents();
        const newEvent = {
            id: this.generateId(),
            ...eventData,
            createdAt: new Date().toISOString(),
            notified24h: false,
            notified1h: false,
            notified15m: false
        };
        events.push(newEvent);
        this.saveEvents(events);
        return newEvent;
    },
    
    // Update an existing event
    updateEvent(id, updatedData) {
        const events = this.getEvents();
        const index = events.findIndex(event => event.id === id);
        if (index !== -1) {
            events[index] = { ...events[index], ...updatedData };
            this.saveEvents(events);
            return events[index];
        }
        return null;
    },
    
    // Delete an event
    deleteEvent(id) {
        const events = this.getEvents();
        const filteredEvents = events.filter(event => event.id !== id);
        this.saveEvents(filteredEvents);
        return filteredEvents.length < events.length;
    },
    
    // Get a single event by ID
    getEventById(id) {
        const events = this.getEvents();
        return events.find(event => event.id === id);
    },
    
    // Mark notification as sent
    markNotificationSent(id, type) {
        const events = this.getEvents();
        const event = events.find(e => e.id === id);
        if (event) {
            if (type === '24h') event.notified24h = true;
            if (type === '1h') event.notified1h = true;
            if (type === '15m') event.notified15m = true;
            this.saveEvents(events);
        }
    },
    
    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Clear all events (for testing)
    clearAll() {
        localStorage.removeItem(this.STORAGE_KEY);
    },
    
    // Get events by category
    getEventsByCategory(category) {
        const events = this.getEvents();
        if (category === 'all') return events;
        return events.filter(event => event.category === category);
    },
    
    // Get events by date range
    getEventsByDateRange(startDate, endDate) {
        const events = this.getEvents();
        return events.filter(event => {
            const eventDate = new Date(event.dateTime);
            return eventDate >= startDate && eventDate <= endDate;
        });
    },
    
    // Sort events
    sortEvents(events, sortBy) {
        const sorted = [...events];
        
        switch (sortBy) {
            case 'date-asc':
                return sorted.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
            
            case 'date-desc':
                return sorted.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
            
            case 'priority':
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return sorted.sort((a, b) => {
                    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
                    if (priorityDiff !== 0) return priorityDiff;
                    return new Date(a.dateTime) - new Date(b.dateTime);
                });
            
            case 'name':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            
            default:
                return sorted;
        }
    },
    
    // Get upcoming events (within next 7 days)
    getUpcomingEvents(days = 7) {
        const events = this.getEvents();
        const now = new Date();
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
        
        return events.filter(event => {
            const eventDate = new Date(event.dateTime);
            return eventDate >= now && eventDate <= futureDate;
        }).sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    },
    
    // Check if event is past
    isPastEvent(dateTime) {
        return new Date(dateTime) < new Date();
    },
    
    // Clean up past events (optional - call periodically)
    cleanupPastEvents(daysOld = 30) {
        const events = this.getEvents();
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysOld);
        
        const filteredEvents = events.filter(event => {
            return new Date(event.dateTime) > cutoffDate;
        });
        
        this.saveEvents(filteredEvents);
        return events.length - filteredEvents.length; // Return number of deleted events
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageManager;
}
