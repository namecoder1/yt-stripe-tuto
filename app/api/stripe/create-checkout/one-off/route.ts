import { NextResponse } from 'next/server'
import { stripe as client } from '@/stripe/client'
import Stripe from 'stripe'
import { isDev } from '@/lib/utils'
import { paymentMethods } from '@/data'

const successUrl = isDev
  ? 'http://localhost:3000'
  : 'https://tobione.vercel.app'

const cancelUrl = isDev
  ? 'http://localhost:3000'
  : 'https://tobione.vercel.app'

export async function POST(req: Request) {
  try {
    const { items, user } = await req.json()

    // Check if customer with the email already exists
    const existingCustomers = await client.customers.list({
      email: user.email,
      limit: 1
    });

    let customer: Stripe.Customer;
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      console.log('Found existing Stripe Customer:', customer.id)
    } else {
      customer = await client.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userImage: user.image
        }
      });
      console.log('Created new Stripe Customer:', customer.id)
    }

    const line_items = items.map((item: any) => {
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.title,
            description: item.description,
          },
          unit_amount: item.price,
        },
        quantity: 1,
      };
    });

    const session = await client.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: paymentMethods,
      line_items,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        items: JSON.stringify(
          items.map((i: any) => ({ id: i.id, type: i.type }))
        )
      }
    })
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Errore nella creazione del checkout' }, { status: 500 })
  }
}
