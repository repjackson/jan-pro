<template lang="pug">
    div(style="text-align: center; margin: 10px;")
        H5 {{ letsCountText }}
        h1 {{ count }}
        div
            q-progress(:percentage="progress" class="positive")
        h2 {{finished}}
</template>

<script lang='coffee'>
    import {Session} from 'meteor/session'

    # //swap the comment on these lines if you want to compile for ios
    import { QProgress } from '/node_modules/quasar-framework/dist/quasar.mat.common.js';
    # //import { QProgress } from '/node_modules/quasar-framework/dist/quasar.ios.common.js';

    MAX_COUNT = 3;
    return {
        components: { QProgress }
        meteor:
            data:
                letsCountText: -> 'Let\'s count to ' + MAX_COUNT
                count: -> Session.get('count')
                finished: -> if Session.get('count') is MAX_COUNT then 'Finished!!' else ''
                progress: -> Session.get('count') * (100 / MAX_COUNT)
        created: ->
            Session.set('count', 0)
            i = 1
            myInterval =  Meteor.setInterval( ()->
                Session.set('count', i)
                i++
                if i > MAX_COUNT
                    clearInterval(myInterval)
            , 500)
        destroyed: -> clearInterval(myInterval)
    }

</script>