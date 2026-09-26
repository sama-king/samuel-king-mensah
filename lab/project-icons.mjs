// Thin line-art glyphs on a 64 grid, drawn in the style of the supplied system-map sample.
// Every shape receives pathLength="1" so scroll can draw it in with stroke-dashoffset.

const g = {
  identity: '<path d="M16 10h28l6 6v38H22l-6-6z"/><path d="M16 10v38h28V10"/><path d="M44 48l6 6"/><circle cx="30" cy="26" r="6"/><path d="M20 42c1-7 5-10 10-10s9 3 10 10"/><path d="M22 45h16"/><path d="M52 12v8M48 16h8"/>',
  pass: '<path d="M28 6h8v6h-8z"/><path d="M18 12h28l4 4v40H22l-4-4z"/><path d="M18 12v40h28V12"/><path d="M24 20h14M24 24h10"/><path d="M24 36h6v8h-6zM34 32h6v12h-6z"/><path d="M12 18v34M52 18v34"/>',
  scan: '<path d="M10 20V10h10M44 10h10v10M54 44v10H44M20 54H10V44"/><path d="M20 20h10v10H20zM34 20h10v10H34zM20 34h10v10H20z"/><path d="M34 34h4v4M40 40h4v4h-6"/><path d="M6 32h50l-4-4M56 32l-4 4"/>',
  shield: '<path d="M32 6l20 7v16c0 13-8 23-20 29C20 52 12 42 12 29V13z"/><path d="M32 11l15 5v13c0 10-6 18-15 23-9-5-15-13-15-23V16z"/><path d="M23 31l6 6 13-14"/>',
  users: '<circle cx="24" cy="22" r="7"/><path d="M11 46c1-9 6-13 13-13s12 4 13 13"/><circle cx="42" cy="24" r="6"/><path d="M36 34c2-1 4-1 6-1 6 0 10 4 11 12"/><path d="M8 50h48"/>',
  log: '<path d="M16 8h26l8 8v40H16z"/><path d="M42 8v8h8"/><path d="M22 24h20M22 31h20M22 38h14"/><circle cx="40" cy="46" r="6"/><path d="M40 43v3l2 2"/>',
  phone: '<path d="M20 6h24v52H20z"/><path d="M20 14h24M20 48h24"/><path d="M29 53h6"/><path d="M26 26h12v12H26z"/><path d="M29 32l2 2 4-5"/>',
  sync: '<path d="M14 30a18 18 0 0 1 32-10"/><path d="M46 10v10H36"/><path d="M50 34a18 18 0 0 1-32 10"/><path d="M18 54V44h10"/><path d="M26 28h12v10H26z"/>',
  layers: '<path d="M32 8l24 12-24 12L8 20z"/><path d="M8 32l24 12 24-12"/><path d="M8 44l24 12 24-12"/>',
  database: '<ellipse cx="32" cy="14" rx="18" ry="6"/><path d="M14 14v36c0 3 8 6 18 6s18-3 18-6V14"/><path d="M14 26c0 3 8 6 18 6s18-3 18-6M14 38c0 3 8 6 18 6s18-3 18-6"/>',
  box: '<path d="M32 8l22 10v28L32 56 10 46V18z"/><path d="M10 18l22 10 22-10M32 28v28"/><path d="M21 13l22 10v8"/>',
  cart: '<path d="M6 12h8l6 30h30l6-22H17"/><circle cx="24" cy="50" r="4"/><circle cx="44" cy="50" r="4"/><path d="M24 28h26M26 35h20"/>',
  receipt: '<path d="M16 6h32v52l-5-4-5 4-6-4-6 4-5-4-5 4z"/><path d="M23 18h18M23 25h18M23 32h10"/><path d="M34 42h8"/>',
  chart: '<path d="M8 8v48h48"/><path d="M16 44l10-12 8 6 14-18"/><path d="M42 20h6v6"/><path d="M16 50v-4M26 50v-8M36 50v-6M46 50v-12"/>',
  chat: '<path d="M8 12h34v22H22l-8 7v-7H8z"/><path d="M26 38v4h16l8 7v-7h6V20H46"/><path d="M15 20h20M15 26h14"/>',
  store: '<path d="M8 22l5-12h38l5 12"/><path d="M8 22c0 4 3 6 6 6s6-2 6-6c0 4 3 6 6 6s6-2 6-6c0 4 3 6 6 6s6-2 6-6c0 4 3 6 6 6s6-2 6-6"/><path d="M12 28v26h40V28"/><path d="M26 54V40h12v14"/>',
  lock: '<path d="M14 28h36v28H14z"/><path d="M21 28v-8a11 11 0 0 1 22 0v8"/><circle cx="32" cy="40" r="4"/><path d="M32 44v5"/>',
  bolt: '<path d="M36 6L14 36h16l-4 22 24-32H34z"/>',
  switch: '<path d="M8 20h36l-6-6M44 20l-6 6"/><path d="M56 44H20l6-6M20 44l6 6"/><circle cx="14" cy="20" r="0.5"/><circle cx="50" cy="44" r="0.5"/>',
  spark: '<path d="M32 6l5 16 16 5-16 5-5 16-5-16-16-5 16-5z"/><path d="M50 42l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/><path d="M14 8v8M10 12h8"/>',
  check: '<path d="M10 10h44v44H10z"/><path d="M20 32l8 8 16-17"/>',
  mic: '<path d="M24 10a8 8 0 0 1 16 0v20a8 8 0 0 1-16 0z"/><path d="M16 28a16 16 0 0 0 32 0"/><path d="M32 44v12M24 56h16"/><path d="M8 22v10M56 22v10"/>',
  wave: '<path d="M6 32h6M52 32h6"/><path d="M16 26v12M22 18v28M28 12v40M34 20v24M40 14v36M46 24v16"/>',
  brackets: '<path d="M20 10h-8v44h8"/><path d="M44 10h8v44h-8"/><path d="M22 26h20M22 34h14M22 42h18"/><path d="M26 18h4"/>',
  book: '<path d="M32 16c-6-5-14-6-24-6v38c10 0 18 1 24 6 6-5 14-6 24-6V10c-10 0-18 1-24 6z"/><path d="M32 16v38"/><path d="M14 20h10M14 27h10M40 20h10M40 27h10"/>',
  screen: '<path d="M6 10h52v34H6z"/><path d="M26 44l-4 10h20l-4-10"/><path d="M14 20h18M14 27h26M14 34h12"/>',
  broadcast: '<circle cx="32" cy="26" r="4"/><path d="M24 18a11 11 0 0 0 0 16M40 18a11 11 0 0 1 0 16"/><path d="M17 11a21 21 0 0 0 0 30M47 11a21 21 0 0 1 0 30"/><path d="M32 30l-8 26M32 30l8 26M27 46h10"/>',
  desktop: '<path d="M8 12h48v32H8z"/><path d="M24 52h16M32 44v8"/><path d="M44 20h6v6h-6z"/><path d="M14 20h22M14 27h16"/>',
  magnify: '<circle cx="27" cy="27" r="16"/><path d="M39 39l16 16"/><path d="M20 24h14M20 30h10"/>',
  search: '<circle cx="26" cy="26" r="14"/><path d="M36 36l18 18"/><path d="M20 26l4 4 8-8"/>',
  funnel: '<path d="M6 10h52L38 34v18l-12 6V34z"/><path d="M14 18h36"/>',
  doc: '<path d="M14 6h24l12 12v40H14z"/><path d="M38 6v12h12"/><path d="M21 28h22M21 35h22M21 42h14"/><path d="M42 42l3 3 6-7"/>',
  board: '<path d="M6 10h52v44H6z"/><path d="M23 10v44M41 10v44"/><path d="M10 16h9v8h-9zM10 28h9v8h-9zM27 16h10v8H27zM45 16h9v8h-9z"/>',
  plug: '<path d="M24 6v12M40 6v12"/><path d="M16 18h32v10a16 16 0 0 1-32 0z"/><path d="M32 44v14"/><path d="M28 28l4-4 4 4"/>',
  calendar: '<path d="M8 12h48v42H8z"/><path d="M8 22h48M20 6v10M44 6v10"/><path d="M16 30h6v6h-6zM29 30h6v6h-6zM42 30h6v6h-6zM16 42h6v6h-6zM29 42h6v6h-6z"/>',
  door: '<path d="M14 56V8h28v48"/><path d="M42 12l10 4v38l-10 2"/><circle cx="36" cy="33" r="1.5"/><path d="M8 56h50"/>',
  bell: '<path d="M16 44V28a16 16 0 0 1 32 0v16l4 6H12z"/><path d="M27 54a5 5 0 0 0 10 0"/><path d="M32 6v6"/>',
  devices: '<path d="M6 14h20v38H6z"/><path d="M6 44h20"/><path d="M34 8h24v48H34z"/><path d="M34 16h24M34 48h24"/><path d="M26 30h8"/>',
  gear: '<circle cx="32" cy="32" r="8"/><path d="M32 6v8M32 50v8M6 32h8M50 32h8M13 13l6 6M45 45l6 6M51 13l-6 6M19 45l-6 6"/><circle cx="32" cy="32" r="16"/>'
};

export function icon(name, cls = 'glyph') {
  const body = g[name];
  if (!body) throw new Error(`Unknown icon: ${name}`);
  const drawn = body.replace(/<(path|circle|ellipse|rect|line|polyline)\b/g, '<$1 pathLength="1"');
  return `<svg class="${cls}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">${drawn}</svg>`;
}
