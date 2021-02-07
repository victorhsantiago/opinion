<template>
<div class="flex justify-between">
  <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>
  <button
    class="text-4xl text-gray-600 focus:outline-none"
    @click="close"
  >
    &times;
  </button>
</div>

<div class="mt-16">
  <form class="flex flex-col gap-8" @submit.prevent="handleSubmit">
    <label for="email" class="text-lg font-medium text-gray-800">E-mail
      <input
        id="email"
        name="email"
        type="email"
        class="block w-full px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded"
        :class="{ 'border-brand-danger': !!state.email.errorMessage }"
        placeholder="seu@email.com"
        v-model="state.email.value"
      />
      <span v-if="!!state.email.errorMessage" class="block font-medium text-brand-danger">
        {{ state.email.errorMessage }}
      </span>
    </label>

    <label for="password" class="text-lg font-medium text-gray-800">Senha
      <input
        id="password"
        name="password"
        type="password"
        class="block w-full px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded"
        :class="{ 'border-brand-danger': !!state.password.errorMessage }"
        placeholder="********"
        v-model="state.password.value"
      />
      <span v-if="!!state.password.errorMessage" class="block font-medium text-brand-danger">
        {{ state.password.errorMessage }}
      </span>
    </label>

    <button
      type="submit"
      class="px-8
        py-3
        flex
        justify-center
        text-2xl
        font-bold
        text-white
        rounded-full
        bg-brand-main
        focus:outline-none"
      :class="{ 'opacity-50': state.isLoading}"
      :disabled="state.isLoading"
    >
      <base-icon v-if="state.isLoading" name="loading" class="animate-spin" />
      <span v-else>Entrar</span>
    </button>
  </form>
</div>
</template>

<script>
import { reactive } from 'vue'
import { useField } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import useModal from '../../hooks/useModal'
import BaseIcon from '../BaseIcon/index.vue'
import { validateEmptyAndEmail, validateEmptyAndLength3 } from '../../utils/validators'
import services from '../../services'

export default {
  components: { BaseIcon },
  setup() {
    const router = useRouter()
    const modal = useModal()
    const toast = useToast()

    const errorToastMessage = {
      400: 'Ocorreu um erro ao fazer o login',
      401: 'E-mail/senha invalidos',
      404: 'E-mail/senha invalidos',
      500: 'Ops... Aconteceu um erro inesperado',
    }

    const { value: emailValue, errorMessage: emailErrorMessage } = useField('email', validateEmptyAndEmail)
    const { value: passwordValue, errorMessage: passwordErrorMessage } = useField('password', validateEmptyAndLength3)
    const state = reactive({
      isLoading: false,
      hasError: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage,
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage,
      },
    })

    async function handleSubmit() {
      try {
        state.isLoading = true
        const { data } = await services.auth.login({
          email: state.email.value,
          password: state.password.value,
        })

        window.localStorage.setItem('token', data.token)
        router.push({ name: 'Feedbacks' })
        state.isLoading = false
        modal.close()
      } catch (error) {
        state.isLoading = false
        state.hasError = !!error

        toast.error(errorToastMessage[error.response.status])
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
    }
  },
}
</script>
