# WP Starter Kit — WordPress Plugin Starter

A modern WordPress plugin starter with React frontend, PHP backend, and a CLI initializer. Inspired by [WPDrill](https://github.com/WPDrill/framework).

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

## Quick Start

### 1. Install dependencies

```bash
composer install
pnpm install
```

### 2. Initialize your plugin

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
Enter author name:
Enter author email:
Enter author URL:
Enter plugin description:
```

After confirming, the CLI will:
1. Replace all placeholders across the codebase
2. Rename the main plugin PHP file
3. Run `composer install` with a fresh Imposter namespace transform

### 3. Activate the plugin

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
php wp-kit plugin:init   # interactive plugin initializer
php wp-kit plugin:info   # show current plugin name, slug, namespace
php wp-kit --help        # list all commands
```

---

## Project Structure

```
├── backend/
│   ├── app/
│   │   ├── Config.php              # plugin constants & config helpers
│   │   ├── Plugin.php              # plugin bootstrap
│   │   ├── Dotenv.php              # .env loader
│   │   ├── HTTP/Middleware/        # nonce & admin checkers
│   │   ├── Providers/              # HookProvider, InstallerProvider
│   │   ├── Views/                  # Layout, Head, Body, HtmlTagModifier
│   │   └── src/Menu.php            # sidebar menu definition
│   ├── db/Migrations/              # database migration classes
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

Create a migration class in `backend/db/Migrations/`:

```php
final class CreateMyTable extends Migration
{
    public function up(): void
    {
        // create table
    }

    public function down(): void
    {
        // drop table
    }
}
```

Register it in `InstallerProvider::migration()`:

```php
'migrations' => ['PluginOptions', 'CreateMyTable'],
```

---

## Tech Stack

| Layer     | Tools |
|-----------|-------|
| Frontend  | React 18, TypeScript, Vite, Tailwind CSS, Ant Design, Jotai, React Query |
| Backend   | PHP 7.4+, WPKit, Imposter (namespace isolation) |
| Testing   | Vitest, PHPUnit, Playwright |
| Quality   | ESLint, Prettier, PHPStan, PHPCS, Rector |

---

## License

GPL-2.0-or-later
