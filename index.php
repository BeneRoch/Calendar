<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie7"  xmlns:fb="http://ogp.me/ns/fb#" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 lt-ie8"  xmlns:fb="http://ogp.me/ns/fb#" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8"  xmlns:fb="http://ogp.me/ns/fb#" lang="en"> <![endif]-->
<!--[if IE 9]>    <html class="no-js ie9"  xmlns:fb="http://ogp.me/ns/fb#" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="gt-ie"  xmlns:fb="http://ogp.me/ns/fb#"> <!--<![endif]-->

    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="apple-mobile-web-app-capable" content="yes">
        <script type="text/javascript" src="dist/js/vendors.js"></script>
        <script type="text/javascript" src="dist/js/app.js"></script>
        <link rel="stylesheet" href="dist/styles/main.css">

        <!--
              <script type="text/javascript" src="src/calendar.js"></script>
              <link rel="stylesheet" href="styles/styles.css"
              -->
    </head>

    <body>
        <div class="row">
            <div class="calendar-widget quarter"></div>
            <div class="quarter">
                <h2>Year display</h2>
                <p>
                    The calendar allows to navigate throught the years. Every calendar starts
                    "today", which means, in that case, that the displayed year is the current year.
                    <br/>
                    When you click on a month's name, you can then select a date.
                    <br/>
                    <br/>
                    <i>Note that <b>allowYearView</b> will be <b>forced</b> to <b>true</b> with that mode, of course</i>
                </p>
            </div>

            <div class="calendar-widget--second quarter"></div>
            <div class="quarter">
                <h2>Regular display</h2>
                <p>
                    Example of a regular display calendar with callback options. When clicking on a date
                    with an event, you get all events occuring on that day and can do whatever you want with it.
                </p>
                <div class="event-infos">
                Events will be displayed here.
                </div>
            </div>
        </div>


        <div class="row">
            <div class="calendar-widget--third quarter"></div>
            <div class="quarter">
                <h2>Straight call</h2>
                <pre class="code">$('.calendar-widget--third').calendar({});</pre>
                <p>
                    Default options are set like these:
                </p>
                <ul>
                <li><b>lang</b>: fr</li>
                <li><b>mode</b>: date</li>
                </ul>
            </div>

            <div class="calendar-widget--fourth quarter"></div>
            <div class="quarter">
                <h2>Translations</h2>
                <p>
                    As of now, only english is supported as an extra language. But you can fairly easily
                    add your own languages by defining the translations in the options. See both supported
                    languages next:
                </p>
                <pre class="code">
translations: {
    months: {
        fr : ['Janvier', 'Février', 'Mars', 'Avril','Mai', 'Juin', 'Juillet', 'Août', 'Septembre','Octobre', 'Novembre', 'Décembre'],
        en : ['January', 'February', 'March', 'April','May', 'June', 'July', 'August', 'September','October', 'November', 'December']
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
}
                </pre>
            </div>
        </div>


    </body>

    <script>
        /**
        * #Calendar example
        *
        * @param {object} opts
        * - Event Title
        * - Event date (multi format : "2012/11/6", 1349094647000, etc. (whatever gets in new Date())
        * - Event Content
        * - Event Link
        *
        * Return this (Calendar object)
        */
        elemnt = document.getElementsByClassName('calendar-widget--third')[0];
        calendar = new bCalendar(elemnt, {});
        //$(document).ready(function() {
        //    // $('.calendar-widget--third').calendar();
        //    $('.calendar-widget--fourth').calendar({ lang : 'en' });
        //
        //    $('.calendar-widget').calendar({
        //        lang: 'fr',
        //        allowMonthView: false,
        //        displayAdjacentMonthDates: false,
        //        mode: 'month',
        //        events : [
        //            {
        //                date:"<?php //echo date('Y'); ?>///01/16",
        //                title: 'Test title',
        //                content : 'Well, turns out on that date we uploaded the plugin'
        //            },
        //            {
        //                date:"<?php //echo date('Y'); ?>///06/16",
        //                title: 'Doc title',
        //                content : 'We also updated the doc accordingly'
        //            },
        //            {
        //                date:{
        //                    start : "<?php //echo date('Y'); ?>///03/17",
        //                    end : "<?php //echo date('Y'); ?>///08/27"
        //                },
        //                title: 'Changes',
        //                content : 'We might add s\0ome changes during theses days'
        //            },
        //            {
        //                date:{
        //                    start : "<?php //echo date('Y'); ?>///04/17",
        //                    end : "<?php //echo date('Y'); ?>///07/27"
        //                },
        //                title: 'Changes',
        //                content : 'We might add s\0ome changes during theses days'
        //            }
        //        ],
        //        translations:{
        //            nextYearLabel:{
        //                fr:"",
        //                en:""
        //            },
        //            prevYearLabel:{
        //                fr:"",
        //                en:""
        //            },
        //            nextMonthLabel:{
        //                fr:"",
        //                en:""
        //            },
        //            prevMonthLabel:{
        //                fr:"",
        //                en:""
        //            }
        //        },
        //        callbacks:{
        //            onMonthEventSelect : function(events, calendar) {
        //                console.log(events);
        //            }
        //        }
        //    });
        //
        //    $('.calendar-widget--second').calendar({
        //        lang: 'fr',
        //        allowYearView: true,
        //        events : [
        //            {
        //                date:"2015/01/16",
        //                title: 'Test title',
        //                content : 'Well, turns out on that date we uploaded the plugin'
        //            },
        //            {
        //                date:{
        //                start: "2015/01/16",
        //                end: "february 1 2017"
        //            },
        //                title: 'Doc title',
        //                content : 'We also u"<>pdated the doc accordingly'
        //            },
        //            {
        //                date:{
        //                    start : "2016/03/17",
        //                    end : "2016/08/27"
        //                },
        //                title: 'Changes',
        //                content : 'We might add s\0ome changes during theses days'
        //            }
        //        ],
        //        callbacks: {
        //            onEventClick: function(ev,calendar) {
        //                var events = ev.events;
        //                var count = events.length;
        //                var i = 0;
        //                var html = '';
        //                for (; i<count; i++) {
        //                    html += '<h3>'+events[ i ]['title']+'</h3><p>'+events[ i ]['content']+'</p>';
        //                }
        //                $('.event-infos').html(html);
        //            }
        //        }
        //    });
        //});

    </script>

    <footer>

    </footer>
</html>
