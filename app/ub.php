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
// include("analytics/DBM.php");
// include("analytics/functions.php");

// Important! Allow all domains to hit this URL via AJAX
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

$firebase = new Firebase(FIREBASE_URL, FIREBASE_TOKEN);

function incrementVoteCount($id, $firebase)
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

$action = $_GET['a'];

switch ($action) {

	// Get the specified question
	// id: site ID
	case "get":
		$id = $_GET['id'];
		$site = $firebase->get("/sites/" . $id );

		$siteObj = json_decode($site);
		echo json_encode($siteObj);
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
		
		incrementVoteCount($id, $firebase);

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

	break;

}

