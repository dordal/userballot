<?php
/**
 * @package UserBallot
 * @version 1.0
 */
/*
Plugin Name: UserBallot for WordPress
Plugin URI: http://wordpress.org/plugins/userballot-for-wp/
Description: Add UserBallot user feedback to your WordPress site. UserBallot helps you find the <strong>pulse</strong> of your users through <em>simple yes or no questions</em>. To get started: 1) Click the "Activate" link to the left of this description, 2) <a href="http://app.userballot.com/#/signup">Sign up for a UserBallot account</a>, 3) Get your site ID (found by clicking "how it works"), 4) Go to your UserBallot for WordPress configuration page, and save your site ID.
Author: The UserBallot team
Version: 1.0
Author URI: http://userballot.com/
*/

// Make sure we don't expose any info if called directly
if ( !function_exists( 'add_action' ) ) {
	echo 'Plugins should not be called directly.';
	exit;
}

/**
 * embed_ub adds the ub code at the bottom of the page as
 * long as a site ID has been added in options menu
 * 
 * @param  string $siteId the site ID for the account
 * @return string         this method echoes a string per WP standards
 */
function embed_ub(){

	$siteId = get_option('ub_site_id');

	if( siteId != '' ){
		echo '<script type="text/javascript">var $ub = window.$ub || {};$ub.siteId = "'.$siteId.'";</script><script src="http://app-dev-jware.userballot.com/client.js"></script>';
	}
}
add_action( 'wp_footer', 'embed_ub' );


/*************************
 * ADMIN CODE
 *************************/

// the setting we want saved
function userballot_register_settings() {
	add_option( 'ub_site_id', '');
	register_setting( 'default', 'ub_site_id' ); 
} 
add_action( 'admin_init', 'userballot_register_settings' );

// admin options page setup
function userballot_register_options_page() {
	add_options_page( 'UserBallot for WordPress Options', 'UserBallot for WordPress', 'manage_options', 'userballot-options', 'userballot_options_page' );
}
add_action( 'admin_menu', 'userballot_register_options_page' );

/**
 * userballot_options()
 * the actual admin options settings and form
 * @return string (echoed)
 */
function userballot_options_page() {
?>
	<div class="wrap" style="width:60%;min-width:500px;max-width:800px;">
		<?php screen_icon(); ?>
		<h2>You are about to be able to make more informed decisions thanks to UserBallot.</h2>
		<p>UserBallot is a one-touch, yes/no feedback gathering tool that lets website owners get real-time answers from more of your customers than ever before, and all you need to do is add your site ID here!</p>
		<form method="post" action="options.php">
			<?php settings_fields( 'default' ); ?>
			<p><label for="ub_site_id">UserBallot Site ID:</label>
				<input type="text" id="ub_site_id" name="ub_site_id" value="<?php echo get_option('ub_site_id'); ?>" size="20">
			</p>
			<hr />
			<?php submit_button(); ?>
		</form>
		<p>If you haven't signed up for a UserBallot account yet, <a href="http://app.userballot.com/#/signup">do it now to get your site ID</a>.
	</div>
<?php
}
