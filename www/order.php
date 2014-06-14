<?php
	include('inc/environment.php');

    $planId = $_GET['plan'];
    // Sanitize this
    if (!is_numeric($planId)) {
        throw new Exception("Invalid plan!");
    }

    // TODO: this form should detect if you are already logged in,
    // and not display the username / password fields if you are.


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
		
        <div class="masthead">
            <div class="twelve columns alpha">
                <div class="page-title">
                    <h1>Order</h1>
                </div>
            </div>
        </div>      
        <div class="container">

            <form class="css-form">

                <h3>Sign In</h3>

                <div class="form-section-title"></div>

                <!-- general error message -->
                <div class="public-form-error-message">
                  {{error}}
                </div>

                <!-- email address -->
                <input type="text" class="fresh-text-input signup-input-wide"  ng-model="email" required placeholder="Email Address" /><br/>

                <!-- error message -->
                <div ng-show="emailError" class="public-form-error-message">
                    {emailError}}
                </div>
                <!-- error message -->
                <div ng-show="passwdError" class="public-form-error-message">
                  {{passwdError}}
                </div>

                <!-- password -->
                <input type="password" class="fresh-text-input signup-input-wide"  ng-model="password" required placeholder="Password" /><br/>



                <input type="submit" class="login-btn" name="submit" value="Place Order" />

            </form>

        </div>
        <!-- footer -->
        <div class="footer">
            &copy;UserBallot.com
        </div>
    </div>
	</body>
</html>