<template>
  <img class="slide" src="../../assets/about-2.jpg" alt="medicines"/>
</template>

<!--
<template>
  <agile :initial-slide="3">
    <img
    class="slide"
    src="https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;w=1600&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ"/>
    <img
    class="slide"
    src="https://images.unsplash.com/photo-1529815481058-55e5b656f6d6?ixlib=rb-1.2.1&amp;q=85&amp;fm=jpg&amp;crop=entropy&amp;cs=srgb&amp;w=1600&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE0NTg5fQ"/>
    <template slot="prevButton"><i class="fas fa-chevron-left"></i></template>
    <template slot="nextButton"><i class="fas fa-chevron-right"></i></template>
  </agile>
</template>
-->

<script>
export default {
  name: 'ImageSliderComponent'
};
</script>

<style lang="sass">
// VueAgile styles
.agile
  &__nav-button
    background: transparent
    border: none
    color: #fff
    cursor: pointer
    font-size: 24px
    height: 100%
    position: absolute
    top: 0
    transition-duration: .3s
    width: 80px

    &:hover
      background-color: rgba(#000, .5)
      opacity: 1

    &--prev
      left: 0

    &--next
      right: 0

  &__dots
    bottom: 10px
    left: 50%
    position: absolute
    transform: translateX(-50%)

  &__dot
    margin: 0 10px

    button
      background-color: transparent
      border: 1px solid #fff
      border-radius: 50%
      cursor: pointer
      display: block
      height: 10px
      font-size: 0
      line-height: 0
      margin: 0
      padding: 0
      transition-duration: .3s
      width: 10px

    &--current,
    &:hover
      button
        background-color: #fff

// Slides styles
.slide
  display: block
  height: 500px
  object-fit: cover
  width: 100%

</style>
