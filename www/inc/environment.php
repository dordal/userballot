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
switch (Request::getHost()) {
	// Production
	case 'www.userballot.com':
		define('GA_USERAGENT', 'UA-45967588-1');
		define('UB_APP_DOMAIN', 'https://app.userballot.com');

		define('FIREBASE_URL', 'https://userballotdb.firebaseio.com');
		define('FIREBASE_TOKEN', 'BMgUZdnbWu1dhri0TWwiJeKsBsIMNuiIsV84CU7u');

		// Database
		define('DB_USER','userballot');
		define('DB_PASS','User8allot!');
		define('DB_NAME','userballot');
		define('DB_HOST','userballot.db.10461360.hostedresource.com');
	break;
	case 'userballot-web-tfite':
		define('GA_USERAGENT', 'UA-45967588-3');
		define('UB_APP_DOMAIN', 'http://userballot-app-tfite');

		define('FIREBASE_URL', 'https://userballotdb-staging.firebaseio.com');
		define('FIREBASE_TOKEN', 'XfBvYQUesMSmcKXdSUs2LFUSbp0ww6r7GmVyDbCt');

		define('DB_USER','userballot');
		define('DB_PASS','UserBallot!');
		define('DB_NAME','userballot');
		define('DB_HOST','localhost');
	break;
	case 'userballot-web-dmccarthy':
		define('GA_USERAGENT', 'UA-45967588-3');
		define('UB_APP_DOMAIN', 'http://userballot-app-dmccarthy');

		define('FIREBASE_URL', 'https://userballotdb-staging.firebaseio.com');
		define('FIREBASE_TOKEN', 'XfBvYQUesMSmcKXdSUs2LFUSbp0ww6r7GmVyDbCt');

		define('DB_USER','userballot');
		define('DB_PASS','UserBallot!');
		define('DB_NAME','userballot');
		define('DB_HOST','localhost');
	break;
	case 'local.www.userballot.com':
		define('GA_USERAGENT', 'UA-45967588-3');
		define('UB_APP_DOMAIN', 'http://local.app.userballot.com');

		define('FIREBASE_URL', 'https://userballotdb-staging.firebaseio.com');
		define('FIREBASE_TOKEN', 'XfBvYQUesMSmcKXdSUs2LFUSbp0ww6r7GmVyDbCt');

		define('DB_USER','userballot');
		define('DB_PASS','UserBallot!');
		define('DB_NAME','userballot');
		define('DB_HOST','localhost');
	break;
	// Everybody Else
	default:
		define('GA_USERAGENT', 'UA-45967588-3');
		define('UB_APP_DOMAIN', 'http://app-staging.userballot.com');

		define('FIREBASE_URL', 'https://userballotdb-staging.firebaseio.com');
		define('FIREBASE_TOKEN', 'XfBvYQUesMSmcKXdSUs2LFUSbp0ww6r7GmVyDbCt');

		define('DB_USER','userballot');
		define('DB_PASS','UserBallot!');
		define('DB_NAME','userballot');
		define('DB_HOST','localhost');
	
}