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
 * `allowMonthView`              |   boolean     |   Define if you can see the month view (default: false, unless mode is set to 'month')
 * `allowDateView`               |   boolean     |   Define if you can see the date view (default: false, unless mode is set to 'date')
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
 *   `calendarEventclass`        |   string      |   The calendar event class, set on the <td> wrapping the day with an event
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

(function($) {
    $.fn.calendar = function(options, more) {
        // If there's already a calendar, maybe we want to access the API.
        var calendar = $(this).data('calendar');

        if (calendar) {
            // API
            if (typeof options == 'string') {
                switch (options) {

                    // Destroy calendar, remove HTML, remove listeners.
                    case 'destroy':
                        calendar.destroy();
                        break;

                        // Goes to next month
                    case 'next':
                        calendar.changeMonth(1);
                        break;

                        // Goes to previous month
                    case 'prev':
                        calendar.changeMonth(-1);
                        break;

                        // Returns the appropriate doc
                    case 'addEvent':
                        if (more) {
                            calendar.addEvent(more);
                        }
                        break;

                        // Returns the appropriate doc
                    case 'addEvents':
                        if (more) {
                            calendar.addEvents(more);
                        }
                        break;

                        // Returns the appropriate doc
                    case 'setEvents':
                        if (more) {
                            calendar.setEvents(more);
                        }
                        break;

                        // Adds events
                        // In that case, `more` is an event json
                    case 'events':
                        if (more) {
                            calendar.opts.events = more;
                            calendar.loadEvents();
                            calendar.load();
                        }
                        break;
                }
            }
            return calendar;
        }

        /**
         * @var {object} defaults
         * All the default settings
         */
        var defaults = {
            startDate: new Date(),
            lang: 'fr',
            mode: 'date',
            allowMonthView: false,
            allowDateView: true,
            useControls: true,
            displayEventsNumber: true,
            eventsNumberTemplate: '<span class="c-calendar_num">{num}</span>',

            // Show the dates in the `-empty` boxes.
            displayAdjacentMonthDates: true,

            events: {},

            // Classes ( || html markup )
            classes: {
                mainCalendarClass: 'c-calendar',
                calendarTitleClass: 'c-calendar_title',
                calendarTitleMonthClass: 'c-calendar_title_month',
                calendarTitleYearClass: 'c-calendar_title_year',
                calendarControlsClass: 'c-calendar_controls',
                calendarControlsPrevClass: 'c-calendar_prev',
                calendarControlsNextClass: 'c-calendar_next',
                calendarControlsHtml: '',
                calendarTableClass: 'c-calendar_table',
                calendarTableHeaderClass: 'c-calendar_header',
                calendarRowClass: 'c-calendar_row',

                calendarDayClass: 'c-calendar_day',
                calendarMonthClass: 'c-calendar_month',
                calendarMonthLabelClass: 'c-calendar_month_label',
                calendarLinkClass: 'c-calendar_link',
                calendarTextClass: 'c-calendar_text',
                calendarEventclass: '-event',
                calendarCurrentDayClass: '-today',
                calendarSelectedDayClass: '-selected',
                calendarSelectedMonthClass: '-selected',
                calendarEmptyDayClass: '-empty' // Not in the same month
            },
            callbacks: {
                onChangeMonth: function(calendar) {

                },
                onChangeYear: function(calendar) {

                },
                onDatePick: function(date, calendar) {

                },
                onMonthSelect: function(date, calendar) {

                },
                onMonthEventSelect: function(events, calendar) {

                },
                onDayClick: function(date, calendar) {

                },
                onEventClick: function(events, calendar) {

                },
                onDayMouseover: function(events, calendar) { // All days

                },
                onEventMouseover: function(events, calendar) { // Days with event

                },
                onDayMouseout: function(events, calendar) { // All days

                },
                onEventMouseout: function(events, calendar) { // Days with event

                },
                onPrev: function(calendar) {

                },
                onNext: function(calendar) {

                },
                onPrevYear: function(calendar) {

                },
                onNextYear: function(calendar) {

                },
                onGotoMonthView: function(calendar) {

                },
                onGotoDateView: function(calendar) {

                }
            },

            translations: {
                months: {
                    fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                },
                days: {
                    fr: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                    en: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                },
                nextMonthLabel: {
                    en: 'Next Month',
                    fr: 'Mois suivant'
                },
                prevMonthLabel: {
                    en: 'Previous Month',
                    fr: 'Mois précédent'
                },
                nextYearLabel: {
                    en: 'Next Year',
                    fr: 'Année suivante'
                },
                prevYearLabel: {
                    en: 'Previous Year',
                    fr: 'Année précédente'
                }
            },
            eventSeparator: '{|}'
        };

        // Merge options
        var opts = $.extend(true, defaults, options);

        if (opts.mode == 'month') {
            // Disabling month view in month mode shouldn't be possible.
            opts.allowMonthView = true;
        }

        if (opts.mode == 'date') {
            // Disabling date view in date mode shouldn't be possible.
            opts.allowDateView = true;
        }

        // Instanciation
        var calendar = new bCalendar(opts);

        // Affect current target object
        calendar.target = $(this);

        // Load.
        calendar.load()

        return calendar;
    }
})(jQuery);

