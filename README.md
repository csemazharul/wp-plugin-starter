# WP Starter Kit — WordPress Plugin Starter

A modern WordPress plugin starter with React frontend, PHP backend, and a CLI initializer.

> ⚠️ This is a starter template. Run `php wp-kit plugin:init` before activating the plugin.

---

## Features

- **CLI Initializer** — interactive `php wp-kit plugin:init` replaces all placeholders in one command
- **React Frontend** — Vite + React + TypeScript + Tailwind + Ant Design
- **PHP Backend** — PSR-4 autoloaded, namespace-isolated vendor deps via Imposter
- **REST & AJAX Routing** — built-in router with middleware support
- **Database Migrations** — versioned schema via WPKit MigrationHelper
- **Dev Hot Reload** — Vite HMR wired to WordPress via `.env`
- **Code Quality** — ESLint, Prettier, PHPStan, PHPCS, Rector, Vitest, PHPUnit

---

## Setup

### 1. Initialize the plugin

```bash
php wp-kit plugin:init
```

You will be prompted for:

```
Enter the plugin name:
Enter the plugin slug:
Enter the plugin prefix [space, hyphen will be converted to _]:
Enter the REST API namespace [space, hyphen will be converted to _]:
Enter the app root namespace:
```

After confirming, the CLI will:

1. Replace all placeholders across the codebase
2. Update `backend/app/Config.php` constants
3. Create the main plugin PHP file (e.g. `your-slug.php`)
4. Run `composer install` with a fresh Imposter namespace transform

### 2. Configure .env

```bash
cp .env.example .env
```

Edit `.env` and set at minimum:

```env
PLUGIN_SLUG = your-plugin-slug
DEV          = true
DEV_URL      = http://localhost:3000/wp-content/plugins/your-plugin-slug/frontend
```

### 3. Start development

Choose one path:

---

#### Option A — Docker (wp-env) `recommended`

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Mac/Windows) or Docker Engine (Linux).

```bash
pnpm install
pnpm env:start    # spins up WordPress + activates plugin automatically
pnpm dev:free     # start Vite dev server with HMR
```

| Service | URL |
|---------|-----|
| WordPress | http://localhost:8888 |
| WP Admin | http://localhost:8888/wp-admin `admin / password` |
| phpMyAdmin | http://localhost:8889 |

**wp-env commands:**

```bash
pnpm env:stop                  # stop containers
pnpm env:shell                 # bash inside container
pnpm env:wp -- plugin list     # run any WP-CLI command
pnpm env:logs                  # tail logs
pnpm env:clean                 # reset database
pnpm env:destroy               # remove containers + volumes
```

---

#### Option B — Existing WordPress install

Place this repo inside `wp-content/plugins/your-plugin-slug/`, then:

```bash
composer install
pnpm install
pnpm dev:free     # start Vite dev server with HMR
```

Go to **WordPress Admin → Plugins** and activate your plugin.

---

## Development

Start the Vite dev server for hot reload:

```bash
pnpm dev:free
```

Enable dev mode in `.env`:

```env
DEV = true
DEV_URL = http://localhost:3000/wp-content/plugins/your-plugin-slug/frontend
```

Build for production:

```bash
pnpm build:free
```

---

## CLI Commands

```bash
# Plugin
php wp-kit plugin:init                       # interactive plugin initializer
php wp-kit plugin:info                       # show current plugin name, slug, namespace

# Generators (run after plugin:init)
php wp-kit make:controller ExampleController # backend/app/HTTP/Controllers/<Name>.php
php wp-kit make:model Tag                    # backend/app/Models/<Name>.php
php wp-kit make:migration AppConnections     # backend/db/Migrations/<NS><Name>TableMigration.php

php wp-kit --help                            # list all commands
```

Generators are **strict positional** — name is required and must be PascalCase. The
generator refuses to overwrite an existing file. `make:migration` also auto-registers
the new class in `InstallerProvider::migration()` and `drop()`.

---

## Project Structure

```
├── backend/
│   ├── app/
│   │   ├── Config.php              # plugin constants & config helpers
│   │   ├── Plugin.php              # plugin bootstrap
│   │   ├── Dotenv.php              # .env loader
│   │   ├── HTTP/
│   │   │   ├── Controllers/        # generated via `wp-kit make:controller`
│   │   │   └── Middleware/         # nonce & admin checkers
│   │   ├── Models/                 # generated via `wp-kit make:model`
│   │   ├── Providers/              # HookProvider, InstallerProvider
│   │   ├── Views/                  # Layout, Head, Body, HtmlTagModifier
│   │   └── src/Menu.php            # sidebar menu definition
│   ├── db/Migrations/              # generated via `wp-kit make:migration`
│   ├── hooks/
│   │   ├── api.php                 # REST API routes
│   │   └── ajax.php                # AJAX routes
│   └── bootstrap.php               # autoload + plugin boot
├── frontend/
│   └── src/
│       ├── main.tsx                # React entry point
│       ├── Welcome.tsx             # default welcome page
│       ├── config/config.ts        # server variable bindings
│       ├── common/helpers/         # i18n, request, tryCatch
│       └── resource/               # CSS, images
├── wp-kit                          # PHP CLI tool
├── wp-starter-kit.php              # WordPress plugin header
└── composer.json
```

---

## Adding REST Routes

Define routes in `backend/hooks/api.php`:

```php
use WPStarterKit\Deps\BitApps\WPKit\Http\Router\Router;

$router->get('/hello', function () {
    return ['message' => 'Hello from WP Starter Kit'];
});

$router->post('/data', [\YourNamespace\Controllers\DataController::class, 'store'])
       ->middleware('nonce', 'isAdmin');
```

---

## Adding AJAX Routes

Define routes in `backend/hooks/ajax.php`:

```php
$router->post('get_settings', [\YourNamespace\Controllers\SettingsController::class, 'index']);
```

---

## Database Migrations

Generate a migration with the CLI — it scaffolds the file **and** registers it in
`InstallerProvider::migration()` + `drop()` automatically:

```bash
php wp-kit make:migration AppConnections
```

This produces `backend/db/Migrations/<Namespace>AppConnectionsTableMigration.php`
with a snake_case table name (`app_connections`) and the standard up/down skeleton:

```php
final class WPStarterKitAppConnectionsTableMigration extends Migration
{
    public function up(): void
    {
        Schema::withPrefix(Connection::wpPrefix() . Config::VAR_PREFIX)->create(
            'app_connections',
            function (Blueprint $table): void {
                $table->id();
                // add columns
                $table->timestamps();
            }
        );
    }

    public function down(): void
    {
        Schema::withPrefix(Connection::wpPrefix() . Config::VAR_PREFIX)->drop('app_connections');
    }
}
```

Migration files use **no namespace** (matches WPKit's MigrationHelper convention) and
the class name format is `{RootNamespace}{Name}TableMigration`. The class is appended
to both arrays in [`InstallerProvider`](backend/app/Providers/InstallerProvider.php) so
the migration runs on activation and rolls back on uninstall.

---

## Tech Stack

| Layer    | Tools                                                                    |
| -------- | ------------------------------------------------------------------------ |
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Ant Design, Jotai, React Query |
| Backend  | PHP 7.4+, WPKit, Imposter (namespace isolation)                          |
| Testing  | Vitest, PHPUnit, Playwright                                              |
| Quality  | ESLint, Prettier, PHPStan, PHPCS, Rector                                 |

---

## License

GPL-2.0-or-later
