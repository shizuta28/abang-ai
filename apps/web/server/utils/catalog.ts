import type { Article, Course, Product } from '~/types/catalog'

export const products: Product[] = [
  {
    id: 'prd_free',
    slug: 'plan-free',
    name: 'Free',
    summary: 'Read the public library and keep a simple view of what you saved.',
    kind: 'plan',
    price: 0,
    badge: 'Free',
    includes: [
      'Public articles',
      'Saved reading list',
      'Basic progress view',
      'Sample download',
      'Member updates'
    ]
  },
  {
    id: 'prd_pro',
    slug: 'plan-pro',
    name: 'Pro plan',
    summary: 'Stay consistent with templates, receipts, and a fuller member library.',
    kind: 'plan',
    price: 20,
    yearlyPrice: 192,
    badge: 'Pro plan',
    includes: [
      'Everything in Free',
      'Template and swipe files',
      'Weekly learning report',
      'Member library access',
      'Email receipts'
    ]
  },
  {
    id: 'prd_premium',
    slug: 'plan-premium',
    name: 'Premium plan',
    summary: 'Open the full course library, protected playback, and priority support.',
    kind: 'plan',
    price: 150,
    yearlyPrice: 1440,
    badge: 'Premium plan',
    includes: [
      'Everything in Pro',
      'Full course library',
      'Protected lesson playback',
      'Priority support',
      'Early access to new drops'
    ]
  },
  {
    id: 'prd_prompts',
    slug: 'prompt-library',
    name: 'Prompt Library Pack',
    summary: 'A ZIP of prompts for offers, outlines, and repurposing.',
    kind: 'download',
    price: 49,
    includes: ['Prompt ZIP', 'Usage notes', 'Signed download link']
  },
  {
    id: 'prd_templates',
    slug: 'newsletter-templates',
    name: 'Newsletter Templates',
    summary: 'PDF and layout files for a calm weekly letter.',
    kind: 'download',
    price: 29,
    includes: ['PDF templates', 'Subject line sheet', 'Signed download link']
  },
  {
    id: 'prd_course',
    slug: 'content-os',
    name: 'Content Operating System',
    summary: 'A short course on planning, drafting, and publishing without clutter.',
    kind: 'course',
    price: 199,
    includes: ['4 lessons', 'Protected playback', 'Progress tracking']
  },
  {
    id: 'prd_toolkit',
    slug: 'chatgpt-toolkit',
    name: 'ChatGPT Productivity Toolkit',
    summary: 'Template, prompt dan panduan siap pakai untuk kerja harian.',
    kind: 'download',
    price: 49,
    includes: ['Prompt kerja harian', 'Template dokumen', 'Pautan muat turun']
  },
  {
    id: 'prd_30',
    slug: 'prompt-30-hari',
    name: 'Prompt Content 30 Hari',
    summary: '30 set prompt untuk idea content setiap hari.',
    kind: 'download',
    price: 39,
    includes: ['30 prompt', 'Jadual harian', 'Pautan muat turun']
  },
  {
    id: 'prd_visual',
    slug: 'visual-starter',
    name: 'AI Visual Starter Pack',
    summary: 'Prompt, style dan template untuk hasilkan visual dan video.',
    kind: 'download',
    price: 59,
    includes: ['Prompt visual', 'Rujukan style', 'Pautan muat turun']
  },
  {
    id: 'prd_threads',
    slug: 'threads-guide',
    name: 'Threads Growth Guide',
    summary: 'Strategi, template dan contoh untuk bina audience di Threads.',
    kind: 'download',
    price: 29,
    includes: ['Template pos', 'Contoh hook', 'Pautan muat turun']
  }
]