/**
 * Class Calendar
 *
 * @param opts
 * @see doc above
 */
var bCalendar = function(opts) {
    // All available string for strtr
    this._strings;

    // Options
    this.opts = opts;

    // Lang
    this.lang = (typeof opts.lang == 'string') ? opts.lang : 'fr';

    // Months labels
    // From the options, we want this to be editable.
    this.aMonths = opts.translations.months;

    // Days labels
    // From the options, we want this to be editable.
    this.aDays = opts.translations.days;

    // Events
    this.events = {};

    // Today || custom date.
    this.setSelectedDate(opts.startDate);
    this.loadEvents();

    this.month = this.selectedDate.getMonth();
    this.year = this.selectedDate.getFullYear();

    this.html = '';

    return this;
}

/**
 * Strings used in the calendar.
 * @return {array} All strings already localised when need be.
 */
bCalendar.prototype.strings = function() {
    if (this._strings) {
        return this._strings;
    }

    var strings = this.opts.classes;
    strings = $.fn.extend(strings, {
        prevYearLabel: this.opts.translations.prevYearLabel[this.lang],
        nextYearLabel: this.opts.translations.nextYearLabel[this.lang],
        nextMonthLabel: this.opts.translations.nextMonthLabel[this.lang],
        prevMonthLabel: this.opts.translations.prevMonthLabel[this.lang],
    });

    this._strings = strings;
    return this._strings;
}

/**
 * Load listeners and all
 * Make sure no duplication is done.
 *
 */
bCalendar.prototype.load = function() {
    var options = this.opts;
    // Make sure no duplication of event is done.
    this.destroy();

    // Keep data
    this.opts = options;

    // Generate HTML
    this.generateHTML();

    // Append HTML
    this.target.html(this.getHTML());
    this.target.data('calendar', this);

    this.addListeners();

    return this;
}

/**
 * Append events in the event list
 * @param {object} events Array of events.
 */
bCalendar.prototype.addEvents = function(events) {
    // Requires an array
    if (typeof event != 'object') {
        return false;
    }

    if (!events.length) {
        return false;
    }

    var total = events.length;
    var i = 0;
    for (; i < total; i++) {
        this.addEvent(events[i]);
    }

    return this;
}

/**
 * Dynamically add an event to the calendar when needed.
 * @param {object} event View events in documentation.
 */
bCalendar.prototype.addEvent = function(event) {
    // Requires an array
    if (typeof event != 'object') {
        return false;
    }
    if (typeof this.opts.events === 'undefined') {
        this.opts.events = [];
    }

    if (typeof this.opts.events != 'object') {
        this.opts.events = [];
    }

    this.opts.events.push(event);

    // Officiel set them.
    this.setEvents(this.opts.events);

    return this;
}


/**
 * Set the calendar events / override existing.
 * @param {[type]} events [description]
 */
bCalendar.prototype.setEvents = function(events) {
    // Requires an array of object.
    if (typeof events != 'object') {
        return false;
    }

    // Override
    this.opts.events = events;

    // Load those new events
    this.loadEvents();

    // Refresh
    this.refresh();

    return this;
}


