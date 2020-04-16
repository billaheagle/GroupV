<template>
    <v-app id="inspire">
        <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="light-blue darken-1" dark>
            <v-btn text to="/">
                <v-toolbar-title style="width: 150px" class="ml-0 pl-4">
                    <span class="hidden-sm-and-down">LARASHOP</span>
                </v-toolbar-title>
            </v-btn>
            <v-spacer />
            <v-text-field flat solo-inverted hide-details prepend-inner-icon="mdi-magnify" label="Search" class="hidden-sm-and-down" />
            <v-spacer />
            <v-btn icon>
                <v-icon>mdi-cart</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-message-text</v-icon>
            </v-btn>
            <v-btn icon to="/login">
                <v-icon>mdi-login</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content>
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