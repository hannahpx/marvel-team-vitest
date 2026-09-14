import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import App from './App.jsx'

test('builds and assembles a team of three heroes', async () => {
  const screen = await render(<App />)

  await expect.element(
    screen.getByText('0 of 3 heroes selected'),
  ).toBeVisible()

  await screen.getByRole('button', { name: /Spider-Man/i }).click()
  await screen.getByRole('button', { name: /Iron Man/i }).click()
  await screen.getByRole('button', { name: /Thor/i }).click()

  await expect.element(
    screen.getByText('3 of 3 heroes selected'),
  ).toBeVisible()

  const assembleButton = screen.getByRole('button', { name: 'Assemble' })

  await expect.element(assembleButton).toBeEnabled()

  await assembleButton.click()

  await expect.element(
    screen.getByRole('heading', { name: 'Your Avengers team' }),
  ).toBeVisible()

  await expect.element(
    screen.getByRole('button', { name: 'Start again' }),
  ).toBeVisible()
})