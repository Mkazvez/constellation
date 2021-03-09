module.exports = (req, res, next) => {
  if (req.session.user) {
    const { role } = req.session.user
    if (role === 'admin') {
      next()
    } else {
      res.status(403).json({ message: 'Forbidden' })
    }
  } else {
    res.redirect('/auth')
  }
}
