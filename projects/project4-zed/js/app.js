// app.js - Main Application Logic

// Global variables
let countdownInterval = null;
let currentFilter = 'all';
let currentSort = 'date-asc';
let currentView = 'list';

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    // Initialize all managers
    NotificationManager.init();
    CalendarManager.init();
    
    // Setup event listeners
    setupEventForm();
    setupViewToggle();
    setupFilters();
    setupThemeToggle();
    
    // Load and display events
    displayEvents();
    
    // Start live countdowns
    startCountdowns();
    
    // Request notification permission on first visit
    const hasRequestedPermission = localStorage.getItem('notificationPermissionRequested');
    if (!hasRequestedPermission) {
        setTimeout(() => {
            NotificationManager.requestPermission();
            localStorage.setItem('notificationPermissionRequested', 'true');
        }, 2000);
    }
    
    // Set minimum date for event form to today
    const dateInput = document.getElementById('event-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }
    
    // Set default time to current time + 1 hour
    const timeInput = document.getElementById('event-time');
    if (timeInput) {
        const now = new Date();
        now.setHours(now.getHours() + 1);
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeInput.value = `${hours}:${minutes}`;
    }
}

// Setup event form submission
function setupEventForm() {
    const form = document.getElementById('event-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('event-name').value.trim();
        const date = document.getElementById('event-date').value;
        const time = document.getElementById('event-time').value;
        const category = document.getElementById('event-category').value;
        const priority = document.getElementById('event-priority').value;
        const notes = document.getElementById('event-notes').value.trim();
        const notifications = document.getElementById('event-notifications').checked;
        
        // Validate
        if (!name || !date || !time || !category) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Combine date and time
        const dateTime = `${date}T${time}`;
        
        // Check if date is in the past
        if (new Date(dateTime) < new Date()) {
            const confirmPast = confirm('This event is in the past. Do you still want to add it?');
            if (!confirmPast) return;
        }
        
        // Create event object
        const eventData = {
            name,
            dateTime,
            category,
            priority,
            notes,
            notifications
        };
        
        // Save to storage
        const newEvent = StorageManager.addEvent(eventData);
        
        // Schedule notifications
        if (notifications) {
            NotificationManager.scheduleNotification(newEvent);
        }
        
        // Reset form
        form.reset();
        
        // Refresh displays
        displayEvents();
        CalendarManager.refresh();
        
        // Show success message
        showSuccessMessage('Event added successfully!');
        
        // Scroll to events section
        document.querySelector('.events-section.active').scrollIntoView({ behavior: 'smooth' });
    });
}

// Setup view toggle (List vs Calendar)
function setupViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            
            // Update active button
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update view
            currentView = view;
            
            if (view === 'list') {
                document.getElementById('list-view').classList.add('active');
                document.getElementById('calendar-view').classList.remove('active');
            } else {
                document.getElementById('list-view').classList.remove('active');
                document.getElementById('calendar-view').classList.add('active');
                CalendarManager.refresh();
            }
        });
    });
}

// Setup filters and sorting
function setupFilters() {
    const filterSelect = document.getElementById('filter-category');
    const sortSelect = document.getElementById('sort-by');
    
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            currentFilter = e.target.value;
            displayEvents();
        });
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            displayEvents();
        });
    }
}

// Setup theme toggle
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Display all events
function displayEvents() {
    let events = StorageManager.getEvents();
    
    // Apply filter
    if (currentFilter !== 'all') {
        events = events.filter(event => event.category === currentFilter);
    }
    
    // Apply sort
    events = StorageManager.sortEvents(events, currentSort);
    
    const container = document.getElementById('events-container');
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Show empty state if no events
    if (events.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>🎯 No events found. Add your first event above!</p>
            </div>
        `;
        return;
    }
    
    // Create event cards
    events.forEach(event => {
        const card = createEventCard(event);
        container.appendChild(card);
    });
}

// Create event card element
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = `event-card ${event.category}`;
    card.dataset.eventId = event.id;
    
    const timeRemaining = CountdownManager.calculateTimeRemaining(event.dateTime);
    const emoji = CountdownManager.getCountdownEmoji(event.dateTime);
    const formattedDateTime = CountdownManager.formatDateTime(event.dateTime);
    
    card.innerHTML = `
        <div class="event-header">
            <div class="event-title">${event.name}</div>
            <div class="event-badges">
                <span class="badge ${event.category}">${getCategoryIcon(event.category)} ${event.category}</span>
                <span class="badge priority-${event.priority}">${event.priority}</span>
            </div>
        </div>
        
        <div class="event-details">
            <p>📅 ${formattedDateTime}</p>
            <p>${emoji} ${CountdownManager.getRelativeTimeString(event.dateTime)}</p>
            ${event.notes ? `<p>📝 ${event.notes}</p>` : ''}
            ${event.notifications ? '<p>🔔 Notifications enabled</p>' : '<p>🔕 Notifications disabled</p>'}
        </div>
        
        <div data-countdown data-datetime="${event.dateTime}">
            ${CountdownManager.createCountdownHTML(timeRemaining)}
        </div>
        
        <div class="event-actions">
            <button class="btn-edit" onclick="editEvent('${event.id}')">Edit</button>
            <button class="btn-danger" onclick="deleteEvent('${event.id}')">Delete</button>
        </div>
    `;
    
    return card;
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        exam: '📝',
        deadline: '⏰',
        trip: '✈️',
        social: '🎉',
        class: '📚',
        other: '📌'
    };
    return icons[category] || '📌';
}

// Start countdown timers
function startCountdowns() {
    // Clear existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // Update countdowns every second
    countdownInterval = CountdownManager.startLiveCountdowns();
}

// Edit event
function editEvent(id) {
    const event = StorageManager.getEventById(id);
    if (!event) return;
    
    // Populate form with event data
    document.getElementById('event-name').value = event.name;
    
    const [date, time] = event.dateTime.split('T');
    document.getElementById('event-date').value = date;
    document.getElementById('event-time').value = time;
    document.getElementById('event-category').value = event.category;
    document.getElementById('event-priority').value = event.priority;
    document.getElementById('event-notes').value = event.notes || '';
    document.getElementById('event-notifications').checked = event.notifications;
    
    // Delete old event
    StorageManager.deleteEvent(id);
    
    // Scroll to form
    document.querySelector('.add-event-section').scrollIntoView({ behavior: 'smooth' });
    
    // Focus on name field
    document.getElementById('event-name').focus();
    
    // Refresh display
    displayEvents();
    CalendarManager.refresh();
}

// Delete event
function deleteEvent(id) {
    const event = StorageManager.getEventById(id);
    if (!event) return;
    
    const confirmDelete = confirm(`Are you sure you want to delete "${event.name}"?`);
    if (!confirmDelete) return;
    
    StorageManager.deleteEvent(id);
    displayEvents();
    CalendarManager.refresh();
    
    showSuccessMessage('Event deleted successfully!');
}

// Show success message
function showSuccessMessage(message) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: var(--shadow-hover);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    NotificationManager.stopNotificationChecker();
});

// Make functions globally accessible
window.editEvent = editEvent;
window.deleteEvent = deleteEvent;
