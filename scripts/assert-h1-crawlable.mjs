#!/usr/bin/env node
/**
 * PORTTI: ryömittävän lohkon <h1> on sivun otsikko ILMAN brändihäntää.
 *
 * 🔴🔴 Miksi tämä on olemassa. Verkoston 13.9.2026 korjaus "H1 ilman
 * brändihäntää" merkittiin valmiiksi 28/28 sivustolla. lapland.blog jäi siitä
 * ulos, eikä kukaan huomannut kolmeen päivään, koska mikään ei mitannut
 * lopputulosta: riisujan erotinlistassa ei ollut keskipistettä `·` ja
 * --siteName=LaplandBlog ei täsmännyt otsikoiden "Lapland.blog"-muotoon.
 * Jokaisen sivun H1 oli koko title (331/433 mitattu 16.9.2026 buildista ja
 * livenä). Korjaus ilman porttia olisi voinut hajota yhtä hiljaa uudelleen.
 *
 * Portti lukee VALMIIN dist-HTML:n — ei lähdettä eikä otsikkodataa — ja ajaa
 * saman `stripBrandTail`-funktion jonka rakentaja ajaa. Jos funktio vielä
 * leikkaisi jotain H1:stä, häntä on jäänyt sivulle ⇒ FAIL.
 *
 * 🔴 Nolla sivua ei ole tulos. Jos yhtään ryömittävää lohkoa ei löydy, portti
 * kaatuu — vihreä "0 tarkistettua" on juuri se tila jossa laplandbarsin
 * linkkiportti valehteli 16.9.
 *
 * Käyttö (buildissa prerenderin jälkeen):
 *   node scripts/assert-h1-crawlable.mjs --siteName=LaplandBlog
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { stripBrandTail } from './_prerender_crawlable_body.mjs';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = /^--([^=]+)(?:=(.*))?$/.exec(a);
    return m ? [m[1], m[2] === undefined ? true : m[2]] : [a, true];
  })
);
const SITE_NAME = typeof args.siteName === 'string' ? args.siteName : '';
const DIST = resolve(process.cwd(), typeof args.dist === 'string' ? args.dist : 'dist');

if (!SITE_NAME) {
  console.error('assert-h1-crawlable: --siteName puuttuu — ilman sitä portti ei voi tunnistaa brändihäntää.');
  process.exit(1);
}
if (!existsSync(DIST)) {
  console.error(`assert-h1-crawlable: ${DIST} puuttuu — aja build ensin.`);
  process.exit(1);
}

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.html$/i.test(e.name)) acc.push(p);
  }
  return acc;
}

const PRE = /<!--LV-PRE-->([\s\S]*?)<!--\/LV-PRE-->/;
const H1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i;
const unesc = (s) =>
  s
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

const branded = [];
const missing = [];
let checked = 0;

for (const file of walk(DIST)) {
  const html = readFileSync(file, 'utf8');
  const block = PRE.exec(html);
  if (!block) continue; // esim. dist/404.html kirjoitetaan omalla mallillaan
  checked++;
  const h1 = H1.exec(block[1]);
  const rel = relative(DIST, file).split(String.fromCharCode(92)).join('/');
  if (!h1 || !unesc(h1[1])) {
    missing.push(rel);
    continue;
  }
  const text = unesc(h1[1]);
  if (stripBrandTail(text, SITE_NAME) !== text) branded.push([rel, text]);
}

if (!checked) {
  console.error(`assert-h1-crawlable: 0 ryömittävää lohkoa ${DIST}:ssä — nolla sivua ei ole tulos, portti ei mitannut mitään.`);
  process.exit(1);
}

if (missing.length || branded.length) {
  if (missing.length) {
    console.error(`assert-h1-crawlable: ${missing.length} sivulla ryömittävä lohko ilman <h1>:tä`);
    for (const m of missing.slice(0, 15)) console.error(`  ${m}`);
  }
  if (branded.length) {
    console.error(`assert-h1-crawlable: ${branded.length} sivun H1 kantaa yhä brändihäntää (--siteName=${SITE_NAME})`);
    for (const [rel, text] of branded.slice(0, 15)) console.error(`  ${rel}  <h1>${text}</h1>`);
    if (branded.length > 15) console.error(`  … (+${branded.length - 15})`);
  }
  process.exit(1);
}

console.log(`assert-h1-crawlable: ${checked} sivua · H1 kaikilla · 0 brändihäntää`);
