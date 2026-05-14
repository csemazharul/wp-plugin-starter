<?php

namespace WPStarterKit\src;

if (!\defined('ABSPATH')) {
    exit;
}

use WPStarterKit\Config;
use WPStarterKit\Views\Body;

final class Menu
{
    public static function getSideBarMenu(Body $body)
    {
        return [
            'Home' => [
                'type'       => 'menu',
                'title'      => Config::TITLE,
                'name'       => Config::TITLE,
                'capability' => 'manage_options',
                'slug'       => Config::SLUG,
                'callback'   => [$body, 'render'],
                'icon'       => 'dashicons-admin-plugins',
                'position'   => '20',
            ],
        ];
    }
}
