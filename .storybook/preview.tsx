import type { Preview } from '@storybook/react-vite';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    options: { storySort: { order: ['Intro', 'Components'] } },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'dark', value: '#0b1220' },
        { name: 'white', value: '#ffffff' }
      ]
    },
    a11y: {
      context: '#storybook-root',
      manual: false
    }
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ]
      }
    }
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      const cls = theme === 'dark' ? 'dark' : '';
      return (
        <div className={cls}>
          <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Story />
          </div>
        </div>
      );
    }
  ]
};

export default preview;
