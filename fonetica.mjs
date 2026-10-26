// Convierte texto en español a una "ortografía inglesa" que DECtalk lee con
// acento español aproximado. Es automático: si una frase suena mal, ponle un
// campo "habla" a mano en respuestas.mjs y se usará ese en su lugar.
const EXCEPCIONES = { helibot: "helly bot", ia: "ay eye", smoothie: "smoo thee", gomez: "go mess" };
const VOC = { a: "ah", e: "eh", i: "ee", o: "oh", u: "oo" };
const DIPTONGO = { ai: "eye", ei: "ay", oi: "oy", au: "ow" };
const ONSET2 = ["pr", "br", "tr", "dr", "kr", "gr", "fr", "pl", "bl", "kl", "gl", "fl"];
const en = (conjunto, ch) => ch !== "" && conjunto.includes(ch);

function tokens(w) {
  const t = [];
  const C = (s) => t.push({ c: s });
  const V = (s) => t.push({ v: s });
  for (let i = 0; i < w.length; i++) {
    const c = w[i], n = w[i + 1] ?? "", nn = w[i + 2] ?? "";
    if (/[AEIOU]/.test(c)) V(VOC[c.toLowerCase()]);            // vocal acentuada
    else if (c === "q") { C("k"); if (n === "u") i++; }
    else if (c === "g" && n === "u" && en("ei", nn)) { C("g"); i++; }
    else if (c === "g") C(en("ei", n) ? "h" : "g");
    else if (c === "c" && n === "h") { C("ch"); i++; }
    else if (c === "c") C(en("ei", n) ? "s" : "k");
    else if (c === "l" && n === "l") { C("y"); i++; }
    else if (c === "r" && n === "r") { C("r"); i++; }
    else if (c === "h") continue;
    else if (c === "j") C("h");
    else if (c === "z") C("s");
    else if (c === "v") C("b");
    else if (c === "x") C("ks");
    else if (c === "y") { if (w === "y") V("ee"); else C("y"); }
    else if (en("iu", c) && en("aeiou", n) && n !== c) C(c === "i" ? "y" : "w");
    else if (en("aeo", c) && DIPTONGO[c + n]) { V(DIPTONGO[c + n]); i++; }
    else if (VOC[c]) V(VOC[c]);
    else C(c);
  }
  return t;
}

function unir(toks) {
  const sil = [];
  let cur = "", tieneV = false, cons = [];
  for (const t of toks) {
    if (t.c) { cons.push(t.c); continue; }
    if (!tieneV) cur = cons.join("") + t.v;
    else {
      let coda = [], ons = cons;
      if (cons.length >= 2) {
        ons = ONSET2.includes(cons.slice(-2).join("")) ? cons.slice(-2) : cons.slice(-1);
        coda = cons.slice(0, cons.length - ons.length);
      }
      sil.push(cur + coda.join(""));
      cur = ons.join("") + t.v;
    }
    tieneV = true;
    cons = [];
  }
  return [...sil, cur + cons.join("")].join(" ");
}

export function fonetica(texto) {
  const base = texto.toLowerCase()
    .replace(/gü/g, "gw").replace(/ñ/g, "ny")
    .replace(/[áéíóú]/g, (m) => "AEIOU"["áéíóú".indexOf(m)])
    .replace(/[^a-zA-Z\s.,;:?!]/g, " ");
  return base.split(/([^a-zA-Z]+)/).map((p) => {
    if (!/[a-zA-Z]/.test(p)) return p;
    return EXCEPCIONES[p] ?? unir(tokens(p.replace(/([aeou])y$/, "$1i")));
  }).join("").replace(/\s+/g, " ").trim();
}
