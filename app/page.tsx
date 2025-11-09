import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const steps = [
  {
    title: 'Crea un account Stripe',
    description: 'Registrati su Stripe e configura il tuo account per iniziare a ricevere pagamenti online in modo sicuro.',
    link: {
      title: 'Stripe',
      url: 'https://stripe.com'
    }
  },
  { 
    title: 'Crea un progetto Stripe',
    description: 'Crea un nuovo progetto nella dashboard di Stripe e configuralo con i tuoi dati.',
    link: {
      title: 'Dashboard Stripe',
      url: 'https://dashboard.stripe.com/'
    }
  },
  {
    title: 'Configura le chiavi API',
    description: 'Ottieni le tue chiavi API dalla dashboard di Stripe e configurale nel tuo progetto Next.js per abilitare le funzionalità di pagamento.',
    link: {
      title: 'Sezione API Stripe',
      url: 'https://dashboard.stripe.com/apikeys'
    }
  },
  {
    title: 'Imposta i prodotti e i prezzi',
    description: 'Crea i tuoi prodotti e definisci i prezzi nella dashboard di Stripe per gestire le vendite nel tuo shop online.',
    link: {
      title: 'Sezione Prodotti Stripe',
      url: 'https://dashboard.stripe.com/products'
    }
  },
  {
    title: 'Installa la CLI di Stripe',
    description: 'Segui la guida per installare la CLI di Stripe nel tuo progetto Next.js.',
    link: {
      title: 'Guida all\'installazione',
      url: 'https://docs.stripe.com/stripe-cli/install'
    }
  },
  {
    title: 'Configura i Webhook',
    description: 'Imposta i webhook di Stripe per ricevere notifiche sugli eventi di pagamento con `npm run stripe`.',
    link: {
      title: 'Guida ai Webhook',
      url: 'https://docs.stripe.com/webhooks'
    }
  }
]

const HomePage = () => {
  return (
    <section>
      <div id='hero' className='min-h-[60vh] h-full flex flex-col bg-muted items-center justify-center gap-3'>
        <h1 className='text-4xl font-bold tracking-tighter'>Stripe + Next.js Tutorial</h1>
        <p className='text-muted-foreground max-w-md text-center mx-auto mb-4'>Impara ad usare la piattaforma Stripe con Next.js per creare esperienze di pagamento straordinarie nei tuoi progetti.</p>
        <Button asChild>
          <Link href='/shop'>
            Prova lo shop
          </Link>
        </Button>
      </div>

      <div id='setup-steps' className='mx-4 pb-10'>
        <h2 className='text-3xl font-bold tracking-tighter text-center my-8'>Setup:</h2>
        <div className='max-w-4xl mx-auto grid md:grid-rows-2 md:grid-cols-2 gap-6'>
          {steps.map((step, index) => (
            <Card key={index} className='bg-card rounded-md shadow-md'>
              <CardHeader>
                <CardTitle>
                  {index + 1}. {step.title}
                </CardTitle>
                <CardDescription>
                  {step.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={step.link.url} target='_blank' className='text-blue-500 hover:underline'>Vai a {step.link.title}</Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomePage