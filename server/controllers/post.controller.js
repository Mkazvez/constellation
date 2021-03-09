const consola = require('consola')
const { Post } = require('../models')

module.exports.getPosts = async (req, res) => {
  const reqQuery = {
    where: { published: true },
    attributes: ['id', 'published', 'title', 'createdAt'],
    order: [['createdAt', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const posts = await Post.findAll(reqQuery)
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getPost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id)
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addPost = async (req, res) => {
  try {
    const { title, description, text } = req.body
    const post = await Post.create({ title, description, text })
    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updatePost = async (req, res) => {
  try {
    const { title, description, text } = req.body
    const post = await Post.update(
      { title, description, text },
      { where: { id: req.params.id } }
    )
    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deletePost = async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.setPublished = async (req, res) => {
  try {
    const { published } = req.body
    await Post.update({ published }, { where: { id: req.params.id } })
    res.status(201).json({ message: 'Updated' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
