if (typeof jQuery !== 'undefined') {
    (function ($) {
        $.fn.calendar = function (options, more) {
            // If there's already a calendar, maybe we want to access the API.
            var existingCalendar = $(this).data('calendar');

            if (existingCalendar) {
                // API
                if (typeof options === 'string') {
                    switch (options) {

                        // Destroy calendar, remove HTML, remove listeners.
                        case 'destroy':
                            existingCalendar.destroy();
                            break;

                        // Goes to next month
                        case 'next':
                            existingCalendar.changeMonth(1);
                            break;

                        // Goes to previous month
                        case 'prev':
                            existingCalendar.changeMonth(-1);
                            break;

                        // Adds one events to the currently existing events
                        case 'addEvent':
                            if (more) {
                                existingCalendar.addEvent(more);
                            }
                            break;

                        // Adds multiple events to the currently existing events
                        case 'addEvents':
                            if (more) {
                                existingCalendar.addEvents(more);
                            }
                            break;

                        // Sets the calendar events
                        case 'setEvents':
                            if (more) {
                                existingCalendar.setEvents(more);
                            }
                            break;

                        // Adds events
                        // In that case, `more` is an event json
                        case 'events':
                            if (more) {
                                existingCalendar.opts.events = more;
                                existingCalendar.loadEvents();
                                existingCalendar.load();
                            }
                            break;
                    }
                }
                return existingCalendar;
            }

            target   = $(this).get(0);
            calendar = new bCalendar(target, options);
        }
    })(jQuery);
}

/**
 * Class Calendar
 *
 * @param opts
 * @see doc above
 */
var bCalendar = function (target, options) {
    let opts = bCalendar.Utils.extend(true, bCalendar.defaults, options);
    this.target = target;

    // All available string for strtr
    this._strings;

    // Force allowYearView when mode is year
    if (opts.mode === 'year') {
        // Disabling month view in month mode shouldn't be possible.
        opts.allowYearView = true;
    }

    // Force allowMonthView when mode is month
    if (opts.mode === 'month') {
        // Disabling date view in date mode shouldn't be possible.
        opts.allowMonthView = true;
    }

    // Options
    this.opts = opts;

    // Lang
    this.lang = (typeof opts.lang === 'string') ? opts.lang : 'fr';

    // Months labels
    // From the options, we want this to be editable.
    this.aMonths = opts.translations.months;

    // Days labels
    // From the options, we want this to be editable.
    this.aDays = opts.translations.days;

    // Events
    this.events = {};

    // Today || custom date.
    this.setStartDate(opts.startDate); // Init date for reference
    this.showStartDate = opts.showStartDate;

    if ((typeof opts.selectedDate !== 'undefined')) {
        this.setSelectedDate(opts.selectedDate);
    }

    this.loadEvents();

    this.month = this.startDate.getMonth();
    this.year  = this.startDate.getFullYear();

    this.html = '';

    this.load();

    return this;
}

/**
 * Strings used in the calendar.
 * @return {array} All strings already localised when need be.
 */
bCalendar.prototype.strings = function () {
    if (this._strings) {
        return this._strings;
    }

    var strings = this.opts.classes;
    strings     = bCalendar.Utils.extend(strings, {
        prevYearLabel:  this.opts.translations.prevYearLabel[this.lang],
        nextYearLabel:  this.opts.translations.nextYearLabel[this.lang],
        nextMonthLabel: this.opts.translations.nextMonthLabel[this.lang],
        prevMonthLabel: this.opts.translations.prevMonthLabel[this.lang],
    });

    this._strings = strings;
    return this._strings;
};

/**
 * Load listeners and all
 * Make sure no duplication is done.
 *
 */
bCalendar.prototype.load = function () {
    var options = this.opts;
    // // Make sure no duplication of event is done.
    // this.destroy();

    // Keep data
    this.opts = options;

    // Generate HTML
    this.generateHTML();

    // Append HTML
    this.target.innerHTML = this.getHTML();
    dataStorage.put(this.target, 'bCalendar', this);

    this.addListeners();

    return this;
};

