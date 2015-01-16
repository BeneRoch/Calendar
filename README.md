# Calendar

## Description
Home made calendar that covers events and datepicking. Every event on a day in the calendar
returns a date object of the current target.  Note that even the header triggers these events,
with a `null` object as a date.

For date picking, you can add a `onDayClick` event and then manage the date object. ( @see `onDayClick` option below )
Events are passed as a JSON object and each requires a title and a date. The date parameter is `mixed`, which means it
can be a string, a timestamp or an object.  It'll be an object if the event has a beginning and an end.

## Simple date
 ```
 [ {
	date : '2015/1/10',
	content : '',
	title : ''
 } ]
 ```

## Complex date
 ```
 [ {
	date : {
		start : '2015/1/10',
		end : '2015/1/11'
	},
	content : '',
	title : ''
 } ]
 ```

## API
Name							| Description
--------------------------------|----------------------------------------------------------------------------------------------------------------------------
 `destroy`						| Destroys the calendar by removing all HTML and LISTENERS
 `next`							| Goes to next month
 `prev`							| Goes to previous month
 `doc`							| Returns appropriate documentation for the specified option in the list below

## Options

Name							| Type			|	Description
--------------------------------|----------------------------------------------------------------------------------------------------------------------------
 `startDate` 					|	Date Object	|	Current display date ( Default: current_date )
 `lang` 						|	string		|	Current display language
 `useControls					|	boolean		|	Auto output the controls for next and prev month if set to true (default: true)
 `events`						|	object		|	JSON of all the events - Events can have pretty much any data, but requires at least a title and a date

### translations
Name							| Type			|	Description
--------------------------------|----------------------------------------------------------------------------------------------------------------------------
 	`months`					|	object		|	Labels for months, by lang, in an array starting from JANUARY to DECEMBER
 	`days`						|	object		|	Labels for days, by lang, in an array starting from SUNDAY to SATURDAY
 	`nextMonthLabel`			|	object		|	Labels for skip month's title, by lang, in an array (view default)
 	`prevMonthLabel`			|	object		|	Labels for skip month's title, by lang, in an array (view default)

### classes
Name							| Type			|	Description
--------------------------------|----------------------------------------------------------------------------------------------------------------------------
	`mainCalendarClass`			|	string		|	The main calendar class, set on the DIV object that wraps it all
	`calendarTitleClass`		|	string		|	The calendar title class, set on the H1 object
	`calendarControlsClass`		|	string		|	The calendar controls wrapper class, set on the DIV object that wraps controls
	`calendarControlsPrevClass`	|	string		|	The calendar previous month button class, set on the ANCHOR object
	`calendarControlsNextClass`	|	string		|	The calendar next month button class, set on the ANCHOR object
	`calendarTableClass`		|	string		|	The calendar table class, set on the TABLE object
	`calendarTableHeaderClass`	|	string		|	The calendar table header class, set on the TR object that contains the day's labels
	`calendarRowClass`			|	string		|	The calendar row class, set on all the other TR object as opposed to 'calendarTableHeaderClass'
	`calendarDayClass`			|	string		|	The calendar day class, set on all TD inside the calendar (ALSO in the header)
	`calendarLinkClass`			|	string		|	The calendar link class, set on the ANCHOR object inside a day
	`calendarTextClass`			|	string		|	The calendar text class, set on the <span> object inside the <a> object of a day (calendarLinkClass)
	`calendarEventclass`		|	string		|	The calendar event class, set on the TD wrapping the day with an event
	`calendarEventStartclass`	|	string		|	The calendar event class, set on the TD wrapping the day an event starts
	`calendarEventEndclass`		|	string		|	The calendar event class, set on the TD wrapping the day an event ends
	`calendarEmptyDayClass`		|	string		|	The calendar empty day class, set on the TD wrapping a day with no date

### callbacks
Name							| Type			|	Description
--------------------------------|----------------------------------------------------------------------------------------------------------------------------
	`onDayMouseOver`			|	function	|	Triggered when moving mouse over a day
	`onEventMouseOver`			|	function	|	Triggered when moving mouse over a day with an event
	`onDayMouseOut`				|	function	|	Triggered when moving mouse out of a day
	`onEventMouseOut`			|	function	|	Triggered when moving mouse out of a day with an event
	`onDayClick`				|	function	|	Triggered when clicking on a day
	`onEventClick`				|	function	|	Triggered when clicking on a day with an event
	`onPrev`					|	function	|	Triggered when clicking on the previous button / Added to the regular event @see changeMonth
	`onNext`					|	function	|	Triggered when clicking on the next button / Added to the regular event @see changeMonth

