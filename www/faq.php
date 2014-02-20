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
    <title>UserBallot | Our Product</title>
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
    <div class="page-wrap" style="margin-top: 50px">        
	    <div class="masthead">
            <div style="height: 50px; margin: auto; width: 584px;">
                <span><a href="http://app.userballot.com/#/signup" style="margin: 0; float: left;" id="save-question" class="signup-btn">Try It Free!</a></span>
                <span><a href="/pricing.php" style="margin: 0; float: left; margin-left: 20px;" id="save-question" class="signup-btn">See Our Plans!</a></span>
            </div>
        </div> 
    </div>
    <!-- footer -->
    <?php
        include('inc/footer.php');
    ?>
    <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-45967588-1', 'userballot.com');
          ga('send', 'pageview');
    </script>
    <script type="text/javascript">var $ub = window.$ub || {};$ub.siteId = '-J9G9EIDUHVaZMRqI3M-';</script><script src="http://app.userballot.com/client.js"></script>
</body>
</html>
