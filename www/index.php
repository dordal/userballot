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
    <title>UserBallot - Quick Website Feedback</title>
    <meta name="description" content="">
    <meta name="author" content="">

    <?php
        include('inc/head.php');
    ?>
</head>
<body class="home">
    <?php
        include('inc/topnav.php');
    ?>
    <div class="page-wrap">        
        <!-- masthead -->
        <div class="masthead">
        <div class="twelve columns alpha">
            <div class="motto">
                <h1>Make better business decisions before it's too late.</h1>
                <p>Quickly validate ideas, products and services with your target audience <strong>before</strong> you waste <br>valuable time and money going in the wrong direction.</p>
            </div>
        </div>
            <div class="container content-wrap">
                <div class="sixteen columns">
                    <div class="row">
                        <div class="eight columns alpha omega">
                            <div class="demo"></div>
                        </div>
                        <div class="eight columns alpha omega">
                            <a href="http://app.userballot.com/#/signup" style="" id="save-question" class="signup-btn">Get Started Today</a>
                            <p class="free">Sign Up Free!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- The container is a centered 960px -->
        <div class="bottom">
            <div class="container content-wrap feature-block">
                    <div class="row">
                        <h1 class="chance">Don't leave important decisions to chance!</h1>
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
                                <img src="img/clock.svg" class="clock" alt="">
                                <h1>Working in minutes.</h1>
                                <p>Paste a small bit of code into your site and it works!</p>
                            </div>
                        </div>
                    </div>         
                <div class="content-wrap icon-feature sixteen columns">
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
        </div>     
        <!-- footer -->
        <div class="footer">
            <img src="img/rackspace.svg" id="rackspace"></img>
            <div id="copyright">&copy;UserBallot.com</div>
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
<script type="text/javascript">var $ub = window.$ub || {};$ub.siteId = '-J9G9EIDUHVaZMRqI3M-';</script><script src="http://app.userballot.com/client.js"></script>
</body>
</html>
