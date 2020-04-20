<template>
    <v-app id="inspire">
    	<v-row>
    		<v-col cols="3" sm="3">
    			<v-card class="mt-3">
				    <v-card-text>
				        <div>Filter</div>
                    </v-card-text>
				    <v-card-actions>
				    	
				    </v-card-actions>
				</v-card>
    		</v-col>
    		<v-col cols="9" sm="9">
    			<v-row>
    				<v-col cols="6" sm="4">
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
    				<v-col cols="6" sm="4">
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
    				<v-col cols="6" sm="4">
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
    		</v-col>
    	</v-row>
    </v-app>
</template>
<script>
    export default {
        data: () => ({
            drawer: null,
            loading: false,
        }),
    }
</script>
<style scoped></style>