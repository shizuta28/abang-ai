<script setup lang="ts">
import type { Article, Product } from '~/types/catalog'

defineProps<{
  products: Product[]
  articles: Article[]
}>()

const topics = [
  { title: 'Guna AI untuk kerja', text: 'Tulis, susun, analisis dan jimat masa.', to: '/articles/cara-guna-chatgpt-untuk-kerja', mark: 'Kerja' },
  { title: 'Buat content lebih cepat', text: 'Idea, skrip, caption dan banyak lagi.', to: '/checkout/prompt-30-hari?cycle=once', mark: 'Tulis' },
  { title: 'Hasilkan visual & video', text: 'Gambar, video dan reka bentuk dengan AI.', to: '/checkout/visual-starter?cycle=once', mark: 'Visual' },
  { title: 'Jual produk digital', text: 'Bina dan jual aset digital sendiri.', to: '/store', mark: 'Jual' },
  { title: 'Bina website sendiri', text: 'Cipta halaman tanpa perlu coding.', to: '/articles/bina-jual-produk-digital', mark: 'Web' }
]

const tones: Record<string, string> = {
  'chatgpt-toolkit': 'from-emerald-100 to-slate-200',
  'prompt-30-hari': 'from-orange-100 to-amber-50',
  'visual-starter': 'from-sky-200 to-indigo-100',
  'threads-guide': 'from-zinc-800 to-zinc-950'
}

const articleTones = [
  'from-orange-100 via-amber-50 to-stone-200',
  'from-emerald-100 via-lime-50 to-stone-200',
  'from-sky-200 via-blue-50 to-indigo-100',
  'from-rose-100 via-orange-50 to-amber-100'
]
</script>

<template>
  <section id="topik" class="scroll-mt-28 bg-[#f7f3ee] px-5 py-16 dark:bg-zinc-950">
    <div class="mx-auto flex max-w-6xl items-end justify-between gap-4">
      <h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Apa yang kau nak siapkan?</h2>
      <NuxtLink to="/articles" class="shrink-0 text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-white">Lihat semua topik</NuxtLink>
    </div>
    <div class="mx-auto mt-6 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <NuxtLink
        v-for="topic in topics"
        :key="topic.title"
        :to="topic.to"
        class="flex min-h-28 flex-col justify-between rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
      >
        <span class="grid h-10 w-10 place-items-center rounded-full bg-orange-50 text-[11px] font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-200">{{ topic.mark }}</span>
        <span class="mt-4 block font-semibold leading-5">{{ topic.title }}</span>
        <span class="mt-1 block text-sm leading-5 text-zinc-500">{{ topic.text }}</span>
      </NuxtLink>
    </div>
  </section>

  <section id="produk" class="scroll-mt-28 bg-[#f7f3ee] px-5 pb-16 dark:bg-zinc-950">
    <div class="mx-auto flex max-w-6xl items-end justify-between gap-4">
      <h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Produk Popular</h2>
      <NuxtLink to="/store" class="shrink-0 text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-white">Lihat semua produk</NuxtLink>
    </div>
    <div class="mx-auto mt-6 grid max-w-6xl gap-4 md:grid-cols-2 xl:grid-cols-4">
      <NuxtLink
        v-for="product in products"
        :key="product.slug"
        :to="`/checkout/${product.slug}?cycle=once`"
        class="overflow-hidden rounded-[28px] bg-white shadow-card ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
      >
        <div class="flex h-40 items-end bg-gradient-to-br p-4" :class="[tones[product.slug] || 'from-orange-100 to-white', product.slug === 'threads-guide' ? 'text-white' : 'text-zinc-950']">
          <span class="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-zinc-900">{{ formatRM(product.price) }}</span>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold leading-6">{{ product.name }}</h3>
          <p class="mt-2 text-sm leading-6 text-zinc-500">{{ product.summary }}</p>
        </div>
      </NuxtLink>
    </div>
  </section>

  <section id="artikel" class="scroll-mt-28 bg-[#f7f3ee] px-5 pb-20 dark:bg-zinc-950">
    <div class="mx-auto flex max-w-6xl items-end justify-between gap-4">
      <h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Artikel Terkini</h2>
      <NuxtLink to="/articles" class="shrink-0 text-sm font-medium text-zinc-500 hover:text-zinc-950 dark:hover:text-white">Lihat semua artikel</NuxtLink>
    </div>
    <div class="mx-auto mt-6 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <NuxtLink
        v-for="(article, index) in articles"
        :key="article.slug"
        :to="`/articles/${article.slug}`"
        class="rounded-[24px] bg-white p-3 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
      >
        <div class="h-28 rounded-2xl bg-gradient-to-br" :class="articleTones[index % articleTones.length]" />
        <h3 class="mt-3 text-sm font-semibold leading-5">{{ article.title }}</h3>
        <p class="mt-2 line-clamp-3 text-sm leading-5 text-zinc-500">{{ article.excerpt }}</p>
      </NuxtLink>
    </div>
  </section>
</template>
