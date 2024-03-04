<template>
  <lazy-img
    :src="src"
    :alt="alt"
    @click="previewImg($event.currentTarget)"
  />
  <PreviewDialog
    v-model="previewDialogVisible"
    class="preview-dialog"
  >
    <lazy-img
      :img-style="`transoform: scale(${imgScale}) rotate(${imgRotation}deg);`"
      :src="src"
      :alt="alt"
      @click="previewImg($event.currentTarget)"
    />
    <ImgViewer
      @handle-img-change="handleImgChange"
      @handle-img-scale="handleImgScale"
      @handle-img-rotation="handleImgRotation"
    />
  </PreviewDialog>
</template>

<script setup>
import PreviewDialog from '@vcomp/Dialog.vue';
import ImgViewer from '@vcomp/ImgViewer.vue';
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: ''
  },
});

const previewDialogVisible = ref(false);
const imgScale = ref(0);
const imgRotation = ref(0);
// const imgStyle = computed(() => `transoform: scale(${imgScale.value}) rotate(${imgRotation.value}deg)`);

let Hammer;
onMounted(async () => {
  const HammerJs = await import('hammerjs');
  Hammer = HammerJs.default;
});

const setupTouchEvent = (ins) => {
  ins.on('swipeleft', () => handleImgChange('next'));
  ins.on('swiperight', () => handleImgChange('prev'));
  // ins.on('pinchin', () => handleImgScale('narrow'));
  // ins.on('pinchout', () => handleImgScale('enlarge'));
  // ins.on('rotate', (ev) => {
  //   console.log('ev: ', ev);
  // });
};

const previewImg = () => {
  previewDialogVisible.value = true;

  if (!Hammer) return;
  nextTick(() => {
    const img = document.querySelector('.co-overlay.preview-dialog img');
    const ins = new Hammer(img);
    setupTouchEvent(ins);
  });
};

// TODO: vue3+vitepress会过滤img的style导致动态修改style失败，先通过class实现
const resetImg = () => {
  const img = document.querySelector('.co-overlay.preview-dialog img');
  img.className = 'lazy-img';
  return img;
};

const handleImgScale = (type) => {
  const scaleLevel = imgScale.value;
  let ratio = 0;
  if (type === 'narrow') {
    ratio = scaleLevel === -2 ? 0 : -1;
  } else {
    ratio = scaleLevel === 2 ? 0 : 1;
  }

  imgScale.value += ratio;
  nextTick(() => {
    const className = `is-scale-${imgScale.value}-rotate-${imgRotation.value}`;
    const img = resetImg();
    img.classList.add(className);
  });
};

const handleImgRotation = (type) => {
  const rotation = imgRotation.value;
  let ratio = 0;
  if (type === 'left') {
    ratio = rotation === 0 ? 270 : -90;
  } else {
    ratio = rotation === 270 ? -270 : 90;
  }

  imgRotation.value += ratio;
  nextTick(() => {
    const className = `is-scale-${imgScale.value}-rotate-${imgRotation.value}`;
    const img = resetImg();
    img.classList.add(className);
  });
};

const handleImgChange = (type) => {
  const dialog = document.getElementsByClassName('preview-dialog')[0];
  const closeBtn = dialog.querySelector('.co-dialog__headerbtn');
  const img = type === 'prev'
    ? dialog.previousElementSibling.previousElementSibling || dialog.parentElement.lastElementChild
    : dialog.nextElementSibling || dialog.parentElement.firstElementChild;
    
  closeBtn && closeBtn.click();
  img && img.click();
};

</script>

<style lang="sass">
@import '@css/base'
.image-wrapper
  > .lazy-img
    max-width: 90%
    margin-right: .5rem
    padding: .5rem
    border: 1px solid
    cursor: pointer
    user-select: none
    -webkit-tap-highlight-color: rgba(0,0,0,0)
    -webkit-tap-highlight-color: transparent

.preview-dialog .co-dialog
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: auto
  margin: 0 !important
  +until-widescreen
    .co-dialog__header .co-dialog__headerbtn
      fill: #fff !important
      &::after
        background: rgba(255, 255, 255, 0.2)
  .lazy-img
    +mobile
      width: calc(85vh * 3/4)
      max-width: calc(100vw - 3rem)
      max-height: calc((100vw - 3rem) * 4/3)
    +tablet
      height: calc(80vh - 56px)
      max-width: calc((80vh - 56px) * 3/4)
  .co-dialog__footer
    display: none
</style>
