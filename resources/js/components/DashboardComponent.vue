<template>
    <v-app id="inspire">
        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="light-blue darken-1" dark>
            <v-btn text to="/">
                <v-toolbar-title style="width: 135px" class="ml-0 pl-3">
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
                <template v-if="['Dashboard'].indexOf($route.name) > -1">
                    <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
                        <v-carousel-item v-for="(slide, i) in slides" :key="i">
                            <v-sheet :color="colors[i]" height="100%">
                                <v-row class="fill-height" align="center" justify="center">
                                    <div class="display-3">{{ slide }} Slide</div>
                                </v-row>
                            </v-sheet>
                        </v-carousel-item>
                    </v-carousel>
                    <v-card class="my-5">
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    <v-row align="center" class="spacer" no-gutters>
                                        <v-col cols="12" sm="12" md="12">
                                            <v-btn text dark>
                                                <v-avatar tile size="36">
                                                    <v-icon class="black--text">mdi-apps</v-icon>
                                                </v-avatar>
                                                <div style="margin-left:0.5em" class="black--text"><strong>Categories</strong></div>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-row>
                                        <v-col cols="6" sm="3" v-for="item in categories" :key="item.text" link :to="item.action">
                                            <v-btn text to="#" dark>
                                                <v-avatar tile size="36">
                                                    <v-img :src="item.photo" aspect-ratio="1"></v-img>
                                                </v-avatar>
                                                <div style="margin-left:0.5em" class="black--text">{{ item.text }}</div>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card>
                    <v-row class="my-5">
                        <v-col cols="6" sm="3">
                            <v-card :loading="loading">
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
                        </v-col>
                    </v-row>
                </template>
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
            drawer: null,
            loading: false,
            colors: [
                'indigo',
                'warning',
                'pink darken-2',
                'red lighten-1',
                'deep-purple accent-4',
            ],
            slides: [
                'First',
                'Second',
                'Third',
                'Fourth',
                'Fifth',
            ],
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
            categories: [
                {
                    text: 'Buku',
                    photo: 'storage/photos/buku.png',
                    action: '#'
                },
                {
                    text: 'Dapur',
                    photo: 'storage/photos/dapur.png',
                    action: '#'
                },
                {
                    text: 'Elektronik',
                    photo: 'storage/photos/elektronik.png',
                    action: '#'
                },
                {
                    text: 'Fashion Anak',
                    photo: 'storage/photos/fashion-anak.png',
                    action: '#'
                },
                {
                    text: 'Fashion Muslim',
                    photo: 'storage/photos/fashion-muslim.png',
                    action: '#'
                },
                {
                    text: 'Fashion Pria',
                    photo: 'storage/photos/fashion-pria.png',
                    action: '#'
                },
                {
                    text: 'Fashion Wanita',
                    photo: 'storage/photos/fashion-wanita.png',
                    action: '#'
                },
                {
                    text: 'Film & Musik',
                    photo: 'storage/photos/film-musik.png',
                    action: '#'
                },
                {
                    text: 'Handphone & Tablet',
                    photo: 'storage/photos/handphone-tablet.png',
                    action: '#'
                },
                {
                    text: 'Ibu & Bayi',
                    photo: 'storage/photos/ibu-bayi.png',
                    action: '#'
                },
                {
                    text: 'Kamera',
                    photo: 'storage/photos/kamera.png',
                    action: '#'
                },
                {
                    text: 'Kencantikan',
                    photo: 'storage/photos/kecantikan.png',
                    action: '#'
                },
                {
                    text: 'Kesehatan',
                    photo: 'storage/photos/kesehatan.png',
                    action: '#'
                },
                {
                    text: 'Komputer & Laptop',
                    photo: 'storage/photos/komputer-laptop.png',
                    action: '#'
                },
                {
                    text: 'Logam Mulia',
                    photo: 'storage/photos/logam-mulia.png',
                    action: '#'
                },
                {
                    text: 'Mainan & Hobi',
                    photo: 'storage/photos/mainan-hobi.png',
                    action: '#'
                },
                {
                    text: 'Makanan & Miuman',
                    photo: 'storage/photos/makanan-minuman.png',
                    action: '#'
                },
                {
                    text: 'Office & Stationery',
                    photo: 'storage/photos/office-stationery.png',
                    action: '#'
                },
                {
                    text: 'Olahraga',
                    photo: 'storage/photos/olahraga.png',
                    action: '#'
                },
                {
                    text: 'Otomotif',
                    photo: 'storage/photos/otomotif.png',
                    action: '#'
                },
                {
                    text: 'Perawatan Hewan',
                    photo: 'storage/photos/perawatan-hewan.png',
                    action: '#'
                },
                {
                    text: 'Perawatan Tubuh',
                    photo: 'storage/photos/perawatan-tubuh.png',
                    action: '#'
                },
                {
                    text: 'Perlengkapan Pesta',
                    photo: 'storage/photos/perlengkapan-pesta.png',
                    action: '#'
                },
                {
                    text: 'Pertukangan',
                    photo: 'storage/photos/pertukangan.png',
                    action: '#'
                },
                {
                    text: 'Rumah Tangga',
                    photo: 'storage/photos/rumah-tangga.png',
                    action: '#'
                },
                {
                    text: 'Wedding',
                    photo: 'storage/photos/wedding.png',
                    action: '#'
                },
                {
                    text: 'Produk Lainnya',
                    photo: 'storage/photos/produk-lainnya.png',
                    action: '#'
                },
            ],
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