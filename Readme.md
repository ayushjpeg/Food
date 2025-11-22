# Food Studio

A personal food management app for planning meals, capturing recipes, tracking ingredients, and adding tasting notes with a photo reference. Built with React + Vite and designed to deploy in a lightweight Node container listening on port **8005**.

## Features

- 🗂️ Organize dishes by Breakfast, Lunch, Dinner, and Snacks.
- 🧾 Store recipe steps, ingredient quantities, cook notes, and last-made dates.
- 🖼️ Log every cook with a fresh photo, view the per-dish gallery, and keep the latest shot as the cover.
- ➕ Quickly add new dishes with a drawer-style form and dynamic ingredient rows.
- ✏️ Inline controls let you tweak last-made dates or dive into the full edit form when needed.
- 💾 Data persists to `localStorage` automatically so your library survives reloads.

## Getting started

```powershell
# Install dependencies
npm install

# Run the dev server on http://localhost:5173 (or the next open port)
npm run dev

# Create a production build
npm run build

# Preview the production build on port 8005
npm run preview -- --host 0.0.0.0 --port 8005
```

## Docker

```powershell
# Build the container image
docker build -t food-tracker:latest .

# Run it on port 8005
docker run -d --rm -p 8005:8005 --name food-tracker food-tracker:latest
```

The container installs dependencies, runs the Vite build once, and serves the pre-built site through `vite preview` bound to `0.0.0.0:8005`.

## GitHub Actions deploy

The workflow in `.github/workflows/deploy.yml` mirrors the Docker commands above on a self-hosted Linux runner:

1. Install dependencies and run `npm run build`.
2. Build `food-tracker:latest` image.
3. Replace the running container with one exposing `8005:8005`.

Update the runner’s Cloudflare or reverse-proxy config so `food.ayux.in` (or your chosen hostname) forwards traffic to port 8005.
