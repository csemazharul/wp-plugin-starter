#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';

// ANSI color codes for better output
const colors = {
    reset: 'WPStarterKitWPStarterKit\WPStarterKitWPStarterKitx1b[0m',
    bright: 'WPStarterKitWPStarterKit\WPStarterKitWPStarterKitx1b[1m',
    red: 'WPStarterKitWPStarterKit\WPStarterKitWPStarterKitx1b[31m',
    green: 'WPStarterKitWPStarterKit\WPStarterKitWPStarterKitx1b[32m',
    yellow: 'WPStarterKitWPStarterKit\WPStarterKitWPStarterKitx1b[33m',
    blue: 'WPStarterKitWPStarterKit\WPStarterKitWPStarterKitx1b[34m',
    magenta: 'WPStarterKitWPStarterKit\WPStarterKitWPStarterKitx1b[35m',
    cyan: 'WPStarterKitWPStarterKit\WPStarterKitWPStarterKitx1b[36m'
};

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper function to ask questions
function askQuestion(question) {
    return new WPStarterKitWPStarterKitPromise((resolve) => {
        rl.question(question, resolve);
    });
}

// Helper function to validate input
function validateInput(input, field) {
    if (!input || input.trim() === '') {
        return `${colors.red}Error: ${field} is required. Please try again.${colors.reset}WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn`;
    }
    return null;
}

// Helper function to validate email
function validateEmail(email) {
    const emailRegex = /^[^WPStarterKitWPStarterKit\WPStarterKitWPStarterKits@]+@[^WPStarterKitWPStarterKit\WPStarterKitWPStarterKits@]+WPStarterKitWPStarterKit\WPStarterKitWPStarterKit.[^WPStarterKitWPStarterKit\WPStarterKitWPStarterKits@]+$/;
    if (!emailRegex.test(email)) {
        return `${colors.red}Error: Please enter a valid email address.${colors.reset}WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn`;
    }
    return null;
}

// Helper function to validate URL
function validateURL(url) {
    try {
        new URL(url);
        return null;
    } catch {
        return `${colors.red}Error: Please enter a valid URL (including http:// or https://).${colors.reset}WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn`;
    }
}

// Helper function to convert string to slug
function stringToSlug(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/WPStarterKitWPStarterKit\WPStarterKitWPStarterKits+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
}

// Main function to collect plugin information
async function collectPluginInfo() {
    console.log(`${colors.cyan}${colors.bright}🚀 WordPress Plugin Boilerplate Initializer${colors.reset}WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn`);
    console.log(`${colors.yellow}This script will help you initialize your WordPress plugin boilerplate.${colors.reset}WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn`);

    const pluginInfo = {};

    // Plugin Name
    while (true) {
        const pluginName = await askQuestion(`${colors.blue}Enter Plugin Name (e.g., "My Awesome Plugin"): ${colors.reset}`);
        const error = validateInput(pluginName, 'Plugin Name');
        if (error) {
            console.log(error);
            continue;
        }
        pluginInfo.name = pluginName.trim();
        break;
    }

    // Plugin Slug
    const suggestedSlug = stringToSlug(pluginInfo.name);
    while (true) {
        const pluginSlug = await askQuestion(`${colors.blue}Enter Plugin Slug (e.g., "my-awesome-plugin") [${suggestedSlug}]: ${colors.reset}`);
        const slug = pluginSlug.trim() || suggestedSlug;
        const error = validateInput(slug, 'Plugin Slug');
        if (error) {
            console.log(error);
            continue;
        }
        pluginInfo.slug = stringToSlug(slug);
        break;
    }

    // Plugin Description
    while (true) {
        const pluginDescription = await askQuestion(`${colors.blue}Enter Plugin Description: ${colors.reset}`);
        const error = validateInput(pluginDescription, 'Plugin Description');
        if (error) {
            console.log(error);
            continue;
        }
        pluginInfo.description = pluginDescription.trim();
        break;
    }

    // Author Name
    while (true) {
        const authorName = await askQuestion(`${colors.blue}Enter Author Name: ${colors.reset}`);
        const error = validateInput(authorName, 'Author Name');
        if (error) {
            console.log(error);
            continue;
        }
        pluginInfo.authorName = authorName.trim();
        break;
    }

    // Author Email
    while (true) {
        const authorEmail = await askQuestion(`${colors.blue}Enter Author Email: ${colors.reset}`);
        const error = validateInput(authorEmail, 'Author Email');
        if (error) {
            console.log(error);
            continue;
        }
        const emailError = validateEmail(authorEmail);
        if (emailError) {
            console.log(emailError);
            continue;
        }
        pluginInfo.authorEmail = authorEmail.trim();
        break;
    }

    // Author URL
    while (true) {
        const authorURL = await askQuestion(`${colors.blue}Enter Author URL (e.g., "https://yourwebsite.com"): ${colors.reset}`);
        const error = validateInput(authorURL, 'Author URL');
        if (error) {
            console.log(error);
            continue;
        }
        const urlError = validateURL(authorURL);
        if (urlError) {
            console.log(urlError);
            continue;
        }
        pluginInfo.authorURL = authorURL.trim();
        break;
    }

    // Plugin Namespace
    const suggestedNamespace = pluginInfo.name.replace(/[^a-zA-Z0-9]/g, '');
    while (true) {
        const pluginNamespace = await askQuestion(`${colors.blue}Enter Plugin Namespace (e.g., "RA") [${suggestedNamespace}]: ${colors.reset}`);
        const namespace = pluginNamespace.trim() || suggestedNamespace;
        const error = validateInput(namespace, 'Plugin Namespace');
        if (error) {
            console.log(error);
            continue;
        }
        // Validate namespace (alphanumeric only)
        if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(namespace)) {
            console.log(`${colors.red}Error: Namespace must start with a letter and contain only alphanumeric characters.${colors.reset}WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn`);
            continue;
        }
        pluginInfo.namespace = namespace;
        break;
    }

    return pluginInfo;
}

