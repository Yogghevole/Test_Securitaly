<?php

namespace Database\Seeders;

use App\Models\Cliente;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    public function run(): void
    {
        $customers = [
            ['nome' => 'Emma', 'cognome' => 'Johnson', 'email' => 'emma.johnson@example.com'],
            ['nome' => 'Liam', 'cognome' => 'Williams', 'email' => 'liam.williams@example.com'],
            ['nome' => 'Olivia', 'cognome' => 'Brown', 'email' => 'olivia.brown@example.com'],
            ['nome' => 'Noah', 'cognome' => 'Davis', 'email' => 'noah.davis@example.com'],
            ['nome' => 'Ava', 'cognome' => 'Miller', 'email' => 'ava.miller@example.com'],
            ['nome' => 'Sophia', 'cognome' => 'Moore', 'email' => 'sophia.moore@example.com'],
            ['nome' => 'James', 'cognome' => 'Taylor', 'email' => 'james.taylor@example.com'],
            ['nome' => 'William', 'cognome' => 'Wilson', 'email' => 'william.wilson@example.com'],
            ['nome' => 'Isabella', 'cognome' => 'Clark', 'email' => 'isabella.clark@example.com'],
            ['nome' => 'Lucas', 'cognome' => 'Martin', 'email' => 'lucas.martin@example.com'],
        ];

        foreach ($customers as $customer) {
            Cliente::updateOrCreate(
                ['email' => $customer['email']],
                $customer,
            );
        }
    }
}

