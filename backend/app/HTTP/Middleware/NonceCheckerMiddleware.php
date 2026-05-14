<?php

namespace WPStarterKit\HTTP\Middleware;

if (!\defined('ABSPATH')) {
    exit;
}

use WPStarterKit\Config;
use WPStarterKit\Deps\BitApps\WPKit\Http\Request\Request;
use WPStarterKit\Deps\BitApps\WPKit\Http\Response;

class NonceCheckerMiddleware
{
    public function handle($request, $next)
    {
        if (!wp_verify_nonce($request->get('_nonce'), Config::withPrefix('nonce'))) {
            return Response::error('Nonce verification failed.')->send();
        }

        return $next($request);
    }
}
