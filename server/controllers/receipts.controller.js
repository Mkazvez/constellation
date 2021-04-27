const fs = require('fs')
const consola = require('consola')
const path = require('path')

module.exports.movedReceipt = async (req, res) => {
  const { fromFile, toFile } = req.body
  const fromFile2 = path.resolve(fromFile)
  const toFile2 = path.resolve(toFile)
  fs.copyFile(fromFile2, toFile2, (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log('Error Found:' + __dirname, err)
      res.status(500).json({ error: err.message })
      consola.error(err)
    } else {
      // Get the current filenames
      // after the function
      res.status(201).json(__dirname)
    }
  })
}

// Node.js program to demonstrate the
// fs.copyFile() method

// Import the filesystem module

// Get the current filenames
// before the function
