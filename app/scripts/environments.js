// detect the current server name
var APP_DOMAIN = window.location.hostname;

var FIREBASE_DOMAIN;

switch(APP_DOMAIN){

case 'app-dev-jware.userballot.com':
	FIREBASE_DOMAIN = 'userballot-dev-jware.firebaseio.com';
break;
default:
	FIREBASE_DOMAIN = 'userballotdb.firebaseio.com';

}