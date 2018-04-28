<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        Model::unguard();

        DB::table('users')->delete();

        $users = array(
                ['name' => 'Martin Mantara', 'email' => 'mmantara@luefi.com.ar', 'password' => Hash::make('luefi123')],
                ['name' => 'Martin Fronteras', 'email' => 'mfronteras@luefi.com.ar', 'password' => Hash::make('luefi123')],
                ['name' => 'Nicolas Ovelar', 'email' => 'ovelar.nico@gmail.com', 'password' => Hash::make('nicolas1')],
                ['name' => 'Nicolas Ovelar 2', 'email' => 'novelar@luefi.com.ar', 'password' => Hash::make('nicolas1')],
        );

        // Loop through each user above and create the record for them in the database
        foreach ($users as $user)
        {
            User::create($user);
        }

        Model::reguard();

    }
}
