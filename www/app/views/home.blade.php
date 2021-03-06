@extends('layout.master')

@section('content')

	<div class="page-wrap">
        <div class="masthead">
            <div class="container splash"> <!-- bs -->
                <div style="margin: auto;">
                    <img id="logo-icon-line" src="img/logo-icon.svg" alt="">
                    <img class="logo-line" src="img/logo.svg" alt="">
                    <img class="logo-line" src="img/sup.svg" alt="">
                </div>
                <h1 style="color: #3dcad7;">Get the pulse of your visitors.</h1>
                <br><br>
                <a href="{{UB_APP_DOMAIN}}#/signup/" id="save-question" class="signup-btn" style="margin-bottom: 5px;">Get Started Free!</a>
                <span><a href="{{UB_APP_DOMAIN}}#/login/" style="color: #2ecc71; text-decoration: none;">Sign in</a></span>  
            </div>    
        </div>
    </div>
    <div class="container scroll-container"><!-- bs -->
        <a class="scroll ubb" href="#product">Learn More</a>
    </div>
    <div class="page-wrap">        
        <div class="masthead" style="position: absolute; top: 100%;">
            <section id="product">
                <div class="content-wrap">
                    <div class="container"> <!-- bs -->
                        <div class="container icon-container" style="padding-top: 50px;"> <!-- bs -->
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
                        <h1 class="h1-headline" style="padding: 50px 0 20px;">What's a UserBallot?</h1>
                        <div class="section-height subheader">
                            <p>A UserBallot is a simple <a href="/faq/#faq5">yes or no question</a> you create that appears as a footer on your website and <i>gently</i> nudges your site visitors to engage! Getting simple, easy to understand feedback from your users is a step in the right direction toward making better decisions.</p>
                        </div>                        
                        <div class="container section-container row" style="margin-top: 150px;"> <!-- bs -->
                            <div class="one-third column section-height section-right"> <!-- bs -->
                                <img src="img/long.svg" class="vector" alt="">
                            </div>
                            <div class="two-thirds column section-height section-left"> <!-- bs -->
                                <h1>The Problem</h1>
                                <p>Your online customers have short attention spans!   Getting online customers to complete <a href="/faq/#faq10">traditional surveys</a> or just to engage with you is a problem you may have experienced.   Think about your own reaction when asked to take a ‘few minutes’ to complete a survey.  </p>
                            </div>
                        </div>
                        <div class="container section-container row"> <!-- bs -->
                            <div class="one-third column section-height section-left"> <!-- bs -->
                                <img src="img/touch.svg" class="vector" alt="">
                            </div>
                            <div class="two-thirds column section-height section-right"> <!-- bs -->
                                <h1>Seamless Feedback</h1>
                                <p>Take the friction out of the <a href="/faq/#faq5">customer feedback experience </a> and hear from more of your online visitors!  Limited to one question and requiring only one touch to answer, <a href="/faq/#faq6">UserBallots</a> provide an elegant experience for your users and the directional feedback you need to make better decisions.</p>
                            </div>
                        </div>
                        <div class="container section-container row"> <!-- bs -->
                            <div class="one-third column section-height section-right"> <!-- bs -->
                                <img src="img/me.svg" class="vector" alt="">
                            </div>
                            <div class="two-thirds column section-height section-left"> <!-- bs -->
                                <h1>Is this for me?</h1>
                                <p>If you have an online presence and a desire to be better connected to your users, you can benefit by becoming part of the UserBallot world!   E-commerce site owners, bloggers, software startups, tech companies, political campaigners, government and non-governmental organizations are just some of the people benefiting.  </p>
                            </div>
                        </div>
                        <div class="container section-container row"> 
                            <div class="one-third column section-height section-left">
                                <img src="img/joy.svg" class="vector">
                            </div>
                            <div class="two-thirds column section-height section-right">
                                <h1>You're in Control!</h1>
                                <p>An easy to use Control Center puts <a href="/faq/#faq4">question creation </a> and results at your fingertips!  Create short, simple yes or no feedback questions based on suggestions we provide, or your own ideas.  See how your questions are performing in terms of response rate and numbers of yes versus no answers in real time!</p>
                            </div>
                        </div> <!-- bs -->
                        <div class="container section-container row"> <!-- bs -->
                            <div class="one-third column section-height section-right"> <!-- bs -->
                                <img src="img/create.svg" class="vector" alt="">
                            </div>
                            <div class="two-thirds column section-height section-left"> <!-- bs -->
                                <h1>You Create the Look and Feel</h1>
                                <p>UserBallot is a simple to use customer feedback platform for serving up simple yes or no questions to your mobile and web site visitors alike.  We've improved your Control Center and given you the ability to customize the look and feel of your 'UserBallots'.  Feel free to take a look!</p>
                            </div>
                        </div>
                        <div class="container section-container row"> 
                            <div class="one-third column section-height section-left">
                                <img src="img/watch.svg" class="vector">
                            </div>
                            <div class="two-thirds column section-height section-right">
                                <h1>Getting Started</h1>
                                <p>You’re only minutes away from a better way to get online customer feedback! <a href="{{UB_APP_DOMAIN}}#/signup">Sign up</a> for an account.   Embed the code or have your website guy embed it for you.   Use our plug-in if you’re a wordpress.org site owner / manager.   Go!  Your Control Center is the place to start creating questions and getting results!</p>
                            </div>
                        </div><!-- bs -->
                        <div class="container funnel"> <!-- bs -->
                            <div class="bottom-funnel">
                                <a href="{{UB_APP_DOMAIN}}#/signup" id="save-question" class="signup-btn">Try It Free!</a>
                            </div>
                        </div>
                    </div>
                     @include('includes/footer')   
                </div>
            </section>
        </div>
    </div>
@stop
