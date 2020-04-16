<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-list-item v-for="item in items" :key="item.text" link :to="item.action">
                    <v-list-item-action>
                        <v-icon>mdi-{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="mt-4" link>
                    <v-list-item-action>
                        <v-icon color="grey darken-1">mdi-settings</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Account Settings</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="logout">
                    <v-list-item-action>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-action>
                        <v-switch v-model="theme"></v-switch>
                    </v-list-item-action>
                    <v-list-item-title>
                        Switch Theme
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="light-blue darken-1" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-btn text to="/admin">
                <v-toolbar-title style="width: 230px" class="ml-0 pl-4">
                    <span class="hidden-sm-and-down">ADMIN LARASHOP</span>
                </v-toolbar-title>
            </v-btn>
            <v-spacer />
            <v-btn icon>
                <v-icon>mdi-message-text</v-icon>
            </v-btn>
            <v-btn icon to="/login">
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-app-bar>
        <v-content>
            <v-container class="">
                <router-view></router-view>
                <v-row justify="center" align="center">
                    <v-col>
                        <v-snackbar v-model="snackbar">
                            You are LoggedIn Successfully!
                            <v-btn color="pink" text @click="snackbar = false">
                            Close
                          </v-btn>
                        </v-snackbar>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
    export default {
        props: {
            source: String,
        },
        data: () => ({
            drawer: null,
            snackbar: false,
            theme: false,
            items: [
                {
                    icon: 'account',
                    text: 'Users',
                    action: '/admin/users'
                }, 
                {
                    icon: 'animation-outline',
                    text: 'Roles',
                    action: '/admin/roles'
                }, 
                {
                    icon: 'briefcase-edit-outline',
                    text: 'Categories',
                    action: '/admin/categories'
                }, 
                {
                    icon: 'store',
                    text: 'Stores',
                    action: '/admin/stores'
                }, 
                {
                    icon: 'wallet',
                    text: 'Payments',
                    action: '/admin/payments'
                }, 
                {
                    icon: 'ticket-percent',
                    text: 'Promos',
                    action: '/admin/promos'
                }, 
            ],
        }),
        created() {
            this.$vuetify.theme.dark = false
        },
        mounted() {
            this.snackbar = localStorage.getItem('loggedIn') ? true : false;
            localStorage.removeItem('loggedIn');
        },
        watch: {
            theme: function(old, newval) {
                this.$vuetify.theme.dark = old;
            }
        },
        methods: {
            logout: function() {
                localStorage.removeItem('token');
                this.$router.push('/login')
                    .then(res => {
                        this.text = "You are Logged Out Successfully";
                        this.snackbar = true;
                    })
                    .catch(err => console.log(err))
            },
        }
    }
</script>
<style scoped>
    .v-btn:before {
        background-color: transparent;
    }
    
    a.v-btn--active {
        box-shadow: none;
        border: none;
        background: transparent;
    }
</style>