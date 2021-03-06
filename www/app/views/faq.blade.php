@extends('layout.master')

@section('content')

 <div class="page-wrap" style="margin-top: 50px">        
    <div class="masthead">
        <div class="faq">
            <h1 class="h1-headline">FAQ</h1>
            <ol>
                <li><a class="scroll faq-scroll" href="#faq1">What is UserBallot?</a></li>
                <li><a class="scroll faq-scroll" href="#faq2">How do I get started with UserBallot?</a></li>
                <li><a class="scroll faq-scroll" href="#faq3">How do I create questions with UserBallot?</a></li>
                <li><a class="scroll faq-scroll" href="#faq4">Can I control whether a question is active or not?</a></li>
                <li><a class="scroll faq-scroll" href="#faq5">Why only yes or no questions?</a></li>
                <li><a class="scroll faq-scroll" href="#faq6">Which questions will my customers see?</a></li>
                <li><a class="scroll faq-scroll" href="#faq7">What kind of results will I receive from my site visitors?</a></li>
                <li><a class="scroll faq-scroll" href="#faq8">How much does UserBallot cost?</a></li>
                <li><a class="scroll faq-scroll" href="#faq9">Is there a free version of your service?</a></li>
                <li><a class="scroll faq-scroll" href="#faq10">Why would I use UserBallot compared to other feedback tools?</a></li>
            </ol>

            <h1 id="faq1">What is UserBallot?</h1> 
            <p>UserBallot is a simple decision support tool which allows online businesses to collect directional feedback from all of their site visitors and therefore make better business decisions.</p>
            <h1 id="faq2">How do I get started with UserBallot?</h1>
            <p>Embed the code snippet in your website, have your website editor do the same or download the plug-in for Wordpress and follow the instructions and you should be good to go.  Just create a username and password and go to ‘Get Started’.</p>
            <h1 id="faq3">How do you create questions with UserBallot?</h1>
            <p>The Control Center is the place you go to create questions, and get results from your users. Creating a question is as easy as posting a status update on your favorite social media site!</p>
            <h1 id="faq4">Can I control whether a question is active or not?</h1>
            <p>Absolutely!  You can turn questions on or off in the Control Center.</p>                
            <h1 id="faq5">Why only yes/no formatted questions?</h1>
            <p>Yes/no formatted questions are meant to create a low 'cognitive overhead' for your users.  That sounds wonky - what you really want are quick polls that are as easy to answer as to dismiss so that you end up with directional feedback from all  of your site visitors.  This will allow you to get the pulse of your visitors quickly.</p>                
            <h1 id="faq6">Which questions will my customers see?</h1>
            <p>The UserBallot software randomly assigns questions to your site visitors.  You can set how many days you would like between questions being shown up to an individual user.</p>
            <h1 id="faq7">What kind of results will I receive from my site visitors?</h1>
            <p>You will see cumulative total numbers of ‘Yes’  and ‘No’ responses.  You can see these in real time if you like.  You will also see the number of people exposed to a question.</p>                
            <!-- <h1>What can I find out about my users?</h1>
            <p>In addition to the directional feedback to each of your questions, you will be able to gain insights about who is answering your questions.  You will be able to filter your results based on location data, browser type, device, time spent on a question, and more.</p> -->                
            <h1 id="faq8">How much does UserBallot cost?</h1>
            <p>You can use UserBallot free for up to 50 responses monthly.  Website owners wanting more feedback will benefit greatly by choosing one of our monthly subscription plans.  The first tier plan is very affordable and all plans can bring you tremendous value in the form of responses from all of your site visitors. You can look at our pricing <a href="/pricing">here!</a></p>                
            <p>We are taking this approach so we can provide as much value as possible to as many people possible.</p>
            <h1 id="faq9">Is there a free version of your service?</h1>
            <p>Yes, UserBallot is free for up to 50 responses per month so you don't need to commit to our service without test driving it first.</p>
            <h1 id="faq10">Why would I use UserBallot compared to other feedback tools?</h1>
            <p>UserBallot is an easy to use, affordable feedback tool, designed to help you get the pulse of your site visitors.  Our unique yes / no ,  one touch answer format is unobtrusive and has been designed to allow you to gain feedback from all of your site visitors.  This design addresses the twin problems of low response rates and responses primarily from the extremes of your user base.  It’s easy for you and easy for your online audience.</p>
            <p>UserBallot works perfectly, whether on it’s own or with other methods you may deploy.</p>
            <br><br><br><br><br>
        </div>
            
    </div> 
    <div class="container funnel"> <!-- bs -->
        <div class="bottom-funnel">
            <a href="{{UB_APP_DOMAIN}}#/signup" id="save-question" class="signup-btn">Try It Free!</a>
        </div>
    </div>
</div>

@stop