# Sneaker Co

Sneaker Co is a full-stack sneaker storefront built with Next.js. It combines a public product catalogue and cart with Supabase authentication and data storage, Stripe Checkout payments, and an admin area for managing the catalogue.

The project has a deliberately editorial streetwear look: bold display typography, a warm neutral base, orange accent color, monospace metadata, product badges, and responsive layouts for desktop and mobile.

## Features Implemented

### Storefront

- Homepage with hero content, featured drops, category navigation, marquee branding, and footer.
- Shop page backed by Supabase product data.
- Category filtering, price sorting, and incremental "Load More" pagination.
- Product detail pages with product image, description, price, SKU, stock state, limited-edition/high-demand labels, related products, and a size selector.
- Quick add and full product-page add-to-cart flows.
- Responsive cart with quantity controls, item removal, subtotal, and persisted browser storage.
- Checkout success page that displays the saved order summary and clears the local cart.

### Accounts and checkout

- Email/password sign up and login through Supabase Auth.
- Google OAuth sign-in flow through Supabase.
- Login protection for checkout and the admin area.
- Stripe Checkout session creation for card payments.
- Stripe webhook signature verification and order status update from `pending` to `paid` after `checkout.session.completed`.

### Admin

- Role-based admin layout: only authenticated users whose Supabase profile role is `admin` can enter.
- Product listing with desktop table and mobile card layouts.
- Create product flow with name, category, description, price, stock, and image upload.
- Product image storage in the Supabase `product-images` bucket.
- Edit and delete product actions, including removal of the stored image when a product is deleted.
- Optional Gemini-powered product description generation from the product name, category, and keywords.

## Tech Stack

- **Framework:** Next.js 16 App Router, React 19, TypeScript
- **Styling:** Tailwind CSS 4 through the PostCSS plugin
- **UI:** Lucide React icons and `next/image`
- **Fonts:** `next/font` with Archivo Narrow, Inter, and IBM Plex Mono
- **Authentication and database:** Supabase Auth, Supabase Postgres, `@supabase/ssr`
- **File storage:** Supabase Storage
- **Payments:** Stripe Checkout and Stripe webhooks
- **AI assistance:** Google Gemini through `@google/genai`
- **Quality tooling:** ESLint 9 and strict TypeScript configuration

## Project Structure

```text
app/
	page.tsx                 Home page
	shop/                    Catalogue, filtering, sorting, pagination
	products/[id]/           Product details
	cart/                    Cart page and checkout action
	checkout/success/        Successful checkout summary
	login/ signup/           Authentication screens
	admin/                   Protected product management
	api/webhooks/stripe/     Stripe payment webhook
	components/              Storefront and admin UI components
	context/                 Client-side cart state
lib/supabase/              Browser, server, admin, and middleware clients
public/                    Logos, icons, and local visual assets
```

## Getting Started

### Requirements

- Node.js with npm
- A Supabase project
- A Stripe account with Checkout enabled
- A Google OAuth provider configured in Supabase if Google sign-in is needed
- A Gemini API key if AI description generation is needed

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env.local` file with the values for your services:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000

GEMINI_API_KEY=your_gemini_api_key
```

The service role key and Stripe/Gemini secret keys are server-only values and must not be exposed to the browser.

### Supabase data requirements

The application expects Supabase tables for `profiles`, `products`, `orders`, and `order_items`, plus a public `product-images` Storage bucket. The code uses a `profiles.role` value of `admin` for admin access. Authentication, database policies, storage policies, and the Google provider need to be configured in the Supabase dashboard.

### Stripe local webhook

For local payment testing, forward Stripe events to the webhook route and use the signing secret in `.env.local`:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

The relevant event is `checkout.session.completed`.

## Performance and Engineering Notes

The current implementation already includes several practical performance choices:

- App Router server components are used for the home, shop, product, checkout-success, and admin data-fetching pages.
- Supabase queries run on the server for catalogue and admin data instead of loading the full product list in the browser.
- The shop query requests only the current range of products and supports incremental pagination.
- Client-side JavaScript is limited to interactive areas such as the cart, filters, product actions, and admin form controls.
- `next/font` loads the selected font families through the framework, and `next/image` is used for image rendering with responsive size hints.
- `revalidatePath` refreshes the admin product list after deletion without requiring a full application restart.

Useful next performance upgrades would be image transformation/compression at upload time, replacing the current `unoptimized` image usage once the storage image policy is ready, adding database indexes for frequent product/category/order queries, and introducing proper cursor pagination for larger catalogues.

## What Makes It Distinctive

- It treats the storefront as a visual retail experience rather than a generic dashboard, while still including a practical admin workflow.
- The same product data powers discovery, detail pages, cart items, checkout line items, and order records.
- Admins can use Gemini to draft descriptions, but the generated text remains editable before saving.
- Product labels such as "New," "Limited," and "High Demand" are derived from stored category, creation date, and stock values rather than being hard-coded for individual products.
- The UI has a consistent visual language across public and admin surfaces, with responsive desktop/mobile presentation in the admin product list.

## Current Limitations

This is an implemented project foundation, not a finished production marketplace. The following UI elements are currently placeholders or intentionally local-only:

- Header search does not perform a search yet.
- Wishlist buttons do not save wishlist state.
- Size selection is visual state only; sizes are not stored as product variants and are not sent with cart or order data.
- Size Guide, color filtering, and size filtering are not connected to backend data.
- The product gallery currently repeats the same stored image for its thumbnail slots because only one image URL is stored per product.
- There is no admin order-management screen, inventory reservation flow, tax/shipping calculation, or customer order-history page.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run ESLint
```
