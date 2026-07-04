// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://marketripplenews.com',
  output: 'static',
  adapter: vercel(),
  integrations: [mdx(), sitemap()],

  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Atkinson',
      cssVariable: '--font-atkinson',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/atkinson-regular.woff'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/atkinson-bold.woff'],
            weight: 700,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Space Grotesk',
      cssVariable: '--font-space-grotesk',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/SpaceGrotesk-Light.ttf'], weight: 300, style: 'normal', display: 'swap' },
          { src: ['./src/assets/fonts/SpaceGrotesk-SemiBold.ttf'], weight: 600, style: 'normal', display: 'swap' },
          { src: ['./src/assets/fonts/SpaceGrotesk-Regular.ttf'], weight: 500, style: 'normal', display: 'swap' },
        ],
      },
    },
    
  ],
  redirects: {
      '/go/bybit': 'https://www.bybit.com/invite?ref=RK4YAG5&medium=referral&utm_campaign=evergreen&share_to=link',
      '/': '/blog'
    },

  vite: {
    plugins: [tailwindcss()],
  },
});