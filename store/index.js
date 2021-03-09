export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.session.user) {
      commit('auth/setUser', req.session.user)
    }
  }
}
