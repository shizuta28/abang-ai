<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const route = useRoute()
const orderId = computed(() => String(route.params.orderId))
const paying = ref(false)
const error = ref('')

async function confirm() {
  paying.value = true
  error.value = ''
  try {
    await $fetch('/api/payments/callback', {
      method: 'POST',
      body: { orderId: orderId.value, status: '1', refno: `local_${orderId.value}` }
    })
    await navigateTo(`/checkout/success?order=${orderId.value}`)
  } catch {
    error.value = 'The bill could not be confirmed.'
    paying.value = false
  }
}
</script>

<template>
  <section class="px-5 pb-20 pt-32">
    <div class="mx-auto max-w-lg rounded-[28px] bg-white p-8 text-center shadow-card ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
      <p class="text-xs font-semibold uppercase tracking-[0.16em] text-orange-600">ToyyibPay practice bill</p>
      <h1 class="mt-3 font-display text-4xl font-semibold">Confirm this payment</h1>
      <p class="mt-3 text-sm leading-6 text-zinc-500">Order {{ orderId }}. This local bill stands in until live ToyyibPay keys are added.</p>
      <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>
      <button
        type="button"
        class="mt-8 w-full rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60 dark:bg-white dark:text-zinc-950"
        :disabled="paying"
        @click="confirm"
      >
        {{ paying ? 'Confirming…' : 'Pay now' }}
      </button>
    </div>
  </section>
</template>
