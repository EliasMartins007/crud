<template>
  <div class="q-pa-md">
    {{ Users }}
    <q-input
      name="name"
      color="primary"
      label="name Required Field"
      maxlength="191"
      filled
      clearable
    ></q-input>
    <q-input
      name="name"
      color="primary"
      filled
      type="email"
      label="email Required Field"
      maxlength="191"
      clearable
      :rules="[(val) => !!val || 'Field is required']"
    />

    <q-input
      ref="inputRef"
      filled
      label="Sexo Required Field"
      :rules="[(val) => !!val || 'Field is required']"
    />

    <q-input
      ref="inputRef"
      filled
      label="Status Required Field"
      :rules="[(val) => !!val || 'Field is required']"
    />
    <q-btn label="Atualizar" color="primary" @click="editarUsuario"></q-btn>
  </div>
</template>
<script>
import api from '../../services/api'
export default {
  name: 'Editar',
  data () {
    return {
      // User: [] // 13/10/2021
    }
  },
  methods: {
    editarUsuario () {
      // console.log(idUsuario)
      api
        .put(`/${this.Users}`)
        .then((response) => {
          console.log(response.data)
          this.triggerPositive()
        })
        .catch((error) => {
          console.log(error)
          this.triggerNegative()
        })
    },
    triggerPositive () {
      this.$q.notify({
        type: 'positive',
        position: 'top',
        message: 'Usuário Atualizado com sucesso !'
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
  },
  props: {
    Users: {
      // type: Object,
      // required: true
      id: '',
      name: '',
      email: '',
      status: ''
    }
  }
}
</script>
<style scoped></style>
