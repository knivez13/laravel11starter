<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\BaseController;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\Auth\AuthRepository;

class AuthController extends BaseController
{
    private $repo;

    function __construct()
    {
        $this->repo = new AuthRepository();
    }

    public function test(): JsonResponse
    {
        return $this->sendResponse($this->repo->test(), 'test successfully.');
    }

    public function login(Request $request): JsonResponse
    {
        $fields = $request->all();
        $validator = Validator::make($fields, [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = Arr::only($request->all(), ['email', 'password']);
        return $this->sendResponse($this->repo->login($input), 'login successfully.');
    }

    public function logout(): JsonResponse
    {
        return $this->sendResponse($this->repo->logout(), 'logout successfully.');
    }
}
