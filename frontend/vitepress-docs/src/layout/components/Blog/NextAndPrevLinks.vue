<script setup>
import { useNextAndPrevLinks } from '@/composables/nextAndPrevLinks';

const { hasLinks, prev, next } = useNextAndPrevLinks();
</script>

<template>
  <div
    v-if="hasLinks"
    class="next-and-prev-link"
  >
    <div class="container">
      <div class="prev">
        <a
          v-if="prev"
          class="link"
          :href="withBase(prev.link)"
        >
          <svg-icon
            class="icon icon-prev"
            icon-name="blog-arrowLeft"
            alt="arrow-left icon"
          />
          <span class="text">{{ prev.text }}</span>
        </a>
      </div>
      <div class="next">
        <a
          v-if="next"
          class="link"
          :href="withBase(next.link)"
        >
          <span class="text">{{ next.text }}</span>
          <svg-icon
            class="icon icon-next"
            icon-name="blog-arrowLeft"
            alt="arrow-left icon"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.next-and-prev-link {
  padding-top: 1rem;
}

.container {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--c-divider);
  padding-top: 1rem;
}

.prev,
.next {
  display: flex;
  flex-shrink: 0;
  width: 50%;
}

.prev {
  justify-content: flex-start;
  padding-right: 12px;
}

.next {
  justify-content: flex-end;
  padding-left: 12px;
}

.link {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  font-size: 1rem;
  font-weight: 500;
}

.text {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.icon {
  display: block;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  fill: #2c3e50;
  transform: translateY(1px);
}

.icon-prev {
  margin-right: 8px;
}
.icon-next {
  margin-left: 8px;
}
</style>
