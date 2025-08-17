import type { StorybookConfig } from 'storybook'

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  docs: {
    defaultName: 'Docs'
  }
}
export default config
