<?php
	include('inc/environment.php');
?>
<!DOCTYPE html>
<html style="height: 100%;">
	<head>
		 <!-- Basic Page Needs
	    ================================================== -->
    	<meta charset="utf-8">
	    <title>UserBallot | Pricing</title>
    	<meta name="description" content="">
    	<meta name="author" content="">

	    <?php
    	    include('inc/head.php');
	    ?>
	</head>
	<body class="page">
		<?php
        	include('inc/topnav.php');
    	?>
		<div class="page-wrap" style="height: 100%;">        
		    <div class="masthead"> 
		        <h1>A plan just for you.</h1>
		        <p style="text-align: center; width: 50%; margin: auto;">We have a plan for just about anyone. Whether you have a low volume site that only needs a small amount of reponses or one that needs, a large amount, we have you covered!</p>
		        <br>
		        <div class="container pricing-container">
		        	<div class="pricing pricing-border">
		        		<h1>Trial</h1>
		        		<p>Try Us <strong>Free!</strong></p>
		        		<br><br>
		        		<span class="second numbers">FREE</span>
		        		<br><br><br>
		        		<p><strong>50</strong> Responses Monthly</p>
		        		<br>
		        		<br><br>
		        		<a style="" class="buy-btn" plan="trial">FREE</a>
		        	</div>
		        	<div class="pricing pricing-border">
		        		<h1>Entry</h1>
		        		<p>Most Affordable!</p>
		        		<br><br>
		        		<span class="second numbers">$9</span><span class="mo">/MO</span>
		        		<br><br><br>
		        		<p><strong>2,500</strong> Responses Monthly</p>
		        		<br>
		        		<br><br>
		        		<a style="" class="buy-btn" plan="entry">ENTRY</a>
		        	</div>
		        	<div class="pricing pricing-border">
		        		<h1>Standard</h1>
		        		<p>Double the Responses!</p>
		        		<br><br>
		        		<span class="second numbers">$19</span><span class="mo">/MO</span>
		        		<br><br><br>
		        		<p><strong>5,000</strong> Responses Monthly</p>
		        		<br>
		        		<br><br>
		        		<a style="" class="buy-btn" plan="standard">STANDARD</a>
		        	</div>
		        	<div class="pricing">
		        		<h1>Deluxe</h1>
		        		<p>Best Value!</p>
		        		<br><br>
		        		<span class="second numbers">$29</span><span class="mo">/MO</span>
		        		<br><br><br>
		        		<p><strong>25,000</strong> Responses Monthly</p>
		        		<br>
		        		<br><br>
		        		<a style="" class="buy-btn" plan="delux" >DELUXE</a>
		        	</div>
	        	</div>
	        	<br>
		        <p id="custom-order" style="text-align: center;">For high volume and custom orders, contact us at <a href="mailto:info@userballot.com"><strong>info@userballot.com</strong></a>.</p>
		   		<input type="hidden" id="app-url" value="<?php echo UB_APP_DOMAIN?>">
	        </div>
	        <br><br><br>
		</div>
		<?php
	    	include('inc/footer.php');
	    ?>
	</body>
</html>