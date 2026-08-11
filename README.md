# emwr.me

Elliott Wilkie-Rosca's personal portfolio, rebuilt as a static site to replace
the previous Framer version.

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

## Verification

```bash
npm test
npm run export:static
```

## Deployment

Pushes to `main` are tested, exported, and deployed to GitHub Pages by
`.github/workflows/pages.yml`.
