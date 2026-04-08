<template>
  <div class="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4">
    <!-- Card -->
    <div class="w-full max-w-sm">
      <!-- Logo / marca -->
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-black shadow-lg"
        >
          <span class="text-lg font-bold text-white">Az</span>
        </div>
        <h1 class="text-2xl font-semibold text-slate-900">Azteca OS</h1>
        <p class="mt-1 text-sm text-slate-500">Faça login para continuar</p>
      </div>

      <!-- Formulário -->
      <form
        class="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5"
        @submit.prevent="handleLogin"
      >
        <!-- Erro -->
        <transition name="fade">
          <div
            v-if="authStore.erro"
            class="mb-5 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
          >
            <span class="mdi mdi-alert-circle-outline text-base"></span>
            {{ authStore.erro }}
          </div>
        </transition>

        <!-- Login -->
        <div class="mb-4">
          <label class="mb-1.5 block text-sm font-medium text-slate-700" for="login">
            Login
          </label>
          <input
            id="login"
            v-model="form.login"
            type="text"
            autocomplete="username"
            placeholder="seu login"
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10"
            :disabled="authStore.loading"
          />
        </div>

        <!-- Senha -->
        <div class="mb-6">
          <label class="mb-1.5 block text-sm font-medium text-slate-700" for="senha">
            Senha
          </label>
          <div class="relative">
            <input
              id="senha"
              v-model="form.senha"
              :type="mostrarSenha ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="••••••"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/10"
              :disabled="authStore.loading"
            />
            <button
              type="button"
              tabindex="-1"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
          class="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-60"
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
