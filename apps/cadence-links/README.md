# Cadence Links

A modern URL shortener service for Downbeat Academy, built with Next.js 15 and React 19.

## Overview

Cadence Links is a self-hosted URL shortening service that provides shortened links across multiple custom domains. It features a clean, accessible interface built with the Cadence Design System, and uses PostgreSQL for reliable data persistence.

This application is part of the Downbeat Academy monorepo and integrates seamlessly with other Downbeat Academy services.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: React 19
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Forms**: React Hook Form with Zod validation
- **UI**: Cadence Design System (cadence-core, cadence-icons, cadence-tokens)
- **Typography**: Tiempos Text font family
- **ID Generation**: nanoid

## Features

- **URL Shortening**: Create short, memorable links from long URLs
- **Multi-Domain Support**: Choose from multiple branded short domains
- **Link Management**: View all shortened links in a sortable table
- **Delete Links**: Remove links that are no longer needed
- **Smart Redirects**: Fast 302 redirects that allow for link updates
- **Collision-Free Codes**: Generates unique 6-character codes using an unambiguous character set
- **URL Normalization**: Automatically adds protocols and removes trailing slashes
- **Validation**: Client and server-side validation ensures data integrity

## Supported Domains

Cadence Links supports the following short domains:

- `https://dwnbe.at` (default)
- `https://downbeatacademy.services`
- `https://downbeatacade.my`

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20 or higher
- **pnpm**: Version 8 or higher
- **PostgreSQL**: Version 14 or higher (Railway or Neon recommended for cloud deployments)

### Installation

1. **Install dependencies** from the monorepo root:

   ```bash
   pnpm install
   ```

2. **Set up environment variables**:

   Navigate to the Cadence Links directory and copy the example environment file:

   ```bash
   cd apps/cadence-links
   cp .env.local.example .env.local
   ```

   Edit `.env.local` and add your PostgreSQL connection string:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/cadence_links
   ```

   For cloud databases:
   - **Railway**: Use the PostgreSQL connection string from your Railway project
   - **Neon**: Use the pooled connection string from your Neon dashboard

3. **Initialize the database**:

   Push the database schema to your PostgreSQL instance:

   ```bash
   pnpm db:push
   ```

4. **Start the development server**:

   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3001`

### Available Scripts

Run these commands from the `apps/cadence-links` directory:

- `pnpm dev` - Start the development server on port 3001
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server on port 3001
- `pnpm lint` - Run ESLint to check code quality
- `pnpm db:push` - Push schema changes to the database
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Drizzle Studio for database management

## API Reference

### Create a Shortened Link

Create a new shortened URL.

**Endpoint**: `POST /api/links`

**Request Body**:

```typescript
{
  url: string;      // The URL to shorten (protocol optional)
  domain: string;   // One of the supported domains
}
```

**Example Request**:

```bash
curl -X POST http://localhost:3001/api/links \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.downbeatacademy.com/articles/very-long-article-title",
    "domain": "https://dwnbe.at"
  }'
```

**Success Response** (200):

```typescript
{
  success: true;
  link: {
    id: string;           // UUID
    originalUrl: string;  // Normalized original URL
    shortCode: string;    // 6-character code
    domain: string;       // Selected domain
    createdAt: Date;      // Creation timestamp
  };
  shortUrl: string;       // Complete short URL (e.g., "https://dwnbe.at/Ab3De5")
}
```

**Error Response** (400/500):

```typescript
{
  success: false;
  error: string;  // Error message
}
```

### List All Links

Retrieve all shortened links, ordered by creation date (newest first).

**Endpoint**: `GET /api/links`

**Example Request**:

```bash
curl http://localhost:3001/api/links
```

**Success Response** (200):

```typescript
{
  success: true;
  links: Array<{
    id: string;
    originalUrl: string;
    shortCode: string;
    domain: string;
    createdAt: Date;
  }>;
}
```

### Delete a Link

Delete a shortened link by its ID.

**Endpoint**: `DELETE /api/links/[id]`

**Example Request**:

```bash
curl -X DELETE http://localhost:3001/api/links/123e4567-e89b-12d3-a456-426614174000
```

**Success Response** (200):

```typescript
{
  success: true;
}
```

**Error Response** (404):

```typescript
{
  success: false;
  error: "Link not found";
}
```

### Redirect to Original URL

Access a short code to be redirected to the original URL.

**Endpoint**: `GET /[shortCode]`

**Example Request**:

```bash
curl -I https://dwnbe.at/Ab3De5
```

**Response**: 302 redirect to the original URL

**Note**: This endpoint uses a 302 (temporary) redirect rather than 301 (permanent) to allow for link updates or deletions. If links are guaranteed to be immutable in your use case, you may want to change this to 301 for better SEO and caching.

## Project Structure

```
apps/cadence-links/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── [shortCode]/             # Dynamic route for redirects
│   │   │   └── route.ts             # Redirect handler
│   │   ├── (admin)/                 # Admin route group
│   │   │   └── dashboard/           # Main dashboard UI
│   │   ├── api/                     # API routes
│   │   │   └── links/               # Link management endpoints
│   │   │       ├── route.ts         # POST/GET handlers
│   │   │       └── [id]/
│   │   │           └── route.ts     # DELETE handler
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Root page (redirects to dashboard)
│   ├── components/                   # React components
│   │   ├── layout/
│   │   │   └── app-header.tsx       # Application header
│   │   ├── link-form/               # URL shortening form
│   │   ├── links-table/             # Links table with delete action
│   │   └── success-message/         # Success notification
│   ├── lib/
│   │   ├── constants/
│   │   │   └── domains.ts           # Available short domains
│   │   ├── db/
│   │   │   ├── drizzle.ts           # Database connection
│   │   │   ├── schema/
│   │   │   │   └── links.ts         # Links table schema
│   │   │   └── queries/
│   │   │       └── links.ts         # Database queries
│   │   └── utils/
│   │       ├── short-code.ts        # Short code generation
│   │       └── url-validator.ts     # URL validation and normalization
│   ├── styles/
│   │   └── globals.css              # Global styles
│   └── types/
│       └── link.ts                  # TypeScript types
├── drizzle.config.ts                # Drizzle ORM configuration
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── .env.local.example               # Environment variables template
```

