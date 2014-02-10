<?php

/*
 * Order.php -- handles the submit function for the order form.
 * Subscribes the user to the plan in Stripe.
 */

include('inc/environment.php');
include('lib/Stripe.php');

// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://manage.stripe.com/account
Stripe::setApiKey(STRIPE_SECRET_KEY);

// Get the credit card details submitted by the form
$token = $_POST['stripeToken'];

$response = new stdClass();

try {
	$customer = Stripe_Customer::create(array(
	  "card" => $token,
	  "plan" => $_POST['plan'],
	  "email" => $_POST['email'])
	);

	$response->success = true;
	$response->customer = $customer;

} catch (Exception $e) {
	$response->success = false;
	$response->error = $e->getMessage();
}


echo json_encode($response);
