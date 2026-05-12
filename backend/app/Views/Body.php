<?php

namespace WPStarterKit\WPStarterKit\Views;

if (!\defined('ABSPATH')) {
    exit;
}

use WPStarterKit\WPStarterKit\Config;

class Body
{
    public function render()
    {
        echo '<div id="bit-apps-root"></div>';
    }
}
