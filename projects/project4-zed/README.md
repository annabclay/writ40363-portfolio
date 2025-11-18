# 📅 Campus Event Countdown + Planner

**Project Zed: AI-Assisted Web Application**  
WRIT 40363 - Digital Composition and Design Archive  
Texas Christian University | Fall 2025

---

## 📋 Project Overview

This is my **Project Zed** submission - an ambitious web application built with AI collaboration to demonstrate upskilled techniques from Projects 1-3. The Campus Event Countdown + Planner is a modern, feature-rich event management application designed specifically for college students to track exams, deadlines, trips, and campus events with real-time countdown timers and browser notifications.

**Project Goals:**
- Upskill HTML/CSS foundations with advanced animations and responsive design
- Extend JavaScript fundamentals through modular architecture and complex DOM manipulation
- Implement browser APIs (Notification API, localStorage) for enhanced functionality
- Learn new techniques through AI partnership while maintaining code understanding
- Build a genuinely useful tool for college students

## 🎯 Features

### Core Functionality
- **Event Management**: Add, edit, and delete events with detailed information
- **Real-time Countdown Timers**: Live countdown displays showing days, hours, minutes, and seconds
- **Browser Notifications**: Automatic reminders at 24 hours, 1 hour, and 15 minutes before events
- **Calendar View**: Interactive monthly calendar with event indicators
- **List View**: Detailed list of all upcoming events with countdown timers

### Event Categories
- 📝 **Exams** - Track important test dates
- ⏰ **Deadlines** - Never miss a submission deadline
- ✈️ **Trips** - Plan your travel dates
- 🎉 **Social** - Keep track of campus events and gatherings
- 📚 **Class** - Regular class schedules
- 📌 **Other** - Miscellaneous events

### Advanced Features
- **Priority Levels**: Mark events as High, Medium, or Low priority
- **Smart Filtering**: Filter events by category
- **Multiple Sort Options**: Sort by date, priority, or name
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Local Storage**: All data saved locally in your browser
- **Urgent Event Highlighting**: Visual indicators for events happening soon

## 🚀 Getting Started

### Quick Start
1. Open `index.html` in a modern web browser
2. Allow browser notifications when prompted (optional but recommended)
3. Add your first event using the form
4. Switch between List View and Calendar View to see your events

### Browser Requirements
- Modern browser with JavaScript enabled
- Notification API support (for alerts)
- localStorage support (for data persistence)

**Recommended Browsers:**
- Chrome/Edge 88+
- Firefox 88+
- Safari 14+

## 🤖 AI Collaboration

This project was built with significant AI assistance as part of the Project Zed learning objectives. I used **GitHub Copilot with Claude 3.7 Sonnet** as my primary AI development partner.

### What AI Helped With:
- Architecting the modular JavaScript structure
- Implementing the Notification API and permission handling
- Creating the calendar rendering logic
- Complex date/time calculations for countdowns
- Responsive CSS Grid layouts
- Code organization and best practices

### What I Contributed:
- Project concept and feature selection
- User experience design decisions
- Code integration and debugging
- Testing across different scenarios
- Customization and refinement of AI-generated code
- Understanding and explaining every line of code

**Full AI collaboration details, learning moments, challenges, and sample conversations are documented in `AI_COLLABORATION_LOG.md`.**

## 📖 How to Use

### Adding an Event
1. Fill in the event name (e.g., "WRIT 403 Final Exam")
2. Select date and time
3. Choose a category and priority level
4. Add optional notes
5. Enable/disable notifications
6. Click "Add Event"

### Managing Events
- **Edit**: Click the "Edit" button on any event card to modify it
- **Delete**: Click the "Delete" button to remove an event
- **Filter**: Use the category dropdown to filter by event type
- **Sort**: Choose how to organize your events (date, priority, name)

### Viewing Events
- **List View**: See all events with detailed countdowns
- **Calendar View**: Navigate months and see events on specific dates
- **Click on calendar dates** to see all events scheduled for that day

### Notifications
The app will automatically send browser notifications:
- **24 hours before** your event
- **1 hour before** your event  
- **15 minutes before** your event

*Make sure to allow notifications when prompted!*

## 🛠️ Technical Details

### Upskilled Techniques Demonstrated

This project demonstrates **7+ upskilled techniques** across all course projects:

#### From Project 1 (HTML/CSS) - Upskilled:
1. **Advanced CSS animations and transitions** - Smooth hover effects, pulsing urgent event indicators, fade-in/slide-in animations
2. **CSS Grid and Flexbox layouts** - Complex calendar grid system, responsive event cards, flexible form layouts
3. **Custom CSS properties (variables)** - Complete theming system with light/dark mode support
4. **Responsive design with 3+ breakpoints** - Mobile-first approach with tablet and desktop optimizations
5. **Advanced typography and design systems** - Consistent spacing, color scheme, and visual hierarchy

#### From Project 2 (JavaScript) - Upskilled:
1. **Complex DOM manipulation patterns** - Dynamic event card generation, calendar rendering, real-time updates
2. **Event delegation and advanced event handling** - Efficient event listeners, form validation, modal interactions
3. **Data structures beyond simple arrays/objects** - Nested event objects with metadata, date-based filtering
4. **Form validation and error handling** - Input validation, user feedback, error states
5. **Modular JavaScript** - Separated concerns across 5 JavaScript files (app.js, storage.js, countdown.js, calendar.js, notifications.js)

#### From Project 3 (APIs & Advanced JS) - Upskilled:
1. **Browser API integration** - Notification API for event reminders, localStorage for data persistence
2. **Advanced async patterns** - setInterval for live countdowns, setTimeout for scheduled notifications
3. **Complex state management** - Event tracking, notification status, view state management
4. **Data processing and transformation** - Date calculations, time remaining logic, event sorting/filtering

