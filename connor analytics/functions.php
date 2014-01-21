<?

//USER//
function hasUser($ip){
  $query = "SELECT * FROM `user` WHERE `ip`='$ip'";
  $res = DBManager::ExecuteQueryAsArray($query);
  if(count($res) == 0){
    return false;
  }else{
    return true;
  }
}
function getUserFromIp($ip){
  $query = "SELECT * FROM `user` WHERE `ip`='$ip'";
  $res = DBManager::ExecuteQueryAsArray($query);
  return $res[0]['id'];
}
function addUser($ip){
  $details = json_decode(file_get_contents("http://ipinfo.io/{$ip}"));
  $city = $details->city;
  $postal = $details->postal;
  $query = "INSERT INTO `user`(`ip`, `city`, `postal`) VALUES ('$ip', '$city', '$postal')";
  DBManager::ExecuteQuery($query);
}
function getBrowser()
{
    $u_agent = $_SERVER['HTTP_USER_AGENT'];
    echo $u_agent ."<br /><br />";
    $bname = 'Unknown';
    $platform = 'Unknown';
    $version= "";

    //First get the platform?
    if (preg_match('/Linux/', $u_agent)) {
      if(preg_match('/Android/', $u_agent)) {
        $platform = 'Android';
      }else{
        $platform = 'Linux';
      }

    }elseif (preg_match('/Macintosh/', $u_agent)) {
      $platform = 'Macintosh';
    }elseif (preg_match('/Windows/', $u_agent)) {
      $platform = 'Windows';
    }elseif (preg_match('/iPad/', $u_agent)) {
      $platform = 'iPad';
    }elseif(preg_match('/iPhone/', $u_agent)) {
      $platform = 'iPhone';
    }

    // Next get the name of the useragent yes seperately and for good reason
    if(preg_match('/MSIE/i',$u_agent) && !preg_match('/Opera/i',$u_agent))
    {
        $bname = 'Internet Explorer';
        $ub = "MSIE";
    }
    elseif(preg_match('/Firefox/i',$u_agent))
    {
        $bname = 'Mozilla Firefox';
        $ub = "Firefox";
    }
    elseif(preg_match('/Chrome/i',$u_agent))
    {
        $bname = 'Google Chrome';
        $ub = "Chrome";
    }
    elseif(preg_match('/Safari/i',$u_agent))
    {
        $bname = 'Apple Safari';
        $ub = "Safari";
    }
    elseif(preg_match('/Opera/i',$u_agent))
    {
        $bname = 'Opera';
        $ub = "Opera";
    }
    elseif(preg_match('/Netscape/i',$u_agent))
    {
        $bname = 'Netscape';
        $ub = "Netscape";
    }

    // finally get the correct version number
    $known = array('Version', $ub, 'other');
    $pattern = '#(?<browser>' . join('|', $known) .
    ')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
    if (!preg_match_all($pattern, $u_agent, $matches)) {
        // we have no matching number just continue
    }

    // see how many we have
    $i = count($matches['browser']);
    if ($i != 1) {
        //we will have two since we are not using 'other' argument yet
        //see if version is before or after the name
        if (strripos($u_agent,"Version") < strripos($u_agent,$ub)){
            $version= $matches['version'][0];
        }
        else {
            $version= $matches['version'][1];
        }
    }
    else {
        $version= $matches['version'][0];
    }

    // check if we have a number
    if ($version==null || $version=="") {$version="?";}

    return array(
        'userAgent' => $u_agent,
        'name'      => $bname,
        'version'   => $version,
        'platform'  => $platform,
        'pattern'    => $pattern
    );
}


