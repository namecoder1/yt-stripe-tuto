import { NextRequest, NextResponse } from "next/server";  
import { stripe as client } from "@/stripe/client";
import { Stripe } from 'stripe'

/**
 * Subsequent events when a user subscribes to a plan
 */
const subscriptionEventsFlow = [
  'payment_method.attached',
  'charge.succeeded',
  'checkout.session.completed',
  'customer.updated',
  'payment_intent.succeeded',
  'customer.subscription.created',
  'payment_intent.created',
  'invoice.created',
  'invoice.finalized',
  'invoice.paid',
  'invoice.payment_succeeded',
  'invoice_payment.paid',
]

/**
 * Subsequent events when a user requests a refund for a one-off payment
 */
const refundOneOffEventsFlow = [
  'refund.created',
  'charge.refunded',
  'refund.updated',
  'charge.refund.updated'
]

/**
 * Subsequent events when a user cancels a payed subscription
 */
const cancelSubscriptionEventsFlow = [
  'customer.subscription.deleted',
  'invoice.updated',
  'credit_note.created',
  ...refundOneOffEventsFlow
]

const webhookSecret = process.env.NODE_ENV === 'production'
  ? process.env.STRIPE_WEBHOOK_SECRET!
  : process.env.STRIPE_WEBHOOK_SECRET_TEST!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature')!;

    if (!signature) {
      console.error('No stripe signature found')
      return NextResponse.json(
        { error: 'No signature'},
        { status: 400 }
      )
    }

    let event: any

    try {
      event = client.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature'},
        { status: 400 }
      )
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        console.info('Event Type:', event.type)
        const session = event.data.object as Stripe.Checkout.Session

        console.log('Customer Email:', session.customer_email)
        console.log('Total Amount:', session.amount_total ? session.amount_total / 100 : 0, session.currency?.toUpperCase())
        console.log('Payment Status:', session.payment_status)
        console.log('Stripe Payment Intent')
        break
      }

      case 'payment_method.attached': {
        console.info('Event Type:', event.type)
        console.log('‼️ Debug Log:', event)
        const charge = event.data.object as Stripe.PaymentMethod
        break
      }

      case 'charge.succeeded': {
        console.info('Event Type:', event.type)
        const charge = event.data.object as Stripe.Charge
        break
      }

      case 'charge.updated': {
        console.info('Event Type:', event.type)
        const charge = event.data.object as Stripe.Charge
        break
      }

      case 'charge.failed': {
        console.info('Event Type:', event.type)
        const charge = event.data.object as Stripe.Charge
        console.error('Charge failed for charge ID:', charge.id)
        return NextResponse.json({ error: 'Charge failed, not possible to process payment' }, { status: 404 })
      }

      case 'charge.refunded': {
        console.info('Event Type:', event.type)
        const refund = event.data.object as Stripe.Charge
        const refundAttributes = event.data.previous_attributes as Stripe.Charge
        console.log('Refund Invoice:', refundAttributes.receipt_url)
        console.log('Charge:', refund.id)
        break
      }

      case 'charge.refund.updated': {
        console.info('Event Type:', event.type)
        const refund = event.data.object as Stripe.Charge
        const refundAttributes = event.data.previous_attributes as Stripe.Charge
        console.log('Charge refund updated for charge:', refund.id)
        console.log('Previous Receipt URL:', refundAttributes.receipt_url)
        console.log('Current Status:', refund.status)
        break
      }

      case 'payment_intent.succeeded': {
        console.info('Event Type:', event.type)
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        break
      }

      case 'payment_intent.created': {
        console.info('Event Type:', event.type)
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        break
      }

      case 'payment_intent.payment_failed': {
        console.info('Event Type:', event.type)
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        break
      }

      case 'refund.created': {
        console.info('Event Type:', event.type)
        const refund = event.data.object as Stripe.Refund
        console.log('Refund created for charge:', refund.charge)
        console.log('Refund ID:', refund.id)
        console.log('Amount:', refund.amount / 100, refund.currency.toUpperCase())
        console.log('Refund Url:', refund.receipt_number)
        break
      }

      case 'refund.updated': {
        console.info('Event Type:', event.type)
        const refund = event.data.object as Stripe.Refund
        const refundAttributes = event.data.previous_attributes as Stripe.Refund
        console.log('Refund updated for charge:', refund.charge)
        console.log('Refund ID:', refund.id)
        console.log('Amount:', refund.amount / 100, refund.currency.toUpperCase())
        console.log('Previous Destination Details:', refundAttributes.destination_details)
        console.log('Current Destination Details:', refund.destination_details)
        break
      }

      case 'customer.updated': {
        console.info('Event Type:', event.type)
        console.log('‼️ Debug Log:', event)
        const customer = event.data.object as Stripe.Customer
        break
      }

      case 'customer.subscription.created': {
        console.info('Event Type:', event.type)
        console.log('‼️ Debug Log:', event)
        const customer = event.data.object as Stripe.Customer
        break
      }

      case 'customer.subscription.deleted': {
        console.info('Event Type:', event.type)
        console.log('‼️ Debug Log:', event)
        const customer = event.data.object as Stripe.Customer
        break
      }

      case 'customer.deleted': {
        console.info('Event Type:', event.type)
        console.log('‼️ Debug Log:', event)
        const customer = event.data.object as Stripe.Customer
        break
      }

      case 'invoice.created': {
        console.info('Event Type:', event.type)
        console.log('‼️ Debug Log:', event)
        const invoice = event.data.object as Stripe.Invoice
        break
      }

      case 'invoice.updated': {
        console.info('Event Type:', event.type)
        console.log('‼️ Debug Log:', event)
        const invoice = event.data.object as Stripe.Invoice
        break
      }

      case 'invoice.finalized': {
        console.info('Event Type:', event.type)
        console.log('‼️ Debug Log:', event)
        const invoice = event.data.object as Stripe.Invoice
        break
      }

      case 'invoice.paid': {
        console.info('Event Type:', event.type)
        console.log('‼️ Debug Log:', event)
        const invoice = event.data.object as Stripe.Invoice
        break
      }

      case 'invoice.payment_succeeded': {
        console.info('Event Type:', event.type)
        console.log('‼️ Debug Log:', event)
        const invoice = event.data.object as Stripe.Invoice
        break
      }

      case 'invoice_payment.paid': {
        console.info('Event Type:', event.type)
        console.log('‼️ Debug Log:', event)
        const invoice = event.data.object as Stripe.Invoice
        break
      }

      case 'credit_note.created': {
        console.info('Event Type:', event.type)
        console.log('‼️ Debug Log:', event)
        const creditNote = event.data.object as Stripe.CreditNote
        break
      }
      default:
        break
    }
    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}