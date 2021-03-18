<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Hash;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
        $faker = \Faker\Factory::create();
        for($i=0;$i<5;$i++){
            User::create([
                'name' => $faker->firstname,
                'email' => $faker->unique()->safeEmail,
                'email_verified_at' => now(),
                'password' => Hash::make('secret'), 
                'remember_token' => Str::random(10),
            ]);
        }
    }
}