/**
 * Append events in the event list
 * @param {object} events Array of events.
 */
bCalendar.prototype.addEvents = function (events) {
    // Requires an array
    if (typeof event !== 'object') {
        return false;
    }

    if (!events.length) {
        return false;
    }

    var total = events.length;
    var i     = 0;
    for (; i < total; i++) {
        this.addEvent(events[i]);
    }

    return this;
};

/**
 * Dynamically add an event to the calendar when needed.
 * @param {object} event View events in documentation.
 */
bCalendar.prototype.addEvent = function (event) {
    // Requires an array
    if (typeof event !== 'object') {
        return false;
    }
    if (typeof this.opts.events === 'undefined') {
        this.opts.events = [];
    }

    if (typeof this.opts.events !== 'object') {
        this.opts.events = [];
    }

    this.opts.events.push(event);

    // Officiel set them.
    this.setEvents(this.opts.events);

    return this;
};


/**
 * Set the calendar events / override existing.
 * @param {[type]} events [description]
 */
bCalendar.prototype.setEvents = function (events) {
    // Requires an array of object.
    if (typeof events !== 'object') {
        return false;
    }

    // Override
    this.opts.events = events;

    // Load those new events
    this.loadEvents();

    // Refresh
    this.refresh();

    return this;
};



/**
 * Load events into an array to quickly match
 * all request done to the calendar by date.
 * Uses this.opts.events
 *
 * @return this (chainable)
 */
bCalendar.prototype.loadEvents = function () {
    this.singleEvents = {};
    this.events       = {};
    this.numEvents    = {};


    var opts = this.opts;

    // opts.events = this.escapeDatas(opts.events);
    if (typeof opts.events !== 'object') {
        return false;
    }

    for (var i = 0; i < opts.events.length; i++) {
        var first_date, last_date;

        if (typeof opts.events[i]['date'] === "object") {
            first_date = new Date(this.unescapeDatas(opts.events[i]['date'].start));
            last_date  = new Date(this.unescapeDatas(opts.events[i]['date'].end));

        } else {
            first_date = new Date(this.unescapeDatas(opts.events[i]['date']));
            last_date  = first_date;
        }
        var eDate = first_date;
        var year  = eDate.getFullYear();
        var month = eDate.getMonth();

        // Make sure every step of the array is set up
        this._buildEventsSkeleton(year, month);

        this.numEvents[year].num++;
        this.numEvents[year].months[month].num++;
        this.singleEvents[year].months[month].push(opts.events[i]);

        var currentMonth = month;
        var currentYear  = year;

        while (eDate <= last_date) {
            year    = eDate.getFullYear();
            month   = eDate.getMonth();
            var day = eDate.getDate();

            // Make sure every step of the array is set up
            this._buildEventsSkeleton(year, month);

            if (typeof this.events[year][month][day] === 'undefined') {
                this.events[year][month][day] = [];
            }
            this.events[year][month][day].push(opts.events[i]);

            // Remember the number of events
            if (typeof this.numEvents[year].months[month].days[day] === 'undefined') {
                this.numEvents[year].months[month].days[day] = 0;
            }
            this.numEvents[year].months[month].days[day]++;

            // Set events by year
            if (currentYear !== year) {
                this.numEvents[year].num++;
            }

            // Set events by month
            if (currentMonth !== month) {
                this.numEvents[year].months[month].num++;
                this.singleEvents[year].months[month].push(opts.events[i]);
            }

            // Set date + 1
            eDate = new Date(year, month, (day + 1));

            // Dont duplicate entries
            currentMonth = month;
            currentYear  = year;
        }
    }

    return this;
}

/**
 * Gets all events from a date
 * Considers the actual date (year / month / date)
 *
 * @param date date Any date format
 * @return {Array} Empty [] | Object [{}] | Multiple objects [{},{}] Events from that day.
 */
