# BLACKSITE / NODE—01

A responsive, two-page static website for a fictional infrastructure technology brand. The implementation translates the supplied BLACKSITE homepage and NODE-01 product designs into semantic HTML, CSS, vanilla JavaScript, and native SVG.

**Portfolio demonstration:** BLACKSITE and NODE-01 are fictional. All facility names, health states, charts, incidents, topology details, and timestamps are illustrative. The website does not monitor infrastructure or connect to production services.

## Features

- Reference-led dark visual design with editorial typography, technical diagrams, restrained orange accents, and responsive layouts.
- Accessible mobile navigation and working links between homepage sections, the product page, and its inquiry form.
- A three-view product dashboard with Status, Topology, and Events tabs.
- An interactive node schematic with four selectable facilities, updated site details, highlighted connections, and a native details dialog.
- A progressive inquiry form with deployment-specific fields, native validation, and input preservation between steps.
- Subtle load, section, button, diagram, and form transitions that respect reduced-motion preferences.
- No frameworks, package installation, runtime dependencies, build pipeline, tracking, or external font requests.

## Technology and files

The production site uses HTML5, CSS3, ES6+ JavaScript, inline SVG, native `<dialog>`, IntersectionObserver, and browser form validation.

```text
index.html                     Infrastructure homepage
node-01.html                   NODE-01 product page
css/style.css                  Shared design system and homepage styles
css/product.css                Product page and interaction styles
js/main.js                     Shared navigation and reveal behavior
js/product.js                  Product dashboard, diagram, and form behavior
assets/logo.png                Optimized supplied brand mark
assets/graphics/               Optimized production diagrams
assets/fonts/                  Self-hosted Archivo and Open Sans with licenses
assets/images/                 Reserved for future page images
reference/                     Original supplied design references
docs/asset-map.md               Reference usage and documented corrections
docs/qa-report.md               Completed checks and verification scope
tools/serve.mjs                 Optional dependency-free local preview server
netlify.toml                   Root publish directory and response headers
```

The original full-page screenshots are design specifications. Production pages do not embed or load them.

## Page structure

**Infrastructure homepage:** navigation, monitoring hero, problem statement, Gather / Understand / Act process, capability rows, redundant infrastructure schematic, NODE-01 introduction, technical-brief call to action, and footer.

**NODE-01 product page:** product hero and interactive dashboard, monitoring feature rows, interactive node inspector, technical overview, deployment inquiry, and footer.

## Design-to-development workflow

1. Inspect both full-page designs and every supplied graphic; map their intended sections in [the asset map](docs/asset-map.md).
2. Establish shared color, type, spacing, border, and responsive layout rules from the references.
3. Recreate the page structure with semantic HTML and reusable CSS, preserving the supplied visual direction.
4. Rebuild dashboard controls and interactive diagrams as readable HTML and native SVG.
5. Add vanilla JavaScript behavior, progressive enhancement, keyboard interaction, and reduced-motion support.
6. Inspect both rendered pages and verify responsive layouts and functional flows before deployment.

Documented corrections include “EVERYWHERE” in the homepage headline, illustrative-preview labels in place of “LIVE,” and consistent Site C failover status across the website. At the requested typography update, Archivo was applied to the main headings and bold status text, with Open Sans for body copy, navigation, form controls, and labels. Both variable fonts are self-hosted, preloaded, and supplied with their SIL Open Font License files in `assets/fonts/`.

## Key interactions

**Dashboard:** use its tabs to switch panels without a page reload. Tab selection and focus use accessible tab semantics, including keyboard navigation.

**Node inspector:** select Site A, B, C, or D to update the highlighted node, route, and adjacent details. Site C is selected initially. The details button opens a native modal that can be closed using its close button or Escape.

