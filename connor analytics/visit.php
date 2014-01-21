<?
//include sb access class file//
include_once("DBM.php");
include_once("functions.php");
/*
what to do on accessing this page:
    - get the ip,
    - make user if applicable
    - store the visit in the db
*/
$ip = $_SERVER['REMOTE_ADDR'];
//$site = $_REQUEST['siteId'];
if($_REQUEST['siteId'])
    define('UB_SITE', $_REQUEST['siteId']);
else
   define('UB_SITE', 1);
if($_REQUEST['answer'])
    define('UB_ANSWER', $_REQUEST['answer']);
else
   define('UB_ANSWER', 'none');
if($_REQUEST['question'])
    define('UB_QUESTION', $_REQUEST['question']);
else
   define('UB_QUESTION', '--UNKNOWN--');
if(!hasUser($ip)){
  addUser($ip);
}
logVisit($ip);

?>


