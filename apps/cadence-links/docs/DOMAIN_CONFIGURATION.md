# Domain Configuration

This guide covers how to configure DNS for Cadence Links' short domains.

## Supported Domains

Cadence Links supports the following short domains:

- `dwnbe.at` (default)
- `downbeatacademy.services`
- `downbeatacade.my`

## Local Development

During local development, redirects only work via `localhost:3001`. To test a shortened link:

1. Copy the short code from your created link (e.g., `abc123` from `https://dwnbe.at/abc123`)
2. Visit `http://localhost:3001/abc123` in your browser
3. You should be redirected to the original URL

The production domains won't work until DNS is configured.

## Production DNS Setup

For production use, each short domain must point to your deployed application.

### Step 1: Deploy the Application

Deploy Cadence Links to a hosting provider (Vercel, Railway, etc.) and note the deployment URL.

### Step 2: Configure DNS Records

For each short domain, add DNS records in your domain registrar:

**Option A: Using CNAME (recommended for platforms like Vercel)**

```
Type: CNAME
Name: @ (or leave blank for root domain)
Value: your-app.vercel.app (your deployment URL)
```

**Option B: Using A Record (for static IPs)**

```
Type: A
Name: @ (or leave blank for root domain)
Value: [IP address from your hosting provider]
```

### Step 3: Configure Custom Domains in Hosting Provider

Add each domain to your hosting provider's custom domains settings:

- `dwnbe.at`
- `downbeatacademy.services`
- `downbeatacade.my`

The hosting provider will issue SSL certificates automatically.

### Step 4: Verify Configuration

After DNS propagation (can take up to 48 hours, usually faster):

1. Visit each domain directly - you should see the Cadence Links dashboard
2. Test a redirect by visiting `https://dwnbe.at/[shortCode]`
3. Verify SSL is working (padlock icon in browser)

## DNS Propagation

DNS changes can take time to propagate:

- Usually: 5-30 minutes
- Maximum: 24-48 hours

Use tools like [dnschecker.org](https://dnschecker.org) to verify propagation status.

## Troubleshooting

### Domain not resolving

- Verify DNS records are correctly configured in your registrar
- Check propagation status with dnschecker.org
- Ensure there are no conflicting records (e.g., multiple A records)

### SSL certificate errors

- Ensure the domain is added to your hosting provider's custom domains
- Wait for automatic certificate provisioning (can take a few minutes)
- Check that your hosting provider supports automatic SSL for custom domains

### Redirects not working

- Verify the application is deployed and accessible
- Check that the short code exists in the database
- Ensure the domain is correctly routing to your application

## Platform-Specific Guides

### Vercel

1. Go to your project settings → Domains
2. Add each short domain
3. Follow Vercel's DNS configuration instructions
4. Vercel automatically provisions SSL certificates

### Railway

1. Go to your service settings → Networking
2. Add custom domains
3. Configure DNS as instructed
4. Railway handles SSL automatically

### Self-Hosted (Nginx)

```nginx
server {
    listen 80;
    server_name dwnbe.at downbeatacademy.services downbeatacade.my;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name dwnbe.at downbeatacademy.services downbeatacade.my;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
