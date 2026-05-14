<?php

namespace WPStarterKit\Views;

if (!\defined('ABSPATH')) {
    exit;
}

use WPStarterKit\Config;

class Body
{
    public function render()
    {
        echo '<div id="wp-starter-kit-root"></div>';
    }
}
