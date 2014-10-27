@extends('layout.master')

@section('content')
<div class="page-wrap" style="height: 100%;">        
    <div class="masthead">
        <div class="container">
            <div class="text">
                <h1 class="h1-headline">Founder's Accounts - Always Free</h1>
                <p>UserBallot is completely free to use during our beta period. Signup now, and you'll get a free 'founder's account' for life &mdash; you'll never have to pay for any site you add to our system while in beta.</p>
                <p>We'll reveal more details on our paid accounts soon.</p>
                <p>&nbsp;</p>
                <a href="{{UB_APP_DOMAIN}}#/signup" id="save-question" class="signup-btn">Try It Free!</a>
                <br>
                <!-- disable pricing plans -->
                <!--
                <div class="container pricing-container">
                	<div class="pricing pricing-border">
                		<h1>Trial</h1>
                        <p>Try Us <strong>Free!</strong></p>
                        <br><br>
                        <span class="second numbers">FREE</span>
                        <br><br><br>
                        <p><strong>50</strong> Responses Monthly</p>
                        <br>
                        <br><br>
                        <a style="" class="buy-btn" plan="trial">FREE</a>
                	</div>
                	<div class="pricing pricing-border">
                        <h1>Entry</h1>
                        <p>Most Affordable!</p>
                        <br><br>
                        <span class="second numbers">$9</span><span class="mo">/MO</span>
                        <br><br><br>
                        <p><strong>2,500</strong> Responses Monthly</p>
                        <br>
                        <br><br>
                        <a style="" class="buy-btn" plan="entry">ENTRY</a>
                	</div>
                	<div class="pricing pricing-border">
                        <h1>Standard</h1>
                        <p>Double the Responses!</p>
                        <br><br>
                        <span class="second numbers">$19</span><span class="mo">/MO</span>
                        <br><br><br>
                        <p><strong>5,000</strong> Responses Monthly</p>
                        <br>
                        <br><br>
                        <a style="" class="buy-btn" plan="standard">STANDARD</a>
                	</div>
                	<div class="pricing">
                        <h1>Deluxe</h1>
                        <p>Best Value!</p>
                        <br><br>
                        <span class="second numbers">$29</span><span class="mo">/MO</span>
                        <br><br><br>
                        <p><strong>25,000</strong> Responses Monthly</p>
                        <br>
                        <br><br>
                        <a style="" class="buy-btn" plan="delux" >DELUXE</a>
                	</div>
            	</div>
                <p id="custom-order" style="text-align: center;">For high volume and custom orders, contact us at <a href="mailto:info@userballot.com"><strong>info@userballot.com</strong></a>.</p>
           		<input type="hidden" id="app-url" value="{{UB_APP_DOMAIN}}">
            -->
            </div>
        </div>
    </div>
</div>

@stop