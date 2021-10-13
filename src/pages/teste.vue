<template>
  <q-page>
    <q-table
      v-model:pagination="pagination"
      color="secondary"
      :loading="loading"
      :rows="users"
      :columns="columns"
    >
      <template #loading>
        <q-inner-loading showing color="secondary" />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import api from '../services/api' // '../../services/api'

export default defineComponent({
  name: 'PageIndex',
  data () {
    // setup()  dogs= users
    const loading = ref(true)
    const users = ref([])
    // eslint-disable-next-line no-unused-vars
    const pagination = ref({
      // sortBy: 'name',
      // descending: false,
      users: [],
      page: 1,
      rowsPerPage: 20, // linhas por pagina
      rowsNumber: 500,
      total: 1
    })

    const columns = [
      {
        name: 'id',
        label: 'Id',
        field: 'id',
        align: 'left',
        sortable: true
      },
      {
        name: 'name',
        label: 'nome',
        field: 'name',
        align: 'left',
        sortable: true
      },
      {
        name: 'email',
        label: 'email',
        field: 'email',
        align: 'left',
        sortable: true
      },
      {
        name: 'gender',
        label: 'sexo',
        field: 'gender',
        align: 'left',
        sortable: true
      },
      {
        name: 'status',
        label: 'status',
        field: 'status',
        align: 'left',
        sortable: true
      }
    ]
    // users: []// original
    // eslint-disable-next-line no-unused-vars
    const fetchDogs = (page = 20) => {
      const BASE_URL = 'https://gorest.co.in/public'
      const url = `${BASE_URL}/v1/users?page=${page}`
      // (page = 0)
      api
        //  .get('https://gorest.co.in/public/v1/users?page=1', {
        // .get('https://gorest.co.in/public/v1/users?page=', {
        //   params: { page: page }
        // })
        .get(url)
        .then(({ data }) => {
          // this.data = data
          this.users = data.data
          this.total = data.total
          // pagination.value.rowsNumber = data.page// menu de >>
        })
        // fim
        /* .then((response) => {
          users.value = response.data.data

          const meta = response.data.meta
          console.log(meta)
          // pagination.value.rowsNumber = meta.total
          pagination.value.rowsNumber = meta.total
        }) */
        .finally(() => {
          loading.value = false
        })
    }
    //   users: []
    fetchDogs()

    return {
      pagination,
      loading,
      users,
      columns
    }
  },
  // mounted () {
  //   // montar
  //   this.getUsers()
  // },
  async beforeMount () {
    // await this.getUsers()
  },
  // fim teste
  methods: {
    getUsers () {
      api
        .get('') // https://gorest.co.in/public/v1/users?page=3
        .then((res) => {
          // this.users = res.data // res.data
          this.users = res.data.data
          // console.log(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
</script>
