import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const syncProcess = spawn(process.execPath, [path.join(__dirname, 'sync-env.mjs')], {
  stdio: 'inherit',
  cwd: rootDir,
});

syncProcess.on('close', (code) => {
  if (code !== 0) {
    process.exit(code ?? 1);
  }

  const port = process.env.NG_PORT || '5000';
  const extraArgs = process.argv.slice(2);

  let ngCliPath;
  try {
    const require = createRequire(import.meta.url);
    ngCliPath = require.resolve('@angular/cli/bin/ng.js');
  } catch {
    ngCliPath = path.join(rootDir, 'node_modules', '@angular', 'cli', 'bin', 'ng.js');
  }

  const ngArgs = [ngCliPath, 'serve', '--port', port, ...extraArgs];

  console.log(`[dev] Launching Angular dev server on port ${port}...`);

  const serve = spawn(process.execPath, ngArgs, {
    stdio: 'inherit',
    cwd: rootDir,
  });

  serve.on('close', (serveCode) => {
    process.exit(serveCode ?? 0);
  });
});
