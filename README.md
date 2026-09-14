# Avengers

A small React app for building a team of three Avengers heroes.

## Tech

- React
- Vite
- JavaScript
- Vitest Browser Mode
- Playwright
- Chromium

## Run locally

```bash
npm install
npm run dev

## Visual testing

This project uses Vitest Browser Mode with Playwright and Chromium.

Chromatic integrates with the Vitest test run to capture visual snapshots. The test suite currently demonstrates:

- automatic snapshots at the end of a test
- targeted snapshots during a test
- visual regression review
- GitHub pull request checks

## CI

GitHub Actions runs the Vitest Browser Mode suite in Chromium and then uploads the captured archives to Chromatic.

The Chromatic project token is stored as a GitHub Actions secret and is not committed to the repository.