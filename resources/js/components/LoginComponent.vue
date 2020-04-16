<template>
    <v-app id="inspire">
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12">
                            <v-toolbar color="light-blue darken-1" dark flat>
                                <v-toolbar-title>Login</v-toolbar-title>
                                <v-spacer />
                            </v-toolbar>
                            <v-card-text>
                                <v-progress-linear :active="loading" :indeterminate="loading" absolute top color="white accent-4"></v-progress-linear>
                                <v-form ref="form" v-model="valid" >
                                    <v-text-field color="light-blue darken-1" label="Login" name="login" v-model="email" :rules="emailRules" required prepend-icon="mdi-account" type="email" />

                                    <v-text-field color="light-blue darken-1" id="password" label="Password" v-model="password" :rules="passwordRules" name="password" prepend-icon="mdi-lock" type="password" required />
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer />
                                <v-btn color="light-blue darken-1" :disabled="!valid" block @click="login" class="title white--text">Login</v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-snackbar v-model="snackbar">
                            {{ text }}
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
        data() {
            return {
                valid: true,
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                password: '',
                passwordRules: [
                    v => !!v || 'Password is required',
                ],
                loading: false,
                snackbar: false,
                text: '',
            }
        },
        created() {
            this.$vuetify.theme.dark = false;
        },
        methods: {
            login: function() {
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
                axios.post('/api/login', {'email': this.email, 'password': this.password})
                .then(res => {
                    localStorage.setItem('token', res.data.token) 
                    localStorage.setItem('loggedIn', true)
                    if(res.data.isAdmin) {
                        this.$router.push('/admin')
                        .then(res => console.log('LoggedIn Successfully'))
                        .catch(err => console.log(err))
                    } else{
                        this.text = "You Need to be LoggedIn as an Administrator";
                        this.snackbar = true
                    }
                }).catch(err => {
                    this.text = err.response.data.status
                    this.snackbar = true;
                })
            }
        }
    }
</script>
<style scoped></style>