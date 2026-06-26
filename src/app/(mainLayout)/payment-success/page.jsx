import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Check, ArrowRight, Activity, FileText, ShieldCheck } from 'lucide-react';
import { ObjectId } from 'mongodb';
import { db } from '@/lib/auth';

export default async function PaymentSuccessPage({ searchParams }) {
  const { session_id, classId } = await searchParams;
  if (!session_id) throw new Error('Please provide a valid session_id');

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  const { status, customer_details, amount_total, currency, id: transactionId } = session;
  const customerEmail = customer_details?.email;

  if (status === 'open') return redirect('/');

  // Save transaction to DB
  if (status === 'complete') {
    try {
      const amount = amount_total ? amount_total / 100 : 0;

      await db.collection('transactions').insertOne({
        userEmail: customerEmail || 'unknown',
        amount,
        currency: currency?.toUpperCase() || 'USD',
        transactionId,
        classId: classId || '',
        className: session.line_items?.data?.[0]?.description || 'FitPulse Booking',
        createdAt: new Date(),
      });

      // If classId exists, create booking
      if (classId) {
        const classData = await db.collection('classes').findOne({ _id: new ObjectId(classId) });
        await db.collection('bookings').insertOne({
          classId,
          className: classData?.className || 'Class',
          trainerName: classData?.authorName || classData?.authorEmail || '',
          price: amount,
          schedule: classData?.schedule?.join(', ') || '',
          image: classData?.coverImage || '',
          userEmail: customerEmail,
          userName: customer_details?.name || '',
          status: 'confirmed',
          createdAt: new Date(),
        });

        await db.collection('classes').updateOne(
          { _id: new ObjectId(classId) },
          { $inc: { totalEnrollment: 1 } },
        );
      }
    } catch (err) {
      console.error('Failed to save transaction:', err);
    }
  }

  const purchasedItemName = session.line_items?.data?.[0]?.description || 'FitPulse Premium Booking';
  const amountFormatted = amount_total ? (amount_total / 100).toFixed(2) : '0.00';
  const currencyFormatted = currency ? currency.toUpperCase() : 'USD';
  const dateFormatted = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  if (status === 'complete') {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full bg-bg-card/90 border border-neutral-dark/45 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-lg">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-85" />
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center relative">
              <Check className="h-8 w-8 text-primary animate-bounce" />
            </div>
          </div>
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/25 mb-3">
              <ShieldCheck className="w-3 h-3" /> Secure Payment Done
            </span>
            <h1 className="text-white font-extrabold text-2xl sm:text-3xl tracking-wide uppercase select-none">
              Payment Successful!
            </h1>
            <p className="text-neutral-light/75 text-sm mt-1.5">
              Welcome aboard. Your payment has been processed successfully.
            </p>
          </div>
          <div className="bg-bg-dark/65 border border-neutral-dark/40 rounded-2xl p-5 mb-8">
            <h3 className="text-neutral-light text-[11px] font-black uppercase tracking-wider mb-4 border-b border-neutral-dark/35 pb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-primary" /> Transaction Details
            </h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-neutral-light/65">Plan / Booking</span>
                <span className="text-white font-bold">{purchasedItemName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-light/65">Amount Paid</span>
                <span className="text-primary font-extrabold text-base">{amountFormatted} {currencyFormatted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-light/65">Date</span>
                <span className="text-white font-medium">{dateFormatted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-light/65">Transaction ID</span>
                <span className="text-white/80 font-mono text-xs max-w-[180px] sm:max-w-none truncate">{transactionId}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3.5">
            <Link
              href="/dashboard"
              className="flex-1 bg-primary hover:bg-[#c2eb00] text-secondary font-black py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 text-center cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] shadow-lg shadow-primary/10 hover:shadow-primary/20"
            >
              <Activity className="w-4 h-4" /> Go To Dashboard
            </Link>
            <Link
              href="/classes"
              className="flex-1 bg-transparent border border-neutral-dark/70 hover:bg-neutral-dark/20 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 text-center cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              Explore Classes <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
