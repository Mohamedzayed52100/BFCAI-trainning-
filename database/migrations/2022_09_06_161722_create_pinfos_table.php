<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {//
        Schema::create('pinfos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('guardian_name');
         ///   $table->enum('guardian_name' , ['male' , 'female']);
            $table->date('dateofbirth');
            $table->integer('year');
            $table->integer('month');
            $table->integer('day');
            $table->string('bloodgroup');
            $table->string('maritalstatus');
            $table->string('patientphoto'); 
            $table->string('phone');
            $table->string('email');
            $table->string('address');
            $table->string('anyknownallergies');
            $table->string('remarks');
            $table->string('tpaid');
            $table->string('tpavalidity');
            $table->string('nin');
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
        Schema::dropIfExists('pinfos');
    }
};
