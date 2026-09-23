(function(root){
  function search(question, records) {
    var stop = /^(what|how|where|when|does|with|from|that|this|have|the|and|for|can|are|you|your|please|opera|cloud|about|which|help|need|show|find|tell|me|is|to|of|in|a|i|do|an|it)$/;
    var terms = question.toLowerCase().replace(/saf[ -]?t/g,'saft').match(/[a-z0-9]+/g) || [];
    terms = terms.filter(function(t){return t.length>1 && !stop.test(t);});
    var aliases = {eod:['night','audit'],saft:['portugal','fiscal'],sii:['spain','fiscal'],billing:['cashiering','folio'],checkin:['front','desk'],checkout:['cashiering'],payment:['opi','payments'],reports:['analytics','reporting'],reservation:['reservations']};
    var expanded = terms.slice(); terms.forEach(function(t){if(aliases[t]) expanded=expanded.concat(aliases[t]);});
    if(!terms.length)return [];
    return records.map(function(r){var title=r.title.toLowerCase().replace(/saf[ -]?t/g,'saft'),body=r.text.toLowerCase().replace(/saf[ -]?t/g,'saft'); var score=0; expanded.forEach(function(t){ if(title.indexOf(t)>=0)score+=5;if(body.indexOf(t)>=0)score+=1; }); return {record:r,score:score};}).filter(function(r){return r.score>=2;}).sort(function(a,b){return b.score-a.score;}).slice(0,5).map(function(r){return r.record;});
  }
  root.ApertureSearch=search;
})(typeof window!=='undefined'?window:globalThis);