bCalendar.prototype.getEventsByDate = function (date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    // Stock new value
    var month = date.getMonth();
    var year  = date.getFullYear();
    var day   = date.getDate();

    if (typeof this.events[year] === 'undefined') {
        return {};
    }

    if (typeof this.events[year][month] === 'undefined') {
        return {};
    }

    if (typeof this.events[year][month][day] === 'undefined') {
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
bCalendar.prototype.getEventsByMonth = function (date) {
    if (!(date instanceof Date)) {
        // Object Date
        date = new Date(date);
    }

    // Stock new value
    var month = date.getMonth();
    var year  = date.getFullYear();

    if (typeof this.singleEvents[year] === 'undefined') {
        return {};
    }

    if (typeof this.singleEvents[year].months[month] === 'undefined') {
        return {};
    }

    return this.singleEvents[year].months[month];
};


/**
 * Unique function to switch between months
 * Accepts any number, but will only consider positive VS negative values
 *
 * @param {int} dir Direction 1 | -1
 * @return {Object} this (chainable)
 */
bCalendar.prototype.changeMonth = function (dir) {
    // Using '-1 and 1' as directions
    var direction = (dir === undefined || dir > 0) ? 1 : -1;

    // Changes YEAR
    if ((this.month === 0 && direction === -1) || (this.month === 11 && direction === 1)) {
        this.year += direction;
        // For simplicity, if month is zero and direction is '-1', then -11*-1 = 11 (new index)
        this.month += -11 * direction;
    } else {
        this.month += direction;
    }

    // Refresh View
    this.refresh(this.opts.callbacks.onChangeMonth);

    return this;
};

/**
 * Unique function to switch between years
 * Accepts any number
 *
 * @param {int} dir Direction
 * @return {Object} this (chainable)
 */
bCalendar.prototype.changeYear = function (dir) {
    this.year = this.year + dir;

    // Refresh View
    this.refresh(this.opts.callbacks.onChangeYear);

    return this;
};

/**
 * Triggers the calendar to change date to a specific date.
 * Multiple date formats
 * Examples:
 * `september 2020`
 * `1421425977331`
 * `september 12 2010`
 * `2020/9/12`
 *
 * @param {Date|string} date Date | Valid date string (examples above)
 * @return this
 */
bCalendar.prototype.goToDate = function (date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    // Stock new value
    this.month = date.getMonth();
    this.year  = date.getFullYear();

    // Refresh view
    this.refresh();

    return this;
};

/**
 * Sets the start date.
 * The start date only purpose is to have a clear mark on the calendar with "calendarCurrentDayClass" option
 * Could be a date object or a string
 * @param {Date|string} date Selected date.
 * @return {this} Chainable.
 */
bCalendar.prototype.setStartDate = function (date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    this.startDate = date;
    return this;
};


/**
 * Sets the selected date.
 * Could be a date object or a string
 * @param {Date|string} date Selected date.
 * @return {this} Chainable.
 */
bCalendar.prototype.setSelectedDate = function (date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    this.selectedDate = date;
    this.opts.callbacks.onDatePick(date, this);
    return this;
};

/**
 * Destroy the calendar and event listeners
 * @return {void}
 */
bCalendar.prototype.destroy = function () {
    this.removeListeners();
    this.target.innerHTML = '';
    dataStorage.remove(this.target, 'bCalendar', this);
};

/**
 * Retrieves number of event per either year, month or day
 * @param  {Date|string}  date Date object or string
 * @param  {string} mode Either year, month or day (defaults to day).
 * @return {int}     Number of events
 */
bCalendar.prototype.getNumEvents = function (date, mode) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    var year = date.getFullYear();
    if (typeof this.numEvents[year] === 'undefined') {
        return 0;
    }

    if (mode === 'year') {
        return this.numEvents[year].num;
    }

    var month = date.getMonth();
    if (typeof this.numEvents[year].months[month] === 'undefined') {
        return 0;
    }

    if (mode === 'month') {
        return this.numEvents[year].months[month].num;
    }

    var day = date.getDate();
    if (typeof this.numEvents[year].months[month].days[day] === 'undefined') {
        return 0;
    }

    return this.numEvents[year].months[month].days[day];
};
