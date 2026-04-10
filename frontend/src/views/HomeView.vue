<template>
  <AppLayout>
    <!-- hero -->
    <section
      class="overflow-hidden rounded-[32px] border border-black/10 bg-gradient-to-br from-black via-[#111111] to-[#1a1a1a] text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
    >
      <div class="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
        <div class="relative px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div class="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/5 blur-3xl"></div>
          <div class="relative">
            <h2 class="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[42px]">
              Olá, {{ nomeUsuario }}, bem-vindo novamente.
            </h2>
            <p class="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base">
              O sistema foi reformulado pensando em uma melhor usabilidade para você,
              com uma navegação mais simples, intuitiva e organizada. O que deseja fazer hoje?
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- section header -->
    <section class="mt-8 sm:mt-10">
      <p class="text-xl font-medium text-slate-500">Navegação rápida</p>
    </section>

    <!-- cards row 1 -->
    <section class="mt-5 grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <RouterLink
        to="/novo-cliente"
        class="group overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]"
      >
        <div class="border-b border-black/5 bg-black px-4 py-4 text-white sm:px-6 sm:py-5">
          <div class="flex items-center justify-between gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 sm:h-14 sm:w-14">
              <span class="mdi mdi-account-plus-outline text-[24px] sm:text-[28px]"></span>
            </div>
            <span class="mdi mdi-arrow-top-right text-[20px] text-white/50 sm:text-[22px]"></span>
          </div>
          <h4 class="mt-4 text-base font-semibold sm:mt-5 sm:text-xl">Novo cliente</h4>
          <p class="mt-2 text-xs leading-5 text-white/65 sm:text-sm sm:leading-6">
            Cadastre um novo cliente no sistema de forma rápida e organizada.
          </p>
        </div>
      </RouterLink>

      <RouterLink
        to="/nova-os"
        class="group overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]"
      >
        <div class="border-b border-black/5 bg-[#111111] px-4 py-4 text-white sm:px-6 sm:py-5">
          <div class="flex items-center justify-between gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 sm:h-14 sm:w-14">
              <span class="mdi mdi-file-document-plus-outline text-[24px] sm:text-[28px]"></span>
            </div>
            <span class="mdi mdi-arrow-top-right text-[20px] text-white/50 sm:text-[22px]"></span>
          </div>
          <h4 class="mt-4 text-base font-semibold sm:mt-5 sm:text-xl">Nova O.S.</h4>
          <p class="mt-2 text-xs leading-5 text-white/65 sm:text-sm sm:leading-6">
            Crie uma nova ordem de serviço com mais praticidade no fluxo.
          </p>
        </div>
      </RouterLink>
    </section>

    <!-- cards row 2 -->
    <section class="mt-5 grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <RouterLink
        to="/listar-clientes"
        class="group overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]"
      >
        <div class="border-b border-black/5 bg-black px-4 py-4 text-white sm:px-6 sm:py-5">
          <div class="flex items-center justify-between gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 sm:h-14 sm:w-14">
              <span class="mdi mdi-account-group-outline text-[24px] sm:text-[28px]"></span>
            </div>
            <span class="mdi mdi-arrow-top-right text-[20px] text-white/50 sm:text-[22px]"></span>
          </div>
          <h4 class="mt-4 text-base font-semibold sm:mt-5 sm:text-xl">Listar clientes</h4>
          <p class="mt-2 text-xs leading-5 text-white/65 sm:text-sm sm:leading-6">
            Visualize e consulte os clientes já cadastrados no sistema.
          </p>
        </div>
      </RouterLink>

      <RouterLink
        to="/listar-os"
        class="group overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]"
      >
        <div class="border-b border-black/5 bg-[#111111] px-4 py-4 text-white sm:px-6 sm:py-5">
          <div class="flex items-center justify-between gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 sm:h-14 sm:w-14">
              <span class="mdi mdi-format-list-bulleted-square text-[24px] sm:text-[28px]"></span>
            </div>
            <span class="mdi mdi-arrow-top-right text-[20px] text-white/50 sm:text-[22px]"></span>
          </div>
          <h4 class="mt-4 text-base font-semibold sm:mt-5 sm:text-xl">Listar O.S.</h4>
          <p class="mt-2 text-xs leading-5 text-white/65 sm:text-sm sm:leading-6">
            Consulte e acompanhe as ordens de serviço cadastradas.
          </p>
        </div>
      </RouterLink>
    </section>
  </AppLayout>
</template>

<script setup>
import BaseActionCard from "@/components/base/BaseActionCard.vue";
import BaseHeroSection from "@/components/base/BaseHeroSection.vue";

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
    to: "/listar-clientes",
    icon: "mdi-account-group-outline",
    title: "Listar clientes",
    description:
      "Visualize e consulte os clientes já cadastrados no sistema.",
    contentClass: "bg-black",
  },
  {
    to: "/listar-os",
    icon: "mdi-format-list-bulleted-square",
    title: "Listar O.S.",
    description: "Consulte e acompanhe as ordens de serviço cadastradas.",
    contentClass: "bg-[#111111]",
  },
];
</script>
