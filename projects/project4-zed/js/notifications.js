// notifications.js - Browser Notification Management

const NotificationManager = {
    permission: 'default',
    checkInterval: null,
    
    // Initialize notification system
    init() {
        this.checkPermission();
        this.updateStatus();
        this.startNotificationChecker();
    },
    
    // Check notification permission status
    checkPermission() {
        if (!('Notification' in window)) {
            console.log('This browser does not support notifications');
            this.permission = 'unsupported';
            return false;
        }
        
        this.permission = Notification.permission;
        return this.permission === 'granted';
    },
    
    // Request notification permission
    async requestPermission() {
        if (!('Notification' in window)) {
            alert('Your browser does not support notifications.');
            return false;
        }
        
        if (this.permission === 'granted') {
            return true;
        }
        
        try {
            const permission = await Notification.requestPermission();
            this.permission = permission;
            this.updateStatus();
            
            if (permission === 'granted') {
                this.sendTestNotification();
                return true;
            } else {
                alert('Please enable notifications to receive event reminders.');
                return false;
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    },
    
    // Send a test notification
    sendTestNotification() {
        if (this.permission === 'granted') {
            new Notification('Campus Event Planner', {
                body: 'Notifications are now enabled! You\'ll receive reminders for your events.',
                icon: '📅',
                tag: 'test-notification'
            });
        }
    },
    
    // Send notification for an event
    sendEventNotification(event, timeframe) {
        if (this.permission !== 'granted') return;
        
        let title = '';
        let body = '';
        
        switch (timeframe) {
            case '24h':
                title = `Tomorrow: ${event.name}`;
                body = `Your event "${event.name}" is happening in 24 hours!`;
                break;
            case '1h':
                title = `Soon: ${event.name}`;
                body = `Your event "${event.name}" starts in 1 hour!`;
                break;
            case '15m':
                title = `Starting Soon: ${event.name}`;
                body = `Your event "${event.name}" starts in 15 minutes!`;
                break;
            default:
                title = event.name;
                body = `Reminder for: ${event.name}`;
        }
        
        const notification = new Notification(title, {
            body: body,
            icon: '📅',
            tag: `event-${event.id}-${timeframe}`,
            requireInteraction: timeframe === '15m', // Keep visible for 15min warning
            timestamp: new Date(event.dateTime).getTime()
        });
        
        // Click handler to focus window
        notification.onclick = function() {
            window.focus();
            notification.close();
        };
        
        // Mark as notified in storage
        StorageManager.markNotificationSent(event.id, timeframe);
    },
    
    // Check for upcoming events and send notifications
    checkUpcomingEvents() {
        const events = StorageManager.getEvents();
        const now = new Date();
        
        events.forEach(event => {
            // Skip if notifications disabled for this event
            if (!event.notifications) return;
            
            const eventDate = new Date(event.dateTime);
            const timeDiff = eventDate - now;
            
            // Skip past events
            if (timeDiff < 0) return;
            
            // Check for 24 hour notification
            if (!event.notified24h && timeDiff <= 86400000 && timeDiff > 82800000) {
                // Between 23-24 hours before
                this.sendEventNotification(event, '24h');
            }
            
            // Check for 1 hour notification
            if (!event.notified1h && timeDiff <= 3600000 && timeDiff > 3300000) {
                // Between 55-60 minutes before
                this.sendEventNotification(event, '1h');
            }
            
            // Check for 15 minute notification
            if (!event.notified15m && timeDiff <= 900000 && timeDiff > 600000) {
                // Between 10-15 minutes before
                this.sendEventNotification(event, '15m');
            }
        });
    },
    
    // Start periodic check for notifications
    startNotificationChecker() {
        // Check every minute for upcoming events
        this.checkInterval = setInterval(() => {
            if (this.permission === 'granted') {
                this.checkUpcomingEvents();
            }
        }, 60000); // Check every 60 seconds
        
        // Also check immediately
        if (this.permission === 'granted') {
            this.checkUpcomingEvents();
        }
    },
    
    // Stop notification checker
    stopNotificationChecker() {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    },
    
    // Update notification status display
    updateStatus() {
        const statusElement = document.getElementById('notification-status');
        if (!statusElement) return;
        
        let statusText = '';
        let statusColor = '';
        
        switch (this.permission) {
            case 'granted':
                statusText = 'Notifications: Enabled ✓';
                statusColor = 'var(--success-color)';
                break;
            case 'denied':
                statusText = 'Notifications: Blocked ✗';
                statusColor = 'var(--danger-color)';
                break;
            case 'unsupported':
                statusText = 'Notifications: Not Supported';
                statusColor = 'var(--text-muted)';
                break;
            default:
                statusText = 'Notifications: Click to Enable';
                statusColor = 'var(--warning-color)';
                statusElement.style.cursor = 'pointer';
                statusElement.onclick = () => this.requestPermission();
        }
        
        statusElement.textContent = statusText;
        statusElement.style.color = statusColor;
    },
    
    // Schedule notification for specific date/time
    scheduleNotification(event) {
        if (this.permission !== 'granted') return;
        
        const now = new Date();
        const eventDate = new Date(event.dateTime);
        
        // Calculate when to send notifications
        const notify24h = new Date(eventDate.getTime() - 86400000); // 24 hours before
        const notify1h = new Date(eventDate.getTime() - 3600000);   // 1 hour before
        const notify15m = new Date(eventDate.getTime() - 900000);   // 15 minutes before
        
        // Schedule 24 hour notification
        if (notify24h > now && !event.notified24h) {
            setTimeout(() => {
                this.sendEventNotification(event, '24h');
            }, notify24h - now);
        }
        
        // Schedule 1 hour notification
        if (notify1h > now && !event.notified1h) {
            setTimeout(() => {
                this.sendEventNotification(event, '1h');
            }, notify1h - now);
        }
        
        // Schedule 15 minute notification
        if (notify15m > now && !event.notified15m) {
            setTimeout(() => {
                this.sendEventNotification(event, '15m');
            }, notify15m - now);
        }
    },
    
    // Clear all notifications
    clearNotifications() {
        if ('Notification' in window && Notification.permission === 'granted') {
            // Note: Individual notifications are automatically cleared by the browser
            // This is a placeholder for any cleanup needed
        }
    },
    
    // Get notification settings
    getSettings() {
        return {
            supported: 'Notification' in window,
            permission: this.permission,
            enabled: this.permission === 'granted'
        };
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationManager;
}
