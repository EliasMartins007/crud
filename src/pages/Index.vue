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

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
            <q-th auto-width />
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
            <q-td auto-width>
              <q-btn round icon="edit"></q-btn>
              <q-btn round icon="delete" @click="Remover(props.row.id)"></q-btn>
            </q-td>
          </q-tr>
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
    this.refresh()
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
    },
    Remover (idUsuario) {
      // obj
      // const registro = { id: idUsuario }
      console.log(idUsuario)
      // alert(idUsuario)
      api
        .delete(`/${idUsuario}`) // ('/', idUsuario)
        .then((res) => {
          // console.log(res)
          // alert('excluido com sucesso!')
          this.triggerPositive()
          this.refresh()
          // api.delete(`id=${idUsuario}`).then((res) => {
          // api.delete('/', idUsuario).then((res) => {
        })
        .catch((err) => {
          alert(idUsuario)
          console.log(err)
          this.triggerNegative()
        })
    },
    triggerPositive () {
      this.$q.notify({
        type: 'positive',
        position: 'top',
        message: 'Usuário excluido com sucesso !'
      })
    },

    triggerNegative () {
      this.$q.notify({
        type: 'negative',
        position: 'top',
        message: 'OPS Ocorreu um erro, tente novamente!'
      })
    },
    refresh () {
      api
        .get('')
        .then((response) => {
          // this.data = response.data
          this.users = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
</script>
