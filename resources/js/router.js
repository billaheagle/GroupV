import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginComponent from './components/LoginComponent';
import DashboardComponent from './components/DashboardComponent';
//------------------ADMIN COMPONENT---------------------------//
import AdminComponent from './components/admin/AdminComponent';
import UsersComponent from './components/admin/UsersComponent';
import RolesComponent from './components/admin/RolesComponent';
import CategoriesComponent from './components/admin/CategoriesComponent';
import StoresComponent from './components/admin/StoresComponent';
import PaymentsComponent from './components/admin/PaymentsComponent';
import PromosComponent from './components/admin/PromosComponent';


Vue.use(VueRouter)

const routes = [
{
	path: '/',
	component: DashboardComponent,
	name: 'Dashboard'
},
{
	path: '/login',
	component: LoginComponent,
	name: 'Login'
},
{
	path : '/admin',
	component: AdminComponent,
	name: 'Admin',
	children: [
		{
			path: 'payments',
			component: PaymentsComponent,
			name: 'Payments'
		},
		{
			path: 'roles',
			component: RolesComponent,
			name: 'Roles'
		},
		{
			path: 'categories',
			component: CategoriesComponent,
			name: 'Roles'
		},
		{
			path: 'promos',
			component: PromosComponent,
			name: 'Promos'
		},
		{
			path: 'stores',
			component: StoresComponent,
			name: 'Stores'
		},
		{
			path: 'users',
			component: UsersComponent,
			name: 'Users'
		},
	],
},
]

export default new VueRouter({routes})