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
		define('UB_APP_DOMAIN', 'http://app.userballot.com');
	break;
	case 'userballot-web-tfite':
		define('GA_USERAGENT', 'UA-45967588-3');
		define('UB_APP_DOMAIN', 'http://userballot-app-tfite');
	break;
	// Everybody Else
	default:
		define('GA_USERAGENT', 'UA-45967588-3');
		define('UB_APP_DOMAIN', 'http://app-staging.userballot.com');
	
}