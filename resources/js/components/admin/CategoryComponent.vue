<template>
	<v-app id="inspire">
	    <v-data-table item-key="name" class="elevation-1" :loading="loading" loading-text="Loading... Please wait" 
	    :headers="headers" :options.sync="options" :server-items-length="category.total" :items="category.data" show-select @input="selectAll" :footer-props="footerProps">
	        <template v-slot:top>
	            <v-toolbar flat>
	                <v-toolbar-title >Category Management System</v-toolbar-title>
	                <v-divider class="mx-4" inset vertical></v-divider>
	                <v-spacer></v-spacer>
	                <v-dialog v-model="dialog" max-width="500px">
	                    <template v-slot:activator="{ on }">
	                        <v-btn color="primary" dark class="mb-2" v-on="on">Add New category</v-btn>
	                        <v-btn color="primary" dark class="mb-2 mr-2" @click="deleteAll" disabled>Delete</v-btn>
	                    </template>
	                    <v-card>
	                        <v-card-title>
	                            <span class="headline">{{ formTitle }}</span>
	                        </v-card-title>

	                        <v-card-text>
	                            <v-container>
	                                <v-row>
	                                    <v-col cols="12" sm="12">
	                                        <v-text-field autofocus v-model="editedItem.name" label="Category Name"></v-text-field>
	                                    </v-col>
	                                </v-row>
	                            </v-container>
	                        </v-card-text>
	                        <v-card-actions>
	                            <v-spacer></v-spacer>
	                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
	                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
	                        </v-card-actions>
	                    </v-card>
	                </v-dialog>
	            </v-toolbar>
	        	<v-text-field @input="searchIt" append-icon="mdi-magnify" class="mx-4" label="Search..." single-line hide-details></v-text-field>
	        </template>
	        <template v-slot:item.actions="{ item }">
	            <v-icon small class="mr-2" @click="editItem(item)">
	                mdi-pencil
	            </v-icon>
	            <v-icon small @click="deleteItem(item)">
	                mdi-delete
	            </v-icon>
	        </template>
	        <template v-slot:no-data>
	            <v-btn color="primary" @click="initialize">Reset</v-btn>
	        </template>
	    </v-data-table>
		<v-snackbar v-model="snackbar">
		    {{ text }}
			<v-btn color="error" text @click="snackbar = false">
		    	Close
			</v-btn>
		</v-snackbar>
	</v-app>
