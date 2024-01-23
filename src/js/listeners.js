
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

        var calendarDayTarget = e.target.closest('.' + opts.classes.calendarDayClass);
        // When clicking on a day in the calendar
        if (calendarDayTarget) {
            e.preventDefault();
            e.stopPropagation();

            var data = this.unescapeDatas(this._eventDatas(calendarDayTarget));
            this.setSelectedDate(data.date);
            this.refresh();

            console.log(data);

            opts.callbacks.onDayClick(data, this);
        }

        var calendarDayEventTarget = e.target.closest('.' + opts.classes.calendarEventClass + '.' + opts.classes.calendarDayClass);
        // When clicking on a day in the calendar that has the active event class
        if (calendarDayEventTarget) {
            e.preventDefault();
            e.stopPropagation();

            var data = this.unescapeDatas(this._eventDatas(calendarDayEventTarget));

            opts.callbacks.onEventClick(data, this);
        }

        // When clicking on the calendar controls
        // Previous
        var calendarPrevControlTarget = e.target.closest('.' + opts.classes.calendarControlsPrevClass);
        if (calendarPrevControlTarget) {
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
        var calendarNextControlTarget = e.target.closest('.' + opts.classes.calendarControlsNextClass);
        if (calendarNextControlTarget) {
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
        var calendarMonthViewControl = e.target.closest('.' + opts.classes.calendarMonthLabelClass);
        if (calendarMonthViewControl) {
            e.preventDefault();
            e.stopPropagation();

            if (this.opts.allowYearView) {
                this.opts.mode = 'year';
                opts.callbacks.onGotoMonthView(this);
                this.refresh();
            }
        }

        // Year view trigger
        var calendarYearViewControl = e.target.closest('.' + opts.classes.calendarMonthClass);
        if (calendarYearViewControl) {
            e.preventDefault();
            e.stopPropagation();

            var date = new Date(calendarYearViewControl.dataset.date);

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
        var calendarGoToMonthControl = e.target.closest('.' + opts.classes.calendarMonthClass + '.' + opts.classes.calendarEventClass);
        if (calendarGoToMonthControl) {
            e.preventDefault();
            e.stopPropagation();

            var date = new Date(calendarGoToMonthControl.dataset.date);
            var events = this.unescapeDatas(this.getEventsByMonth(date));
            opts.callbacks.onMonthEventSelect(events, this);
        }


    })

    this.target.addEventListener('mouseenter', (e) => {
        var calendarDayTarget = e.target.closest('.' + opts.classes.calendarDayClass);
        if (calendarDayTarget) {
            e.preventDefault();

            var data = this.unescapeDatas(this._eventDatas(calendarDayTarget));

            opts.callbacks.onDayMouseover(data, this);
        }

        var calendarDayEventTarget = e.target.closest('.' + opts.classes.calendarEventClass + '.' + opts.classes.calendarDayClass);
        if (calendarDayEventTarget) {
            e.preventDefault();

            var data = this.unescapeDatas(this._eventDatas(calendarDayEventTarget));

            opts.callbacks.onEventMouseover(data, this);
        }
    })

    this.target.addEventListener('mouseout', (e) => {
        var calendarDayEventTarget = e.target.closest('.' + opts.classes.calendarEventClass + '.' + opts.classes.calendarDayClass);
        if (calendarDayEventTarget) {
            e.preventDefault();

            var data = this.unescapeDatas(this._eventDatas(calendarDayEventTarget));

            opts.callbacks.onEventMouseout(data, this);
        }

        var calendarDayTarget = e.target.closest('.' + opts.classes.calendarDayClass);
        if (calendarDayTarget) {
            e.preventDefault();

            var data = this.unescapeDatas(this._eventDatas(calendarDayTarget));

            opts.callbacks.onDayMouseout(data, this);
        }
    })

    return this;
};
