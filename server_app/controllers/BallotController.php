<?php
include(app_path() . '/lib/firebase/firebaseLib.php');

class BallotController extends Controller {

	private $firebase;

	public function __construct() {
		// Init firebase connection, we're gonna need it.
		$this->firebase = new Firebase(FIREBASE_URL, FIREBASE_TOKEN);
	}

	/** 
	 * setCrossDomainHeaders(): Call this function to allow cross domain requests
	 * to the function
	 */
	private function setCrossDomainHeaders() {

	    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

	        header('Access-Control-Allow-Origin', '*');
	        header('Allow', 'GET, POST, OPTIONS');
	        header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Request-With');
        	exit;
        }
    }

	/**
	 * vote(): Increments the vote counter in firebase and 
	 * records analytics information associated with a vote 
	 */
	public function vote() {
		$this->setCrossDomainHeaders();

		$siteId = Input::get('id');
		$questionId = Input::get('q');
		$type = Input::get('t');

		// First, get the question object
		$questionStr = $this->firebase->get("/sites/" . $siteId . "/messages/" . $questionId);
		$question = json_decode($questionStr);

		// Switch on the response type
		switch ($type) {
			case "n":
				$voteType = "noVotes";
				$answer = "no";
			break;
			case "y":
				$voteType = "yesVotes";
				$answer = "yes";
			break;
		}
		$votes = $question->$voteType;
		$votes ++;

		// Record the yes or no answer.
		$this->firebase->set("/sites/" . $siteId . "/messages/" . $questionId . "/" . $voteType, $votes);
		
		$this->incrementVoteCount($siteId);
	}

	/**
	 * get(): Returns the active list of ballots for the specified site.
	 */
	public function get() {
		$this->setCrossDomainHeaders();

		$siteId = Input::get('id');
		$site = $this->firebase->get("/sites/" . $siteId );

		$siteObj = json_decode($site);
		
		// if the user is over their plan level, set the messages to empty.

		// 	TEMP - DO - 17 APRIL 2014: DISABLING PLAN QUOTA CHECKING UNTIL WE FIX THE PLAN LEVEL BUG

		//		if (isUserOverPlanLevel($id, $firebase))
		//		{
		//			$siteObj->messages = new stdClass();
		//		}

		return Response::json($siteObj);
	}

	/**
	 * view(): Records information about the visitor when a userballot is
	 * viewed on the page
	 */
	public function view() {
		$this->setCrossDomainHeaders();

		$visitorId = Input::get('vid');
		$questionId = Input::get('qid');
		$siteId = Input::get('sid');

		$questionStr = $this->firebase->get("/sites/" . $siteId . "/messages/" . $questionId);
		$question = json_decode($questionStr);

		// Increment the view count in Firebase
		$views = $question->views;
		$views++;
		$this->firebase->set("/sites/" . $siteId . "/messages/" . $questionId . "/views", $views);

		// Get the visitor from the database
		$visitor = Visitor::where('hash', $visitorId)->first();

		if (empty($visitor)) {
			// Go get data for this new visitor
			$ip = $_SERVER['REMOTE_ADDR'];

			$visitor = new Visitor();
			$visitor->ip = $ip;

			// Get info about this IP from ipinfo.io
			$details = json_decode(file_get_contents("http://ipinfo.io/{$ip}"));
			$visitor->city = $details->city;
			$visitor->region = $details->region;
			$visitor->country = $details->country;

			// Get browser / OS info 
			$tech = $this->getBrowser();
			$visitor->browser = $tech['name'];
			$visitor->version = $tech['version'];
			$visitor->os = $tech['platform'];

			$visitor->save();
		}

		// Add a new visit for this visitor in the analytics DB
		$visit = new Visit();
		$visit->siteId = $siteId;
		$visit->displayedQuestionId = $questionId;
		$visitor->visits()->save($visit);

	}

	/**
	 * mute(): Increments the mute counter
	 */
	public function mute() {
		$this->setCrossDomainHeaders();

	}

	/**
	 * getData(): Returns analytics information to the interface. A valid Firebase
	 * session is required to call this
	 */
	public function getData() {

	}


	private function incrementVoteCount($id)
	{
		// get Id of site owner
		$userEmailId = $this->firebase->get("/sites/" . $id . "/userEmailId");
		$userEmailId = trim($userEmailId,'"');

		// Increment the vote count for this site (used to enforce plan limit)
		date_default_timezone_set('America/Los_Angeles');
		$voteCountUrl = "/users/" . $userEmailId . "/votes/" . date('Y') . "/" . date('m');
		$voteCount = $this->firebase->get($voteCountUrl);
		$voteCount = ($voteCount == 'null' ? 0 : $voteCount);
		$this->firebase->set($voteCountUrl, ++$voteCount);
	}

	private function getBrowser() {
	    $u_agent = $_SERVER['HTTP_USER_AGENT'];
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


}