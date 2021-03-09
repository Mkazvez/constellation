import consola from 'consola'

export const state = () => ({
  allUsers: null
})

export const mutations = {
  setUsers(state, data) {
    state.allUsers = data
  }
}

export const actions = {
  async getUsers({ commit }) {
    try {
      const users = await this.$axios.$get('/api/user')
      commit('setUsers', users)
      return users
    } catch (err) {
      consola.error(err.message)
    }
  }
}
