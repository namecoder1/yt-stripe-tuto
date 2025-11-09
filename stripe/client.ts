import Stripe from "stripe";

let sKey: string;

if (process.env.NODE_ENV === 'production') {
  sKey = process.env.STRIPE_SECRET_KEY!;
} else sKey = process.env.STRIPE_SECRET_KEY_TEST!;

export const stripe = new Stripe(sKey, {
  apiVersion: '2025-10-29.clover',
  appInfo: {
    name: 'IlNegozioOnline'
  }
})