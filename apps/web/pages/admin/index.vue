<script setup lang="ts">
definePageMeta({ middleware: 'admin' })
const { data, refresh } = await useFetch('/api/admin/summary')
const busy = ref('')

async function refund(id: string) {
  busy.value = id
  try {
    await $fetch(`/api/orders/${id}/refund`, { method: 'POST' })
    await refresh()
  } finally {
    busy.value = ''
  }
}

useSeoMeta({ title: 'Admin · Abang AI Hub' })
</script>

<template>
  <section class="px-5 pb-20 pt-32">
    <div class="mx-auto max-w-6xl">
      <p class="text-sm font-medium text-orange-600">Admin</p>
      <h1 class="mt-2 font-display text-5xl font-semibold tracking-tight">Orders, access, and services</h1>

      <div class="mt-8 grid gap-3 sm:grid-cols-3">
        <div class="rounded-2xl bg-white p-4 text-sm shadow-card dark:bg-zinc-900">
          Google sign-in
          <p class="mt-1 font-semibold">{{ data?.services.google ? 'Configured' : 'Needs client keys' }}</p>
        </div>
        <div class="rounded-2xl bg-white p-4 text-sm shadow-card dark:bg-zinc-900">
          ToyyibPay
          <p class="mt-1 font-semibold">{{ data?.services.toyyibpay ? 'Live bills' : 'Practice checkout' }}</p>
        </div>
        <div class="rounded-2xl bg-white p-4 text-sm shadow-card dark:bg-zinc-900">
          Resend
          <p class="mt-1 font-semibold">{{ data?.services.resend ? 'Sending receipts' : 'Receipts queued locally' }}</p>
        </div>
      </div>

      <div class="mt-8 overflow-x-auto rounded-[28px] bg-white shadow-card ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
        <table class="w-full text-left text-sm">
          <thead class="text-xs uppercase tracking-wide text-zinc-400">
            <tr>
              <th class="px-4 py-3 font-medium">Member</th>
              <th class="px-4 py-3 font-medium">Product</th>
              <th class="px-4 py-3 font-medium">Amount</th>
              <th class="px-4 py-3 font-medium">Status</th>
              <th class="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in data?.orders" :key="order.id" class="border-t border-zinc-100 dark:border-white/10">
              <td class="px-4 py-3">{{ order.email }}</td>
              <td class="px-4 py-3">{{ order.productName }}</td>
              <td class="px-4 py-3">{{ formatRM(order.amount) }}</td>
              <td class="px-4 py-3">{{ order.status }}</td>
              <td class="px-4 py-3 text-right">
                <button
                  v-if="order.status === 'paid'"
                  type="button"
                  class="text-xs font-semibold text-red-600 disabled:opacity-50"
                  :disabled="busy === order.id"
                  @click="refund(order.id)"
                >
                  Refund
                </button>
              </td>
            </tr>
            <tr v-if="!data?.orders.length">
              <td colspan="5" class="px-4 py-8 text-center text-zinc-500">No orders yet.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6 grid gap-5 lg:grid-cols-2">
        <article class="rounded-[28px] bg-white p-6 shadow-card dark:bg-zinc-900">
          <h2 class="font-semibold">Members</h2>
          <p v-for="member in data?.users" :key="member.id" class="mt-3 text-sm">
            {{ member.name }} · {{ member.email }} · {{ member.role }}
          </p>
          <p v-if="!data?.users.length" class="mt-3 text-sm text-zinc-500">Nobody has signed in yet.</p>
        </article>
        <article class="rounded-[28px] bg-white p-6 shadow-card dark:bg-zinc-900">
          <h2 class="font-semibold">Funnel events</h2>
          <p v-for="event in data?.events" :key="event.id" class="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
            {{ event.name }} <span class="text-zinc-400">{{ event.email || 'guest' }}</span>
          </p>
          <p v-if="!data?.events.length" class="mt-3 text-sm text-zinc-500">Events appear when people sign up, read, and buy.</p>
        </article>
      </div>
    </div>
  </section>
</template>
