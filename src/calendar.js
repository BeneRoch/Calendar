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
*	date : '2015/1/10',
*	content : '',
*	title : ''
* } ]
* ```
*
* ###Complex date
* ```
* [ {
*	date : {
*		start : '2015/1/10',
*		end : '2015/1/11'
*	},
*	content : '',
*	title : ''
* } ]
* ```
*
* ##API
* `destroy`						| Destroys the calendar by removing all HTML and LISTENERS
* `next`						| Goes to next month
* `prev`						| Goes to previous month
* `doc`							| Returns appropriate documentation for the specified option in the list below
*
* ##Options
* `startDate` 					|	Date Object	|	Current display date ( Default: current_date )
* `lang` 						|	string		|	Current display language
* `useControls					|	boolean		|	Auto output the controls for next and prev month if set to true (default: true)
* `events`						|	object		|	JSON of all the events - Events can have pretty much any data, but requires at least a title and a date
* `mode`						|	string		|	Specifys the desired display type: Either Month or Date (default: date)
* `allow_month_view`			|	boolean		|	Define if you can switch between month view and date view (default: false)
*
* `translations`				|	object		|   Contains all translations
* 	`months`					|	object		|	Labels for months, by lang, in an array starting from JANUARY to DECEMBER
* 	`days`						|	object		|	Labels for days, by lang, in an array starting from SUNDAY to SATURDAY
* 	`nextMonthLabel`			|	object		|	Labels for skip month's title, by lang, in an array (view default)
* 	`prevMonthLabel`			|	object		|	Labels for skip month's title, by lang, in an array (view default)
*
* `classes`						|	object		| 	Contains all classes used by the plugin (generateHTML)
*	`mainCalendarClass`			|	string		|	The main calendar class, set on the <div> object that wraps it all
*	`calendarTitleClass`		|	string		|	The calendar title class, set on the <h1> object
*	`calendarControlsClass`		|	string		|	The calendar controls wrapper class, set on the <div> object that wraps controls
*	`calendarControlsPrevClass`	|	string		|	The calendar previous month button class, set on the <a> object
*	`calendarControlsNextClass`	|	string		|	The calendar next month button class, set on the <a> object
*	`calendarTableClass`		|	string		|	The calendar table class, set on the <table> object
*	`calendarTableHeaderClass`	|	string		|	The calendar table header class, set on the <tr> object that contains the day's labels
*	`calendarRowClass`			|	string		|	The calendar row class, set on all the other <tr> object as opposed to 'calendarTableHeaderClass'
*	`calendarDayClass`			|	string		|	The calendar day class, set on all <td> inside the calendar (ALSO in the header)
*	`calendarMonthClass`		|	string		|	The calendar month class, set on all <td> inside the calendar
*	`calendarLinkClass`			|	string		|	The calendar link class, set on the <a> object inside a day
*	`calendarTextClass`			|	string		|	The calendar text class, set on the <span> object inside the <a> object of a day (calendarLinkClass)
*	`calendarEventclass`		|	string		|	The calendar event class, set on the <td> wrapping the day with an event
*	`calendarEventStartclass`	|	string		|	The calendar event class, set on the <td> wrapping the day an event starts
*	`calendarEventEndclass`		|	string		|	The calendar event class, set on the <td> wrapping the day an event ends
*	`calendarEmptyDayClass`		|	string		|	The calendar empty day class, set on the <td> wrapping a day with no date
*	`currentDayClass`			|	string		|	The calendar current day class, set on the <td> wrapping today's date
*
* `callbacks`					|	object		|	Contains all possible callbacks
*	`onDayMouseOver`			|	function	|	Triggered when moving mouse over a day
*	`onEventMouseOver`			|	function	|	Triggered when moving mouse over a day with an event
*	`onDayMouseOut`				|	function	|	Triggered when moving mouse out of a day
*	`onEventMouseOut`			|	function	|	Triggered when moving mouse out of a day with an event
*	`onDayClick`				|	function	|	Triggered when clicking on a day
*	`onEventClick`				|	function	|	Triggered when clicking on a day with an event
*	`onPrev`					|	function	|	Triggered when clicking on the previous button while in day mode / Added to the regular event @see changeMonth
*	`onNext`					|	function	|	Triggered when clicking on the next button while in day mode / Added to the regular event @see changeMonth
*	`onNextYear`				|	function	|	Triggered when clicking on the next button while in month mode
*	`onPrevYear`				|	function	|	Triggered when clicking on the prev button while in month mode
*	`onChangeMonth`				|	function	|	Triggered after a new month has been loaded
*	`onGotoMonthView`			|	function	|	Triggered after switching to the month view
*	`onGotoDateView`			|	function	|	Triggered after switching to the date view
*
*	Return self (Calendar object)
*
* @todos
* - Add class active onDayEventClick
* - Add class active on everyday that event occurs (unless mutliple events? 1click first event, second click second event...)
*
*
*/

