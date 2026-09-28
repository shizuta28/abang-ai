<script setup lang="ts">
const featuredSlugs = ['chatgpt-toolkit', 'prompt-30-hari', 'visual-starter', 'threads-guide']
const articleSlugs = [
  'cara-guna-chatgpt-untuk-kerja',
  'sepuluh-idea-content',
  'prompt-visual',
  'bina-jual-produk-digital'
]

const { data: products } = await useFetch('/api/products')
const { data: articles } = await useFetch('/api/articles')

const featuredProducts = computed(() => featuredSlugs
  .map((slug) => (products.value || []).find((product) => product.slug === slug))
  .filter((product) => product !== undefined))

const featuredArticles = computed(() => articleSlugs
  .map((slug) => (articles.value || []).find((article) => article.slug === slug))
  .filter((article) => article !== undefined))

useSeoMeta({
  title: 'Abang AI Hub',
  description: 'Belajar guna ChatGPT dan AI untuk kerja, content dan pendapatan sampingan.'
})
</script>

<template>
  <div>
    <HeroSection />
    <HomeCatalog :products="featuredProducts" :articles="featuredArticles" />
  </div>
</template>
