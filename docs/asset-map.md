# BLACKSITE reference and asset map

The supplied designs are the visual source of truth. The two full-page screenshots are specifications only; neither is embedded in a production page. Reference files remain unchanged in `reference/`.

| Supplied reference | Dimensions | Intended use | Implementation |
| --- | --- | --- | --- |
| `PAGE 01 - Homepage.png` | 1440 × 4526 | Homepage composition, section order, spacing, typography, colors | Recreated as semantic HTML and CSS in `index.html` and shared styles. |
| `PAGE 01 - NODE-01 Product.png` | 1440 × 4785 | Product composition, dashboard, feature rows, topology, inquiry layout | Recreated as semantic HTML, CSS, native SVG, and real controls in `node-01.html`. |
| `logo.png` | 1254 × 1254 | BLACKSITE brand symbol in navigation and footer | Faithfully resized to `assets/logo.png` at 128 × 128 with source transparency retained. Displayed with the BLACKSITE wordmark as text. |
| `hero-schematic.png` | 1448 × 1086 | Homepage monitoring overview: central NODE-01 and four connected facilities | Recreated as native SVG to keep labels sharp and correct inconsistent sample statuses. The supplied bitmap is not served. |
| `infrastructure-schematic.png` | 1672 × 941 | Homepage “Redundant by design” architecture | Reused as `assets/graphics/infrastructure-schematic.png`. Cropped to its diagram frame and resized to 1280 × 529. Primary connections remain solid; backup connections remain orange and dashed. |
| `node-topology.png` | 795 × 566 | Product “Inspect any node” network arrangement | Recreated as native SVG and accessible controls, with real site selection, highlighted paths, updated details, and a native dialog. The supplied bitmap is not served. |

## Content and state corrections

- The homepage headline reads “OPERATIONAL CLARITY. EVERYWHERE.”
- Every dashboard and schematic represents illustrative, fictional sample data. No “LIVE” telemetry claim is displayed.
- Site A / North Relay and Site B / Data Hall are **Nominal**, Site C / Substation is **Failover**, and Site D / Remote Depot is **Offline** throughout the implementation.
- The supplied hero image highlights Site B as failover. The recreated diagram uses Site C to agree with the brief and the rest of the website.
- Static dashboard fragments in the page designs are rebuilt using readable HTML, accessible tabs, SVG, and lightweight chart marks rather than embedded screenshots.
- The product reference shows a three-digit suffix. The implemented heading uses **NODE—01** to match the product name specified in the brief.
- The narrow-screen infrastructure drawing is `assets/graphics/infrastructure-mobile.svg`, a vertical SVG composition based on the same primary/backup architecture. The hero and dashboard topology also use compact SVG compositions so labels remain readable.
- The inquiry keeps Organization, Deployment, and Contact visible in the reference's compact column. The active step follows focus, step navigation preserves entered values, and deployment-specific fields progressively appear for Single Site, Multi-Site, or Hybrid.
- The final homepage call to action and minimal footers follow the brief where the screenshots do not show their full layout.
- The original references included no font files. Following the requested typography update, the implementation uses self-hosted **Archivo** for main headings and bold status text, and **Open Sans** for normal text and interface labels. Variable Latin WOFF2 files and their SIL OFL licenses are in `assets/fonts/`; source attribution is in `assets/fonts/README.md`. The site makes no third-party font requests.

## Asset preparation

The logo was downsampled using high-quality bicubic interpolation without changing the mark. The architecture bitmap was cropped to remove its large outside blank margins; its artwork, labels, and connection styles were retained. Both assets use PNG and require no runtime conversion. Decorative reference noise and bitmap artifacts are not reproduced in the native diagrams.
