<template>
  <home-header
    @create-account="handleAccountCreate"
    @login="handleLogin"
  />
  <home-contact />
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-gray-800">opinion © {{ currentYear }}</p>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HomeContact from './HomeContact.vue'
import HomeHeader from './HomeHeader.vue'
import useModal from '../../hooks/useModal'

export default {
  components: { HomeContact, HomeHeader },
  setup() {
    const router = useRouter()
    const modal = useModal()
    const currentYear = computed(() => {
      const date = new Date()
      return date.getFullYear()
    })

    onMounted(() => {
      const token = window.localStorage.getItem('token')
      if (token) router.push({ name: 'Credentials' })
    })

    function handleLogin() {
      modal.open({
        component: 'ModalLogin',
      })
    }

    function handleAccountCreate() {
      modal.open({
        component: 'ModalCreateAccount',
      })
    }

    return {
      currentYear,
      handleLogin,
      handleAccountCreate,
    }
  },
}
</script>
