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
<body>
    <div class="page-wrap">
        <div class="masthead">
            <div class="container splash">
                <div style="margin: auto;">
                    <img id="logo-icon-line" src="img/logo-icon.svg" alt="">
                    <img class="logo-line" src="img/logo.svg" alt="">
                    <img class="logo-line" src="img/sup.svg" alt="">
                </div>
                <h1 style="color: #3dcad7;">Get the pulse of your visitors.</h1>
                <a href="http://app.userballot.com/#/signup" style="" id="save-question" class="signup-btn">Get Started Free!</a>
                <span><a href="http://app.userballot.com/#/login" style="color: #2ecc71; text-decoration: none;">Sign in</a></span>  
            </div>    
        </div>
    </div>
    <div class="container scroll-container">
        <a class="scroll" href="#destination1">Learn More</a>
    </div>
    <div class="page-wrap">        
        <div class="masthead" style="position: absolute; top: 100%;">
            <section id="destination1">
                <div class="content-wrap">
                    <div class="container">
                        <div class="container icon-container" style="padding-top: 50px;">
                            <div class="icon-four">
                                <a href="https://www.facebook.com/pages/Userballot/587625811299982"><img src="img/facebook.svg" alt="" class="social-media"></a>
                            </div>
                            <div class="icon-four">
                                <a href="https://plus.google.com/b/100033594081784228442/100033594081784228442/about"><img src="img/google+.svg" alt="" class="social-media"></a>
                            </div>
                            <div class="icon-four">
                                <a href="http://www.linkedin.com/company/3350090?trk=tyah&trkInfo=tas%3Auserballot"><img src="img/linkedin.svg" alt="" class="social-media"></a>
                            </div>
                            <div class="icon-four">
                                <a href="https://twitter.com/UserBallot"><img src="img/twitter.svg" alt="" class="social-media"></a>
                            </div>
                        </div>
                            <h1 style="padding: 50px 0 0;">Don't leave important decisions to chance!</h1>
                            <p class="subheader center">Getting simple, easy to understand feedback from your users is key to making the right decisions.</p>
                            <div class="container section-container row" style="margin-top: 150px;">
                                <div class="one-third column section-height section-right">
                                    <img src="img/scale.svg" class="vector" alt="">
                                </div>
                                <div class="two-thirds column section-height section-left">
                                    <h1>Simplicity is key.</h1>
                                    <p>Direct answers help you make better decisions.</p>
                                </div>
                            </div>
                            <div class="container section-container row">
                                <div class="one-third column section-height section-left">
                                    <img src="img/chart.svg" class="vector" alt="">
                                </div>
                                <div class="two-thirds column section-height section-right">
                                    <h1>Get answers in real-time.</h1>
                                    <p>See results the second they're answered.</p>
                                </div>
                            </div>
                            <div class="container section-container row">
                                <div class="one-third column section-height section-right">
                                    <img src="img/clock.svg" class="vector" alt="">
                                </div>
                                <div class="two-thirds column section-height section-left">
                                    <h1>Working in minutes.</h1>
                                    <p>Copy and paste 2 lines of code into your site and it just works!</p>
                                </div>
                            </div>
                            <div class="container section-container row">
                                <div class="one-third column section-height section-left">
                                    <img src="img/location.svg" class="vector">
                                </div>
                                <div class="two-thirds column section-height section-right">
                                    <h1>See important demographics.</h1>
                                    <p>Know your audience.<br>Be <strong>driven</strong> by response.</p>
                                </div>
                            </div>
                            <div class="container section-container row">
                                <div class="one-third column section-height section-right">
                                    <img src="img/focus.svg" class="vector">
                                </div>
                                <div class="two-thirds column section-height section-left">
                                    <h1>Focus on what's essential.</h1>
                                    <p>Use our analytics to focus on the answers <strong>you</strong> care about.</p>
                                </div>
                            </div>
                            <div class="container funnel">
                                <a href="http://app.userballot.com/#/signup" id="save-question" class="signup-btn product-button">Try It Free!</a>
                                <a href="/pricing.php" style="margin-left: 20px;" id="save-question" class="signup-btn product-button">See Our Plans!</a>
                            </div>
                    </div>
                    <?php
                        include('inc/footer.php');
                    ?>
                    </div>         
                </div>
            </section>
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
