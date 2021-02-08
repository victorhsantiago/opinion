<template>
  <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
    <h1 class="text-2xl font-pacifico text-white">
      opinion
    </h1>

    <div class="flex">
      <ul class="flex list-none gap-2">
        <li
          class="px-6 py-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
          @click="() => router.push({ name: 'Credentials' })"
        >
          Credenciais
        </li>
        <li
          class="px-6 py-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
          @click="() => router.push({ name: 'Feedbacks' })"
        >
          Feedbacks
        </li>
        <li
          class="px-6 py-2 font-bold bg-white rounded-full cursor-pointer text-brand-main
            focus:outline-none"
          @click="handleLogout"
        >
          {{ logoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useStore from '../../hooks/useStore'
import { clearCurrentUser } from '../../store/user'

export default {
  setup() {
    const router = useRouter()
    const { currentUser } = useStore('User')

    const logoutLabel = computed(() => {
      if (!currentUser.name) return '...'
      return `${currentUser.name} (sair)`
    })

    function handleLogout() {
      window.localStorage.removeItem('token')
      router.push({ name: 'Home' })
      clearCurrentUser()
    }

    return {
      handleLogout,
      logoutLabel,
      router,
    }
  },
}
</script>

<style>

</style>
