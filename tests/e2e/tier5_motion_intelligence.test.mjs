import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import {
  PROJECT_ROOT,
  resolvePath,
  resolveArtifactPath,
  fileExists,
  readProjectFile,
  readJsonFile
} from './helpers.mjs';

export async function runTier5MotionIntelligence(suiteName = 'Tier 5: Motion Engineering & Reference Intelligence') {
  await describe(suiteName, () => {

    describe('5.1 Palácio Mental Reference Intelligence', () => {
      it('docs/references/palacio_mental_catalogo.md exists, has length >= 1000 and indexes 131 references', () => {
        const catPath = resolvePath('docs/references/palacio_mental_catalogo.md');
        assert.ok(fileExists(catPath), 'palacio_mental_catalogo.md must exist');
        const content = readProjectFile('docs/references/palacio_mental_catalogo.md');
        assert.ok(content.length >= 1000, `Expected >= 1000 chars, got ${content.length}`);
        assert.ok(content.includes('131 referências'), 'Must mention 131 referências');
        assert.ok(content.includes('UI-Produto'), 'Must categorize UI-Produto');
        assert.ok(content.includes('Sound Design'), 'Must categorize Sound Design');
        assert.ok(content.includes('Multiply Sound'), 'Must cite Multiply Sound');
        assert.ok(content.includes('Editwithtrix'), 'Must cite Editwithtrix');
      });
    });

    describe('5.2 Event-Driven Audio Engine & Cue Contract', () => {
      it('src/motion/events.json parses cleanly and complies with sound master standards', () => {
        const events = readJsonFile('src/motion/events.json');
        assert.ok(events.master_standards, 'Must define master_standards');
        assert.strictEqual(events.master_standards.target_lufs, -14, 'Target LUFS must be -14 for broadcast motion');
        assert.ok(events.master_standards.true_peak_dbtp <= -1.0, 'True peak must be <= -1.0 dBTP');
        assert.strictEqual(events.master_standards.voice_ducking_db, -15.0, 'Voice ducking must be -15.0 dB');
      });

      it('src/motion/events.json contains >= 10 timed SFX events within [0, 30] seconds', () => {
        const events = readJsonFile('src/motion/events.json');
        assert.ok(Array.isArray(events.events), 'events.events must be an array');
        assert.ok(events.events.length >= 10, `Expected >= 10 events, got ${events.events.length}`);

        for (const evt of events.events) {
          assert.ok(evt.id, 'Every event must have an id');
          assert.ok(typeof evt.timestamp_seconds === 'number', 'timestamp_seconds must be a number');
          assert.ok(evt.timestamp_seconds >= 0 && evt.timestamp_seconds <= 30.0, `Timestamp ${evt.timestamp_seconds} must be within 0-30s`);
          assert.ok(evt.sfx_category, `Event ${evt.id} must define sfx_category`);
          assert.ok(typeof evt.volume_db === 'number', `Event ${evt.id} must define volume_db`);
        }
      });
    });

    describe('5.3 Audio Mixing Report & Sincronia Lead Offsets', () => {
      it('artifacts/audio_mix_report.json exists and verifies audio trigger lead times', () => {
        const reportPath = resolveArtifactPath('audio_mix_report.json');
        assert.ok(fileExists(reportPath), 'artifacts/audio_mix_report.json must exist');
        const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
        assert.ok(report.cue_sheet && report.cue_sheet.length >= 10, 'Must have at least 10 cues in cue_sheet');
        for (const cue of report.cue_sheet) {
          assert.ok(cue.audio_trigger_time_s <= cue.exact_visual_time_s, `Audio trigger ${cue.audio_trigger_time_s} must lead or match visual time ${cue.exact_visual_time_s}`);
        }
        assert.ok(report.ffmpeg_loudnorm_filter.includes('I=-14:TP=-1'), 'Loudnorm filter must target I=-14:TP=-1');
      });
    });

    describe('5.4 Motion Tooling Syntactic Integrity (node --check)', () => {
      it('scripts/inspect-reference.mjs syntax is valid', () => {
        const scriptPath = resolvePath('scripts/inspect-reference.mjs');
        assert.ok(fileExists(scriptPath), 'scripts/inspect-reference.mjs must exist');
        execSync(`node --check "${scriptPath}"`);
      });

      it('scripts/sound-design-engine.mjs syntax is valid', () => {
        const scriptPath = resolvePath('scripts/sound-design-engine.mjs');
        assert.ok(fileExists(scriptPath), 'scripts/sound-design-engine.mjs must exist');
        execSync(`node --check "${scriptPath}"`);
      });
    });

  });
}
