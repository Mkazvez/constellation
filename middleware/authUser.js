export default ({ store, redirect }) => {
  const role = store.getters['auth/role']
  if (role !== 'user') {
    redirect('/auth')
  }
}
