/*
 * #Calendar
 *
 * ##Description
 * Home made calendar that covers events and datepicking. Every event on a day in the calendar
 * returns a date object of the current target.  Note that even the header triggers these events,
 * with a `null` object as a date.
 *
 * For date picking, you can add a `onDayClick` event and then manage the date object. ( @see `onDayClick` option below )
 * Events are passed as a JSON object and each requires a title and a date. The date parameter is `mixed`, which means it
 * can be a string, a timestamp or an object.  It'll be an object if the event has a beginning and an end.
 *
 * ###Simple date
 * ```
 * [ {
 *   date : '2017/4/10',
 *   content : '',
 *   title : ''
 * } ]
 * ```
 *
 * ###Complex date
 * ```
 * [ {
 *   date : {
 *       start : '2017/4/10',
 *       end : '2017/4/11'
 *   },
 *   content : '',
 *   title : ''
 * } ]
 * ```
 *
 * ##API
 * `destroy`                     | Destroys the calendar by removing all HTML and LISTENERS
 * `next`                        | Goes to next month
 * `prev`                        | Goes to previous month
 * `addEvent`                    | Dynamically add an event to the calendar
 * `addEvents`                   | Dynamically add multiple events to the calendar
 * `setEvents`                   | Dynamically change the calendar event list
 *
 * ##Options
 * `startDate`                   |   Date Object |   Current display date ( Default: selectedDate )
 * `lang`                        |   string      |   Current display language
 * `useControls                  |   boolean     |   Auto output the controls for next and prev month if set to true (default: true)
 * `events`                      |   object      |   JSON of all the events - Events can have pretty much any data, but requires at least a title and a date
 * `mode`                        |   string      |   Specifys the desired display type: Either Month or Date (default: date)
 * `allowYearView`               |   boolean     |   Define if you can see the month view (default: false, unless mode is set to 'month')
 * `allowMonthView`              |   boolean     |   Define if you can see the date view (default: false, unless mode is set to 'date')
 * `displayEventsNumber`         |   boolean     |   Define if you can to display the number of events on the calendar (default: true)
 * `displayAdjacentMonthDates`   |   boolean     |   Define if you want to display the adjacent month dates or empty boxes (default: true)
 * `eventsNumberTemplate`        |   string      |   Templates used to display the number of events on a day / year / month
 *
 * `translations`                |   object      |   Contains all translations
 *   `months`                    |   object      |   Labels for months, by lang, in an array starting from JANUARY to DECEMBER
 *   `days`                      |   object      |   Labels for days, by lang, in an array starting from SUNDAY to SATURDAY
 *   `nextMonthLabel`            |   object      |   Labels for skip month's title, by lang, in an array (view default)
 *   `prevMonthLabel`            |   object      |   Labels for skip month's title, by lang, in an array (view default)
 *
 * `classes`                     |   object      |   Contains all classes used by the plugin (generateHTML)
 *   `mainCalendarClass`         |   string      |   The main calendar class, set on the <div> object that wraps it all
 *   `calendarTitleClass`        |   string      |   The calendar title class, set on the <h1> object
 *   `calendarControlsClass`     |   string      |   The calendar controls wrapper class, set on the <div> object that wraps controls
 *   `calendarControlsPrevClass` |   string      |   The calendar previous month button class, set on the <a> object
 *   `calendarControlsNextClass` |   string      |   The calendar next month button class, set on the <a> object
 *   `calendarTableClass`        |   string      |   The calendar table class, set on the <table> object
 *   `calendarTableHeaderClass`  |   string      |   The calendar table header class, set on the <tr> object that contains the day's labels
 *   `calendarRowClass`          |   string      |   The calendar row class, set on all the other <tr> object as opposed to 'calendarTableHeaderClass'
 *   `calendarDayClass`          |   string      |   The calendar day class, set on all <td> inside the calendar (ALSO in the header)
 *   `calendarMonthClass`        |   string      |   The calendar month class, set on all <td> inside the calendar
 *   `calendarLinkClass`         |   string      |   The calendar link class, set on the <a> object inside a day
 *   `calendarTextClass`         |   string      |   The calendar text class, set on the <span> object inside the <a> object of a day (calendarLinkClass)
 *   `calendarEventClass`        |   string      |   The calendar event class, set on the <td> wrapping the day with an event
 *   `calendarEmptyDayClass`     |   string      |   The calendar empty day class, set on the <td> wrapping a day with no date
 *   `calendarCurrentDayClass`   |   string      |   The calendar current day class, set on the <td> wrapping today's date
 *   `calendarSelectedDayClass`  |   string      |   The calendar selected day class, set on the <td> wrapping the selected date
 *   `calendarSelectedMonthClass`|   string      |   The calendar selected month class, set on the <td> wrapping the selected date's month
 *
 * `callbacks`                   |   object      |   Contains all possible callbacks
 *   `onDayMouseOver`            |   function    |   Triggered when moving mouse over a day
 *   `onEventMouseOver`          |   function    |   Triggered when moving mouse over a day with an event
 *   `onDayMouseOut`             |   function    |   Triggered when moving mouse out of a day
 *   `onEventMouseOut`           |   function    |   Triggered when moving mouse out of a day with an event
 *   `onDayClick`                |   function    |   Triggered when clicking on a day
 *   `onEventClick`              |   function    |   Triggered when clicking on a day with an event
 *   `onPrev`                    |   function    |   Triggered when clicking on the previous button while in day mode / Added to the regular event @see changeMonth
 *   `onNext`                    |   function    |   Triggered when clicking on the next button while in day mode / Added to the regular event @see changeMonth
 *   `onNextYear`                |   function    |   Triggered when clicking on the next button while in month mode
 *   `onPrevYear`                |   function    |   Triggered when clicking on the prev button while in month mode
 *   `onChangeMonth`             |   function    |   Triggered after a new month has been loaded
 *   `onGotoMonthView`           |   function    |   Triggered after switching to the month view
 *   `onGotoDateView`            |   function    |   Triggered after switching to the date view
 *
 */
