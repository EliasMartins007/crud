<template>
  <div class="text-center">
    <h3>Cadastro de Usuário</h3>

    <div class="q-pa-md">
      <q-form @submit="Users">
        <q-input
          name="name"
          v-model="Users.name"
          color="primary"
          label="name Required Field"
          maxlength="191"
          filled
          clearable
          :rules="[(val) => !!val || 'Field is required']"
        />
        <q-input
          name="name"
          v-model="Users.email"
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
          v-model="Users.gender"
          label="Sexo Required Field"
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-input
          ref="inputRef"
          filled
          v-model="Users.status"
          label="Status Required Field"
          :rules="[(val) => !!val || 'Field is required']"
        />
        <br />
        <div>
          <q-btn
            label="Cadastrar"
            type="submit"
            color="primary"
            @click="cadastrar"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'
export default {
  // data () {
  //   return {
  //     Users: { name: '', email: '', gender: '', status: '' }
  //   }
  // },
  data: () => {
    return {
      Users: { name: '', email: '', gender: '', status: '' }
    }
  },
  async beforeMount () {
    // await this.cadastraUsuario(),
    // await this.cad()
  },
  methods: {
    async cadastrar () {
      await api
        .post('', this.Users)
        .then((resposta) => {
          this.triggerPositive()
          console.log(resposta.data)
        })
        .catch((erro) => {
          this.triggerNegative()
        })
    },
    triggerPositive () {
      this.$q.notify({
        type: 'positive',
        position: 'top',
        message: 'Usuário cadastrado com sucesso !'
      })
    },

    triggerNegative () {
      this.$q.notify({
        type: 'negative',
        position: 'top',
        message: 'OPS Ocorreu um erro, tente novamente!'
      })
    }
  }
}
</script>
