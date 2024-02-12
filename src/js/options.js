
/**
 * @var {object} defaults
 * All the default settings
 */
bCalendar.defaults = {
    startDate:            new Date(),
    showStartDate:        true,
    lang:                 'fr',
    mode:                 'month',
    allowYearView:        false,
    allowMonthView:       true,
    useControls:          true,
    displayEventsNumber:  true,
    eventsNumberTemplate: '<span class="c-calendar_num">{num}</span>',

    // Show the dates in the `-empty` boxes.
    displayAdjacentMonthDates: true,

    events: {},

    // Classes ( || html markup )
    classes:   {
        mainCalendarClass:         'c-calendar',
        calendarTitleClass:        'c-calendar_title',
        calendarTitleMonthClass:   'c-calendar_title_month',
        calendarTitleYearClass:    'c-calendar_title_year',
        calendarControlsClass:     'c-calendar_controls',
        calendarControlsPrevClass: 'c-calendar_prev',
        calendarControlsNextClass: 'c-calendar_next',
        calendarControlsHtml:      '',
        calendarTableClass:        'c-calendar_table',
        calendarTableHeaderClass:  'c-calendar_header',
        calendarRowClass:          'c-calendar_row',

        calendarDayClass:           'c-calendar_day',
        calendarMonthClass:         'c-calendar_month',
        calendarMonthLabelClass:    'c-calendar_month_label',
        calendarLinkClass:          'c-calendar_link',
        calendarTextClass:          'c-calendar_text',
        calendarEventClass:         '-event',
        calendarCurrentDayClass:    '-today',
        calendarSelectedDayClass:   '-selected',
        calendarSelectedMonthClass: '-selected',
        calendarEmptyDayClass:      '-empty' // Not in the same month
    },
    callbacks: {
        onChangeMonth:      function (calendar) {

        },
        onChangeYear:       function (calendar) {

        },
        onDatePick:         function (date, calendar) {

        },
        onMonthSelect:      function (date, calendar) {

        },
        onMonthEventSelect: function (events, calendar) {

        },
        onDayClick:         function (date, calendar) {

        },
        onEventClick:       function (events, calendar) {

        },
        onDayMouseover:     function (events, calendar) { // All days

        },
        onEventMouseover:   function (events, calendar) { // Days with event

        },
        onDayMouseout:      function (events, calendar) { // All days

        },
        onEventMouseout:    function (events, calendar) { // Days with event

        },
        onPrev:             function (calendar) {

        },
        onNext:             function (calendar) {

        },
        onPrevYear:         function (calendar) {

        },
        onNextYear:         function (calendar) {

        },
        onGotoMonthView:    function (calendar) {

        },
        onGotoDateView:     function (calendar) {

        }
    },

    translations:   {
        months:         {
            fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        days:           {
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
        nextYearLabel:  {
            en: 'Next Year',
            fr: 'Année suivante'
        },
        prevYearLabel:  {
            en: 'Previous Year',
            fr: 'Année précédente'
        }
    },
    eventSeparator: '{|}'
};
