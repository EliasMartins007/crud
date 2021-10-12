const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: 'Consulta',
        component: () => import('pages/Usuarios/Consulta.vue')
      },
      {
        path: 'Cadastro',
        component: () => import('pages/Usuarios/Cadastro.vue')
      },
      {
        path: 'teste',
        component: () => import('pages/teste.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
