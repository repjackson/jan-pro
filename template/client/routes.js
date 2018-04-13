// Import the router
import { RouterFactory } from 'meteor/akryum:vue-router2'
// Components
import Home from '/imports/ui/Home.vue'
import Session from '/imports/ui/Session.vue'
import Settings from '/imports/ui/Settings.vue'
import Help from '/imports/ui/Help.vue'
import ActionButton from '/imports/ui/ActionButton.vue'

RouterFactory.configure(factory => {
    // Simple routes
    factory.addRoutes([
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/session',
            name: 'session',
            component: Session,
        },
        {
            path: '/help',
            name: 'help',
            component: Help,
        },
        {
            path: '/fab',
            name: 'fab',
            component: ActionButton,
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
        },
    ])
})