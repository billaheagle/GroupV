<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app clipped>
            <v-list dense>
                <v-list-item v-for="item in items_menu" :key="item.text" link :to="item.action">
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item class="mt-4" link to="/">
                    <v-list-item-action>
                        <v-icon>mdi-tablet-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item>
                <!--v-list-item link @click="logout">
                    <v-list-item-action>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-action>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-->
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
            <v-btn text to="/my-store">
                <v-toolbar-title style="width: 230px" class="ml-0 pl-4">
                    <span class="hidden-sm-and-down">JANNNAH GATE</span>
                </v-toolbar-title>
            </v-btn>
            <v-spacer />
            <v-btn icon text>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-btn icon to="/messages">
                <v-icon>mdi-email</v-icon>
            </v-btn>
            <!--v-btn icon to="/login">
                <v-icon>mdi-account</v-icon>
            </v-btn-->
            <v-menu open-on-hover offsetY>
                <template v-slot:activator="{ on }">
                    <v-btn text v-on="on">
                        <v-avatar size="36">
                            <v-img src="storage/avatars/no_image.png" aspect-ratio="1"></v-img>
                        </v-avatar>
                        <div style="margin-left:0.5em">Kiseki no Sedai</div>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(item, index) in items_profile" :key="index" link :to="item.action">
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
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
            items_menu: [
                {
                    icon: 'mdi-gift',
                    text: 'Merchandise',
                    action: '/my-store/my-merchandise'
                }, 
                {
                    icon: 'mdi-book-multiple',
                    text: 'Reports',
                    action: '/my-store/my-reports'
                },
                {
                    icon: 'mdi-settings',
                    text: 'Store Settings',
                    action: '#'
                },
            ],
            items_profile: [
                {
                    icon: 'mdi-settings',
                    text: 'Account Settings',
                    action: '#'
                },
                {
                    icon: 'mdi-logout',
                    text: 'Logout',
                    action: '#'
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