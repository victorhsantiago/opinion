<template>
  <teleport to="body">
    <div
      v-if="state.isActive"
      class="modal"
      @click="handleModalToggle({ status: false })"
    >
      <div class="fixed mx-10" :class="state.width" @click.stop>
        <div class="modal-wrapper animate__animated animate__fadeInDown animate__faster">
          <div class="flex flex-col px-12 py-10 bg-white">
            <component :is="state.component" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import {
  defineAsyncComponent,
  onBeforeMount,
  onMounted,
  reactive,
} from 'vue'
import useModal from '../../hooks/useModal'

const ModalCreateAccount = defineAsyncComponent(() => import('../ModalCreateAccount'))
const ModalLogin = defineAsyncComponent(() => import('../ModalLogin'))

export default {
  components: {
    ModalCreateAccount,
    ModalLogin,
  },
  setup() {
    const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3'
    const modal = useModal()

    const state = reactive({
      isActive: false,
      component: {},
      props: {},
      width: DEFAULT_WIDTH,
    })

    function handleModalToggle({
      status,
      component,
      props,
      width,
    }) {
      if (status) {
        state.component = component
        state.props = props
        state.width = width ?? DEFAULT_WIDTH
      } else {
        state.component = {}
        state.props = {}
        state.width = DEFAULT_WIDTH
      }

      state.isActive = status
    }

    onMounted(() => {
      modal.listen(handleModalToggle)
    })

    onBeforeMount(() => {
      modal.off(handleModalToggle)
    })

    return {
      state,
      handleModalToggle,
    }
  },
}
</script>

<style lang="postcss" scoped>
.modal {
  @apply fixed;
  @apply top-0;
  @apply left-0;
  @apply z-50;
  @apply flex;
  @apply items-center;
  @apply justify-center;
  @apply w-full;
  @apply h-full;
  @apply bg-black;
  @apply bg-opacity-50;
}

.modal-wrapper {
  @apply flex;
  @apply flex-col;
  @apply overflow-hidden;
  @apply bg-white;
  @apply rounded-lg;
}
</style>
