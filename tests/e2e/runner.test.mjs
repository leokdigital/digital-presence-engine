import { describe } from 'node:test';
import { runTier1Coverage } from './tier1_coverage.test.mjs';
import { runTier2Invariants } from './tier2_invariants.test.mjs';
import { runTier3Pipeline } from './tier3_pipeline.test.mjs';
import { runTier4Operational } from './tier4_operational.test.mjs';
import { runTier5MotionIntelligence } from './tier5_motion_intelligence.test.mjs';

describe('Leo K Digital - Unified E2E Quality Gate & Brand Compliance Suite', async () => {
  await runTier1Coverage();
  await runTier2Invariants();
  await runTier3Pipeline();
  await runTier4Operational();
  await runTier5MotionIntelligence();
});
