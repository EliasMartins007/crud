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
      />
    </div>
    <div class="q-pa-md">
      <q-input v-model="users" label="Standard" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import api from '../../services/api' // '../../services/api'

export default defineComponent({
  name: 'Search',
  data () {
    return {
      columns: [
        {
          name: 'name',
          label: 'nome',
          field: 'name',
          align: 'left'
          // sortable: true
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
        .get('?id=2403') // https://gorest.co.in/public/v1/users?page=3
        .then((res) => {
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
