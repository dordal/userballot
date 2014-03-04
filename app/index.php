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
    <title>UserBallot - Control Center</title>
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Mobile Specific Metas
  ================================================== -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <!-- CSS
  ================================================== -->
    <link rel="stylesheet" href="styles/components/topcoat-desktop-light.css">
    <link rel="stylesheet" href="styles/grid/skeleton.css">
    <link rel="stylesheet" href="styles/treatments.css">
    <link rel='stylesheet' href="spectrum/spectrum.css">

    <!--[if lt IE 9]>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    <!-- Favicons
    ================================================== -->
    <link rel="shortcut icon" href="img/favicon.png">
    <!-- <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png"> -->

</head>
    <body ng-app="userballotApp">

        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
        <![endif]-->
        
        <!--[if lt IE 9]>
            <script src="scripts/vendor/es5-shim.min.js"></script>
            <script src="scripts/vendor/json3.min.js"></script>
        <![endif]-->

        <!-- action message -->
        <div class="action-message hide"></div>

        <!-- Add your site or application content here -->
        <div class="container" ng-view></div>

        <script src="scripts/jquery-2.0.3.min.js"></script>
        <script src="scripts/jquery-ui-1.10.3.custom.min.js"></script>
        <!--<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.2/angular.min.js"></script>-->
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" ></script>
        <script src="//cdn.firebase.com/v0/firebase.js"></script>
        <script src="//cdn.firebase.com/v0/firebase-simple-login.js"></script>
        <script src="//cdn.firebase.com/libs/angularfire/0.3.0/angularfire.min.js"></script>
        <script src="https://js.stripe.com/v2/"></script>

        <!-- build:js scripts/scripts.js -->
        <script src="scripts/app.js"></script>
        <script src="scripts/services/auth.js"></script>
        <script src="scripts/controllers/login.js"></script>
        <script src="scripts/controllers/loading.js"></script>
        <script src="scripts/controllers/signup.js"></script>
        <script src="scripts/controllers/adminarea.js"></script>
        <script src="scripts/controllers/order.js"></script>
        <script src="scripts/directives/equal.js"></script>
        <script src="scripts/ui-interactions.js"></script>
        <script src="spectrum/spectrum.js"></script>
        <!-- endbuild -->

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

              ga('create', '<?php echo GA_USERAGENT ?>', 'userballot.com');
              ga('send', 'pageview');
        </script>
        
    </body>
</html>
