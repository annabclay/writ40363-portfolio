# 📅 Campus Event Countdown + Planner

A modern, feature-rich event management application designed specifically for college students to track exams, deadlines, trips, and campus events with real-time countdown timers and browser notifications.

![Project Preview](images/preview.png)

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

## 👨‍💻 Author

Built with ❤️ for college students who need to stay organized!

---

**Need Help?** Check the browser console for any errors or open an issue in the repository.

**Pro Tip:** Enable notifications and set events a few days in advance to get the most out of this planner!
