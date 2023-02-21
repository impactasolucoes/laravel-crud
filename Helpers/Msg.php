<?php

namespace Impactasolucoes\Crud\Helpers;

use Illuminate\Support\Facades\Session;

class Msg
{
    static function success($message)
    {
        return Session::flash('laravel_crud_msg', ['type' => 'success', 'message' => $message]);
    }

    static function info($message)
    {
        return Session::flash('laravel_crud_msg', ['type' => 'info', 'message' => $message]);
    }

    static function danger($message)
    {
        return Session::flash('laravel_crud_msg', ['type' => 'danger', 'message' => $message]);
    }

    static function warning($message)
    {
        return Session::flash('laravel_crud_msg', ['type' => 'warning', 'message' => $message]);
    }

    static function ok()
    {
        return self::success("OK: Os dados foram gravados com sucesso!");
    }

    static function getMessage()
    {
        return Session::has('laravel_crud_msg') ? Session::get('laravel_crud_msg') : [];
    }
}
