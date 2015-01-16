<?php
/*
	var_dump($_GET);


		// Update expiry
		$expiry = strtotime('2013/07/08');
		$now = time();

		// Add one year to current
		if ($expiry > $now) {
			$next_expiry = strtotime('+1 year', $expiry);
		}

		// Or add one year to NOW.
		else {
			$next_expiry = strtotime('+1 year', $now);
		}

		echo date('Y-m-d H:i:s', $next_expiry);*/
?><!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie7"  xmlns:fb="http://ogp.me/ns/fb#" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 lt-ie8"  xmlns:fb="http://ogp.me/ns/fb#" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8"  xmlns:fb="http://ogp.me/ns/fb#" lang="en"> <![endif]-->
<!--[if IE 9]>    <html class="no-js ie9"  xmlns:fb="http://ogp.me/ns/fb#" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="gt-ie"  xmlns:fb="http://ogp.me/ns/fb#"> <!--<![endif]-->

	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
		<meta name="apple-mobile-web-app-capable" content="yes">
		<script type="text/javascript" src="scripts/jquery-1.11.1.min.js"></script>
		<script type="text/javascript" src="scripts/calendar.js"></script>

		<style>

.calendar {
  position: relative; }

.calendar__table {
  width: 100%;
  text-align: center; }

.calendar__title {
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  padding-bottom: 20px; }
  @media (max-width: 360px) {
    .calendar__title {
      font-size: 20px; } }

.calendar__header {
  border-top: 1px solid #FFFFFF;
  border-bottom: 1px solid #FFFFFF;
  margin-bottom: 10px;
  display: inline-block;
  width: 100%; }
  .calendar__header > .calendar__day {
    padding-bottom: 0px;
    font-weight: 500; }

.calendar__row {
  display: inline-block;
  width: 100%; }

.calendar__day {
  font-family: "brandon-grotesque", sans-serif;
  font-weight: 500;
  font-size: 24px;
  width: 14.28%;
  position: relative;
  padding-bottom: 14%;
  display: inline-block;
  font-size: 18px;
  line-height: 45px; }
  @media (min-width: 1680px) {
    .calendar__day {
      padding-bottom: 10%; } }

.calendar__day--empty .calendar__link:hover .calendar__text {
  background-color: #fcb833; }

.calendar__day--event .calendar__text:after {
  content: "";
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 100%;
  position: absolute;
  top: 11px;
  right: 6px;
  display: block;
  background-color: #000000;
  transition: background-color 0.3s cubic-bezier(0.23, 1, 0.32, 1); }

.calendar__link {
  text-decoration: none;
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}
  .calendar__link:hover .calendar__text {
    color: #fcb833; }
    .calendar__link:hover .calendar__text:after {
      background-color: #fcb833; }

.calendar__text {
  position: absolute;
  height: 45px;
  width: 45px;
  left: 50%;
  margin-left: -22.5px;
  top: 50%;
  margin-top: -22.5px;
  border-radius: 100%;
  transition: background-color 0.3s cubic-bezier(0.23, 1, 0.32, 1), color 0.3s cubic-bezier(0.23, 1, 0.32, 1); }

.calendar__prev {
  position: absolute;
  right: 43px;
  top: 0px;
  background: black;

}

.calendar__next {
  position: absolute;
  right: 0px;
  top: 0px;
  background: black;

}

.calendar__next, .calendar__prev {
  width: 17px;
  height: 17px;
  display: block; }

.calendar__svg {
  width: 17px;
  height: 17px;
  fill: #FFFFFF; }
		</style>

	</head>

	<body>
		<div class="calendar-widget">

		</div>
	</body>

	<script>
		/**
		*	#Calendar example
		*
		*	@param {object} opts
		*	- Event Title
		*	- Event date (multi format : "2012/11/6", 1349094647000, etc. (whatever gets in new Date())
		*	- Event Content
		*	- Event Link
		*
		*	Return this (Calendar object)
		*/
		$(document).ready(function() {
			$('.calendar-widget').calendar({
				lang: 'fr',
				events : [
					{
						date:"2015/01/6",
						title: 'test 2 2 22 ',
						content : 'un autre test 2 22 2 '
					},
					{
						date:"2015/01/6",
						title: 'testasdasdas das asd as ',
						content : 'un autre dasdasd asd as asd '
					},
					{
						date:{
							start : "2015/01/17",
							end : "2015/01/20"
						},
						title: 'test',
						content : 'un autre test'
					}
				]
			});
		});

	</script>

	<footer>

	</footer>

</html>