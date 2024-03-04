<template>
  <img
    ref="lazyImg"
    class="lazy-img"
    :data-src="getAssetsImg(src)"
    :alt="alt || src"
  />
</template>

<script setup>
import { imgModule } from '@/data/global';

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

// const getAssetsFile = (url) => {
//   return new URL(`../../src/assets/img/${url}`, import.meta.url).href;
// };
const getAssetsImg = (url) => {
  const path = `../assets/img/${url}`; // imgModule的相对路径，不是LazyImg本身
  // const modules = import.meta.globEager('../assets/img/**');
  return imgModule[path]?.default;
};

onMounted(() => {
  const { proxy } = getCurrentInstance();
  const lazyImg = proxy.$refs.lazyImg;
  // 图片懒加载
  const lazyImageObserver = new IntersectionObserver(function (
    entries,
  ) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src; // 替换 src URL
        lazyImage.dataset.src = '';
        lazyImageObserver.unobserve(lazyImage); // 解除观察
      }
    });
  });
  lazyImageObserver.observe(lazyImg);
});
</script>

<style lang="sass" scoped>
@for $i from -2 through 2
  .is-scale-#{$i}-rotate-0
    transform: scale(#{$i * 0.3 + 1}) rotate(0)
  .is-scale-#{$i}-rotate-90
    transform: scale(#{$i * 0.3 + 1}) rotate(90deg)
  .is-scale-#{$i}-rotate-180
    transform: scale(#{$i * 0.3 + 1}) rotate(180deg)
  .is-scale-#{$i}-rotate-270
    transform: scale(#{$i * 0.3 + 1}) rotate(270deg)
</style>
