<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const cycle = computed(() => route.query.cycle === 'yearly' ? 'yearly' : route.query.cycle === 'once' ? 'once' : 'monthly')
const { data: product } = await useFetch(() => `/api/products/${slug.value}`)
const paying = ref(false)
const error = ref('')

const amount = computed(() => {
  if (!product.value) return 0
  if (product.value.kind === 'plan' && cycle.value === 'yearly') return product.value.yearlyPrice || product.value.price
  return product.value.price
})

async function pay() {
  error.value = ''
  paying.value = true
  try {
    const result = await $fetch<{ paymentUrl: string }>('/api/orders', {
      method: 'POST',
      body: { productSlug: slug.value, cycle: cycle.value }
    })
    await navigateTo(result.paymentUrl, { external: result.paymentUrl.startsWith('http') })
  } catch {
    error.value = 'Checkout could not start. Sign in and try again.'
    paying.value = false
  }
}
</script>

<template>
  <section class="px-5 pb-20 pt-32">
    <div v-if="product" class="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
      <div class="rounded-[28px] bg-white p-8 shadow-card ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
        <p class="text-sm text-orange-600">Checkout</p>
        <h1 class="mt-2 font-display text-4xl font-semibold tracking-tight">{{ product.name }}</h1>
        <p class="mt-3 text-zinc-500 dark:text-zinc-400">{{ product.summary }}</p>
        <ul class="mt-6 space-y-2 text-sm">
          <li v-for="item in product.includes" :key="item">✓ {{ item }}</li>
        </ul>
      </div>
      <div class="rounded-[28px] bg-zinc-950 p-8 text-white">
        <p class="text-sm text-zinc-400">{{ cycle === 'yearly' ? 'Yearly bill' : cycle === 'once' ? 'One-time bill' : 'Monthly bill' }}</p>
        <p class="mt-3 font-display text-5xl font-semibold">{{ formatRM(amount) }}</p>
        <p class="mt-4 text-sm leading-6 text-zinc-400">
          ToyyibPay opens when keys are set. Until then this stays on a local bill page with the same callback.
        </p>
        <p v-if="error" class="mt-4 text-sm text-red-300">{{ error }}</p>
        <button
          type="button"
          class="mt-8 w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 disabled:opacity-60"
          :disabled="paying"
          @click="pay"
        >
          {{ paying ? 'Opening bill…' : 'Continue to payment' }}
        </button>
      </div>
    </div>
  </section>
</template>
