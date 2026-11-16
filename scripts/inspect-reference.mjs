#!/usr/bin/env node
/**
 * inspect-reference.mjs - Ferramenta de Análise Quadro a Quadro & Folha de Contato
 * 
 * Inspirada na metodologia do estúdio de IA (Do Zero ao Motion com IA) para inspecionar
 * referências e renders finais sem alucinações.
 * 
 * Uso:
 *   node scripts/inspect-reference.mjs <caminho-do-video.mp4> [--grid=4x4] [--out=pasta_saida]
 */

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
if (args.length === 0 || args[0].startsWith('--')) {
  console.error('Uso: node scripts/inspect-reference.mjs <caminho-do-video.mp4> [--grid=3x3|4x4]');
  process.exit(1);
}

const videoPath = path.resolve(args[0]);
if (!fs.existsSync(videoPath)) {
  console.error(`Erro: Arquivo de vídeo não encontrado em: ${videoPath}`);
  process.exit(1);
}

let grid = '4x3'; // 12 quadros por padrão
const gridArg = args.find(a => a.startsWith('--grid='));
if (gridArg) {
  grid = gridArg.split('=')[1];
}

console.log(`\n🔍 Analisando vídeo de referência: ${path.basename(videoPath)}`);

// 1. Obter metadados via ffprobe
try {
  const probeCmd = `ffprobe -v quiet -print_format json -show_format -show_streams "${videoPath}"`;
  const rawMeta = execSync(probeCmd, { encoding: 'utf-8' });
  const meta = JSON.parse(rawMeta);

  const vStream = meta.streams.find(s => s.codec_type === 'video');
  const aStream = meta.streams.find(s => s.codec_type === 'audio');

  const durationSec = parseFloat(meta.format.duration || vStream.duration || 0);
  const width = vStream ? vStream.width : 'N/A';
  const height = vStream ? vStream.height : 'N/A';
  const rFrameRate = vStream ? vStream.r_frame_rate : '30/1';
  const [num, den] = rFrameRate.split('/').map(Number);
  const fps = den ? Math.round(num / den) : 30;

  console.log(`📊 Metadados do Arquivo:`);
  console.log(`   - Resolução: ${width}x${height} (${width < height ? 'Vertical 9:16' : 'Horizontal 16:9'})`);
  console.log(`   - Duração: ${durationSec.toFixed(2)}s (${Math.round(durationSec * fps)} quadros)`);
  console.log(`   - Taxa de Quadros: ${fps} fps`);
  console.log(`   - Codec Vídeo: ${vStream ? vStream.codec_name : 'N/A'}`);
  console.log(`   - Áudio: ${aStream ? `${aStream.codec_name} @ ${aStream.sample_rate}Hz` : 'Sem áudio'}`);

  // 2. Gerar Folha de Contato (Contact Sheet Mosaic)
  const baseName = path.basename(videoPath, path.extname(videoPath));
  const outDir = path.dirname(videoPath);
  const contactSheetPath = path.join(outDir, `${baseName}_contact_sheet.jpg`);

  const [cols, rows] = grid.split('x').map(Number);
  const totalTiles = (cols || 4) * (rows || 3);
  const interval = durationSec / (totalTiles + 1);

  console.log(`\n📸 Gerando Folha de Contato (${grid} = ${totalTiles} quadros) em:`);
  console.log(`   ${contactSheetPath}`);

  // Filtro de ffmpeg para extrair quadros em intervalos regulares e montar o mosaico com timestamp
  const filter = `select='not(mod(n\\,${Math.floor(fps * interval)}))',scale=270:480,tile=${grid}:padding=4:margin=4:color=black`;
  const contactCmd = `ffmpeg -y -i "${videoPath}" -vf "${filter}" -frames:v 1 -q:v 2 "${contactSheetPath}"`;

  execSync(contactCmd, { stdio: 'pipe' });

  if (fs.existsSync(contactSheetPath)) {
    const stats = fs.statSync(contactSheetPath);
    console.log(`✅ Folha de contato criada com sucesso! (${(stats.size / 1024).toFixed(1)} KB)`);
  }

} catch (err) {
  console.error(`Erro ao inspecionar o vídeo com FFmpeg: ${err.message}`);
  process.exit(1);
}
