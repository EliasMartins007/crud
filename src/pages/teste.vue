<template>
  <q-page class="flex flex-center">
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
      page: 1,
      rowsPerPage: 15,
      rowsNumber: 0
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
    const fetchDogs = (page = 1) => {
      // (page = 0)
      api
        .get('https://gorest.co.in/public/v1/users?page=1', {
          params: { page: page }
        })
        .then((response) => {
          users.value = response.data.data

          const meta = response.data.meta
          console.log(meta)
          pagination.value.rowsNumber = meta.total
        })
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
    await this.getUsers()
  },
  // fim teste
  methods: {
    getUsers () {
      api
        .get('?name=maria') // https://gorest.co.in/public/v1/users?page=3
        .then((res) => {
          // this.users = res.data // res.data
          this.users = res.data.data
          console.log(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
</script>
