
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
bCalendar.prototype.removeListeners = function () {
    console.log('removing listeners somehow');
    // this.target.removeEventListener('click');
    // this.target.removeEventListener('mouseenter');
    // this.target.removeEventListener('mouseout');
}
bCalendar.prototype.addListeners = function () {
    var that = this;
    var opts = this.opts;

    this.target.addEventListener('click', (e) => {

        // When clicking on a day in the calendar
        if (e.target.matches('.' + opts.classes.calendarDayClass)) {
            e.preventDefault();
            e.stopPropagation();

            var data = this.unescapeDatas(this._eventDatas(e.target));
            this.setSelectedDate(data.date);
            this.refresh();

            opts.callbacks.onDayClick(data, this);
        }

        // When clicking on a day in the calendar that has the active event class
        if (e.target.matches('.' + opts.classes.calendarEventClass + '.' + opts.classes.calendarDayClass)) {
            e.preventDefault();
            e.stopPropagation();

            var data = this.unescapeDatas(this._eventDatas(e.target));

            opts.callbacks.onEventClick(data, this);
        }

        // When clicking on the calendar controls
        // Previous
        if (e.target.matches('.' + opts.classes.calendarControlsPrevClass)) {
            e.preventDefault();
            e.stopPropagation();

            if (opts.mode === 'month') {
                opts.callbacks.onPrev(this);
                this.changeMonth(-1);
            }
            if (opts.mode === 'year') {
                this.changeYear(-1);
                opts.callbacks.onPrevYear(this);
            }
        }

        // Next
        if (e.target.matches('.' + opts.classes.calendarControlsNextClass)) {
            e.preventDefault();
            e.stopPropagation();

            if (opts.mode === 'month') {
                opts.callbacks.onNext(this);
                this.changeMonth(1);
            }
            if (opts.mode === 'year') {
                this.changeYear(1);
                opts.callbacks.onNextYear(this);
            }
        }

        // Month view trigger
        if (e.target.matches('.' + opts.classes.calendarMonthLabelClass)) {
            e.preventDefault();
            e.stopPropagation();

            if (this.opts.allowYearView) {
                this.opts.mode = 'year';
                opts.callbacks.onGotoMonthView(this);
                this.refresh();
            }
        }

        // Year view trigger
        if (e.target.matches('.' + opts.classes.calendarMonthClass)) {
            e.preventDefault();
            e.stopPropagation();

            var date = new Date(e.target.dataset.date);

            if (this.opts.allowMonthView) {
                this.opts.mode = 'month';
                this.month     = date.getMonth();
                this.year      = date.getFullYear();
                opts.callbacks.onGotoDateView(date, this);
            } else {
                opts.callbacks.onMonthSelect(date, this);
                this.setSelectedDate(date);
            }
            this.refresh();
        }

        // Go to month trigger
        if (e.target.matches('.' + opts.classes.calendarMonthClass + '.' + opts.classes.calendarEventClass)) {
            e.preventDefault();
            e.stopPropagation();

            var date = new Date(e.target.dataset.date);
            var events = this.unescapeDatas(this.getEventsByMonth(date));
            opts.callbacks.onMonthEventSelect(events, this);
        }


    })

    this.target.addEventListener('mouseenter', (e) => {
        if (e.target.matches('.' + opts.classes.calendarDayClass)) {
            e.preventDefault();

            var data = this.unescapeDatas(this._eventDatas(e.target));

            opts.callbacks.onDayMouseover(data, this);
        }

        if (e.target.matches('.' + opts.classes.calendarEventClass + '.' + opts.classes.calendarDayClass)) {
            e.preventDefault();

            var data = this.unescapeDatas(this._eventDatas(e.target));

            opts.callbacks.onEventMouseover(data, this);
        }
    })

    this.target.addEventListener('mouseout', (e) => {
        if (e.target.matches('.' + opts.classes.calendarEventClass + '.' + opts.classes.calendarDayClass)) {
            e.preventDefault();

            var data = this.unescapeDatas(this._eventDatas(e.target));

            opts.callbacks.onEventMouseout(data, this);
        }

        if (e.target.matches('.' + opts.classes.calendarDayClass)) {
            e.preventDefault();

            var data = this.unescapeDatas(this._eventDatas(e.target));

            opts.callbacks.onDayMouseout(data, this);
        }
    })

    return this;
};
