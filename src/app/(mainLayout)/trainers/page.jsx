import React from 'react';
import { getTrainers } from '@/lib/api/users/data';
import TrainerCard from '@/components/cards/TrainerCard';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Trainers | FitPulse',
  description: 'Meet our trainers.',
};

export default async function TrainersPage() {
  const trainersRes = await getTrainers().catch(() => []);
  const trainers = Array.isArray(trainersRes) ? trainersRes : [];

  return (
    <div className="bg-bg-dark min-h-screen px-6 md:px-16 py-12 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="text-[11px] font-mono tracking-[0.25em] text-primary uppercase font-bold block mb-2">
            INSTRUCTORS
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white mb-3">
            Our Trainers
          </h1>
          <p className="text-sm md:text-base text-neutral-light/70 max-w-2xl leading-relaxed">
            Meet our certified team of trainers and instructors.
          </p>
        </div>

        {/* Minimalist Trainers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
          {trainers.map(trainer => (
            <TrainerCard key={trainer._id} trainer={trainer} />
          ))}
        </div>
      </div>
    </div>
  );
}
