# buzzkaan.com

Personal portfolio website built with Next.js 16, shadcn/ui, and Tailwind CSS v4.

## 🚀 Live Demo

🌐 Website: https://www.buzzkaan.com/

## 🚀 Live Preview

[![Website Preview](https://image.thum.io/get/https://www.buzzkaan.com/)](https://www.buzzkaan.com/)

## 🎥 Demo Video

[![Watch Demo](https://img.youtube.com/vi/qJScoACHX-0/0.jpg)](https://www.youtube.com/watch?v=qJScoACHX-0)

## Features

- Bilingual support (English / Turkish)
- Live Spotify "Now Playing" integration
- GitHub contribution calendar
- Responsive brutalist/pixel-art design
- Interactive pixel ferret companion

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See [`.env.example`](.env.example) for all required variables.

| Variable | Description |
|---|---|
| `GITHUB_TOKEN` | GitHub PAT with `read:user` scope |
| `SPOTIFY_CLIENT_ID` | Spotify Developer App client ID |
| `SPOTIFY_CLIENT_SECRET` | Spotify Developer App client secret |
| `SPOTIFY_REFRESH_TOKEN` | Spotify OAuth refresh token |

All integrations degrade gracefully — the site works without any env vars, just without live Spotify/GitHub data.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, TypeScript)
- **UI:** shadcn/ui (Radix primitives)
- **Styling:** Tailwind CSS v4
- **Fonts:** Geist Pixel Grid, Geist Pixel Square

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint check |

## License

MIT
