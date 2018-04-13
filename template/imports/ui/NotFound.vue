<template lang='pug'>
    .not-found
        .banner
            img(src="/img/droids.jpg")
        .hero Not Found
        div
            |This is not the page you are looking for. 
            router-link(:to="{name:'home'}") Return home
</template>

<style scoped lang='stylus'>
    .not-found
        margin-top 84px
        text-align center
    .not-found .hero 
        font-size 2.5em
        color #666
        margin 12px
    .not-found .banner img 
        max-width 100%
        border-radius 5px
</style>
