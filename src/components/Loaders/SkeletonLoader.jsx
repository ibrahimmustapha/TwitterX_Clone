const SkeletonLoader = () => {
  return (
    <div class=" border-blue-300 shadow rounded-md p-4">
      <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-slate-700 h-10 w-10"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-3 bg-slate-700 rounded col-span-2"></div>
            <div class="h-3 bg-slate-700 rounded col-span-1"></div>
          </div>
          <div class="space-y-5">
            <div class="h-3 bg-slate-700 rounded md:w-10/12 w-full"></div>
            <div class=" h-32 bg-slate-700 rounded md:w-8/12 w-full"></div>
          </div>
          <div class="grid grid-cols-4 gap-3 md:w-8/12 w-full">
            <div class="h-4 bg-slate-700 rounded"></div>
            <div class="h-4 bg-slate-700 rounded"></div>
            <div class="h-4 bg-slate-700 rounded"></div>
            <div class="h-4 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
