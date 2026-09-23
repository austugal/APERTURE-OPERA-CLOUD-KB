# Aperture · v0.2

Independent OPERA Cloud reference library and consulting site.

## Deploy
Drag this folder to https://app.netlify.com/drop

## Files
- index.html · Homepage with intro overlay + dashboard
- modules.html · 12 PMS modules + 9 integrations + full PT/ES fiscal catalogue
- services.html · 9 service offerings + 3 engagement tiers
- resources.html · 18 Oracle docs indexed
- videos.html · 60+ Oracle videos (apexapps.oracle.com links only)
- xml-library.html · 16 XML samples
- assets/styles.css · PMS dashboard stylesheet
- assets/intro.js · Vanilla JS boot sequence
- xml-library/ · 16 XML files + zip

## Legal
Independent. Not affiliated with Oracle. ORACLE® and OPERA® are registered trademarks of Oracle Corporation.

© 2026 Aperture



## Public Copilot

`/copilot.html` uses the same-origin `/api/copilot` Netlify Function. It searches public module/documentation summaries, then requests a grounded answer using the Netlify AI Gateway. No browser keys, local services or visitor accounts are needed. If AI is unavailable, clearly labelled reference search remains available in the browser. The gateway uses existing Netlify AI credits; the function limits requests to 12 per minute per IP/domain and caps prompt and output size.

Build: `node scripts/build.mjs`. Only `dist/` is published; backend and build files stay outside the published directory. The script regenerates the reference index from modules.html and resources.html. Agent Hub is an illustrative demo, not a connection to live hotel systems.
