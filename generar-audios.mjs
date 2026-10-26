// Uso (en tu PC con Windows, cada vez que cambies respuestas.mjs):
//   npm install dectalk      (solo la primera vez)
//   node generar-audios.mjs
import { say } from "dectalk";
import { mkdirSync, writeFileSync } from "fs";
import { VOZ, intro, respuestas, porDefecto } from "./respuestas.mjs";
import { fonetica } from "./fonetica.mjs";

mkdirSync("audio", { recursive: true });

// Un audio por respuesta; si tiene "partes", uno por parte (id_1.wav, id_2.wav...).
const trabajos = [];
for (const r of [intro, ...respuestas, ...porDefecto]) {
  if (r.partes) r.partes.forEach((p, i) => trabajos.push([`${r.id}_${i + 1}`, p.habla ?? fonetica(p.texto)]));
  else trabajos.push([r.id, r.habla ?? fonetica(r.texto)]);
}

for (const [nombre, habla] of trabajos) {
  const wav = await say(`${VOZ} ${habla}`);
  writeFileSync(`audio/${nombre}.wav`, wav);
  console.log(`ok  audio/${nombre}.wav  <-  ${habla.slice(0, 70)}`);
}