//Get DATA//
function getNumberOfUniqueUsers(){
  $query = "SELECT * FROM `visits` WHERE `site`='".UB_SITE."'";
  $res = DBManager::ExecuteQueryAsArray($query);
  $users = array();
  foreach($res as $visit){
     if(!in_array($visit['user'], $users)){
      array_push($users, $visit['user']);
    }
  }
  return count($users);
}
function getNumberOfResponses(){
  $query = "SELECT * FROM `visits` WHERE `site`='".UB_SITE."'";
  $res = DBManager::ExecuteQueryAsArray($query);
  return count($res);
}
function getResponsesByDay(){
  $query = "SELECT * FROM `visits` WHERE `site`='".UB_SITE."'";
  $res = DBManager::ExecuteQueryAsArray($query);
  $days = array();
  foreach($res as $visit){
    $day = date("m/d/Y", strtotime($visit['time']));
    $days[$day] += 1;
  }
  return $days;
}
function getUniqueUsersByDay(){
  $query = "SELECT * FROM `visits` WHERE `site`='".UB_SITE."'";
  $res = DBManager::ExecuteQueryAsArray($query);
  $days = array();
  $users = array();
  foreach($res as $visit){
    $day = date("m/d/Y", strtotime($visit['time']));
    if(!is_array($users[$day])){
      $users[$day] = array();
    }
    if(!in_array($visit['user'], $users[$day])){
      array_push($users[$day], $visit['user']);
      $days[$day] += 1;
    }
  }
  return $days;
}
function getUsersByBrowser(){
  $query = "SELECT * FROM `visits` WHERE `site`='".UB_SITE."'";
  $res = DBManager::ExecuteQueryAsArray($query);
  $browsers = array();
  $users = array();
  foreach($res as $visit){
/*    if(!is_array($users[$visit['browser']])){
      $users[$visit['browser']] = array();
    }
    if(!in_array($visit['user'], $users[$visit['browser']])){
      array_push($users[$visit['browser']], $visit['user']);*/
      $browser[$visit['browser']]++;
    }
//  }
  return $browser;
}
function getUsersByCity(){
  $query = "SELECT * FROM `visits` WHERE `site`='".UB_SITE."'";
  $res = DBManager::ExecuteQueryAsArray($query);
  $cities = array();
  $users = array();
  foreach($res as $re){
    $user = DBManager::ExecuteQueryAsArray("SELECT * FROM `user` WHERE `id`='".$re['user']."'");
//    if(!in_array($user, $users)){
//      array_push($users, $user);
      $cities[$user[0]['city']]++;
  //  }
  }
  return $cities;

}
function getUsersByOs(){
  $query = "SELECT * FROM `visits` WHERE `site`='".UB_SITE."'";
  $res = DBManager::ExecuteQueryAsArray($query);
  $os = array();
  $users = array();
  foreach($res as $visit){
 /*  if(!is_array($users[$visit['os']])){
      $users[$visit['os']] = array();
   }
    if(!in_array($visit['user'], $users[$visit['os']])){
      array_push($users[$visit['os']], $visit['user']);*/
      $os[$visit['os']]++;
//    }
  }
  return $os;
}
function getResponceTimes(){
  $query = "SELECT * FROM `answer` WHERE `site`='".UB_SITE."' and `answer`!='none'";
  $res = DBManager::ExecuteQueryAsArray($query);
  $times = array();
  foreach($res as $answer){
    $times[$answer['time']]++;
  }

  return $times;
}
function getNullResponces(){
  $query = "SELECT * FROM `answer` WHERE `site`='".UB_SITE."' and `answer`='none'";
  $res = DBManager::ExecuteQueryAsArray($query);
  return count($res);

}
function isRepeatUser($user, $site){
  $query = "SELECT * FROM `visits` WHERE `user`='$user' and `site`='$site'";
  $res = DBManager::ExecuteQueryAsArray($query);
  if(count($res) == 0){
    return "yes";
  }else{
    return "no";
  }
}
function getLastVisit($user, $site){
  $query = "SELECT * FROM `visits` WHERE `user`='$user' and `site`='$site'";
  $res = DBManager::ExecuteQueryAsArray($query);
  return $res[count($res) - 1];
}

//Visit//
function logVisit($ip){
  $user = getUserFromIp($ip);
  $browser = getBrowser();
//  echo "platform: " . $browser['platform'];
  date_default_timezone_set('America/Los_Angeles');
  $time = date("Y-m-d H:i:s");
  $repeat = isRepeatUser($user, UB_SITE);
  $query = "INSERT INTO `visits`(`user`, `time`, `site`, `os`, `browser`, `returning`) VALUES ('$user', '$time', '".UB_SITE."', '".$browser['platform']."', '".$browser['name']." - ".$browser['version']."', '".$repeat."')";
  DBManager::ExecuteQuery($query);
}


//ANSWER//
function logAnswer($ip){
  $user = getUserFromIp($ip);
  date_default_timezone_set('America/Los_Angeles');
  $time = date("Y-m-d H:i:s");
  $last = getLastVisit($user, UB_SITE);
  $diff = abs(strtotime(date('Y-m-d H:i:s', strtotime($time))) - strtotime(date('Y-m-d H:i:s', strtotime($last['time']))));
  $visit = $last['id'];
  $query = "INSERT INTO `answer`(`user`, `site`, `visit`, `question`, `answer`, `time`) VALUES ('$user', '".UB_SITE."', '$visit', '".UB_QUESTION."', '".UB_ANSWER ."', '".date('i:s', $diff)."')";
  DBManager::ExecuteQuery($query);
}

?>