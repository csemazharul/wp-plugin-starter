<?php
/**
 * Routes WordPress emails through MailHog in Docker development.
 * Loaded automatically as a must-use plugin when running in Docker.
 * Active only when MAILHOG_ENABLED env var is set.
 */

if (! getenv('MAILHOG_ENABLED')) {
    return;
}

add_action('phpmailer_init', static function ($phpmailer): void {
    $phpmailer->isSMTP();
    $phpmailer->Host    = 'mailhog';
    $phpmailer->Port    = 1025;
    $phpmailer->SMTPAuth = false;
});
