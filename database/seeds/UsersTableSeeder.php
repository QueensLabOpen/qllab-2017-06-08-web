<?php

use Illuminate\Database\Seeder;
use App\User as User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Henrik',
            'username' => 'henrik',
            'email' => 'henrik.dahlheim@gmail.com',
            'password' => Hash::make('snorbuse'),
        ]);
    }
}
