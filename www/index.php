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
    <?php
        include('inc/topnav.php');
    ?>
    <div class="page-wrap">        
        <!-- masthead -->
        <div class="masthead">
            <div class="container five columns innerMasthead">
                <div class="motto">
                    <h1>Get the pulse of your visitors.</h1>
                    <p>Easily validate new ideas, products, and services using yes or no questions <strong>before</strong> you waste valuable time and money.</p>
                </div>
                <div class="five columns alpha omega" id="button-padding" style="float: right">
                    <a href="http://app.userballot.com/#/signup" style="" id="save-question" class="signup-btn">Get Started Today!</a>
                    <p class="free">Sign Up <strong>Free!</strong></p>
                </div>
            </div>    
            <div class="container content-wrap">
                <div class="sixteen columns">
                    <div class="row">  
                    </div>
                </div>
            </div>
        </div>
        <!-- The container is a centered 960px -->
        <div class="bottom">
            <div class="container content-wrap feature-block" style="padding-bottom: 40px;">
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
                                <p>Copy and paste 2 lines of code into your site and it just works!</p>
                            </div>
                        </div>
                    </div>         
            </div>
        </div>
        <!-- To be added with analytics-->
        <div class="bottom" id="thirdBar">
            <div class="content-wrap feature-block">
                <div>
                    <div>
                        <h1 id="see">See <strong>who</strong> is answering your questions.</h1>
                    </div>
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
