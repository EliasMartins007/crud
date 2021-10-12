<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :dense="$q.screen.lt.md"
        title="Treats"
        :rows="users"
        :columns="columns"
        row-key="name"
        class="col"
        :loading="loading"
        separator="cell"
        v-model:pagination="initialPagination"
        ><template #loading>
          <q-inner-loading showing color="secondary" />
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import api from '../services/api' // '../../services/api'

export default defineComponent({
  name: 'PageIndex',
  data () {
    // teste 12/10
    const loading = ref(false)
    return {
      columns: [
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
      ], // teste elias 12/10
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 4
        // rowsNumber: xx if getting data from a server
      },

      // users: []// original
      users: [],
      loading
    }
  },
  mounted () {
    // montar
    this.getUsers()
  },
  // async beforeMount () {
  //   await this.getUsers()
  // },
  // fim teste
  methods: {
    getUsers (page = 1) {
      api
        .get(
          '', // https://gorest.co.in/public/v1/users?page=3
          { params: { page: page } }
        )
        .then((res) => {
          // this.users = res.data // res.data
          this.users = res.data.data
          console.log(res.data)
          // teste elias 12/10/2021
          this.initialPagination = res.data.initialPagination
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          // loading.value = false
        })
    }
  }
})
</script>
