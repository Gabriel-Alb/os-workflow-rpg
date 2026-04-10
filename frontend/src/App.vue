<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HomeHeader from '@/components/layouts/HomeHeader.vue'

const route = useRoute()

const showHeader = computed(() => route.name !== 'login')
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <HomeHeader v-if="showHeader" />
    <RouterView />
  </div>
</template>