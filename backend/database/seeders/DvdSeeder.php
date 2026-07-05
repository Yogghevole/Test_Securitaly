<?php

namespace Database\Seeders;

use App\Models\Dvd;
use Illuminate\Database\Seeder;

class DvdSeeder extends Seeder
{
    public function run(): void
    {
        $dvds = [
            [
                'titolo' => 'Cars - Motori Ruggenti',
                'data_di_uscita' => '2006-09-08',
                'categoria' => 'Animazione',
                'durata_minuti' => 117,
                'quantita' => 3,
                'cover_path' => 'cars-motori-ruggenti.jpg',
            ],
            [
                'titolo' => 'Green Book',
                'data_di_uscita' => '2018-11-16',
                'categoria' => 'Drammatico',
                'durata_minuti' => 130,
                'quantita' => 2,
                'cover_path' => 'green-book.jpg',
            ],
            [
                'titolo' => 'Spider-Man: Un nuovo universo',
                'data_di_uscita' => '2018-12-14',
                'categoria' => 'Animazione',
                'durata_minuti' => 117,
                'quantita' => 4,
                'cover_path' => 'spiderman-un-nuovo-universo.jpg',
            ],
            [
                'titolo' => 'Ratatouille',
                'data_di_uscita' => '2007-06-29',
                'categoria' => 'Animazione',
                'durata_minuti' => 111,
                'quantita' => 2,
                'cover_path' => 'ratatouille.jpg',
            ],
            [
                'titolo' => 'Mulan',
                'data_di_uscita' => '1998-06-19',
                'categoria' => 'Animazione',
                'durata_minuti' => 88,
                'quantita' => 3,
                'cover_path' => 'mulan.jpg',
            ],
            [
                'titolo' => 'Fight Club',
                'data_di_uscita' => '1999-10-15',
                'categoria' => 'Drammatico',
                'durata_minuti' => 139,
                'quantita' => 3,
                'cover_path' => 'fight-club.jpg',
            ],
            [
                'titolo' => 'Una notte al museo',
                'data_di_uscita' => '2006-12-22',
                'categoria' => 'Commedia',
                'durata_minuti' => 108,
                'quantita' => 3,
                'cover_path' => 'una-notte-al-museo.jpg',
            ],
            [
                'titolo' => 'Avatar',
                'data_di_uscita' => '2009-12-18',
                'categoria' => 'Fantascienza',
                'durata_minuti' => 162,
                'quantita' => 4,
                'cover_path' => 'avatar.jpg',
            ],
            [
                'titolo' => 'Interstellar',
                'data_di_uscita' => '2014-11-07',
                'categoria' => 'Fantascienza',
                'durata_minuti' => 169,
                'quantita' => 3,
                'cover_path' => 'interstellar.jpg',
            ],
            [
                'titolo' => 'Il Cavaliere Oscuro',
                'data_di_uscita' => '2008-07-18',
                'categoria' => 'Azione',
                'durata_minuti' => 152,
                'quantita' => 3,
                'cover_path' => 'il-cavaliere-oscuro.jpg',
            ],
        ];

        foreach ($dvds as $dvd) {
            Dvd::updateOrCreate(
                ['titolo' => $dvd['titolo']],
                $dvd,
            );
        }
    }
}
