<template>
  <section class="overflow-hidden px-5 py-16">
    <div class="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <span class="inline-flex rounded-full bg-white px-3 py-1 text-sm text-zinc-600 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-white/10">
          About the Hub
        </span>
        <h2 class="mt-5 max-w-xl font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl dark:text-white">
          A simpler way to build skills
        </h2>
        <div class="mt-8 flex flex-wrap items-center gap-4">
          <NuxtLink to="/auth/signup" class="rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950">
            Create your account
          </NuxtLink>
          <div class="flex items-center gap-3">
            <div class="flex -space-x-2">
              <span class="grid h-9 w-9 place-items-center rounded-full bg-orange-200 text-xs font-semibold text-orange-950 ring-2 ring-[#f5f5f6] dark:ring-zinc-950">AM</span>
              <span class="grid h-9 w-9 place-items-center rounded-full bg-sky-200 text-xs font-semibold text-sky-950 ring-2 ring-[#f5f5f6] dark:ring-zinc-950">NA</span>
              <span class="grid h-9 w-9 place-items-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-950 ring-2 ring-[#f5f5f6] dark:ring-zinc-950">RY</span>
              <span class="grid h-9 w-9 place-items-center rounded-full bg-white text-[10px] font-semibold text-zinc-500 ring-2 ring-[#f5f5f6] dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-950">You</span>
            </div>
            <div>
              <p class="text-amber-500">★★★★★</p>
              <p class="text-xs text-zinc-500">Trusted by members</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center lg:justify-end">
        <PhoneMock screen="stacks" />
      </div>
    </div>
    <div class="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4">
      <div class="h-36 rounded-[28px] bg-gradient-to-br from-amber-200 via-orange-300 to-rose-300 sm:col-span-2" />
      <div class="h-36 rounded-[28px] bg-gradient-to-br from-sky-800 to-slate-900" />
      <div class="h-36 rounded-[28px] bg-gradient-to-br from-emerald-200 to-teal-400" />
    </div>
  </section>
</template>
