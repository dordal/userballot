<?php

/*
 * environment.php
 *
 * This sets environment variables which can be included in templates.
 *
 */

// we switch on HTTP_HOST. Eventually we may have to move to hard-coded 
// environment variables (e.g. ENV_STAGING), but this requires less setup 
// for now.
switch ($_SERVER['HTTP_HOST']) {
	// Production
	case 'www.userballot.com':
		define('GA_USERAGENT', 'UA-45967588-1');

	break;


	// Everybody Else
	default:
		define('GA_USERAGENT', 'UA-45967588-3');
	
}