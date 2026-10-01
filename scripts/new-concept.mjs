// pnpm new-concept <slug>   e.g. `pnpm new-concept editorial` creates concepts/02-editorial
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { CONCEPTS, ROOT, listConcepts } from './lib.mjs';

const raw = process.argv[2];
const from = process.argv.includes('--from') ? process.argv[process.argv.indexOf('--from') + 1] : '_template';
if (!raw) {
  console.error('Usage: pnpm new-concept <slug> [--from <existing-concept>]');
  process.exit(1);
}
const slug = raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const next = Math.max(0, ...listConcepts().map((c) => parseInt(c, 10)).filter(Number.isFinite)) + 1;
const dir = `${String(next).padStart(2, '0')}-${slug}`;
const dest = join(CONCEPTS, dir);
if (!existsSync(join(CONCEPTS, from))) {
  console.error(`No concept named "${from}" to copy from.`);
  process.exit(1);
}

cpSync(join(CONCEPTS, from), dest, {
  recursive: true,
  filter: (src) => !/[/\\](node_modules|dist|\.astro)([/\\]|$)/.test(src),
});

const pkgPath = join(dest, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.name = `@concept/${dir}`;
writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const briefPath = join(dest, 'BRIEF.md');
writeFileSync(
  briefPath,
  readFileSync(briefPath, 'utf8')
    .replace(/^title: .*$/m, `title: ${title}`)
    .replace(/^# .*$/m, `# ${dir.slice(0, 2)} · ${title}`),
);

spawnSync('pnpm', ['install'], { cwd: ROOT, stdio: 'inherit' });
console.log(`\nCreated concepts/${dir} (from ${from}).\n  1. Fill in concepts/${dir}/BRIEF.md\n  2. pnpm dev ${slug}`);
