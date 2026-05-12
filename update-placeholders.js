#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

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

// Plugin information - these would be collected from user input
const pluginInfo = {
    name: 'wp-starter-kit',
    slug: 'wp-starter-kit',
    description: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    authorName: 'ra',
    authorEmail: 'karim@gmail.com',
    authorURL: 'https://example.com',
    slugUpper: 'WP_STARTER_KIT',
    slugCamel: 'rA',
    slugPascal: 'RA'
};

// Function to replace placeholders in file content
function replacePlaceholders(content, pluginInfo) {
    const replacements = {
        'wp-starter-kit': pluginInfo.name,
        'wp-starter-kit': pluginInfo.slug,
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA': pluginInfo.description,
        'ra': pluginInfo.authorName,
        'karim@gmail.com': pluginInfo.authorEmail,
        'https://example.com': pluginInfo.authorURL,
        'WP_STARTER_KIT': pluginInfo.slugUpper,
        'rA': pluginInfo.slugCamel,
        'RA': pluginInfo.slugPascal,
        'RA': pluginInfo.slugPascal + 'WPStarterKitWPStarterKitWPStarterKit\WPStarterKitWPStarterKitWPStarterKitWPStarterKitWPStarterKit\WPStarterKitWPStarterKit' + pluginInfo.slugPascal,
        'RAWPStarterKitWPStarterKitPro': pluginInfo.slugPascal + 'WPStarterKitWPStarterKitPro',
        'RAPluginOptions': pluginInfo.slugPascal + 'PluginOptions'
    };

    let newContent = content;
    for (const [placeholder, value] of Object.entries(replacements)) {
        newContent = newContent.replace(new RegExp(placeholder, 'g'), value);
    }

    return newContent;
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
            if (['node_modules', '.git', 'vendor', 'build', 'dist', 'dependencies'].includes(item)) {
                continue;
            }
            processDirectory(fullPath, pluginInfo, processedFiles);
        } else if (stat.isFile()) {
            // Skip certain file types
            if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.map'].includes(path.extname(item))) {
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
function main() {
    console.log(`${colors.cyan}${colors.bright}🔄 Updating placeholders in all files...${colors.reset}WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn`);
    
    try {
        // WPStarterKitWPStarterKitProcess all files
        const processedFiles = processDirectory('.', pluginInfo);
        
        console.log(`${colors.green}✓ Successfully processed ${processedFiles.length} files!${colors.reset}WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn`);
        
        if (processedFiles.length > 0) {
            console.log(`${colors.cyan}Files updated:${colors.reset}`);
            processedFiles.forEach(file => {
                console.log(`  ${colors.green}✓${colors.reset} ${file}`);
            });
        }
        
        console.log(`WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn${colors.green}🎉 Placeholder update completed successfully!${colors.reset}WPStarterKitWPStarterKit\WPStarterKitWPStarterKitn`);
        
    } catch (error) {
        console.log(`${colors.red}Error: ${error.message}${colors.reset}`);
    }
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { replacePlaceholders, processFile, processDirectory };
