// pnpm dev <concept>   e.g. `pnpm dev baseline` or `pnpm dev 01`
import { spawnSync } from 'node:child_process';
import { findConcept, listConcepts, ROOT } from './lib.mjs';

const query = process.argv[2];
const dir = query && findConcept(query);
if (!dir) {
  console.error(`Usage: pnpm dev <concept>\nConcepts: ${listConcepts().join(', ')}`);
  process.exit(1);
}
const { status } = spawnSync('pnpm', ['--filter', `./concepts/${dir}`, 'dev', ...process.argv.slice(3).filter((a) => a !== '--')], { cwd: ROOT, stdio: 'inherit' });
process.exit(status ?? 1);
