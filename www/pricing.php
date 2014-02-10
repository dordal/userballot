<?php
	include('inc/environment.php');
?>
<!DOCTYPE html>
<html>
	<head>
		 <!-- Basic Page Needs
	    ================================================== -->
    	<meta charset="utf-8">
	    <title>UserBallot</title>
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
		<div class="page-wrap">        
		    <div class="masthead">
	            <div class="twelve columns alpha">
	                <div class="page-title">
	                    <h1>Plans and Pricing</h1>
	                </div>
	            </div>
	        </div>      
		    <div class="container">
	        	<ul  style="width: 500px">
	        		<li>
	        			<h2>Price plan 1</h2>
	        			<button style="float:right" plan="test-plan-1" type="button" class="plan-button topcoat-button--large--cta">Order Now</button>
	        			<p>Features</p>
	        			<ul>
							<li>This and that</li>
							<li>The other thing</li>
						</ul>
      				</li>
	        		<li>
	        			<h2>Price plan 2</h2>
	        			<button style="float:right" plan="test-plan-2" type="button" class="plan-button topcoat-button--large--cta">Order Now</button>
	        			<p>Features</p>
	        			<ul>
							<li>More good stuff</li>
							<li>The kitchen sink</li>
						</ul>
						
      				</li>

	        	</ul>
	   		</div>
	   		<input type="hidden" id="app-url" value="<?php echo UB_APP_DOMAIN?>"
	        <!-- footer -->
	        <div class="footer">
	            &copy;UserBallot.com
	        </div>
    </div>
	</body>
</html>