<template>
	<v-app id="inspire">
	    <v-data-table item-key="name" class="elevation-1" :loading="loading" loading-text="Loading... Please wait" 
	    :headers="headers" :options.sync="options" :server-items-length="categories.total" :items="categories.data" show-select @input="selectAll" :footer-props="footerProps">
	        <template v-slot:top>
	            <v-toolbar flat>
	                <v-toolbar-title >Category Management System</v-toolbar-title>
	                <v-divider class="mx-4" inset vertical></v-divider>
	                <v-spacer></v-spacer>
	                <v-dialog v-model="dialog" max-width="800px">
	                    <template v-slot:activator="{ on }">
	                        <v-btn color="primary" dark class="mb-2" v-on="on">Add New Category</v-btn>
	                        <v-btn color="primary" dark class="mb-2 mr-2" @click="deleteAll" disabled>Delete</v-btn>
	                    </template>
	                    <v-card>
	                        <v-card-title>
	                            <span class="headline">{{ formTitle }}</span>
	                        </v-card-title>

	                        <v-card-text>
	                            <v-container>
	                                <v-row>
	                                    <v-col cols="12" sm="6">
	                                        <v-text-field v-model="editedItem.name" :rules="[rules.required, rules.min]" :blur="checkCategory" label="Category Name"></v-text-field>
	                                    </v-col>
	                                    <v-col cols="12" sm="6">
	                                    	<v-file-input v-model="editedItem.photo" :rules="[rules.required]" label="Select File" placeholder="Upload Photo" accept="image/jpg, image/png, image/bmp, image/jpeg"/>
	                                    </v-col>
	                                </v-row>
	                            </v-container>
	                        </v-card-text>
	                        <v-card-actions>
	                            <v-spacer></v-spacer>
	                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
	                            <v-btn type="submit" :disabled="!valid" color="blue darken-1" text @click.prevent="save">Save</v-btn>
	                        </v-card-actions>
	                    </v-card>
	                </v-dialog>
	            </v-toolbar>
	        	<v-text-field @input="searchIt" append-icon="mdi-magnify" class="mx-4" label="Search..." single-line hide-details></v-text-field>
	        </template>
		    <template v-slot:item.photo="{ item }">
		        <v-edit-dialog>
		          	<v-list-item-photo>
		            	<v-img :src="item.photo" aspect-ratio="1" class="grey lighten-2"></v-img>
		          	</v-list-item-photo>
		          	<template v-slot:input>
		            	<v-file-input v-model="editedItem.photo" label="Select File" placeholder="Upload Photo" accept="image/jpg, image/png, image/bmp, image/jpeg" @change="uploadAvatar(item)" />
		          	</template>
		        </v-edit-dialog>
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
        	valid: true,
        	dialog: false,
        	loading: false,
        	snackbar: false,
        	selected: [],
        	text: '',
        	success: '',
        	error: '',
        	options: {
        		itemsPerPage: 5,
        		sortBy: ['id'],
        		sortDesc: [false]
        	},
        	rules: {
        		required: v => !!v || "This Field Required",
        		min: v => v.length >= 5 || "Minimum 5 Characters Required",
        	},
        	footerProps: {
				itemsPerPageOptions: [5, 10, 15],
				itemsPerPageText: 'Categories Per Page',
				'show-current-page': true,
				'show-first-last-page': true
        	},
        	headers: [
		        { text: '#', align: 'left', sortable: false, value: 'id'},
		        { text: 'Name', value: 'name' },
		        { text: 'Slug', value: 'slug' },
		        { text: 'Photo', sortable: false, value: 'photo' },
		        { text: 'Actions', sortable: false, value: 'actions'},
		    ],
		    categories: [],
		    editedIndex: -1,
		    editedItem: {
		    	id: '',
		        name: '',
		        photo: null,
		    },
		    defaultItem: {
		    	id: '',
		        name: '',
		        slug: '',
		        photo: '',
		        created_at: '',
		        updated_at: '',
		    },
        }),
        computed: {
	      	formTitle () {
	        	return this.editedIndex === -1 ? 'New Category' : 'Edit Category'
	      	},
	      	checkCategory() {
	    		if (this.editedItem.name.length >= 5) {
			        axios.post("/api/category/verify", { email: this.editedItem.name })
			        .then(res => {
			            this.success = res.data.message;
			            this.error = "";
			        })
			        .catch(err => {
			            this.success = "";
			            this.error = "Category Already Exists";
			        });
		      	} else {
			        this.success = "";
		      		this.error = "";
		      	}
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
					axios.get(`/api/categories`, {params: {'page': e.page,'per_page': e.itemsPerPage, 'sort_by': sortBy, 'order_by': orderBy}})
					.then(res => {
						this.categories = res.data.categories
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
	    	uploadAvatar(item) {
	    		if (this.editedItem.photo != null) {
			        const index = this.users.data.indexOf(item);
			        let formData = new FormData();
			        formData.append( "photo", this.editedItem.photo, this.editedItem.photo.name );
			        formData.append("user", item.id);
			        axios.post("/api/user/photo", formData)
			    	.then(res => {
			    		this.users.data[index].photo = res.data.user.photo;
			            this.editedItem.photo = null;
			        })
			        .catch(err => console.log(err.response));
		      	}
	    	},
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
			        //axios.post('/api/categories/delete', {'categories': this.selected})
			        axios.post('/api/categories/delete', {'categories': selected_id})
			        .then(res => {
		        		this.text = "Records Deleted Successfully!";
			        	this.selected.map(val => {
			        		const index = this.categories.data.indexOf(val)
							this.categories.data.splice(index, 1)
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
	    			axios.get(`/api/categories/${e}`)
	    			.then(res => this.categories = res.data.categories)
	    			.catch(err => console.dir(err.response))
	    		}
	    		if(e.length<=0){
		          	axios.get(`/api/categories`)
		            .then(res => this.categories = res.data.categories)
		            .catch(err => console.dir(err.response))
		        }
	    	},
		    paginate(e) {
		    	const sortBy = e.sortBy.length > 0 ? e.sortBy[0].trim() : 'name';
		    	const orderBy = e.sortDesc[0] ? 'desc' : 'asc';
				axios.get(`/api/categories`, {params: {'page': e.page,'per_page': e.itemsPerPage, 'sort_by': sortBy, 'order_by': orderBy}})
				.then(res => {
					this.categories = res.data.categories
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
		        this.editedIndex = this.categories.data.indexOf(item)
		        this.editedItem = Object.assign({}, item)
		        this.dialog = true
		    },
		    deleteItem (item) {
		        const index = this.categories.data.indexOf(item)
		        let decide = confirm('Are you sure you want to delete this item?')
		        if(decide) {
			        axios.delete('/api/categories/' + item.id)
			        .then(res => {
		        		this.text = "Record Deleted Successfully!";
			        	this.snackbar = true;
			        	this.categories.data.splice(index, 1)
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
		        	axios.put('/api/categories/' + this.editedItem.id, {'name': this.editedItem.name })
		        	.then(res => {
		        		this.text = "Record Updated Successfully!";
		        		this.snackbar = true;
		        		Object.assign(this.categories.data[index], res.data.category)
		        	})
		        	.catch(err => {
		        		console.log(err.response)
		        		this.text = "Error Updating Record!";
		        		this.snackbar = true;
		        	})
		        } else {
			        axios.post('/api/categories', {'name': this.editedItem.name })
			    	.then(res => {
		        		this.text = "Record Added Successfully!";
		        		this.snackbar = true;
			    		this.categories.data.push(res.data.category)
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