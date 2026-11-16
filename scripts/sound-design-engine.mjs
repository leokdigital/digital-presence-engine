#!/usr/bin/env node
/**
 * sound-design-engine.mjs - Motor de Sound Design & Mixagem de Áudio Baseado em Eventos
 * 
 * Inspirado no mesa.py do estúdio de IA.
 * Converte os eventos visuais da animação (src/motion/events.json) e a locução (src/content/voiceover_script.json)
 * em um plano de mixagem profissional de áudio:
 * 
 * 1. Alinhamento de SFX: pico no quadro exato do evento (at = evento - pico_ms/1000).
 * 2. Ducking Dinâmico: música -15 dB sob a voz, subindo nos respiros.
 * 3. Respiro antes do drop: 0.3s - 0.5s de silêncio antes do clímax.
 * 4. Masterização Broadcast: -14 LUFS integrado e pico verdadeiro <= -1 dBTP.
 */

import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const eventsPath = path.join(projectRoot, 'src', 'motion', 'events.json');
const voiceoverPath = path.join(projectRoot, 'src', 'content', 'voiceover_script.json');
const outReportPath = path.join(projectRoot, 'artifacts', 'audio_mix_report.json');

console.log('\n🎛️  Leo K Digital - Motor de Sound Design Baseado em Eventos');

if (!fs.existsSync(eventsPath)) {
  console.error(`Erro: Arquivo de eventos não encontrado: ${eventsPath}`);
  process.exit(1);
}

if (!fs.existsSync(voiceoverPath)) {
  console.error(`Erro: Roteiro de voz não encontrado: ${voiceoverPath}`);
  process.exit(1);
}

const eventsData = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));
const voiceoverData = JSON.parse(fs.readFileSync(voiceoverPath, 'utf-8'));

const master = eventsData.master_standards || {
  target_lufs: -14,
  true_peak_dbtp: -1.0,
  voice_ducking_db: -15.0,
  pause_before_drop_seconds: 0.4
};

console.log(`📋 Padrões de Masterização:`);
console.log(`   - Master LUFS: ${master.target_lufs} LUFS`);
console.log(`   - True Peak: ${master.true_peak_dbtp} dBTP`);
console.log(`   - Ducking sob a voz: ${master.voice_ducking_db} dB`);

// Mapeamento de picos típicos por categoria (em ms)
const PICO_OFFSET_MS = {
  clique: 10,
  pop: 15,
  carimbo: 25,
  impacto: 30,
  whoosh: 200, // no whoosh o pico fica no meio do gesto
  brilho: 40,
  sucesso: 50,
  riser: 0,
  digitacao: 8
};

const cueSheet = eventsData.events.map(evt => {
  const offsetMs = PICO_OFFSET_MS[evt.sfx_category] || 15;
  const triggerSec = Math.max(0, evt.timestamp_seconds - (offsetMs / 1000));
  return {
    id: evt.id,
    action: evt.action,
    category: evt.sfx_category,
    sfx_type: evt.sfx_type,
    exact_visual_time_s: evt.timestamp_seconds,
    audio_trigger_time_s: parseFloat(triggerSec.toFixed(3)),
    offset_lead_ms: offsetMs,
    volume_db: evt.volume_db,
    tonal_key: evt.tonal_key || 'neutral'
  };
});

console.log(`\n🎵 Cue Sheet de Efeitos Sincronizados (${cueSheet.length} eventos):`);
cueSheet.forEach(cue => {
  console.log(`   [${cue.audio_trigger_time_s.toFixed(2)}s] ${cue.action} -> ${cue.sfx_type} (${cue.volume_db}dB, tom: ${cue.tonal_key})`);
});

const report = {
  timestamp: new Date().toISOString(),
  engine: "Leo K Digital Sound Design Engine",
  master_standards: master,
  voice_track: {
    voice_name: voiceoverData.voice || "Adam",
    language: voiceoverData.language || "pt-BR",
    scenes_count: (voiceoverData.scenes || []).length,
    total_frames: voiceoverData.total_frames || 1800
  },
  events_count: cueSheet.length,
  cue_sheet: cueSheet,
  ffmpeg_loudnorm_filter: `loudnorm=I=${master.target_lufs}:TP=${master.true_peak_dbtp}:LRA=7:measured_I=-18:measured_TP=-1.5:measured_LRA=6:linear=true`
};

fs.mkdirSync(path.dirname(outReportPath), { recursive: true });
fs.writeFileSync(outReportPath, JSON.stringify(report, null, 2), 'utf-8');
console.log(`\n✅ Relatório de mixagem sonoro exportado em:`);
console.log(`   ${outReportPath}`);
