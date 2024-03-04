<template>
  <header
    v-if="showHero"
    class="home-hero"
  >
    <figure
      v-if="frontmatter.heroImage"
      class="figure"
    >
      <svg-icon
        class="image"
        icon-name="website-logo"
        :alt="frontmatter.heroAlt"
      />
    </figure>

    <h1
      v-if="heroText"
      id="main-title"
      class="title"
    >
      {{ heroText }}
    </h1>
    <div
      v-if="tagline"
      class="tagline"
    >
      Health Website by 
      <lazy-img src="shared/author.png" />
    </div>
    <Link
      v-if="frontmatter.actionLink && frontmatter.actionText"
      :item="{ link: frontmatter.actionLink, text: frontmatter.actionText }"
      class="action"
    />

    <Link
      v-if="frontmatter.altActionLink && frontmatter.altActionText"
      :item="{
        link: frontmatter.altActionLink,
        text: frontmatter.altActionText
      }"
      class="action alt"
    />
  </header>
</template>

<script setup>
import Link from '@vcomp/Link.vue';
const { site, frontmatter } = useData();

const showHero = computed(() => {
  const { heroImage, heroText, tagline, actionLink, actionText } =
    frontmatter.value;
  return heroImage || heroText || tagline || (actionLink && actionText);
});

const heroText = computed(() => frontmatter.value.heroText || site.value.title);
const tagline = computed(
  () => frontmatter.value.tagline || site.value.description
);
</script>


<style lang="sass" scoped>
.home-hero
  margin: 2.5rem 0 2.75rem
  padding: 0 1.5rem
  text-align: center


@media (min-width: 420px)
  .home-hero
    margin: 3.5rem 0


@media (min-width: 720px)
  .home-hero
    margin: 4rem 0 4.25rem
  


.figure
  padding: 0 1.5rem


.image
  display: block
  margin: 0 auto
  width: auto
  max-width: 100%
  max-height: 280px


.title
  margin-top: 1.5rem
  font-size: 2rem


@media (min-width: 420px)
  .title
    font-size: 3rem
  


@media (min-width: 720px)
  .title
    margin-top: 2rem
  

.tagline
  display: flex
  justify-content: center
  align-items: center
  height: 34px
  margin: 0
  margin-top: 0.25rem
  line-height: 1.3
  font-size: 1.2rem
  color: #476582
  .lazy-img
    height: 34px
    margin-left: 8px


@media (min-width: 420px)
  .tagline
    line-height: 1.2
    font-size: 1.6rem
  


.action
  margin-top: 1.5rem
  display: inline-block


.action.alt
  margin-left: 1.5rem


@media (min-width: 420px)
  .action
    margin-top: 2rem
    display: inline-block
  


.action :deep(.item)
  display: inline-block
  border-radius: 6px
  padding: 0 20px
  line-height: 44px
  font-size: 1rem
  font-weight: 500
  color: #fff
  background-color: #3eaf7c
  border: 2px solid #3eaf7c
  transition: background-color 0.1s ease


.action.alt :deep(.item)
  background-color: #fff
  color: #3eaf7c


.action :deep(.item:hover)
  text-decoration: none
  color: #fff
  background-color: #4abf8a


@media (min-width: 420px)
  .action :deep(.item)
    padding: 0 24px
    line-height: 52px
    font-size: 1.2rem
    font-weight: 500
  

</style>
