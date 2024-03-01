/**
 * Generates the HTML considering all the events and options
 * Automatic generations from a date
 * Adds the html in 'this.html' / Use this.getHTML() to retrieve the informations
 *
 * Uses the mode options to display month OR date
 *
 * @return this (chainable)
 */
bCalendar.prototype.generateHTML = function () {

    var mode = this.opts.mode;

    this.opts.events = this.escapeDatas(this.opts.events);

    switch (mode) {
        case 'year':
            return this.generateMonthView();
        case 'month':
            return this.generateDateView();
    }

    // Default
    return '';
};

/**
 * Gets html
 * Mainly internal use
 * @return {string} html
 */
bCalendar.prototype.getHTML = function () {
    return this.html;
};

/**
 * Month view
 * Generates the HTML considering all the events and options
 * Automatic generations from a date
 * Adds the html in 'this.html' / Use this.getHTML() to retrieve the informations
 *
 * @return {this} (chainable)
 */
bCalendar.prototype.generateMonthView = function () {
    // Strings to be used with strtr for the html template
    var strings  = this.strings();
    strings.year = this.year; // Adds to strings

    // Shorthand
    var opts = this.opts;

    // First day
    var firstDay = new Date(this.year, this.month, 1);

    // Months by lang.
    var months = opts.translations.months[opts.lang];

    // do the header
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
            var monthDate  = new Date(this.year + '/' + (monthIndex + 1) + '/1');

            // Month + 1 = Valid Date (getMonth() returns 0 to 11, valid date = 1 to 12)
            var events    = this.getEventsByMonth(this.year + '/' + (monthIndex + 1) + '/1');
            var hasEvents = !bCalendar.Utils.isEmpty(events);

            var extraClass = hasEvents ? ' {calendarEventClass}' : '';
            var extraAttr  = '';

            if (this.selectedDate instanceof Date) {
                if (this.selectedDate.getMonth() === monthIndex && this.selectedDate.getFullYear() === this.year) {
                    extraClass += ' {calendarSelectedMonthClass}';
                }
            }

            num = this.getNumEvents(monthDate, 'month');
            if (opts.displayEventsNumber) {
                extraAttr += ' data-num="' + num + '"';
            }

            html += '<td class="{calendarMonthClass}' + extraClass + '"' + extraAttr +
                ' data-date="' + this.year + '/' + (monthIndex + 1) + '/1' + '">' +
                '   <button class="{calendarLinkClass}"><span class="{calendarTextClass}">';
            html += monthLabel;
            html += '</span>';

            if (opts.displayEventsNumber && num !== 0) {
                numTemplate = opts.eventsNumberTemplate.strtr({
                    num: num
                });
                html += numTemplate;
            }
            html += '</button></td>';
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
bCalendar.prototype.generateDateView = function () {
    var strings = this.strings();

    // Shorthand
    var opts = this.opts;

    // First day
    var firstDay    = new Date(this.year, this.month, 1);
    var startingDay = firstDay.getDay();
    var monthLength = firstDay.getLastDayOfMonth();

    // Last month...
    var previousMonth = this.month - 1;
    if (previousMonth < 0) {
        previousMonth = 11;
    }
    var previousMonthDate         = new Date(this.year, previousMonth, 1);
    var previousMonthLength       = previousMonthDate.getLastDayOfMonth();
    var previousMonthDifferencial = previousMonthLength - (startingDay - 1);

    // Header
    strings.monthName = this.aMonths[this.lang][this.month];
    strings.year      = this.year;

    var html = '<div class="{mainCalendarClass}">' +
        '<p class="{calendarTitleClass}">' +
        '<button href="#" class="{calendarMonthLabelClass}">' +
        '<span class="{calendarTitleMonthClass}">{monthName} </span>' +
        '<span class="{calendarTitleYearClass}">{year}</span>' +
        '</button>' +
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
    var day           = 1;
    var nextMonthDays = 1;


    // this loop is for is weeks (rows)
    for (var k = 0; k < 9; k++) {
        // this loop is for weekdays (cells)
        for (var j = 0; j <= 6; j++) {
            // Month + 1 = Valid Date (getMonth() returns 0 to 11, valid date = 1 to 12)
            var currentDayDate = new Date(this.year, this.month, day);

            // Check if we display the day number
            var hasDay = day <= monthLength && (k > 0 || j >= startingDay);

            // Adds as data on the object
            var dataDate = (hasDay ? this.year + '/' + (this.month + 1) + '/' + day : 0);

            var events = {};
            if (k === 0 && j < startingDay) {
                // Since we need to add 1 to the current month here we don't have to remove 1.
                previousMonth = (this.month === 0) ? 12 : this.month;
                dataDate      = this.year + '/' + previousMonth + '/' + previousMonthDifferencial;
                events        = this.getEventsByDate(dataDate);
            } else if (!hasDay && k > 0) {
                var nextMonth = (this.month >= 11) ? 1 : (this.month + 2); // +1, current value, +1 next month
                dataDate      = this.year + '/' + nextMonth + '/' + nextMonthDays;
                events        = this.getEventsByDate(dataDate);
            } else {
                events = this.getEventsByDate(currentDayDate);
            }

            var hasEvents  = !bCalendar.Utils.isEmpty(events);
            var extraClass = hasEvents ? ' {calendarEventClass}' : '';

            // Sets "today" on the startDate (defined in options, defaults to today)
            if (this.showStartDate) {
                if (this.startDate.getFullYear() === this.year &&
                    this.startDate.getMonth() === this.month &&
                    this.startDate.getDate() === day &&
                    hasDay) {
                    extraClass += ' {calendarCurrentDayClass}';
                }
            }

            // Sets "selected" class on the currently selected date.
            if (this.selectedDate instanceof Date) {
                if (this.selectedDate.getFullYear() === this.year &&
                    this.selectedDate.getMonth() === this.month &&
                    this.selectedDate.getDate() === day &&
                    hasDay) {
                    extraClass += ' {calendarSelectedDayClass}';
                }
            }

            html += '<td class="{calendarDayClass}' + (hasDay ? '' : ' {calendarEmptyDayClass}') + extraClass +
                '" data-date="' + dataDate + '">';

            var hasButton = (hasDay && opts.displayAdjacentMonthDates);

            if (hasButton) {
                html += '<button class="{calendarLinkClass}">';
            }

            if (hasDay) {
                html += day;
                day++;
            } else if (k === 0) {
                if (opts.displayAdjacentMonthDates) {
                    html += previousMonthDifferencial;
                }
                previousMonthDifferencial++;
            } else {
                if (opts.displayAdjacentMonthDates) {
                    html += nextMonthDays;
                }
                nextMonthDays++;
            }

            // html += '</span>';

            var num = this.getNumEvents(currentDayDate);
            if (opts.displayEventsNumber && num !== 0 && hasDay) {
                var numTemplate = opts.eventsNumberTemplate.strtr({
                    num: num
                });
                html += numTemplate;
            }
            if (hasButton) {
                html += '</button>';
            }
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
};

/**
 * Refreshes the calendar with all current options
 *
 * @return this (chainable)
 */
bCalendar.prototype.refresh = function (cb) {
    this.generateHTML();
    this.target.innerHTML = this.getHTML();

    if (typeof cb === 'function') {
        cb(this);
    }

    return this;
};
