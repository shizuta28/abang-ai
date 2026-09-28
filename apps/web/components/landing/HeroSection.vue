<template>
  <section class="relative min-h-[100svh] overflow-hidden bg-[#1a0c08] text-white">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,#f0a36a_0%,#e07032_22%,#9a3412_48%,#3f140c_72%,#140805_100%)]" />
    <div class="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block" aria-hidden="true">
      <div class="absolute right-[8%] top-1/2 h-[440px] w-[440px] -translate-y-1/2">
        <div class="absolute inset-8 rounded-full border border-dashed border-white/25" />
        <div class="absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-orange-500 text-center shadow-float">
          <span>
            <span class="block text-3xl font-semibold">AI</span>
            <span class="mt-1 block px-3 text-[11px] leading-4">Dari belajar ke hasil sebenar</span>
          </span>
        </div>
        <span
          v-for="node in nodes"
          :key="node.label"
          class="absolute grid h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-center text-[11px] font-medium leading-tight text-zinc-900 shadow-float"
          :style="node.style"
        >
          {{ node.label }}
        </span>
      </div>
    </div>

    <div class="relative mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-5 pb-16 pt-28 text-center">
      <div class="w-full max-w-3xl">
        <p class="font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
          AI tak perlu susah.
        </p>
        <p class="mt-3 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
          Abang AI tunjuk satu per satu.
        </p>
        <p class="mx-auto mt-6 max-w-md text-base leading-7 text-white/80 sm:text-lg">
          Belajar guna ChatGPT dan AI untuk kerja, content dan pendapatan sampingan.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <NuxtLink
            to="/articles/cara-guna-chatgpt-untuk-kerja"
            class="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-zinc-950"
          >
            Mula Dengan Panduan Percuma
          </NuxtLink>
          <NuxtLink
            to="/store"
            class="inline-flex min-h-11 items-center rounded-full bg-white/10 px-5 text-sm font-semibold ring-1 ring-white/30"
          >
            Lihat Semua Produk
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const nodes = [
  { label: 'Lebih produktif', style: 'left: 50%; top: 4%' },
  { label: 'Content & aset', style: 'left: 88%; top: 28%' },
  { label: 'Jana pendapatan', style: 'left: 82%; top: 74%' },
  { label: 'Kerja harian', style: 'left: 18%; top: 74%' },
  { label: 'Kemahiran AI', style: 'left: 12%; top: 28%' }
]
</script>
