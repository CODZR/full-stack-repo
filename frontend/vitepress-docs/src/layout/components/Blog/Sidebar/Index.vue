<template>
  <aside
    class="sidebar"
  > 
    <div
      id="toc-heading"
      class="toc-heading"
      @click="toggleActive($event.currentTarget)"
    >
      Category
    </div>
    <div
      id="toc-body"
      class="toc-body"
    >
      <ul class="list">
        <template
          v-for="(item, idx) in h2List"
          :key="item"
        >
          <div
            @click.prevent="moveToTarget(item)"
          >
            <li
              class="list-item"
              @click="hiddenTocBody"
            >
              <strong>{{ idx+1 }}. {{ item }}</strong>
            </li>
          </div>
        </template>
      </ul>
    </div>
    
    <slot name="sidebar-top" />
    <slot name="sidebar-bottom" />
  </aside>
</template>

<script setup>
const h2List = ref(null);
// const tocBodyHeight = computed(() => window.innerHeight - 66 - 39);

const moveToTarget = (h2Id) => {
  const target = document.getElementById(h2Id);
  target.scrollIntoView({
    block: 'center',
  });
};

const toggleActive = (target) => {
  target.classList.toggle('is-active');
};

const forEach = (target, fn) => Array.prototype.forEach.call(target, fn);

const initH2TitleList = () => {
  const arr = [];
  forEach(document.querySelectorAll('h2'), item => {
    item.id && arr.push(item.id);
  });
  h2List.value = arr;
};

const hiddenTocBody = () => {
  const tocHeading = document.getElementById('toc-heading');
  tocHeading.classList.remove('is-active');
};

const setTocBodyHeight = () => {
  if (window.innerWidth < 700) {
    const tocBody = document.getElementById('toc-body');
    tocBody.style.height = `calc(${window.innerHeight - 66 - 39}px)`;
  }
};
onMounted(() => {
  setTocBodyHeight();

  const route = useRoute();
  
  watchEffect(() => {
    if (route.path) {
      hiddenTocBody();
      nextTick(() => {
        initH2TitleList();
      });
    }
  });
});
</script>


<style lang="sass" scoped>
@import '@css/base'
.sidebar
  position: sticky
  top: $navbar-height
  bottom: 0
  left: 0
  z-index: var(--z-index-sidebar)
  max-width: 56rem
  max-height: 500px
  border: 1px solid var(--c-divider)
  background-color: #fff
  transition: transform 0.25s ease
  +widescreen
    max-width: 60rem
    margin: 0 auto
  ul, li
    padding: 0
    list-style: none
  li
    margin-bottom: 1rem

  .toc-heading
    position: relative
    padding: 8px 16px
    &::after
      content: " "
      position: absolute
      top: 50%
      display: block
      width: 0.425em
      height: 0.425em
      margin-top: -0.4em
      right: 18px
      transform: rotate(-45deg)
      transform-origin: center
      border: 3px solid transparent
      border-top: 0
      border-radius: 2px
      border-right: 0
      border-color: #111
    &.is-active
      &::after
        transform: rotate(135deg)
      + .toc-body
        display: block
  .toc-body
    display: none
    overflow: scroll
    position: relative
    top: 0
    width: 100%
    border: 1px solid #E6E6E6
    background: #fff
    .list
      margin: 0
      padding: .25rem 0
    .list-item
      list-style: none
      padding: .5rem 1.25rem
      cursor: pointer
      &:hover
        background-color: #f5f7fa


@media (min-width: 720px)
  .sidebar
    transform: translateX(0)
  
  
.sidebar.open
  transform: translateX(0)
</style>
