FROM wordpress:php8.2-apache

RUN apt-get update && apt-get install -y \
        curl \
        less \
        default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# WP-CLI
RUN curl -sO https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp

# Composer 2
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Xdebug (disabled by default — set XDEBUG_MODE=debug in .env.docker to enable)
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

COPY php.ini /usr/local/etc/php/conf.d/zz-custom.ini
COPY xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
