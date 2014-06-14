@extends('layout.master')

@section('content')

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

@stop