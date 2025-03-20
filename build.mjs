import * as fs from 'node:fs/promises';
import { parse } from 'jsonc-parser';
import merge from 'lodash.merge';

// Define a filter function to exclude browser-specific manifest files
function filterFiles(src) {
    const excludeFiles = [
        "manifest.firefox.json",
        "manifest.chrome.json",
        "manifest.common.json"
    ];
    return !excludeFiles.some(file => src.endsWith(file)) && !src.endsWith(".scss");
}

async function copyDir(src, dest) {
    try {
        // Ensure the destination directory exists
        await fs.mkdir(dest, { recursive: true });

        // Copy files with filtering
        await fs.cp(src, dest, { recursive: true, filter: filterFiles });
    } catch (err) {
        console.error(`Error copying ${src} to ${dest}:`, err);
    }
}

async function mergeJSONWithComments(file1, file2, outputFile) {
    try {
        // Read both JSONC files
        const [rawData1, rawData2] = await Promise.all([
            fs.readFile(file1, 'utf-8'),
            fs.readFile(file2, 'utf-8')
        ]);

        // Parse JSONC with comments
        const data1 = parse(rawData1);
        const data2 = parse(rawData2);

        // Deep merge JSON objects
        const mergedData = merge({}, data2, data1);

        // Write merged data back to file
        await fs.writeFile(outputFile, JSON.stringify(mergedData, null, 2));
    } catch (err) {
        console.error(`Error merging ${file1} and ${file2}:`, err);
    }
}

async function build() {
    const browsers = ["chrome", "firefox"];
    const commonDir = "common/";

    for (const browser of browsers) {
        const buildPath = `build/${browser}/`;

        await copyDir(`${browser}/`, buildPath);
        await copyDir(commonDir, buildPath);

        await mergeJSONWithComments(
            `${browser}/manifest.${browser}.json`,
            `${commonDir}manifest.common.json`,
            `${buildPath}manifest.json`
        );
    }

    console.log("Build completed!");
}

build().catch(err => console.error("Build failed:", err));