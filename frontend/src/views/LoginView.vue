<template>
  <div class="min-h-screen bg-[#f5f5f7]">
    <div class="grid min-h-screen lg:grid-cols-2">
      <!-- Lado esquerdo -->
      <section
        class="relative hidden overflow-hidden bg-black text-white lg:flex lg:items-center lg:justify-center"
      >
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]"></div>

        <div class="relative z-10 flex flex-col items-center justify-center px-12 text-center">
          <h1
            class="text-6xl font-black tracking-[-0.04em] text-white xl:text-7xl 2xl:text-8xl"
            style="font-family: Inter, ui-sans-serif, system-ui, sans-serif"
          >
            Workflow
          </h1>

          <p class="mt-5 max-w-md text-base leading-7 text-white/70 xl:text-lg">
            Gerencie processos, acompanhe atividades e mantenha o fluxo de trabalho
            da sua operação de forma mais simples, organizada e eficiente.
          </p>
        </div>
      </section>

      <!-- Lado direito -->
      <section
        class="flex items-center justify-center px-6 py-10 sm:px-8 lg:rounded-l-[40px] lg:bg-[#f5f5f7] lg:px-12 xl:px-20"
      >
        <div class="w-full max-w-md">
          <!-- Cabeçalho mobile -->
          <div class="mb-10 text-center lg:hidden">
            <h1 class="text-3xl font-black tracking-[-0.04em] text-slate-900">Workflow</h1>
            <p class="mt-2 text-sm text-slate-500">Faça login para continuar</p>
          </div>

          <div class="mb-8">
            <h2 class="text-3xl font-semibold tracking-tight text-slate-900">
              Entrar no sistema
            </h2>
            <p class="mt-2 text-sm leading-6 text-slate-500">
              Informe seu login e sua senha para acessar o Workflow.
            </p>
          </div>

          <form @submit.prevent="handleLogin">
            <!-- Erro -->
            <transition name="fade">
              <div
                v-if="authStore.erro"
                class="mb-5 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-[0_10px_25px_rgba(239,68,68,0.08)]"
              >
                <span class="mdi mdi-alert-circle-outline mt-0.5 text-base"></span>
                <span>{{ authStore.erro }}</span>
              </div>
            </transition>

            <!-- Login -->
            <div class="mb-5">
              <label class="mb-1.5 block text-sm font-medium text-slate-700" for="login">
                Login
              </label>
              <input
                id="login"
                v-model="form.login"
                type="text"
                autocomplete="username"
                placeholder="Digite seu login"
                class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-[0_8px_24px_rgba(15,23,42,0.06)] outline-none transition placeholder:text-slate-400 focus:border-black focus:shadow-[0_12px_30px_rgba(15,23,42,0.10)] focus:ring-4 focus:ring-black/5"
                :disabled="authStore.loading"
              />
            </div>

            <!-- Senha -->
            <div class="mb-7">
              <label class="mb-1.5 block text-sm font-medium text-slate-700" for="senha">
                Senha
              </label>
              <div class="relative">
                <input
                  id="senha"
                  v-model="form.senha"
                  :type="mostrarSenha ? 'text' : 'password'"
                  autocomplete="current-password"
                  placeholder="Digite sua senha"
                  class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-sm text-slate-900 shadow-[0_8px_24px_rgba(15,23,42,0.06)] outline-none transition placeholder:text-slate-400 focus:border-black focus:shadow-[0_12px_30px_rgba(15,23,42,0.10)] focus:ring-4 focus:ring-black/5"
                  :disabled="authStore.loading"
                />
                <button
                  type="button"
                  tabindex="-1"
                  class="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  @click="mostrarSenha = !mostrarSenha"
                >
                  <span
                    class="mdi text-xl"
                    :class="mostrarSenha ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  ></span>
                </button>
              </div>
            </div>

            <!-- Botão -->
            <button
              type="submit"
              class="flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-4 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition hover:bg-zinc-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="authStore.loading || !form.login || !form.senha"
            >
              <span
                v-if="authStore.loading"
                class="mdi mdi-loading animate-spin text-base"
              ></span>
              {{ authStore.loading ? 'Entrando...' : 'Entrar' }}
            </button>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ login: '', senha: '' })
const mostrarSenha = ref(false)

async function handleLogin() {
  const ok = await authStore.login(form.value.login, form.value.senha)

  if (ok) {
    router.push({ name: 'home' })
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>