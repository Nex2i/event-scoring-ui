import fs from 'fs';
import { execSync } from 'child_process';

// Get the current Git commit hash
const commitHash = execSync('git rev-parse HEAD').toString().trim();

// Path to your .env file
const envFilePath = '.env';
const envVarName = 'VITE_COMMIT_HASH';

// Check if the .env file exists and read its contents
const existingContents = fs.existsSync(envFilePath) ? fs.readFileSync(envFilePath, 'utf-8') : '';

// Split the contents into lines for easier manipulation
const lines = existingContents.split('\n');

// Check if the variable already exists and update it; otherwise, add it
const updatedLines = lines.map((line) =>
  line.startsWith(`${envVarName}=`) ? `${envVarName}=${commitHash}` : line
);

// If the variable was not found in existing lines, add it
if (!updatedLines.some((line) => line.startsWith(`${envVarName}=`))) {
  updatedLines.push(`${envVarName}=${commitHash}`);
}

// Join the lines back into a single string and write it back to the .env file
const newContents = updatedLines.join('\n').trim() + '\n'; // Ensure trailing newline
fs.writeFileSync(envFilePath, newContents);

console.log(`Commit Hash set: ${commitHash}`);