/**
 * Load events into an array to quickly match
 * all request done to the calendar by date.
 * Uses this.opts.events
 *
 * @return this (chainable)
 */
bCalendar.prototype.loadEvents = function() {
    this.singleEvents = {};
    this.events = {};
    this.numEvents = {};


    var opts = this.opts;

    // opts.events = this.escapeDatas(opts.events);
    if (typeof opts.events != 'object') {
        return false;
    }

    for (var i = 0; i < opts.events.length; i++) {
        if (typeof opts.events[i]['date'] == "object") {
            var first_date = new Date(this.unescapeDatas(opts.events[i]['date'].start));
            var last_date = new Date(this.unescapeDatas(opts.events[i]['date'].end));

        } else {
            var first_date = new Date(this.unescapeDatas(opts.events[i]['date']));
            var last_date = first_date;
        }
        var eDate = first_date;
        var year = eDate.getFullYear();
        var month = eDate.getMonth();

        // Make sure every step of the array is set up
        this.checkEventsArray(year, month);

        this.numEvents[year].num++;
        this.numEvents[year].months[month].num++;
        this.singleEvents[year].months[month].push(opts.events[i]);

        var currentMonth = month;
        var currentYear = year;

        while (eDate <= last_date) {
            year = eDate.getFullYear();
            month = eDate.getMonth();
            var day = eDate.getDate();

            // Make sure every step of the array is set up
            this.checkEventsArray(year, month);

            if (typeof this.events[year][month][day] == 'undefined') {
                this.events[year][month][day] = [];
            }
            this.events[year][month][day].push(opts.events[i]);

            // Remember the number of events
            if (typeof this.numEvents[year].months[month].days[day] == 'undefined') {
                this.numEvents[year].months[month].days[day] = 0;
            }
            this.numEvents[year].months[month].days[day]++;

            // Set events by year
            if (currentYear != year) {
                this.numEvents[year].num++;
            }

            // Set events by month
            if (currentMonth != month) {
                this.numEvents[year].months[month].num++;
                this.singleEvents[year].months[month].push(opts.events[i]);
            }

            // Set date + 1
            eDate = new Date(year, month, (day + 1));

            // Dont duplicate entries
            currentMonth = month;
            currentYear = year;
        }
    }

    return this;
}

bCalendar.prototype.checkEventsArray = function(year, month) {
    // BUILDING events array
    if (typeof this.events[year] == 'undefined') {
        this.events[year] = {};
    }

    if (typeof this.events[year][month] == 'undefined') {
        this.events[year][month] = {};
    }

    // Number of events
    if (typeof this.numEvents[year] == 'undefined') {
        this.numEvents[year] = {
            num: 0,
            months: {}
        };

    }
    if (typeof this.numEvents[year].months[month] == 'undefined') {
        this.numEvents[year].months[month] = {
            num: 0,
            days: {}
        };
    }

    // Uniq events by months
    if (typeof this.singleEvents[year] == 'undefined') {
        this.singleEvents[year] = {
            months: {}
        };
    }
    if (typeof this.singleEvents[year].months[month] == 'undefined') {
        this.singleEvents[year].months[month] = [];
    }

    return this;
}

/**
 * Every data passed to this function will be cleaned and encoded for web
 * Recursive
 * Prevents output errors
 * @param {Object} data
 * @return {Object} data
 */
bCalendar.prototype.escapeDatas = function(data) {
    var that = this;

    if (typeof data == 'undefined') {
        return '';
    }

    if (typeof data == 'array') {
        var i = 0;
        var count = data.length;
        for (; i < count; i++) {
            data[i] = this.escapeDatas(data[i]);
        }
    }

    if (typeof data == 'object') {
        for (var i in data) {
            data[i] = this.escapeDatas(data[i]);
        }
    }

    if (typeof data == 'string') {
        // Do not escape twice.
        data = this.unescapeDatas(data);
        return escape(data);
    }

    // Default;
    return data;

}

/**
 * Every data passed to this function will be cleaned and encoded for web
 * Recursive
 * Prevents output errors
 * @param {Object} data
 * @return {Object} data
 */
