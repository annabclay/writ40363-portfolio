// calendar.js - Calendar View Management

const CalendarManager = {
    currentDate: new Date(),
    selectedDate: null,
    
    // Initialize calendar
    init() {
        this.renderCalendar();
        this.setupEventListeners();
    },
    
    // Setup calendar navigation listeners
    setupEventListeners() {
        const prevBtn = document.getElementById('prev-month');
        const nextBtn = document.getElementById('next-month');
        const todayBtn = document.getElementById('today-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.renderCalendar();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.renderCalendar();
            });
        }
        
        if (todayBtn) {
            todayBtn.addEventListener('click', () => {
                this.currentDate = new Date();
                this.renderCalendar();
            });
        }
    },
    
    // Render the calendar grid
    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update month header
        const monthHeader = document.getElementById('current-month');
        if (monthHeader) {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                              'July', 'August', 'September', 'October', 'November', 'December'];
            monthHeader.textContent = `${monthNames[month]} ${year}`;
        }
        
        // Get calendar grid
        const calendarGrid = document.querySelector('.calendar-grid');
        if (!calendarGrid) return;
        
        // Clear existing days (keep headers)
        const existingDays = calendarGrid.querySelectorAll('.calendar-day');
        existingDays.forEach(day => day.remove());
        
        // Get first day of month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Today's date for comparison
        const today = new Date();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
        const todayDate = today.getDate();
        
        // Get events for this month
        const events = StorageManager.getEvents();
        const monthEvents = this.getEventsForMonth(events, year, month);
        
        // Create calendar days
        let dayElements = [];
        
        // Previous month's days
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const dayElement = this.createDayElement(day, month - 1, year, true, []);
            dayElements.push(dayElement);
        }
        
        // Current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = isCurrentMonth && day === todayDate;
            const dayEvents = this.getEventsForDay(monthEvents, day);
            const dayElement = this.createDayElement(day, month, year, false, dayEvents, isToday);
            dayElements.push(dayElement);
        }
        
        // Next month's days to fill the grid
        const remainingCells = 42 - dayElements.length; // 6 rows * 7 days
        for (let day = 1; day <= remainingCells; day++) {
            const dayElement = this.createDayElement(day, month + 1, year, true, []);
            dayElements.push(dayElement);
        }
        
        // Append all day elements
        dayElements.forEach(element => calendarGrid.appendChild(element));
    },
    
    // Create a single day element
    createDayElement(day, month, year, isOtherMonth, events, isToday = false) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        if (isOtherMonth) {
            dayElement.classList.add('other-month');
        }
        
        if (isToday) {
            dayElement.classList.add('today');
        }
        
        // Day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Event dots
        if (events && events.length > 0) {
            const dotContainer = document.createElement('div');
            dotContainer.className = 'event-dot-container';
            
            // Show up to 4 dots
            events.slice(0, 4).forEach(event => {
                const dot = document.createElement('div');
                dot.className = `event-dot ${event.category}`;
                dot.title = event.name;
                dotContainer.appendChild(dot);
            });
            
            // If more than 4 events, show "+X more"
            if (events.length > 4) {
                const moreText = document.createElement('span');
                moreText.style.fontSize = '0.7rem';
                moreText.style.color = 'var(--text-muted)';
                moreText.textContent = `+${events.length - 4}`;
                dotContainer.appendChild(moreText);
            }
            
            dayElement.appendChild(dotContainer);
        }
        
        // Click handler to show events for this day
        dayElement.addEventListener('click', () => {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            this.showEventsForDate(dateStr, events);
        });
        
        return dayElement;
    },
    
    // Get events for a specific month
    getEventsForMonth(allEvents, year, month) {
        return allEvents.filter(event => {
            const eventDate = new Date(event.dateTime);
            return eventDate.getFullYear() === year && eventDate.getMonth() === month;
        });
    },
    
    // Get events for a specific day
    getEventsForDay(monthEvents, day) {
        return monthEvents.filter(event => {
            const eventDate = new Date(event.dateTime);
            return eventDate.getDate() === day;
        });
    },
    
    // Show events for a selected date
    showEventsForDate(dateStr, events) {
        const eventsList = document.getElementById('calendar-events-list');
        if (!eventsList) return;
        
        const date = new Date(dateStr);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        if (!events || events.length === 0) {
            eventsList.innerHTML = `
                <h3>Events on ${formattedDate}</h3>
                <p style="color: var(--text-muted); padding: 20px;">No events scheduled for this day.</p>
            `;
            return;
        }
        
        // Sort events by time
        const sortedEvents = events.sort((a, b) => 
            new Date(a.dateTime) - new Date(b.dateTime)
        );
        
        let html = `<h3>Events on ${formattedDate}</h3>`;
        
        sortedEvents.forEach(event => {
            const eventTime = new Date(event.dateTime).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
            
            const timeRemaining = CountdownManager.calculateTimeRemaining(event.dateTime);
            const emoji = CountdownManager.getCountdownEmoji(event.dateTime);
            
            html += `
                <div class="event-card ${event.category}" style="margin-bottom: 15px;">
                    <div class="event-header">
                        <div>
                            <div class="event-title" style="font-size: 1.2rem;">${event.name}</div>
                            <p style="color: var(--text-muted); margin-top: 5px;">${emoji} ${eventTime}</p>
                        </div>
                        <div class="event-badges">
                            <span class="badge ${event.category}">${this.getCategoryIcon(event.category)} ${event.category}</span>
                            <span class="badge priority-${event.priority}">${event.priority}</span>
                        </div>
                    </div>
                    ${event.notes ? `<p style="margin-top: 10px; color: var(--text-muted);">${event.notes}</p>` : ''}
                    <p style="margin-top: 10px; font-weight: 600; color: var(--primary-color);">
                        ${CountdownManager.getTimeUntilText(event.dateTime)}
                    </p>
                    <div class="event-actions" style="margin-top: 15px;">
                        <button class="btn-edit" onclick="editEvent('${event.id}')">Edit</button>
                        <button class="btn-danger" onclick="deleteEvent('${event.id}')">Delete</button>
                    </div>
                </div>
            `;
        });
        
        eventsList.innerHTML = html;
    },
    
    // Get category icon
    getCategoryIcon(category) {
        const icons = {
            exam: '📝',
            deadline: '⏰',
            trip: '✈️',
            social: '🎉',
            class: '📚',
            other: '📌'
        };
        return icons[category] || '📌';
    },
    
    // Navigate to a specific date
    navigateToDate(date) {
        this.currentDate = new Date(date);
        this.renderCalendar();
    },
    
    // Refresh calendar (call after adding/deleting events)
    refresh() {
        this.renderCalendar();
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CalendarManager;
}
