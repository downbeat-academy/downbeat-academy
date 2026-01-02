# Edge Function Migration Proposal

This document outlines a proposal to migrate Cadence Links' redirect functionality to edge functions for improved global performance and reduced latency.

## Table of Contents

- [Current Architecture](#current-architecture)
- [Proposed Edge Architecture](#proposed-edge-architecture)
- [Benefits](#benefits)
- [Migration Steps](#migration-steps)
- [Implementation Considerations](#implementation-considerations)
- [Cost Analysis](#cost-analysis)
- [Recommended Approach](#recommended-approach)

## Current Architecture

### How Redirects Work Today

1. User clicks short link (e.g., `https://dwnbe.at/Ab3De5`)
2. Request hits Next.js server running in a single region
3. Server queries PostgreSQL database for the short code
4. Server responds with 302 redirect to original URL
5. Browser follows redirect to destination

### Performance Characteristics

- **Latency**: 100-200ms average for redirects
  - Cold starts: 200-500ms (serverless deployments)
  - Warm requests: 100-200ms
- **Geographic distribution**: Single region (typically US)
- **Database round-trip**: Full query on every redirect
- **Caching**: Limited browser-side caching due to 302 status

### Current Infrastructure

- **Platform**: Vercel/Railway/Self-hosted
- **Runtime**: Node.js with Next.js App Router
- **Database**: PostgreSQL (single region)
- **DNS**: Points directly to application server

## Proposed Edge Architecture

### Edge Function Design

Deploy redirect logic to edge functions distributed globally, reducing latency to sub-50ms worldwide.

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ https://dwnbe.at/Ab3De5
       v
┌─────────────────────────┐
│  Edge Function (Global) │
│  - Parse short code     │
│  - Check edge cache     │
│  - Query DB if miss     │
│  - Return 301/302       │
└──────┬──────────────────┘
       │ (cache miss)
       v
┌─────────────────────────┐
│  PostgreSQL + Pooler    │
│  - Connection pooling   │
│  - Read replicas        │
└─────────────────────────┘
```

### Caching Strategy

**Two-tier caching**:

1. **Edge Cache** (10-60 minutes TTL)
   - Store `shortCode → originalUrl` mappings
   - Invalidate on link deletion/update
   - Dramatically reduces database queries

2. **Browser Cache** (consider 301 redirects)
   - Permanent redirects for immutable links
   - Use 302 only for links that may change

### Platform Options

#### Option 1: Cloudflare Workers (Recommended)

**Pros**:
- Largest global network (275+ cities)
- Extremely fast cold starts (<1ms)
- Generous free tier (100k requests/day)
- Built-in KV store for caching
- Low cost at scale ($0.50 per million requests)

**Cons**:
- Different runtime (Cloudflare Workers, not Node.js)
- Learning curve for Workers KV
- Requires rewriting database connection logic

**Example Implementation**:

```typescript
// worker.ts
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const shortCode = url.pathname.slice(1)

    // Check KV cache first
    const cached = await env.LINKS_KV.get(shortCode)
    if (cached) {
      return Response.redirect(cached, 301)
    }

    // Query database via HTTP
    const originalUrl = await queryDatabase(shortCode, env.DATABASE_PUBLIC_URL)
    if (!originalUrl) {
      return new Response('Not found', { status: 404 })
    }

    // Cache for 1 hour
    await env.LINKS_KV.put(shortCode, originalUrl, { expirationTtl: 3600 })

    return Response.redirect(originalUrl, 301)
  }
}
```

#### Option 2: Vercel Edge Functions

**Pros**:
- Native integration with existing Next.js deployment
- Easy migration path (minimal code changes)
- Uses Edge Runtime (Web APIs)
- Global distribution across 40+ regions

**Cons**:
- More expensive at scale vs Cloudflare
- Smaller network than Cloudflare
- Free tier limits (100k edge requests/day)

**Example Implementation**:

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const shortCode = request.nextUrl.pathname.slice(1)

  // Edge runtime - limited to Web APIs
  const response = await fetch(`${process.env.DATABASE_PUBLIC_URL}/query`, {
    method: 'POST',
    body: JSON.stringify({ shortCode }),
  })

  const { originalUrl } = await response.json()

  if (originalUrl) {
    return NextResponse.redirect(originalUrl, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:shortCode',
}
```

#### Option 3: AWS Lambda@Edge

**Pros**:
- Tight integration with CloudFront CDN
- Scales to billions of requests
- Pay per use with no minimums

**Cons**:
- Higher latency than Cloudflare Workers (10-50ms)
- More complex setup and deployment
- Higher cost per request
- Deployment takes 15-30 minutes globally

## Benefits

### Performance Improvements

- **Latency Reduction**: 100-200ms → 10-50ms (80-90% reduction)
- **Geographic Reach**: Single region → Global edge network
- **Cache Hit Rate**: 0% → 90%+ (for repeated short codes)
- **Cold Start Impact**: Eliminated for cached requests

### Cost Efficiency

- **Reduced Database Load**: 90%+ reduction in queries
- **Lower Compute Costs**: Edge functions are cheaper than full servers
- **Bandwidth Savings**: 301 redirects enable browser caching

### User Experience

- **Faster Redirects**: Near-instant redirects worldwide
- **Better Mobile Experience**: Critical for high-latency mobile networks
- **Improved Reliability**: Edge redundancy vs single server

## Migration Steps

### Phase 1: Preparation (1-2 weeks)

1. **Audit Current System**
   - Document all redirect domains (`dwnbe.at`, etc.)
   - Measure baseline metrics (latency, request volume)
   - Identify any custom redirect logic

2. **Choose Edge Platform**
   - Evaluate Cloudflare Workers vs Vercel Edge
   - Consider cost, performance, and integration
   - Set up development account

3. **Design Cache Invalidation**
   - Determine cache TTL (recommend 1-6 hours)
   - Plan cache purge on link deletion
   - Decide on 301 vs 302 redirect strategy

### Phase 2: Database Optimization (1 week)

1. **Set Up Connection Pooling**
   - Use PgBouncer or similar for connection management
   - Required for edge functions (many concurrent connections)
   - Providers: Supabase, Neon, Railway connection pooling

2. **Add Read Replicas** (optional)
   - Deploy geographically distributed read replicas
   - Direct edge functions to nearest replica
   - Reduces query latency

3. **Create Database HTTP Endpoint** (if using Cloudflare)
   - Edge functions can't use persistent DB connections
   - Set up HTTP-based query endpoint
   - Consider Cloudflare Workers SQL Database (D1)

### Phase 3: Edge Function Development (1-2 weeks)

1. **Implement Core Redirect Logic**
   ```typescript
   // Core logic extracted from /[shortCode]/route.ts
   async function handleRedirect(shortCode: string): Promise<string | null> {
     // Check cache
     // Query database
     // Return URL or null
   }
   ```

2. **Add Edge Caching**
   - Implement KV store reads/writes (Cloudflare)
   - Or use Vercel Edge Config
   - Set appropriate TTLs

3. **Implement Cache Invalidation**
   - Add webhook/API for cache purge
   - Call from DELETE endpoint when link removed
   - Batch invalidations for efficiency

4. **Add Monitoring**
   - Log cache hit rates
   - Track redirect latency
   - Set up error alerting

### Phase 4: Testing (1 week)

1. **Local/Staging Testing**
   - Test all redirect scenarios
   - Verify cache invalidation
   - Load test with realistic traffic patterns

2. **Shadow Testing** (optional)
   - Run edge functions in parallel with existing system
   - Compare results without switching traffic
   - Validate performance improvements

3. **Canary Deployment**
   - Route 5-10% of traffic to edge functions
   - Monitor for errors and performance
   - Gradually increase to 100%

### Phase 5: DNS Migration (1-2 days)

1. **Update DNS Records**
   - Point short domains to edge function endpoints
   - Keep TTL low initially (5 minutes)
   - Monitor during switchover

2. **Verify All Domains**
   - Test each short domain (`dwnbe.at`, `downbeatacademy.services`, etc.)
   - Confirm redirects working globally
   - Check SSL/TLS certificates

3. **Update Next.js App**
   - Keep the app running for admin dashboard
   - Remove redirect route handler (`/[shortCode]/route.ts`)
   - Edge functions handle all short code redirects

### Phase 6: Optimization (Ongoing)

1. **Monitor Performance**
   - Track P50, P95, P99 latency
   - Measure cache hit rates
   - Identify slow queries

2. **Tune Cache Settings**
   - Adjust TTL based on usage patterns
   - Implement cache warming for popular links
   - Consider predictive caching

3. **Cost Optimization**
   - Monitor function execution costs
   - Optimize database queries
   - Consider migrating hot data to edge storage

## Implementation Considerations

### Database Connection Management

**Challenge**: Edge functions spawn many concurrent connections, potentially overwhelming PostgreSQL.

**Solutions**:
1. **Connection Pooler** (PgBouncer, Supabase Supavisor)
   - Required for production edge deployments
   - Pool persistent connections
   - Recommended pool size: 20-50 connections

2. **HTTP-Based Queries**
   - Use Cloudflare D1, Supabase REST API, or custom endpoint
   - Eliminates connection management complexity
   - Adds ~10-20ms latency

3. **Edge-Native Database**
   - Migrate to edge-optimized database (Cloudflare D1, Turso)
   - Built for distributed edge queries
   - May require data migration

### Cache Invalidation Strategy

**Challenge**: Edge caches are distributed; invalidation must be global.

**Approach 1: TTL-Based**
```typescript
// Set TTL when caching
await LINKS_KV.put(shortCode, originalUrl, {
  expirationTtl: 3600  // 1 hour
})

// Links may redirect to old URL for up to 1 hour after deletion
```

**Approach 2: Active Invalidation**
```typescript
// In DELETE /api/links/[id] endpoint
await fetch('https://edge-function.com/purge-cache', {
  method: 'POST',
  body: JSON.stringify({ shortCode })
})

// Immediate invalidation, but requires API call
```

**Recommendation**: Hybrid approach
- Use 1-hour TTL for most links
- Active purge for deleted/updated links
- Accept rare stale reads during TTL window

### Redirect Status Code Strategy

**Current**: 302 (temporary) redirects

**Options**:
1. **Keep 302**: Allows link changes, but prevents browser caching
2. **Switch to 301**: Better performance, but links become immutable
3. **Hybrid**: 301 for old links (>30 days), 302 for recent links

**Recommendation**: Start with 302, evaluate switching to 301 after monitoring usage patterns.

### Analytics and Click Tracking

**Challenge**: Edge functions make it harder to log every redirect.

**Solutions**:
1. **Edge-Based Logging**
   ```typescript
   // Log to Cloudflare Workers Analytics
   ctx.waitUntil(logClick(shortCode, request.cf))
   ```

2. **Client-Side Tracking**
   - Add tracking pixel to redirect response
   - Browser makes async request back to analytics endpoint

3. **Database Increments**
   - Update click counter in database (async)
   - Don't block redirect on completion

**Recommendation**: Use edge-native analytics initially, add advanced tracking later if needed.

### Handling Edge Function Failures

**Fallback Strategy**:

```typescript
// Edge function
try {
  const originalUrl = await getOriginalUrl(shortCode)
  return Response.redirect(originalUrl, 301)
} catch (error) {
  // Fallback to Next.js app if edge fails
  return Response.redirect(
    `https://cadence-links.app/redirect/${shortCode}`,
    307  // Temporary redirect to fallback
  )
}
```

This ensures links always work, even during edge function issues.

## Cost Analysis

### Current Costs (Estimated)

**Vercel Hobby/Pro**:
- 100k redirects/month: Free (within limits)
- 1M redirects/month: ~$20/month (Pro plan)
- 10M redirects/month: ~$200/month

### Edge Function Costs (Projected)

**Cloudflare Workers**:
- 100k redirects/month: Free
- 1M redirects/month: $5/month
- 10M redirects/month: $5/month (Workers Paid)
- 100M redirects/month: $50/month

With 90% cache hit rate:
- 10M redirects → 1M database queries
- Effectively 10x cost reduction

**Vercel Edge Functions**:
- 100k redirects/month: Free
- 1M redirects/month: ~$10-20/month
- 10M redirects/month: ~$100-200/month

### Database Costs

**Connection Pooling** (if needed):
- Supabase: Free with PostgreSQL plan
- Railway: Free (built-in pooling)
- PgBouncer on VPS: $5-10/month

**Edge Database** (if migrating):
- Cloudflare D1: Free tier (generous limits)
- Turso: Free tier up to 9GB, then $29/month

## Recommended Approach

### For Current Scale (<100k requests/month)

**Recommendation**: Stay on current architecture

**Reasoning**:
- Current performance is acceptable for low volume
- Migration complexity doesn't justify benefits
- Consider edge migration when traffic grows

### For Medium Scale (100k-1M requests/month)

**Recommendation**: Migrate to Vercel Edge Functions

**Reasoning**:
- Easiest migration path (minimal code changes)
- Seamless integration with existing Vercel deployment
- Performance improvements justify effort
- Manageable costs

**Timeline**: 2-3 weeks total

### For High Scale (>1M requests/month)

**Recommendation**: Migrate to Cloudflare Workers

**Reasoning**:
- Best performance-to-cost ratio
- Largest edge network
- Scales to billions of requests
- Worth the additional complexity

**Timeline**: 4-6 weeks total

### Migration Priority

Based on current traffic patterns, we recommend:

1. **Monitor** traffic to determine actual scale
2. **Defer** migration until traffic reaches 100k+ requests/month
3. **Prototype** Vercel Edge Functions when ready to migrate
4. **Evaluate** Cloudflare Workers if traffic exceeds 1M requests/month

## Success Metrics

Track these metrics to evaluate migration success:

### Performance
- **P50 Redirect Latency**: Target <50ms (from 100-200ms)
- **P95 Redirect Latency**: Target <100ms (from 200-500ms)
- **Cache Hit Rate**: Target >90%

### Reliability
- **Uptime**: Target 99.9%+
- **Error Rate**: Target <0.1%
- **Fallback Usage**: Target <1% of requests

### Cost
- **Cost per 1M Requests**: Target <$5 (from ~$20)
- **Database Query Reduction**: Target >90%

## Next Steps

1. **Measure Baseline**: Set up monitoring to track current redirect performance
2. **Traffic Analysis**: Determine if current traffic justifies migration
3. **Platform Evaluation**: Test Vercel Edge Functions vs Cloudflare Workers
4. **Prototype**: Build proof-of-concept edge function
5. **Business Case**: Present findings with performance and cost projections

## References

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Vercel Edge Functions Guide](https://vercel.com/docs/functions/edge-functions)
- [Next.js Edge Runtime](https://nextjs.org/docs/app/api-reference/edge)
- [Drizzle ORM Edge Support](https://orm.drizzle.team/docs/get-started-postgresql#http-proxy)

---

**Document Version**: 1.0
**Last Updated**: 2025-12-30
**Author**: Downbeat Academy Engineering Team
