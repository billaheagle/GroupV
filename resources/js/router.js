import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginComponent from './components/LoginComponent';
import DashboardComponent from './components/DashboardComponent';
//------------------ADMIN COMPONENT---------------------------//
import AdminComponent from './components/admin/AdminComponent';
import UserComponent from './components/admin/UserComponent';
import RoleComponent from './components/admin/RoleComponent';
import CategoryComponent from './components/admin/CategoryComponent';
import StoreComponent from './components/admin/StoreComponent';
import PaymentComponent from './components/admin/PaymentComponent';
import PromoComponent from './components/admin/PromoComponent';


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
			path: 'payment',
			component: PaymentComponent,
			name: 'Payment'
		},
		{
			path: 'role',
			component: RoleComponent,
			name: 'Role'
		},
		{
			path: 'category',
			component: CategoryComponent,
			name: 'Role'
		},
		{
			path: 'promo',
			component: PromoComponent,
			name: 'Promo'
		},
		{
			path: 'store',
			component: StoreComponent,
			name: 'Store'
		},
		{
			path: 'user',
			component: UserComponent,
			name: 'User'
		},
	],
},
]

export default new VueRouter({routes})