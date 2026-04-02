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

    <!-- overlay mobile -->
    <transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-30 bg-black/20 md:hidden"
        @click="isMobileMenuOpen = false"
      ></div>
    </transition>

    <!-- overlay user menu -->
    <div
      v-if="isUserMenuOpen"
      class="fixed inset-0 z-30 hidden md:block"
      @click="isUserMenuOpen = false"
    ></div>

    <!-- header -->
    <header
      class="sticky top-0 z-40 border-b border-black/10 bg-black/95 text-white backdrop-blur"
    >
      <div
        class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
      >
        <!-- brand -->
        <div class="flex items-center gap-3">
          <div
            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10"
          >
            <span class="text-sm font-semibold tracking-wide text-white"></span>
          </div>
        </div>

        <!-- desktop nav -->
        <nav class="hidden items-center gap-1 lg:flex">
          <RouterLink
            to="/novo-cliente"
            class="rounded-xl px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Novo cliente
          </RouterLink>

          <RouterLink
            to="/nova-os"
            class="rounded-xl px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Nova O.S.
          </RouterLink>

          <RouterLink
            to="/listar-clientes"
            class="rounded-xl px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Listar clientes
          </RouterLink>

          <RouterLink
            to="/listar-os"
            class="rounded-xl px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Listar O.S.
          </RouterLink>
        </nav>

        <!-- right actions -->
        <div class="flex items-center gap-2">
          <!-- desktop user menu -->
          <div class="relative hidden md:block">
            <button
              type="button"
              class="group flex items-center gap-3 rounded-2xl px-3 py-2    "
              @click="toggleUserMenu"
            >
              <div
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-semibold text-black shadow-[0_0_14px_rgba(255,255,255,0.35)] ring-1 ring-white/70 transition duration-200 group-hover:-translate-y-[1px] group-hover:scale-[1.03] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
              >
                GA
              </div>

              <div class="hidden xl:block">
                <p class="text-sm font-medium leading-none">Gabriel</p>
                <p class="mt-1 text-xs text-white/55">Minha conta</p>
              </div>
            </button>

            <transition name="user-menu">
              <div
                v-if="isUserMenuOpen"
                class="absolute right-0 top-[calc(100%+10px)] z-50 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#111111] shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
              >
                <div class="border-b border-white/10 px-4 py-4">
                  <p class="text-sm font-semibold text-white">
                    Gabriel Albuquerque Silva
                  </p>
                  <p class="mt-1 text-xs text-white/50">ADMIN</p>
                </div>

                <div class="p-2">
                  <RouterLink
                    to="/administracao"
                    class="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                    @click="isUserMenuOpen = false"
                  >
                    <span>Administracao</span>
                    <span
                      class="mdi mdi-cog-outline text-[18px] text-white/45"
                    ></span>
                  </RouterLink>

                  <button
                    type="button"
                    class="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-[#ffb4b4] transition hover:bg-white/10 hover:text-white"
                    @click="isUserMenuOpen = false"
                  >
                    <span>Sair</span>
                    <span
                      class="mdi mdi-logout text-[18px] text-[#ffb4b4]/80"
                    ></span>
                  </button>
                </div>
              </div>
            </transition>
          </div>

          <!-- mobile button -->
          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/10 transition hover:bg-white/15 md:hidden"
            @click="toggleMobileMenu"
          >
            <span
              :class="[
                'mdi text-[22px] transition-all duration-300',
                isMobileMenuOpen ? 'mdi-close rotate-90' : 'mdi-menu',
              ]"
            ></span>
          </button>
        </div>
      </div>

      <!-- mobile dropdown -->
      <transition name="mobile-menu">
        <div
          v-if="isMobileMenuOpen"
          class="absolute left-0 top-full z-40 w-full border-t border-white/10 bg-black/95 md:hidden"
        >
          <div class="px-4 py-3">
            <nav class="flex flex-col">
              <RouterLink
                to="/novo-cliente"
                class="flex items-center justify-between border-b border-white/10 py-4 text-[15px] font-medium text-white/85 transition hover:text-white"
                @click="isMobileMenuOpen = false"
              >
                <span>Novo cliente</span>
                <span
                  class="mdi mdi-chevron-right text-[18px] text-white/45"
                ></span>
              </RouterLink>

              <RouterLink
                to="/nova-os"
                class="flex items-center justify-between border-b border-white/10 py-4 text-[15px] font-medium text-white/85 transition hover:text-white"
                @click="isMobileMenuOpen = false"
              >
                <span>Nova O.S.</span>
                <span
                  class="mdi mdi-chevron-right text-[18px] text-white/45"
                ></span>
              </RouterLink>

              <RouterLink
                to="/listar-clientes"
                class="flex items-center justify-between border-b border-white/10 py-4 text-[15px] font-medium text-white/85 transition hover:text-white"
                @click="isMobileMenuOpen = false"
              >
                <span>Listar clientes</span>
                <span
                  class="mdi mdi-chevron-right text-[18px] text-white/45"
                ></span>
              </RouterLink>

              <RouterLink
                to="/listar-os"
                class="flex items-center justify-between border-b border-white/10 py-4 text-[15px] font-medium text-white/85 transition hover:text-white"
                @click="isMobileMenuOpen = false"
              >
                <span>Listar O.S.</span>
                <span
                  class="mdi mdi-chevron-right text-[18px] text-white/45"
                ></span>
              </RouterLink>

              <div class="mt-4 border-t border-white/25 pt-4">
                <RouterLink
                  to="/administração"
                  class="flex items-center justify-between py-4 text-[15px] font-medium text-white/75 transition hover:text-white"
                  @click="isMobileMenuOpen = false"
                >
                  <span>Administração</span>
                  <span
                    class="mdi mdi-cog-outline text-[18px] text-white/45"
                  ></span>
                </RouterLink>

                <button
                  type="button"
                  class="flex w-full items-center justify-between py-4 text-left text-[15px] font-medium text-[#ffb4b4] transition hover:text-white"
                  @click="isMobileMenuOpen = false"
                >
                  <span>Sair</span>
                  <span
                    class="mdi mdi-logout text-[18px] text-[#ffb4b4]/80"
                  ></span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </transition>
    </header>

    <main
      class="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
    >
      <!-- hero -->
      <section
        class="overflow-hidden rounded-[32px] border border-black/10 bg-gradient-to-br from-black via-[#111111] to-[#1a1a1a] text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
      >
        <div class="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div class="relative px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div
              class="absolute right-0 top-0 h-52 w-52 rounded-full bg-white/5 blur-3xl"
            ></div>

            <div class="relative">
              <h2
                class="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[42px]"
              >
                Olá, Gabriel, bem-vindo novamente.
              </h2>

              <p
                class="mt-4 max-w-xl text-sm leading-6 text-white/70 sm:text-base"
              >
                O sistema foi reformulado pensando em uma melhor usabilidade
                para você, com uma navegação mais simples, intuitiva e
                organizada. O que deseja fazer hoje?
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- section header -->
      <section class="mt-8 sm:mt-10">
        <div
          class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p class="text-xl font-medium text-slate-500">Navegação rápida</p>
          </div>
        </div>
      </section>

      <!-- cards -->
      <section
        class="mt-5 grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        <RouterLink
          to="/novo-cliente"
          class="group overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]"
        >
          <div
            class="border-b border-black/5 bg-black px-4 py-4 text-white sm:px-6 sm:py-5"
          >
            <div class="flex items-center justify-between gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 sm:h-14 sm:w-14"
              >
                <span
                  class="mdi mdi-account-plus-outline text-[24px] sm:text-[28px]"
                ></span>
              </div>
              <span
                class="mdi mdi-arrow-top-right text-[20px] text-white/50 sm:text-[22px]"
              ></span>
            </div>

            <h4 class="mt-4 text-base font-semibold sm:mt-5 sm:text-xl">
              Novo cliente
            </h4>
            <p
              class="mt-2 text-xs leading-5 text-white/65 sm:text-sm sm:leading-6"
            >
              Cadastre um novo cliente no sistema de forma rápida e organizada.
            </p>
          </div>
        </RouterLink>

        <RouterLink
          to="/nova-os"
          class="group overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]"
        >
          <div
            class="border-b border-black/5 bg-[#111111] px-4 py-4 text-white sm:px-6 sm:py-5"
          >
            <div class="flex items-center justify-between gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 sm:h-14 sm:w-14"
              >
                <span
                  class="mdi mdi-file-document-plus-outline text-[24px] sm:text-[28px]"
                ></span>
              </div>
              <span
                class="mdi mdi-arrow-top-right text-[20px] text-white/50 sm:text-[22px]"
              ></span>
            </div>

            <h4 class="mt-4 text-base font-semibold sm:mt-5 sm:text-xl">
              Nova O.S.
            </h4>
            <p
              class="mt-2 text-xs leading-5 text-white/65 sm:text-sm sm:leading-6"
            >
              Crie uma nova ordem de serviço com mais praticidade no fluxo.
            </p>
          </div>
        </RouterLink>
      </section>

      <!-- cards -->
      <section
        class="mt-5 grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        <RouterLink
          to="/listar-clientes"
          class="group overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]"
        >
          <div
            class="border-b border-black/5 bg-black px-4 py-4 text-white sm:px-6 sm:py-5"
          >
            <div class="flex items-center justify-between gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 sm:h-14 sm:w-14"
              >
                <span
                  class="mdi mdi-account-group-outline text-[24px] sm:text-[28px]"
                ></span>
              </div>
              <span
                class="mdi mdi-arrow-top-right text-[20px] text-white/50 sm:text-[22px]"
              ></span>
            </div>

            <h4 class="mt-4 text-base font-semibold sm:mt-5 sm:text-xl">
              Listar clientes
            </h4>
            <p
              class="mt-2 text-xs leading-5 text-white/65 sm:text-sm sm:leading-6"
            >
              Visualize e consulte os clientes já cadastrados no sistema.
            </p>
          </div>
        </RouterLink>

        <RouterLink
          to="/listar-os"
          class="group overflow-hidden rounded-[30px] border border-black/10 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.10)]"
        >
          <div
            class="border-b border-black/5 bg-[#111111] px-4 py-4 text-white sm:px-6 sm:py-5"
          >
            <div class="flex items-center justify-between gap-4">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 sm:h-14 sm:w-14"
              >
                <span
                  class="mdi mdi-format-list-bulleted-square text-[24px] sm:text-[28px]"
                ></span>
              </div>
              <span
                class="mdi mdi-arrow-top-right text-[20px] text-white/50 sm:text-[22px]"
              ></span>
            </div>

            <h4 class="mt-4 text-base font-semibold sm:mt-5 sm:text-xl">
              Listar O.S.
            </h4>
            <p
              class="mt-2 text-xs leading-5 text-white/65 sm:text-sm sm:leading-6"
            >
              Consulte e acompanhe as ordens de serviço cadastradas.
            </p>
          </div>
        </RouterLink>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isMobileMenuOpen = ref(false);
const isUserMenuOpen = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active,
.user-menu-enter-active,
.user-menu-leave-active {
  transition: all 0.24s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to,
.user-menu-enter-from,
.user-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>