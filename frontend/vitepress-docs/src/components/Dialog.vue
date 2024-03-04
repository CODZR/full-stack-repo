<template>
  <div
    v-if="modelValue"
    class="co-overlay"
  >
    <div
      :class="`co-dialog ${isFullscreen ? 'is-fullscreen' : ''}`"
      aria-modal="true"
      role="dialog"
      aria-label="{{title}}"
    >
      <div class="co-dialog__header">
        <span class="co-dialog__title">{{ title }}</span>
        <button
          class="co-dialog__headerbtn"
          @click="closeDialog"
        >
          <SvgIcon
            class="close-svg"
            icon-name="shared-close"
          />
        </button>
      </div>
      <div class="co-dialog__body">
        <slot />
      </div>
      <div class="co-dialog__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  title: {
    type: String,
    default: '',
  },
  isFullscreen: {
    type: Boolean,
    default: false,
  }
});


const emit = defineEmits(['update:modelValue']);

const closeDialog = () => {
  emit('update:modelValue', false);
};

onMounted(() => {
  watchEffect(() => {
    if (props.modelValue) {
      document.body.classList.add('co-popup-parent--hidden');
    } else {
      document.body.classList.remove('co-popup-parent--hidden');
    }
  });

  // document.addEventListener('keydown', (e) => {
  //   if (e.key === 'Escape') {
  //     closeDialog();
  //   }
  // });
});
</script>

<style lang="sass">
.co-overlay
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 2000
  height: 100%
  background-color: rgba(0, 0, 0, .5)
  overflow: auto
  z-index: 10000
.co-dialog
  position: relative
  width: 70%
  margin: 15vh auto
  background-color: #fff
  // overflow: scroll
  // &::-webkit-scrollbar
  //   display: none
  //   width: 0
  &.is-fullscreen
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    margin: unset
  @media screen and (max-width: 769px)
    width: 90%
  .co-dialog__header
    display: flex
    justify-content: space-between
    align-items: center
    margin-right: 0
    margin-bottom: 0
    padding: 20px
    background-image: linear-gradient(-303deg,#00a4bd,#00afb2 56%,#00bda5)
    .co-dialog__title
      font-family: Avenir Next W02,Helvetica,Arial,sans-serif
      font-size: 20px
      font-weight: 600
      color: #fff
      -webkit-font-smoothing: antialiased
      -moz-osx-font-smoothing: grayscale
    .co-dialog__headerbtn
      position: relative
      padding: 0
      width: 16px
      height: 16px
      background: 0 0
      border: none
      outline: 0
      cursor: pointer
      fill: #909399
      &:hover
        fill: #fff
        &::after
          background: rgba(255,255,255,.2)
      &::after
        content: " "
        position: absolute
        left: 50%
        padding: 20px
        top: 50%
        border-radius: 100%
        background: rgba(255,255,255,0)
        transform: translate(-50%,-50%)
        transition: background .15s ease-out 0s
  // .co-dialog__body
  //   overflow: scroll
  .co-dialog__footer
    padding: 10px 20px 20px
    text-align: right

</style>
