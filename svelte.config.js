import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'

// import adapter from '@sveltejs/adapter-cloudflare-workers';
// https://kit.svelte.dev/docs/adapter-cloudflare-workers
// import adapter from '@sveltejs/adapter-cloudflare';
// https://kit.svelte.dev/docs/adapter-cloudflare

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    // adapter: adapter({ config: '<your-wrangler-name>.toml' }),

    alias: {
      // this will match a file
      // 'my-file': 'path/to/my-file.js',

      // this will match a directory and its contents (`my-directory/x` resolves to `path/to/my-directory/x`)
      // 'my-directory': 'path/to/my-directory',

      // an alias ending /* will only match the contents of a directory, not the directory itself
      // 'my-directory/*': 'path/to/my-directory/*'
      'video': 'search',
    },

    // For the tutorial, we need to disable CSRF protection.
    // Don't do this in your own apps unless you know what you're doing!
    // See https://kit.svelte.dev/docs/configuration#csrf for more info.
    csrf: false
  },

  vitePlugin: {
    // This enables compile-time warnings to be visible in the learn.svelte.dev editor
    onwarn: (warning, defaultHandler) => {
      console.log('svelte:warnings:%s', JSON.stringify(warning));
      defaultHandler(warning);
    }
  }
}

export default config
