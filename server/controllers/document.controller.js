const consola = require('consola')
const { Document } = require('../models')
const { v_document } = require('../models')

module.exports.getDocuments = async (req, res) => {
  const reqQuery = {
    attributes: [
      'id',
      'title',
      'description',
      'idTypeDocument',
      'idAccount',
      'period',
      'url'
    ],
    order: [['createdAt', 'DESC']]
  }
  try {
    if (req.session.user) {
      const { role } = req.session.user
      if (role === 'admin') delete reqQuery.where
    }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const documents = await Document.findAll(reqQuery)
    res.json(documents)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.v_getDocuments = async (req, res) => {
  const reqQuery = {
    attributes: [
      'id',
      'titledocument',
      'period',
      'typedocument',
      'idAccount',
      'idUser',
      'url',
      'nameFlat',
      'period_month'
    ],
    order: [['period', 'DESC']]
  }
  try {
    // if (req.session.user) {
    //   const { role } = req.session.user
    //   if (role === 'admin') delete reqQuery.where
    // }
    const { value } = req.query
    if (value) reqQuery.limit = +value
    const vdocuments = await v_document.findAll(reqQuery)
    res.json(vdocuments)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.getDocument = async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id)
    res.json(document)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.addDocument = async (req, res) => {
  try {
    const {
      title,
      description,
      idTypeDocument,
      idAccount,
      period,
      url
    } = req.body
    const document = await Document.create({
      title,
      description,
      idTypeDocument,
      idAccount,
      period,
      url
    })
    res.status(201).json(document)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.updateDocument = async (req, res) => {
  try {
    const {
      title,
      description,
      idTypeDocument,
      idAccount,
      period,
      url
    } = req.body
    const document = await Document.update(
      { title, description, idTypeDocument, idAccount, period, url },
      { where: { id: req.params.id } }
    )
    res.status(201).json(document)
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}

module.exports.deleteDocument = async (req, res) => {
  try {
    await Document.destroy({ where: { id: req.params.id } })
    res.status(201).json({ message: 'deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    consola.error(err)
  }
}
