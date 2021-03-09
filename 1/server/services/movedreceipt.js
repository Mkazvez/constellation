// Node.js program to demonstrate the
// fs.copyFile() method

// Import the filesystem module
const fs = require('fs')

// Get the current filenames
// before the function
getCurrentFilenames()

// Copying the file to a the same name
fs.copyFile('1010540680.pdf', '1010540680_n.pdf', (err) => {
  if (err) {
    window.console.log('Error Found:', err)
  } else {
    // Get the current filenames
    // after the function
    getCurrentFilenames()
  }
})

// Function to get current filenames
// in directory
function getCurrentFilenames() {
  window.console.log('\nCurrent filenames:')
  fs.readdirSync(__dirname).forEach((file) => {
    window.console.log(file)
  })
}
