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
//------------------COSTUMER COMPONENT---------------------------//
import CartsComponent from './components/costumer/CartsComponent';
import MessagesComponent from './components/costumer/MessagesComponent';
import WishlistsComponent from './components/costumer/WishlistsComponent';
import OrdersComponent from './components/costumer/OrdersComponent';
import StoreComponent from './components/costumer/StoreComponent';
import MerchandiseComponent from './components/costumer/MerchandiseComponent';
import ReportsComponent from './components/costumer/ReportsComponent';
//--------------------STORE COMPONENT---------------------------//
import MyStoreComponent from './components/store/MyStoreComponent';
import MyMessagesComponent from './components/store/MyMessagesComponent';
import MyMerchandiseComponent from './components/store/MyMerchandiseComponent';
import MyReportsComponent from './components/store/MyReportsComponent';
import MySettingsComponent from './components/store/MySettingsComponent';



Vue.use(VueRouter)

const routes = [
{
	path: '/',
	component: DashboardComponent,
	name: 'Dashboard', //Costumer
	children: [
		{
			path: '/messages',
			component: MessagesComponent,
			name: 'Messages'
		},
		{
			path: '/reports',
			component: ReportsComponent,
			name: 'Reports'
		},
		{
			path: '/wishlists',
			component: WishlistsComponent,
			name: 'Wishlists'
		},
		{
			path: '/carts',
			component: CartsComponent,
			name: 'Carts'
		},
		{
			path: '/orders',
			component: OrdersComponent,
			name: 'Orders'
		},
		{
			path: '/store',
			component: StoreComponent,
			name: 'Store'
		},
		{
			path: '/merchandise',
			component: MerchandiseComponent,
			name: 'Merchandise'
		},
	]
},
{
	path: '/my-store',
	component: MyStoreComponent,
	name: 'My Store',
	children: [
		{
			path: 'messages',
			component: MessagesComponent,
			name: 'Messages'
		},
		{
			path: 'my-messages',
			component: MyMessagesComponent,
			name: 'My Messages'
		},
		{
			path: 'my-reports',
			component: MyReportsComponent,
			name: 'My Reports'
		},
		{
			path: 'my-merchandise',
			component: MyMerchandiseComponent,
			name: 'My Merchandise'
		},
		{
			path: 'my-settings',
			component: MySettingsComponent,
			name: 'My Settings'
		},
	]
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
{
	path: '/login',
	component: LoginComponent,
	name: 'Login'
},
]

export default new VueRouter({routes})