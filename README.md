# marvel-team-vitest

Small React + Vite superhero team builder used to test Chromatic’s Vitest Browser Mode integration.

The project demonstrates browser-based testing with Playwright/Chromium, automatic and targeted visual snapshots, visual regression review, pull request checks, and TurboSnap.

## Stack

- React
- Vite
- JavaScript / JSX
- Vitest Browser Mode
- Playwright / Chromium
- `vitest-browser-react`
- `@chromatic-com/vitest`
- Chromatic
- GitHub Actions

## Run locally

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm run dev
```

## Run tests

Interactive mode:

```bash
npm test
```

Single run:

```bash
npm test -- --run
```

Vitest runs the tests in Chromium using Playwright.

## Visual testing

Chromatic is integrated with Vitest Browser Mode.

The test suite demonstrates:

- automatic snapshots at the end of a test
- targeted snapshots with `takeSnapshot()`
- visual regression review
- pull request status checks
- TurboSnap

Generated Chromatic test artifacts are written to:

```text
.vitest/chromatic
```

The `.vitest/` directory is ignored by Git.

## CI

GitHub Actions runs Vitest in Chromium and then publishes the captured archives to Chromatic.

The workflow is defined in:

```text
.github/workflows/chromatic.yml
```

The Chromatic project token is stored as a GitHub Actions secret:

```text
CHROMATIC_PROJECT_TOKEN
```

The token is not committed to the repository.

## TurboSnap

TurboSnap is enabled in the Vitest plugin:

```js
chromaticPlugin({
  turboSnap: true,
})
```

and in the Chromatic GitHub Action:

```yaml
onlyChanged: true
```

TurboSnap uses Git history and file dependencies to identify tests affected by a change.

When no relevant frontend tests are affected, Chromatic can bypass existing snapshots instead of processing them again.

## Pull requests

Changes should be made on a branch and opened as a pull request against `main`.

Code ownership is defined in:

```text
.github/CODEOWNERS
```

with:

```text
* @hannahpx
```

The repository can require:

- pull request approval
- Code Owner review
- successful Vitest / Chromatic CI
- successful Chromatic UI Tests

## Troubleshooting

### Browser opens and closes during a test run

This is expected when running:

```bash
npm test -- --run
```

That command runs the tests once and exits.

Use:

```bash
npm test
```

if you want Vitest to stay open in development mode.

### `.vitest/` appears locally

This directory contains generated Vitest / Chromatic artifacts.

It should remain ignored by Git.

### `dubious ownership` in GitHub Actions

When running inside the Playwright container, Git may reject the checked-out repository because of filesystem ownership.

The workflow includes:

```yaml
- name: Mark repository as safe for Git
  run: git config --global --add safe.directory "$GITHUB_WORKSPACE"
```

### GitHub Actions passes but UI Tests fail

These are separate checks.

The CI workflow can run successfully while Chromatic still reports a visual change that needs review or has been denied.

### A Chromatic build number is missing

With TurboSnap enabled, Chromatic can skip a build when no affected frontend tests are found.

Skipped TurboSnap builds may not appear in the normal Chromatic build list.

## Project structure

```text
.github/
  CODEOWNERS
  workflows/
    chromatic.yml

src/
  assets/
    heroes/
  App.css
  App.jsx
  App.test.jsx
  index.css
  main.jsx

package.json
vite.config.js
vitest.config.js
```