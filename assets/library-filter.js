(function(){'use strict';
var input=document.getElementById('topic-filter'),cards=Array.prototype.slice.call(document.querySelectorAll('.tiles > a')),count=document.getElementById('topic-count'),empty=document.getElementById('topic-empty');
if(!input)return;
input.addEventListener('input',function(){var words=input.value.toLowerCase().trim().split(/\s+/).filter(Boolean),visible=0;cards.forEach(function(card){var text=card.textContent.toLowerCase(),match=words.every(function(word){return text.indexOf(word)!==-1;});card.hidden=!match;card.style.display=match?'':'none';if(match)visible++;});count.textContent=visible+' of '+cards.length+' topics';empty.hidden=visible!==0;});
})();
