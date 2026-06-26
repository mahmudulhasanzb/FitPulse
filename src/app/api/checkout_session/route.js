import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '../../../lib/stripe';
import { auth } from '@/lib/auth';
import { getClassById } from '@/lib/api/classes/data';

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');
    const user = await auth.api.getSession({ headers: await headers() });
    const email = user?.user?.email;

    let classId = null;
    try {
      const body = await req.json();
      classId = body?.classId;
    } catch (e) {}

    let lineItems, mode;

    if (classId) {
      const classData = await getClassById(classId);
      const price = classData?.price ? Math.round(Number(classData.price) * 100) : 2500;
      const name = classData?.className || 'FitPulse Class Booking';
      lineItems = [
        {
          price_data: {
            currency: 'usd',
            product_data: { name },
            unit_amount: price,
          },
          quantity: 1,
        },
      ];
      mode = 'payment';
    } else {
      lineItems = [
        {
          price: 'price_1TlgWRJc5Z7JpEo2xfhkccSd',
          quantity: 1,
        },
      ];
      mode = 'subscription';
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: lineItems,
      mode,
      metadata: { classId: classId || '' },
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}${classId ? `&classId=${classId}` : ''}`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
