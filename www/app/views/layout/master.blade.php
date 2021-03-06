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

    <!-- Mobile Specific Metas
  ================================================== -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <!-- JS
  ================================================== -->
    <script src="/js/jquery-2.0.3.min.js"></script>
    <script src="/js/interactions.js"></script>


    <!-- CSS
  ================================================== -->
    <link rel="stylesheet" href="styles/grid/skeleton.css">
    <link rel="stylesheet" href="styles/components/topcoat-desktop-light.css">
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/mobiletablet.css">

    <!--<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>-->
    <!--SVG-VGL converter library for <IE 9-->
    <!--<script src="svg2vml.js"></script>
    <script>var vectorModel = new VectorModel();</script>
    <script src="css3-mediaqueries.js"></script>-->

    <!-- Favicons
    ================================================== -->
    <link rel="shortcut icon" href="img/favicon.ico">
    <!-- <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png"> -->

    <!-- fonts -->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800' rel='stylesheet' type='text/css'>
</head>
<body>

    @if (!Request::is('/')) 
        @include('includes/topnav')
    @endif

    @yield('content')

    @if (!Request::is('/')) 
        @include('includes/footer')
    @endif

    <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
          ga('create', '<?php echo GA_USERAGENT ?>', 'userballot.com');
          ga('send', 'pageview');
    </script>

    @if (Request::is('/')) 
    <!-- UserBallot: Add this before the closing body tag  --><script type="text/javascript">var $ub = window.$ub || {};$ub.siteId = '<?php echo UB_DEMO_SITEID ?>';</script><script src="<?php echo UB_APP_DOMAIN ?>/client.js"></script>
    @endif
</body>
</html>