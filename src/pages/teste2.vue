<template>
  <q-page>
    <div class="row">
      <q-table
        :dense="$q.screen.lt.md"
        title="Treats"
        :rows="users"
        :columns="columns"
        row-key="name"
        class="col"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import api from '../services/api' // '../../services/api'

export default defineComponent({
  name: 'PageIndex',
  data () {
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
      ],
      // users: []// original
      users: []
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