#### New Techniques (Learned via AI):
1. **Notification API implementation** - Browser notifications with permission handling and scheduling
2. **Advanced date/time manipulation** - Complex countdown calculations, relative time formatting
3. **Modular JavaScript architecture** - Manager pattern for code organization
4. **Accessibility considerations** - ARIA labels, keyboard navigation support, semantic HTML

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks or libraries required
- **localStorage API**: Client-side data persistence
- **Notification API**: Browser notifications
- **Date/Time APIs**: Advanced date manipulation

### File Structure
```
project4-campus-planner/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles including responsive design
├── js/
│   ├── app.js             # Main application logic
│   ├── storage.js         # localStorage management
│   ├── countdown.js       # Timer calculations
│   ├── calendar.js        # Calendar rendering
│   └── notifications.js   # Notification system
├── images/                # Images and assets
└── README.md             # This file
```

### Key JavaScript Concepts Demonstrated
1. **Modular Code Organization**: Separate files for different concerns
2. **Object-Oriented Patterns**: Manager objects for different features
3. **Event-Driven Programming**: DOM event listeners and handlers
4. **Asynchronous Operations**: setInterval, setTimeout, async/await
5. **Browser APIs**: Notification API, localStorage API
6. **Date Manipulation**: Complex date calculations and formatting
7. **DOM Manipulation**: Dynamic content generation
8. **Responsive Design**: Mobile-first CSS approach

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #4a90e2;
    --success-color: #5cb85c;
    --warning-color: #f0ad4e;
    --danger-color: #d9534f;
    /* ... more colors */
}
```

### Adding New Categories
1. Add option to the select in `index.html`:
```html
<option value="meeting">📊 Meeting</option>
```

2. Add color in `css/style.css`:
```css
:root {
    --meeting-color: #34495e;
}

.event-card.meeting {
    border-left-color: var(--meeting-color);
}
```

3. Update icon mapping in JavaScript files.

## 🔧 Browser Storage

All events are stored in your browser's localStorage. To export or backup your data:

```javascript
// In browser console
const events = localStorage.getItem('campusEvents');
console.log(events); // Copy this to save
```

To import data:
```javascript
localStorage.setItem('campusEvents', 'YOUR_BACKUP_DATA');
location.reload();
```

## 🐛 Troubleshooting

### Notifications Not Working
1. Check browser notification settings
2. Ensure you clicked "Allow" when prompted
3. Visit browser settings and enable notifications for this site

### Events Not Saving
1. Check if cookies/localStorage are enabled
2. Ensure you're not in private/incognito mode
3. Check browser storage quota

### Countdown Not Updating
1. Refresh the page
2. Check browser console for errors
3. Ensure JavaScript is enabled

## 📱 Mobile Support

The app is fully responsive and works great on mobile devices:
- Touch-friendly buttons and inputs
- Optimized layouts for small screens
- Native date/time pickers on mobile

## 🎓 Learning Outcomes

This project demonstrates:
- Advanced JavaScript date and time handling
- Browser API integration (Notifications, localStorage)
- Responsive CSS design patterns
- Event-driven programming
- Data persistence strategies
- Modular code architecture
- User experience design for practical applications

## 🚧 Future Enhancements

Potential features to add:
- [ ] Export events to .ics calendar format
- [ ] Import events from other calendars
- [ ] Recurring events (weekly classes)
- [ ] Search functionality
- [ ] Event categories customization
- [ ] Share events with friends
- [ ] Weather integration for trip events
- [ ] Study time recommendations
- [ ] Event statistics and analytics

## 📄 License

This project is open source and available for educational purposes.

## 🎓 Course Context

**Project Zed: AI-Assisted Web Application**  
WRIT 40363 - Digital Composition and Design Archive  
Texas Christian University, Fall 2025  
Due: December 10, 2025

This project represents the culmination of skills learned throughout the semester:
- **Project 1**: HTML/CSS foundations and responsive design
- **Project 2**: JavaScript fundamentals and DOM manipulation  
- **Project 3**: APIs and advanced JavaScript patterns
- **Project Zed**: Upskilling through AI collaboration

### Project Requirements Met:
✅ Built completely new application (not enhancement of previous projects)  
✅ Demonstrates 7+ upskilled techniques across all project areas  
✅ Integrated browser APIs (Notification, localStorage)  
✅ Modular JavaScript architecture with separation of concerns  
✅ Responsive design with mobile-first approach  
✅ Professional polish with smooth animations and UX  
✅ Comprehensive documentation and code comments  
✅ AI collaboration fully documented in separate log  
✅ Developer reflection completed (see `REFLECTION.md`)  

### Deliverables:
- ✅ Working web application (deployed on GitHub Pages)
- ✅ Clean code repository with meaningful commits
- ✅ `README.md` (this file) with setup instructions and credits
- ✅ `AI_COLLABORATION_LOG.md` documenting AI partnership
- ✅ `REFLECTION.md` with developer insights (500-750 words)
- ✅ Integration into final portfolio

## 👨‍💻 Author

**Anna Clay**  
TCU Class of 2026  
Built with ❤️ (and AI assistance) for college students who need to stay organized!

### Credits & Tools Used:
- **AI Development Partner**: GitHub Copilot with Claude 3.7 Sonnet
- **Design Inspiration**: Modern web app UX patterns
- **Icons**: Unicode emoji for accessibility
- **Fonts**: System font stack for performance
- **No external libraries or frameworks** - Pure vanilla JavaScript!

---

**Need Help?** Check the browser console for any errors or reach out via GitHub issues.

**Pro Tip:** Enable notifications and set events a few days in advance to get the most out of this planner!
