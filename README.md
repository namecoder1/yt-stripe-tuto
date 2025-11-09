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




## Stripe Test Cards

| Carta (numero)        |      Descrizione / comportamento simulato |  Esempio scadenza |    Esempio CVC | Risultato atteso / decline code          |
| --------------------- | ----------------------------------------: | ----------------: | -------------: | ---------------------------------------- |
| `4242 4242 4242 4242` |       Pagamento andato a buon fine (Visa) |           `12/34` |          `123` | Successo                                 |
| `4000 0000 0000 0002` |                          Rifiuto generico |           `12/34` |          `123` | `card_declined` (generic_decline)        |
| `4000 0000 0000 9995` |                       Fondi insufficienti |           `12/34` |          `123` | `card_declined` (insufficient_funds)     |
| `4000 0000 0000 9987` |                            Carta smarrita |           `12/34` |          `123` | `card_declined` (lost_card)              |
| `4000 0000 0000 9979` |                              Carta rubata |           `12/34` |          `123` | `card_declined` (stolen_card)            |
| `4000 0000 0000 0069` |                             Carta scaduta | `12/20` (passata) |          `123` | `expired_card` / rifiuto per scadenza    |
| `4000 0000 0000 0127` |                                CVC errato |           `12/34` | `000` (errato) | `incorrect_cvc`                          |
| `4000 0000 0000 0119` |                    Errore di elaborazione |           `12/34` |          `123` | `processing_error`                       |
| `4242 4242 4242 4241` |            Numero errato / invalid number |           `12/34` |          `123` | `incorrect_number`                       |
| `4000 0000 0000 6975` | Superamento limite di velocità (velocity) |           `12/34` |          `123` | `card_declined` (card_velocity_exceeded) |


