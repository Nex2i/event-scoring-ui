import fs from 'fs';
import { execSync } from 'child_process';

// Get the current Git commit hash
const commitHash = execSync('git rev-parse HEAD').toString().trim();

// Use your method of injecting environment variables. Here, we modify the .env file.
const envFilePath = '.env';
const existingContents = fs.existsSync(envFilePath) ? fs.readFileSync(envFilePath, 'utf-8') : '';
const newContents = `VITE_COMMIT_HASH=${commitHash}\n${existingContents}`;
fs.writeFileSync(envFilePath, newContents);

console.log(`Commit Hash set: ${commitHash}`);
