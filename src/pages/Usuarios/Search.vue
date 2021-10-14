<template>
  <q-page class="container" padding>
    <p class="text-h4">Cadastro de Usuário</p>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="row q-col-gutter-md"
      ref="myForm"
    >
      <q-input
        outlined
        v-model="Users.name"
        color="deep-purple"
        label="Nome"
        maxlength="191"
        class="col-md-12 col-sm-12 col-xs-12"
        :rules="[(val) => (val && val.lenth > 0) || 'nome obrigatorio']"
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-input
        outlined
        v-model="Users.email"
        type="email"
        color="deep-purple"
        label="email"
        maxlength="191"
        class="col-md-12 col-sm-12 col-xs-12"
        :rules="[(val) => (val && val.lenth > 0) || 'email obrigatorio']"
      >
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
      </q-input>

        <q-select
          outlined
          class="col-md-12 col-sm-12 col-xs-12"
          v-model="Users.gender"
          :options="optionsGender"
          label="sexo"
          :rules="[(val) => (val && val.lenth > 0) || 'sexo obrigatorio']"
        />

      <q-select
        outlined
        class="col-md-12 col-sm-12 col-xs-12"
        v-model="Users.status"
        :options="optionsStatus"
        label="Status"
        :rules="[(val) => (val && val.lenth > 0) || ' status obrigatorio']"
      />
      <div class="col-12">
        <q-btn
          label="Cadastrar"
          type="submit"
          color="primary"
          @click="cadastrar"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import api from '../../services/api' // '../../services/api'

export default defineComponent({
  name: 'Search',
  data () {
    return {
      Users: {
        name: '',
        email: '',
        gender: '',
        status: ''
      },
      optionsGender: ['male', 'female'],
      optionsStatus: ['active', 'inactive']
    }
  },
  // mounted () {
  //   // montar
  //   this.getUsers()
  // },
  async beforeMount () {
    //
  },
  // fim teste
  methods: {
    onSubmit () {
      this.triggerPositive()
    },

    async cadastrar () {
      await api
        .post('', this.Users)
        .then((resposta) => {
          this.triggerPositive()
          // console.log(resposta.data)
          this.onReset()
        })
        .catch((erro) => {
          this.triggerNegative()
        })
    },
    triggerPositive () {
      this.$q.notify({
        type: 'positive',
        position: 'top',
        icon: 'check_circle_outline',
        message: 'Usuário cadastrado com sucesso !'
      })
    },

    triggerNegative () {
      this.$q.notify({
        type: 'negative',
        position: 'top',
        message: 'OPS Ocorreu um erro, tente novamente!'
      })
    },
    async onReset () {
      await this.resetForm()
      this.$refs.myForm.resetValidation()
    },
    async resetForm () {
      this.form = { name: '', email: '', gender: '', status: '' }
    }
  }
})
</script>
