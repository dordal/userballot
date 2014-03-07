<?php

/**
 * ub.php
 *
 * Contains functions for tracking and displaying messages.
 * Provides a secure intermediary between Firebase and the client.js code
 * deployed to people's sites.
 */
include('inc/environment.php');
include('lib/firebase/firebaseLib.php');
include("analytics/DBM.php");
include("analytics/functions.php");

// Important! Allow all domains to hit this URL via AJAX
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

$action = $_GET['a'];

$firebase = new Firebase(FIREBASE_URL, FIREBASE_TOKEN);

switch ($action) {

	// Get the specified question
	// id: site ID
	case "get":
		$id = $_GET['id'];
		$site = $firebase->get("/sites/" . $id );

		echo $site;
	break;
	// Vote yes or no
	// id: site ID
	// q: question ID
	// t: response type
	case "vote":
		$id = $_GET['id'];
		$questionId = $_GET['q'];
		$type = $_GET['t'];

		// First, get the question object
		$questionStr = $firebase->get("/sites/" . $id . "/messages/" . $questionId);
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
		$firebase->set("/sites/" . $id . "/messages/" . $questionId . "/" . $voteType, $votes);

		// Record the answer in the analytics database
		$ip = $_SERVER['REMOTE_ADDR'];

		define('UB_SITE', $id);
		define('UB_QUESTION', $questionId);
		define('UB_ANSWER', $answer);

		if(!hasUser($ip)){
		  addUser($ip);
		}
		logAnswer($ip);
	break;
	// Increment the mute counter
	// id: site ID
	// q: question ID
	case "mute":
		$id = $_GET['id'];
		$questionId = $_GET['q'];

		// Get the question object

		$questionStr = $firebase->get("/sites/" . $id . "/messages/" . $questionId);
		$question = json_decode($questionStr);

		// Increment the mute count
		$mutes = $question->mute;
		$mutes ++;
		$firebase->set("/sites/" . $id . "/messages/" . $questionId . "/mute", $mutes);
	break;
	// Increment the view counter
	// id: site ID
	// q: question ID
	case "view":
		$id = $_GET['id'];
		$questionId = $_GET['q'];

		// Get the question object

		$questionStr = $firebase->get("/sites/" . $id . "/messages/" . $questionId);
		$question = json_decode($questionStr);

		// Increment the mute count
		$views = $question->views;
		$views++;
		$firebase->set("/sites/" . $id . "/messages/" . $questionId . "/views", $views);

		// Log the visit to the analytics database
		/*
		what to do on accessing this page:
		    - get the ip,
		    - make user if applicable
		    - store the visit in the db
		*/
		$ip = $_SERVER['REMOTE_ADDR'];
		//$site = $_REQUEST['siteId'];
		define('UB_SITE', $id);
		define('UB_QUESTION', $questionId);

		if(!hasUser($ip)){
		  addUser($ip);
		}
		logVisit($ip);

		
	break;

}