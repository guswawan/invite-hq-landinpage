# 💌 Undangku — Undangan Digital Seseru Acaramu

**Undangku** (by Invite-HQ) is a premium digital invitation platform designed to make your special moments even more memorable. Built with a focus on unique aesthetics, hand-drawn illustrations, and a seamless user experience.

![Undangku Preview](/public/og-image.png)

## ✨ Features

- 🎨 **Unique Hand-Drawn Illustrations**: Stand out with designs that feel personal and artistic.
- 🔗 **Personalized Domains**: Professional links like `namakamu.undangku.com`.
- 📱 **Mobile First & WhatsApp Ready**: Easy to share and perfectly optimized for mobile devices.
- ⚡ **Lightning Fast**: Built on Astro for peak performance and SEO.
- 🖱️ **Interactive UX**: Custom animated cursor and smooth transitions.
- 🧩 **Multi-Event Support**: From weddings and engagements to birthdays and graduations.

## 🛠️ Tech Stack

- **Framework**: [Astro 6](https://astro.build/) (Static Site Generation)
- **UI Library**: [React 19](https://reactjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: CSS Animations & Lottie (Optional)

## 🚀 Getting Started

### Prerequisites

- Node.js `^22.12.0`
- pnpm (recommended)

### Installation

```sh
# Clone the repository
git clone https://github.com/guswawan/invite-hq-landingpage.git

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Commands

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Starts local dev server at `localhost:4321` |
| `pnpm build` | Build your production site to `./dist/` |
| `pnpm preview` | Preview your build locally |
| `pnpm astro ...` | Run Astro CLI commands |

## 📁 Project Structure

```text
/
├── public/          # Static assets (images, icons, etc.)
├── src/
│   ├── components/  # Reusable UI components
│   ├── data/        # Static data (events, testimonials)
│   ├── layouts/     # Page layouts
│   ├── pages/       # Site routes (Astro pages)
│   └── styles/      # Global CSS and Tailwind configuration
├── astro.config.mjs # Astro configuration
└── package.json     # Dependencies and scripts
```

## 🌐 Deployment

This project is optimized for **Cloudflare Pages**.

```sh
pnpm build
# Deployment is handled automatically via GitHub Actions or Wrangler
```

---

Built with ❤️ by [guswawan](https://github.com/guswawan) in 🇮🇩

