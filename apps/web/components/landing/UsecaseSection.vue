<template>
  <section id="usecase" class="scroll-mt-28 overflow-hidden px-5 pb-8 pt-24">
    <div class="mx-auto max-w-5xl text-center">
      <h2 class="text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-zinc-950 sm:text-5xl lg:text-[62px] dark:text-white">
        Build steady daily
        <span class="mx-1 inline-grid h-8 w-8 -translate-y-0.5 place-items-center rounded-full bg-orange-500 align-middle text-xs font-semibold text-white sm:h-10 sm:w-10 sm:text-sm">A</span>
        habits with a layout that keeps articles, courses,
        <span class="inline-block align-middle">☀️</span>
        and focus hours simple to follow.
      </h2>
      <p class="mt-8 text-lg text-zinc-500 dark:text-zinc-400">Used by members to keep a calmer study rhythm.</p>
      <div class="mt-5 flex flex-wrap justify-center gap-2">
        <span v-for="tag in ['#Founders', '#Students', '#BusyParents', '#RemoteTeams']" :key="tag" class="rounded-full bg-zinc-200/80 px-3 py-1.5 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {{ tag }}
        </span>
      </div>
    </div>

    <div id="metrics" class="relative mx-auto mt-12 flex max-w-6xl items-end justify-center scroll-mt-28 md:mt-16 md:min-h-[460px]">
      <div class="absolute bottom-8 left-0 hidden w-44 -rotate-6 overflow-hidden rounded-[28px] bg-sky-100 shadow-card md:block dark:bg-sky-950">
        <div class="h-28 bg-gradient-to-br from-sky-300 to-orange-200" />
        <p class="px-4 py-4 text-sm font-medium text-sky-950 dark:text-sky-100">Saved articles</p>
      </div>
      <div class="absolute bottom-16 left-[12%] hidden h-36 w-36 rounded-[28px] bg-white shadow-card md:block dark:bg-zinc-900">
        <div class="grid h-full place-items-center">
          <span class="grid h-14 w-14 place-items-center rounded-full bg-red-500 text-2xl text-white">↓</span>
        </div>
      </div>
      <PhoneMock screen="overview" />
      <div class="absolute bottom-16 right-[12%] hidden h-36 w-40 overflow-hidden rounded-[28px] bg-emerald-100 shadow-card md:block dark:bg-emerald-950">
        <div class="h-16 bg-gradient-to-br from-emerald-700 to-lime-200" />
        <p class="px-4 py-3 text-sm font-medium">Template drop</p>
      </div>
      <div class="absolute bottom-6 right-0 hidden h-32 w-32 rounded-[28px] bg-white shadow-card md:block dark:bg-zinc-900">
        <div class="grid h-full place-items-center">
          <span class="grid h-12 w-12 place-items-center rounded-full bg-sky-600 text-white">▶</span>
        </div>
      </div>
    </div>
  </section>
</template>
