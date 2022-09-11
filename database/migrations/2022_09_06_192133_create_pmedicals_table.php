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
    {
        Schema::create('pmedicals', function (Blueprint $table) {
            $table->id();
            $table->integer('height')->nullable();
            $table->integer('weight')->nullable();
            $table->integer('bp')->nullable();
            $table->integer('pulse')->nullable();
            $table->integer('temperature')->nullable();
            $table->integer('respiration')->nullable();
            $table->string('symptomstype')->nullable();
            $table->string('symptomstitle')->nullable();
            $table->string('symptomsdescription')->nullable();
            $table->string('note')->nullable();
            $table->string('anyknownallergies')->nullable();
            $table->datetime('appointmentdate')->nullable();
            $table->integer('case')->nullable();
            $table->string('casualty')->nullable();
            $table->string('oldpatient')->nullable();
            $table->string('tpa')->nullable();
            $table->string('consultantdoctor')->nullable();
            $table->string('chargecategory')->nullable();
            $table->string('tax')->nullable();
            $table->string('standardcharge')->nullable();
            $table->string('appliedcharge')->nullable();
            $table->string('amount')->nullable();
            $table->string('paymentmode')->nullable();
            $table->string('paidamount')->nullable();
            $table->string('liveconsultation')->nullable();
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
        Schema::dropIfExists('pmedicals');
    }
};
