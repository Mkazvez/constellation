import consola from 'consola'

export const state = () => ({
  role: null,
  user: null
})

export const mutations = {
  setUser(state, user) {
    state.role = user.role
    state.user = user
  }
}

export const actions = {
  async loginUser({ commit }, data) {
    try {
      const user = await this.$axios.$post('/api/auth', data)
      commit('setUser', user)
      return user
    } catch (err) {
      consola.error(err.message)
    }
  }
}

export const getters = {
  role: (state) => state.role,
  user: (state) => state.user
}