bCalendar.prototype.unescapeDatas = function(data) {
    var that = this;

    if (typeof data == 'undefined') {
        return '';
    }

    if (typeof data == 'object') {
        for (var i in data) {
            data[i] = this.unescapeDatas(data[i]);
        }
    }

    if (typeof data == 'string') {
        var out = unescape(data);
        return out;
    }

    // Default;
    return data;
}


/**
 * Generates the HTML considering all the events and options
 * Automatic generations from a date
 * Adds the html in 'this.html' / Use this.getHTML() to retrieve the informations
 *
 * Uses the mode options to display month OR date
 *
 * @return this (chainable)
 */
bCalendar.prototype.generateHTML = function() {

    var mode = this.opts.mode;

    this.opts.events = this.escapeDatas(this.opts.events);

    switch (mode) {
        case 'month':
            return this.generateMonthView();
            break;
        case 'date':
            return this.generateDateView();
            break;
    }

    // Default
    return '';

}

/**
 * Month view
 * Generates the HTML considering all the events and options
 * Automatic generations from a date
 * Adds the html in 'this.html' / Use this.getHTML() to retrieve the informations
 *
 * @return {thisArg} (chainable)
 */
bCalendar.prototype.generateMonthView = function() {
    // Strings to be used with strtr for the html template
    var strings = this.strings();
    strings.year = this.year; // Adds to strings

    // Shorthand
    var opts = this.opts;

    // First day
    var firstDay = new Date(this.year, this.month, 1);
    var startingDay = firstDay.getDay();

    // Months by lang.
    var months = opts.translations.months[opts.lang];

    // find number of days in month
    var monthLength = firstDay.getLastDayOfMonth();

    // do the header
    var monthName = this.aMonths[this.lang][this.month];
    var html = '';


    // Start calendar output
    html += '<div class="{mainCalendarClass}">';

    // Calendar title (month + year)
    var num = this.getNumEvents(firstDay, 'year');
    if (opts.displayEventsNumber && num != 0) {
        var numTemplate = opts.eventsNumberTemplate.strtr({
            num: num
        });
        html += '<p class="{calendarTitleClass}">{year}' + numTemplate + '</p>';
    } else {
        html += '<p class="{calendarTitleClass}">{year}</p>';
    }

    // Calendar Controls
    if (opts.useControls) {
        html += '<div class="{calendarControlsClass}">' +
            '<button class="{calendarControlsPrevClass}" type="button">{prevYearLabel}</button>' +
            '<button class="{calendarControlsNextClass}" type="button">{nextYearLabel}</button>' +
            '</div>';
    }

    html += '<table class="{calendarTableClass}">';

    // this loop is for is weeks (rows)
    for (var i = 0; i < 3; i++) {

        html += '<tr class="{calendarRowClass}">';
        // this loop is for weekdays (cells)
        for (var j = 0; j <= 3; j++) {

            // Month index, starting at 0;
            var monthIndex = parseInt((i * 4) + j);
            var monthLabel = months[monthIndex];
            var monthDate = new Date(this.year + '/' + (monthIndex + 1) + '/1');

            // Month + 1 = Valid Date (getMonth() returns 0 to 11, valid date = 1 to 12)
            var events = this.getEventsByMonth(this.year + '/' + (monthIndex + 1) + '/1');
            var hasEvents = !jQuery.isEmptyObject(events);

            var extraClass = hasEvents ? ' {calendarEventclass}' : '';
            var extraAttr = '';

            if (this.selectedDate.getMonth() == monthIndex && this.selectedDate.getFullYear() == this.year) {
                extraClass += ' {calendarSelectedMonthClass}';
            }

            var num = this.getNumEvents(monthDate, 'month');
            if (opts.displayEventsNumber) {
                extraAttr += ' data-num="' + num + '"';
            }

            html += '<td class="{calendarMonthClass}' + extraClass + '"' + extraAttr +
                ' data-date="' + this.year + '/' + (monthIndex + 1) + '/1' + '">' +
                '   <a class="{calendarLinkClass}" href="#"><span class="{calendarTextClass}">';
            html += monthLabel;
            html += '</span>';

            if (opts.displayEventsNumber && num != 0) {
                var numTemplate = opts.eventsNumberTemplate.strtr({
                    num: num
                });
                html += numTemplate;
            }
            html += '</a></td>';
        }

        html += '</tr>';
    }
    html += '</tr></table></div>';

    this.html = html.strtr(strings);

    return this;
}

