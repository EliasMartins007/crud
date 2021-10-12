<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> CRUD USUÁRIOS </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen">
      <q-list>
        <q-item-label header> </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

// Vue.component('pagination', require('./components/Paginator'))

const linksList = [
  {
    title: 'Home usuarios',
    caption: 'Pricipal',
    icon: 'home', // 'school',
    link: '/' // 'https://quasar.dev'
  },
  {
    title: 'consulta de usuarios',
    caption: 'Lista de usuários',
    icon: 'group', // 'school',
    link: '/Consulta' // 'https://quasar.dev'
  },
  {
    title: 'cadastro de usuário',
    caption: 'novo usuário',
    icon: 'person_add', // 'school',
    link: '/Cadastro' // 'https://quasar.dev'
  },
  {
    title: 'Paginação',
    icon: 'find_in_page', // 'school',
    link: '/teste' // 'https://quasar.dev'
  },
  {
    title: 'Pesquisar',
    icon: 'search', // 'school',
    link: '/Pesquisar' // 'https://quasar.dev'
  }
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
