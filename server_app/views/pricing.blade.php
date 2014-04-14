@extends('layout.master')

@section('content')
		<div class="page-wrap" style="height: 100%;">        
		    <div class="masthead"> 
		        <h1>A plan just for you.</h1>
		        <p style="text-align: center; width: 50%; margin: auto;">We have a plan for just about anyone. Whether you have a low volume site that only needs a small amount of reponses or one that needs, a large amount, we have you covered!</p>
		        <br>
		        <div class="container pricing-container">
		        	<div class="pricing pricing-border">
		        		<h1>Trial</h1>
		        		<p>Try Us <strong>Free!</strong></p>
		        		<br>
		        		<h1 class="second">Free</h1>
		        		<br><br>
		        		<p><strong>50</strong> Responses Monthly</p>
		        		<br>
		        		<!-- <p style="text-decoration: underline;">Question Analytics Included</p> -->
		        		<br><br>
		        		<a class="buy-btn" plan="trial">Try Us Out</a>
		        	</div>
		        	<div class="pricing pricing-border">
		        		<h1>Entry</h1>
		        		<p>Most Affordable!</p>
		        		<br>
		        		<h1 class="second">$9</h1>
		        		<p>per month</p>
		        		<br>
		        		<p><strong>2,500</strong> Responses Monthly</p>
		        		<br>
		        		<!-- <p style="text-decoration: underline;">Question Analytics Included</p> -->
		        		<br><br>
		        		<a class="buy-btn" plan="entry">Let's Rock</a>
		        	</div>
		        	<div class="pricing pricing-border">
		        		<h1>Standard</h1>
		        		<p>Triple the Responses!</p>
		        		<br>
		        		<h1 class="second">$19</h1>
		        		<p>per month</p>
		        		<br>
		        		<p><strong>7,500</strong> Responses Monthly</p>
		        		<br>
		        		<!-- <p style="text-decoration: underline;">Question Analytics Included</p> -->
		        		<br><br>
		        		<a class="buy-btn" plan="standard">Time to Roll</a>
		        	</div>
		        	<div class="pricing">
		        		<h1>Deluxe</h1>
		        		<p>Best Value!</p>
		        		<br>
		        		<h1 class="second">$29</h1>
		        		<p>per month</p>
		        		<br>
		        		<p><strong>25,000</strong> Responses Monthly</p>
		        		<br>
		        		<!-- <p style="text-decoration: underline;">Question Analytics Included</p> -->
		        		<br><br>
		        		<a class="buy-btn" plan="deluxe" >Super Size Me</a>
		        	</div>
	        	</div>
		        <p id="custom-order" style="text-align: center;">For high volume and custom orders, contact us at <a href="mailto:info@userballot.com"><strong>info@userballot.com</strong></a>.</p>
		   		<input type="hidden" id="app-url" value="<?php echo UB_APP_DOMAIN?>">
	        </div>
	        <br><br><br>
		</div>
		
	    @include('includes/footer');
	    

@stop