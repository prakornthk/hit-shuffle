// CI validator for hit-shuffle — checks the SONGS dataset inside index.html.
// Run: node scripts/validate.mjs
import { readFileSync } from "node:fs";

const EXPECTED_MONTHS = [
  "2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06",
  "2024-07", "2024-08", "2024-09", "2024-10", "2024-11", "2024-12",
  "2025-01", "2025-02", "2025-03", "2025-04", "2025-05", "2025-06",
  "2025-07", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12",
];
const KNOWN_GENRES = new Set(["thai", "intl", "kpop", "latin"]);

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const start = html.indexOf("const SONGS = [");
const end = html.indexOf("];", start);
if (start === -1 || end === -1) {
  console.error("FAIL: cannot find the SONGS array in index.html");
  process.exit(1);
}
const SONGS = new Function(`return ${html.slice(start + "const SONGS = ".length, end + 1)};`)();

const errors = [];
const warnings = [];
if (!Array.isArray(SONGS) || SONGS.length === 0) {
  errors.push("SONGS is empty or not an array");
}

const seen = new Map();
const byMonth = new Map(EXPECTED_MONTHS.map((m) => [m, 0]));
for (const [i, s] of SONGS.entries()) {
  for (const field of ["t", "a", "ym", "g"]) {
    if (!s?.[field] || String(s[field]).trim() === "") {
      errors.push(`song #${i + 1}: missing field "${field}"`);
    }
  }
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(s?.ym ?? "")) {
    errors.push(`song #${i + 1} ("${s?.t}"): bad ym "${s?.ym}" — expected YYYY-MM`);
  } else if (byMonth.has(s.ym)) {
    byMonth.set(s.ym, byMonth.get(s.ym) + 1);
  } else {
    warnings.push(`song #${i + 1} ("${s.t}"): ym "${s.ym}" is outside the seeded 2024-01..2025-12 range`);
  }
  if (s?.g && !KNOWN_GENRES.has(s.g)) {
    warnings.push(`song #${i + 1} ("${s.t}"): unknown genre "${s.g}" (known: ${[...KNOWN_GENRES].join(", ")})`);
  }
  const key = `${s?.ym}::${s?.t}::${s?.a}`;
  if (seen.has(key)) {
    errors.push(`duplicate entry: "${s?.t}" by "${s?.a}" in ${s?.ym} (also #${seen.get(key) + 1})`);
  }
  seen.set(key, i);
}
for (const [m, n] of byMonth) {
  if (n === 0) errors.push(`month ${m} has no songs`);
}

console.log(`SONGS: ${SONGS.length} songs across ${[...byMonth.values()].filter((n) => n > 0).length}/${EXPECTED_MONTHS.length} months`);
for (const w of warnings) console.warn(`WARN: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`FAIL: ${e}`);
  process.exit(1);
}
console.log("OK: dataset valid");
