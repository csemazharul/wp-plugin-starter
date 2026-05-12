<?php

declare(strict_types=1);

use RectorWPStarterKitWPStarterKit\WPStarterKitWPStarterKitCodeQualityWPStarterKitWPStarterKit\WPStarterKitWPStarterKitRectorWPStarterKitWPStarterKit\WPStarterKitWPStarterKitClassMethodWPStarterKitWPStarterKit\WPStarterKitWPStarterKitExplicitReturnNullRector;
use RectorWPStarterKitWPStarterKit\WPStarterKitWPStarterKitCodeQualityWPStarterKitWPStarterKit\WPStarterKitWPStarterKitRectorWPStarterKitWPStarterKit\WPStarterKitWPStarterKitFuncCallWPStarterKitWPStarterKit\WPStarterKitWPStarterKitCompactToVariablesRector;
use RectorWPStarterKitWPStarterKit\WPStarterKitWPStarterKitConfigWPStarterKitWPStarterKit\WPStarterKitWPStarterKitRectorConfig;
use RectorWPStarterKitWPStarterKit\WPStarterKitWPStarterKitDeadCodeWPStarterKitWPStarterKit\WPStarterKitWPStarterKitRectorWPStarterKitWPStarterKit\WPStarterKitWPStarterKitIf_WPStarterKitWPStarterKit\WPStarterKitWPStarterKitUnwrapFutureCompatibleIfPhpVersionRector;
use RectorWPStarterKitWPStarterKit\WPStarterKitWPStarterKitSetWPStarterKitWPStarterKit\WPStarterKitWPStarterKitValueObjectWPStarterKitWPStarterKit\WPStarterKitWPStarterKitSetList;
use RectorWPStarterKitWPStarterKit\WPStarterKitWPStarterKitValueObjectWPStarterKitWPStarterKit\WPStarterKitWPStarterKitPhpVersion;

return RectorConfig::configure()
    ->withPaths([
        __DIR__ . '/backend/app',
        __DIR__ . '/backend/hooks',
        __DIR__ . '/pro/backend/app',
        __DIR__ . '/pro/backend/hooks',
    ])
    ->withRules([
        CompactToVariablesRector::class,
    ])
    ->withPhpVersion(PhpVersion::PHP_74)
    ->withSkip([
        UnwrapFutureCompatibleIfPhpVersionRector::class,
        ExplicitReturnNullRector::class

    ])
    ->withPreparedSets(
        deadCode: true,
        codeQuality: true,
        // typeDeclarations: true,
        privatization: true,
        earlyReturn: true,
        // strictBooleans: true,
        // naming: true,
    )
    ->withSets([SetList::PHP_74]);
