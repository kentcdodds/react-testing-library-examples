const path = require('path')

module.exports = {
  roots: [path.resolve(__dirname, '../src')],
  displayName: 'sandbox',
  testMatch: ['**/__tests__/**/*.js'],
  testURL: 'http://localhost',
  setupFilesAfterEnv: [path.resolve(__dirname, '../src/setupTests.js')],
}
