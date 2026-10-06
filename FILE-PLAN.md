# RAFAQAT.AI file plan
Default language: English. Works without a computer: edit files in the GitHub mobile site.

| File | Purpose | Needs API? | Works without API? |
|---|---|---|---|
| index.html | Home page | No | Yes |
| pages/*.html (32 pages) | One page per section. Each loads the shared scripts and shows its own scene | See below | See below |
| assets/js/app.js | Navigation, all page scenes, provider calls, local storage | No | Yes |
| assets/css/styles.css | Design system (dark and light themes) | No | Yes |
| config/tools.js | Tool list and form definitions | No | Yes |
| config/languages.js | Language list (add Urdu, Hindi, Arabic here later) | No | Yes |
| i18n/en.js | All English interface text | No | Yes |
| assets/img/ | Logo and favicon | No | Yes |

## Pages
- Need a text provider to produce output: chat, writing, coding, research, report-maker, data-analysis, website-builder, app-builder, translator, summarizer, content-generator, document-analyzer, agents (run), automation (run), files (summarize/analyze/ask).
- Work without a provider: home, tools, favorites, projects, history, settings, profile, integrations, pricing, help, about, privacy, terms, files (upload/preview/download/delete), voice (device speech).
- Show "Provider Connection Required" until a provider exists: image, video, music, search.

## Add a language
1. Copy i18n/en.js to i18n/ur.js and translate the values.
2. In config/languages.js add {code:"ur",name:"Urdu",rtl:true}.
3. Pick it in Settings > Language.
