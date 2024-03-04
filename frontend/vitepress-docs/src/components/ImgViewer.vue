<template>
  <div class="co-image-viewer__btn co-image-viewer__actions">
    <div class="co-image-viewer__actions__inner">
      <!-- <i class="co-image-viewer__actions__divider"></i> -->
      <i
        class="co-icon"
        @click="handleImgChange('prev')"
      >
        <svg-icon icon-name="img-action-prev" />
      </i>
      <i
        class="co-icon"
        @click="handleImgScale('narrow')"
      >
        <svg-icon icon-name="img-action-narrow" />
      </i>
      <i
        class="co-icon"
        @click="handleImgScale('enlarge')"
      >
        <svg-icon icon-name="img-action-enlarge" />
      </i>
      <i
        class="co-icon"
        @click="restore"
      >
        <svg-icon icon-name="img-action-restore" />
      </i>
      <i
        class="co-icon"
        @click="handleImgRotation('left')"
      >
        <svg-icon icon-name="img-action-rotate-left" />
      </i>
      <i
        class="co-icon"
        @click="handleImgRotation('right')"
      >
        <svg-icon icon-name="img-action-rotate-right" />
      </i>
      <i
        class="co-icon"
        @click="handleImgChange('next')"
      >
        <svg-icon icon-name="img-action-next" />
      </i>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['handleImgScale', 'handleImgRotation', 'handleImgChange']);

const handleImgChange = (type) => emit('handleImgChange', type);
const handleImgScale = (type) => emit('handleImgScale', type);
const handleImgRotation = (type) => emit('handleImgRotation', type);

const restore = () => {
  const img = document.querySelector('.co-overlay.preview-dialog img');
  img.className = 'lazy-img';
};
</script>

<style lang="sass" scoped>
.co-image-viewer__btn
  position: absolute
  z-index: 1
  display: flex
  align-items: center
  justify-content: center
  border-radius: 50%
  opacity: .8
  cursor: pointer
  box-sizing: border-box
  user-select: none
  -webkit-user-select: none
  -webkit-tap-highlight-color: rgba(0,0,0,0)
  -webkit-tap-highlight-color: transparent
.co-image-viewer__actions
  left: 50%
  bottom: -65px
  transform: translate(-50%)
  width: 282px
  height: 44px
  padding: 0 23px
  background-color: #606266
  border-color: #fff
  border-radius: 22px
  .co-image-viewer__actions__inner
    display: flex
    justify-content: space-around
    width: 100%
  .co-icon
    --color: #fff
    display: inline-flex
    justify-content: center
    align-items: center
    position: relative
    fill: currentColor
    color: var(--color)
    svg
      font-size: inherit
      width: 24px
      height: 24px
</style>
