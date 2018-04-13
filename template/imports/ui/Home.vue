<template lang='pug'>
    div
        div(style="text-align: center; margin-top: 15px;")
            q-btn(color="dark" @click="clickMethod()")
                |Add a record
        div(style="margin-top: 25px;")
            q-list(striped)
                q-list-header Striped star list
                q-item(v-for="item in starRecords" :key="item._id")
                    q-item-main {{ item.name }}
</template>

<script lang="coffee">
    import { Meteor } from 'meteor/meteor'
    import { Stars } from '../lib/collections'

    #swap the Comment on these two lines if you want to compile for ios
    import { QList, QListHeader, QBtn, QItem, QItemMain } from '/node_modules/quasar-framework/dist/quasar.mat.common.js'
    #import { QList, QListHeader, QBtn, QItem, QItemMain } from '/node_modules/quasar-framework/dist/quasar.ios.common.js';


    return
        data: ->
            starNames: ['Dog Star', 'Sirius', 'Pole Star', 'Sun', 'Arthur']
            counter: -1
        components: {
            QList
            QListHeader
            QBtn
            QItem
            QItemMain
        }
        meteor:
            starRecords: 
                params: () ->
                    return null;
                update: () ->
                    starsFound = Stars.find()
                    if(starsFound.count() > this.starNames.length)
                        starsFound.forEach( (doc, index) ->
                            Stars.remove({_id: doc._id})
                        )
                        @counter = -1
                        alert('starting again ..')
                    return starsFound
        methods:
            clickMethod: ->
                if @counter < @starNames.length - 1
                    Stars.insert({name: @starNames[@getCounter()]})
                else
                    alert('There are only five stars')
            getCounter: () ->
                if @counter >= @starNames.length - 1
                    console.log('starNames', starNames)
                    return -1
                @counter++
                @counter
        created: () ->
            @$subscribe('stars')

</script>