**Inquiry:** enter an organization, choose Single Site, Multi-Site, or Hybrid, then complete the relevant deployment and contact fields. All three groups remain visible in the reference's compact layout. The progress navigation follows focus and preserves entered values; deployment-specific fields appear as needed. Native validation checks the applicable required fields before completing the demo. An optional message expands on request.

The completion message is:

> Demo completed. No information was sent or stored.

The form does not send email, make network requests, use Netlify Forms, or write to cookies, browser storage, or a database. A page reload resets its in-memory values.

## Accessibility decisions

- Semantic landmarks, logical headings, descriptive links, image alternatives, and a skip-to-content link.
- Visible keyboard focus, real buttons, labelled controls, accessible state attributes, and status announcements.
- Mobile menu Escape handling with focus returned to its toggle; navigation remains available without JavaScript.
- Accessible tab behavior, keyboard-selectable nodes, and native dialog focus handling.
- Associated form labels, native required/email validation, deployment-dependent required fields, and announced feedback.
- Reduced-motion styles and behavior; document content remains visible without JavaScript. Dashboard switching, node inspection, and the progressive form require JavaScript; static information and navigation remain readable.

## Performance considerations

The site has no third-party runtime requests or dependencies. The supplied logo is resized to 128 × 128, and the infrastructure diagram is cropped to its frame and resized to 1280 × 529. Other interactive graphics are native SVG or HTML. Images have defined dimensions and responsive sizing; below-the-fold images can load lazily. Shared CSS and small deferred scripts keep the implementation straightforward to cache and maintain.

## Run locally

The pages work directly from disk: open `index.html` in a current browser, then follow the NODE-01 link.

For a local HTTP preview, install no packages. With Node.js available, run this from the project root:

```powershell
node tools/serve.mjs
```

Open [http://localhost:4173](http://localhost:4173). Keep that terminal running while previewing; press `Ctrl+C` to stop it. The server is a development convenience, not a build step or part of the deployed website.

## Deploy to Netlify

This repository is ready for a static deployment. `index.html` is at the project root and `netlify.toml` sets the publish directory to `.`.

For a manual deployment:

1. Open [Netlify Drop](https://app.netlify.com/drop).
2. Drag the project folder containing `index.html`, `node-01.html`, `css/`, `js/`, and `assets/` into the upload area. Keep their relative paths intact.
3. Open the resulting preview and check both pages and the product inquiry flow.

For a Git-connected deployment, select this repository, leave the **Build command empty**, and set the **Publish directory** to `.`. No dependency installation, environment variables, API keys, or backend configuration is required. See Netlify’s [deployment documentation](https://docs.netlify.com/deploy/create-deploys/) and [build configuration documentation](https://docs.netlify.com/build/configure-builds/overview/) for the platform settings.

No public deployment is performed by creating these files.

## Validation

Before publishing or after changing the site, inspect both pages at 1440, 1024, 768, 390, and 320 CSS pixels. Check for horizontal overflow, clipped type, diagram readability, broken images, and layout shifts. Exercise the mobile menu, links, all dashboard tabs, every site selection, the dialog, and all three inquiry paths using both pointer and keyboard. Check required-field and email validation, data preservation between steps, the final demo message, reduced motion, JavaScript-disabled fallbacks, and the browser console.

The completed implementation passed **87 browser checks** in local Chromium, including all five viewport widths, keyboard interactions, all three inquiry paths, reduced motion, JavaScript-disabled visibility, image loading, and link targets. Additional desktop-breakpoint checks confirmed that the inquiry columns and progress controls fit. See [the QA report](docs/qa-report.md) for the scope and limitations. There is no installed test framework or test dependency; the checklist above is provided for future maintenance.

## Demo limitations

This is a visual and interaction demonstration, not a working monitoring platform. Facility states and event history do not update from real systems. No account management, authentication, access enforcement, telemetry collection, backend, message delivery, persistence, or integrations are implemented. Browser-side validation demonstrates the inquiry flow; it is not a substitute for server-side validation in a future production service.
