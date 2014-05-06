<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create("visitors", function($table) {
			$table->increments("id");

			$table->string("hash", 32);
			$table->string("ip", 16);
			$table->string("city", 100);
			$table->string("region", 100);
			$table->string("country", 100);

			$table->string("os", 100);
			$table->string("version", 20);
			$table->string("browser", 100);

			// created_at | updated_at DATETIME
			$table->timestamps();

		});

		Schema::create("visits", function($table) {
			$table->increments("id");

			$table->integer('visitor_id')->unsigned();
			$table->foreign("visitor_id")->references('id')->on('visitors')->onDelete('cascade');

			$table->string("site_id", 32);
			$table->string("displayed_question_id", 32);

			// created_at | updated_at DATETIME
			$table->timestamps();

		});

		Schema::create("votes", function($table) {
			$table->increments("id");

			$table->integer("visit_id")->unsigned();
			$table->foreign("visit_id")->references('id')->on('visits')->onDelete('cascade');

			$table->string("question_id", 32);
			$table->string("answer", 100);
			$table->integer("seconds");

			// created_at | updated_at DATETIME
			$table->timestamps();

		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop("visitors");
		Schema::drop("visits");
		Schema::drop("votes");
	}

}
