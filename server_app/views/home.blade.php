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
                <a href="http://app.userballot.com/#/signup" id="save-question" class="signup-btn" style="margin-bottom: 5px;">Get Started Free!</a>
                <span><a href="http://app.userballot.com/#/login" style="color: #2ecc71; text-decoration: none;">Sign in</a></span>  
            </div>    
        </div>
    </div>
    <div class="container scroll-container"><!-- bs -->
        <a class="scroll" href="#product">Learn More</a>
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
                            <h1 style="padding: 50px 0 20px;">Don't leave important decisions to chance!</h1>
                            <p class="subheader center">Getting simple, easy to understand feedback from your users is key to making the right decisions. UserBallot is a simple feedback gathering tool that lets you get answers from more of your customers than ever before.</p>
                            <div class="container section-container row" style="margin-top: 150px;"> <!-- bs -->
                                <div class="one-third column section-height section-right"> <!-- bs -->
                                    <img src="img/scale.svg" class="vector" alt="">
                                </div>
                                <div class="two-thirds column section-height section-left"> <!-- bs -->
                                    <h1>Simplicity is key.</h1>
                                    <p>Simple to implement, and simple to answer questions help you get the directional feedback you need to make better decisions. Limited to 99 characters, and requiring only one touch to answer, UserBallots provide a truly simple user experience that won't distract your visitors!</p>
                                </div>
                            </div>
                            <div class="container section-container row"> <!-- bs -->
                                <div class="one-third column section-height section-left"> <!-- bs -->
                                    <img src="img/chart.svg" class="vector" alt="">
                                </div>
                                <div class="two-thirds column section-height section-right"> <!-- bs -->
                                    <h1>You're in control!</h1>
                                    <p>The Control Center is the place you go to create questions, and get real-time results from your users.<!-- , and view analytics about the people answering your questions. --> Create simple yes or no feedback questions based on suggestions we provide, or your own ideas.</p>
                                </div>
                            </div>
                            <div class="container section-container row"> <!-- bs -->
                                <div class="one-third column section-height section-right"> <!-- bs -->
                                    <img src="img/clock.svg" class="vector" alt="">
                                </div>
                                <div class="two-thirds column section-height section-left"> <!-- bs -->
                                    <h1>Working in minutes.</h1>
                                    <p>UserBallot is easy to use! Just copy and paste two lines of code into your website and you’re set. We give you step by step instructions, so whether you are a do-it-yourselfer, have a webmaster that supports you, or use Wordpress we have you covered!</p>
                                </div>
                            </div>
                            <!-- <div class="container section-container row"> 
                                <div class="one-third column section-height section-left">
                                    <img src="img/location.svg" class="vector">
                                </div>
                                <div class="two-thirds column section-height section-right">
                                    <h1>See important demographics.</h1>
                                    <p>Beyond the questions, our built in analytics give you powerful insight into who your audience is! See what's essential and use our analytics to focus on the answers you care about. Know your audience. Be <strong>driven</strong> by response.</p>
                                </div>
                            </div> --> <!-- bs -->
                            <div class="container funnel"> <!-- bs -->
                                <a href="http://app.userballot.com/#/signup" id="save-question" class="signup-btn product-button">Try It Free!</a>
                                <a href="/pricing.php" style="margin-left: 20px;" id="save-question" class="signup-btn product-button">See Our Plans!</a>
                            </div>
                        </div>
                    	@include("includes/footer")
                    </div>         
                </div>
            </section>
        </div>
    </div>

@stop
