#!/usr/bin/env node
// Self-contained freshness gate for this aggregator: every first-party EXACT
// pin must match npm-latest. No install required — compares package.json pins
// to the registry directly (the aggregator carries no node_modules, so an
// install-based `npm outdated` reports MISSING and exits 0, which is useless as
// a gate). Wired into prepublishOnly so `npm publish` refuses on a stale pin —
// the re-pin treadmill (a child publishes, this pin silently falls behind) can
// no longer ship. Caret/range floors are intentional minimums and never flagged.
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const pj = JSON.parse(readFileSync(path.join(here, "..", "package.json"), "utf-8"));

const triplet = (v) => v.replace(/^[\^~>=<\s]+/, "").split("-")[0].split(".").map(Number);
const cmp = (a, b) => { const [A, B] = [triplet(a), triplet(b)]; for (let i = 0; i < 3; i += 1) { if ((A[i] || 0) !== (B[i] || 0)) return (A[i] || 0) - (B[i] || 0); } return 0; };
const isExact = (range) => /^\d/.test(range);

const stale = [];
for (const field of ["dependencies", "devDependencies", "optionalDependencies"]) {
    for (const [name, range] of Object.entries(pj[field] || {})) {
        if (!isExact(range)) continue;
        let latest = null;
        try { latest = execFileSync("npm", ["view", name, "version"], { encoding: "utf-8" }).trim(); } catch { /* unpublished */ }
        if (latest && cmp(range, latest) < 0) stale.push({ field, name, range, latest });
    }
}

if (stale.length === 0) {
    console.log(`deps:fresh — OK, ${Object.keys({ ...pj.dependencies, ...pj.devDependencies }).length} pins match npm-latest.`);
    process.exit(0);
}
console.error("deps:fresh — STALE first-party exact pins:");
for (const s of stale) console.error(`  ${s.name}  pins ${s.range} → npm ${s.latest}  [${s.field}]`);
process.exit(1);
