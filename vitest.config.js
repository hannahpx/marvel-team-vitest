import { defineProject } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { chromaticPlugin } from '@chromatic-com/vitest/plugin'

export default defineProject({
  plugins: [react(), chromaticPlugin()],

  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [
        {
          browser: 'chromium',
        },
      ],
    },
  },
})