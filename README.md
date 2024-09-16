# GitHub Repo Search

Quick project to find top GitHub repos by language, date, and stars. Uses GitHub API.

## Live Demo

Check it out: [studious-broccoli-seven.vercel.app](https://studious-broccoli-seven.vercel.app)

Deployed with Vercel. Give it a spin!

## Setup

1. Clone repo
2. `npm install`
4. `npm run dev`
5. Go to `http://localhost:3000`

## Tech

- Nuxt 3
- TypeScript
- Tailwind CSS
- Pinia
- Axios

## What it does

- Search repos by language
- Filter by date and stars
- Infinite scroll

## Structure

- `components/`: Vue stuff
- `pages/`: Nuxt pages
- `stores/`: Pinia stores
- `types/`: TS types
- `utils/`: Helper functions

## TODO (ran out of time)

- Better error handling
- Add tests
- Improve accessibility
- Prettier UI
- Add caching
- More filters

## Notes

Made this in 8 hours. Lots to improve but it works. Main focus was on functionality over polish. Used Tailwind for quick styling.


# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.