const fs = require('fs')
const consola = require('consola')
// const { Op } = require('sequelize')
// const { User } = require('../models')

module.exports.movedReceipt = async (req, res) => {
  // Copying the file to a the same name
  console.error(__dirname)
  fs.copyFile('/static/receipts/1010540680.pdf', '/static/1010540680_n.pdf', (err) => {
    if (err) {
      consola.error(err)
    } else {
      // Get the current filenames
      // after the function
    }
  })

  // Function to get current filenames
  // in directory
}
// Node.js program to demonstrate the
// fs.copyFile() method

// Import the filesystem module

// Get the current filenames
// before the function
