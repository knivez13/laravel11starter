<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userrole = Role::create(['name' => 'User']);
        $adminrole = Role::create(['name' => 'Admin']);

        $users = [
            'view-dashboard',
        ];
        foreach ($users as $user) {
            Permission::create(['name' => $user]);
        }

        $userrole->syncPermissions($users);
        $admin = [
            'view-dashboard-total-count',
        ];

        foreach ($admin as $user) {
            Permission::create(['name' => $user]);
        }
        $adminrole->syncPermissions($admin);
    }
}