(function($){
	 $.fn.calendar = function(options, more) {
	 	// If there's already a calendar, maybe we want to access the API.
	 	var calendar = $(this).data('calendar');

	 	if (calendar) {
	 		// API
	 		if (typeof options == 'string') {
	 			switch (options) {

	 				// Destroy calendar, remove HTML, remove listeners.
	 				case 'destroy' :
	 					calendar.destroy();
	 				break;

	 				// Goes to next month
	 				case 'next' :
	 					calendar.changeMonth(1);
	 				break;

	 				// Goes to previous month
	 				case 'prev' :
	 					calendar.changeMonth(-1);
	 				break;

	 				// Returns the appropriate doc
	 				case 'doc' :
		 				if (more) {
		 					calendar.doc(more);
		 				}
	 				break;

	 				// Adds events
	 				// In that case, `more` is an event json
	 				case 'events' :
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
	 		startDate : new Date(),
	 		today : new Date(),
	 		lang : 'fr',
	 		mode: 'date',
	 		allow_month_view : false,
	 		useControls : true,
	 		events : {},

	 		// Classes ( || html markup )
	 		classes : {
		 		mainCalendarClass : 'calendar',
		 		calendarTitleClass : 'calendar__title',
		 		calendarControlsClass : 'calendar__controls',
		 		calendarControlsPrevClass : 'calendar__prev',
		 		calendarControlsNextClass : 'calendar__next',
		 		calendarControlsHtml : '',
		 		calendarTableClass : 'calendar__table',
		 		calendarTableHeaderClass : 'calendar__header',
		 		calendarRowClass : 'calendar__row', // TR

		 		calendarDayClass : 'calendar__day', // TD
		 		calendarMonthClass : 'calendar__month', // TD
		 		calendarMonthLabelClass : 'calendar__month_label', // TD
		 		calendarLinkClass : 'calendar__link',
		 		calendarTextClass : 'calendar__text',
		 		calendarEventclass : 'calendar__day--event',
		 		currentDayClass : 'calendar__day--today',
		 		calendarEventStartclass : 'calendar__day--event--start',
		 		calendarEventEndclass : 'calendar__day--event--end',
		 		calendarEmptyDayClass : 'calendar__day--empty' // When no number


		 	},
		 	callbacks: {
		 		onChangeMonth : function(calendar) {

		 		},
		 		onDayClick : function(date, calendar) {

		 		},
		 		onEventClick : function(datas, calendar) {

		 		},
		 		onDayMouseover : function(datas, calendar) { // Days with event

		 		},
		 		onEventMouseover : function(datas, calendar) { // Days with event

		 		},
		 		onDayMouseout : function(datas, calendar) { // Days with event

		 		},
		 		onEventMouseout : function(datas, calendar) { // Days with event

		 		},
		 		onPrev : function(calendar) {

		 		},
		 		onNext : function(calendar) {

		 		},
		 		onPrevYear : function(calendar) {

		 		},
		 		onNextYear : function(calendar) {

		 		},
		 		onGotoMonthView : function(calendar) {

		 		},
		 		onGotoDateView : function(calendar) {

		 		}
		 	},

	 		translations: {
		 		months: {
					fr : ['Janvier', 'Février', 'Mars', 'Avril','Mai', 'Juin', 'Juillet', 'Août', 'Septembre','Octobre', 'Novembre', 'Décembre'],
					en :  ['January', 'February', 'March', 'April','May', 'June', 'July', 'August', 'September','October', 'November', 'December']
		 		},
		 		days: {
					fr : ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
					en : ['S', 'M', 'T', 'W', 'T', 'F', 'S']
		 		},
		 		nextMonthLabel : {
		 			en : 'Next Month',
		 			fr : 'Mois suivant'
		 		},
		 		prevMonthLabel : {
		 			en : 'Previous Month',
		 			fr : 'Mois précédent'
		 		},
		 		nextYearLabel : {
		 			en : 'Next Year',
		 			fr : 'Année suivante'
		 		},
		 		prevYearLabel : {
		 			en : 'Previous Year',
		 			fr : 'Année précédente'
		 		}
		 	},
		 	eventSeparator : '{|}'
	 	};

	 	// Merge options
	 	var opts = $.extend(true, defaults, options);

	 	// Instanciation
		var Charcoal_Calendar = new bCalendar(opts);

		Charcoal_Calendar.target = $(this);
		Charcoal_Calendar.load()
		// Generate HTML
		// Charcoal_Calendar.generateHTML();

		// Append HTML
		// Charcoal_Calendar.target.html(Charcoal_Calendar.getHTML());

		// Charcoal_Calendar.addListeners();
		return Charcoal_Calendar;
	}
})(jQuery);

/**
* Class Calendar
*
* @param opts
* @see doc above
*/
var bCalendar = function(opts) {
	// Options
	this.opts = opts;

	// Lang
	this.lang = (typeof opts.lang == 'string')?opts.lang : 'fr';

	// Today
	this.current_date = typeof opts.startDate == 'object' ? opts.startDate : new Date(opts.startDate);

	// Months labels
	// From the options, we want this to be editable.
	this.aMonths = this.opts.translations.months;

	// Days labels
	// From the options, we want this to be editable.
	this.aDays = this.opts.translations.days;

	// Number of days per month
	// Not from the options, no need to edit that.
	this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// Callback (ready)
	this.callback = this.opts.callback;

	// Events
	this.events = {};

	this.loadEvents();

	this.html = '';

	return this;
}

/**
* Load listeners and all
* Make sure no duplication is done.
*
*/
bCalendar.prototype.load = function()
{
	var options = this.opts;
	// Make sure no duplication of event is done.
	this.destroy();

	// Keep datas
	this.opts = options;

	// Generate HTML
	this.generateHTML();

	// Append HTML
	this.target.html(this.getHTML());
	this.target.data('calendar',this);

	this.addListeners();

	return this;
}

/**
* Load news events, or current events
* Uses this.opts.events
*
* @return this (chainable)
*/
bCalendar.prototype.loadEvents = function()
{
	this.events = [];
	var opts = this.opts;

	// opts.events = this.escapeDatas(opts.events);

	if (typeof opts.events == 'object') {
		for (var i = 0; i < opts.events.length; i++) {

			if (typeof opts.events[i]['date'] == "object") {
				var first_date = new Date(this.unescapeDatas(opts.events[i]['date'].start));
				var last_date = new Date(this.unescapeDatas(opts.events[i]['date'].end));

			} else {
				var first_date = new Date(this.unescapeDatas(opts.events[i]['date']));
				var last_date = first_date;
			}

			this.eDate = first_date;
			while (this.eDate <= last_date) {

				// BUILDING events array
				if (typeof this.events[this.eDate.getFullYear()] == 'undefined') {
					this.events[this.eDate.getFullYear()] = {};
				}
				if (typeof this.events[this.eDate.getFullYear()][this.eDate.getMonth()] == 'undefined') {
					this.events[this.eDate.getFullYear()][this.eDate.getMonth()] = {};
				}

				if (typeof this.events[this.eDate.getFullYear()][this.eDate.getMonth()][this.eDate.getDate()] == 'undefined') {
					this.events[this.eDate.getFullYear()][this.eDate.getMonth()][this.eDate.getDate()] = Array();
				}

				this.events[this.eDate.getFullYear()][this.eDate.getMonth()][this.eDate.getDate()].push(opts.events[i]);

				this.eDate = new Date(this.eDate.getFullYear(), this.eDate.getMonth(), (this.eDate.getDate()+1));

			}
		}
	}

	this.month =  (isNaN(opts.month) || opts.month == null) ? this.current_date.getMonth() : opts.month;
	this.year = (isNaN(opts.year) || opts.year == null) ? this.current_date.getFullYear() : opts.year;

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
		return escape( data );
		// return unescape( encodeURIComponent( data ) )
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

	if (typeof data == 'array') {
		var i = 0;
		var count = data.length;
		for (; i < count; i++) {
			data[i] = this.unescapeDatas(data[i]);
		}
	}

	if (typeof data == 'object') {
		for (var i in data) {
			data[i] = this.unescapeDatas(data[i]);
		}
	}

	if (typeof data == 'string') {
		return unescape( data );
		// return unescape( encodeURIComponent( data ) )
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
bCalendar.prototype.generateHTML = function(){

	var mode = this.opts.mode;

	this.opts.events = this.escapeDatas(this.opts.events);

	switch (mode) {
		case 'date':
			return this.generateDateView();
			break;
		case 'month':
			return this.generateMonthView();
		break;
	}

	// Default
	return '';

}


bCalendar.prototype.generateHeaderView = function() {


}

/**
* Month view
* Generates the HTML considering all the events and options
* Automatic generations from a date
* Adds the html in 'this.html' / Use this.getHTML() to retrieve the informations
*
* @return this (chainable)
*/
bCalendar.prototype.generateMonthView = function() {

	// Easier
	var opts = this.opts;

	// First day
	var firstDay = new Date(this.year, this.month, 1);
	var startingDay = firstDay.getDay();

	this.current_date = firstDay;

	var months = opts.translations.months[ opts.lang ];



	// find number of days in month
	var monthLength = this.daysInMonth[this.month];

	// compensate for leap year
	if (this.month == 1) { // February only!
		if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
			monthLength = 29;
		}
	}

	// do the header
	var monthName = this.aMonths[this.lang][this.month];
	var html = '';

	// Start calendar output
	html += '<div class="'+opts.classes.mainCalendarClass+'">';

	// Calendar title (month + year)
	html += '<h1 class="'+opts.classes.calendarTitleClass+'">'+ this.year+'</h1>';


	// Calendar Controls
	if (opts.useControls) {
		html += '<div class="'+opts.classes.calendarControlsClass+'">';
		html += '<button class="'+opts.classes.calendarControlsPrevClass+'"><svg class="calendar__svg" role="img" title="'+opts.translations.prevYearLabel[ this.lang ]+'"><use xlink:href="#icon-arrowleft"></use></svg></button>';
		html += '<button class="'+opts.classes.calendarControlsNextClass+'"><svg class="calendar__svg" role="img" title="'+opts.translations.nextYearLabel[ this.lang ]+'"><use xlink:href="#icon-arrowright"></use></svg></button>';
		html += '</div>';
	}

	html += '<table class="'+opts.classes.calendarTableClass+'" cellpadding=0" cellspacing="0" border="0">';


	// this loop is for is weeks (rows)
	for (var i = 0; i < 3; i++) {
		// this loop is for weekdays (cells)
		for (var j = 0; j <= 3; j++) {

			// Month index, starting at 0;
			var monthIndex = parseInt((i*4)+j);
			var monthLabel = months[monthIndex];



			// Arrays for output
			var title = Array();
			var url = Array();
			var contents = Array();

			// Month + 1 = Valid Date (getMonth() returns 0 to 11, valid date = 1 to 12)
			var event = this.getEventsByMonth(''+this.year+'/'+(monthIndex+1)+'/1');

			/*
			*	@TODO -> MULTIPLE URL (in bubble perhaps)
			*/
			var url = Array();
			var title = Array();

			var k = 0;
			var count = event.length;
			for (; k < count; k++) {

				if (typeof event[ k ]['link'] == 'string' ) {
					url.push( event[ k ]['link'] );
				}

				if (typeof event[ k ]['content'] == 'string' ) {
					contents.push( event[ k ]['content'] );
				}

				if (typeof event[ k ]['title'] == 'string' ) {
					title.push( event[ k ]['title'] );
				}
			}


			var has_event = !jQuery.isEmptyObject(event);
			var extra_class = has_event ?' '+opts.classes.calendarEventclass:'';

			html += '<td class="'+opts.classes.calendarMonthClass+''+ extra_class +'"  data-date="'+ this.year + '/' + (monthIndex+1) +'/1'+'" title="'+title.join(this.opts.eventSeparator)+'" data-description="'+contents.join(this.opts.eventSeparator)+'" data-href="'+url.join(this.opts.eventSeparator)+'">';
			html += '<a class="'+opts.classes.calendarLinkClass+'" href="#"><span class="'+opts.classes.calendarTextClass+'">';


			html += monthLabel;

			html += '</span></a></td>';
		}

		html += '</tr><tr class="'+opts.classes.calendarRowClass+'">';
	}
	html += '</tr></table>';

	this.html = html+'</div>';

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

	// Easier
	var opts = this.opts;

	// First day
	var firstDay = new Date(this.year, this.month, 1);
	var startingDay = firstDay.getDay();

	this.current_date = firstDay;

	// find number of days in month
	var monthLength = this.daysInMonth[this.month];

	// compensate for leap year
	if (this.month == 1) { // February only!
		if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
			monthLength = 29;
		}
	}

	// do the header
	var monthName = this.aMonths[this.lang][this.month];
	var html = '';

	// Start calendar output
	html += '<div class="'+opts.classes.mainCalendarClass+'">';

	// Calendar title (month + year)
	html += '<h1 class="'+opts.classes.calendarTitleClass+'">';

	// Month view allowed -> make month title clickable
	if (this.opts.allow_month_view) {
		html += '<a href="#" class="'+opts.classes.calendarMonthLabelClass+'">';
	}

	html += monthName + "&nbsp;" + this.year;

	// Month view allowed -> make month title clickable
	if (this.opts.allow_month_view) {
		html += '</a>';
	}

	html += '</h1>';


	// Calendar Controls
	if (opts.useControls) {
		html += '<div class="'+opts.classes.calendarControlsClass+'">';
		html += '<a href="#" class="'+opts.classes.calendarControlsPrevClass+'"><svg class="calendar__svg" role="img" title="'+opts.translations.prevMonthLabel[ this.lang ]+'"><use xlink:href="#icon-arrowleft"></use></svg></a>';
		html += '<a href="#" class="'+opts.classes.calendarControlsNextClass+'"><svg class="calendar__svg" role="img" title="'+opts.translations.nextMonthLabel[ this.lang ]+'"><use xlink:href="#icon-arrowright"></use></svg></a>';
		html += '</div>';
	}

	html += '<table class="'+opts.classes.calendarTableClass+'" cellpadding=0" cellspacing="0" border="0">';
	html += '<tr class="'+opts.classes.calendarTableHeaderClass+'">';
	for(var i = 0; i <= 6; i++ ){
		html += '<td class="'+opts.classes.calendarDayClass+'">';
		html += this.aDays[this.lang][i];
		html += '</td>';
	}
	html += '</tr><tr class="'+opts.classes.calendarRowClass+'">';
	// html += '</div>';

	// fill in the days
	var day = 1;
	// this loop is for is weeks (rows)
	for (var i = 0; i < 9; i++) {
		// this loop is for weekdays (cells)
		for (var j = 0; j <= 6; j++) {

			// Arrays for output
			var title = Array();
			var url = Array();
			var contents = Array();

			// Month + 1 = Valid Date (getMonth() returns 0 to 11, valid date = 1 to 12)
			var event = this.getEventsByDate(''+this.year+'/'+(this.month+1)+'/'+day);


			/*
			*	@TODO -> MULTIPLE URL (in bubble perhaps)
			*/
			var url = Array();
			var title = Array();

			var k = 0;
			var count = event.length;
			for (; k < count; k++) {

				if (typeof event[ k ]['link'] == 'string' ) {
					url.push( event[ k ]['link'] );
				}

				if (typeof event[ k ]['content'] == 'string' ) {
					contents.push( event[ k ]['content'] );
				}

				if (typeof event[ k ]['title'] == 'string' ) {
					title.push( event[ k ]['title'] );
				}
			}

			var has_day = day <= monthLength && (i > 0 || j >= startingDay);

			var has_event = !jQuery.isEmptyObject(event) && has_day;
			var extra_class = has_event ?' '+opts.classes.calendarEventclass:'';

			if (opts.today.getFullYear() == this.year && opts.today.getMonth() == this.month && opts.today.getDate() == day) {
				extra_class += ' '+opts.classes.currentDayClass;
			}

			html += '<td class="'+opts.classes.calendarDayClass+''+ ( has_day ? '':' '+opts.classes.calendarEmptyDayClass+'' )+ extra_class +'"  data-date="'+ ( has_day ? this.year + '/' + (this.month+1) +'/'+day : 0 ) +'" title="'+title.join(this.opts.eventSeparator)+'" data-description="'+contents.join(this.opts.eventSeparator)+'" data-href="'+url.join(this.opts.eventSeparator)+'">';
			html += '<a class="'+opts.classes.calendarLinkClass+'" href="#"><span class="'+opts.classes.calendarTextClass+'">';


			if (has_day) {
				html += day;
				day++;
			}

			html += '</span></a></td>';
		}
		// stop making rows if we've run out of days
		if (day > monthLength) {
			break;
		} else {
			html += '</tr><tr class="'+opts.classes.calendarRowClass+'">';
		}
	}
	html += '</tr></table>';

	this.html = html+'</div>';

	return this;
}

/**
* Gets all events from a date
* Considers the actual date (year / month / date)
*
* @param date date Any date format
* @return {Array} Empty [] | Object [{}] | Multiple objects [{},{}] Events from that day.
*/
bCalendar.prototype.getEventsByDate = function(date)
{
	// Object Date
	var d = new Date(date);

	// Stock new value
	var month = 	d.getMonth();
	var year =	d.getFullYear();
	var day =	d.getDate();

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
* @param date date Any date format
* @return {Object} Empty {} | Event { 6 : {event}} | Multiple events { 6 : {event}, 10 : {event}}
* Returns object with DATE as keys
*/
bCalendar.prototype.getEventsByMonth = function(date)
{
	// Object Date
	var d = new Date(date);

	// Stock new value
	var month = 	d.getMonth();
	var year =	d.getFullYear();

	if (typeof this.events[year] == 'undefined') {
		return {};
	}

	if (typeof this.events[year][month] == 'undefined') {
		return {};
	}

	return this.events[year][month];
}


/**
* Unique function to switch between months
* Accepts any number, but will only consider positive VS negative values
*
* @param int 1 | -1
* @return {Object} this (chainable)
*/
bCalendar.prototype.changeMonth = function(dir)
{
	// Using '-1 and 1' as directions
	var direction = (dir == undefined || dir > 0)?1:-1;

	// Changes YEAR
	if ((this.month == 0 && direction == -1) || (this.month == 11 && direction == 1)) {
		this.year += direction;
		// For simplicity, if month is zero and direction is '-1', then -11*-1 = 11 (new index)
		this.month += -11*direction;
	} else {
		this.month += direction;
	}


	// Refresh View
	this.refresh();

	return this;
}

/**
* Unique function to switch between years
* Accepts any number
*
* @param int
* @return {Object} this (chainable)
*/
bCalendar.prototype.changeYear = function(dir)
{
	// Using '-1 and 1' as directions
	var direction = (dir == undefined || dir > 0)?1:-1;

	this.year = this.year + dir;

	// Refresh View
	this.refresh();

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
bCalendar.prototype.goToDate = function(date)
{
	// Object Date
	var d = new Date(date);

	// Stock new value
	this.month = 	d.getMonth();
	this.year =	d.getFullYear();

	// Refresh view
	this.refresh();

	return this;
}


/**
* Gets the event datas over an calendar dom object
* Mainly internal use
*
* @param {jQuery Dom object} elem | Elem that can trigger calendar events
* @return {Object} ret | { date : date, events : [{event},{event}] }
*/
bCalendar.prototype._eventDatas = function(elem)
{
	var date = elem.data('date');
	if (!date) {
		return { date : null, events : [] }
	}
	date = new Date(date);

	var ret = {
		date : date,
		events : this.getEventsByDate(date)
	}

	// Return
	return ret;
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
	this.target.on('click', '.'+opts.classes.calendarDayClass, function(e)
	{
		e.preventDefault();

		var datas = that.unescapeDatas( that._eventDatas($(this)) );
		opts.callbacks.onDayClick(datas, that);

	})

	// Click on a day with events
	.on('click', '.'+opts.classes.calendarEventclass+'.'+opts.classes.calendarDayClass, function(e)
	{
		e.preventDefault();
		var datas = that.unescapeDatas( that._eventDatas($(this)) );

		opts.callbacks.onEventClick(datas, that);

	})

	// Mouseover any day
	.on('mouseover', '.'+opts.classes.calendarDayClass, function(e)
	{
		e.preventDefault();

		var datas = that.unescapeDatas(that._eventDatas($(this)));
		opts.callbacks.onDayMouseover(datas, that);

	})

	// Mouseover a day with event(s)
	.on('mouseover', '.'+opts.classes.calendarEventclass+'.'+opts.classes.calendarDayClass, function(e)
	{
		e.preventDefault();

		var datas = that.unescapeDatas(that._eventDatas($(this)));
		opts.callbacks.onEventMouseover(datas, that);

	})

	// Mouseout any day
	.on('mouseout', '.'+opts.classes.calendarEventclass+'.'+opts.classes.calendarDayClass, function(e)
	{
		e.preventDefault();

		var datas = that.unescapeDatas(that._eventDatas($(this)));
		opts.callbacks.onEventMouseout(datas, that);

	})

	// Mouseout a day with event(s)
	.on('mouseout', '.'+opts.classes.calendarDayClass, function(e)
	{
		e.preventDefault();

		var datas = that._eventDatas($(this));
		opts.callbacks.onDayMouseout(datas, that);

	})

	// Controls click
	.on('click', '.'+opts.classes.calendarControlsPrevClass, function(e)
	{
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
	.on('click', '.'+opts.classes.calendarControlsNextClass, function(e)
	{
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
	.on('click', '.'+opts.classes.calendarMonthLabelClass, function(e)
	{
		e.preventDefault();
		that.opts.mode = 'month';
		opts.callbacks.onGotoMonthView(that);
		that.refresh();

	})

	// Controls click
	.on('click', '.'+opts.classes.calendarMonthClass, function(e)
	{
		e.preventDefault();
		var datas = that._eventDatas($(this));
		that.opts.mode = 'date';

		that.month = datas.date.getMonth();
		that.year = datas.date.getFullYear();

		opts.callbacks.onGotoDateView(that);
		that.refresh();

	});

	return this;
}

/**
* Refreshes the calendar with all current options
*
* @return this (chainable)
*/
bCalendar.prototype.refresh = function() {
	var that = this;
	// Fade effect
	this.target.fadeTo(400, 0, function() {
		that.generateHTML();
		that.target.html(that.getHTML()).fadeTo(400,1);

		that.opts.callbacks.onChangeMonth(that);

	});

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


bCalendar.prototype.destroy = function() {
	this.target.off('click');
	this.target.off('mouseover');
	this.target.off('mouseout');
	this.target.html('');
	this.target.data('calendar', false);
}


/**
* All documentation concerning the plugins options
*
*/
bCalendar._doc = {
	startDate : {
		type : 'Date Object',
		description : 'Current display date ( Default: current_date )'
	},
	lang : {
		type : 'String',
		description: 'The display language. Can be anything, as long as you gave the according translations'
	},
	useControls : {
		type : 'Boolean',
		description : 'Auto output the controls for next and prev month if set to true (default: true)'
	},
	events : {
		type : 'Object',
		description: 'JSON of all the events - Events can have pretty much any data, but requires at least a title and a date'
	},
	mode : {
		type : 'String',
		description: 'Specifys the desired display type: Either Month or Date (default: date)'
	},
	translations : {
		type : 'Object',
		description: 'Contains all translations',
		children : {
			months : {
				type : 'Object',
				description : 'Labels for months, by lang, in an array starting from JANUARY to DECEMBER'
			},
			days : {
				type : 'Object',
				description : 'Labels for days, by lang, in an array starting from SUNDAY to SATURDAY'
			},
			nextMonthLabel : {
				type : 'Object',
				description : 'Labels for skip month\'s title, by lang, in an array (view default)'
			},
			prevMonthLabel : {
				type : 'Object',
				description : 'Labels for skip month\'s title, by lang, in an array (view default)'
			}
		}
	},
	classes : {
		type : 'Object',
		description: 'Contains all classes used by the plugin (generateHTML)',
		children : {
			mainCalendarClass : {
				type : 'String',
				description : 'The main calendar class, set on the <div> object that wraps it all'
			},
			calendarTitleClass : {
				type : 'String',
				description : 'The calendar title class, set on the <h1> object'
			},
			calendarControlsClass : {
				type : 'String',
				description : 'The calendar controls wrapper class, set on the <div> object that wraps controls'
			},
			calendarControlsPrevClass : {
				type : 'String',
				description : 'The calendar previous month button class, set on the <a> object'
			},
			calendarControlsNextClass : {
				type : 'String',
				description : 'The calendar next month button class, set on the <a> object'
			},
			calendarTableClass : {
				type : 'String',
				description : 'The calendar table class, set on the <table> object'
			},
			calendarTableHeaderClass : {
				type : 'String',
				description : 'The calendar table header class, set on the <tr> object that contains the day\'s labels'
			},
			calendarRowClass : {
				type : 'String',
				description : 'The calendar row class, set on all the other <tr> object as opposed to "calendarTableHeaderClass"'
			},
			calendarDayClass : {
				type : 'String',
				description : 'The calendar day class, set on all <td> inside the calendar (ALSO in the header)'
			},
			calendarMonthClass : {
				type : 'String',
				description : 'The calendar month class, set on all <td> inside'
			},
			calendarLinkClass : {
				type : 'String',
				description : 'The calendar link class, set on the <a> object inside a day'
			},
			calendarTextClass : {
				type : 'String',
				description : 'The calendar text class, set on the <span> object inside the <a> object of a day (calendarLinkClass)'
			},
			calendarEventclass : {
				type : 'String',
				description : 'The calendar event class, set on the <td> wrapping the day with an event'
			},
			calendarEventStartclass : {
				type : 'String',
				description : 'The calendar event class, set on the <td> wrapping the day an event starts'
			},
			calendarEventEndclass : {
				type : 'String',
				description : 'The calendar event class, set on the <td> wrapping the day an event ends'
			},
			calendarEmptyDayClass : {
				type : 'String',
				description : 'The calendar empty day class, set on the <td> wrapping a day with no date'
			},
			currentDayClass : {
				type : 'String',
				description : 'The calendar current day class, set on the <td> wrapping today\'s date'
			}
		}
	},
	callbacks : {
		type : 'Object',
		description: 'Contains all possible callbacks',
		children: {
			onDayMouseOver : {
				type : 'function',
				description: 'Triggered when moving mouse over a day',
				note : 'Triggered whether or not there is an event'
			},
			onEventMouseOver : {
				type : 'function',
				description: 'Triggered when moving mouse over a day with an event'
			},
			onDayMouseOut : {
				type : 'function',
				description: 'Triggered when moving mouse out of a day',
				note : 'Triggered whether or not there is an event'
			},
			onEventMouseOut : {
				type : 'function',
				description: 'Triggered when moving mouse out of a day with an event'
			},
			onDayClick : {
				type : 'function',
				description: 'Triggered when clicking on a day',
				note : 'Triggered whether or not there is an event'
			},
			onEventClick : {
				type : 'function',
				description: 'Triggered when clicking on a day with an event'
			},
			onChangeMonth : {
				type : 'function',
				description: 'Triggered after a new month has been loaded'
			},
			onPrev : {
				type : 'function',
				description: 'Triggered when clicking on the previous button while in date mode / Added to the regular event @see changeMonth'
			},
			onNext : {
				type : 'function',
				description: 'Triggered when clicking on the next button while in date mode / Added to the regular event @see changeMonth'
			},
			onPrevYear : {
				type : 'function',
				description: 'Triggered when clicking on the prev button while in month mode'
			},
			onNextYear : {
				type : 'function',
				description: 'Triggered when clicking on the next button while in month mode'
			},
			onGotoMonthView : {
				type : 'function',
				description: 'Triggered after switching to the month view'
			},
			onGotoDateView : {
				type : 'function',
				description: 'Triggered after switching to the date view'
			}
		}
	}
}


/**
* This is a developper helper
* Returns a doc on a perticular option
* @param {String} key | Key of the option
* @return {Object} | Doc concerning a specific subjet
*/
bCalendar.prototype.doc = function(key)
{
	var doc = bCalendar._doc;
	var datas = {};
	var that = this;


	for (var d in doc) {

		if (d == key) {
			datas = {
				type : doc[ d ].type,
				description : doc[ d ].description
			}
			return datas;
		}

		if (typeof doc[ d ][ 'children' ] == 'object') {
			var children = doc[ d ][ 'children' ];

			for (var c in children) {

				if (c == key) {
					datas = {
						type : children[ c ].type,
						description : children[ c ].description
					}
					return datas;
				}
			}

		}

	}

	return datas;

}