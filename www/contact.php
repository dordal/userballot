<?php
    include('inc/environment.php');
?>
<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->

<html lang="en"> <!--<![endif]-->
    <head>
        <!-- Basic Page Needs
        ================================================== -->
        <meta charset="utf-8">
        <title>UserBallot | Contact</title>
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
    		    <div class="container">
                        <h1>We value your feedback!</h1>
                        <div class="container">
                            <form action="send_mail.php" method="post" id="commentBoxContainer">
                                <input class="commentBox fresh-text-input" placeholder="Email" name="email_address">
                                <input type="text" class="commentBox fresh-text-input" placeholder="Subject" name="subject">
                                <textarea type="text" class="commentBox fresh-text-input" id="comment" placeholder="Comment" name="comments"></textarea>
                                <input type="submit" class="commentBox fresh-text-input" id="submit" value="Submit" style="text-align: center; font-weight: normal; font-size: 22px;"></input>
                            </form>
                        </div>
                        <p style="margin: 0 0px 20px; padding-top: 0px; text-align: center; margin-top: 20px; margin-bottom: 350px;">
                            For other general inquiries, please email us at 
                        <strong><a href="mailto:info@userballot.com">info@userballot.com</a></strong>.
                        </p>
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
    </body>
</html>
