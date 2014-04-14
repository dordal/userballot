<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('home');
});

Route::get('pricing', function()
{
	return View::make('pricing');
});

Route::get('/faq', function()
{
	return View::make('faq');
});

Route::get('/ourstory', function()
{
	return View::make('ourstory');
});

Route::get('/contact', function()
{
	return View::make('contact');
});

Route::get('/tos', function()
{
	return View::make('tos');
});

Route::get('/privacy', function()
{
	return View::make('privacy');
});