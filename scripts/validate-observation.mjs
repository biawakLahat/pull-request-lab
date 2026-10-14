import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

function validDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/u.test(value)
    && Number.isFinite(Date.parse(value));
}

export function validateObservation(record) {
  const errors = [];
  const text = value => typeof value === 'string' && value.trim().length > 0;
  if (!record || typeof record !== 'object' || Array.isArray(record)) return ['record must be an object'];
  if (record.schemaVersion !== 1) errors.push('schemaVersion must be 1');
  if (!validDate(record.observedAt)) errors.push('observedAt must be an ISO timestamp in UTC');
  if (!text(record.profile?.login)) errors.push('profile.login is required');
  if (record.profile?.url !== `https://github.com/${record.profile?.login}`) errors.push('profile.url must match the login');
  if (!Array.isArray(record.visibleAchievements) || record.visibleAchievements.some(value => !text(value))) {
    errors.push('visibleAchievements must be an array of names');
  } else if (new Set(record.visibleAchievements).size !== record.visibleAchievements.length) {
    errors.push('visibleAchievements must not contain duplicates');
  }
  if (!Array.isArray(record.pullRequests) || record.pullRequests.length === 0) {
    errors.push('pullRequests must contain at least one observed PR');
  } else {
    const urls = new Set();
    for (const [index, pr] of record.pullRequests.entries()) {
      const prefix = `pullRequests[${index}]`;
      if (!pr || typeof pr !== 'object') {
        errors.push(`${prefix} must be an object`);
        continue;
      }
      if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/pull\/[1-9]\d*$/u.test(pr.url ?? '')) errors.push(`${prefix}.url must be a GitHub PR URL`);
      if (urls.has(pr.url)) errors.push(`${prefix}.url is duplicated`);
      urls.add(pr.url);
      if (!text(pr.author)) errors.push(`${prefix}.author is required`);
      if (typeof pr.merged !== 'boolean') errors.push(`${prefix}.merged must be a boolean`);
      if (pr.merged === true && (!text(pr.mergedBy) || !validDate(pr.mergedAt))) errors.push(`${prefix} needs merger and merge time`);
      if (pr.merged === false && (pr.mergedBy !== null || pr.mergedAt !== null)) errors.push(`${prefix} must use null merge details when unmerged`);
    }
  }
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const filenames = process.argv.slice(2);
  if (!filenames.length) {
    console.error('Usage: node scripts/validate-observation.mjs PATH_TO_RECORD.json');
    process.exitCode = 1;
  }
  for (const filename of filenames) {
    try {
      const errors = validateObservation(JSON.parse(await readFile(filename, 'utf8')));
      if (errors.length) {
        console.error(`${filename}: ${errors.join('; ')}`);
        process.exitCode = 1;
      } else console.log(`${filename}: valid observation record`);
    } catch (error) {
      console.error(`${filename}: ${error.message}`);
      process.exitCode = 1;
    }
  }
}
