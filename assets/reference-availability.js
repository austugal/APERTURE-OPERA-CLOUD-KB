(function(){'use strict';
var titles={'README.md':'OPERA reference overview','cutover-guide.md':'OPERA Cutover Guide','ideas-g3-continuous-pricing.md':'IDeaS G3 Continuous Pricing','ssd-interface-service-account.md':'SSD Interface Service Account','advance-deposit-city-tax-fiscal.md':'Portugal Fiscal: Deposits and City Tax','training-catalogue.md':'OPERA Cloud Training Catalogue','training-schedule-40h.md':'40-Hour Training Schedule'};
var file=new URLSearchParams(window.location.search).get('file'),title=Object.prototype.hasOwnProperty.call(titles,file)?titles[file]:null;
if(title){document.getElementById('reference-title').textContent=title;document.title=title+' · Availability · Aperture';}
})();
