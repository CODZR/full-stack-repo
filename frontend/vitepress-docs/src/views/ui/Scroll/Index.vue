<template>
  <div class="page">
    <div class="title is-section-title">
      Scroll Animation
    </div>
    <div class="switch-wrapper">
      Auto Scroll
      <co-switch
        v-model="autoScroll"
        open-text="True"
        close-text="False"
        size="big"
      />
    </div>
    <section
      id="scroll-wrapper"
      class="section is-scroll-video-section"
    >
      <canvas
        id="scroll-video"
        ref="scroll-canvas"
      ></canvas>
    </section>
  </div>
</template>

<script setup>
import CoSwitch from '@vcomp/ui/Switch.vue';
import { Message } from '@vcomp/ui';


const autoScroll = ref(false);
// const { proxy } = getCurrentInstance();

onMounted(async () => {
  const { gsap } = await import('gsap');
  const { ScrollToPlugin } = await import('gsap/ScrollToPlugin');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');

  const scrollJs = await import('@/utils/scroll');
  const { enableScroll, disableScroll } = scrollJs;

  gsap.registerPlugin(ScrollToPlugin);
  gsap.registerPlugin(ScrollTrigger);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (windowWidth < 1177) {
    Message.warn('还未优化，不建议Auto Scroll');
  }

  const directory = windowWidth > 1176
    ? '/img/zy/zy-'
    : '/img/ball/ball-';
  const frameCount = windowWidth > 1176 ? 300 : 169;
  const imgWidth = windowWidth;
  const imgHeight = windowWidth > 1176 ? windowHeight : windowWidth * 0.5625;

  const currentFrame = (index) =>
    `${directory}${index.toString().padStart(3, '0')}.jpeg`;


  const canvas = document.getElementById('scroll-video');
  const context = canvas.getContext('2d');
  let isMoving = false;

  const imgArr = [];

 
  const preloadImages = () => {
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      imgArr[i] = img;
    }
  };
  const calImgParams = () => {
    return [0, 0, imgWidth, imgHeight];
  };

  const resetCanvasSize = () => {
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    context.fillRect(0, 0, imgWidth, imgHeight);
  };

  const drawFirstImg = () => {
    const img = new Image();
    img.src = currentFrame(1);
    img.onload = () => {
      context.drawImage(img, ...calImgParams());
    };
  };

  const init = () => {
    resetCanvasSize();
    drawFirstImg();
    preloadImages();
  };
  init();

  const updateCanvas = (frameIdx) => {
    requestAnimationFrame(() => {
      const img = imgArr[frameIdx] ? imgArr[frameIdx] : imgArr[frameIdx + 1];
      context.drawImage(img, ...calImgParams()); // drawImage(image, dx, dy, dw, dh)
    });
  };

  let curIndex = null;
  const updateAnimation = (frameIndex) => {
    if (frameIndex !== curIndex) {
      updateCanvas(frameIndex);
      curIndex = frameIndex;
    }
  };

  const setScrollVideo = () => {
    const tl = gsap.timeline();
    const startPosition = windowWidth > 1176 ? '+=66px' : '-=60%';
    tl.to(canvas, {
      scrollTrigger: {
        trigger: '#scroll-wrapper',
        start: startPosition, // position of trigger meets the scroller position
        end: '+=1900%',
        // markers: true,
        pin: true,
        // pinSpacing: false,
        scrub: true,
        toggleClass: 'pined',
        onUpdate: (self) => {
          autoScroll.value && moveToTarget(self);

          const frameIndex = parseInt(self.progress * frameCount);
          updateAnimation(frameIndex);
        },
      },
    });
  };
  setScrollVideo();

  const POINT0 = 0,
    POINT1 = 0.08,
    POINT2 = 0.25,
    POINT3 = 0.45,
    POINT4 = 0.65,
    POINT5 = 0.82,
    POINT6 = 0.98;
  const percentDoubleLinkList = {
    [POINT0]: {
      prev: null,
      value: POINT0,
      next: POINT1,
    },
    [POINT1]: {
      prev: POINT0,
      value: POINT1,
      next: POINT2,
    },
    [POINT2]: {
      prev: POINT1,
      value: POINT2,
      next: POINT3,
    },
    [POINT3]: {
      prev: POINT2,
      value: POINT3,
      next: POINT4,
    },
    [POINT4]: {
      prev: POINT3,
      value: POINT4,
      next: POINT5,
    },
    [POINT5]: {
      prev: POINT4,
      value: POINT5,
      next: POINT6,
    },
    [POINT6]: {
      prev: POINT5,
      value: POINT6,
      next: null,
    },
  };
    // 在±0.03的范围内
    // function belongToRange (percent, POINT) {
    //   const FLUCTUATE = 0.03;
    //   return (POINT - FLUCTUATE < percent) && (percent < POINT + FLUCTUATE)
    // }
  const getFixedPoint = (percent) => {
    let fixedPoint = -1;
    if (percent < POINT1) {
      fixedPoint = POINT0;
    } else if (percent < POINT2) {
      fixedPoint = POINT1;
    } else if (percent < POINT3) {
      fixedPoint = POINT2;
    } else if (percent < POINT4) {
      fixedPoint = POINT3;
    } else if (percent < POINT5) {
      fixedPoint = POINT4;
    } else if (percent < POINT6) {
      fixedPoint = POINT5;
    }
    return fixedPoint;
  };
  const parseInt = (value) => {
    return ~~value;
  };
  const moveToTarget = (self) =>  {
    if (isMoving) {
      disableScroll(isMoving);
      return;
    }

    const direction = !~self.direction ? 'up' : 'down';
    if (direction === 'down') {
      const percent = self.progress;

      const fixedPoint = getFixedPoint(percent);
      if (fixedPoint >= 0) {
        const start = self.start;
        const diff = self.end - start;

        const targetPercent = percentDoubleLinkList[fixedPoint].next;
        const targetPos = start + targetPercent * diff;
        const times = parseInt((targetPercent - percent) * 200) + 1;
        scrollIntoView(targetPos, 'smooth', times);
      }
    }
  };

  // 实现滚动条平滑滚动的方法
  let moveCount = 0; // 确保一次只移动一个section
  const scrollIntoView = (targetPos, behavior = 'smooth', times) => {
    if (isMoving) {
      disableScroll(isMoving);
      return;
    }

    if (++moveCount <= 3) return;

    isMoving = true;
    moveCount = 0;

    // const target = document.querySelector(selector);

    const distance = targetPos - window.scrollY;

    const step = distance / times;

    if (behavior === 'smooth') {
      let timesRun = 0;
      const interval = setInterval(function () {
        timesRun += 1;
        const currentY = window.scrollY;
        window.scrollTo(0, currentY + step);

        if (timesRun === times) {
          clearInterval(interval);
          enableScroll();
          isMoving = false;
        }

        if (currentY > targetPos) {
          // 用户快速划到targetPos之后
          clearInterval(interval);
          enableScroll();
          window.scrollTo(0, targetPos);
          isMoving = false;
        }
      }, 80);
    }
  };
  
});


</script>

<style lang="sass" scoped>
.page
  padding: 64px 0
  .title.is-section-title
    text-align: center
  .switch-wrapper
    margin-top: 2rem
    text-align: center

.is-scroll-video-section
  #scroll-video
    margin-top: 66px
</style>
