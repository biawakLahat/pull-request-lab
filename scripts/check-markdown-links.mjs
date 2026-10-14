import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? '.');
const ignoredDirectories = new Set(['.git', '.tmp', 'node_modules']);

async function markdownFiles(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory() && !ignoredDirectories.has(entry.name)) {
      result.push(...await markdownFiles(filename));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      result.push(filename);
    }
  }
  return result.sort();
}

function withoutCodeBlocks(text) {
  let fence = null;
  return text.replace(/<!--[\s\S]*?-->/g, '').split(/\r?\n/u).map(line => {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})/u)?.[1];
    if (fence) {
      if (marker && marker[0] === fence[0] && marker.length >= fence.length) fence = null;
      return '';
    }
    if (marker) {
      fence = marker;
      return '';
    }
    return line;
  }).join('\n');
}

const files = await markdownFiles(root);
const failures = [];
let checked = 0;
for (const filename of files) {
  const content = withoutCodeBlocks(await readFile(filename, 'utf8'));
  const links = content.matchAll(/!?\[[^\]\n]*\]\(\s*(<[^>\n]+>|[^\s)]+)(?:\s+["'][^"'\n]*["'])?\s*\)/gu);
  for (const match of links) {
    const raw = match[1].replace(/^<|>$/gu, '');
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/iu.test(raw)) continue;
    const localPath = raw.split(/[?#]/u)[0];
    if (!localPath) continue;
    checked += 1;
    const location = `${path.relative(root, filename)}:${content.slice(0, match.index).split('\n').length}`;
    try {
      const target = path.resolve(path.dirname(filename), decodeURIComponent(localPath));
      const relative = path.relative(root, target);
      if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
        throw new Error('target is outside the repository');
      }
      await stat(target);
    } catch (error) {
      failures.push(`${location}: ${raw} (${error.code === 'ENOENT' ? 'target not found' : error.message})`);
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${checked} relative inline links in ${files.length} Markdown files.`);
}