</template>
<script>
    export default {
        data: () => ({
        	dialog: false,
        	loading: false,
        	snackbar: false,
        	selected: [],
        	text: '',
        	options: {
        		itemsPerPage: 5,
        		sortBy: ['id'],
        		sortDesc: [false]
        	},
        	footerProps: {
				itemsPerPageOptions: [5, 10, 15],
				itemsPerPageText: 'category Per Page',
				'show-current-page': true,
				'show-first-last-page': true
        	},
        	headers: [
		        { text: '#', align: 'left', sortable: false, value: 'id'},
		        { text: 'Name', value: 'name' },
		        { text: 'Slug', value: 'slug' },
		        { text: 'Created At', value: 'created_at' },
		        { text: 'Updated At', value: 'updated_at' },
		        { text: 'Actions', value: 'actions'},
		    ],
		    category: [],
		    editedIndex: -1,
		    editedItem: {
		    	id: '',
		        name: '',
		        created_at: '',
		        updated_at: '',
		    },
		    defaultItem: {
		    	id: '',
		        name: '',
		        created_at: '',
		        updated_at: '',
		    },
        }),
        computed: {
	      	formTitle () {
	        	return this.editedIndex === -1 ? 'New Category' : 'Edit Category'
	      	},
	    },
	    watch: {
		    dialog (val) {
		        val || this.close()
		    },
		    options: {
		    	handler(e) {
		    		const sortBy = e.sortBy.length > 0 ? e.sortBy[0].trim() : 'id';
		    		const orderBy = e.sortDesc[0] ? 'desc' : 'asc';
					axios.get(`/api/category`, {params: {'page': e.page,'per_page': e.itemsPerPage, 'sort_by': sortBy, 'order_by': orderBy}})
					.then(res => {
						this.category = res.data.category
					})
					.catch(err => {
						if(err.response.status == 401) {
							localStorage.removeItem('token');
							this.$router.push('/login');
						}
					})
				},
				deep: true
		   	},
	    },
	    created () {
	      	this.initialize()
	    },
	    methods: {
	    	selectAll(e) {
	    		this.selected = []
	    		if(e.length > 0) {
	    			this.selected = e
	    			//this.selected = e.map(val => val.id)
	    		}
	    	},
	    	deleteAll() {
	    		let decide = confirm('Are you sure you want to delete these items?')
		        if(decide) {
		        	const selected_id = this.selected.map(val => val.id)
			        //axios.post('/api/category/delete', {'category': this.selected})
			        axios.post('/api/category/delete', {'category': selected_id})
			        .then(res => {
		        		this.text = "Records Deleted Successfully!";
			        	this.selected.map(val => {
			        		const index = this.category.data.indexOf(val)
							this.category.data.splice(index, 1)
			        	})
			        	this.snackbar = true;
			        }).catch(err => {
			        	console.log(err.response)
		        		this.text = "Error Deleting Records!";
		        		this.snackbar = true;
			        })
		        }
	    	},
	    	searchIt(e) {
	    		if(e.length > 2) {
	    			axios.get(`/api/category/${e}`)
	    			.then(res => this.category = res.data.category)
	    			.catch(err => console.dir(err.response))
	    		}
	    		if(e.length<=0){
		          	axios.get(`/api/category`)
		            .then(res => this.category = res.data.category)
		            .catch(err => console.dir(err.response))
		        }
	    	},
		    paginate(e) {
		    	const sortBy = e.sortBy.length > 0 ? e.sortBy[0].trim() : 'name';
		    	const orderBy = e.sortDesc[0] ? 'desc' : 'asc';
				axios.get(`/api/category`, {params: {'page': e.page,'per_page': e.itemsPerPage, 'sort_by': sortBy, 'order_by': orderBy}})
				.then(res => {
					this.category = res.data.category
				})
				.catch(err => {
					if(err.response.status == 401) {
						localStorage.removeItem('token');
						this.$router.push('/login');
					}
				})
		   	},
		    initialize () {
			    axios.interceptors.request.use((config) => {
                    this.loading = true; 
                    return config;
                }, (error) => {
                    this.loading = false;
                    return Promise.reject(error);
                });

                axios.interceptors.response.use((response) => {
                    this.loading = false;
                    return response;
                }, (error) => {
                    this.loading = false;
                    return Promise.reject(error);
                });
			},
		    editItem (item) {
		        this.editedIndex = this.category.data.indexOf(item)
		        this.editedItem = Object.assign({}, item)
		        this.dialog = true
		    },
		    deleteItem (item) {
		        const index = this.category.data.indexOf(item)
		        let decide = confirm('Are you sure you want to delete this item?')
		        if(decide) {
			        axios.delete('/api/category/' + item.id)
			        .then(res => {
		        		this.text = "Record Deleted Successfully!";
			        	this.snackbar = true;
			        	this.category.data.splice(index, 1)
			        }).catch(err => {
			        	console.log(err.response)
		        		this.text = "Error Deleting Record!";
		        		this.snackbar = true;
			        })
		        }
		    },
		    close () {
		        this.dialog = false
		        setTimeout(() => {
			        this.editedItem = Object.assign({}, this.defaultItem)
			        this.editedIndex = -1
		        }, 300)
		    }, 
		    save () {
		        if (this.editedIndex > -1) {
		        	const index = this.editedIndex
		        	axios.put('/api/category/' + this.editedItem.id, {'name': this.editedItem.name })
		        	.then(res => {
		        		this.text = "Record Updated Successfully!";
		        		this.snackbar = true;
		        		Object.assign(this.category.data[index], res.data.category)
		        	})
		        	.catch(err => {
		        		console.log(err.response)
		        		this.text = "Error Updating Record!";
		        		this.snackbar = true;
		        	})
		        } else {
			        axios.post('/api/category', {'name': this.editedItem.name })
			    	.then(res => {
		        		this.text = "Record Added Successfully!";
		        		this.snackbar = true;
			    		this.category.data.push(res.data.category)
			    	})
			    	.catch(err => {
		        		console.log(err.response)
		        		this.text = "Error Inserting Record!";
		        		this.snackbar = true;
			    	})
		        }
		        this.close()
		    },
	    },
	}
</script>
<style scoped></style>