<?php
    include('inc/environment.php');
?>
<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->

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
<body class="home">
    <div class="page-wrap">
        <div class="masthead">
            <div class="container splash">
                <div style="margin: auto;">
                    <img style="height: 80px; margin-right: 10px;" src="img/logo-icon.svg" alt="">
                    <img style="height: 60px; margin-bottom: 10px;" src="img/logo.svg" alt="">
                    <img style="height: 60px; margin-bottom: 10px;" src="img/sup.svg" alt="">
                </div>
                <h1 style="color: #3dcad7;">Get the pulse of your visitors.</h1>
                <a href="http://app.userballot.com/#/signup" style="" id="save-question" class="signup-btn">Get Started Free!</a>
                <span>or </span> <span><a href="app.userballot.com/login" style="color: #2ecc71; text-decoration: none;">Sign in</a></span>
                <!-- Footer -->
                <div class="container">
                    <div style="text-align: center; margin-top: 450px;">
                        <span>
                            <a class="nav" href="/ourproduct.php">Product</a>
                            &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                            <a class="nav" href="/pricing.php">Pricing</a>
                            &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                            <a class="nav" href="/faq.php">FAQ</a>
                            &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                            <a class="nav" href="/ourstory.php">About Us</a>
                            &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                            <a class="nav" href="/contact.php">Contact Us</a>
                        </span>
                    </div>
                </div>
            </div>    
        </div>
    </div>
    <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', '<?php echo GA_USERAGENT ?>', 'userballot.com');
          ga('send', 'pageview');
    </script>
<!-- UserBallot: Add this before the closing body tag  -->
</body>
</html>
