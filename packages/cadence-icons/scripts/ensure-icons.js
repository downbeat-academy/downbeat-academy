#!/usr/bin/env node
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const componentsPath = resolve(__dirname, '../src/components/index.ts');

if (!existsSync(componentsPath)) {
  console.log('Icons not generated yet, running icons:build...');
  try {
    execSync('pnpm icons:build', { 
      stdio: 'inherit',
      cwd: resolve(__dirname, '..')
    });
  } catch (error) {
    console.error('Failed to generate icons:', error);
    process.exit(1);
  }
}