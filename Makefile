DC = docker compose --env-file .env.docker

.PHONY: up down setup shell wp composer test-php logs build clean

## Start all services (run `make setup` first time)
up: .env.docker
	$(DC) up -d
	@echo ""
	@echo "  WordPress → http://localhost:8080   (WP_PORT in .env.docker)"
	@echo "  Adminer   → http://localhost:8081   (ADMINER_PORT)"
	@echo "  MailHog   → http://localhost:8025   (MAILHOG_PORT)"
	@echo ""
	@echo "  First time? Run: make setup"

## Stop all services
down:
	$(DC) down

## Install WordPress and activate the plugin (run once after `make up`)
setup:
	@echo "Waiting for WordPress…"
	@$(DC) exec wordpress bash -c '\
		until curl -sf http://localhost/wp-login.php > /dev/null 2>&1; do \
			printf "."; sleep 2; \
		done; echo ""'
	$(DC) exec wordpress bash -c '\
		wp core is-installed --allow-root 2>/dev/null \
		|| wp core install \
			--allow-root \
			--url="$$WP_URL" \
			--title="Dev Site" \
			--admin_user="$$WP_ADMIN_USER" \
			--admin_password="$$WP_ADMIN_PASSWORD" \
			--admin_email="$$WP_ADMIN_EMAIL" \
			--skip-email'
	$(DC) exec wordpress bash -c 'wp plugin activate $$PLUGIN_SLUG --allow-root 2>/dev/null || true'
	@echo "Done. Login: http://localhost:8080/wp-admin"

## Open bash in the WordPress container
shell:
	$(DC) exec wordpress bash

## Run a WP-CLI command — e.g. make wp ARGS="plugin list"
wp:
	$(DC) exec wordpress wp --allow-root $(ARGS)

## Run a Composer command inside the container — e.g. make composer ARGS="install"
composer:
	$(DC) exec wordpress composer $(ARGS)

## Run PHPUnit inside the container
test-php:
	$(DC) exec wordpress php vendor/bin/phpunit --testdox --colors=always tests/

## Follow WordPress container logs
logs:
	$(DC) logs -f wordpress

## Production JS build (Vite runs on host)
build:
	pnpm build:free

## Destroy containers and volumes (data loss!)
clean:
	$(DC) down -v --remove-orphans

.env.docker:
	@echo ""
	@echo "  ERROR: .env.docker not found."
	@echo "  Run: cp .env.docker.example .env.docker"
	@echo ""
	@exit 1
