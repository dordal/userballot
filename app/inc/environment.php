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
	case 'app.userballot.com':
		define('GA_USERAGENT', 'UA-45967588-2');
		define('STRIPE_SECRET_KEY', 'sk_live_hsW3QjfGdnPgAzDKsH9r4wpn');
	break;
	// Everybody Else
	default:
		define('GA_USERAGENT', 'UA-45967588-3');
		define('STRIPE_SECRET_KEY', 'sk_test_oh7xChAgz9sTf53xJH0YlBVC');
	
}