/**
 * Date view
 * Generates the HTML considering all the events and options
 * Automatic generations from a date
 * Adds the html in 'this.html' / Use this.getHTML() to retrieve the informations
 *
 * @return this (chainable)
 */
bCalendar.prototype.generateDateView = function() {
    var strings = this.strings();

    // Shorthand
    var opts = this.opts;

    // First day
    var firstDay = new Date(this.year, this.month, 1);
    var startingDay = firstDay.getDay();
    var monthLength = firstDay.getLastDayOfMonth();

    // Last month...
    var previousMonth = this.month - 1;
    if (previousMonth < 0) {
        previousMonth = 11;
    }
    var previousMonthDate = new Date(this.year, previousMonth, 1);
    var previousMonthLength = previousMonthDate.getLastDayOfMonth();
    var previousMonthDifferencial = previousMonthLength - (startingDay - 1);

    // Header
    var monthName = this.aMonths[this.lang][this.month];
    strings.monthName = monthName;
    strings.year = this.year;

    var html = '<div class="{mainCalendarClass}">' +
        '<p class="{calendarTitleClass}">' +
        '<a href="#" class="{calendarMonthLabelClass}">' +
        '<span class="{calendarTitleMonthClass}">{monthName} </span>' +
        '<span class="{calendarTitleYearClass}">{year}</span>' +
        '</a>' +
        '</p>';

    // Calendar Controls
    if (opts.useControls) {
        html += '<div class="{calendarControlsClass}">' +
            '<button class="{calendarControlsPrevClass}" type="button">{prevMonthLabel}</button>' +
            '<button class="{calendarControlsNextClass}" type="button">{nextMonthLabel}</button>' +
            '</div>';
    }

    html += '<table class="{calendarTableClass}"><thead class="{calendarTableHeaderClass}">' +
        '<tr class="{calendarRowClass}">';
    for (var i = 0; i <= 6; i++) {
        html += '<th class="{calendarDayClass}"><span class="{calendarTextClass}">';
        html += this.aDays[this.lang][i];
        html += '</span></th>';
    }
    html += '</tr></thead>' +
        '</tr><tbody><tr class="{calendarRowClass}">';

    // fill in the days
    var day = 1;
    var nextMonthDays = 1;

    // this loop is for is weeks (rows)
    for (var i = 0; i < 9; i++) {
        // this loop is for weekdays (cells)
        for (var j = 0; j <= 6; j++) {
            // Month + 1 = Valid Date (getMonth() returns 0 to 11, valid date = 1 to 12)
            var currentDayDate = new Date(this.year, this.month, day);

            // Check if we display the day number
            var hasDay = day <= monthLength && (i > 0 || j >= startingDay);

            // Adds as data on the object
            var dataDate = (hasDay ? this.year + '/' + (this.month + 1) + '/' + day : 0);

            var events = {};
            if (i === 0 && j < startingDay) {
                // Since we need to add 1 to the current month here we don't have to remove 1.
                var previousMonth = (this.month == 0) ? 12 : this.month;
                dataDate = this.year + '/' + previousMonth + '/' + previousMonthDifferencial;
                events = this.getEventsByDate(dataDate);
            } else if (!hasDay && i > 0) {
                var nextMonth = (this.month >= 11) ? 1 : (this.month + 2); // +1, current value, +1 next month
                dataDate = this.year + '/' + nextMonth + '/' + nextMonthDays;
                events = this.getEventsByDate(dataDate);
            } else {
                events = this.getEventsByDate(currentDayDate);
            }

            var hasEvents = !jQuery.isEmptyObject(events);
            var extraClass = hasEvents ? ' {calendarEventclass}' : '';

            // Sets "today" on the startDate (defined in options, defaults to today)
            if (opts.startDate.getFullYear() == this.year &&
                opts.startDate.getMonth() == this.month &&
                opts.startDate.getDate() == day &&
                hasDay) {
                extraClass += ' {calendarCurrentDayClass}';
            }

            // Sets "selected" class on the currently selected date.
            if (this.selectedDate.getFullYear() == this.year &&
                this.selectedDate.getMonth() == this.month &&
                this.selectedDate.getDate() == day &&
                hasDay) {
                extraClass += ' {calendarSelectedDayClass}';
            }

            html += '<td class="{calendarDayClass}' + (hasDay ? '' : ' {calendarEmptyDayClass}') + extraClass +
                '" data-date="' + dataDate + '">';

            html += '<a class="{calendarLinkClass}" href="#">';
            html += '<span class="{calendarTextClass}">';

            if (hasDay) {
                html += day;
                day++;
            } else if (i === 0) {
                if (opts.displayAdjacentMonthDates) {
                    html += previousMonthDifferencial;
                }
                previousMonthDifferencial++;
            } else {
                html += nextMonthDays;
                nextMonthDays++;
            }

            html += '</span>';

            var num = this.getNumEvents(currentDayDate);
            if (opts.displayEventsNumber && num != 0 && hasDay) {
                var numTemplate = opts.eventsNumberTemplate.strtr({
                    num: num
                });
                html += numTemplate;
            }

            html += '</a>';
            html += '</td>';
        }
        // stop making rows if we've run out of days
        if (day > monthLength) {
            break;
        }
        html += '</tr><tr class="{calendarRowClass}">';
    }
    html += '</tr></tbody></table></div>';

    this.html = html.strtr(strings);

    return this;
}

