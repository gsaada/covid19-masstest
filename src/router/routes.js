// import { componenets, AmplifyEventBus } from 'aws-amplify-vue';


const routes = [
  { path: '/auth', component: () => import('pages/login.vue') },
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true},
    children: [
      { path: '/dashboard', component: () => import('pages/dashboard.vue') },
      { path: '/patient_management', component: () => import('pages/patient_management.vue') },
      { path: '/change_request', component: () => import('pages/change_request.vue') },
      { path: '/my_profile', component: () => import('pages/my_profile.vue') },
      { path: '/sales_invoices', component: () => import('pages/sales_invoices.vue') },
      { path: '/transactions', component: () => import('pages/transactions.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
