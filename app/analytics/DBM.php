<?

include("../inc/environment.php");

//These variable values need to be
$conn = mysql_connect (DB_HOST, DB_USER, DB_PASS) or die(mysql_error());
mysql_select_db(DB_NAME);

class DBManager {
    public static function executeQueryAsArray($query) {
        $res = mysql_query($query) or die (mysql_error());
        $rows = array();
        while(($row = mysql_fetch_array($res))) {
            $rows[] = $row;
        }
        return $rows;
    }

    public static function executeQuery($query) {
        $res = mysql_query($query) or die (mysql_error());
        return $res;
    }
}?>