/**
 * Gets all events from a date
 * Considers the actual date (year / month / date)
 *
 * @param date date Any date format
 * @return {Array} Empty [] | Object [{}] | Multiple objects [{},{}] Events from that day.
 */
bCalendar.prototype.getEventsByDate = function(date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    // Stock new value
    var month = date.getMonth();
    var year = date.getFullYear();
    var day = date.getDate();

    if (typeof this.events[year] == 'undefined') {
        return {};
    }

    if (typeof this.events[year][month] == 'undefined') {
        return {};
    }

    if (typeof this.events[year][month][day] == 'undefined') {
        return {};
    }

    return this.events[year][month][day];
}

/**
 * Gets all events from a month
 * Accepts multiple type of date
 * Examples:
 * `september 2020`
 * `1421425977331`
 * `september 12 2010`
 * `2020/9/12`
 *
 * @param {mixed} date Any date format
 * @return {Object} Empty {} | Event { 6 : {event}} | Multiple events { 6 : {event}, 10 : {event}}
 * Returns object with DATE as keys
 */
bCalendar.prototype.getEventsByMonth = function(date) {
    if (!(date instanceof Date)) {
        // Object Date
        date = new Date(date);
    }

    // Stock new value
    var month = date.getMonth();
    var year = date.getFullYear();

    if (typeof this.singleEvents[year] == 'undefined') {
        return {};
    }

    if (typeof this.singleEvents[year].months[month] == 'undefined') {
        return {};
    }

    return this.singleEvents[year].months[month];
}


/**
 * Unique function to switch between months
 * Accepts any number, but will only consider positive VS negative values
 *
 * @param int 1 | -1
 * @return {Object} this (chainable)
 */
bCalendar.prototype.changeMonth = function(dir) {
    // Using '-1 and 1' as directions
    var direction = (dir == undefined || dir > 0) ? 1 : -1;

    // Changes YEAR
    if ((this.month == 0 && direction == -1) || (this.month == 11 && direction == 1)) {
        this.year += direction;
        // For simplicity, if month is zero and direction is '-1', then -11*-1 = 11 (new index)
        this.month += -11 * direction;
    } else {
        this.month += direction;
    }

    // Refresh View
    this.refresh(this.opts.callbacks.onChangeMonth);

    return this;
}

/**
 * Unique function to switch between years
 * Accepts any number
 *
 * @param int
 * @return {Object} this (chainable)
 */
bCalendar.prototype.changeYear = function(dir) {
    // Using '-1 and 1' as directions
    var direction = (dir == undefined || dir > 0) ? 1 : -1;

    this.year = this.year + dir;

    // Refresh View
    this.refresh(this.opts.callbacks.onChangeYear);

    return this;
}