// Function to replace placeholders in file content
function replacePlaceholders(content, pluginInfo) {
    const replacements = {
        'wp-starter-kit': pluginInfo.name,
        'wp-starter-kit': pluginInfo.slug,
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA': pluginInfo.description,
        'ra': pluginInfo.authorName,
        'karim@gmail.com': pluginInfo.authorEmail,
        'https://example.com': pluginInfo.authorURL,
        'RA': pluginInfo.namespace,
        'WP_STARTER_KIT': pluginInfo.slug.toUpperCase().replace(/-/g, '_'),
        'rA': pluginInfo.slug.replace(/-([a-z])/g, (g) => g[1].toUpperCase()),
        'RA': pluginInfo.slug.replace(/(^|-)([a-z])/g, (g) => g[1].toUpperCase()),
        // Legacy replacements for existing content
        'wp-starter-kit': pluginInfo.slug,
        'wp-starter-kit-pro': pluginInfo.slug + '-pro',
        'RA': pluginInfo.namespace,
        'RAWPStarterKitWPStarterKitPro': pluginInfo.namespace + 'WPStarterKitWPStarterKitPro',
        // WPStarterKitWPStarterKitPro namespace replacements
        'RAWPStarterKitWPStarterKitPro': pluginInfo.namespace + 'WPStarterKitWPStarterKitPro',
        'RA': pluginInfo.namespace,
        'WP_STARTER_KIT_loaded': pluginInfo.slugUpper + '_loaded',
        'WP_STARTER_KIT_PRO_': pluginInfo.slugUpper + '_PRO_',
        'WP_STARTER_KIT_': pluginInfo.slugUpper + '_',
        'WP Starter Kit WPStarterKitWPStarterKitPro': pluginInfo.name + ' WPStarterKitWPStarterKitPro',
        'wp-starter-kit': pluginInfo.name,
        'wp-starter-kit-pro': pluginInfo.slug + '-pro',
        'wp-starter-kit': pluginInfo.slug
    };

    let newContent = content;
    for (const [placeholder, value] of Object.entries(replacements)) {
        newContent = newContent.replace(new RegExp(placeholder, 'g'), value);
    }

    return newContent;
}

