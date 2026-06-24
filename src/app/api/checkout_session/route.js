import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

import { stripe } from '../../../lib/stripe';
import { auth } from '@/lib/auth';

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');
    const user = await auth.api.getSession({
        headers: await headers(),
      });
    const email = user?.user?.email;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({

      customer_email: email,

      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: 'price_1TlgWRJc5Z7JpEo2xfhkccSd',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });
    // console.log(session);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.log(err)

    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}


