export default function FeaturedClassCardSkeleton() {
  return (
    <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full shadow-lg animate-pulse">
      <div className="aspect-[16/10] w-full bg-white/5" />
      <div className="p-6 flex flex-col flex-1 space-y-4">
        <div className="h-6 w-3/4 bg-white/10 rounded" />
        <div className="h-3 w-1/3 bg-white/5 rounded" />
        <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4">
          <div className="h-8 bg-white/5 rounded" />
          <div className="h-8 bg-white/5 rounded" />
          <div className="h-8 bg-white/5 rounded" />
        </div>
        <div className="h-10 w-full bg-white/5 rounded" />
        <div className="h-11 w-full bg-white/10 rounded-lg" />
      </div>
    </div>
  );
}
