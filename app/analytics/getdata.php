<?
//include the db access class file//
include_once("DBM.php");
include_once("functions.php");
/*
what to do on page load:
 - get the site id
 - print out the data that we have
*/
define('UB_SITE', $_REQUEST['siteId']);
$returnarray = array();
$returnarray['totalunique'] = getNumberOfUniqueUsers();
$returnarray['total'] = getNumberOfResponses();
$returnarray['totalperday'] = getResponsesByDay();
$returnarray['uniqueperday'] = getUniqueUsersByDay();
$returnarray['usersperbrowser'] = getUsersByBrowser();
$returnarray['usersperos'] = getUsersByOs();
$returnarray['nullresponce'] = getNullResponces();
$returnarray['responcetimes'] = getResponceTimes();
$returnarray['usersbycity'] = getUsersByCity();
echo json_encode($returnarray);

?>