#!/usr/bin/env node

/**
 * Example initialization script
 * This demonstrates how to use the plugin boilerplate initialization
 */

import { collectPluginInfo, replacePlaceholders, processFile, processDirectory } from './init-plugin.js';

// Example plugin information
const examplePluginInfo = {
    name: 'My Awesome Plugin',
    slug: 'my-awesome-plugin',
    description: 'A powerful WordPress plugin that does amazing things',
    authorName: 'ra',
    authorEmail: 'john@example.com',
    authorURL: 'https://example.com',
    placeholder: 'BitCrm',
    namespace: 'BitCrm',
    slugUpper: 'MY_AWESOME_PLUGIN',
    slugCamel: 'myAwesomePlugin',
    slugPascal: 'MyAwesomePlugin'
};

console.log('🚀 Example Plugin Initialization');
console.log('================================WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn');

console.log('Plugin Information:');
console.log(`  Name: ${examplePluginInfo.name}`);
console.log(`  Slug: ${examplePluginInfo.slug}`);
console.log(`  Description: ${examplePluginInfo.description}`);
console.log(`  Placeholder: ${examplePluginInfo.placeholder}`);
console.log(`  Namespace: BitAppsWPStarterKitWPStarterKitWPStarterKit\WPStarterKitWPStarterKitWPStarterKitWPStarterKitWPStarterKit\WPStarterKitWPStarterKit${examplePluginInfo.placeholder}`);
console.log(`  WPStarterKitWPStarterKitPro Namespace: BitAppsWPStarterKitWPStarterKitWPStarterKit\WPStarterKitWPStarterKitWPStarterKitWPStarterKitWPStarterKit\WPStarterKitWPStarterKit${examplePluginInfo.placeholder}WPStarterKitWPStarterKitPro`);
console.log(`  Author: ${examplePluginInfo.authorName}`);
console.log(`  Email: ${examplePluginInfo.authorEmail}`);
console.log(`  URL: ${examplePluginInfo.authorURL}WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn`);

console.log('This would replace placeholders like:');
console.log('  WP Starter Kit → ' + examplePluginInfo.name);
console.log('  WP Starter Kit → ' + examplePluginInfo.slug);
console.log('  AAAAAAAAAAAAAAAAAAAAAAAAAAAAA → ' + examplePluginInfo.description);
console.log('  {{PLUGIN_PLACEHOLDER}} → ' + examplePluginInfo.placeholder);
console.log('  RA → ' + examplePluginInfo.namespace);
console.log('  ra → ' + examplePluginInfo.authorName);
console.log('  karim@gmail.com → ' + examplePluginInfo.authorEmail);
console.log('  https://example.com → ' + examplePluginInfo.authorURL);
console.log('  WP_STARTER_KIT → ' + examplePluginInfo.slugUpper);
console.log('  rA → ' + examplePluginInfo.slugCamel);
console.log('  RA → ' + examplePluginInfo.slugPascal);
console.log('  WP Starter Kit → ' + examplePluginInfo.slug);
console.log('  wp-starter-kit-pro → ' + examplePluginInfo.slug + '-pro');
console.log('  RA → BitAppsWPStarterKitWPStarterKitWPStarterKit\WPStarterKitWPStarterKitWPStarterKitWPStarterKitWPStarterKit\WPStarterKitWPStarterKit' + examplePluginInfo.placeholder);
console.log('  RAWPStarterKitWPStarterKitPro → BitAppsWPStarterKitWPStarterKitWPStarterKit\WPStarterKitWPStarterKitWPStarterKitWPStarterKitWPStarterKit\WPStarterKitWPStarterKit' + examplePluginInfo.placeholder + 'WPStarterKitWPStarterKitPro');

console.log('WPStarterKitWPStarterKit\WPStarterKitWPStarterKitnTo initialize your plugin, run:');
console.log('  node init-plugin.js');