/**
 * Triggers the calendar to change date to a specific date.
 * Multiple date formats
 * Examples:
 * `september 2020`
 * `1421425977331`
 * `september 12 2010`
 * `2020/9/12`
 *
 * @param {mixed} Date | Valid date string (examples above)
 * @return this (chainable)
 */
bCalendar.prototype.goToDate = function(date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    // Stock new value
    this.month = date.getMonth();
    this.year = date.getFullYear();

    // Refresh view
    this.refresh();

    return this;
}


/**
 * Gets the event data over an calendar dom object
 * Mainly internal use
 *
 * @param {jQuery Dom object} elem | Elem that can trigger calendar events
 * @return {Object} ret | { date : date, events : [{event},{event}] }
 */
bCalendar.prototype._eventDatas = function(elem) {
    var date = elem.data('date');
    if (!date) {
        return {
            date: null,
            events: []
        }
    }
    date = new Date(date);

    var ret = {
        date: date,
        events: this.getEventsByDate(date)
    }

    // Return
    return ret;
}

/**
 * Sets the selected date.
 * Could be a date object or a string
 * @param {mixed} date Selected date.
 * @return {thisArg} Chainable.
 */
bCalendar.prototype.setSelectedDate = function(date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    this.selectedDate = date;
    this.opts.callbacks.onDatePick(date, this);
    return this;
}

/**
 * Adds all listeners on the calendar with default and custom callbacks
 * `onDayClick`
 * `onEventClick`
 * `onDayMouseover`
 * `onEventMouseover`
 * `onDayMouseout`
 * `onEventMouseout`
 * `onPrev`
 * `onNext`
 *
 *
 * @return this (chainable)
 */
bCalendar.prototype.addListeners = function() {
    var that = this;
    var opts = this.opts;

    // Click on a day with or without event
    this.target.on('click.bCalendar', '.' + opts.classes.calendarDayClass, function(e) {
        e.preventDefault();

        var data = that.unescapeDatas(that._eventDatas($(this)));
        that.setSelectedDate(data.date);
        that.refresh();

        opts.callbacks.onDayClick(data, that);

    })

    // Click on a day with events
    .on('click.bCalendar', '.' + opts.classes.calendarEventclass + '.' + opts.classes.calendarDayClass, function(e) {
        e.preventDefault();
        var data = that.unescapeDatas(that._eventDatas($(this)));

        opts.callbacks.onEventClick(data, that);

    })

    // Mouseover any day
    .on('mouseenter.bCalendar', '.' + opts.classes.calendarDayClass, function(e) {
        e.preventDefault();

        var data = that.unescapeDatas(that._eventDatas($(this)));
        opts.callbacks.onDayMouseover(data, that);

    })

    // Mouseover a day with event(s)
    .on('mouseenter.bCalendar', '.' + opts.classes.calendarEventclass + '.' + opts.classes.calendarDayClass, function(e) {
        e.preventDefault();

        var data = that.unescapeDatas(that._eventDatas($(this)));
        opts.callbacks.onEventMouseover(data, that);

    })

    // Mouseout any day
    .on('mouseout.bCalendar', '.' + opts.classes.calendarEventclass + '.' + opts.classes.calendarDayClass, function(e) {
        e.preventDefault();

        var data = that.unescapeDatas(that._eventDatas($(this)));
        opts.callbacks.onEventMouseout(data, that);

    })

    // Mouseout a day with event(s)
    .on('mouseout.bCalendar', '.' + opts.classes.calendarDayClass, function(e) {
        e.preventDefault();

        var data = that.unescapeDatas(that._eventDatas($(this)));
        opts.callbacks.onDayMouseout(data, that);

    })

    // Controls click
    .on('click.bCalendar', '.' + opts.classes.calendarControlsPrevClass, function(e) {
        e.preventDefault();

        if (opts.mode == 'date') {
            opts.callbacks.onPrev(that);
            that.changeMonth(-1);
        }
        if (opts.mode == 'month') {
            that.changeYear(-1);
            opts.callbacks.onPrevYear(that);
        }

    })

    // Controls click
    .on('click.bCalendar', '.' + opts.classes.calendarControlsNextClass, function(e) {
        e.preventDefault();

        if (opts.mode == 'date') {
            opts.callbacks.onNext(that);
            that.changeMonth(1);
        }
        if (opts.mode == 'month') {
            that.changeYear(1);
            opts.callbacks.onNextYear(that);
        }
    })

    // Controls click
    .on('click.bCalendar', '.' + opts.classes.calendarMonthLabelClass, function(e) {
        e.preventDefault();

        if (that.opts.allowMonthView) {
            that.opts.mode = 'month';
            opts.callbacks.onGotoMonthView(that);
        }
        that.refresh();

    })

    // Controls click
    .on('click.bCalendar', '.' + opts.classes.calendarMonthClass, function(e) {
        e.preventDefault();
        var date = new Date($(this).data('date'));

        if (that.opts.allowDateView) {
            that.opts.mode = 'date';
            that.month = date.getMonth();
            that.year = date.getFullYear();
            opts.callbacks.onGotoDateView(date, that);
        } else {
            opts.callbacks.onMonthSelect(date, that);
            that.setSelectedDate(date);
        }
        that.refresh();

    })

    .on('click.bCalendar', '.' + opts.classes.calendarMonthClass + '.' + opts.classes.calendarEventclass, function(e) {
        e.preventDefault();
        var date = new Date($(this).data('date'));
        var events = that.unescapeDatas(that.getEventsByMonth(date));
        opts.callbacks.onMonthEventSelect(events, that);

    });

    return this;
}

