<?php

class BallotController extends Controller {

	private $firebase;

	public function __construct() {
		// Init firebase connection, we're gonna need it.
		$firebase = new Firebase(FIREBASE_URL, FIREBASE_TOKEN);
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
		$questionStr = $firebase->get("/sites/" . $siteId . "/messages/" . $questionId);
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
		$firebase->set("/sites/" . $siteId . "/messages/" . $questionId . "/" . $voteType, $votes);
		
		$this->incrementVoteCount($siteId, $firebase);
	}

	/**
	 * get(): Returns the active list of ballots for the specified site.
	 */
	public function get() {
		$this->setCrossDomainHeaders();

		$siteId = Input::get('id');
		$site = $firebase->get("/sites/" . $siteId );

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


	private function incrementVoteCount($id, $firebase)
	{
		// get Id of site owner
		$userEmailId = $firebase->get("/sites/" . $id . "/userEmailId");
		$userEmailId = trim($userEmailId,'"');

		// Increment the vote count for this site (used to enforce plan limit)
		date_default_timezone_set('America/Los_Angeles');
		$voteCountUrl = "/users/" . $userEmailId . "/votes/" . date('Y') . "/" . date('m');
		$voteCount = $firebase->get($voteCountUrl);
		$voteCount = ($voteCount == 'null' ? 0 : $voteCount);
		$firebase->set($voteCountUrl, ++$voteCount);
	}

}