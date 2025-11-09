# Stripe + Next.js Tutorial

### Packages
- Stripe
- TypeScript
- zustand
- shadcn/ui
- Next.js


## Quick start

1. Clone the repo and install deps (via GitHub CLI)

```shell
gh repo clone namecoder1/yt-stripe-tuto
cd yt-stripe-tuto
npm i
```

2. Install Stripe package globally via Homebrew (macOS) and log in

```shell
brew install stripe/stripe-cli/stripe
stripe login
```

3. Insert Environment Variables into `.env.local`

```env
STRIPE_SECRET_KEY=your_live_secret_key_here
NEXT_PUBLIC_STRIPE_PUB_KEY=your_live_public_key_here
STRIPE_WEBHOOK_SECRET=your_live_webhook_secret_here

STRIPE_SECRET_KEY_TEST=your_test_secret_key_here
NEXT_PUBLIC_STRIPE_PUB_KEY_TEST=your_test_public_key_here
STRIPE_WEBHOOK_SECRET_TEST=your_test_webhook_secret_here
```

4. Start the Dev Server and the Stripe Server:

```shell
npm run dev
npm run stripe
```