/**
 * Refreshes the calendar with all current options
 *
 * @return this (chainable)
 */
bCalendar.prototype.refresh = function(cb) {
    this.generateHTML();
    this.target.html(this.getHTML());

    if (typeof cb === 'function') {
        cb(this);
    }

    return this;
}

/**
 * Gets html
 * Mainly internal use
 * @return {HTML} html
 */
bCalendar.prototype.getHTML = function() {
    return this.html;
}

/**
 * Destroy the calendar and event listeners
 * @return {[type]} [description]
 */
bCalendar.prototype.destroy = function() {
    this.target.off('.bCalendar');
    this.target.html('');
    this.target.data('calendar', false);
};

/**
 * Retrieves number of event per either year, month or day
 * @param  {mixed}  date Date object or string
 * @param  {string} mode Either year, month or day (defaults to day).
 * @return {integer}     Number of events
 */
bCalendar.prototype.getNumEvents = function(date, mode) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    var year = date.getFullYear();
    if (typeof this.numEvents[year] == 'undefined') {
        return 0;
    }

    if (mode == 'year') {
        return this.numEvents[year].num;
    }

    var month = date.getMonth();
    if (typeof this.numEvents[year].months[month] == 'undefined') {
        return 0;
    }

    if (mode == 'month') {
        return this.numEvents[year].months[month].num;
    }

    var day = date.getDate();
    if (typeof this.numEvents[year].months[month].days[day] == 'undefined') {
        return 0;
    }

    return this.numEvents[year].months[month].days[day];
}


/**
 * Replaces all instance of {property} by the args[property].
 * @param  {object} args Replacements.
 * @return {string}      Modified string.
 */
if (typeof String.prototype.strtr === 'undefined') {
    String.prototype.strtr = function(args) {
        "use strict";
        var str = this.toString(),
            key, re;
        for (key in args) {
            if (args.hasOwnProperty(key)) {
                re = new RegExp('{' + key + '}', "g");
                str = str.replace(re, args[key]);
            }
        }
        return str;
    }
}

/**
 * Returns the last day in a given Date object.
 * @param  {mixed}      date DateTime or string of date.
 * @return {integer}         Number of days in the month / last day of the month.
 */
if (typeof Date.prototype.getLastDayOfMonth === 'undefined') {
    Date.prototype.getLastDayOfMonth = function(date) {
        if (!date) {
            return new Date(this.getYear(), this.getMonth() + 1, 0).getDate();
        }

        if (!(date instanceof Date)) {
            date = new Date(date);
        }

        return new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
    }
}