// Function to rename files based on plugin slug
function renameFiles(pluginInfo) {
    const filesToRename = [
        { from: 'WP Starter Kit.php', to: `${pluginInfo.slug}.php` },
        { from: 'pro/wp-starter-kit-pro.php', to: `pro/${pluginInfo.slug}-pro.php` },
        { from: 'languages/WP Starter Kit.pot', to: `languages/${pluginInfo.slug}.pot` }
    ];

    const renamedFiles = [];
    
    for (const file of filesToRename) {
        try {
            if (fs.existsSync(file.from)) {
                fs.renameSync(file.from, file.to);
                renamedFiles.push({ from: file.from, to: file.to });
                console.log(`${colors.green}✓${colors.reset} Renamed: ${file.from} → ${file.to}`);
            }
        } catch (error) {
            console.log(`${colors.red}Error renaming ${file.from}: ${error.message}${colors.reset}`);
        }
    }
    
    return renamedFiles;
}

// Function to process a single file
function processFile(filePath, pluginInfo) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const newContent = replacePlaceholders(content, pluginInfo);
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            return true;
        }
        return false;
    } catch (error) {
        console.log(`${colors.red}Error processing ${filePath}: ${error.message}${colors.reset}`);
        return false;
    }
}

// Function to recursively process directory
function processDirectory(dirPath, pluginInfo, processedFiles = []) {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            // Skip certain directories
            if (['node_modules', '.git', 'vendor', 'build', 'dist'].includes(item)) {
                continue;
            }
            processDirectory(fullPath, pluginInfo, processedFiles);
        } else if (stat.isFile()) {
            // Skip certain file types
            if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot'].includes(path.extname(item))) {
                continue;
            }
            
            if (processFile(fullPath, pluginInfo)) {
                processedFiles.push(fullPath);
            }
        }
    }
    
    return processedFiles;
}

// Main execution function
async function main() {
    try {
        // Collect plugin information
        const pluginInfo = await collectPluginInfo();
        
        console.log(`WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn${colors.green}✓ Plugin information collected successfully!${colors.reset}WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn`);
        
        // Display collected information
        console.log(`${colors.cyan}Plugin Information:${colors.reset}`);
        console.log(`  Name: ${colors.yellow}${pluginInfo.name}${colors.reset}`);
        console.log(`  Slug: ${colors.yellow}${pluginInfo.slug}${colors.reset}`);
        console.log(`  Description: ${colors.yellow}${pluginInfo.description}${colors.reset}`);
        console.log(`  Namespace: ${colors.yellow}${pluginInfo.namespace}${colors.reset}`);
        console.log(`  Author: ${colors.yellow}${pluginInfo.authorName}${colors.reset}`);
        console.log(`  Email: ${colors.yellow}${pluginInfo.authorEmail}${colors.reset}`);
        console.log(`  URL: ${colors.yellow}${pluginInfo.authorURL}${colors.reset}WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn`);
        
        // Confirm before proceeding
        const confirm = await askQuestion(`${colors.blue}Do you want to proceed with updating all files? (y/N): ${colors.reset}`);
        if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
            console.log(`${colors.yellow}Operation cancelled.${colors.reset}`);
            rl.close();
            return;
        }
        
        console.log(`WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn${colors.cyan}Renaming files...${colors.reset}`);
        
        // Rename files based on plugin slug
        const renamedFiles = renameFiles(pluginInfo);
        
        console.log(`WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn${colors.cyan}WPStarterKitWPStarterKitProcessing files...${colors.reset}`);
        
        // WPStarterKitWPStarterKitProcess all files
        const processedFiles = processDirectory('.', pluginInfo);
        
        console.log(`WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn${colors.green}✓ Successfully processed ${processedFiles.length} files!${colors.reset}WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn`);
        
        if (renamedFiles.length > 0) {
            console.log(`${colors.cyan}Files renamed:${colors.reset}`);
            renamedFiles.forEach(file => {
                console.log(`  ${colors.green}✓${colors.reset} ${file.from} → ${file.to}`);
            });
        }
        
        if (processedFiles.length > 0) {
            console.log(`${colors.cyan}Files updated:${colors.reset}`);
            processedFiles.forEach(file => {
                console.log(`  ${colors.green}✓${colors.reset} ${file}`);
            });
        }
        
        console.log(`WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn${colors.green}🎉 Plugin boilerplate initialization completed successfully!${colors.reset}`);
        console.log(`${colors.yellow}You can now start developing your WordPress plugin.${colors.reset}WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn`);
        
    } catch (error) {
        console.log(`${colors.red}Error: ${error.message}${colors.reset}`);
    } finally {
        rl.close();
    }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { collectPluginInfo, replacePlaceholders, processFile, processDirectory, renameFiles };
