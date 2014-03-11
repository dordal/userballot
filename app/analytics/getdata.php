<?
//include the db access class file//
include_once("DBM.php");
include_once("functions.php");
/*
what to do on page load:
 - get the site id
 - print out the data that we have
*/
$siteId = $_REQUEST['siteId'];
$questionId = $REQUEST['question'];

$returnarray = array();
$returnarray['totalunique'] = getNumberOfUniqueUsers($siteId, $questionId);
$returnarray['total'] = getNumberOfResponses($siteId, $questionId);
$returnarray['totalperday'] = getResponsesByDay($siteId, $questionId);
$returnarray['uniqueperday'] = getUniqueUsersByDay($siteId, $questionId);
$returnarray['usersperbrowser'] = getUsersByBrowser($siteId, $questionId);
$returnarray['usersperos'] = getUsersByOs($siteId, $questionId);
$returnarray['nullresponce'] = getNullResponces($siteId, $questionId);
$returnarray['responcetimes'] = getResponceTimes($siteId, $questionId);
$returnarray['usersbycity'] = getUsersByCity($siteId, $questionId);
echo json_encode($returnarray);

?>