## Environment Variables

The following environment variables are required:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/cadence_links` |

### Database Connection Strings

**Local PostgreSQL**:
```
postgresql://username:password@localhost:5432/cadence_links
```

**Railway**:
```
postgresql://postgres:password@containers-us-west-1.railway.app:5432/railway
```

**Neon** (use pooled connection):
```
postgresql://user:password@ep-example-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

## Short Code Generation

Short codes are generated using `nanoid` with a custom alphabet that excludes ambiguous characters:

- **Length**: 6 characters
- **Alphabet**: `23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz`
- **Excluded**: `0`, `O`, `o`, `I`, `l`, `1` (to prevent confusion)
- **Uniqueness**: Automatically checks database and regenerates if collision detected
- **Max Attempts**: 10 attempts before throwing an error

This provides approximately 56^6 = 30.8 billion possible combinations.

## URL Normalization

URLs are automatically normalized before storage:

1. **Protocol Addition**: If no protocol is specified, `https://` is added
2. **Trailing Slash Removal**: Trailing slashes are removed from paths
3. **Validation**: Only `http://` and `https://` protocols are allowed

**Examples**:
- Input: `example.com` → Output: `https://example.com`
- Input: `https://example.com/path/` → Output: `https://example.com/path`
- Input: `http://example.com/` → Output: `http://example.com`

## Database Schema

The application uses a single `links` table:

```typescript
{
  id: UUID (primary key, auto-generated)
  originalUrl: TEXT (not null)
  shortCode: TEXT (not null, unique)
  domain: TEXT (not null)
  createdAt: TIMESTAMP (not null, default: now())
}
```

To view and manage your database schema, use Drizzle Studio:

```bash
pnpm db:studio
```

## Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import project to Vercel**:
   - Connect your repository
   - Set the root directory to `apps/cadence-links`
   - Framework preset: Next.js

3. **Configure environment variables**:
   - Add `DATABASE_URL` in the Vercel project settings

4. **Deploy**: Vercel will automatically deploy on push

### Railway

1. **Create a new project** in Railway

2. **Add PostgreSQL database**:
   - Railway will provide the `DATABASE_URL`

3. **Deploy the application**:
   - Connect your GitHub repository
   - Set root directory to `apps/cadence-links`
   - Add environment variables

4. **Configure custom domains** for your short URLs

### Self-Hosted

1. **Build the application**:

   ```bash
   pnpm build
   ```

2. **Start the production server**:

   ```bash
   pnpm start
   ```

3. **Configure reverse proxy** (nginx/Caddy) for:
   - Main application domain
   - Short URL domains (redirect to the application)

4. **Set up SSL certificates** for all domains

## Domain Configuration

For local development, test redirects via `localhost:3001/[shortCode]`.

For production DNS setup, see [docs/DOMAIN_CONFIGURATION.md](docs/DOMAIN_CONFIGURATION.md).

## Development Tips

### TypeScript Path Aliases

The project uses TypeScript path aliases for cleaner imports:

- `@/*` - Maps to `src/*`
- `@components/*` - Maps to `src/components/*`
- `@lib/*` - Maps to `src/lib/*`
- `@utils/*` - Maps to `src/lib/utils/*`

### Working with the Monorepo

This app uses workspace dependencies from the monorepo:

- `cadence-core` - Component library
- `cadence-icons` - Icon library
- `cadence-tokens` - Design tokens
- `typeface-tiempos-text` - Typography

To make changes to these packages and see updates in Cadence Links:

```bash
# In the monorepo root
pnpm dev
```

This starts all workspace packages in watch mode.

## Troubleshooting

### Database Connection Issues

**Problem**: Cannot connect to PostgreSQL

**Solutions**:
- Verify `DATABASE_URL` is correctly formatted
- Ensure PostgreSQL is running (local) or accessible (cloud)
- Check firewall rules and network access
- For Neon, use the pooled connection string

### Short Code Generation Fails

**Problem**: "Failed to generate unique short code after maximum attempts"

**Solutions**:
- Check database connectivity
- Verify the `links` table exists and is accessible
- Consider increasing `CODE_LENGTH` if you have > 1M links

### Build Errors with Workspace Packages

**Problem**: Build fails with errors about workspace packages

**Solutions**:
- Run `pnpm install` from monorepo root
- Build workspace packages: `pnpm build` from root
- Verify all workspace packages are listed in `next.config.ts` `transpilePackages`

## Future Enhancements

See [docs/EDGE_FUNCTION_MIGRATION.md](./docs/EDGE_FUNCTION_MIGRATION.md) for plans to migrate redirect handling to edge functions for improved performance.

Other potential enhancements:

- Click tracking and analytics
- Custom short code support
- Bulk link creation
- Link expiration dates
- QR code generation
- Link preview cards
- Admin authentication
- Rate limiting
- API key authentication

## Contributing

This is a private project for Downbeat Academy. For questions or issues, contact [jory@downbeatacademy.com](mailto:jory@downbeatacademy.com).

## License

UNLICENSED - Private and proprietary to Downbeat Academy.

---

Built with the Cadence Design System by Downbeat Academy.
