<template>
  <div class="min-h-screen bg-[#f5f5f7] text-slate-900">
    <!-- background decor -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        class="absolute left-0 top-0 h-72 w-72 rounded-full bg-black/[0.04] blur-3xl"
      ></div>
      <div
        class="absolute right-0 top-0 h-80 w-80 rounded-full bg-black/[0.06] blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-black/[0.04] blur-3xl"
      ></div>
    </div>

    <main
      class="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
    >
      <BaseHeroSection
        title="Olá, Gabriel, bem-vindo novamente."
        description="O sistema foi reformulado pensando em uma melhor usabilidade para você, com uma navegação mais simples, intuitiva e organizada. O que deseja fazer hoje?"
      />

      <section class="mt-8 sm:mt-10">
        <div
          class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p class="text-xl font-medium text-slate-500">Navegação rápida</p>
          </div>
        </div>
      </section>

      <section class="mt-5 grid grid-cols-2 gap-4 lg:gap-5">
        <BaseActionCard
          v-for="card in actionCards"
          :key="card.to"
          :to="card.to"
          :icon="card.icon"
          :title="card.title"
          :description="card.description"
          :content-class="card.contentClass"
        />
      </section>
    </main>
  </div>
</template>

<script setup>
import BaseActionCard from "@/components/base/BaseActionCard.vue";
import BaseHeroSection from "@/components/base/BaseHeroSection.vue";
import HomeHeader from "@/components/layouts/HomeHeader.vue";

const actionCards = [
  {
    to: "/novo-cliente",
    icon: "mdi-account-plus-outline",
    title: "Novo cliente",
    description:
      "Cadastre um novo cliente no sistema de forma rápida e organizada.",
    contentClass: "bg-black",
  },
  {
    to: "/new-os",
    icon: "mdi-file-document-plus-outline",
    title: "Nova O.S.",
    description:
      "Crie uma nova ordem de serviço com mais praticidade no fluxo.",
    contentClass: "bg-[#111111]",
  },
  {
    to: "/customer-list",
    icon: "mdi-account-group-outline",
    title: "Listar clientes",
    description:
      "Visualize e consulte os clientes já cadastrados no sistema.",
    contentClass: "bg-black",
  },
  {
    to: "/os-list",
    icon: "mdi-format-list-bulleted-square",
    title: "Listar O.S.",
    description: "Consulte e acompanhe as ordens de serviço cadastradas.",
    contentClass: "bg-[#111111]",
  },
];
</script>