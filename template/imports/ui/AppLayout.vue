<template name='appLayout' lang='pug'>

    <!-- be careful when you change the 'view' prop, check the layout docs -->
    <!--  LHr lpR lfr - with class='fixed-bottom' on the footer seems to be the only possibility
        that works both for desktop and mobile -->

    q-layout(ref='layout' view='LHr lpR lFr')
        q-layout-header
            q-toolbar(color='dark')
                q-btn(flat round dense @click='showLeft = !showLeft' icon='menu')

                q-toolbar-title 
                    |dao
                    span(slot='subtitle') the way

                <!-- showRight is a model attached to right side drawer below -->
                q-btn(flat round dense icon='sim_card' to='/profile')

                q-btn(flat round dense @click='showRight = !showRight' icon='menu')
            
            q-tabs(color='dark')
                q-route-tab(slot='title' icon='save' to='/' replace label='PubSub')
                q-route-tab(slot='title' icon='alarm' to='/session' replace label='Session')
                q-route-tab(slot='title' icon='help' to='/help' replace label='Help')
                q-route-tab(slot='title' icon='keyboard_arrow_up' to='/fab' replace label='FAB')
                q-route-tab(slot='title' icon='mail' to='/mail' replace label='Mail')
                q-route-tab(slot='title' icon='settings' to='/settings' replace label='Settings')

        q-layout-drawer(side='left' v-model='showLeft' color='dark')
            q-list(no-border link inset-separator color='dark')
                q-list-header Essential Links
                q-item(to='/')
                    q-item-side(icon='save')
                    q-item-main(label='PubSub')
                q-item(to='/session')
                    q-item-side(icon='alarm')
                    q-item-main(label='Session')
                q-item(to='/help')
                    q-item-side(icon='help')
                    q-item-main(label='Help')

        q-layout-drawer(side='right' v-model='showRight')
            span Right Side of Layout

        q-page-container
            router-view

        q-layout-footer(color='dark')
            q-toolbar(color='dark')
                q-toolbar-title (c) facet

</template>

<script>



    //See main.js for the global import of 'Quasar' and vue.use() method.
    //Don't move the 'Quasar' import from main.js - importing 'Quasar' later causes an error

    //we've had to symlink all the material-icons material from /node-modules/quasar-extras/material-icons
    //to /public because otherwise for some reason material-icons.css cannot find './MaterialIcons-Regular.woff'
    // even though is in the same folder as itself
    import '/public/material-icons';

    if(Meteor.isCordova && cordova.platformId == 'ios'){
        import('/node_modules/quasar-framework/dist/umd/quasar.ios.css');
    }else{
        import('/node_modules/quasar-framework/dist/umd/quasar.mat.css');
    }

    //swap the comments on these lines if you want to compile for ios
    import {
        QLayout, QToolbar, QToolbarTitle, QTabs, QTab, QRouteTab, QBtn, QIcon,
        QItemMain, QItemSide, QList, QListHeader, QLayoutHeader, QLayoutFooter, QLayoutDrawer, QPageContainer, QItem
    } from '/node_modules/quasar-framework/dist/quasar.mat.common.js';
    // import {
    //     QLayout, QToolbar, QToolbarTitle, QTabs, QTab, QRouteTab, QBtn, QIcon,
    //     QItemMain, QItemSide, QList, QListHeader, QLayoutHeader, QLayoutFooter, QLayoutDrawer, QPageContainer, QItem
    // } from '/node_modules/quasar-framework/dist/quasar.ios.common.js';



    export default {
        data: function () {
            return {
                showLeft: false,
                showRight: false
            }
        },
        props: {
            uiid: 'mat'
        },
        components: {
            QLayoutFooter,
            QLayoutHeader,
            QLayoutDrawer,
            QLayout,
            QToolbar,
            QToolbarTitle,
            QTabs,
            QTab,
            QRouteTab,
            QBtn,
            QIcon,
            QItemMain, QItemSide,
            QList, QListHeader, QPageContainer,
            QItem
        }
    }
</script>
