<?php

/**
 * @copyright 2025 ra
 *
 * Plugin Name:  WP Starter Kit
 * Plugin URI:   https://example.com/WP Starter Kit
 * Description:  A starter kit for WordPress plugin development, providing a solid foundation and best practices to kickstart your plugin projects.
 * Version:     1.0.0
 * Author:       ra
 * Author URI:   https://example.com
 * Text Domain:  WP Starter Kit
 * Requires PHP: 7.4
 * Requires WP:  5.0
 * Domain Path:  /languages
 * License:      GPL-2.0-or-later
 *
 * Copyright (c) 2025 ra
 */
if (!defined('ABSPATH')) {
    exit;
} // Exit if accessed directly

require_once plugin_dir_path(__FILE__) . 'backend/bootstrap.php';
