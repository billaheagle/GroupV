<template>
    <v-app id="inspire">
        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="light-blue darken-1" dark>
            <v-btn text to="/">
                <v-toolbar-title style="width: 150px" class="ml-0 pl-4">
                    <span class="hidden-sm-and-down">LARASHOP</span>
                </v-toolbar-title>
            </v-btn>
            <v-text-field flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="Search" class="hidden-sm-and-down" />
            <v-btn icon text to="/carts">
                <v-icon>mdi-cart</v-icon>
            </v-btn>
            <v-menu open-on-hover offsetY>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-bell</v-icon>
                    </v-btn>
                </template>
                <v-list dense>
                    <v-list-item v-for="(item, index) in notification" :key="index" link :to="item.action">
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-btn icon text to="/messages">
                <v-icon>mdi-email</v-icon>
            </v-btn>
            <!--v-btn icon to="/login">
                <v-icon>mdi-login</v-icon>
            </v-btn-->
            <v-btn text to="/my-store">
                <v-avatar size="36">
                    <v-img src="storage/logos/no_logo.png" aspect-ratio="1"></v-img>
                </v-avatar>
                <div style="margin-left:0.5em">Jannah Gate</div>
            </v-btn>
            <v-menu open-on-hover offsetY>
                <template v-slot:activator="{ on }">
                    <v-btn text v-on="on">
                        <v-avatar size="36">
                            <v-img src="storage/avatars/no_image.png" aspect-ratio="1"></v-img>
                        </v-avatar>
                        <div style="margin-left:0.5em">Kiseki no Sedai</div>
                    </v-btn>
                </template>
                <v-list dense>
                    <v-list-item v-for="(item, index) in profile_menu" :key="index" link :to="item.action">
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

        <!--v-content>
            <v-container class="fill-height" fluid>
            	<v-card :loading="loading" class="mx-auto my-12" max-width="374">
				    <v-img width="300px" src="https://cdn.vuetifyjs.com/images/cards/cooking.png">
				    	<v-btn icon large color="pink lighten-5">
			                <v-icon>mdi-heart</v-icon>
			            </v-btn>
				    </v-img>
				    <v-card-title>Makanan Siap Saji</v-card-title>
				    <v-card-text>
				        <v-row align="center" class="mx-0">
				            <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
				            <div class="grey--text ml-4">4.5 (413)</div>
				        </v-row>
				            <v-row>
				            	<v-col><b>Rp. 30.000.000</b></v-col>
				            	<v-col class="text-right">10300 Terjual</v-col>
				            </v-row>
				    </v-card-text>
				</v-card>
            </v-container>
        </v-content-->
        <v-footer color="light-blue darken-1" app>
            <span class="white--text">Kiseki no Sedai &copy; 2020</span>
        </v-footer>
    </v-app>
</template>
<script>
    export default {
        props: {
            source: String,
        },
        data: () => ({
            toggle_exclusive: 2,
            text: 'center',
            snackbar: false,
            toggle_none: null,
            profile_menu: [
                {
                    icon: 'mdi-settings',
                    text: 'Account Settings',
                    action: '/admin/users'
                },
                {
                    icon: 'mdi-package',
                    text: 'My Order',
                    action: '/admin/roles'
                },
                {
                    icon: 'mdi-logout',
                    text: 'Logout',
                    action: '/login'
                },
            ],
            notification: [
                {
                    text: 'Notification 1',
                    action: '#'
                },
                {
                    text: 'Notification 2',
                    action: '#'
                },
                {
                    text: 'Notification 3',
                    action: '#'
                },
            ],
            drawer: null,
            loading: false,
        }),
        methods: {

        },
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