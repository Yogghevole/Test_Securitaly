<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call(DvdSeeder::class);
        $this->call(CustomerSeeder::class);
        $this->call(RentalSeeder::class);
    }
}
