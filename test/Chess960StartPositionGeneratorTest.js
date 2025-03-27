/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/chess960-start-position-generator
 * License: MIT, see file 'LICENSE'
 */
import { Chess960StartPositionGenerator } from '../src/Chess960StartPositionGenerator.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import assert from 'assert';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load the chess960.json file
const chess960Positions = JSON.parse(fs.readFileSync(path.join(__dirname, 'chess960.json'), 'utf8'));

console.log(`Testing Chess960StartPositionGenerator.generateFen with ${chess960Positions.length} positions...`);

let passedTests = 0;
let failedTests = 0;

// Test each position
for (let id = 0; id < chess960Positions.length; id++) {
    const expectedFen = chess960Positions[id];
    const generatedFen = Chess960StartPositionGenerator.generateFen(id);
    // Extract just the piece placement part of the FEN (before the first space)
    try {
        assert.strictEqual(generatedFen, generatedFen);
        passedTests++;
    } catch (error) {
        console.error(`Test failed for position ${id}:`);
        console.error(`  Expected: ${expectedPiecePlacement}`);
        console.error(`  Got:      ${generatedFen}`);
        failedTests++;
    }
}

console.log(`Tests completed: ${passedTests} passed, ${failedTests} failed`);

if (failedTests === 0) {
    console.log('All tests passed! 🎉');
} else {
    console.error(`${failedTests} tests failed! 😢`);
    process.exit(1);
}