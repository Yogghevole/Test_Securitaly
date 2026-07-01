<?php

namespace Database\Seeders;

use App\Models\Dvd;
use Illuminate\Database\Seeder;

class DvdSeeder extends Seeder
{
    public function run(): void
    {
        Dvd::create([
            'titolo' => 'Cars - Motori Ruggenti',
            'data_di_uscita' => '2006-09-08',
            'categoria' => 'Animazione',
            'durata_minuti' => 117,
            'quantita' => 3,
        ]);
        
        Dvd::create([
            'titolo' => 'Green Book',
            'data_di_uscita' => '2018-11-16',
            'categoria' => 'Drammatico',
            'durata_minuti' => 130,
            'quantita' => 2,
        ]);

        Dvd::create([
            'titolo' => 'Spider-Man: Un nuovo universo',
            'data_di_uscita' => '2018-12-14',
            'categoria' => 'Animazione',
            'durata_minuti' => 117,
            'quantita' => 4,
        ]);

        Dvd::create([
            'titolo' => 'Ratatouille',
            'data_di_uscita' => '2007-06-29',
            'categoria' => 'Animazione',
            'durata_minuti' => 111,
            'quantita' => 2,
        ]);

        Dvd::create([
            'titolo' => 'Mulan',
            'data_di_uscita' => '1998-06-19',
            'categoria' => 'Animazione',
            'durata_minuti' => 88,
            'quantita' => 3,
        ]);
        
        Dvd::create([
            'titolo' => 'Fight Club',
            'data_di_uscita' => '1999-10-15',
            'categoria' => 'Drammatico',
            'durata_minuti' => 139,
            'quantita' => 3,
        ]);
    }
}