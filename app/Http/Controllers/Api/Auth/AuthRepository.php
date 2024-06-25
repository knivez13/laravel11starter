<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;


class AuthRepository
{
    public function test()
    {
        return "hello from login repository";
    }

    public function login($data)
    {
        $count = User::where('email', '=', $data['email'])->count();

        if ($count == 0) {
            return 'Your id Number not exsist';
        }

        if (Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
            Auth::user()->tokens()->delete();
            $user = Auth::user();
            return [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'roles' => $user->getRoleNames(),
                'permission' => $user->getAllPermissions()->pluck('name'),
                'token' => $user->createToken('bonjourdeguzmanbonjourdeguzmanbonjourdeguzman')->plainTextToken,
            ];
        }
        return 'Wrong Username or Password';
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();
        return 'Your Successfully logged out';
    }
}
