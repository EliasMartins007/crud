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
          <q-btn label="Cadastrar" type="submit" color="primary" @click="cad" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import api from '../../services/api'
export default {
  data () {
    return {
      Users: { name: '', email: '', gender: '', status: '' }
    }
  },
  async beforeMount () {
    // await this.cadastraUsuario(),
    // await this.cad()
  },
  methods: {
    checkForm: function (e) {
      this.errors = []

      if (!this.name) {
        this.errors.push('O nome é obrigatório.')
      }
      if (!this.email) {
        this.errors.push('O e-mail é obrigatório.')
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Utilize um e-mail válido.')
      }

      if (!this.errors.length) {
        return true
      }

      e.preventDefault()
    },
    validEmail: function (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },

    ///
    // cadastraUsuario () {
    //   api
    //     .get('?page=3')
    //     .then((response) => {
    //       // handle success
    //       console.log(response)
    //       // sucesso tra pokemon
    //       // this.currentPokemon = response.data;
    //       this.name = response.data.name
    //       this.url = response.data.sprites.other.dream_world.front_default
    //     })
    //     .catch((error) => {
    //       // handle error
    //       console.log(error)
    //     })

    //
    // api
    //   .get('?page=3') // https://gorest.co.in/public/v1/users?page=3
    //   .then((res) => {
    //     // this.users = res.data // res.data
    //     this.users = res.data.data
    //     console.log(res.data.data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    //
    // },
    cad () {
      api
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
