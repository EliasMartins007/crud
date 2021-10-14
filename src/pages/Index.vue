<template>
  <div class="q-pa-md">
    <q-table
      v-if="usuarioEdicao == null"
      :dense="$q.screen.lt.md"
      title="Usuários"
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
            <q-btn round icon="edit" @click="Editar(props.row.id)"></q-btn>
            <q-btn round icon="delete" @click="Remover(props.row.id)"></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <Editar v-if="usuarioEdicao != null" :Users="usuarioEdicao"></Editar>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import api from '../services/api' // '../../services/api'
// eslint-disable-next-line no-unused-vars
// import Editar from './Editar'
import Editar from './Usuarios/Editar'

export default defineComponent({
  name: 'PageIndex',
  components: { Editar }, // as chaves fizeram toda diferença 13/10
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
          required: true,
          label: 'nome',
          field: 'name',
          align: 'left',
          sortable: true
        },
        {
          name: 'email',
          required: true,
          label: 'email',
          field: 'email',
          align: 'left',
          sortable: true
        },
        {
          name: 'gender',
          required: true,
          label: 'sexo',
          field: 'gender',
          align: 'left',
          sortable: true
        },
        {
          name: 'status',
          required: true,
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
      // data: [], // 13/10/2021
      usuarioEdicao: null, // 13/10/2021

      // users: []// original
      users: [],
      loading
    }
  },
  async mounted () {
    // montar
    await this.getUsers()
    await this.refresh()
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
    async Remover (idUsuario) {
      if (confirm('Deseja excluir o registro?')) {
        await api
          .delete(`/${idUsuario}`) // ('/', idUsuario)
          .then((res) => {
            // console.log(res)
            // alert('excluido com sucesso!')
            this.triggerPositive()
            this.refresh()
          })
          .catch((err) => {
            alert(idUsuario)
            console.log(err)
            this.triggerNegative()
          })
      }
      // obj
      // const registro = { id: idUsuario }
      // console.log(idUsuario)
      // alert(idUsuario)
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
    },
    Editar (usuario) {
      // alert(usuario)
      this.usuarioEdicao = usuario
      // this.refresh()
    }
  }
})
</script>
