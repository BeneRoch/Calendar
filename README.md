# Calendar

## Description
You can find [demo here](http://beneroch.com/calendar)
Home made calendar that covers events and datepicking. Every event on a day in the calendar
returns a date object of the current target.  Note that even the header triggers these events,
with a `null` object as a date.

For date picking, you can add a `onDayClick` event and then manage the date object. ( @see `onDayClick` option below )
Events are passed as a JSON object and each requires a title and a date. The date parameter is `mixed`, which means it
can be a string, a timestamp or an object.  It'll be an object if the event has a beginning and an end.

## Simple date
 ```
 [ {
    date : '2017/1/10',
    content : '',
    title : ''
 } ]
 ```

### Complex date
 ```
 [ {
    date : {
        start : '2017/1/10',
        end : '2017/1/11'
    },
    content : '',
    title : ''
 } ]
 ```

### Multiple date formats
 ```
 [ {
    date : {
        start : '2017/1/10',
        end : 'january 11 2017'
    },
    content : '',
    title : ''
 },{
    date : 'september 24 2017',
    content : '',
    title : ''
 } ]
 ```
## Easy to use
The calendar is easy to use and only requires minimal options.  Everything is yet customizable.  The calendar builds himself on a DOM object (DIV) and fits the boundaries of that object.  Let's see some examples

#### Given the following div:

```
<div id="calendar-widget"></div>
```
#### Build a french calendar (see default options)
```
$('#calendar-widget').calendar()
```
#### Build an english calendar
```
$('#calendar-widget').calendar({
    lang : 'en'
})
```
#### Add unsupported language
```
$('#calendar-widget').calendar({
    lang : 'customLang',
    translations: {
        months: {
            customLang : ['January', 'February', 'March', 'April','May', 'June', 'July', 'August', 'September','October', 'November', 'December']
        },
        days: {
            customLang : ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        },
        nextMonthLabel : {
            customLang : 'Next Month'
        },
        prevMonthLabel : {
            customLang : 'Previous Month'
        }
        nextYearLabel : {
            customLang : 'Next Year'
        },
        prevYearLabel : {
            customLang : 'Previous Year'
        }
    }
})
```
#### Start in month view display
```
$('#calendar-widget').calendar({
    mode: 'month'
})
```
#### Add events
```
$('#calendar-widget').calendar({
    events : [
        {
            date:"2017/01/16",
            title: 'Test title',
            content : 'Well, turns out on that date we uploaded the plugin'
        },
        {
        date:{
            start: "2017/01/16",
            end: "february 1 2017"
        },
            title: 'Doc title',
            content : 'We also u"<>pdated the doc accordingly'
        },
        {
            date:{
                start : "2017/01/17",
                end : "2017/01/27"
            },
            title: 'Changes',
            content : 'We might add s\0ome changes during theses days'
        }
    ]
});
```

## API
Name                            | Description
--------------------------------|----------------------------------------------------------------------------------------------------------------------------
 `destroy`                      | Destroys the calendar by removing all HTML and LISTENERS
 `next`                         | Goes to next month
 `prev`                         | Goes to previous month
 `doc`                          | Returns appropriate documentation for the specified option in the list below

## Options
Name                            | Type          |   Description
--------------------------------|---------------|------------------------------------------------------------------------------------------------------------
 `startDate`                    |   Date Object |   Current display date ( Default: current_date )
 `lang`                         |   string      |   Current display language
 `mode`                         |   string      |   Current display mode. Either month or date ( Default: date )
 `useControls`                  |   boolean     |   Auto output the controls for next and prev month if set to true (default: true)
 `allowMonthView`               |   boolean     |   Define if you can see the month view (default: false, unless mode is set to 'month')
 `allowDateView`                |   boolean     |   Define if you can see the date view (default: false, unless mode is set to 'date')
 `events`                       |   object      |   JSON of all the events - Events can have pretty much any data, but requires at least a title and a date
 `displayEventsNumber`          |   boolean     |   Define if you can to display the number of events on the calendar (default: true)
 `displayAdjacentMonthDates`    |   boolean     |   Define if you want to display the adjacent month dates or empty boxes (default: true)
 `eventsNumberTemplate`         |   string      |   Templates used to display the number of events on a day / year / month

### translations
Name                            | Type          |   Description
--------------------------------|---------------|------------------------------------------------------------------------------------------------------------
 `months`                       |   object      |   Labels for months, by lang, in an array starting from JANUARY to DECEMBER
 `days`                         |   object      |   Labels for days, by lang, in an array starting from SUNDAY to SATURDAY
 `nextMonthLabel`               |   object      |   Labels for skip month's title, by lang, in an array (view default)
 `prevMonthLabel`               |   object      |   Labels for skip month's title, by lang, in an array (view default)
 `nextYearLabel`                |   object      |   Labels for skip year's title, by lang, in an array (view default)
 `prevYearLabel`                |   object      |   Labels for skip year's title, by lang, in an array (view default)

### classes
Name                            | Type          |   Description
--------------------------------|---------------|------------------------------------------------------------------------------------------------------------
 `mainCalendarClass`            |   string      |   The main calendar class, set on the DIV object that wraps it all
 `calendarTitleClass`           |   string      |   The calendar title class, set on the H1 object
 `calendarControlsClass`        |   string      |   The calendar controls wrapper class, set on the DIV object that wraps controls
 `calendarControlsPrevClass`    |   string      |   The calendar previous month button class, set on the ANCHOR object
 `calendarControlsNextClass`    |   string      |   The calendar next month button class, set on the ANCHOR object
 `calendarTableClass`           |   string      |   The calendar table class, set on the TABLE object
 `calendarTableHeaderClass`     |   string      |   The calendar table header class, set on the TR object that contains the day's labels
 `calendarRowClass`             |   string      |   The calendar row class, set on all the other TR object as opposed to 'calendarTableHeaderClass'
 `calendarDayClass`             |   string      |   The calendar day class, set on all TD inside the calendar (ALSO in the header)
 `calendarMonthClass`           |   string      |   The calendar month class, set on all TD inside the calendar (ALSO in the header)
 `calendarLinkClass`            |   string      |   The calendar link class, set on the ANCHOR object inside a day
 `calendarTextClass`            |   string      |   The calendar text class, set on the <span> object inside the <a> object of a day (calendarLinkClass)
 `calendarEventclass`           |   string      |   The calendar event class, set on the TD wrapping the day with an event
 `calendarEmptyDayClass`        |   string      |   The calendar empty day class, set on the TD wrapping a day with no date
 `calendarCurrentDayClass`      |   string      |   The calendar current day class, set on the <td> wrapping today's date
 `calendarSelectedDayClass`     |   string      |   The calendar selected day class, set on the <td> wrapping the selected date
 `calendarSelectedMonthClass`   |   string      |   The calendar empty day class, set on the TD wrapping a day with no date

### callbacks
Name                            | Type          |   Description
--------------------------------|---------------|------------------------------------------------------------------------------------------------------------
 `onDayMouseOver`               |   function    |   Triggered when moving mouse over a day
 `onEventMouseOver`             |   function    |   Triggered when moving mouse over a day with an event
 `onDayMouseOut`                |   function    |   Triggered when moving mouse out of a day
 `onEventMouseOut`              |   function    |   Triggered when moving mouse out of a day with an event
 `onDayClick`                   |   function    |   Triggered when clicking on a day
 `onEventClick`                 |   function    |   Triggered when clicking on a day with an event
 `onPrev`                       |   function    |   Triggered when clicking on the previous button while in date mode / Added to the regular event @see changeMonth
 `onPrevYear`                   |   function    |   Triggered when clicking on the previous button while in month mode
 `onNext`                       |   function    |   Triggered when clicking on the next button while in date mode / Added to the regular event @see changeMonth
 `onNextYear`                   |   function    |   Triggered when clicking on the next button while in month mode
 `onGotoMonthView`              |   function    |   Triggered after switching to the month view
 `onGotoDateView`               |   function    |   Triggered after switching to the date view

