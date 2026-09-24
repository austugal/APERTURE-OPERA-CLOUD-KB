// Copilot retrieval: BM25 ranking over the reference sections, with title boost, rare-term
// weighting, OPERA aliases and a bonus for exact phrases. Runs in the browser and in the edge function.
(function (root) {
  var STOP = /^(what|how|where|when|why|does|do|did|with|from|that|this|these|those|have|has|the|and|for|can|could|should|would|are|is|was|were|be|you|your|please|about|which|help|need|show|find|tell|me|to|of|in|on|at|by|a|an|i|it|its|or|if|my|we|our|there|any|all|set|up|use|using|get)$/;
  var ALIASES = {
    eod: ['night', 'audit', 'end', 'day'], audit: ['night'], saft: ['portugal', 'fiscal', 'export'], sii: ['spain', 'fiscal'],
    atcud: ['unique', 'id', 'series', 'validation', 'code'], nif: ['tax', 'id'], iva: ['vat', 'tax'], vat: ['tax', 'generates'],
    billing: ['cashiering', 'folio'], checkin: ['check', 'arrival'], checkout: ['cashiering', 'departure'], payment: ['opi', 'payments'],
    reports: ['analytics', 'reporting'], reservation: ['reservations', 'booking'], pbx: ['telephone', 'call'], voxtel: ['pbx', 'call'],
    keys: ['key', 'encoder'], kss: ['key', 'encoder'], pos: ['outlet', 'revenue'], ohip: ['api', 'integration'], oxi: ['interface', 'xml'],
    ifc: ['ifc8', 'interface'], ifc8: ['interface', 'controller'], piw: ['worksheet', 'configuration'], ratecode: ['rate', 'code'],
    citytax: ['city', 'tax'], taxa: ['city', 'tax'], france: ['french'], ksef: ['poland'], rms: ['ideas', 'revenue']
  };
  var cache = { records: null, docs: null, df: null, avg: 0 };
  function norm(s) { return String(s || '').toLowerCase().replace(/saf[ -]?t/g, 'saft').replace(/city[ -]tax/g, 'citytax city tax').replace(/check[ -]?in/g, 'checkin').replace(/check[ -]?out/g, 'checkout'); }
  function tokens(s) { return (norm(s).match(/[a-z0-9]+/g) || []).filter(function (t) { return t.length > 1 && !STOP.test(t); }); }
  function index(records) {
    if (cache.records === records) return cache;
    var df = {}, docs = [], total = 0;
    records.forEach(function (r) {
      var tt = tokens(r.title), bt = tokens(r.text), tf = {}, seen = {};
      tt.forEach(function (t) { tf[t] = (tf[t] || 0) + 3; });
      bt.forEach(function (t) { tf[t] = (tf[t] || 0) + 1; });
      Object.keys(tf).forEach(function (t) { if (!seen[t]) { df[t] = (df[t] || 0) + 1; seen[t] = 1; } });
      var len = tt.length * 3 + bt.length; total += len;
      docs.push({ r: r, tf: tf, len: len, title: norm(r.title), body: norm(r.text) });
    });
    cache = { records: records, docs: docs, df: df, avg: total / Math.max(1, records.length) };
    return cache;
  }
  function search(question, records, limit) {
    var q = tokens(question); if (!q.length) return [];
    var idx = index(records), N = records.length, k1 = 1.4, b = 0.7;
    var weights = {};
    q.forEach(function (t) { weights[t] = Math.max(weights[t] || 0, 1); (ALIASES[t] || []).forEach(function (a) { weights[a] = Math.max(weights[a] || 0, 0.4); }); });
    var qn = norm(question), phrases = [];
    var words = qn.match(/[a-z0-9]+/g) || [];
    for (var i = 0; i + 1 < words.length; i++) if (!STOP.test(words[i]) && !STOP.test(words[i + 1])) phrases.push(words[i] + ' ' + words[i + 1]);
    var scored = idx.docs.map(function (d) {
      var s = 0, hits = 0;
      Object.keys(weights).forEach(function (t) {
        var f = d.tf[t]; if (!f) return;
        var n = idx.df[t] || 0, idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        s += weights[t] * idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * d.len / idx.avg));
        if (weights[t] === 1) hits++;
      });
      phrases.forEach(function (p) { if (d.title.indexOf(p) >= 0) s += 3; else if (d.body.indexOf(p) >= 0) s += 1.5; });
      s *= 1 + 0.25 * Math.max(0, hits - 1);
      return { r: d.r, s: s };
    }).filter(function (x) { return x.s > 1.2; }).sort(function (a, b) { return b.s - a.s; });
    return scored.slice(0, limit || 6).map(function (x) { return x.r; });
  }
  root.ApertureSearch = search;
})(typeof window !== 'undefined' ? window : globalThis);
