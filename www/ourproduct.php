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
    <div class="page-wrap">        
	    <div class="masthead">
            <div class="container content-wrap">
                <div class="row home">
                    <h1 style="padding: 0;">Don't leave important decisions to chance!</h1>
                    <p class="subheader center">Getting simple, easy to understand feedback from your users is key to making the right decisions.</p>
                    <div class="feature-triple">
                        <div class="one-third column left">
                            <img src="img/scale.svg" class="vector" alt="">
                            <h1>Simplicity is key.</h1>
                            <p>Direct answers help you make better decisions.</p>
                        </div>
                        <div class="one-third column left">
                            <img src="img/chart.svg" class="vector" alt="">
                            <h1>Get answers in real-time.</h1>
                            <p>See results the second they're answered.</p>
                        </div>
                        <div class="one-third column left">
                            <img src="img/clock.svg" class="vector" alt="">
                            <h1>Working in minutes.</h1>
                            <p>Copy and paste 2 lines of code into your site and it just works!</p>
                        </div>
                    </div>
                    <div class="icon-feature-four">
                        <div class="icon-feature-left">
                            <a href="https://www.facebook.com/pages/Userballot/587625811299982"><img src="img/facebook.svg" alt="" class="social-media"></a>
                        </div>
                        <div class="icon-feature-left">
                            <a href="https://plus.google.com/b/100033594081784228442/100033594081784228442/about"><img src="img/google+.svg" alt="" class="social-media"></a>
                        </div>
                        <div class="icon-feature-left">
                            <a href="http://www.linkedin.com/company/3350090?trk=tyah&trkInfo=tas%3Auserballot"><img src="img/linkedin.svg" alt="" class="social-media"></a>
                        </div>
                        <div class="icon-feature-left">
                            <a href="https://twitter.com/UserBallot"><img src="img/twitter.svg" alt="" class="social-media"></a>
                        </div>
                    </div>
                </div>         
            </div>
        <div id="secondBar">
            <div class="content-wrap feature-block">
                <h1 id="see">See <strong>who</strong> is answering your questions.</h1>
                <div id="doubleContainer">
                    <div id="double">
                        <div id="double-left">
                            <div class="analytics-container"><img class="analytics-icons" src="img/location.svg"></div>
                            <h1>See important demographics.</h1>
                            <p>Know your audience.<br>Be <strong>driven</strong> by response.</p>
                        </div>
                        <div id="double-right">
                            <div class="analytics-container"><img class="analytics-icons" src="img/focus.svg"></div>
                            <h1>Focus on what's essential.</h1>
                            <p>Use our analytics to focus on the answers <strong>you</strong> care about.</p>
                        </div>
                    </div>
                </div>
                <div id="funnel">
                    <span><a href="http://app.userballot.com/#/signup" id="save-question" class="signup-btn product-button">Try It Free!</a></span>
                    <span><a href="/pricing.php" style="margin-left: 20px;" id="save-question" class="signup-btn product-button">See Our Plans!</a></span>
                </div>
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
