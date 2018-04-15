<template lang='pug'>
  button.relative-position.animate-bounce
    i.fa.fa-2x.fa-envelope-o
    span.floating.label.bg-dark 5
    q-popover(self='top right')
      .list.striped
        p.caption.no-margin.text-center.text-white.bg-teal Messages from people
        .item.item-link.two-lines.item-delimiter.no-margin(v-for='post in filteredPosts')
          img.item-primary(:src='randomAvatarUrl()')
          .item-content.has-secondary
            div {{post.title}}
            div {{randomDate()}}
          span.label.bg-red.text-white.item-secondary.no-margin
            i.left-detail
            |  New
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    mounted () {
      if (this.getPosts.length < 1) {
        this.requestPosts()
      }
    },
    computed: {
      ...mapGetters(['getPosts']),
      filteredPosts () {
        return this.getPosts.slice(0, 5)
      }
    },
    methods: {
      ...mapMutations(['setPosts']),
      randomDate () {
        return new Date((new Date()) - Math.floor(Math.random() * 10000000000))
      },
      randomAvatarUrl () {
        return `https://api.adorable.io/avatars/face/${this.randomEye()}/${this.randomNose()}/${this.randomMouth()}/${this.randomHexColor()}`
      },
      randomHexColor () {
        return Math.random().toString(16).slice(2, 8)
      },
      randomEye () {
        return this.randomArrayElement(['eyes1', 'eyes10', 'eyes2', 'eyes3', 'eyes4', 'eyes5', 'eyes6', 'eyes7', 'eyes9'])
      },
      randomNose () {
        return this.randomArrayElement(['nose2', 'nose3', 'nose4', 'nose5', 'nose6', 'nose7', 'nose8', 'nose9'])
      },
      randomMouth () {
        return this.randomArrayElement(['mouth1', 'mouth10', 'mouth11', 'mouth3', 'mouth5', 'mouth6', 'mouth7', 'mouth9'])
      },
      randomArrayElement (array) {
        return array[Math.floor((Math.random() * array.length))]
      },
      requestPosts () {
        this.$http.jsonplaceholder
          .get('posts')
          .then(response => { this.setPosts(response.data) })
      }
    }
  }
</script>
<style scoped>
  .list{
    max-width: 400px;
  }
  .item > img.item-primary:not(.thumbnail) {
    border-radius: 10px !important;
  }
  .item > img.item-primary {
    width: 48px;
    height: 46px;
  }
  .item > .item-secondary {
    width: 57px;
    font-size: 13px;
  }
</style>