import { describe } from 'node:test';
import { runTier1Coverage } from './tier1_coverage.test.mjs';
import { runTier2Invariants } from './tier2_invariants.test.mjs';
import { runTier3Pipeline } from './tier3_pipeline.test.mjs';
import { runTier4Operational } from './tier4_operational.test.mjs';
import { getActiveBrand } from './helpers.mjs';

const brand = getActiveBrand();
describe(`Agency Digital Presence Engine — Unified Quality Gate [${brand.name}]`, async () => {
  await runTier1Coverage();
  await runTier2Invariants();
  await runTier3Pipeline();
  await runTier4Operational();
});
