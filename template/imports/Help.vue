<template lang="pug">
    div(style="margin: 20px;")
        q-card
            q-card-title
                span PubSub - Publish and Subscribe
            q-card-main
                p Shows how to mix Meteor pubsub with Vue and Quasar.
                p The list of stars is reactive, so you can add a record to mongo manually and it will show in the list.
                p 
                    strong N.B 
                    |This works out of the box on desktop. If you want it to work on a mobile device you will have to set up a server, which is beyond the scope of this demonstration.
        q-card
            q-card-title Session
            q-card-main
                p Shows how to use Meteor sessions with Vue and Quasar.
</template>


<script lang='coffee'>
    # //swap the comment on these lines if you want to compile for ios
    import { QCard, QCardTitle, QCardMain } from '/node_modules/quasar-framework/dist/quasar.mat.common.js'
    # import { QCard, QCardTitle, QCardMain } from '/node_modules/quasar-framework/dist/quasar.ios.common.js';


    export default {
        components: {
            QCard, QCardTitle, QCardMain
        }
    }

</script>