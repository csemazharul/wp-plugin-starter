<?php

namespace WPStarterKit\HTTP\Middleware;

if (!\defined('ABSPATH')) {
    exit;
}

use WPStarterKit\Deps\BitApps\WPKit\Http\Response;
use WPStarterKit\Deps\BitApps\WPKit\Utils\Capabilities;

class AdminCheckerMiddleware
{
    public function handle($request, $next)
    {
        if (!Capabilities::check('manage_options')) {
            return Response::error('You do not have permission to perform this action.')->send();
        }

        return $next($request);
    }
}
