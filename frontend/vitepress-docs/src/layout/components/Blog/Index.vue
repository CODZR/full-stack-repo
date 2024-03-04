<template>
  <slot name="custom-page" />
  <main class="blog">
    <BlogSiderbar />
    <div class="container">
      <slot name="top" />

      <Content />
      <BlogFooter />
      <NextAndPrevLinks />

      <slot name="bottom" />
    </div>
  </main>
</template>

<script setup>
import BlogSiderbar from '../Blog/Sidebar/Index.vue';
import BlogFooter from './Footer.vue';
import NextAndPrevLinks from './NextAndPrevLinks.vue';
</script>

<style lang="sass">
@import '@css/base'
.blog 
  li
    list-style: disc

@media (min-width: 720px) 
  .blog 
    margin-left: 16.4rem
  


@media (min-width: 960px) 
  .blog 
    margin-left: 0rem


.container
  margin: 0 auto
  padding: 0 1.5rem 4rem
  max-width: 56rem
  +widescreen
    display: flex
    max-width: 60rem


.content
  padding-bottom: 1.5rem


@media (max-width: 420px)
  .content
    /* fix carbon ads display */
    clear: both

*,
::before,
::after
  box-sizing: border-box


html .blog
  line-height: 1.4
  font-size: 16px
  -webkit-text-size-adjust: 100%


body .blog
  margin: 0
  width: 100%
  min-width: 320px
  min-height: 100vh
  line-height: 1.4
  font-family: var(--font-family-base)
  font-size: 16px
  font-weight: 400
  color: var(--c-text)
  background-color: var(--c-bg)
  direction: ltr
  font-synthesis: none
  text-rendering: optimizeLegibility
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale


main
  display: block

.blog
  h1,
  h2,
  h3,
  h4,
  h5,
  h6
    font-family: $vibe-family-head
    margin: 0
    line-height: 1.25
  .container p
    font-family: $vibe-family-body 

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong,
  b
    font-weight: bold


  h1:hover .header-anchor,
  h1:focus .header-anchor,
  h2:hover .header-anchor,
  h2:focus .header-anchor,
  h3:hover .header-anchor,
  h3:focus .header-anchor,
  h4:hover .header-anchor,
  h4:focus .header-anchor,
  h5:hover .header-anchor,
  h5:focus .header-anchor,
  h6:hover .header-anchor,
  h6:focus .header-anchor
    opacity: 1


  h1
    margin-top: 1.5rem
    font-size: 1.9rem


  @media screen and (min-width: 420px)
    h1
      font-size: 2.2rem
    
  h2
    margin-top: 2.25rem
    margin-bottom: 1.25rem
    border-bottom: 1px solid var(--c-divider)
    padding-bottom: 0.3rem
    line-height: 1.25
    font-size: 1.65rem
    /* overflow-x: auto */

  h2 + h3
    margin-top: 1.5rem

  h3
    margin-top: 2rem
    font-size: 1.35rem
  h4
    font-size: 1.15rem
  p,
  ol,
  ul
    margin: 1rem 0
    line-height: 1.7

  a,
  area,
  button,
  [role='button'],
  input,
  label,
  select,
  summary,
  textarea
    touch-action: manipulation

  a
    text-decoration: none
    color: var(--c-brand)
  a:hover
    text-decoration: underline
  a.header-anchor
    float: left
    margin-top: 0.125em
    margin-left: -0.87em
    padding-right: 0.23em
    font-size: 0.85em
    opacity: 0
  a.header-anchor:hover,
  a.header-anchor:focus
    text-decoration: none
  figure
    margin: 0
  img
    max-width: 100%
  ul,
  ol
    padding-left: 1.25em
  li > ul,
  li > ol
    margin: 0
  table
    display: block
    border-collapse: collapse
    margin: 1rem 0
    overflow-x: auto
  tr
    border-top: 1px solid #dfe2e5
  tr:nth-child(2n)
    background-color: #f6f8fa
  th,
  td
    border: 1px solid #dfe2e5
    padding: 0.6em 1em
  blockquote
    margin: 1rem 0
    border-left: 0.2rem solid #dfe2e5
    padding: 0.25rem 0 0.25rem 1rem
    font-size: 1rem
    color: #999
  blockquote > p
    margin: 0
  form
    margin: 0
  .theme.sidebar-open .sidebar-mask
    display: block

  .theme.no-navbar > h1,
  .theme.no-navbar > h2,
  .theme.no-navbar > h3,
  .theme.no-navbar > h4,
  .theme.no-navbar > h5,
  .theme.no-navbar > h6
    margin-top: 1.5rem
    padding-top: 0

  .theme.no-navbar aside
    top: 0

  @media screen and (min-width: 720px)
    .theme.no-sidebar aside
      display: none
    
    .theme.no-sidebar main
      margin-left: 0

  .sidebar-mask
    position: fixed
    z-index: 2
    display: none
    width: 100vw
    height: 100vh
</style>
./Sidebar/Index.vue