export const articles: Article[] = [
  {
    id: 'art_1',
    slug: 'library-that-stays-useful',
    title: 'Build a library that stays useful',
    excerpt: 'How to file articles, templates, and lessons so the next session starts in one click.',
    category: 'Library',
    minutes: 6,
    body: [
      'A library only helps when the next file is obvious. Abang AI Hub keeps articles, downloads, and lessons in separate shelves that still share one login.',
      'Start by saving pieces you will open again this week. Leave the archive for everything else. The member library then shows entitlements, not a dump of every purchase.',
      'When a file is ready, the hub issues a temporary signed link. That keeps PDFs and ZIPs available without leaving them public.'
    ]
  },
  {
    id: 'art_2',
    slug: 'plan-a-calm-publish-week',
    title: 'Plan a calm publish week',
    excerpt: 'A simple split between research, drafting, and delivery for founders who write in public.',
    category: 'Workflow',
    minutes: 5,
    body: [
      'Most publishing weeks fail because research, writing, and packaging happen in the same hour. Split them.',
      'Monday is for collecting sources into an article draft. Wednesday is for the lesson or download that matches that draft. Friday is only for sending.',
      'The learning area in the hub follows the same rhythm: one lesson, a visible streak, and a progress line you can trust.'
    ]
  },
  {
    id: 'art_3',
    slug: 'what-members-unlock',
    title: 'What members unlock after checkout',
    excerpt: 'Orders, payments, and entitlements — and why a receipt is not the same as access.',
    category: 'Access',
    minutes: 4,
    body: [
      'Checkout creates an order. A paid callback turns that order into an entitlement. The library reads entitlements, not the receipt email.',
      'That split matters when a payment is retried. The callback is idempotent, so the same bill cannot grant access twice.',
      'Admins can refund an order and pull the entitlement back. The member keeps the receipt record. The files close.'
    ]
  },
  {
    id: 'art_kerja',
    slug: 'cara-guna-chatgpt-untuk-kerja',
    title: 'Cara guna ChatGPT untuk kerja harian dengan lebih efisyen',
    excerpt: 'Panduan langkah demi langkah untuk mula guna AI dalam rutin kerja.',
    category: 'Kerja',
    minutes: 7,
    body: [
      'Mula dengan satu tugas yang sudah kau buat setiap minggu. Jangan cuba tukar seluruh kerja dalam satu hari.',
      'Tulis arahan yang ada konteks, format dan contoh. ChatGPT lebih berguna bila kau beritahu siapa pembaca dan apa hasil yang kau nak.',
      'Simpan prompt yang berjaya dalam perpustakaan. Ulang guna arahan yang sama supaya kerja seterusnya lebih cepat.'
    ]
  },
  {
    id: 'art_idea',
    slug: 'sepuluh-idea-content',
    title: '10 idea content yang boleh dibuat dengan bantuan AI',
    excerpt: 'Dapatkan idea fresh untuk content media sosial, blog dan video.',
    category: 'Content',
    minutes: 6,
    body: [
      'Satu topik boleh jadi caption, rangka blog, skrip pendek dan soalan untuk audiens.',
      'Minta AI bagi sepuluh sudut, kemudian pilih dua yang kau memang boleh ceritakan dari pengalaman sendiri.',
      'Jangan terbitkan sepuluh idea serentak. Pilih satu, tulis, dan jadualkan yang seterusnya.'
    ]
  },
  {
    id: 'art_visual',
    slug: 'prompt-visual',
    title: 'Prompt terbaik untuk hasilkan gambar yang lebih realistik dengan AI',
    excerpt: 'Teknik dan contoh prompt yang boleh terus dicuba.',
    category: 'Visual',
    minutes: 5,
    body: [
      'Nyatakan subjek, cahaya, lensa dan suasana. Prompt yang hanya sebut cantik biasanya menghasilkan gambar generik.',
      'Tambah apa yang kau tak nak, contohnya teks rawak, supaya hasil lebih terkawal.',
      'Simpan prompt yang hampir kena, kemudian ubah satu perkara sahaja pada percubaan seterusnya.'
    ]
  },
  {
    id: 'art_jual',
    slug: 'bina-jual-produk-digital',
    title: 'Cara bina dan jual produk digital menggunakan AI',
    excerpt: 'Dari idea sampai siap, panduan ringkas untuk jana pendapatan sampingan.',
    category: 'Jualan',
    minutes: 8,
    body: [
      'Pilih satu masalah yang orang sudah cari jalan penyelesaian. Produk yang jelas lebih senang dijual daripada koleksi yang terlalu luas.',
      'Guna AI untuk rangka, contoh dan semakan. Keputusan harga dan janji tetap datang dari kau.',
      'Selepas bayaran disahkan, akses masuk ke perpustakaan ahli. Resit bukan bukti akses.'
    ]
  }
]

export const courses: Course[] = [
  {
    id: 'crs_1',
    slug: 'content-operating-system',
    title: 'Content Operating System',
    summary: 'Four short lessons for turning a note into an article, a template, and a lesson.',
    requires: ['plan-premium', 'content-os'],
    lessons: [
      {
        id: 'les_offer',
        title: 'Name the offer',
        minutes: 12,
        summary: 'Write the promise in one sentence before you open a blank page.'
      },
      {
        id: 'les_outline',
        title: 'Outline without clutter',
        minutes: 15,
        summary: 'Keep three beats: problem, path, and proof.'
      },
      {
        id: 'les_publish',
        title: 'Publish the article',
        minutes: 18,
        summary: 'Move the outline into a public article and a saved reading note.'
      },
      {
        id: 'les_repurpose',
        title: 'Repurpose into a download',
        minutes: 14,
        summary: 'Turn the same outline into a PDF or ZIP a member can keep.'
      }
    ]
  },
  {
    id: 'crs_2',
    slug: 'offer-sprint',
    title: 'Offer Sprint',
    summary: 'A tighter course for pricing a digital product and opening checkout.',
    requires: ['plan-premium', 'content-os'],
    lessons: [
      {
        id: 'les_price',
        title: 'Price the shelf',
        minutes: 10,
        summary: 'Match free, pro, and premium to what the member can open.'
      },
      {
        id: 'les_checkout',
        title: 'Walk through checkout',
        minutes: 11,
        summary: 'Follow the bill, the redirect, and the callback until access appears.'
      }
    ]
  }
]

export function findProduct(slug: string) {
  return products.find((item) => item.slug === slug)
}

export function findArticle(slug: string) {
  return articles.find((item) => item.slug === slug)
}

export function findCourse(slug: string) {
  return courses.find((item) => item.slug === slug)
}

export function chargeFor(product: Product, cycle: 'monthly' | 'yearly' | 'once') {
  if (product.kind !== 'plan') return product.price
  if (cycle === 'yearly') return product.yearlyPrice ?? product.price * 10
  return product.price
}
