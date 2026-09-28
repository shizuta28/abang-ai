<script setup lang="ts">
const { data: products } = await useFetch('/api/products')
const goods = computed(() => (products.value || []).filter((item) => item.kind !== 'plan'))

useSeoMeta({ title: 'Store · Abang AI Hub' })
</script>

<template>
  <section class="px-5 pb-20 pt-32">
    <div class="mx-auto max-w-6xl">
      <p class="text-sm font-medium text-orange-600">Store</p>
      <h1 class="mt-2 font-display text-5xl font-semibold tracking-tight">Digital products</h1>
      <p class="mt-3 max-w-xl text-zinc-500 dark:text-zinc-400">
        PDFs, ZIP packs, and courses. Checkout opens a ToyyibPay bill, then the file lands in your library.
      </p>
      <div class="mt-10 grid gap-5 md:grid-cols-3">
        <article
          v-for="product in goods"
          :key="product.slug"
          class="flex flex-col rounded-[28px] bg-white p-6 shadow-card ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
        >
          <div class="h-28 rounded-2xl" :class="product.kind === 'course' ? 'bg-gradient-to-br from-emerald-700 to-emerald-950' : 'bg-gradient-to-br from-orange-300 to-rose-400'" />
          <h2 class="mt-5 text-xl font-semibold">{{ product.name }}</h2>
          <p class="mt-2 flex-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{{ product.summary }}</p>
          <p class="mt-4 font-display text-3xl font-semibold">{{ formatRM(product.price) }}</p>
          <NuxtLink
            :to="`/checkout/${product.slug}?cycle=once`"
            class="mt-5 inline-flex justify-center rounded-full bg-zinc-950 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
          >
            Buy
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>
