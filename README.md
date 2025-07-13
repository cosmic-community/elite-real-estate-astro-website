# Elite Real Estate - Astro Website

![Elite Real Estate](https://imgix.cosmicjs.com/5593c320-602c-11f0-a051-23c10f41277a-photo-1560518883-ce09059eeffa-1752440397130.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, fast-loading real estate website built with Astro and powered by [Cosmic](https://www.cosmicjs.com). This application showcases luxury properties, professional agents, and comprehensive company information with excellent SEO and performance.

## Features

- 🏠 **Dynamic Property Listings** - Showcase properties with detailed information, galleries, and agent details
- 👥 **Agent Profiles** - Professional agent directory with specialties and contact information
- 📖 **Company Information** - About page with company story, mission, values, and team details
- 🏢 **Office Locations** - Display office information and service areas
- ⚡ **Performance Optimized** - Lightning-fast loading with Astro's static site generation
- 📱 **Responsive Design** - Works beautifully on all devices
- 🔍 **SEO Optimized** - Built-in SEO with meta tags and structured data
- 🖼️ **Image Optimization** - Automatic image optimization with imgix

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=real-estate-production)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Real Estate website"

### Code Generation Prompt

> Set up an Astro website powered by my existing content. Set apiEnvironment: "staging" to cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Astro** - Modern static site generator
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic** - Headless CMS for content management
- **Node.js** - Runtime environment

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Bun package manager (recommended)
- A Cosmic account with your real estate content

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Copy the environment file and add your Cosmic credentials:
   ```bash
   cp .env.example .env
   ```

4. Add your Cosmic credentials to `.env`:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

5. Start the development server:
   ```bash
   bun run dev
   ```

6. Open [http://localhost:4321](http://localhost:4321) to view the website

## Cosmic SDK Examples

### Fetching Properties
```typescript
import { cosmic } from './lib/cosmic'

// Get all properties with agent information
const properties = await cosmic.objects
  .find({ type: 'properties' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get a single property by slug
const property = await cosmic.objects
  .findOne({ type: 'properties', slug: 'luxury-family-home' })
  .depth(1)
```

### Fetching Agents
```typescript
// Get all agents with office information
const agents = await cosmic.objects
  .find({ type: 'agents' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get properties by specific agent
const agentProperties = await cosmic.objects
  .find({ type: 'properties', 'metadata.listing_agent': agentId })
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with your Cosmic bucket to manage:

- **Properties** - Real estate listings with details, pricing, and features
- **Agents** - Real estate agent profiles and contact information
- **About Page** - Company information, story, and values
- **Offices** - Office locations and service areas

The content is automatically fetched during build time for optimal performance, with the option to rebuild when content changes.

For more information about the Cosmic SDK, visit the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on every push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Other Static Hosts
The built files in the `dist` directory can be deployed to any static hosting service.

## Environment Variables

Set these environment variables in your hosting platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key (if needed for admin features)
<!-- README_END -->