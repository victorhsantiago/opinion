<template>
  <header class="header">
    <div class="header-group">
      <div class="flex items-center justify-between py-10">
        <div class="w-28 lg:w-36">
          <span class="font-pacifico text-white text-4xl">opinion</span>
        </div>
        <div class="flex">
          <button
            class="px-6 py-2 text-white rounded-full focus:outline-none font-bold"
            @click="() => emit('createAccount')"
          >
            Crie uma conta
          </button>
          <button
            class="px-6 py-2 bg-white rounded-full text-brand-main focus:outline-none font-bold"
            @click="() => emit('login')"
          >
            Entrar
          </button>
        </div>
      </div>

      <div class="flex flex-col mt-28">
        <h1 class="text-5xl text-white font-black">
          Tenha um feedback. <br>
          E faça seus clientes mais <br class="hidden lg:inline-block">
          felizes!
        </h1>
        <p class="text-white mt-5">
          Receba ideias, reclamações e feedbacks com um <br class="hidden lg:inline-block">
          simples widget na página.
        </p>
        <div>
          <button
            class="
              px-6
              py-2
              mt-10
              bg-white
              rounded-full
              text-brand-main
              focus:outline-none
            "
          >
            Crie uma conta grátis
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  setup(_, { emit }) {
    return { emit }
  },
}
</script>

<style lang="postcss" scoped>
.header {
  @apply bg-brand-main w-full flex justify-center;
  height: 700px;
}

.header-group {
  @apply flex flex-col w-4/5 max-w-6xl;
}
@media (min-width: 640px) {
  .header-group{
    background-image: url('../../assets/images/blue-balloons.png');
    background-size: 628px;
    background-position: 90% 100%;
    background-repeat: no-repeat;
  }
}

</style>
