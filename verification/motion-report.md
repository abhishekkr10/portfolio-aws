# Motion verification

All six requested effects are implemented; none dropped for budget.

| Measure | Before | After |
|---|---:|---:|
| JavaScript, total gzip | 74,778 B | 77,502 B |
| Lighthouse performance | 100 | 100 |
| Lighthouse accessibility | 100 | 100 |
| LCP | 755.407 ms | 756.173 ms |

Extra JavaScript: **2,724 bytes gzip**, comprising 936 bytes added to the initial bundle and a 1,788-byte deferred runtime. No animation library. LCP difference is +0.766 ms, within ordinary local run variation; both round to 0.76 s. Measurements are mobile Lighthouse against the same local production preview, not hosted field performance.

Passes: four viewport sizes with no page/header horizontal overflow; active nav updates; pointer styles; zero running animations under user reduction; persisted preference; OS reduction; blocked localStorage; UART help; zero axe violations; keyboard/dialog/lightbox checks. The circuit is hidden below 768 px. Body text is no longer opacity-faded during entrance, avoiding temporary low contrast.

The existing PCB design and original project content/assets are retained. All new code is authored for this portfolio. Motion modules and styles are local source files.
